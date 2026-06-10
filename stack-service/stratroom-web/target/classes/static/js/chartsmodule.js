
var chartlayoutcol 	= 	6;
var drillchartlayoutcol 	= 	12;
var chartBody	=	"#chart-body";
var drillchartBody	=	"#drill-chart-body";
var pageNo =  $('#pagenumber').val();
var widgettype 	= 	"";
var currentEmp		=	$("#userPrincipal").val();
var navigatedEmp		=	$("#userPrincipalnavigate").val();
var topparentswotDetails	=	{};
var reporteelist = [];
var lookup = {};
var kpiList	=	[];
var updateDescription	=	[];
var inlineupdateDescription	=	[]
var nodeKeyMap = new Object(); 	
var chartnodeKeyMap = new Object(); 	
var getLastchartFormula	=	"";
var dateperiod	=	$("#datePeriod").val();
var chartsmodPermission	=	[];
var createpermission	=	false;
var editpermission	=	false;
var deletepermission	=	false;
var viewpermission	=	false;
var cockpitcontentload	=	false;
var measureFieldenable	=	false;

var drillcreatepermission=	false;
var drilleditpermission	=	false;
var drilldeletepermission=	false;
var drillviewpermission	=	false;
var drillcontentload	=	false;

if($("#userrolename").val()	==	"Super User" || $("#userrolename").val()	==	"Admin"){	
	if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
		//$(".subusermenuname").text('Cockpit');
		if($(".topmenubreadcrumb").length){
			$(".topmenubreadcrumb").show();
		}
		if($(".sidebarNavigate").length){
			$(".sidebarNavigate").show();
		}
	}
}

function getcolumnView(){
	$.ajax({
		type : "GET",
		url : "/stratroom/pages/"+pageNo,
		async:false,
		success : function(data) {
			if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
				$(".subusermenuname").text(data.pageName);
				if($(".superusertopmenu").hasClass(data.id)){
					$("."+data.id).addClass("homepageHighlight");
				}
			}
		}
	});
}

function getchartpermission(){
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName=Charts",
		async:false,
		success : function(data) {
			if(data.Charts !=	undefined && !jQuery.isEmptyObject(data.Charts)){
				chartsmodPermission	=	data.Charts.Charts;

				$.each(data.Charts,function(forindex,fordata){
					if(forindex	==	"Drilldown Charts"){
						if(fordata.privilegeCreate !=	undefined && fordata.privilegeCreate == "TRUE"){	
							drillcreatepermission	=	true;
						}
						if(fordata.privilegeUpdate !=	undefined && fordata.privilegeUpdate == "TRUE"){
							drilleditpermission	=	true;
						}
						if(fordata.privilegeView !=	undefined && fordata.privilegeView == "TRUE"){
							drillviewpermission	=	true;
						}
						if(fordata.privilegeDelete !=	undefined && fordata.privilegeDelete == "TRUE"){
							drilldeletepermission	=	true;
						}
					}
				});
			}
		}
	});
}

$(function () {
	getcolumnView();
	getchartpermission();
	$.each(reporteelist,function(ownkey,empvalue){
		if(empvalue.id	==	currentEmp){
			topparentswotDetails	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
		}
	});
	
	if(chartsmodPermission.privilegeCreate !=	undefined && chartsmodPermission.privilegeCreate == "TRUE"){	
		createpermission	=	true;
	}
	
	if(chartsmodPermission.privilegeUpdate !=	undefined && chartsmodPermission.privilegeUpdate == "TRUE"){
		editpermission	=	true;
	}
	
	if(chartsmodPermission.privilegeDelete !=	undefined && chartsmodPermission.privilegeDelete == "TRUE"){
		deletepermission	=	true;
	}
	
	if(chartsmodPermission.privilegeView !=	undefined && chartsmodPermission.privilegeView == "TRUE"){
		viewpermission	=	true;
	}
	
	if(controlpanelScorecardSettings !=	"" && controlpanelScorecardSettings !=	undefined && controlpanelScorecardSettings.submeasurerequired !=	undefined && controlpanelScorecardSettings.submeasurerequired == true){
		measureFieldenable	=	true
	}
	
	if(enableaccesscontrolMenu	==	true){
		createpermission	=	true;
		editpermission		=	true;
		deletepermission	=	true;
		viewpermission		=	true;
	}
	
	if(createpermission == true || editpermission == true || deletepermission == true || viewpermission == true){
		cockpitcontentload	=	true;
	}	
	
	if(drillcreatepermission == true || drilleditpermission == true || drilldeletepermission == true || drillviewpermission == true){
		drillcontentload	=	true;
	}
	
	if((createpermission	==	false || drillcreatepermission	==	false) && (cockpitcontentload  !=	true || drillcontentload  !=	true)){
		$(".createcharticon").remove();
	}
	
	if(createpermission	==	false){
		$("#widget_type option[value='Chart']").remove()
	}
	
	if(drillcreatepermission	==	false){
		$("#widget_type option[value='Drilldown']").remove()
	}
	
	if((createpermission	==	false || drillcreatepermission	==	false) && enableaccesscontrolMenu	==	false){ 
		//$(".createcharticon").remove();
		$("aside#initiative_sidebar").remove();
		$(".collapse_arrow_left,.collapse_arrow_right").remove();
		$("section").removeAttr("style");
		$("section").removeAttr("id");
		$(".page-header").removeClass("m-t-70").addClass("m-t--70");
	}
	
    getDashbaordList();
	getreportee();

});

function getsiteName(){
	$.ajax({
		url: "/stratroom/generalSettingList",
		type: "GET",
		async:false,
		contentType: "application/json",
		success: function (response, status) {
			controlpanelgeneralsiteSettings	=	response;
			if(!jQuery.isEmptyObject(response)){
				if(response['siteName'] !=	undefined){
					$("title").text(response['siteName']);
				}
				if(response !=	null && response.startMonth !=	undefined){
					calendarYearfinStart 	=	response.startMonth;
				}
				if(response !=	null && response.endMonth !=	undefined){
					calendarYearfinEnd 	=	response.endMonth;
				}
				if(response !=	null && response.defaultDatePeriod !=	undefined){
					calendardefaultPeriod 	=	response.defaultDatePeriod;
				}
			}
		}
	});
}
  $(document).ready(function () {
	widgettype	=	localStorage.getItem("chartwidgettype");
	
	if(widgettype	!=	"" || widgettype	!=	undefined || widgettype	!=	null){
		$("#widget_type").val(widgettype);	
	}
	
	if(widgettype	==	null){
		localStorage.setItem("chartwidgettype","Chart");
		$("#widget_type option:contains('Chart')").attr('selected', 'selected');	
	}
	
    $("#widget_type")
      .change(function () {
        $(this).find("option:selected").each(function () {
            var optionValue = $(this).attr("value");
			localStorage.setItem("chartwidgettype",optionValue);
            if (optionValue) {
              $(".widget").not("." + optionValue).hide();
              $("." + optionValue).show();
            } else {
              $(".widget").hide();
            }
          });
      })
      .change();
  });

function getreportee() {
	
	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url : "/stratroom/completereporteeList",
			async:false,
			success : function(employeeList) {
				reporteelist = employeeList;
			}
		});
	} 
}

function reporteeList(_callback) {
	reporteelist.forEach(function (el, i, arr) {
		lookup[el.id + "image"] = el.image;
		lookup[el.id + "name"] = el.name;
		lookup[el.id + "dept"] = el.dept;
	});
	_callback();
}

function datatablejsonform(id,action){
	if(action	==	"add"){
		var Obj 	= 	{
            "active": 0,
            "pageId": pageNo,
            "owner": currentEmp,
            "chartValue": {
                "type": "table",
				"measurement":"Monthly",
				"chartdisplayname":"Drill Down Table",
				"datarangechart":$("#datePeriod").val(),
				"formula":"",
				"fieldName":"",
				"actual":true,
				"target":true,
				"gap":true,
				"ytd":true
            }
        };	
	}else{
		var chartdisplayname	=	(updateDescription.chartValue.chartdisplayname !=	undefined && updateDescription.chartValue.chartdisplayname != ""?updateDescription.chartValue.chartdisplayname:"Drill Down Table");
		var datarangechart		=	(updateDescription.chartValue.datarangechart !=	undefined && updateDescription.chartValue.datarangechart != ""?updateDescription.chartValue.datarangechart:$("#datePeriod").val());
		var Obj 	= 	{
	            "active": 0,
	            "pageId": pageNo,
	            "owner": currentEmp,
	            "chartValue": {
	                "type": $("#tabletypeField").val(),
					"measurement":$("#drillfrequency").val(),
					"chartdisplayname":chartdisplayname,
					"datarangechart":datarangechart,
					"formula":$("#drilltable_kpi_formula").val(),
					"fieldName":$("#tableFieldName").val(),
					"actual":$("#drillactual").is(":checked"),
					"target":$("#drilltarget").is(":checked"),
					"gap":$("#drillgap").is(":checked"),
					"ytd":$("#drillytd").is(":checked")
	            }
	        };
	}
	
	var existdatadonotupdate 	=	[];
	if(action == "edit" && (updateDescription !== undefined || updateDescription != "")){
		$.each(Obj.chartValue,function(index,value){
			if($.inArray(index,existdatadonotupdate) == -1){
				Obj["chartValue"][index]	=	value;
			}
		});
	}
	return Obj;
}

function chartjsonform(id,action){
	if(action	==	"add"){
		var Obj 	= 	{
            "active": 0,
            "owner": currentEmp,
            "pageId": pageNo,
            "chartValue": {
            	"displayname": "",
            	"measurement": "",
            	"chartdisplayname":"--",
	            "displayaxischart":"",
                "type": "chart",
                "datarangechart":$("#datePeriod").val(),
                "chartsettings":[],
				"comments":""
            }
        };	
	}else{
		
		var charttypeField	=	$("#charttypeField").val();
		if(charttypeField	==	"BubbleChartDD" || charttypeField	==	"ColumnChartDD" || charttypeField	==	"LineChartDD" || charttypeField	==	"AreaChartDD" || charttypeField	==	"MultiAxisDD"){
			var chartdisplayname	=	(updateDescription.chartValue.chartdisplayname !=	undefined && updateDescription.chartValue.chartdisplayname != ""?updateDescription.chartValue.chartdisplayname:"Drill Down Table");
		}else{
			var chartdisplayname	=	(updateDescription.chartValue.chartdisplayname !=	undefined && updateDescription.chartValue.chartdisplayname != ""?updateDescription.chartValue.chartdisplayname:"--");
		}
		var Obj 	= 	{
	            "active": 0,
	            "owner": currentEmp,
	            "pageId": pageNo,
	            "chartValue": {
	            	"measurement":$("#chartfrequency").val(),
	                "displayname": $("#displaynamechart").val(),
	                "chartdisplayname":chartdisplayname,
	                "type": $("#charttypeField").val(),
	                "displayaxischart":$("#displayaxischart").val(),
	                "datarangechart":(updateDescription.chartValue.datarangechart !=	undefined && updateDescription.chartValue.datarangechart != ""?updateDescription.chartValue.datarangechart:$("#datePeriod").val()),
					"comments":$("#chartComments").val()
	            }
	        };
	}
	
	var existdatadonotupdate 	=	["type","datarangechart"];
	if(action == "edit" && (updateDescription !== undefined || updateDescription != "")){
		$.each(Obj.chartValue,function(index,value){
			if($.inArray(index,existdatadonotupdate) == -1){
				Obj["chartValue"][index]	=	value;
			}
		});
	}
	return Obj;
}

      function dragStart(event) {
        event.dataTransfer.setData("dragData", event.target.id);
      }

      function allowDrop(event) {
        event.preventDefault();
      }

      function drop(event) {
        event.preventDefault();
        var dataElement = event.dataTransfer.getData("dragData");
        
        if (dataElement == "BubbleChart" || dataElement == "PieChart" || dataElement == "LineChart" || dataElement == "StackedChart" || dataElement == "NegativeColumnChart" || dataElement == "ColumnChart" || dataElement == "MultiAxis" || dataElement == "AreaChart" ) {
        	if(createpermission	==	false){
          		return false;
          	}
          	var	action	=	"add";
			var	id		=	"";
		    var textObj = 	chartjsonform(id,action);	
		    var methodType = 'post';
			if(action	==	"edit"){
				methodType = 'put';	
				textObj.id 			= 	(id !=	""?id:"");
			}
			var largechart	=	$(".largechart");
			var chartnamefield	=	"Bubblechart";
	
			textObj.chartValue.type	=	dataElement;
		
			$(".page-loader-wrapper").css("display","block");
		    $.ajax({
		        url: "/stratroom/charts",
		        type: methodType,
		        async:false,
		        contentType: "application/json",
		        data: JSON.stringify(textObj),
		        success: function (data, status) {
		        	var chartmodalname	=	"";
		        	if(dataElement	==	"BubbleChart"){
		        		chartnamefield	=	"Bubblechart";
						$(largechart).attr("id","Bubblelarge"+data.id);
						chartmodalname	=	"bubble-large";
						charticonname	=	"images/widgets/Bubble.png";
					}else if(dataElement	==	"ColumnChart"){
						chartnamefield	=	"Columnchart";
						$(largechart).attr("id","Columnlarge"+data.id);
						chartmodalname	=	"column-large";
						charticonname	=	"images/widgets/Column.png";
						charticonaltname	=	"Column Chart";
					}else if(dataElement	==	"LineChart"){
						chartnamefield	=	"Linechart";
						$(largechart).attr("id","Linelarge"+data.id);
						chartmodalname	=	"line-large";
						charticonname	=	"images/widgets/Line.png";
						charticonaltname	=	"Line Chart";
					}else if(dataElement	==	"AreaChart"){
						chartnamefield	=	"Areachart";
						$(largechart).attr("id","Arealarge"+data.id);
						chartmodalname	=	"area-large";
						charticonname	=	"images/widgets/Area.png";
						charticonaltname	=	"Area Chart";
					}else if(dataElement	==	"PieChart"){
						chartnamefield	=	"Piechart";
						$(largechart).attr("id","Pielarge"+data.id);
						chartmodalname	=	"pie-large";
						charticonname	=	"images/widgets/Pie.png";
						charticonaltname	=	"Pie Chart";
					}else if(dataElement	==	"MultiAxis"){
						chartnamefield	=	"Multiaxis";
						$(largechart).attr("id","Multiaxislarge"+data.id);
						chartmodalname	=	"multiaxis-large";
						charticonname	=	"images/widgets/Multiaxis.png";
						charticonaltname	=	"Multiaxis Chart";
					}else if(dataElement	==	"StackedChart"){
						chartnamefield	=	"Stackedchart";
						$(largechart).attr("id","Stackedlarge"+data.id);
						chartmodalname	=	"stacked-large";
						charticonname	=	"images/widgets/Stacked.png";
						charticonaltname	=	"Stacked Chart";
					}else if(dataElement	==	"NegativeColumnChart"){
						chartnamefield	=	"NegativeColumnchart";
						$(largechart).attr("id","NegativeColumnlarge"+data.id);
						chartmodalname	=	"negative-large";
						charticonname	=	"images/widgets/NegativeC.png";
						charticonaltname	=	"Negative Chart";
					}
					
				var daterangeformatted	=	`<input
                    class=" top_datepicker "
                    id="datePickerdashboard`+data.id+`"
                    style="width: 100%;
                      margin-top: -4px;
                      text-align: left;
                      font-size: 10px !important;
                      font-weight: 500;
                      border: none !important;"
                  />`;
		        var inlineEditContent	=	`<strong>--</strong>`;
		        var fontsizesmaller	=	"";	
				var displaynameinline	=	"--";
				if(editpermission	==	false){
					fontsizesmaller	=	"font-size:smaller;"; 
		        }else{
		        	inlineEditContent	=	`<strong class="inlineeditableTxt" data-oldHeader="`+displaynameinline+`" data-type="text" data-id="`+data.id+`"
		                      editable="true"
		                      contenteditable="true"
		                      onkeypress="return (this.innerText.length <= 36)"
		                        > `+displaynameinline+` </strong>`;
		        	
		        } 
				var charte	=	"";
				if(viewpermission	==	false && deletepermission	==	false && (editpermission	==	false || createpermission	==	false)){
					charte	=	"";
				}else{
					charte = `<ul class="header-dropdown m-r--2" id="ChartOptions_`+dataElement+data.id+`"><li class="dropdown m-t--10" style="top: -3px !important;margin-left: -72px !important;">
					<span><img src="`+charticonname+`" width="18px" alt="`+charticonaltname+`"></span></li></ul>`;
				}
				var chartsOptions	=	"";
				if(viewpermission	==	false && deletepermission	==	false && (editpermission	==	false || createpermission == false)){
					chartsOptions	=	"";
				}else{
					chartsOptions	=	`<ul class="header-dropdown m-r--2" id="ChartOptions_`+dataElement+data.id+`">
		                    <li class="dropdown m-t--10">
		                      <a
		                        href="#"
		                        onclick="return false;"
		                        class="dropdown-toggle"
		                        data-toggle="dropdown"
		                        role="button"
		                        aria-haspopup="true"
		                        aria-expanded="true"
		                      >
		                        <i class="fas fa-ellipsis-h"></i>
		                      </a>
		                      <ul
		                        class="dropdown-menu editoptionparentdropdown-menu pull-right"
		                        x-placement="bottom-start"
		                        style="
		                          position: absolute;
		                          will-change: transform;
		                          top: 0px;
		                          left: 0px;
		                          transform: translate3d(0px, 24px, 0px);
		                        "
		                      >`;
					
					if(editpermission	==	true || createpermission	==	true){
						chartsOptions	+=	`<li class="editevent">
		                          <a
		                            href="#"
		                            data-toggle="modal"
		                            data-target="#chart_setting"
		                            onclick="handleChartevent('`+data.id+`','edit')"
									data-i18n="Settings"
		                            >Settings</a
		                          >
		                        </li>`;
					}
					
					if(viewpermission	==	true){
						chartsOptions	+=	`<li class="viewevent">
		                          <a href="#" 
		                            data-toggle="modal"
		                            data-target="#`+chartmodalname+`" onclick="handleChartevent('`+data.id+`','view')" data-i18n="Enlarge">Enlarge</a>
		                        </li>`;
					}
				
					if(deletepermission	==	true){
						chartsOptions	+=	`<li class="deleteevent">
		                          <a href="#" onclick="handleChartevent('`+data.id+`','delete')"data-i18n="Delete">Delete</a>
		                        </li>`;
					}
					
					chartsOptions	+=	`</ul></li></ul>`;
				}
				
				var csvchartsOptions	=	"";
				if(viewpermission	==	false && deletepermission	==	false && (editpermission	==	false || createpermission	==	false)){
					csvchartsOptions	=	"";
				}else{
					csvchartsOptions	=	`<ul class="header-dropdown m-r--2" id="csvChartOptions_`+dataElement+data.id+`" style="display:none;">
		                    <li class="dropdown m-t--10">
		                      <a
		                        href="#"
		                        onclick="return false;"
		                        class="dropdown-toggle"
		                        data-toggle="dropdown"
		                        role="button"
		                        aria-haspopup="true"
		                        aria-expanded="true"
		                      >
		                        <i class="fas fa-ellipsis-h"></i>
		                      </a>
		                      <ul
		                        class="dropdown-menu editoptionparentdropdown-menu pull-right"
		                        x-placement="bottom-start"
		                        style="
		                          position: absolute;
		                          will-change: transform;
		                          top: 0px;
		                          left: 0px;
		                          transform: translate3d(0px, 24px, 0px);
		                        "
		                      >`;
					
					if(editpermission	==	true || createpermission	==	true){
						csvchartsOptions	+=	`<li class="editevent">
		                          <a
		                            href="#"
		                            data-toggle="modal"
		                            data-target="#chart_setting"
		                            onclick="handleChartevent('`+data.id+`','edit')"
									data-i18n="Settings"
		                            >Settings</a
		                          >
		                        </li>`;
					}
					
					if(viewpermission	==	true){
						csvchartsOptions	+=	`<li class="viewevent">
		                          <a href="#" 
		                            data-toggle="modal"
		                            data-target="#`+chartmodalname+`" onclick="handleChartevent('`+data.id+`','view')" data-i18n="Enlarge">Enlarge</a>
		                        </li><li class="downloadevent">
		                          <a class="pointer" onclick="handleChartevent('`+data.id+`','csvdownload')"data-i18n="Download CSV">Download CSV</a>
			                        </li>`;
					}
				
					if(deletepermission	==	true){
						csvchartsOptions	+=	`<li class="deleteevent">
		                          <a class="pointer" onclick="handleChartevent('`+data.id+`','delete')"data-i18n="Delete">Delete</a>
		                        </li>`;
					}
					
					csvchartsOptions	+=	`</ul></li></ul>`;
				}
					$(chartBody)
            .append(`<div class="col-md-`+chartlayoutcol+` select-toggle chart chartlistdata sub_initiatives dashboard_showlist" id="dashboard_showlist_"`+data.id+`">
            <div class="card" style="padding: 4px ;">
              <div class="header row" style="margin: 0;">
                <div class="col-4" style="margin-left : -15px;`+fontsizesmaller+`">
                  <input
                    class=" top_datepicker "
                    id="datePickerdashboard`+data.id+`"
                    style="width: 100%;
                      margin-top: -4px;
                      text-align: left;
                      font-size: 10px !important;
                      font-weight: 500;
                      border: none !important;"
                  />
                  </div>
                  <div class="col-7"  style="margin-left : -19px;">
                    <h5 class="prob">
                      `+inlineEditContent+`
                    </h5>
                  </div>
                <div class="col-1"  style="margin-left : 23px;">
				`+charte+`
                <span class="d-flex pull-right" style="font-size: 16px;padding-top: 10px;padding-right: 18px;color: #565656;cursor: pointer;">
                	<i class="fas fa-table" id="Chart_`+dataElement+data.id+`"></i>
                	<i class="fas fa-chart-line" id="ChartTable_`+dataElement+data.id+`" style="display: none !important;"></i>
                </span>
                  `+chartsOptions+``+csvchartsOptions+`
                </div>
              </div>
              <div>
                <div style="width: 100%;" id="`+chartnamefield+data.id+`"></div>
                <div id="tag"></div>
                <div class="d-flex flex-column employee_div_body_box activities-box" id="showchartdrilldownTable_`+data.id+`" style="display:none !important;min-height:338px !important;">
                <div class="table-responsive tableheight chartdrilldownTable_`+data.id+`">
                  <table
                    class="table table-sm table-bordered w-100 text-center"
                    id="chartdrilldownTable_`+data.id+`"
                    style="margin-bottom: 0px !important;white-space:nowrap;"
                  >
                    <thead>
                      <tr>
                        <th rowspan="2" style="width: 198px;">
                          Name/Period
                        </th>
                        <th colspan="3" data-i18n="Monthly">
                          Monthly
                        </th>
                      </tr>
                      <tr>
                        <th data-i18n="Actual">Actual</th><th data-i18n="Target">Target</th><th data-i18n="Gap">Gap</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
              </div>
            </div>
          </div>`);
		  $(".page-loader-wrapper").css("display", "none");
          
			        $("#datePickerdashboard"+data.id).daterangepicker({
			            forceUpdate: true,
			            periods: ["month", "quarter", "year"],
			            period: "month",
			            maxDate: [moment().add(30, "year"), "inclusive"],
			    	     ranges: {
			    	          "Last 30 days": [moment().subtract(29, "days"), moment()],
			    	          "Last 90 days": [moment().subtract(89, "days"), moment()],
			    	          "Last Year": [moment().subtract(1, "year").add(1, "day"), moment()],          
			    	          //'All Time': 'all-time' // [minDate, maxDate]
			    	        },
			            callback: function (startDate, endDate, period) {
			              var title = startDate.format("L")+"-"+endDate.format("L");
			              $(this).val(title);
			            },
			          });
					
          $("#chartdrilldownTable_"+data.id).paging({ limit: 5 });
			
            $("#Chart_"+dataElement+data.id).click(function () {
              $("#Chart_"+dataElement+data.id).hide();
              $("#showchartdrilldownTable_"+data.id).show();
              $("#"+chartnamefield+data.id).hide();
              $("#ChartTable_"+dataElement+data.id).show();
              $("#csvChartOptions_"+dataElement+data.id).attr("style", "display: block !important");
              $("#ChartOptions_"+dataElement+data.id).attr("style", "display: none !important");
            });
            $("#ChartTable_"+dataElement+data.id).click(function () {
              $("#Chart_"+dataElement+data.id).show();
              $("#ChartTable_"+dataElement+data.id).hide();
              $("#"+chartnamefield+data.id).show();
              $("#showchartdrilldownTable_"+data.id).attr("style", "display: none !important");
              $("#csvChartOptions_"+dataElement+data.id).attr("style", "display: none !important");
              $("#ChartOptions_"+dataElement+data.id).attr("style", "display: block !important");
            });
            
            var gettotalnoofchart	=	$("#chart-body .chartlistdata").length;
            var modulooperation	=	gettotalnoofchart%2;
	        var calposition	=	'';
	        if(modulooperation	==	0){
	        	calposition	=	'left';
	        }else{
	        	calposition	=	'right';
	        }	
            
				$(".page-loader-wrapper").css("display","none");
					initDateRangePicker("#datePickerdashboard"+data.id,data.id,calposition);
						location.reload()
		        },
				error:function(){
					$(".page-loader-wrapper").css("display","none");
				}
		    });
        }
        
        if (dataElement	==	"BubbleChartDD" || dataElement	==	"ColumnChartDD" || dataElement	==	"LineChartDD" || dataElement	==	"AreaChartDD" || dataElement	==	"MultiAxisDD") {
        	if(drillcreatepermission	==	false){
          		return false;
          	}
		  	var	action	=	"add";
			var	id		=	"";
		    var textObj = datatablejsonform(id,action);	
		    var methodType = 'post';
			if(action	==	"edit"){
				methodType = 'put';	
				textObj.id 			= 	(id !=	""?id:"");
			}
			var largechart	=	$(".largechart");
			var chartnamefield	=	"Bubblechart";
			
			$(".page-loader-wrapper").css("display","block");
			
			var dataId ='';
			if(data){
				dataId = data.id;
			}
			
			if(dataElement	==	"BubbleChartDD"){
        		chartnamefield	=	"Bubblechart";
				$(largechart).attr("id","Bubblelarge"+dataId);
				charticonname	=	"images/widgets/Bubble.png";
			}else if(dataElement	==	"ColumnChartDD"){
				chartnamefield	=	"Columnchart";
				$(largechart).attr("id","Columnlarge"+dataId);
				charticonname	=	"images/widgets/Column.png";
						charticonaltname	=	"Column Chart";
			}else if(dataElement	==	"LineChartDD"){
				chartnamefield	=	"Linechart";
				$(largechart).attr("id","Linelarge"+dataId);
				charticonname	=	"images/widgets/Line.png";
						charticonaltname	=	"Line Chart";
			}else if(dataElement	==	"AreaChartDD"){
				chartnamefield	=	"Areachart";
				$(largechart).attr("id","Arealarge"+dataId);
			}else if(dataElement	==	"PieChart"){
				chartnamefield	=	"Piechart";
				$(largechart).attr("id","Pielarge"+dataId);
				charticonname	=	"images/widgets/Pie.png";
						charticonaltname	=	"Pie Chart";
			}else if(dataElement	==	"MultiAxisDD"){
				chartnamefield	=	"Multiaxis";
				$(largechart).attr("id","Multiaxislarge"+dataId);
				charticonname	=	"images/widgets/Multiaxis.png";
				charticonaltname	=	"Multiaxis Chart";
			}
					
			textObj.chartValue.type	=	dataElement;
			var positioncheck	=	$(drillchartBody+" .dashboard_showlist").length;
			var checkchildflag	=	false;	
			if(positioncheck	==	0){
				var setidentifyclass	=	$(drillchartBody+" .dashboard_showlist:nth-child(1)").attr("id");
				if(setidentifyclass	==	undefined || setidentifyclass	==	""){
					checkchildflag	=	true;	
				}	
			}
			
			var presentid	=	0;
		    $.ajax({
		        url: "/stratroom/charts",
		        type: methodType,
		        async:false,
		        contentType: "application/json",
		        data: JSON.stringify(textObj),
		        success: function (data, status) {
		        	presentid	=	data.id;
		        	
		        	var daterangeformatted	=	`<input
                    class=" top_datepicker " id="datePickerdashboard`+data.id+`"
                    style="width: 100%;
                      margin-top: -4px;
                      text-align: left;
                      font-size: 10px !important;
                      font-weight: 500;
                      border: none !important;"
                  />`;
		        var inlineEditContent	=	`<strong>Drill Down Table</strong>`;
		        var fontsizesmaller	=	"";	
				var displaynameinline	=	"Drill Down Table";
				if(drilleditpermission	==	false){
					fontsizesmaller	=	"font-size:smaller;"; 
		        }else{
		        	inlineEditContent	=	`<strong class="inlineeditableTxt" data-id="`+data.id+`" data-type="text" data-oldHeader="Drill Down Table" data-type="text"
                      editable="true"
                      contenteditable="true"
                      onkeypress="return (this.innerText.length <= 36)"
                        >Drill Down Table</strong
                      >`;
		        	
		        } 
				var charte	=	"";
				if(viewpermission	==	false && deletepermission	==	false && (editpermission	==	false || createpermission	==	false)){
					charte	=	"";
				}else{
					charte = `<ul class="header-dropdown m-r--2" id="ChartOptions_`+dataElement+data.id+`"><li class="dropdown m-t--10" style="top: -3px !important;margin-left: -72px !important;">
					<span><img src="`+charticonname+`" width="18px" alt="`+charticonaltname+`"></span></li></ul>`;
				}
				var chartsOptions	=	"";
				if(drillviewpermission	==	false && drilldeletepermission	==	false && (drilleditpermission	==	false || drillcreatepermission	==	false)){
					chartsOptions	=	"";
				}else{
					chartsOptions	=` <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;
			
					
					if(drilleditpermission	==	true || drillcreatepermission	==	true){
						chartsOptions	+=	`<li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal" data-typevalue="drill"
                                               onclick="handleChartevent(`+data.id+`,'edit','`+dataElement+`')">Settings</a>
                                        </li>`;
					}
					
					if(drillviewpermission	==	true){
				chartsOptions	+=	`  <li>
                      <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#column-largeDD"  onclick="handleChartevent(`+data.id+`,'view','DDenlarge')">Enlarge</a>
                    </li>`;
			}
			
					if(drilldeletepermission	==	true){
						chartsOptions	+=	` <li>
                                            <a class="dropdown-item" href="#"  onclick="handleChartevent('`+data.id+`','delete')">Delete</a>
                                        </li>`;
					}
					
					chartsOptions	+=	`</ul>`;
				}
		        		
		        	$(drillchartBody).append(`<div class="g-col-12" id"dashboard_showlist_`+data.id+`">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                   `+inlineEditContent+`
                                </h5>
                                <div class="date-picker">
								`+daterangeformatted+`
                                </div>
                            </div>
                            <div class="card-actions">
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg" >
                                    </button>
                                    `+chartsOptions+`
                                </div>
                            </div>
                        </div>
                        <div class="card-body row g-2">
                            <div class="col-12 col-md-6">
                                 <div class="form-group text-end">
                                <select class="deptChart">
                                </select>
                                </div>
                                <div style="width: 100%;" id="`+chartnamefield+data.id+`" class="chartdragElement"></div>
                             
                            </div>
                            <div class="col-12 col-md-6 drilldownTable_`+data.id+`">
                                    <table class="table table-bordered w-100" id="drilldownTable_`+data.id+`">
	                    <thead>
	                      <tr>
	                        <th rowspan="2" style="width: 40px;">
	                          <i class="fas fa-arrow-up"></i>
	                          <i class="fas fa-arrow-down"></i>
	                        </th>
	                        <th rowspan="2" style="width: 198px;">
	                          Name/Period
	                        </th>
	                        <th colspan="3">
	                          --
	                        </th>
	                      </tr>
	                      <tr>
	                        <th style="width: 98px;" data-i18n="Actual">Actual</th>
	                        <th style="width: 98px;" data-i18n="Target">Target</th>
	                        <th style="width: 98px;" data-i18n="Gap">Gap</th>
	                      </tr>
	                    </thead>
	                    <tbody>
	                    </tbody>
                                    </table>                              
                            </div>
                        </div>
                    </div>
                </div>`);
				$(".page-loader-wrapper").css("display", "none");
		        	
		            $("#datePickerdashboard"+data.id).daterangepicker({
		                forceUpdate: true,
		                periods: ["month", "quarter", "year"],
		                period: "month",
		                maxDate: [moment().add(30, "year"), "inclusive"],
		        	     ranges: {
		        	          "Last 30 days": [moment().subtract(29, "days"), moment()],
		        	          "Last 90 days": [moment().subtract(89, "days"), moment()],
		        	          "Last Year": [moment().subtract(1, "year").add(1, "day"), moment()],          
		        	          //'All Time': 'all-time' // [minDate, maxDate]
		        	        },
		                callback: function (startDate, endDate, period) {
		                  var title = startDate.format("L")+"-"+endDate.format("L");
		                  $(this).val(title);
		                },
		              });
		        	
		        	$(".page-loader-wrapper").css("display","none");
		        	initDateRangePicker("#datePickerdashboard"+data.id,data.id,'right');
					location.reload()
					
		        },
				error:function(){
					$(".page-loader-wrapper").css("display","none");
				}
		    });

          $("#drilldownTable_"+presentid).paging({ limit: 5 });
        }
		 if (dataElement == "BubbleChartComment" || dataElement == "PieChartComment" || dataElement == "LineChartComment" || dataElement == "StackedChartComment" || dataElement == "NegativeColumnChartComment" || dataElement == "MultiAxisComment" || dataElement == "AreaChartComment" || dataElement == "ColumnChartComment") {
        	if(createpermission	==	false){
          		return false;
          	}
          	var	action	=	"add";
			var	id		=	"";
		    var textObj = 	chartjsonform(id,action);	
		    var methodType = 'post';
			if(action	==	"edit"){
				methodType = 'put';	
				textObj.id 			= 	(id !=	""?id:"");
			}
			var largechart	=	$(".largechart");
			var chartnamefield	=	"Bubblechart";
	
			textObj.chartValue.type	=	dataElement;
		
			$(".page-loader-wrapper").css("display","block");
		    $.ajax({
		        url: "/stratroom/charts",
		        type: methodType,
		        async:false,
		        contentType: "application/json",
		        data: JSON.stringify(textObj),
		        success: function (data, status) {
		        	var chartmodalname	=	"";
		        	if(dataElement	==	"BubbleChartComment"){
		        		chartnamefield	=	"Bubblechart";
						$(largechart).attr("id","Bubblelarge"+data.id);
						chartmodalname	=	"bubble-large";
						charticonname	=	"images/widgets/Bubble.png";
					}else if(dataElement	==	"ColumnChartComment"){
						chartnamefield	=	"Columnchart";
						$(largechart).attr("id","Columnlarge"+data.id);
						chartmodalname	=	"column-large";
						charticonname	=	"images/widgets/Column.png";
						charticonaltname	=	"Column Chart";
					}else if(dataElement	==	"LineChartComment"){
						chartnamefield	=	"Linechart";
						$(largechart).attr("id","Linelarge"+data.id);
						chartmodalname	=	"line-large";
						charticonname	=	"images/widgets/Line.png";
						charticonaltname	=	"Line Chart";
					}else if(dataElement	==	"AreaChartComment"){
						chartnamefield	=	"Areachart";
						$(largechart).attr("id","Arealarge"+data.id);
						chartmodalname	=	"area-large";
						charticonname	=	"images/widgets/Area.png";
						charticonaltname	=	"Area Chart";
					}else if(dataElement	==	"PieChartComment"){
						chartnamefield	=	"Piechart";
						$(largechart).attr("id","Pielarge"+data.id);
						chartmodalname	=	"pie-large";
						charticonname	=	"images/widgets/Pie.png";
						charticonaltname	=	"Pie Chart";
					}else if(dataElement	==	"MultiAxisComment"){
						chartnamefield	=	"Multiaxis";
						$(largechart).attr("id","Multiaxislarge"+data.id);
						chartmodalname	=	"multiaxis-large";
						charticonname	=	"images/widgets/Multiaxis.png";
						charticonaltname	=	"Multiaxis Chart";
					}else if(dataElement	==	"StackedChartComment"){
						chartnamefield	=	"Stackedchart";
						$(largechart).attr("id","Stackedlarge"+data.id);
						chartmodalname	=	"stacked-large";
						charticonname	=	"images/widgets/Stacked.png";
						charticonaltname	=	"Stacked Chart";
					}else if(dataElement	==	"NegativeColumnChartComment"){
						chartnamefield	=	"NegativeColumnchart";
						$(largechart).attr("id","NegativeColumnlarge"+data.id);
						chartmodalname	=	"negative-large";
						charticonname	=	"images/widgets/NegativeC.png";
						charticonaltname	=	"Negative Chart";
					}
					
				var daterangeformatted	=	`<input
                    class=" top_datepicker "
                    id="datePickerdashboard`+data.id+`"
                    style="width: 100%;
                      margin-top: -4px;
                      text-align: left;
                      font-size: 10px !important;
                      font-weight: 500;
                      border: none !important;"
                  />`;
		        var inlineEditContent	=	`<strong>--</strong>`;
		        var fontsizesmaller	=	"";	
				var displaynameinline	=	"--";
				if(editpermission	==	false){
					fontsizesmaller	=	"font-size:smaller;"; 
		        }else{
		        	inlineEditContent	=	`<strong class="inlineeditableTxt" data-oldHeader="`+displaynameinline+`" data-type="text" data-id="`+data.id+`"
		                      editable="true"
		                      contenteditable="true"
		                      onkeypress="return (this.innerText.length <= 36)"
		                        > `+displaynameinline+` </strong>`;
		        	
		        } 
				var charte	=	"";
				if(viewpermission	==	false && deletepermission	==	false && (editpermission	==	false || createpermission	==	false)){
					charte	=	"";
				}else{
					charte = `<ul class="header-dropdown m-r--2" id="ChartOptions_`+dataElement+data.id+`"><li class="dropdown m-t--10" style="top: -3px !important;margin-left: -72px !important;">
					<span><img src="`+charticonname+`" width="18px" alt="`+charticonaltname+`"></span></li></ul>`;
				}
				var chartsOptions	=	"";
				if(viewpermission	==	false && deletepermission	==	false && (editpermission	==	false || createpermission == false)){
					chartsOptions	=	"";
				}else{
					chartsOptions	=	`<ul class="header-dropdown m-r--2" id="ChartOptions_`+dataElement+data.id+`">
		                    <li class="dropdown m-t--10">
		                      <a
		                        href="#"
		                        onclick="return false;"
		                        class="dropdown-toggle"
		                        data-toggle="dropdown"
		                        role="button"
		                        aria-haspopup="true"
		                        aria-expanded="true"
		                      >
		                        <i class="fas fa-ellipsis-h"></i>
		                      </a>
		                      <ul
		                        class="dropdown-menu editoptionparentdropdown-menu pull-right"
		                        x-placement="bottom-start"
		                        style="
		                          position: absolute;
		                          will-change: transform;
		                          top: 0px;
		                          left: 0px;
		                          transform: translate3d(0px, 24px, 0px);
		                        "
		                      >`;
					
					if(editpermission	==	true || createpermission	==	true){
						chartsOptions	+=	`<li class="editevent">
		                          <a
		                            href="#"
		                            data-toggle="modal"
		                            data-target="#chart_setting"
		                            onclick="handleChartevent('`+data.id+`','edit')"
									data-i18n="Settings"
		                            >Settings</a
		                          >
		                        </li>`;
					}
					
					if(viewpermission	==	true){
						chartsOptions	+=	`<li class="viewevent">
		                          <a href="#" 
		                            data-toggle="modal"
		                            data-target="#`+chartmodalname+`" onclick="handleChartevent('`+data.id+`','view')" data-i18n="Enlarge">Enlarge</a>
		                        </li>`;
					}
				
					if(deletepermission	==	true){
						chartsOptions	+=	`<li class="deleteevent">
		                          <a href="#" onclick="handleChartevent('`+data.id+`','delete')"data-i18n="Delete">Delete</a>
		                        </li>`;
					}
					
					chartsOptions	+=	`</ul></li></ul>`;
				}
				
				var csvchartsOptions	=	"";
				if(viewpermission	==	false && deletepermission	==	false && (editpermission	==	false || createpermission	==	false)){
					csvchartsOptions	=	"";
				}else{
					csvchartsOptions	=	`<ul class="header-dropdown m-r--2" id="csvChartOptions_`+dataElement+data.id+`" style="display:none;">
		                    <li class="dropdown m-t--10">
		                      <a
		                        href="#"
		                        onclick="return false;"
		                        class="dropdown-toggle"
		                        data-toggle="dropdown"
		                        role="button"
		                        aria-haspopup="true"
		                        aria-expanded="true"
		                      >
		                        <i class="fas fa-ellipsis-h"></i>
		                      </a>
		                      <ul
		                        class="dropdown-menu editoptionparentdropdown-menu pull-right"
		                        x-placement="bottom-start"
		                        style="
		                          position: absolute;
		                          will-change: transform;
		                          top: 0px;
		                          left: 0px;
		                          transform: translate3d(0px, 24px, 0px);
		                        "
		                      >`;
					
					if(editpermission	==	true || createpermission	==	true){
						csvchartsOptions	+=	`<li class="editevent">
		                          <a
		                            href="#"
		                            data-toggle="modal"
		                            data-target="#chart_setting"
		                            onclick="handleChartevent('`+data.id+`','edit')"
									data-i18n="Settings"
		                            >Settings</a
		                          >
		                        </li>`;
					}
					
					if(viewpermission	==	true){
						csvchartsOptions	+=	`<li class="viewevent">
		                          <a href="#" 
		                            data-toggle="modal"
		                            data-target="#`+chartmodalname+`" onclick="handleChartevent('`+data.id+`','view')" data-i18n="Enlarge">Enlarge</a>
		                        </li><li class="downloadevent">
		                          <a class="pointer" onclick="handleChartevent('`+data.id+`','csvdownload')"data-i18n="Download CSV">Download CSV</a>
			                        </li>`;
					}
				
					if(deletepermission	==	true){
						csvchartsOptions	+=	`<li class="deleteevent">
		                          <a class="pointer" onclick="handleChartevent('`+data.id+`','delete')"data-i18n="Delete">Delete</a>
		                        </li>`;
					}
					
					csvchartsOptions	+=	`</ul></li></ul>`;
				}
					$(chartBody)
            .append(`<div class="col-md-`+chartlayoutcol+` select-toggle chart chartlistdata sub_initiatives dashboard_showlist" id="dashboard_showlist_"`+data.id+`">
            <div class="card" style="padding: 4px ;">
              <div class="header row" style="margin: 0;">
                <div class="col-4" style="margin-left : -15px;`+fontsizesmaller+`">
                  <input
                    class=" top_datepicker "
                    id="datePickerdashboard`+data.id+`"
                    style="width: 100%;
                      margin-top: -4px;
                      text-align: left;
                      font-size: 10px !important;
                      font-weight: 500;
                      border: none !important;"
                  />
                  </div>
                  <div class="col-7"  style="margin-left : -19px;">
                    <h5 class="prob">
                      `+inlineEditContent+`
                    </h5>
                  </div>
                <div class="col-1"  style="margin-left : 23px;">
				`+charte+`
                <span class="d-flex pull-right" style="font-size: 16px;padding-top: 10px;padding-right: 18px;color: #565656;cursor: pointer;">
                	<i class="fas fa-table" id="Chart_`+dataElement+data.id+`"></i>
                	<i class="fas fa-chart-line" id="ChartTable_`+dataElement+data.id+`" style="display: none !important;"></i>
                </span>
                  `+chartsOptions+``+csvchartsOptions+`
                </div>
              </div>
              <div>
                <div style="width: 100%;" id="`+chartnamefield+data.id+`"></div>
                <div id="tag"></div>
                <div class="d-flex flex-column employee_div_body_box activities-box" id="showchartdrilldownTable_`+data.id+`" style="display:none !important;min-height:338px !important;">
                <div class="table-responsive tableheight chartdrilldownTable_`+data.id+`">
                  <table
                    class="table table-sm table-bordered w-100 text-center"
                    id="chartdrilldownTable_`+data.id+`"
                    style="margin-bottom: 0px !important;white-space:nowrap;"
                  >
                    <thead>
                      <tr>
                        <th rowspan="2" style="width: 198px;">
                          Name/Period
                        </th>
                        <th colspan="3" data-i18n="Monthly">
                          Monthly
                        </th>
                      </tr>
                      <tr>
                        <th data-i18n="Actual">Actual</th><th data-i18n="Target">Target</th><th data-i18n="Gap">Gap</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
              </div>
            </div>
          </div>`);
          
			        $("#datePickerdashboard"+data.id).daterangepicker({
			            forceUpdate: true,
			            periods: ["month", "quarter", "year"],
			            period: "month",
			            maxDate: [moment().add(30, "year"), "inclusive"],
			    	     ranges: {
			    	          "Last 30 days": [moment().subtract(29, "days"), moment()],
			    	          "Last 90 days": [moment().subtract(89, "days"), moment()],
			    	          "Last Year": [moment().subtract(1, "year").add(1, "day"), moment()],          
			    	          //'All Time': 'all-time' // [minDate, maxDate]
			    	        },
			            callback: function (startDate, endDate, period) {
			              var title = startDate.format("L")+"-"+endDate.format("L");
			              $(this).val(title);
			            },
			          });
					
          $("#chartdrilldownTable_"+data.id).paging({ limit: 5 });
			
            $("#Chart_"+dataElement+data.id).click(function () {
              $("#Chart_"+dataElement+data.id).hide();
              $("#showchartdrilldownTable_"+data.id).show();
              $("#"+chartnamefield+data.id).hide();
              $("#ChartTable_"+dataElement+data.id).show();
              $("#csvChartOptions_"+dataElement+data.id).attr("style", "display: block !important");
              $("#ChartOptions_"+dataElement+data.id).attr("style", "display: none !important");
            });
            $("#ChartTable_"+dataElement+data.id).click(function () {
              $("#Chart_"+dataElement+data.id).show();
              $("#ChartTable_"+dataElement+data.id).hide();
              $("#"+chartnamefield+data.id).show();
              $("#showchartdrilldownTable_"+data.id).attr("style", "display: none !important");
              $("#csvChartOptions_"+dataElement+data.id).attr("style", "display: none !important");
              $("#ChartOptions_"+dataElement+data.id).attr("style", "display: block !important");
            });
            
            var gettotalnoofchart	=	$("#chart-body .chartlistdata").length;
            var modulooperation	=	gettotalnoofchart%2;
	        var calposition	=	'';
	        if(modulooperation	==	0){
	        	calposition	=	'left';
	        }else{
	        	calposition	=	'right';
	        }	
            
				$(".page-loader-wrapper").css("display","none");
					initDateRangePicker("#datePickerdashboard"+data.id,data.id,calposition);
						location.reload()
		        },
				error:function(){
					$(".page-loader-wrapper").css("display","none");
				}
		    });
        }
}

function checkmodalisclosedornot(){
	if($('#chart_setting').is(':visible')	==	true){
		$(document.body).addClass('modal-open');				
	}
	if($('#kpi_formula_popup').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	if($('#chart_setting').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	
	setTimeout(function(){  $(document.body).addClass('modal-open');
	}, 1000);
	
}
					
$("#closePopupId,#chartclosePopupId").click(function(){
	checkmodalisclosedornot();
});

$(document).on('show.bs.modal', '.modal', function (event) {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});

function getDashbaordList() {
	
	var pagenourl	=	"";
	if(pageNo	!=	undefined && pageNo	!=	""){
		pagenourl	=	"pageId="+pageNo;
	}
	var emp="";
	if(navigatedEmp !="" || navigatedEmp != null){
        emp=navigatedEmp;
	}
	else{
		emp=currentEmp;
	}
    $.ajax({
        url: "/stratroom/retrieveChartsList/"+emp+"?"+ pagenourl,
        type: "GET",
        contentType: "application/json",
        success: function (response, status) {
           dashboardListShow(response);
        },
        error:readErrorMsg
    });
}

function dashboardListShow(result) {

	var widgetText	=	"";
	var chartposition	=	0;
    $.each(result, function (i, item) {
		var body		=	"";
		var layoutType 	= 	item.chartValue.type;
		var cardtypeselect 	= 	(item.chartValue.cardtypeselect != undefined?item.chartValue.cardtypeselect:"");
        if(layoutType	==	"BubbleChartDD" || layoutType	==	"ColumnChartDD" || layoutType	==	"LineChartDD" || layoutType	==	"AreaChartDD" || layoutType	==	"MultiAxisDD"){
			widgetChartDDLoad(item);
		}else if(layoutType == "BubbleChart" || layoutType == "PieChart" || layoutType == "LineChart" || layoutType == "StackedChart" || layoutType == "NegativeColumnChart" || layoutType == "ColumnChart" || layoutType == "MultiAxis" || layoutType == "AreaChart" ){
			widgetChartLoad(item,chartposition);
			chartposition++;
		}else if(layoutType == "BubbleChartComment" || layoutType == "PieChartComment" || layoutType == "LineChartComment" || layoutType == "StackedChartComment" || layoutType == "NegativeColumnChartComment" || layoutType == "ColumnChartComment" || layoutType == "MultiAxisComment" || layoutType == "AreaChartComment" ){
			widgetChartCommentLoad(item,chartposition);
			chartposition++;
		}
	});
}

function percentageToDegrees(percentage) {
	return percentage / 100 * 360
}

function widgetChartDDLoad(item){
		
	    var layoutType 	= 	item.chartValue.type;
		var chartdisplayname = 	(item.chartValue.displayname != undefined?item.chartValue.displayname:"");
		var inlinedisplayname= 	(item.chartValue.chartdisplayname != undefined?item.chartValue.chartdisplayname:"Drill Down Table");
		var formula 	= 	((item.chartValue.formula != undefined && item.chartValue.formula != "")?item.chartValue.formula:"");
		var fieldName 	= 	((item.chartValue.fieldName != undefined && item.chartValue.fieldName != "")?item.chartValue.fieldName:"");
		var datarangechart 	= 	((item.chartValue.datarangechart != undefined && item.chartValue.datarangechart != "")?item.chartValue.datarangechart:$("#datePeriod").val());
		var fieldvalue	=	"";
		var body		=	"";
		var tablerow 	= 	"";
		var tableheader = 	"";
		var quternamespan	=	3;
		var removeperiodheader	=	"";
		var checkfielditems	=	[];
		var largechart	=	$(".largechart");
		var chartnamefield	=	"Bubblechart";
		var chartmodalname	=	"";
		if(layoutType	==	"BubbleChartDD"){
			chartnamefield	=	"Bubblechart";
			$(largechart).attr("id","Bubblelarge"+item.id);
			chartmodalname	=	"column-largeDD";
		}else if(layoutType	==	"ColumnChartDD"){
			chartnamefield	=	"Columnchart";
			$(largechart).attr("id","Columnlarge"+item.id);
			chartmodalname	=	"column-largeDD";
			charticonname	=	"images/widgets/Column.png";
			charticonaltname	=	"Column Chart";
		}else if(layoutType	==	"LineChartDD"){
			chartnamefield	=	"Linechart";
			$(largechart).attr("id","Linelarge"+item.id);
			chartmodalname	=	"column-largeDD";
			charticonname	=	"images/widgets/Line.png";
			charticonaltname	=	"Line Chart";
		}else if(layoutType	==	"AreaChartDD"){
			chartnamefield	=	"Areachart";
			$(largechart).attr("id","Arealarge"+item.id);
			chartmodalname	=	"column-largeDD";
			charticonname	=	"images/widgets/Area.png";
			charticonaltname	=	"Area Chart";
		}else if(layoutType	==	"MultiAxisDD"){
			chartnamefield	=	"Multiaxis";
			$(largechart).attr("id","Multiaxislarge"+item.id);
			chartmodalname	=	"column-largeDD";
		}
		
		tableheader	=	'<th data-i18n="Actual">Actual</th><th data-i18n="Target">Target</th><th data-i18n="Gap">Gap</th>';
		
		var tableheight	=	"100";
		/*if(drillchartlayoutcol	==	12){
			tableheight	=	"85";
		}	*/
		var frequencyTable	=	"";
		var tableid	=	1;
		var measurement	=	((item.chartValue.measurement != undefined && item.chartValue.measurement != "")?item.chartValue.measurement:"Monthly");
		var chartsettings	=	((item.chartValue.chartsettings != undefined && item.chartValue.chartsettings != "")?item.chartValue.chartsettings:[]);	
		var chartdataloadval	=	[];
		var chartaxisfield	=	[];
		var colors =[];
		var checkdecimalornot	=	false;
		var percentage		=	false;

		
        var tableHeader	=	"";          
        if(frequencyTable	==	""){
        	tableHeader	=	`<thead>
                      <tr>
                      <th rowspan="2" style="width: 40px;">
	                   
	                  </th>
                        <th rowspan="2" style="width: 198px;">
                          Name/Period
                        </th>
                        <th colspan="3">
                          `+measurement+`
                        </th>
                      </tr>
                      <tr>
                        `+tableheader+`
                      </tr>
                    </thead>`;
        }          
        
        var daterangeformatted = ""
        var inlineEditContent	=	`<strong>`+inlinedisplayname+`</strong>`;
        var fontsizesmaller	=	"";
        
        	daterangeformatted	=`<input class=" top_datepicker  form-control form-control-sm" id="datePickerdashboard`+item.id+`" value="`+datarangechart+`"/>`;
        if(drilleditpermission	==	false){
			var datestring 	= 	datarangechart;

			fontsizesmaller	=	"font-size:smaller;"; 
        }else{
        	inlineEditContent	=	`<strong class="inlineeditableTxt" data-oldHeader="`+inlinedisplayname+`" data-type="text" data-id="`+item.id+`"
                      editable="true"
                      contenteditable="true"
                      onkeypress="return (this.innerText.length <= 36)"
                        >`+inlinedisplayname+`</strong
                      >`;
        }         
        
        var chartsOptions	=	"";
		if(drilldeletepermission	==	false && drillviewpermission	==	false && drilleditpermission	==	false){
			chartsOptions	=	"";
		}else{
			chartsOptions	=	` <ul class="dropdown-menu dropdown-menu-end border-0 shadow">`;
			
			if(drilleditpermission	==	true){
				chartsOptions	+=	`<li>
                                            <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal" data-typevalue="drill"
                                            onclick="handleChartevent(`+item.id+`,'edit','`+layoutType+`')">Settings</a>
                                        </li>`;
			}
			if(drillviewpermission	==	true){
				chartsOptions	+=	`<li>
                      <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#`+chartmodalname+`" onclick="handleChartevent(`+item.id+`,'view','DDenlarge')">Enlarge</a>
                    </li>`;
			}
			
			if(drilldeletepermission	==	true){
				chartsOptions	+=	`<li>
                                            <a class="dropdown-item" href="#"  onclick="handleChartevent(`+item.id+`,'delete','`+layoutType+`')">Delete</a>
                                        </li>`;
			}
			
			chartsOptions	+=	`</ul>`;
		}
		populateDeptReporteeList();	
		body	=	`<div class="g-col-12" id="dashboard_showlist_`+item.id+`">
                    <div class="card custom-card map-card h-100">
                        <div class="card-header">
                            <div class="c-header-left">
                                <h5 class="card-title">
                                   `+inlineEditContent+`
                                </h5>
                                <div class="date-picker">
								`+daterangeformatted+`
                                </div>
                            </div>
                            <div class="card-actions">
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg" >
                                    </button>
                                    `+chartsOptions+`
                                </div>
                            </div>
                        </div>
                        <div class="card-body row g-2">
                            <div class="col-12 col-md-6">
                                 <div class="form-group text-end">
                                </div>
                                <div style="width: 100%;" id="`+chartnamefield+``+item.id+`"></div>
                             <div id="tag"></div>
                            </div>
                            <div class="col-12 col-md-6 table-responsive drilldownTable_`+item.id+`">
                                    <table class="table table-bordered w-100" id="drilldownTable1_`+item.id+`">
                                        `+tableHeader+`
                                        <tbody>`+frequencyTable+`</tbody>
                                    </table>                              
                            </div>
                        </div>
                    </div>
                </div>`;	
		
$(drillchartBody).append(body);
		
		
	if(drilleditpermission	==	true || drillcreatepermission	==	true || drillcontentload	==	true){
		initDateRangePicker("#datePickerdashboard"+item.id,item.id,'right');
	}
  	
}

function resetChart(id,deptname){
	$.ajax({
			url : "/stratroom/charts/" + id,
			success : function(data){
				caldenderupdatewidgetChartDDLoad(data,deptname,true);
			},
			error:readErrorMsg
		});
}

function resetChartDD(id,deptname){
	$.ajax({
			url : "/stratroom/charts/" + id,
			success : function(data){
				chartDDviewSuccesscallback(data,deptname,true);
			},
			error:readErrorMsg
		});
}

var emlinc	=	0;

/*function employeeReportWise(id,deptname){
	$.ajax({
			url : "/stratroom/charts/" + id,
			success : function(data){
				emlinc++;
				employeeWiseReportSuccessCallback(data,deptname,emlinc);
			},
			error:readErrorMsg
		});
}*/

$(document).on('click', '.employeereportevent', function () {
    var $cell = $(this);
    var $row = $cell.closest('tr');
    var id = $cell.attr('data-id');
    var deptname = $cell.attr('data-deptname');
    var isLoaded = $cell.attr('data-loaded') === 'true';
    var $icon = $cell.find('.toggle-icon');

    if (!id) return;

    if (isLoaded) {
        // 💥 COLLAPSE
        $icon.removeClass('fa-minus').addClass('fa-plus');
        $cell.attr('data-loaded', 'false');
        $row.nextAll('.drilldown-child-row').remove();
    } else {
        // 🔽 EXPAND
        $icon.removeClass('fa-plus').addClass('fa-minus');
        $cell.attr('data-loaded', 'true');

        $.ajax({
            url: "/stratroom/charts/" + id,
            method: "GET",
            success: function (item) {
                employeeWiseReportSuccessCallback(item, deptname, "", $row);
            },
            error: function () {
                // Revert UI on error
                $icon.removeClass('fa-minus').addClass('fa-plus');
                $cell.attr('data-loaded', 'false');
                console.error("Failed to load chart config for drill-down");
            }
        });
    }
});

$(document).on('click',".employeeddreportevent",function(){
	var id 	=	$(this).attr("data-id");
	var deptname	=	$(this).attr("data-deptname");
	var callbackdeptname	=	$(this).closest('tbody').find('tr:first td:nth-child(2)').text();
	var countbackdeptname	=	$(this).closest('tbody').find('tr').length;
	if(countbackdeptname	==	1){
		callbackdeptname	=	"";
	}
	if(!id){
		return false;
	}
	$.ajax({
		url : "/stratroom/charts/" + id,
		success : function(data){
			employeeWiseReportDDSuccessCallback(data,deptname,callbackdeptname);
		},
		error:readErrorMsg
	});
	
});

function getRandomColor() {
	  var letters = '0123456789ABCDEF';
	  var color = '#';
	  for (var i = 0; i < 6; i++) {
	    color += letters[Math.floor(Math.random() * 16)];
	  }
	  return color;
	}

function employeeWiseReportSuccessCallback(item, deptname, callbackdeptname, $parentRow) {
    var tableElement = $(".drilldownTable_" + item.id);
    var datarangechart = (item.chartValue.datarangechart && item.chartValue.datarangechart !== "")
        ? item.chartValue.datarangechart
        : $("#datePeriod").val();
    var measurement = (item.chartValue.measurement && item.chartValue.measurement !== "")
        ? item.chartValue.measurement
        : "Monthly";
    var chartsettings = (item.chartValue.chartsettings && item.chartValue.chartsettings.length > 0)
        ? item.chartValue.chartsettings
        : [];

    if (!chartsettings || chartsettings.length === 0) return;

    // ✅ Use ONLY the first setting to avoid multiple AJAX calls
    var firstSetting = chartsettings[0];
    var fieldName = firstSetting.fieldtype || "";
    var chartformula = firstSetting.chartformula || "";
    var cleanDeptName = deptname ? deptname.replaceAll(':', " ") : "";

    var textObj = {
        fieldName: fieldName,
        formula: chartformula,
        period: datarangechart,
        type: "drillTable",
        groupBy: "Dept",
        tableType: "dril",
        deptName: cleanDeptName
    };

    $.ajax({
        url: "/stratroom/formula/kpiList?tableFrequency=" + measurement + "&groupBy=Dept",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(textObj),
        success: function (resultdata) {
            var childRowsHtml = "";
            var periods = [];
            tableElement.find("thead th[colspan]").each(function () {
                periods.push($(this).text().trim());
            });

            $.each(resultdata, function (index, frequencyitem) {
                $.each(frequencyitem, function (frequency, department) {
                    if (!department || jQuery.isEmptyObject(department)) return;

                    var hasChildren = department.childFlag === true;
                    var firstCell = hasChildren
                        ? `<td class="scrolldrill employeereportevent" 
                            data-deptname="${frequency}" 
                            data-id="${item.id}" 
                            data-loaded="false">
                            <i class="fas fa-plus toggle-icon"></i>
                        </td>`
                        : `<td class="scrolldrill">
                            <i class="fas fa-minus" style="visibility:hidden; color:transparent;"></i>
                        </td>`;

                    var childRow = `<tr class="drilldown-child-row" style="background:#f8f9fa;">`;
                    childRow += firstCell;
                    childRow += `<td>${frequency.split('-')[0] || frequency}</td>`;

                    periods.forEach(function (period) {
                        var quarterobj = department[period];
                        if (quarterobj && !['childFlag', 'overallGap', 'gapStatus'].includes(period)) {
                            var curr = quarterobj.currency || "";
                            childRow += `<td>${curr}${quarterobj.actual || ''}</td>`;
                            childRow += `<td>${curr}${quarterobj.target || ''}</td>`;
                            childRow += `<td>${curr}${quarterobj.gap || ''}</td>`;
                        } else {
                            childRow += `<td></td><td></td><td></td>`;
                        }
                    });

                    childRow += `</tr>`;
                    childRowsHtml += childRow;
                });
            });

            $parentRow.after(childRowsHtml);
        },
        error: function (xhr, status, error) {
            console.error("Drill-down data fetch failed:", error);
            // Revert UI on error
            var $cell = $parentRow.find('.employeereportevent');
            if ($cell.length) {
                $cell.attr('data-loaded', 'false');
                $cell.find('.toggle-icon').removeClass('fa-minus').addClass('fa-plus');
            }
        }
    });
}


function employeeWiseReportDDSuccessCallback(item,deptname,callbackdeptname){
		var tableElement	=	$(".drilldownTableDD");
		$(tableElement).empty();
	    var layoutType 	= 	item.chartValue.type;
		var chartdisplayname = 	(item.chartValue.displayname != undefined?item.chartValue.displayname:"");
		var inlinedisplayname = 	(item.chartValue.chartdisplayname != undefined?item.chartValue.chartdisplayname:"Drill Down Table");
		var formula 	= 	((item.chartValue.formula != undefined && item.chartValue.formula != "")?item.chartValue.formula:"");
		var fieldName 	= 	((item.chartValue.fieldName != undefined && item.chartValue.fieldName != "")?item.chartValue.fieldName:"");
		var datarangechart 	= 	((item.chartValue.datarangechart != undefined && item.chartValue.datarangechart != "")?item.chartValue.datarangechart:$("#datePeriod").val());
		
		var fieldvalue	=	"";
		var body		=	"";
		var tablerow 	= 	"";
		var tableheader = 	"";
		var quternamespan	=	3;
		var removeperiodheader	=	"";
		var checkfielditems	=	[];
		var largechart	=	"";
		var chartnamefield	=	"";
		var percentage		=	false;
		var millions 		= 	false;
		var currencyval 	= 	"$";
		
		if(layoutType	==	"BubbleChartDD"){
			$("#ColumnchartDD-1").empty();
		}else if(layoutType	==	"ColumnChartDD"){
			$("#ColumnchartDD-1").empty();
		}else if(layoutType	==	"LineChartDD"){
			$("#ColumnchartDD-1").empty();
		}else if(layoutType	==	"AreaChartDD"){
			$("#ColumnchartDD-1").empty();
		}else if(layoutType	==	"MultiAxisDD"){
			$("#ColumnchartDD-1").empty();
		}
		
		tableheader	=	'<th data-i18n="Actual">Actual</th><th data-i18n="Target">Target</th><th data-i18n="Gap">Gap</th>';
		
		var tableheight	=	"100";
		/*if(drillchartlayoutcol	==	12){
			tableheight	=	"85";
		}	*/
		var measurement	=	((item.chartValue.measurement != undefined && item.chartValue.measurement != "")?item.chartValue.measurement:"Monthly");
		var chartsettings	=	((item.chartValue.chartsettings != undefined && item.chartValue.chartsettings != "")?item.chartValue.chartsettings:[]);
		var frequencyTable	=	"";
		var tableid	=	1;	
		var chartdataloadval	=	[];
		var colors=[];
		var chartaxisfield	=	[];
		var checkdecimalornot	=	false;
		var percentage		=	false;
		
		if (jQuery.isEmptyObject(reporteelist)) {
			$.ajax({
				url: "/stratroom/completereporteeList",
				async: false,
				success: function (employeeList) {
					reporteelist = employeeList;
				}
			});
		}
		
		var tableid	=	1;
		var quaterheaderrow =	"";
		var quaterheaderbody=	"";
		var finalactualrows	=	"";
		var wholetableheader	=	"";
		var wholetableduplicate	=	[];		
		var rowcount	=	0;
		var xaxisfield	=	[];
		var resettHtml	=	"";
		if(chartsettings !=	undefined && chartsettings !=	'' && chartsettings.length	!=	0){
			var prevformula="";
			var prevData="";
			$.each(chartsettings, function (i, List) {
				var repull=true;
				var displayname 	= 	(List.displayname !=	undefined?List.displayname:"");
				var chartformula 	= 	(List.chartformula !=	undefined?List.chartformula:"");
				var axis 			= 	(List.axis !=	undefined?List.axis:"");
				var yfieldaxis		=	1;
				var zfieldaxis		=	1;
				var fieldName 		= 	(List.fieldtype !=	undefined?List.fieldtype:"");
				//var chartsettingsfieldname 	= 	(List.chartsettingsfieldname !=	undefined?List.chartsettingsfieldname:"");
				//var colorcode		=	(List.colorcode	==	"rgb(233, 236, 239)"?"#26a0fc":List.colorcode);
				var colorcode		=	getRandomColor();
				colors.push(colorcode);
				if(chartformula	!=	"" && chartformula !=	undefined){
					if(prevformula === chartformula)
					{
						repull =false;
					
					}else{
						prevData =""
					}

					prevformula=  chartformula;     
				deptname	=	deptname.replace(':'," ");
				var textObj	=	{"fieldName": fieldName,"formula": chartformula,"period": datarangechart,"type": "drillTable","groupBy":"Dept","tableType":"dril","deptName":deptname};
				$(".page-loader-wrapper").css("display","block");

			if(repull)
			{
			
				$.ajax({
				        url: "/stratroom/formula/kpiList?tableFrequency="+measurement+"&groupBy=Dept",
				        type: "post",
						async:false,
				        contentType: "application/json",
				        data: JSON.stringify(textObj),
				        success: function (resultdata, status) {
				        $(".page-loader-wrapper").css("display","none");
				        var fieldvalue	=	1;
						var chartvalue	=	1;
						var chartprogress	=	[];
						var series= [];
						var	employeename	=	"";
						prevData=resultdata;
						$.each(resultdata,function(index,data){
							var chartdataload = {};
							//quaterheaderbody = "";
							var rowi	=	0;
							var pagingheader	=	0;
							var indexinc = 0;
							$.each(data,function(frequency,objval){
								//finalactualrows	=	"";	
									var frequencyHeadertd	=	frequency;
									displayname=frequency;
									if(indexinc == 0){
										resettHtml	=	`<i class="fas fa-undo" id="ChartviewDD_`+layoutType+item.id+`" onclick="resetChartDD(`+item.id+`,'`+frequencyHeadertd+`')" style="display:none;"></i>`;
									}
									
									var chartdata	=	[];
									var chartcolumndata	=	[];
									quaterheaderrow = "";
									quaterheader = "";
									var functionParams = item.id+","+"'"+frequencyHeadertd+"'";
									functionParams = functionParams.replace(/ /g,":");
									var gapStatus	=	(objval.gapStatus !=	undefined?objval.gapStatus:"");
									//quaterheader 	+=	'<th colspan="`+quternamespan+`" style="font-weight: bold;text-align:center;">'+frequencyHeadertd+'</th>';
									//quaterheaderbody 	+=	"<tr><td class='scrolldrill'><i class=\""+gapStatus+"\"></i></td><td class='scrolldrill1 pointer' onclick=employeeReportWiseDD("+functionParams+") style='color:blue !important;'>"+frequencyHeadertd+"</td>";
									quaterheader 	+=	'<th colspan="`+quternamespan+`" style="font-weight: bold;text-align:center;">'+frequencyHeadertd+'</th>';
									quaterheaderbody 	+=	"<tr><td class='scrolldrill'><i class=\""+objval.gapStatus+"\"></i></td><td class='scrolldrill1 pointer employeeddreportevent' data-deptname='"+frequencyHeadertd+"' data-id="+item.id+" style='color:blue !important;'>"+frequencyHeadertd.split('-')[0]+"</td>";
									if(objval !=	"" && objval !=	undefined && !jQuery.isEmptyObject(objval)){
												$.each(objval,function(periodindex,quarterobj){
													if(periodindex 	!=	"overallGap" && periodindex 	!=	"gapStatus" && periodindex 	!=	"childFlag" && periodindex 	!=	""){
														if (jQuery.inArray(periodindex, wholetableduplicate) == -1) {
															wholetableduplicate.push(periodindex);
															wholetableheader	+=	`<th colspan="`+quternamespan+`">`+periodindex+`</th>`;
															if(xaxisfield && !xaxisfield.includes(periodindex))
															{
																xaxisfield.push(periodindex);
															}

														}
														var seriesjson = {}
														var data=[];
					
														var actualbody 	=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
														var targetbody 	=	(quarterobj.target !=	undefined?quarterobj.target:"");
														var gapbody 	=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
														var budgetbody 	=	(quarterobj.budget !=	undefined?quarterobj.budget:"");
														var forecastbody 	=	(quarterobj.forecast !=	undefined?quarterobj.forecast:"");
														var gapStatus	=	(quarterobj.gapStatus !=	undefined?quarterobj.gapStatus:"");
														if(typeof actualbody	===	"number"){
															actualbody	=	actualbody.toString();
														}if(typeof targetbody	===	"number"){
															targetbody	=	targetbody.toString();
														}if(typeof gapbody	===	"number"){
															gapbody	=	gapbody.toString();
														}if(typeof budgetbody	===	"number"){
															budgetbody	=	budgetbody.toString();
														}if(typeof forecastbody	===	"number"){
															forecastbody	=	forecastbody.toString();
														}
														if(quarterobj.currency !=	undefined && quarterobj.currency !=	""){
															currencyval= quarterobj.currency;
														}		
														var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
														var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
														var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");
														
														if(targetbody !=	""){
															quaterheaderrow 	+=	"<th data-i18n='Actual'>Actual</th><th data-i18n='Target'>Target</th><th data-i18n='Gap'>Gap</th>";
															quaterheaderbody 	+=	"<td class="+actualcolorhighlight+">"+quarterobj.currency+actualbody+"</td><td class="+targetcolorhighlight+">"+quarterobj.currency+targetbody+"</td><td class="+gapcolorhighlight+">"+quarterobj.currency+gapbody+"</td>";
														}
														
														if(rowi	==	0){
															rowcount++;
														}
														if((actualbody.includes("M") || targetbody.includes("M")) || millions	==	true)
														{
															millions = true;	
														}
														else if ((actualbody.includes("%") || targetbody.includes("%")) || percentage	==	true)
														{
															percentage = true;
														}
														
														
														actualbody		=	convertonumber(actualbody);
														targetbody		=	convertonumber(targetbody);
														gapbody			=	convertonumber(gapbody);
														budgetbody		=	convertonumber(budgetbody);
														forecastbody	=	convertonumber(forecastbody);
														if(!isNumeric(actualbody)){
															actualbody = 0;
														}
														if(!isNumeric(targetbody)){
															targetbody = 0
														}
														if(!isNumeric(gapbody)){
															gapbody = 0
														}
														chartvalue		=	actualbody;
															
														var fieldnamevalue	=	actualbody;
														if(fieldName	==	"Actual"){
															fieldnamevalue	=	actualbody;
														}else if(fieldName	==	"Target"){
															fieldnamevalue	=	targetbody;
														}else if(fieldName	==	"Gap"){
															fieldnamevalue	=	gapbody;
														}
														
														if(layoutType	==	"BubbleChartDD"){
															var numberformat 	=	(typeof actualbody === "number"?convertInttoStringAndStringtoInt(actualbody):actualbody);	
															if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
																percentage			=	true;
															}else if (numberformat.indexOf("%") >= 0) {
																percentage			=	true;
															}else if (numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
															}
															var numberformat 	=	(typeof targetbody === "number"?convertInttoStringAndStringtoInt(targetbody):targetbody);	
															if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
																percentage			=	true;
															}else if (numberformat.indexOf("%") >= 0) {
																percentage			=	true;
															}else if (numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
															}
																
															chartdata.push({"x":periodindex,"y":actualbody,"z":targetbody});
																
														}
										
														if(layoutType	==	"AreaChartDD" || layoutType	==	"MultiAxisDD" || layoutType	==	"ColumnChartDD" || layoutType	==	"LineChartDD"){
															fieldnamevalue	=	convertonumber(fieldnamevalue);
																
															chartcolumndata.push(fieldnamevalue);
																
														}
													}
											});
											

												if(layoutType	==	"BubbleChartDD" && chartcolumndata.length !=	0){
													chartdataload = {"name":displayname,data:chartdata};
												}else if(layoutType	==	"AreaChartDD" && chartcolumndata.length !=	0){
													chartdataload = {"name":displayname,data:chartcolumndata};//series
												}else if(layoutType	==	"LineChartDD" && chartcolumndata.length !=	0){
													chartdataload = {"name":displayname,data:chartcolumndata};//series
												}else if(layoutType	==	"MultiAxisDD" && chartcolumndata.length !=	0){
													chartdataload = {"name":displayname,"type":"column",data:chartcolumndata};//series
												}else if(layoutType	==	"ColumnChartDD" && chartcolumndata.length !=	0){
													chartdataload = {"name":displayname,"type":"column",data:chartcolumndata};//series
												}
										}
										
										quaterheaderbody	=	quaterheaderbody+"</tr>";
										tableid++;		
										rowi++;
										//chartaxisfield.push(xaxisfield);
										chartaxisfield	=	xaxisfield;
										if((layoutType	==	"BubbleChartDD" || layoutType	== "AreaChartDD" || layoutType	== "MultiAxisDD" || layoutType	== "ColumnChartDD" || layoutType	==	"LineChartDD") && !jQuery.isEmptyObject(chartdataload)){
											chartdataloadval.push(chartdataload);
										}
										indexinc++;
									});
									finalactualrows = finalactualrows+quaterheaderbody;
							});	
						},error: function(XMLHttpRequest, textStatus, errorThrown){
							$(".page-loader-wrapper").css("display","none");
						}
				    });
				    
				    }else {
						$(".page-loader-wrapper").css("display","none");

						var fieldvalue	=	1;
						var chartvalue	=	1;
						var chartprogress	=	[];
						var series= [];
						var	employeename	=	"";
						$.each(prevData,function(index,data){
							var chartdataload = {};
							//quaterheaderbody = "";
							var rowi	=	0;
							var pagingheader	=	0;
							var indexinc = 0;
							$.each(data,function(frequency,objval){
								//finalactualrows	=	"";	
									var frequencyHeadertd	=	frequency;
									displayname=frequency;
									if(indexinc == 0){
									}
									
									var chartdata	=	[];
									var chartcolumndata	=	[];
									quaterheaderrow = "";
									quaterheader = "";
									var functionParams = item.id+","+"'"+frequencyHeadertd+"'";
									functionParams = functionParams.replace(/ /g,":");
									var gapStatus	=	(objval.gapStatus !=	undefined?objval.gapStatus:"");
									//quaterheader 	+=	'<th colspan="`+quternamespan+`" style="font-weight: bold;text-align:center;">'+frequencyHeadertd+'</th>';
									//quaterheaderbody 	+=	"<tr><td class='scrolldrill'><i class=\""+gapStatus+"\"></i></td><td class='scrolldrill1 pointer' onclick=employeeReportWiseDD("+functionParams+") style='color:blue !important;'>"+frequencyHeadertd+"</td>";
									quaterheader 	+=	'<th colspan="`+quternamespan+`" style="font-weight: bold;text-align:center;">'+frequencyHeadertd+'</th>';
									//quaterheaderbody 	+=	"<tr><td class='scrolldrill'><i class=\""+objval.gapStatus+"\"></i></td><td class='scrolldrill1 pointer employeeddreportevent' data-deptname='"+frequencyHeadertd+"' data-id="+item.id+" style='color:blue !important;'>"+frequencyHeadertd.split('-')[0]+"</td>";
									if(objval !=	"" && objval !=	undefined && !jQuery.isEmptyObject(objval)){
												$.each(objval,function(periodindex,quarterobj){
													if(periodindex 	!=	"overallGap" && periodindex 	!=	"gapStatus" && periodindex 	!=	"childFlag" && periodindex 	!=	""){
														if (jQuery.inArray(periodindex, wholetableduplicate) == -1) {
															wholetableduplicate.push(periodindex);
															wholetableheader	+=	`<th colspan="`+quternamespan+`">`+periodindex+`</th>`;
															if(xaxisfield && !xaxisfield.includes(periodindex))
															{
																xaxisfield.push(periodindex);

															}

														}
														var seriesjson = {}
														var data=[];
					
														var actualbody 	=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
														var targetbody 	=	(quarterobj.target !=	undefined?quarterobj.target:"");
														var gapbody 	=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
														var budgetbody 	=	(quarterobj.budget !=	undefined?quarterobj.budget:"");
														var forecastbody 	=	(quarterobj.forecast !=	undefined?quarterobj.forecast:"");
														var gapStatus	=	(quarterobj.gapStatus !=	undefined?quarterobj.gapStatus:"");
														if(typeof actualbody	===	"number"){
															actualbody	=	actualbody.toString();
														}if(typeof targetbody	===	"number"){
															targetbody	=	targetbody.toString();
														}if(typeof gapbody	===	"number"){
															gapbody	=	gapbody.toString();
														}if(typeof budgetbody	===	"number"){
															budgetbody	=	budgetbody.toString();
														}if(typeof forecastbody	===	"number"){
															forecastbody	=	forecastbody.toString();
														}
														if(quarterobj.currency !=	undefined && quarterobj.currency !=	""){
															currencyval= quarterobj.currency;
														}		
														var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
														var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
														var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");
														
													
														
														if(rowi	==	0){
															rowcount++;
														}
														if((actualbody.includes("M") || targetbody.includes("M")) || millions	==	true)
														{
															millions = true;	
														}
														else if ((actualbody.includes("%") || targetbody.includes("%")) || percentage	==	true)
														{
															percentage = true;
														}
														
														
														actualbody		=	convertonumber(actualbody);
														targetbody		=	convertonumber(targetbody);
														gapbody			=	convertonumber(gapbody);
														budgetbody		=	convertonumber(budgetbody);
														forecastbody	=	convertonumber(forecastbody);
														if(!isNumeric(actualbody)){
															actualbody = 0;
														}
														if(!isNumeric(targetbody)){
															targetbody = 0
														}
														if(!isNumeric(gapbody)){
															gapbody = 0
														}
														chartvalue		=	actualbody;
															
														var fieldnamevalue	=	actualbody;
														if(fieldName	==	"Actual"){
															fieldnamevalue	=	actualbody;
														}else if(fieldName	==	"Target"){
															fieldnamevalue	=	targetbody;
														}else if(fieldName	==	"Gap"){
															fieldnamevalue	=	gapbody;
														}
														
														if(layoutType	==	"BubbleChartDD"){
															var numberformat 	=	(typeof actualbody === "number"?convertInttoStringAndStringtoInt(actualbody):actualbody);	
															if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
																percentage			=	true;
															}else if (numberformat.indexOf("%") >= 0) {
																percentage			=	true;
															}else if (numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
															}
															var numberformat 	=	(typeof targetbody === "number"?convertInttoStringAndStringtoInt(targetbody):targetbody);	
															if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
																percentage			=	true;
															}else if (numberformat.indexOf("%") >= 0) {
																percentage			=	true;
															}else if (numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
															}
																
															chartdata.push({"x":periodindex,"y":actualbody,"z":targetbody});
																
														}
										
														if(layoutType	==	"AreaChartDD" || layoutType	==	"MultiAxisDD" || layoutType	==	"ColumnChartDD" || layoutType	==	"LineChartDD"){
															fieldnamevalue	=	convertonumber(fieldnamevalue);
																
															chartcolumndata.push(fieldnamevalue);
																
														}
													}
											});
											

												if(layoutType	==	"BubbleChartDD" && chartcolumndata.length !=	0){
													chartdataload = {"name":displayname,data:chartdata};
												}else if(layoutType	==	"AreaChartDD" && chartcolumndata.length !=	0){
													chartdataload = {"name":displayname,data:chartcolumndata};//series
												}else if(layoutType	==	"LineChartDD" && chartcolumndata.length !=	0){
													chartdataload = {"name":displayname,data:chartcolumndata};//series
												}else if(layoutType	==	"MultiAxisDD" && chartcolumndata.length !=	0){
													chartdataload = {"name":displayname,"type":"column",data:chartcolumndata};//series
												}else if(layoutType	==	"ColumnChartDD" && chartcolumndata.length !=	0){
													chartdataload = {"name":displayname,"type":"column",data:chartcolumndata};//series
												}
										}
										
										quaterheaderbody	=	quaterheaderbody+"</tr>";
										tableid++;		
										rowi++;
										//chartaxisfield.push(xaxisfield);
										chartaxisfield	=	xaxisfield;
										if((layoutType	==	"BubbleChartDD" || layoutType	== "AreaChartDD" || layoutType	== "MultiAxisDD" || layoutType	== "ColumnChartDD" || layoutType	==	"LineChartDD") && !jQuery.isEmptyObject(chartdataload)){
											chartdataloadval.push(chartdataload);
										}
										indexinc++;
									});
									finalactualrows = finalactualrows+quaterheaderbody;
							});	
					}

				}	
									    
				   });
				   //each end 
		 		}
	
		var tableHeader	=	"";  
        if(finalactualrows	==	""){
        	tableHeader	=	`<thead>
                      <tr>
                      <th rowspan="2" style="width: 40px;">
	                    <i class="fas fa-arrow-up"></i>
	                    <i class="fas fa-arrow-down"></i>
	                  </th>
                        <th rowspan="2" style="width: 198px;">
                          Name/Period
                        </th>
                        <th colspan="`+quternamespan+`">
                          `+measurement+`
                        </th>
                      </tr>
                      <tr>
                        `+tableheader+`
                      </tr>
                    </thead>`;
        }
        
	body	=	`<div><span class="d-flex pull-right resetddundo`+item.id+`" style="font-size: 16px;padding-top: 10px;padding-right: 18px;color: #565656;cursor: pointer;">
                	`+resettHtml+`
                </span><br><br></div><table
                    class="table table-sm table-bordered w-100 text-center"
                    id="drilldownTable_`+item.id+`"
                    style="margin-bottom: 0px !important;white-space:nowrap;"
                  >
                  <thead>
                  	<tr>
                    <th class="scrolldrill" rowspan="2" style="vertical-align:middle !important;">
                        <i class="fas fa-arrow-up"></i>
                        <i class="fas fa-arrow-down"></i>
                    </th>
                    <th class="scrolldrill1" rowspan="2" style="vertical-align:middle !important;">Name/Period
                    </th>
                        `+wholetableheader+`
                    </tr>
                    <tr>
                        `+quaterheaderrow+`
                    </tr>
                    </thead>
                    <tbody>
                        `+finalactualrows+`
                     </tbody>   
                    </table>`;
		$(tableElement).append(body);
		
		if(layoutType	==	"BubbleChartDD"){
			bubbleRender(item.id,'largedd',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"ColumnChartDD"){
			ecolumnRenderDD(item.id,'largedd',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"LineChartDD"){
			elineRenderDD(item.id,'largedd',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"AreaChartDD"){
			eareaRenderDD(item.id,'largedd',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"MultiAxisDD"){
			emultiaxisRenderDD(item.id,'largedd',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}
		$("#ChartviewDD_"+layoutType+item.id).show();
		if(tableid	> 6){
			$("#drilldownTableDD_"+item.id).paging({ limit: 5});
		}
}
function populateDeptReporteeList() {
	const elements = [
		'.deptChart'
	];

	// Clear existing options for all elements
	elements.forEach(elementId => {
		$(elementId).empty();
	});

	// Perform a single AJAX request to get the department reportees
	$.ajax({
		url: "/stratroom/departmentReportees",
		async: true,
		success: function (deptList) {
			console.log(deptList);
			// Add options to each element
			elements.forEach(elementId => {
				deptList.forEach(dept => {
					addOption(elementId, dept.name, dept.id);
				});
			});

		}
	});
}

function convertonumber(value)
{
	value	=	(typeof value === "number"?convertInttoStringAndStringtoInt(value):value);
	return value.replace(/[^\d.-]/g, '');	
}


function isNumeric(str) {
	  if (typeof str != "string") return false // we only process strings!  
	  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
	         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
	}


function widgetChartLoad(item, chartposition) {
    var layoutType      =   item.chartValue.type;
    var chartdisplayname    =   (item.chartValue.displayname != undefined && item.chartValue.displayname != "" ? item.chartValue.displayname : "");
    var inlinedisplayname   =   (item.chartValue.chartdisplayname != undefined && item.chartValue.chartdisplayname != "" ? item.chartValue.chartdisplayname : "--");
    var measurement =   (item.chartValue.measurement != undefined && item.chartValue.measurement != "" ? item.chartValue.measurement : "Monthly");
    var chartsettings   =   item.chartValue.chartsettings;
    var fieldName   =   ((item.chartValue.fieldName != undefined && item.chartValue.fieldName != "") ? item.chartValue.fieldName : "");
    var datarangechart  =   ((item.chartValue.datarangechart != undefined && item.chartValue.datarangechart != "") ? item.chartValue.datarangechart : $("#datePeriod").val());
    
    var body        =   "";
    
    var tableheight =   "100";
    if(chartlayoutcol   ==  4){
        tableheight =   "85";
    }
    var largechart  =   $(".largechart");
    var chartnamefield  =   "Bubblechart";
    var chartmodalname  =   "";
    
    if(layoutType   ==  "BubbleChart"){
        chartnamefield  =   "Bubblechart";
        $(largechart).attr("id","Bubblelarge"+data.id);
        chartmodalname  =   "bubble-large";
        charticonname   =   "images/widgets/Bubble.png";
    }else if(layoutType ==  "ColumnChart"){
        chartnamefield  =   "Columnchart";
        $(largechart).attr("id","Columnlarge"+data.id);
        chartmodalname  =   "column-large";
        charticonname   =   "images/widgets/Column.png";
        charticonaltname    =   "Column Chart";
    }else if(layoutType ==  "LineChart"){
        chartnamefield  =   "Linechart";
        $(largechart).attr("id","Linelarge"+data.id);
        chartmodalname  =   "line-large";
        charticonname   =   "images/widgets/Line.png";
        charticonaltname    =   "Line Chart";
    }else if(layoutType ==  "AreaChart"){
        chartnamefield  =   "Areachart";
        $(largechart).attr("id","Arealarge"+data.id);
        chartmodalname  =   "area-large";
        charticonname   =   "images/widgets/Area.png";
        charticonaltname    =   "Area Chart";
    }else if(layoutType ==  "PieChart"){
        chartnamefield  =   "Piechart";
        $(largechart).attr("id","Pielarge"+data.id);
        chartmodalname  =   "pie-large";
        charticonname   =   "images/widgets/Pie.png";
        charticonaltname    =   "Pie Chart";
    }else if(layoutType ==  "MultiAxis"){
        chartnamefield  =   "Multiaxis";
        $(largechart).attr("id","Multiaxislarge"+data.id);
        chartmodalname  =   "multiaxis-large";
        charticonname   =   "images/widgets/Multiaxis.png";
        charticonaltname    =   "Multiaxis Chart";
    }else if(layoutType ==  "StackedChart"){
        chartnamefield  =   "Stackedchart";
        $(largechart).attr("id","Stackedlarge"+data.id);
        chartmodalname  =   "stacked-large";
        charticonname   =   "images/widgets/Stacked.png";
        charticonaltname    =   "Stacked Chart";
    }else if(layoutType ==  "NegativeColumnChart"){
        chartnamefield  =   "NegativeColumnchart";
        $(largechart).attr("id","NegativeColumnlarge"+data.id);
        chartmodalname  =   "negative-large";
        charticonname   =   "images/widgets/NegativeC.png";
        charticonaltname    =   "Negative Chart";
    }   
    
    var chartdataloadval    =   [];
    var chartaxisfield  =   [];
    var checkdecimalornot   =   false;
    var percentage      =   false;
    var tablerow    =   "";
    var tableheader =   "";
    var quternamespan   =   3;
    var removeperiodheader  =   "";
    tableheader =   '<th data-i18n="Actual">Actual</th><th data-i18n="Target">Target</th><th data-i18n="Gap">Gap</th>';

    var daterangeformatted = "";
    var inlineEditContent   =   `<strong>`+inlinedisplayname+`</strong>`;
    var fontsizesmaller =   "";
    
    daterangeformatted  =   `<input class="top_datepicker form-control form-control-sm" id="datePickerdashboard`+item.id+`" value="`+datarangechart+`"
                style="width: 100%; margin-top: -4px; text-align: left; font-size: 10px !important; font-weight: 500; border: none !important;" />`;
                  
    if(editpermission   ==  false){
        var datestring  =   datarangechart;
        fontsizesmaller =   "font-size:smaller;";
    }else{
        inlineEditContent   =   `<strong class="inlineeditableTxt" data-oldHeader="`+inlinedisplayname+`" data-type="text" data-id="`+item.id+`"
                      editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">`+inlinedisplayname+`</strong>`;
    }         
    
    var charte  =   "";
    if(viewpermission   ==  false && deletepermission   ==  false && (editpermission  ==  false || createpermission ==  false)){
        charte  =   "";
    }else{
        charte = `<ul class="header-dropdown m-r--2" id="ChartOptions_`+layoutType+item.id+`"><li class="dropdown m-t--10" style="top: -3px !important;margin-left: -72px !important;">
        <span><img src="`+charticonname+`" width="18px" alt="`+charticonaltname+`"></span></li></ul>`;
    }
    
    var chartsOptions   =   "";
    if(viewpermission   ==  false && deletepermission   ==  false && editpermission   ==  false){
        chartsOptions   =   "";
    }else{
        chartsOptions   =   `<ul class="dropdown-menu dropdown-menu-end border-0 shadow" id="ChartOptions_`+layoutType+item.id+`" style="">`;
        
        if(editpermission ==  true){
            chartsOptions +=  `<li>
                <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal"
                    onclick="handleChartevent(`+item.id+`,'edit')">Settings</a>
            </li>`;
        }
        
        if(viewpermission ==  true){
            chartsOptions +=  `<li>
                <a class="dropdown-item" href="#`+chartmodalname+`" 
                    data-bs-toggle="modal" onclick="handleChartevent(`+item.id+`,'view')">Enlarge</a>
            </li>`;
        }
        
        if(deletepermission ==  true){
            chartsOptions +=  `<li>
                <a class="dropdown-item" href="#" onclick="handleChartevent(`+item.id+`,'delete')">Delete</a>
            </li>`;
        }
        
        chartsOptions +=  `</ul>`;
    }
    
    var csvchartsOptions  =   "";
    if(viewpermission   ==  false && deletepermission   ==  false && editpermission   ==  false){
        csvchartsOptions  =   "";
    }else{
        csvchartsOptions  = `<ul class="dropdown-menu dropdown-menu-end border-0 shadow" id="csvChartOptions_`+layoutType+item.id+`" style="display:none;">`;
        
        if(editpermission ==  true){
            csvchartsOptions  +=  `<li>
                <a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal" onclick="handleChartevent(`+item.id+`,'edit')" >Settings</a>
            </li>`;
        }
        
        if(viewpermission ==  true){
            csvchartsOptions  +=  `<li>
                <a class="dropdown-item" href="#`+chartmodalname+`"  
                    data-bs-toggle="modal" onclick="handleChartevent(`+item.id+`,'view')" >Enlarge</a>
            </li>`;
            csvchartsOptions  +=  `<li class="downloadevent">
                <a class="pointer" onclick="handleChartevent(`+item.id+`,'csvdownload')" data-i18n="Download CSV">Download CSV</a>
            </li>`;
        }
        
        if(deletepermission ==  true){
            csvchartsOptions  +=  `<li>
                <a class="dropdown-item" href="#" onclick="handleChartevent(`+item.id+`,'delete')">Delete</a>
            </li>`;
        }
        
        csvchartsOptions  +=  `</ul>`;
    }
                    
    body    =   `<div class="col-md-`+chartlayoutcol+`" id="dashboard_showlist_`+item.id+`">
                <div class="card custom-card map-card h-100">
                    <div class="card-header">
                        <div class="c-header-left">
                            <h5 class="card-title">
                                <strong editable="true" contenteditable="true"
                                    onkeypress="return (this.innerText.length <= 36)">% Customer
                                    conversion rate (measured)</strong>
                            </h5>
                            <div class="date-picker">
                                `+daterangeformatted+`
                            </div>
                        </div>
                        <div class="card-actions">
                            <div>
                                <i class="btn btn-sm btn-icon fas fa-table" id="Chart_`+layoutType+item.id+`" style="cursor: pointer;"></i>
                                <i class="btn btn-sm btn-icon fas fa-chart-line" id="ChartTable_`+layoutType+item.id+`" style="display: none !important; cursor: pointer;"></i>
                            </div>
                            <div class="dropdown">
                                <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                                </button>
                               `+chartsOptions+`
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div>
                            <div class="form-group text-end"></div>
                            <div style="width: 100%;" id="`+chartnamefield+``+item.id+`"></div>
                        </div>
                        <div class="flex-column employee_div_body_box activities-box" id="showchartdrilldownTable_`+item.id+`" style="display: none;">
                            <div class="table-responsive tableheight chartdrilldownTable_`+item.id+`">
                                <table class="table table-bordered w-100" id="chartdrilldownTable_`+item.id+`"> 
                                    <thead>
                                        <tr>
                                            <th rowspan="2" style="width: 198px;">Name/Period</th>
                                            <th colspan="`+quternamespan+`" `+removeperiodheader+`>`+measurement+`</th>
                                        </tr>
                                        <tr>`+tableheader+`</tr>
                                    </thead>
                                    <tbody>`+tablerow+`</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    
    // Append to DOM
    $(chartBody).append(body);
    
    // Initialize table paging
    $("#chartdrilldownTable_"+item.id).paging({ limit: 5 });
    
    // ✅ FIX: Define selectors once
    const chartBtnSelector = "#Chart_" + layoutType + item.id;
    const tableBtnSelector = "#ChartTable_" + layoutType + item.id;
    const chartOptionsSelector = "#ChartOptions_" + layoutType + item.id;
    const csvChartOptionsSelector = "#csvChartOptions_" + layoutType + item.id;
    const chartContainerSelector = "#" + chartnamefield + item.id;
    const tableContainerSelector = "#showchartdrilldownTable_" + item.id;
    
    // ✅ FIX: Unbind first, then bind - prevents duplicate handlers on re-render
    // Chart → Table toggle
    $(chartBtnSelector).off('click').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        $(chartBtnSelector).hide();
        $(tableContainerSelector).show().css("min-height", "338px !important");
        $(chartContainerSelector).hide();
        $(tableBtnSelector).show();
        $(csvChartOptionsSelector).css("display", "block !important");
        $(chartOptionsSelector).css("display", "none !important");
        
        return false;
    });
    
    // Table → Chart toggle
    $(tableBtnSelector).off('click').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        $(chartBtnSelector).show();
        $(tableBtnSelector).hide();
        $(chartContainerSelector).show();
        $(tableContainerSelector).hide().css("display", "none !important");
        $(chartOptionsSelector).css("display", "block !important");
        $(csvChartOptionsSelector).css("display", "none !important");
        
        return false;
    });
    
    // Date picker initialization
    var modulooperation = chartposition % 2;
    var calposition = 'right';
    if(modulooperation == 1){
        calposition = 'left';
    }
    
    if(editpermission == true || createpermission == true || cockpitcontentload == true){
        initDateRangePicker("#datePickerdashboard"+item.id, item.id, calposition);
    }
}

function widgetChartCommentLoad(item, chartposition) {
    var layoutType = item.chartValue.type;
    var chartdisplayname = (item.chartValue.displayname != undefined && item.chartValue.displayname != "" ? item.chartValue.displayname : "");
    var inlinedisplayname = (item.chartValue.chartdisplayname != undefined && item.chartValue.chartdisplayname != "" ? item.chartValue.chartdisplayname : "--");
    var measurement = (item.chartValue.measurement != undefined && item.chartValue.measurement != "" ? item.chartValue.measurement : "Monthly");
    var chartsettings = item.chartValue.chartsettings;
    var fieldName = ((item.chartValue.fieldName != undefined && item.chartValue.fieldName != "") ? item.chartValue.fieldName : "");
    var datarangechart = ((item.chartValue.datarangechart != undefined && item.chartValue.datarangechart != "") ? item.chartValue.datarangechart : $("#datePeriod").val());

    var body = "";
    var tableheight = "100";
    if (chartlayoutcol == 4) {
        tableheight = "85";
    }
    var largechart = $(".largechart");
    var chartnamefield = "BubblechartComment";
    var chartmodalname = "";
    
    if (layoutType == "BubbleChartComment") {
        chartnamefield = "Bubblechart";
        $(largechart).attr("id", "Bubblelarge" + data.id);
        chartmodalname = "bubble-large";
        charticonname = "images/widgets/Bubble.png";
    } else if (layoutType == "ColumnChartComment") {
        chartnamefield = "Columnchart";
        $(largechart).attr("id", "Columnlarge" + data.id);
        chartmodalname = "column-large";
        charticonname = "images/widgets/Column.png";
        charticonaltname = "Column Chart";
    } else if (layoutType == "LineChartComment") {
        chartnamefield = "Linechart";
        $(largechart).attr("id", "Linelarge" + data.id);
        chartmodalname = "line-large";
        charticonname = "images/widgets/Line.png";
        charticonaltname = "Line Chart";
    } else if (layoutType == "AreaChartComment") {
        chartnamefield = "Areachart";
        $(largechart).attr("id", "Arealarge" + data.id);
        chartmodalname = "area-large";
        charticonname = "images/widgets/Area.png";
        charticonaltname = "Area Chart";
    } else if (layoutType == "PieChartComment") {
        chartnamefield = "Piechart";
        $(largechart).attr("id", "Pielarge" + data.id);
        chartmodalname = "pie-large";
        charticonname = "images/widgets/Pie.png";
        charticonaltname = "Pie Chart";
    } else if (layoutType == "MultiAxisComment") {
        chartnamefield = "Multiaxis";
        $(largechart).attr("id", "Multiaxislarge" + data.id);
        chartmodalname = "multiaxis-large";
        charticonname = "images/widgets/Multiaxis.png";
        charticonaltname = "Multiaxis Chart";
    } else if (layoutType == "StackedChartComment") {
        chartnamefield = "Stackedchart";
        $(largechart).attr("id", "Stackedlarge" + data.id);
        chartmodalname = "stacked-large";
        charticonname = "images/widgets/Stacked.png";
        charticonaltname = "Stacked Chart";
    } else if (layoutType == "NegativeColumnChartComment") {
        chartnamefield = "NegativeColumnchart";
        $(largechart).attr("id", "NegativeColumnlarge" + data.id);
        chartmodalname = "negative-large";
        charticonname = "images/widgets/NegativeC.png";
        charticonaltname = "Negative Chart";
    }

    var chartdataloadval = [];
    var chartaxisfield = [];
    var checkdecimalornot = false;
    var percentage = false;
    var tablerow = "";
    var tableheader = "";
    var quternamespan = 3;
    var removeperiodheader = "";
    tableheader = '<th data-i18n="Actual">Actual</th><th data-i18n="Target">Target</th><th data-i18n="Gap">Gap</th>';

    var daterangeformatted = "";
    var inlineEditContent = `<strong>${inlinedisplayname}</strong>`;
    var fontsizesmaller = "";

    daterangeformatted = `<input class="top_datepicker form-control form-control-sm" id="datePickerdashboard${item.id}" value="${datarangechart}"
                style="width: 100%; margin-top: -4px; text-align: left; font-size: 10px !important; font-weight: 500; border: none !important;" />`;

    if (editpermission == false) {
        fontsizesmaller = "font-size:smaller;";
    } else {
        inlineEditContent = `<strong class="inlineeditableTxt" data-oldHeader="${inlinedisplayname}" data-type="text" data-id="${item.id}"
                      editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)">${inlinedisplayname}</strong>`;
    }

    var charte = "";
    if (viewpermission == false && deletepermission == false && (editpermission == false || createpermission == false)) {
        charte = "";
    } else {
        charte = `<ul class="header-dropdown m-r--2" id="ChartOptions_${layoutType}${item.id}"><li class="dropdown m-t--10" style="top: -3px !important;margin-left: -72px !important;">
					<span><img src="${charticonname}" width="18px" alt="${charticonaltname}"></span></li></ul>`;
    }

    var chartsOptions = "";
    if (viewpermission == false && deletepermission == false && editpermission == false) {
        chartsOptions = "";
    } else {
        chartsOptions = `<ul class="dropdown-menu dropdown-menu-end border-0 shadow" id="ChartOptions_${layoutType}${item.id}" style="">`;
        if (editpermission == true) {
            chartsOptions += `<li><a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal" onclick="handleChartevent(${item.id},'edit')">Settings</a></li>`;
        }
        if (viewpermission == true) {
            chartsOptions += `<li><a class="dropdown-item" href="#${chartmodalname}" data-bs-toggle="modal" onclick="handleChartevent(${item.id},'view')">Enlarge</a></li>`;
        }
        if (deletepermission == true) {
            chartsOptions += `<li><a class="dropdown-item" href="#" onclick="handleChartevent(${item.id},'delete')">Delete</a></li>`;
        }
        chartsOptions += `</ul>`;
    }

    var csvchartsOptions = "";
    if (viewpermission == false && deletepermission == false && editpermission == false) {
        csvchartsOptions = "";
    } else {
        csvchartsOptions = `<ul class="dropdown-menu dropdown-menu-end border-0 shadow" id="csvChartOptions_${layoutType}${item.id}" style="display:none;">`;
        if (editpermission == true) {
            csvchartsOptions += `<li><a class="dropdown-item" href="#chart_setting" data-bs-toggle="modal" onclick="handleChartevent(${item.id},'edit')">Settings</a></li>`;
        }
        if (viewpermission == true) {
            csvchartsOptions += `<li><a class="dropdown-item" href="#${chartmodalname}" data-bs-toggle="modal" onclick="handleChartevent(${item.id},'view')">Enlarge</a></li>`;
            csvchartsOptions += `<li class="downloadevent"><a class="pointer" onclick="handleChartevent(${item.id},'csvdownload')" data-i18n="Download CSV">Download CSV</a></li>`;
        }
        if (deletepermission == true) {
            csvchartsOptions += `<li><a class="dropdown-item" href="#" onclick="handleChartevent(${item.id},'delete')">Delete</a></li>`;
        }
        csvchartsOptions += `</ul>`;
    }

    // ✅ HTML Structure: Chart + Comments + Table Toggle
    body = `
<div class="col-md-12" id="dashboard_showlist_${item.id}">
  <div class="card custom-card map-card h-100">
    <div class="card-header">
      <div class="c-header-left">
        <h5 class="card-title">
          ${inlineEditContent}
        </h5>
        <div class="date-picker">
          ${daterangeformatted}
        </div>
      </div>
      <div class="card-actions">
        <div>
          <i class="btn btn-sm btn-icon fas fa-table" id="Chart_${layoutType}${item.id}" style="cursor: pointer;"></i>
          <i class="btn btn-sm btn-icon fas fa-chart-line" id="ChartTable_${layoutType}${item.id}" style="display: none !important; cursor: pointer;"></i>
        </div>
        <div class="dropdown">
          <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
          </button>
          ${chartsOptions}
        </div>
      </div>
    </div>
    <div class="card-body">
      <!-- Chart + Comments Section -->
      <div id="chartAndComments_${item.id}" style="display: flex; gap: 16px; width: 100%;">
        <div style="width: 50%;" id="${chartnamefield}${item.id}"></div>
        <div style="flex: 1;">
          <label>Comments</label>
          <textarea 
            class="chartscomment"
            name="chartComments" 
            id="chartComments_${item.id}" 
            data-pref-id="${item.chartPreferenceDetailList.length > 0 ? item.chartPreferenceDetailList[0].id : ''}"
            style="width: 100%; height: 150px; border: 1px solid #dddd;"
          >${item.chartPreferenceDetailList.length > 0 ? (item.chartPreferenceDetailList[0].preferenceValue?.comments || '') : ''}</textarea>
          <button 
            class="btn btn-primary initative_save_btn"
            style="margin-left: 534px; background-color: #dddd; height: 23px; width: 40px; border: 1px solid rgba(0, 0, 0, 0.3); font-size: 11px; color: black;"
            onclick="savedashboardChartComment(${item.id})">
            Save
          </button>
        </div>
      </div>

      <!-- Table Section (hidden by default) -->
      <div class="flex-column employee_div_body_box activities-box" id="showchartdrilldownTable_${item.id}" style="display: none;">
        <div class="table-responsive tableheight chartdrilldownTable_${item.id}">
          <table class="table table-bordered w-100" id="chartdrilldownTable_${item.id}">
            <thead>
              <tr>
                <th rowspan="2" style="width: 198px;">Name/Period</th>
                <th colspan="${quternamespan}" ${removeperiodheader}>${measurement}</th>
              </tr>
              <tr>${tableheader}</tr>
            </thead>
            <tbody>${tablerow}</tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>`;

    // Append to DOM
    $(chartBody).append(body);

    // Initialize table paging
    $("#chartdrilldownTable_" + item.id).paging({ limit: 5 });

    // ✅ FIX: Define selectors once for consistency
    const chartBtnSelector = `#Chart_${layoutType}${item.id}`;
    const tableBtnSelector = `#ChartTable_${layoutType}${item.id}`;
    const chartAndCommentsSelector = `#chartAndComments_${item.id}`;
    const tableContainerSelector = `#showchartdrilldownTable_${item.id}`;
    const chartOptionsSelector = `#ChartOptions_${layoutType}${item.id}`;
    const csvChartOptionsSelector = `#csvChartOptions_${layoutType}${item.id}`;

    // 🔹 Chart → Table toggle (show table view)
    $(chartBtnSelector).off('click').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();      // ✅ Prevent event bubbling to dropdown
        e.stopImmediatePropagation(); // ✅ Extra safeguard
        
        $(chartAndCommentsSelector).hide();
        $(tableContainerSelector).show().css('min-height', '338px');
        $(chartBtnSelector).hide();
        $(tableBtnSelector).show();
        $(chartOptionsSelector).hide();
        $(csvChartOptionsSelector).show();
        
        return false; // ✅ Final prevention
    });

    // 🔹 Table → Chart toggle (show chart+comments view)
    $(tableBtnSelector).off('click').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();      // ✅ Prevent event bubbling to dropdown
        e.stopImmediatePropagation(); // ✅ Extra safeguard
        
        $(chartAndCommentsSelector).show().css('display', 'flex');
        $(tableContainerSelector).hide();
        $(chartBtnSelector).show();
        $(tableBtnSelector).hide();
        $(chartOptionsSelector).show();
        $(csvChartOptionsSelector).hide();
        
        return false; // ✅ Final prevention
    });

    // Initialize date picker
    var modulooperation = chartposition % 2;
    var calposition = (modulooperation == 1) ? 'left' : 'right';
    if (editpermission == true || createpermission == true || cockpitcontentload == true) {
        initDateRangePicker("#datePickerdashboard" + item.id, item.id, calposition);
    }
}

function populateDeptChartSelectForChart(itemId) {
    var selectElement = $("#dashboard_showlist_" + itemId + " .deptChart");
    
    // Clear existing options
    selectElement.empty();
    
    // DO NOT add "All Departments" option - only show API results
    
    // Get department data using your existing API
    $.ajax({
        url: "/stratroom/departmentReportees",
        async: true,
        success: function (deptList) {
            console.log("Departments for chart " + itemId + ":", deptList);
            
            // Add departments to the specific chart's dropdown
            deptList.forEach(dept => {
                selectElement.append('<option value="' + dept.id + '">' + dept.name + '</option>');
            });
        }
    });
}

function savedashboardTable() {
	var action	=	$("#dashbard_table_Form input[name='action']").val();
	var id		=	$("#dashbard_table_Form input[name='id']").val();
	var textObj = 	datatablejsonform(id,action);
	
    var methodType = 'post';
	if(action	==	"edit"){
		methodType = 'put';	
		textObj.id 			= 	(id !=	""?id:"");
	}
	
    $.ajax({
        url: "/stratroom/charts",
        type: methodType,
        contentType: "application/json",
        data: JSON.stringify(textObj),
        success: function (data, status) {
            location.reload(true);
        },
		error:readErrorMsg
    });
}

function colorcodevalue(colorvalue){
	var color	=	"#000000";
	if(colorvalue !=	"" && colorvalue !=	undefined){
     	var colorstartposition	=	colorvalue.indexOf("rgb");
     	var colorendposition	=	colorvalue.indexOf(")")+1;
     	if(colorstartposition !=	-1 && colorendposition !=	-1){
     		color	=	colorvalue.substr(colorstartposition,colorendposition);
     	}else{
     		color	=	colorvalue;
     	}
     }
	return color;
}
            
function savedashboardChart() {
	var action	=	$("#dashbard_chart_Form input[name='action']").val();
	var id		=	$("#dashbard_chart_Form input[name='id']").val();
	var textObj = 	chartjsonform(id,action);
	
	var chartsettings	=	[];
	var idindex	=	0;
	$('.chartsettingsappend').each(function(val,index){
		var displayname		=	$(this).find('.multidisplayname').val();
		var chartformula	=	$(this).nextAll().find('.chart_formula').val();
		var multiaxis		=	$(this).nextAll().find('.multiaxis').val();
		var multitypefield	=	$(this).nextAll().find('.multitypefield').val();
		var methodtype	=	$(".addchartsettings").attr("data-typeoftable");
		if(methodtype	==	"BubbleChartDD" || methodtype	==	"ColumnChartDD" || methodtype	==	"LineChartDD" || 
				methodtype	==	"AreaChartDD" || methodtype	==	"MultiAxisDD" ){
			var colorcode		=	$(this).nextAll().find('span.input-group-text').css('background-color');
		}else{
			var colorcode		=	$(this).nextAll().find('.pickr').css('background-color');
		}
		
		var colordiv		=	$(this).nextAll().find('.colorboxelem').val();
		//var chartsettingsfieldname	=	$(this).nextAll().find('.chartsettingsfieldname').val();
		chartsettings.push({"id":idindex,"displayname":displayname,"chartformula":chartformula,"axis":multiaxis,"fieldtype":multitypefield,"colorcode":colorcode,"colordiv":colordiv});
		idindex++;
	});
	if(textObj.chartValue.chartsettings !=	undefined){
		textObj.chartValue.chartsettings	=	chartsettings;
	}else{
		textObj.chartValue.chartsettings	=	chartsettings;
	}
	
    var methodType = 'post';
	if(action	==	"edit"){
		methodType = 'put';	
		textObj.id 			= 	(id !=	""?id:"");
	}
	
    $.ajax({
        url: "/stratroom/charts",
        type: methodType,
        contentType: "application/json",
        data: JSON.stringify(textObj),
        success: function (data, status) {
            location.reload(true);
        },
		error:readErrorMsg
    });
}
            
function savedashboardChartComment(chartId) {
    // Get the preference ID from the textarea's data attribute
    const prefId = $("#chartComments_" + chartId).data("pref-id") || "";
    
    const productData = {
        "id": prefId, // Use existing ID if present, otherwise empty string
        "daskboardId": "0",
        "chartId": chartId,
        "recordId": "",
        "recordType": "Charts",
        "preferenceValue": {
            "comments": $("#chartComments_" + chartId).val()
        }
    };

    $.ajax({
        url: "/stratroom/preferences",
        type: "put",
        contentType: "application/json",
        data: JSON.stringify(productData),
        success: function () {
            $.notify("Successfully Updated", {
                style: 'success',
                className: 'graynotify'
            });
            // Optional: Update the data-pref-id if this was a new save and server returns new ID
            // But since you're reloading, it's fine to skip.
            location.reload(true);
        },
        error: readErrorMsg
    });
}
function populateKPIList(elementId,ownerid) {
	var numberOfOptions = $(elementId + ' > option').length;
	var emp="";
	if(navigatedEmp !="" || navigatedEmp != null){
		 emp=navigatedEmp;
	  }
	else{
		 emp=currentEmp;
	  }
	if (jQuery.isEmptyObject(kpiList)) {
		$.ajax({
			url : "/stratroom/kpiList/"+emp,
			async:false,
			success : function(kpiListValue) {
				kpiList = kpiListValue.kpidtoList;
					addOption(elementId, "NA", "0")
				$.each(kpiList, function(index, kpiObj) {
					addOption(elementId, kpiObj.kpiValue.name, kpiObj.id)
				});
			}
		});
	} else if (numberOfOptions < 2) {
		addOption(elementId, "NA", "0")
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
	$(".input-calender-icon").css("bottom","30%");
}

function handleTextevent(id, action,type) {
	
	$("#dashbard_text_Form").css('display', 'none');
	$("#dashbard_text_Form").trigger('reset');
	$("#dashbard_text_Form input[name='action']").val(action);
	$("#dashbard_text_Form input[name='type']").val(type);
	if (action == 'add') {
		// when adding
		$("#dashbard_text_Form").css('display', 'block');
		formvalidationerrorreset();
	}else if (action == 'delete') {
		$("#deleterecordid").val(id);
		$('#deleteModaldashboard').modal('toggle');
		
		$(window).on("resize", function(){
		    $(".modal:visible").each(alignModal);
		}); 
		$(".modal").on("shown.bs.modal", alignModal);
		
	} else { // view and edit
		$("#dashbard_text_Form").css('display', 'block');
		formvalidationerrorreset();
		if (action == 'edit') {
			$("#dashbard_text_Form input[name='id']").val(id);
		}
		if (action == 'view') {
			$('#dashbard_text_Form input[type="text"]').prop("disabled", true);
			$('#dashbard_text_Form input[type="checkbox"]').prop("disabled", true);
			$('#dashbard_text_Form select').prop("disabled", true);
			$('#dashbard_text_Form button[value="Save"]').css('display', 'none');
		}

		$.ajax({
			url : "/stratroom/dashBoardPreferences/" + id,
			success : dashboardTextPopSuccessCallback,
			error:readErrorMsg
		});
	}
}

function handleTableevent(id, action,headertype) {
	if(headertype	==	"drilltable"){
		$("#datatableheader").html('Drill Down Table Settings');
	}else{
		$("#datatableheader").html('Data Table');
	}
	$("#dashbard_table_Form").css('display', 'none');
	$("#dashbard_table_Form").trigger('reset');
	$("#dashbard_table_Form input[name='action']").val(action);
	
	if (action == 'add') {
		// when adding
		$("#dashbard_table_Form").css('display', 'block');
		formvalidationerrorreset();
	}else if (action == 'delete') {
		$("#deleterecordid").val(id);
		$('#deleteModaldashboard').modal('toggle');
		
		$(window).on("resize", function(){
		    $(".modal:visible").each(alignModal);
		}); 
		$(".modal").on("shown.bs.modal", alignModal);
		
	} else { // view and edit
		$("#dashbard_table_Form").css('display', 'block');
		formvalidationerrorreset();
		if (action == 'edit') {
			$("#dashbard_table_Form input[name='id']").val(id);
			$.ajax({
				url : "/stratroom/dashBoardPreferences/" + id,
				success : dashboardTablePopSuccessCallback,
				error:readErrorMsg
			});
		}
		if (action == 'view') {
			$.ajax({
				url : "/stratroom/dashBoardPreferences/" + id,
				success : function(data,status){
					var tabletype	=	"freqTable";
					if(headertype	==	"drilltable"){
						tabletype	=	"drilltable";	
					}
					var measurement	=	data.dashBoardPreferencesValue.measurement;
					var formula		=	data.dashBoardPreferencesValue.formula;
					var fieldName	=	data.dashBoardPreferencesValue.fieldName;
					var datarangechart	=	(data.dashBoardPreferencesValue.datarangechart !=	undefined && data.dashBoardPreferencesValue.datarangechart !=	""?data.dashBoardPreferencesValue.datarangechart:$("#datePeriod").val());
					if(formula	!=	"" && formula !=	undefined && measurement !=	""){
						var textObj	=	{"fieldName": fieldName,"formula": formula,"period":datarangechart,"type": tabletype};
						$(".page-loader-wrapper").css("display","block");
						$.ajax({
					        url: "/stratroom/formula/kpiList?tableFrequency="+measurement,
					        type: "post",
							async:false,
					        contentType: "application/json",
					        data: JSON.stringify(textObj),
					        success: function (result, status) {
					        	$(".page-loader-wrapper").css("display","none");
								dataTableviewSuccesscallback(data,result,'view');									
					        },
							error:readErrorMsg
					    });
				    }
			    },
				error:readErrorMsg
			});
		}	
		if (action == 'download') {
				$.ajax({
				url : "/stratroom/dashBoardPreferences/" + id,
				success : function(data,status){
					var tabletype	=	"freqTable";
					if(headertype	==	"drilltable"){
						tabletype	=	"drilltable";	
					}
					var measurement	=	data.dashBoardPreferencesValue.measurement;
					var formula		=	data.dashBoardPreferencesValue.formula;
					var fieldName	=	data.dashBoardPreferencesValue.fieldName;
					var datarangechart	=	(data.dashBoardPreferencesValue.datarangechart !=	undefined && data.dashBoardPreferencesValue.datarangechart !=	""?data.dashBoardPreferencesValue.datarangechart:$("#datePeriod").val());
					if(formula	!=	"" && formula !=	undefined && measurement !=	""){
						var textObj	=	{"fieldName": fieldName,"formula": formula,"period":datarangechart,"type": tabletype};
						$(".page-loader-wrapper").css("display","block");

						$.ajax({
					        url: "/stratroom/formula/kpiList?tableFrequency="+measurement,
					        type: "post",
							async:false,
					        contentType: "application/json",
					        data: JSON.stringify(textObj),
					        success: function (result, status) {
					        	$(".page-loader-wrapper").css("display","none");
								dataTableviewSuccesscallback(data,result,'download');									
					        },
							error:readErrorMsg
					    });
				    }
			    },
				error:readErrorMsg
			});
	}
	}
}

function handleChartevent(id, action,viewmethod) {
	$("#dashbard_chart_Form").css('display', 'none');
	$("#dashbard_chart_Form").trigger('reset');
	$("#dashbard_chart_Form input[name='action']").val(action);
	
	if (action == 'add') {
		// when adding
		$("#dashbard_chart_Form").css('display', 'block');
		formvalidationerrorreset();
	}else if (action == 'delete') {
		if(deletepermission	==	false){
			return false;
		}
		$("#deleterecordid").val(id);
		$('#deleteModaldashboard').modal('toggle');
		
		$(window).on("resize", function(){
		    $(".modal:visible").each(alignModal);
		}); 
		$(".modal").on("shown.bs.modal", alignModal);
		
	} else { // view and edit
		$("#dashbard_chart_Form").css('display', 'block');
		formvalidationerrorreset();
		if (action == 'edit') {
			if(editpermission	==	false && createpermission	==	false){
				return false;
			}
			$("#dashbard_chart_Form input[name='id']").val(id);
			$.ajax({
				url : "/stratroom/charts/" + id,
				success : function(data){
					$(".addchartsettings").attr("data-typeoftable",viewmethod);
					dashboardChartPopSuccessCallback(data,viewmethod);
				},
				error:readErrorMsg
			});
		}
		if (action == 'view' && viewmethod	==	"DDenlarge") {
			$.ajax({
				url : "/stratroom/charts/" + id,
				success :function(data){
					chartDDviewSuccesscallback(data);
				},
				error:readErrorMsg
			});
		}else if(action == 'view'){
			$.ajax({
				url : "/stratroom/charts/" + id,
				success :chartviewSuccesscallback,
				error:readErrorMsg
			});
		}else if(action == 'csvdownload'){
			$.ajax({
				url : "/stratroom/charts/" + id,
				success: function (result, status) {
					dataTablecsvdownloadSuccesscallback(result,'csvdownload');									
		        },
				error:readErrorMsg
			});
		}		
	}
}

function dataTablecsvdownloadSuccesscallback(item,typeofoption){
	var layoutType 	= 	item.chartValue.type;
    var displayname1 = 	(item.chartValue.chartdisplayname != undefined && item.chartValue.chartdisplayname != ""?item.chartValue.chartdisplayname:"--");
    var chartdisplayname	=	(item.chartValue.displayname != undefined && item.chartValue.displayname != ""?item.chartValue.displayname:"");
	var chartsettings 	= 	item.chartValue.chartsettings;
	var fieldName 	= 	((item.chartValue.fieldName != undefined && item.chartValue.fieldName != "")?item.chartValue.fieldName:"");
	var datarangechart 	= 	((item.chartValue.datarangechart != undefined && item.chartValue.datarangechart != "")?item.chartValue.datarangechart:$("#datePeriod").val());
	var filename	=	chartdisplayname+".csv";
	var measurement	=	(item.chartValue.measurement != undefined && item.chartValue.measurement != ""?item.chartValue.measurement:"Monthly");
	
	var tablerow 	= 	"";
	var tableheader = 	"";
	var quternamespan	=	3;
	var removeperiodheader	=	"";
	var body	=	"";
	tableheader	+=	`<th data-i18n="Actual">Actual</th><th data-i18n="Target">Target</th><th data-i18n="Gap">Gap</th>`;
	
	if(chartsettings !=	undefined && chartsettings !=	'' && chartsettings.length	!=	0){
		var prevformula="";
		var prevData="";
		$.each(chartsettings, function (i, List) {
			var repull=true;
			var chartdataload 	= 	{};
			var displayname 	= 	(List.displayname !=	undefined?List.displayname:"");
			var chartformula 	= 	(List.chartformula !=	undefined?List.chartformula:"");
			var axis 			= 	(List.axis !=	undefined?List.axis:"");
			var yfieldaxis		=	1;
			var zfieldaxis		=	1;
			var fieldName 		= 	(List.fieldtype !=	undefined?List.fieldtype:"");
			if(prevformula === chartformula)
			{
				repull =false;
			
			}else{
				prevData =""
			}
			prevformula=  chartformula;
			
			if(chartformula	!=	"" && chartformula !=	undefined){
			var textObj	=	{"fieldName": fieldName,"formula": chartformula,"period": datarangechart,"type": "freqTable"};
			$(".page-loader-wrapper").css("display","block");

			if(repull)
			{
		
			$.ajax({
			        url: "/stratroom/formula/kpiList?tableFrequency="+measurement,
			        type: "post",
					async:false,
			        contentType: "application/json",
			        data: JSON.stringify(textObj),
			        success: function (data, status) {
			        	$(".page-loader-wrapper").css("display","none");
						var fieldvalue	=	1;
						var chartvalue	=	1;
						var chartdata	=	[];
						var chartcolumndata	=	[];
						var chartprogress	=	[];
						prevData=data;
						$.each(data,function(index,objval){
							if(objval !=	"" && objval !=	undefined && !jQuery.isEmptyObject(objval)){
								fieldName	=	fieldName.toLowerCase();
								$.each(objval,function(periodindex,quarterobj){
									if(periodindex 	!=	"overallGap" && periodindex 	!=	""){
										var actualbody 	=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
										var targetbody 	=	(quarterobj.target !=	undefined?quarterobj.target:"");
										var gapbody 	=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
										var budgetbody 	=	(quarterobj.budget !=	undefined?quarterobj.budget:"");
										var forecastbody 	=	(quarterobj.forecast !=	undefined?quarterobj.forecast:"");												
										if(targetbody !=	""){
											tablerow 	+=	"<tr><td>"+periodindex+"</td>";
											tablerow 	+=	"<td>"+quarterobj.currency+actualbody+"</td><td>"+quarterobj.currency+targetbody+"</td><td>"+quarterobj.currency+gapbody+"</td>";
											tablerow 	+=	"</tr>";
										}
									}
								});
							}
						});
		
					},error:readErrorMsg
			    });
			}
			    
			    }
			   });
			   //each end 
	 		}
	
	body	=	`<tr>
        <th style="width: 198px;">
          Name/Period
        </th>
        <th>
          `+measurement+`
        </th>
        `+tableheader+`
      </tr>
    `+tablerow;
	
		body	=	`<tr>
                    <th></th><th></th>
                    <th>
                      `+measurement+`
                    </th><th></th>
                  </tr><tr><th>Name/Period</th>`+tableheader+`</tr>`+tablerow;
	
	$("#dataTableView").empty();
	$("#dataTableView").html(body);
	var args = ['#dataTableView', filename];
	DownloadTableToCSV.apply($(".downloadcasfile"),args);	             
}

function DownloadTableToCSV($table, filename) {
	var csv = [];
	var rows = document.querySelectorAll($table+" tr");
	
    for (var i = 0; i < rows.length; i++) {
		var row = [], cols = rows[i].querySelectorAll("td, th");
		
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
		csv.push(row.join(","));		
	}
    	
		var blob = new Blob([csv.join("\n")], {
	      type: 'text/csv;charset=utf8;'
	    });
	    // Download link
	    downloadLink = document.createElement("a");
	    // File name
	    downloadLink.download = filename;
	    // We have to create a link to the file
	    downloadLink.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csv.join("\n")));
	    //downloadLink.href = window.URL.createObjectURL(blob);
	    // Make sure that the link is not displayed
	    downloadLink.style.display = "none";
	    // Add the link to your DOM
	    document.body.appendChild(downloadLink);
	    // Lanzamos
	    downloadLink.click();
}

function chartDDviewSuccesscallback(item,paramsdeptname,flagcheck){
	var tableElement	=	$(".drilldownTableDD");
		$(tableElement).empty();
	    var layoutType 	= 	item.chartValue.type;
		var inlinedisplayname = 	(item.chartValue.chartdisplayname != undefined?item.chartValue.chartdisplayname:"Drill Down Table");
		var chartdisplayname = 	(item.chartValue.displayname != undefined?item.chartValue.displayname:"");
		var formula 	= 	((item.chartValue.formula != undefined && item.chartValue.formula != "")?item.chartValue.formula:"");
		var fieldName 	= 	((item.chartValue.fieldName != undefined && item.chartValue.fieldName != "")?item.chartValue.fieldName:"");
		var datarangechart 	= 	((item.chartValue.datarangechart != undefined && item.chartValue.datarangechart != "")?item.chartValue.datarangechart:$("#datePeriod").val());
		
		var fieldvalue	=	"";
		var body		=	"";
		var tablerow 	= 	"";
		var tableheader = 	"";
		var quternamespan	=	3;
		var removeperiodheader	=	"";
		var checkfielditems	=	[];
		var percentage		=	false;
		var millions 		= 	false;
		var currencyval 	= 	"$";
		var colors		=	[];
		var largechart	=	"";
		var chartnamefield	=	"";

		if(layoutType	==	"BubbleChartDD"){
			$("#ColumnchartDD-1").empty();
		}else if(layoutType	==	"ColumnChartDD"){
			$("#ColumnchartDD-1").empty();
		}else if(layoutType	==	"LineChartDD"){
			$("#ColumnchartDD-1").empty();
		}else if(layoutType	==	"AreaChartDD"){
			$("#ColumnchartDD-1").empty();
		}else if(layoutType	==	"MultiAxisDD"){
			$("#ColumnchartDD-1").empty();
		}
		
		tableheader	=	'<th data-i18n="Actual">Actual</th><th data-i18n="Target">Target</th><th data-i18n="Gap">Gap</th>';
		
		var tableheight	=	"100";
		/*if(drillchartlayoutcol	==	12){
			tableheight	=	"85";
		}	*/
		var measurement	=	((item.chartValue.measurement != undefined && item.chartValue.measurement != "")?item.chartValue.measurement:"Monthly");
		var chartsettings	=	((item.chartValue.chartsettings != undefined && item.chartValue.chartsettings != "")?item.chartValue.chartsettings:[]);
		var frequencyTable	=	"";
		var chartdataloadval	=	[];
		var chartaxisfield	=	[];
		var checkdecimalornot	=	false;
		var percentage		=	false;
		var tableid	=	1;
		var quaterheaderrow =	"";
		var quaterheaderbody=	"";
		var finalactualrows	=	"";
		var wholetableheader	=	"";
		var wholetableduplicate	=	[];		
		var rowcount	=	0;
		var currencyval	=	"$";
		var xaxis	=	[];	
		var resetddHtml	=	"";
		if(chartsettings !=	undefined && chartsettings !=	'' && chartsettings.length	!=	0){
			var prevformula="";
		var prevData="";
			$.each(chartsettings, function (i, List) {
				var repull=true;
				var displayname 	= 	(List.displayname !=	undefined?List.displayname:"");
				var chartformula 	= 	(List.chartformula !=	undefined?List.chartformula:"");
				var axis 			= 	(List.axis !=	undefined?List.axis:"");
				var yfieldaxis		=	1;
				var zfieldaxis		=	1;
				var fieldName 		= 	(List.fieldtype !=	undefined?List.fieldtype:"");
				var colorcode		=	(List.colorcode	==	"rgb(233, 236, 239)"?"#26a0fc":List.colorcode);
				if(prevformula === chartformula)
				{
					repull =false;
				
				}else{
					prevData =""
				}

				prevformula=  chartformula;
				colors.push(colorcode);	
				/*if(initialformula == chartformula)
					{
					return false;
					}
				else
					{
					initialformula = chartformula;
					}*/
						//table request
					var textObj	=	{"fieldName": fieldName,"formula": chartformula,"period": datarangechart,"type": "drillTable","groupBy":"Dept","tableType":"dril"};
					if(paramsdeptname	!=	"" && paramsdeptname != null){
						paramsdeptname	=	paramsdeptname.replaceAll(':'," ");
						textObj	=	{"fieldName": fieldName,"formula": chartformula,"period": datarangechart,"type": "drillTable","groupBy":"Dept","tableType":"dril","deptName":paramsdeptname};
					}
					$(".page-loader-wrapper").css("display","block");

					if(repull)
					{	
					$.ajax({
					        url: "/stratroom/formula/kpiList?tableFrequency="+measurement+"&groupBy=Dept",
					        type: "post",
							async:false,
					        contentType: "application/json",
					        data: JSON.stringify(textObj),
					        success: function (data, status) {
					        	$(".page-loader-wrapper").css("display","none");
								prevData=data;
								var fieldvalue	=	1;
								var chartvalue	=	1;

								var chartprogress	=	[];
								//var xaxis = [];
								var series =[];
								finalactualrows	=	"";
								$.each(data,function(index,frequencyitem){
									var chartdataload = {};

									//quaterheaderbody = "";
									var rowi	=	0;
									var pagingheader	=	0;
									var incindex	=	0;
									$.each(frequencyitem,function(frequency,department){
										var chartdata	=	[];
										var chartcolumndata	=	[];
										//xaxis.push(frequency);
										var frequencyHeadertd	=	frequency;
										displayname=frequency;
										quaterheaderrow = "";
										quaterheader = "";
										var functionParams = item.id+","+"'"+frequencyHeadertd+"'";
										functionParams = functionParams.replace(/ /g,":");
										if(incindex == 0 && flagcheck){
											resetddHtml	=	`<i class="fas fa-undo" id="ChartviewDD_`+layoutType+item.id+`" `+"onclick=resetChartDD("+item.id+`,'`+frequency+`')" style="display:block;"></i>`;
										}				
										quaterheader 	+=	'<th colspan="`+quternamespan+`" style="font-weight: bold;text-align:center;">'+frequencyHeadertd+'</th>';
										quaterheaderbody 	+=	"<tr><td class='scrolldrill'><i class=\""+department.gapStatus+"\"></i></td><td class='scrolldrill1 pointer employeeddreportevent' data-deptname='"+frequencyHeadertd+"' data-id="+item.id+" style='color:blue !important;'>"+frequencyHeadertd.split('-')[0]+"</td>";
										/* department iteration start */
										if(department !=	"" && department !=	undefined && !jQuery.isEmptyObject(department)){
											$.each(department,function(periodindex,quarterobj){
												if(periodindex 	!=	"overallGap" && periodindex 	!=	"gapStatus" && periodindex 	!=	"childFlag" && periodindex 	!=	"childFlag"){
												var departmentNametd	=	periodindex;
												var seriesjson = {}
												var data=[];
												if (jQuery.inArray(periodindex, wholetableduplicate) == -1) {
													wholetableduplicate.push(periodindex);
													wholetableheader	+=	`<th colspan="`+quternamespan+`">`+periodindex+`</th>`;
													if(xaxis && !xaxis.includes(periodindex))
													{
														xaxis.push(periodindex);
													}

												}
												
												
													var actualbody 	=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
													var targetbody 	=	(quarterobj.target !=	undefined?quarterobj.target:"");
													var gapbody 	=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
													var gapStatus	=	(quarterobj.gapStatus !=	undefined?quarterobj.gapStatus:"");
													var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
													var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
													var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");										
													var chartactualbody		=	convertonumber(actualbody);
													var chartargetbody		=	convertonumber(targetbody);
													var chargapbody			=	convertonumber(gapbody);
													
													
													if(!isNumeric(chartactualbody))
													{
													chartactualbody = 0;
													}
													if(!isNumeric(chartargetbody))
													{
														chartargetbody = 0;
													}
													if(!isNumeric(chargapbody))
													{
														chargapbody = 0;
													}
													
											
													var fieldnamevalue		=	chartactualbody;
													if(fieldName	==	"Actual"){
														fieldnamevalue	=	chartactualbody;
													}else if(fieldName	==	"Target"){
														fieldnamevalue	=	chartargetbody;
													}else if(fieldName	==	"Gap"){
														fieldnamevalue	=	chargapbody;
													}
													if(typeof actualbody	===	"number"){
														actualbody	=	actualbody.toString();
													}if(typeof targetbody	===	"number"){
														targetbody	=	targetbody.toString();
													}if(typeof gapbody	===	"number"){
														gapbody	=	gapbody.toString();
													}
													if(quarterobj.currency !=	undefined && quarterobj.currency !=	""){
														currencyval= quarterobj.currency;
													}										
													if((actualbody.includes("M") || targetbody.includes("M")) || millions	==	true)
													{
														millions = true;	
													}
													else if ((actualbody.includes("%") || targetbody.includes("%")) || percentage	==	true)
													{
														percentage = true;
													}
													
													if(targetbody !=	""){
														quaterheaderrow 	+=	"<th data-i18n='Actual'>Actual</th><th data-i18n='Target'>Target</th><th data-i18n='Gap'>Gap</th>";
														//var functionParams = item.id + ',' + InitiativeID + ',' + '"edit"';
														//var functionParams = item.id+","+"'"+departmentNametd+"'";
														//functionParams = functionParams.replace(/ /g,"_");
														//departmentRow 	+=	"<tr><td><i class=\""+gapStatus+"\"></i></td><td class='pointer' onclick=employeeReportWise("+functionParams+") style='color:blue !important;'>"+departmentNametd+"</td>";
														quaterheaderbody 	+=	"<td class="+actualcolorhighlight+">"+quarterobj.currency+actualbody+"</td><td class="+targetcolorhighlight+">"+quarterobj.currency+targetbody+"</td><td class="+gapcolorhighlight+">"+quarterobj.currency+gapbody+"</td>";
														
														if(layoutType	==	"BubbleChartDD"){
															var numberformat 	=	(typeof chartactualbody === "number"?convertInttoStringAndStringtoInt(chartactualbody):chartactualbody);	
															if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
																percentage			=	true;
															}else if (numberformat.indexOf("%") >= 0) {
																percentage			=	true;
															}else if (numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
															}
															var numberformat 	=	(typeof chartargetbody === "number"?convertInttoStringAndStringtoInt(chartargetbody):chartargetbody);	
															if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
																percentage			=	true;
															}else if (numberformat.indexOf("%") >= 0) {
																percentage			=	true;
															}else if (numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
															}
																
															chartdata.push({"x":frequency,"y":chartactualbody,"z":chartargetbody});
																
														}
														/*if(layoutType	==	"ColumnChartDD" || layoutType	==	"AreaChartDD" || layoutType	==	"MultiAxisDD"){
															
															fieldnamevalue	=	convertonumber(fieldnamevalue);
															var numberformat 	=	(typeof fieldnamevalue === "number"?convertInttoStringAndStringtoInt(fieldnamevalue):fieldnamevalue);	
															if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
																percentage			=	true;
															}else if (numberformat.indexOf("%") >= 0) {
																percentage			=	true;
															}else if (numberformat.indexOf(".") >= 0) {
															}
																checkdecimalornot	=	true;
															if(chartdataloadval.length == 0)
																{
																	seriesjson ["name"]= frequency;
																	if(layoutType != "AreaChartDD")
																		{
																		seriesjson ["type"] = "column";	
																		}
																	
																	data.push(fieldnamevalue);
																	seriesjson ["data"] = data;
																	chartdataloadval.push(seriesjson);
																}
															else
																{
																var oldone = false;
																for (i in chartdataloadval) {
																	 if(chartdataloadval[i].name == frequency )
																		 {
																		 	data = chartdataloadval[i].data;
																		 	data.push(fieldnamevalue);
																		 	chartdataloadval[i].data = data;
																		 	oldone=true;
																		 }
																	}
																if(!oldone){
																 	seriesjson ["name"] = frequency
																	if(layoutType != "AreaChartDD")
																	{
																	seriesjson ["type"] = "column";	
																	}
																	data.push(fieldnamevalue);
																	seriesjson ["data"] = data;
																	chartdataloadval.push(seriesjson);
																}
																}
															
															chartcolumndata.push(fieldnamevalue);
														}
														
														if(layoutType	==	"LineChartDD"){
															fieldnamevalue	=	convertonumber(fieldnamevalue);
															var numberformat 	=	(typeof fieldnamevalue === "number"?convertInttoStringAndStringtoInt(fieldnamevalue):fieldnamevalue);	
															if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
																percentage			=	true;
															}else if (numberformat.indexOf("%") >= 0) {
																percentage			=	true;
															}else if (numberformat.indexOf(".") >= 0) {
															}
																checkdecimalornot	=	true;
															var linechartcol	=	[];
															if(chartdataloadval.length == 0)
															{
																seriesjson ["name"]= frequency;
																data.push(fieldnamevalue);
																seriesjson ["data"] = data;
																chartdataloadval.push(seriesjson);
															}
														else
															{
															var oldone = false;
															for (i in chartdataloadval) {
																 if(chartdataloadval[i].name == frequency )
																	 {
																	 	data = chartdataloadval[i].data;
																	 	data.push(fieldnamevalue);
																	 	chartdataloadval[i].data = data;
																	 	oldone=true;
																	 }
																}
															if(!oldone){
															 	seriesjson ["name"] = frequency
																data.push(fieldnamevalue);
																seriesjson ["data"] = data;
																chartdataloadval.push(seriesjson);
															}
															}
														}*/
														/*if(layoutType	!=	"LineChartDD"){
															chartaxisfield.push(departmentNametd);
														}*/
														
														if(layoutType	==	"AreaChartDD" || layoutType	==	"MultiAxisDD" || layoutType	==	"ColumnChartDD" || layoutType	==	"LineChartDD"){
															fieldnamevalue	=	convertonumber(fieldnamevalue);
																
															chartcolumndata.push(fieldnamevalue);
																
														}
											
													}
													if(rowi	==	0){
														rowcount++;
													}
												}
											});
											
											//console.log(departmentRow);
											if(layoutType	==	"BubbleChartDD" && chartdata.length !=	0){
												chartdataload = {"name":displayname,data:chartdata};
											}else if(layoutType	==	"AreaChartDD" && chartcolumndata.length !=	0){
												chartdataload = {"name":displayname,data:chartcolumndata};//series
											}else if(layoutType	==	"LineChartDD" && chartcolumndata.length !=	0){
												chartdataload = {"name":displayname,data:chartcolumndata};//series
											}else if(layoutType	==	"MultiAxisDD" && chartcolumndata.length !=	0){
												chartdataload = {"name":displayname,"type":"column",data:chartcolumndata};//series
											}else if(layoutType	==	"ColumnChartDD" && chartcolumndata.length !=	0){
												chartdataload = {"name":displayname,"type":"column",data:chartcolumndata};//series
											}
										}
										/* department iteration end */
										quaterheaderbody	=	quaterheaderbody+"</tr>";
										tableid++;		
										rowi++;
										chartaxisfield	=	xaxis;
									    if((layoutType	==	"BubbleChartDD" || layoutType	== "AreaChartDD" || layoutType	== "MultiAxisDD" || layoutType	== "ColumnChartDD" || layoutType	==	"LineChartDD") && !jQuery.isEmptyObject(chartdataload)){
											chartdataloadval.push(chartdataload);
										}
										//chartaxisfield.push(frequency);
									    incindex++;
									});	
									finalactualrows = finalactualrows+quaterheaderbody;
								});
							},error:readErrorMsg
					    });// end table request
					}else
					{
						$(".page-loader-wrapper").css("display","none");

						var fieldvalue	=	1;
								var chartvalue	=	1;

								var chartprogress	=	[];
								//var xaxis = [];
								var series =[];
								finalactualrows	=	"";
								$.each(prevData,function(index,frequencyitem){
									var chartdataload = {};

									//quaterheaderbody = "";
									var rowi	=	0;
									var pagingheader	=	0;
									var incindex	=	0;
									$.each(frequencyitem,function(frequency,department){
										var chartdata	=	[];
										var chartcolumndata	=	[];
										//xaxis.push(frequency);
										var frequencyHeadertd	=	frequency;
										displayname=frequency;
										quaterheaderrow = "";
										quaterheader = "";
										var functionParams = item.id+","+"'"+frequencyHeadertd+"'";
										functionParams = functionParams.replace(/ /g,":");
										if(incindex == 0 && flagcheck){
											resetddHtml	=	`<i class="fas fa-undo" id="ChartviewDD_`+layoutType+item.id+`" onclick="resetChartDD(`+item.id+`,'`+frequency+`')" style="display:block;"></i>`;
										}				
										quaterheader 	+=	'<th colspan="`+quternamespan+`" style="font-weight: bold;text-align:center;">'+frequencyHeadertd+'</th>';
									//	quaterheaderbody 	+=	"<tr><td class='scrolldrill'><i class=\""+department.gapStatus+"\"></i></td><td class='scrolldrill1 pointer employeeddreportevent' data-deptname='"+frequencyHeadertd+"' data-id="+item.id+" style='color:blue !important;'>"+frequencyHeadertd.split('-')[0]+"</td>";
										/* department iteration start */
										if(department !=	"" && department !=	undefined && !jQuery.isEmptyObject(department)){
											$.each(department,function(periodindex,quarterobj){
												if(periodindex 	!=	"overallGap" && periodindex 	!=	"gapStatus" && periodindex 	!=	"childFlag"){
												var departmentNametd	=	periodindex;
												var seriesjson = {}
												var data=[];
												if (jQuery.inArray(periodindex, wholetableduplicate) == -1) {
													wholetableduplicate.push(periodindex);
													wholetableheader	+=	`<th colspan="`+quternamespan+`">`+periodindex+`</th>`;
													if(xaxis && !xaxis.includes(periodindex))
													{
														xaxis.push(periodindex);

													}

												}
												
												
													var actualbody 	=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
													var targetbody 	=	(quarterobj.target !=	undefined?quarterobj.target:"");
													var gapbody 	=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
													var gapStatus	=	(quarterobj.gapStatus !=	undefined?quarterobj.gapStatus:"");
													var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
													var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
													var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");										
													var chartactualbody		=	convertonumber(actualbody);
													var chartargetbody		=	convertonumber(targetbody);
													var chargapbody			=	convertonumber(gapbody);
													
													
													if(!isNumeric(chartactualbody))
													{
													chartactualbody = 0;
													}
													if(!isNumeric(chartargetbody))
													{
														chartargetbody = 0;
													}
													if(!isNumeric(chargapbody))
													{
														chargapbody = 0;
													}
													
											
													var fieldnamevalue		=	chartactualbody;
													if(fieldName	==	"Actual"){
														fieldnamevalue	=	chartactualbody;
													}else if(fieldName	==	"Target"){
														fieldnamevalue	=	chartargetbody;
													}else if(fieldName	==	"Gap"){
														fieldnamevalue	=	chargapbody;
													}
													if(typeof actualbody	===	"number"){
														actualbody	=	actualbody.toString();
													}if(typeof targetbody	===	"number"){
														targetbody	=	targetbody.toString();
													}if(typeof gapbody	===	"number"){
														gapbody	=	gapbody.toString();
													}
													if(quarterobj.currency !=	undefined && quarterobj.currency !=	""){
														currencyval= quarterobj.currency;
													}										
													if((actualbody.includes("M") || targetbody.includes("M")) || millions	==	true)
													{
														millions = true;	
													}
													else if ((actualbody.includes("%") || targetbody.includes("%")) || percentage	==	true)
													{
														percentage = true;
													}
													
													if(targetbody !=	""){
														
														if(layoutType	==	"BubbleChartDD"){
															var numberformat 	=	(typeof chartactualbody === "number"?convertInttoStringAndStringtoInt(chartactualbody):chartactualbody);	
															if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
																percentage			=	true;
															}else if (numberformat.indexOf("%") >= 0) {
																percentage			=	true;
															}else if (numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
															}
															var numberformat 	=	(typeof chartargetbody === "number"?convertInttoStringAndStringtoInt(chartargetbody):chartargetbody);	
															if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
																percentage			=	true;
															}else if (numberformat.indexOf("%") >= 0) {
																percentage			=	true;
															}else if (numberformat.indexOf(".") >= 0) {
																checkdecimalornot	=	true;
															}
																
															chartdata.push({"x":frequency,"y":chartactualbody,"z":chartargetbody});
																
														}
														
														
														if(layoutType	==	"AreaChartDD" || layoutType	==	"MultiAxisDD" || layoutType	==	"ColumnChartDD" || layoutType	==	"LineChartDD"){
															fieldnamevalue	=	convertonumber(fieldnamevalue);
																
															chartcolumndata.push(fieldnamevalue);
																
														}
											
													}
													if(rowi	==	0){
														rowcount++;
													}
												}
											});
											
											//console.log(departmentRow);
											if(layoutType	==	"BubbleChartDD" && chartdata.length !=	0){
												chartdataload = {"name":displayname,data:chartdata};
											}else if(layoutType	==	"AreaChartDD" && chartcolumndata.length !=	0){
												chartdataload = {"name":displayname,data:chartcolumndata};//series
											}else if(layoutType	==	"LineChartDD" && chartcolumndata.length !=	0){
												chartdataload = {"name":displayname,data:chartcolumndata};//series
											}else if(layoutType	==	"MultiAxisDD" && chartcolumndata.length !=	0){
												chartdataload = {"name":displayname,"type":"column",data:chartcolumndata};//series
											}else if(layoutType	==	"ColumnChartDD" && chartcolumndata.length !=	0){
												chartdataload = {"name":displayname,"type":"column",data:chartcolumndata};//series
											}
										}
										/* department iteration end */
										quaterheaderbody	=	quaterheaderbody+"</tr>";
										tableid++;		
										rowi++;
										chartaxisfield	=	xaxis;
									    if((layoutType	==	"BubbleChartDD" || layoutType	== "AreaChartDD" || layoutType	== "MultiAxisDD" || layoutType	== "ColumnChartDD" || layoutType	==	"LineChartDD") && !jQuery.isEmptyObject(chartdataload)){
											chartdataloadval.push(chartdataload);
										}
										//chartaxisfield.push(frequency);
									    incindex++;
									});	
									finalactualrows = finalactualrows+quaterheaderbody;
								});
					}
				   });
				   //each end 

		 		}
	
		var tableHeader	=	"";  
        if(finalactualrows	==	""){
        	tableHeader	=	`<thead>
                      <tr>
                      <th rowspan="2" style="width: 40px;">
	                    <i class="fas fa-arrow-up"></i>
	                    <i class="fas fa-arrow-down"></i>
	                  </th>
                        <th rowspan="2" style="width: 198px;">
                          Name/Period
                        </th>
                        <th colspan="`+quternamespan+`">
                          `+measurement+`
                        </th>
                      </tr>
                      <tr>
                        `+tableheader+`
                      </tr>
                    </thead>`;
        }
    
	body	=	`<div><span class="d-flex pull-right resetddundo`+item.id+`" style="font-size: 16px;padding-top: 10px;padding-right: 18px;color: #565656;cursor: pointer;">
                	`+resetddHtml+`
                </span><br><br></div><table
                    class="table table-sm table-bordered w-100 text-center"
                    id="drilldownTableDD_`+item.id+`"
                    style="margin-bottom: 0px !important;white-space:nowrap;"
                  >
                  <thead>
                  	<tr>
                    <th class="scrolldrill" rowspan="2" style="vertical-align:middle !important;">
                        <i class="fas fa-arrow-up"></i>
                        <i class="fas fa-arrow-down"></i>
                    </th>
                    <th class="scrolldrill1" rowspan="2" style="vertical-align:middle !important;">Name/Period
                    </th>
                        `+wholetableheader+`
                    </tr>
                    <tr>
                        `+quaterheaderrow+`
                    </tr>
                    </thead>
                    <tbody>
                        `+finalactualrows+`
                     </tbody>   
                    </table>`;
          	  		
		$(tableElement).append(body);
		
		if(!paramsdeptname){
			$("#ChartviewDD_"+layoutType+item.id).css("display","none");
		}
		if(layoutType	==	"BubbleChartDD"){
			bubbleRender(item.id,'largedd',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"ColumnChartDD"){
			ecolumnRenderDD(item.id,'largedd',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"LineChartDD"){
			elineRenderDD(item.id,'largedd',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"AreaChartDD"){
			eareaRenderDD(item.id,'largedd',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"MultiAxisDD"){
			emultiaxisRenderDD(item.id,'largedd',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}
		
	if(tableid	> 6){
  		$("#drilldownTableDD_"+item.id).paging({ limit: 5});
  	}

}

function chartviewSuccesscallback(item){
    var layoutType 	= 	item.chartValue.type;
    var chartdisplayname = 	(item.chartValue.displayname != undefined?item.chartValue.displayname:"--");
	var chartsettings 	= 	item.chartValue.chartsettings;
	var fieldName 	= 	((item.chartValue.fieldName != undefined && item.chartValue.fieldName != "")?item.chartValue.fieldName:"");
	var datarangechart 	= 	((item.chartValue.datarangechart != undefined && item.chartValue.datarangechart != "")?item.chartValue.datarangechart:$("#datePeriod").val());
	var measurement	=	((item.chartValue.measurement != undefined && item.chartValue.measurement != "")?item.chartValue.measurement:"Monthly");
	
	/*$(".chartviewsettingsclass").empty();
	var chartElement	=	$(".chartviewsettingsclass");
	var chartElementlarge	=	$(".chartviewsettingslarge");
	
	if(layoutType	==	"BubbleChart"){
		$(chartElement).attr("id","Bubblechart-1");
		$(chartElementlarge).attr("id","Bubblelarge-1");
	}else if(layoutType	==	"ColumnChart"){
		$(chartElement).attr("id","Columnchart-1");
		$(chartElementlarge).attr("id","Columnlarge-1");
	}else if(layoutType	==	"LineChart"){
		$(chartElement).attr("id","Linechart-1");
		$(chartElementlarge).attr("id","Linelarge-1");
	}else if(layoutType	==	"AreaChart"){
		$(chartElement).attr("id","Areachart-1");
		$(chartElementlarge).attr("id","Arealarge-1");
	}else if(layoutType	==	"PieChart"){
		$(chartElement).attr("id","Piechart-1");
		$(chartElement).attr("id","Pielarge-1");
	}else if(layoutType	==	"MultiAxis"){
		$(chartElement).attr("id","Multiaxis-1");
		$(chartElementlarge).attr("id","Multiaxislarge-1");
	}else if(layoutType	==	"StackedChart"){
		$(chartElement).attr("id","Stackedchart-1");
		$(chartElementlarge).attr("id","Stackedlarge-1");
	}else if(layoutType	==	"NegativeColumnChart"){
		$(chartElement).attr("id","NegativeColumnchart-1");
		$(chartElementlarge).attr("id","NegativeColumnlarge-1");
	}	*/
	
	
	var chartdataloadval	=	[];
	var colors	=	[];

	var chartaxisfield	=	[];
	var checkdecimalornot	=	false;
	var percentage		=	false;
	var millions = false;
	var currencyval = "$";
	
	var body	=	"";
	var tablerow 	= 	"";
	var tableheader = 	"";
	var quternamespan	=	3;
	var removeperiodheader	=	"";
	tableheader	=	'<th data-i18n="Actual">Actual</th><th data-i18n="Target">Target</th><th data-i18n="Gap">Gap</th>';
	
	if(chartsettings !=	undefined && chartsettings !=	'' && chartsettings.length	!=	0){
		var initialformula="";
		var prevformula="";
		var prevData="";
		$.each(chartsettings, function (i, List) {
			var repull=true;
			var chartdataload = {};
			var displayname 	= 	(List.displayname !=	undefined?List.displayname:"");
			var chartformula 	= 	(List.chartformula !=	undefined?List.chartformula:"");
			var axis 			= 	(List.axis !=	undefined?List.axis:"");
			var yfieldaxis		=	1;
			var zfieldaxis		=	1;
			var fieldName 		= 	(List.fieldtype !=	undefined?List.fieldtype:"");
			//var chartsettingsfieldname 	= 	(List.chartsettingsfieldname !=	undefined?List.chartsettingsfieldname:"");
			var colorcode		=	(List.colorcode	==	"rgb(233, 236, 239)"?"#26a0fc":List.colorcode);
			colors.push(colorcode);
			if(prevformula === chartformula)
			{
				repull =false;
			
			}else{
				prevData =""
			}
			prevformula=  chartformula;
			if(chartformula	!=	"" && chartformula !=	undefined){
				/*if(initialformula == chartformula)
				{
				return false;
				}
			else
				{
				initialformula = chartformula;
				}*/
			var textObj	=	{"fieldName": fieldName,"formula": chartformula,"period": datarangechart,"type": "freqTable"};
			$(".page-loader-wrapper").css("display","block");
			if(repull)
			{
			$.ajax({
			        url: "/stratroom/formula/kpiList?tableFrequency="+measurement,
			        type: "post",
					async:false,
			        contentType: "application/json",
			        data: JSON.stringify(textObj),
			        success: function (data, status) {
			        	$(".page-loader-wrapper").css("display","none");
			        var fieldvalue	=	1;
					var chartvalue	=	1;
					var chartdata	=	[];
					var chartcolumndata	=	[];
					var chartprogress	=	[];
					prevData=data;
						$.each(data,function(index,objval){
							if(objval !=	"" && objval !=	undefined && !jQuery.isEmptyObject(objval)){			
								fieldName	=	fieldName.toLowerCase();
								$.each(objval,function(periodindex,quarterobj){
									if(periodindex 	!=	"overallGap" && periodindex 	!=	""){
										var actualbody 	=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
										var targetbody 	=	(quarterobj.target !=	undefined?quarterobj.target:"");
										var gapbody 	=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
										var budgetbody 	=	(quarterobj.budget !=	undefined?quarterobj.budget:"");
										var forecastbody 	=	(quarterobj.forecast !=	undefined?quarterobj.forecast:"");
										if((actualbody.includes("M") || targetbody.includes("M")) || millions	==	true)
										{
											millions = true;	
										}
										else if ((actualbody.includes("%") || targetbody.includes("%")) || percentage	==	true)
										{
											percentage = true;
										}
										
										var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
										var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
										var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");
										
										if(targetbody !=	""){
											tablerow 	+=	"<tr><td>"+periodindex+"</td>";
											tablerow 	+=	"<td class="+actualcolorhighlight+">"+quarterobj.currency+actualbody+"</td><td class="+targetcolorhighlight+">"+quarterobj.currency+targetbody+"</td><td class="+gapcolorhighlight+">"+quarterobj.currency+gapbody+"</td>";
											tablerow 	+=	"</tr>";
										}
										
										actualbody		=	convertonumber(actualbody);
										targetbody		=	convertonumber(targetbody);
										gapbody			=	convertonumber(gapbody);
										budgetbody		=	convertonumber(budgetbody);
										forecastbody	=	convertonumber(forecastbody);
										
										if(!isNumeric(actualbody))
										{
											actualbody = 0;
										}
										if(!isNumeric(targetbody))
										{
											targetbody = 0;
										}
										if(!isNumeric(gapbody))
										{
											gapbody = 0;
										}
										if(quarterobj.currency !=	undefined && quarterobj.currency !=	""){
											currencyval= quarterobj.currency;
										}		
										if(fieldName	==	"actual"){
											chartvalue	=	actualbody;
										}else if(fieldName	==	"target"){
											chartvalue	=	targetbody;
										}else if(fieldName	==	"gap"){
											chartvalue	=	gapbody;
										}else if(fieldName	==	"budget"){
											chartvalue	=	budgetbody;
										}else if(fieldName	==	"forecast"){
											chartvalue	=	forecastbody;
										}
										
										if(layoutType	==	"BubbleChart"){
											var numberformat 	=	(typeof actualbody === "number"?convertInttoStringAndStringtoInt(actualbody):actualbody);	
											if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
												percentage			=	true;
											}else if (numberformat.indexOf("%") >= 0) {
												percentage			=	true;
											}else if (numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
											}
											var numberformat 	=	(typeof targetbody === "number"?convertInttoStringAndStringtoInt(targetbody):targetbody);	
											if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
												percentage			=	true;
											}else if (numberformat.indexOf("%") >= 0) {
												percentage			=	true;
											}else if (numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
											}
					
												chartdata.push({"x":periodindex,"y":actualbody,"z":targetbody});
												
										}
										
										if(layoutType	==	"ColumnChart" || layoutType == "NegativeColumnChart" || layoutType	==	"LineChart" || layoutType	==	"AreaChart" || layoutType	==	"PieChart" || layoutType	==	"StackedChart" || layoutType	==	"MultiAxis" || layoutType	==	"ColumnChartComment"){
											chartvalue	=	convertonumber(chartvalue);
											if(!isNumeric(chartvalue))
												{
												chartvalue=0;
												}
											var numberformat 	=	(typeof chartvalue === "number"?convertInttoStringAndStringtoInt(chartvalue):chartvalue);	
											if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
												percentage			=	true;
											}else if (numberformat.indexOf("%") >= 0) {
												percentage			=	true;
											}else if (numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
											}
						
											chartcolumndata.push(chartvalue);
												
										}
										if(chartaxisfield && !chartaxisfield.includes(periodindex))
										{
											chartaxisfield.push(periodindex);								

										}
									}
								});
								
								if(layoutType	==	"BubbleChart"){
									chartdataload= {"name":displayname,data:chartdata};
								}else if(layoutType	==	"LineChart" || layoutType == "NegativeColumnChart" || layoutType	==	"AreaChart" || layoutType	==	"PieChart" || layoutType	==	"StackedChart"){
									chartdataload = {"name":displayname,data:chartcolumndata};
								}else if(layoutType	==	"MultiAxis"){
									chartdataload = {"name":displayname,"type":"column",data:chartcolumndata};
								}else if(layoutType	==	"ColumnChart"){
									chartdataload = {"name":displayname,"type":"column",data:chartcolumndata};
								}else if(layoutType	==	"RadialMulti"){
									chartdataload = {"name":displayname,data:chartprogress};
								}		
							}
						});
		
					}, error:readErrorMsg
					
			    });
			}else{
				$(".page-loader-wrapper").css("display","none");

				var fieldvalue	=	1;
				var chartvalue	=	1;
				var chartdata	=	[];
				var chartcolumndata	=	[];
				var chartprogress	=	[];
				$.each(prevData,function(index,objval){
						if(objval !=	"" && objval !=	undefined && !jQuery.isEmptyObject(objval)){			
							fieldName	=	fieldName.toLowerCase();
							$.each(objval,function(periodindex,quarterobj){
								if(periodindex 	!=	"overallGap" && periodindex 	!=	""){
									var actualbody 	=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
									var targetbody 	=	(quarterobj.target !=	undefined?quarterobj.target:"");
									var gapbody 	=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
									var budgetbody 	=	(quarterobj.budget !=	undefined?quarterobj.budget:"");
									var forecastbody 	=	(quarterobj.forecast !=	undefined?quarterobj.forecast:"");
									if((actualbody.includes("M") || targetbody.includes("M")) || millions	==	true)
									{
										millions = true;	
									}
									else if ((actualbody.includes("%") || targetbody.includes("%")) || percentage	==	true)
									{
										percentage = true;
									}
									
									var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
									var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
									var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");
									
									
									
									actualbody		=	convertonumber(actualbody);
									targetbody		=	convertonumber(targetbody);
									gapbody			=	convertonumber(gapbody);
									budgetbody		=	convertonumber(budgetbody);
									forecastbody	=	convertonumber(forecastbody);
									
									if(!isNumeric(actualbody))
									{
										actualbody = 0;
									}
									if(!isNumeric(targetbody))
									{
										targetbody = 0;
									}
									if(!isNumeric(gapbody))
									{
										gapbody = 0;
									}
									if(quarterobj.currency !=	undefined && quarterobj.currency !=	""){
										currencyval= quarterobj.currency;
									}		
									if(fieldName	==	"actual"){
										chartvalue	=	actualbody;
									}else if(fieldName	==	"target"){
										chartvalue	=	targetbody;
									}else if(fieldName	==	"gap"){
										chartvalue	=	gapbody;
									}else if(fieldName	==	"budget"){
										chartvalue	=	budgetbody;
									}else if(fieldName	==	"forecast"){
										chartvalue	=	forecastbody;
									}
									
									if(layoutType	==	"BubbleChart"){
										var numberformat 	=	(typeof actualbody === "number"?convertInttoStringAndStringtoInt(actualbody):actualbody);	
										if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
											checkdecimalornot	=	true;
											percentage			=	true;
										}else if (numberformat.indexOf("%") >= 0) {
											percentage			=	true;
										}else if (numberformat.indexOf(".") >= 0) {
											checkdecimalornot	=	true;
										}
										var numberformat 	=	(typeof targetbody === "number"?convertInttoStringAndStringtoInt(targetbody):targetbody);	
										if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
											checkdecimalornot	=	true;
											percentage			=	true;
										}else if (numberformat.indexOf("%") >= 0) {
											percentage			=	true;
										}else if (numberformat.indexOf(".") >= 0) {
											checkdecimalornot	=	true;
										}
				
											chartdata.push({"x":periodindex,"y":actualbody,"z":targetbody});
											
									}
									
									if(layoutType	==	"ColumnChart" || layoutType == "NegativeColumnChart" || layoutType	==	"LineChart" || layoutType	==	"AreaChart" || layoutType	==	"PieChart" || layoutType	==	"StackedChart" || layoutType	==	"MultiAxis"){
										chartvalue	=	convertonumber(chartvalue);
										if(!isNumeric(chartvalue))
											{
											chartvalue=0;
											}
										var numberformat 	=	(typeof chartvalue === "number"?convertInttoStringAndStringtoInt(chartvalue):chartvalue);	
										if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
											checkdecimalornot	=	true;
											percentage			=	true;
										}else if (numberformat.indexOf("%") >= 0) {
											percentage			=	true;
										}else if (numberformat.indexOf(".") >= 0) {
											checkdecimalornot	=	true;
										}
					
										chartcolumndata.push(chartvalue);
											
									}
									if(chartaxisfield && !chartaxisfield.includes(periodindex))
									{
										chartaxisfield.push(periodindex);								

									}								}
							});
							
							if(layoutType	==	"BubbleChart"){
								chartdataload= {"name":displayname,data:chartdata};
							}else if(layoutType	==	"LineChart" || layoutType == "NegativeColumnChart" || layoutType	==	"AreaChart" || layoutType	==	"PieChart" || layoutType	==	"StackedChart"){
								chartdataload = {"name":displayname,data:chartcolumndata};
							}else if(layoutType	==	"MultiAxis"){
								chartdataload = {"name":displayname,"type":"column",data:chartcolumndata};
							}else if(layoutType	==	"ColumnChart"){
								chartdataload = {"name":displayname,"type":"column",data:chartcolumndata};
							}else if(layoutType	==	"RadialMulti"){
								chartdataload = {"name":displayname,data:chartprogress};
							}		
						}
					});
			}
			    
			    }
				chartdataloadval.push(chartdataload);
			   });
			   //each end 

	 		}

	body	=	`<table
        class="table table-sm table-bordered w-100 text-center"
        id="chartenlargedrilldownTable_`+item.id+`"
        style="margin-bottom: 0px !important;white-space:nowrap;"
      >
    <thead>
      <tr>
        <th rowspan="2" style="width: 198px;">
          Name/Period
        </th>
        <th colspan="`+quternamespan+`" `+removeperiodheader+`>
          `+measurement+`
        </th>
      </tr>
      <tr>
        `+tableheader+`
      </tr>
    </thead>
    <tbody>`+tablerow+`
    </tbody></table>`;


	
        if(layoutType	==	"BubbleChart"){
			bubbleRender("-1",'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname, colors,currencyval);
			$(".BubblelargechartdrilldownTable").empty();
			$(".BubblelargechartdrilldownTable").append(body);
			$(".BubblelargechartdrilldownTable").paging({ limit: 5 });
			if($("#Chart_BubbleChart"+item.id).is(':visible')){
				$(".bubblechartlargeview").show();
				$(".bubbletablelargeview").hide();
			}
			if($("#ChartTable_BubbleChart"+item.id).is(':visible')){
				$(".bubblechartlargeview").hide();
				$(".bubbletablelargeview").show();
			}
		}else if(layoutType	==	"ColumnChart"){
			columnRender("-1",'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname, colors,currencyval);
			$(".ColumnenlargechartdrilldownTable").empty();
			$(".ColumnenlargechartdrilldownTable").append(body);
			$(".ColumnenlargechartdrilldownTable").paging({ limit: 5 });
			if($("#Chart_ColumnChart"+item.id).is(':visible')){
				$(".columnchartlargeview").show();
				$(".columntablelargeview").hide();
			}
			if($("#ChartTable_ColumnChart"+item.id).is(':visible')){
				$(".columnchartlargeview").hide();
				$(".columntablelargeview").show();
			}
		}else if(layoutType	==	"LineChart"){
			lineRender("-1",'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname, colors,currencyval);
			$(".LinelargechartdrilldownTable").empty();
			$(".LinelargechartdrilldownTable").append(body);
			$(".LinelargechartdrilldownTable").paging({ limit: 5 });
			if($("#Chart_LineChart"+item.id).is(':visible')){
				$(".linechartlargeview").show();
				$(".linetablelargeview").hide();
			}
			if($("#ChartTable_LineChart"+item.id).is(':visible')){
				$(".linechartlargeview").hide();
				$(".linetablelargeview").show();
			}
		}else if(layoutType	==	"AreaChart"){
			areaRender("-1",'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname, colors,currencyval);
			$(".ArealargechartdrilldownTable").empty();
			$(".ArealargechartdrilldownTable").append(body);
			$(".ArealargechartdrilldownTable").paging({ limit: 5 });
			if($("#Chart_AreaChart"+item.id).is(':visible')){
				$(".areachartlargeview").show();
				$(".areatablelargeview").hide();
			}
			if($("#ChartTable_AreaChart"+item.id).is(':visible')){
				$(".areachartlargeview").hide();
				$(".areatablelargeview").show();
			}
		}else if(layoutType	==	"PieChart"){
			pieRender("-1",'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname, colors,currencyval);
			$(".PielargechartdrilldownTable").empty();
			$(".PielargechartdrilldownTable").append(body);
			$(".PielargechartdrilldownTable").paging({ limit: 5 });
			if($("#Chart_PieChart"+item.id).is(':visible')){
				$(".piechartlargeview").show();
				$(".pietablelargeview").hide();
			}
			if($("#ChartTable_PieChart"+item.id).is(':visible')){
				$(".piechartlargeview").hide();
				$(".pietablelargeview").show();
			}
		}else if(layoutType	==	"MultiAxis"){
			multiaxisRender("-1",'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname, colors,currencyval);
			$(".MultiaxislargechartdrilldownTable").empty();
			$(".MultiaxislargechartdrilldownTable").append(body);
			$(".MultiaxislargechartdrilldownTable").paging({ limit: 5 });
			if($("#Chart_MultiAxis"+item.id).is(':visible')){
				$(".multiaxischartlargeview").show();
				$(".multiaxistablelargeview").hide();
			}
			if($("#ChartTable_MultiAxis"+item.id).is(':visible')){
				$(".multiaxischartlargeview").hide();
				$(".multiaxistablelargeview").show();
			}
		}else if(layoutType	==	"StackedChart"){
			stackedRender("-1",'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname, colors,currencyval);
			$(".StackedlargechartdrilldownTable").empty();
			$(".StackedlargechartdrilldownTable").append(body);
			$(".StackedlargechartdrilldownTable").paging({ limit: 5 });
			if($("#Chart_StackedChart"+item.id).is(':visible')){
				$(".stackedchartlargeview").show();
				$(".stackedtablelargeview").hide();
			}
			if($("#ChartTable_StackedChart"+item.id).is(':visible')){
				$(".stackedchartlargeview").hide();
				$(".stackedtablelargeview").show();
			}
		}else if(layoutType	==	"NegativeColumnChart"){
			negativecRender("-1",'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname, colors,currencyval);
			$(".NegativelargechartdrilldownTable").empty();
			$(".NegativelargechartdrilldownTable").append(body);
			$(".NegativelargechartdrilldownTable").paging({ limit: 5 });
			if($("#Chart_NegativeColumnChart"+item.id).is(':visible')){
				$(".negativechartlargeview").show();
				$(".negativetablelargeview").hide();
			}
			if($("#ChartTable_NegativeColumnChart"+item.id).is(':visible')){
				$(".negativechartlargeview").hide();
				$(".negativetablelargeview").show();
			}
		}
}

function dataTableviewSuccesscallback(item,data,typeofoption){
	var layoutType 	= 	item.dashBoardPreferencesValue.type;
	var formula 	= 	((item.dashBoardPreferencesValue.formula != undefined && item.dashBoardPreferencesValue.formula != "")?item.dashBoardPreferencesValue.formula:"");
	var fieldName 	= 	((item.dashBoardPreferencesValue.fieldName != undefined && item.dashBoardPreferencesValue.fieldName != "")?item.dashBoardPreferencesValue.fieldName:"");
	if(layoutType	==	"drilltable"){		
		var tablerow 	= 	"";
		var tableheader = 	"";
		var quternamespan	=	3;
		var removeperiodheader	=	"";
		var checkfielditems	=	[];
		if(item.dashBoardPreferencesValue.actual	==	true){
			tableheader	+=	'<th data-i18n="Actual">Actual</th>';
			checkfielditems.push(true);
		}
		if(item.dashBoardPreferencesValue.target	==	true){
			tableheader	+=	'<th data-i18n="Target">Target</th>';
			checkfielditems.push(true);
		}
		if(item.dashBoardPreferencesValue.gap	==	true){
			tableheader	+=	'<th data-i18n="Gap">Gap</th>';
			checkfielditems.push(true);
		}
		if(checkfielditems.length	==	3){
			quternamespan	=	3;
		}else if(checkfielditems.length	==	2){
			quternamespan	=	2;
		}else if(checkfielditems.length	==	1){
			quternamespan	=	1;
		}else if(checkfielditems.length	==	0){
			quternamespan	=	0;
			removeperiodheader	=	"style='display:none'";
		}
			
		var measurement	=	((item.dashBoardPreferencesValue.measurement != undefined && item.dashBoardPreferencesValue.measurement != "")?item.dashBoardPreferencesValue.measurement:"Monthly");
	
		$.each(data,function(key,value){
			$.each(value,function(index,objval){
				//quaterheaderbody 	=	"<tr><th><i class=\""+objval.gapStatus+"\"></i></th><th>"+empName+"</th>";
				if(objval !=	"" && objval !=	undefined){
					$.each(objval,function(periodindex,quarterobj){
						if(periodindex 	!=	"overallGap"){
							var actualbody 	=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
							var targetbody 	=	(quarterobj.target !=	undefined?quarterobj.target:"");
							var gapbody 	=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
							var ytdbody 	=	(quarterobj.ytd !=	undefined?quarterobj.ytd:"");
							
							var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
							var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
							var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");
							var ytdcolorhighlight		=	(checkPositiveorNegative(ytdbody)	==	1?"negativeHighlight":"");												
							if(targetbody !=	""){
								tablerow 	+=	"<tr><td><i class=\""+objval.gapStatus+"\"></i></td><td>"+periodindex+"</td>";
								if(item.dashBoardPreferencesValue.actual	==	true){
									tablerow 	+=	"<td class="+actualcolorhighlight+">"+quarterobj.currency+actualbody+"</td>";
								}
								if(item.dashBoardPreferencesValue.target	==	true){
									tablerow	+=	"<td class="+targetcolorhighlight+">"+quarterobj.currency+targetbody+"</td>";
								}
								if(item.dashBoardPreferencesValue.gap	==	true){
									tablerow	+=	"<td class="+gapcolorhighlight+">"+quarterobj.currency+gapbody+"</td>";
								}
								tablerow 	+=	"</tr>";
							}	
						}
					});		
				}
			});
		});
	
		var body	=	`<thead>
                      <tr>
                        <th rowspan="2" style="width: 40px;">
                          <i class="fas fa-arrow-up"></i>
                          <i class="fas fa-arrow-down"></i>
                        </th>
                        <th rowspan="2" style="width: 198px;">
                          Name/Period
                        </th>
                        <th colspan="`+quternamespan+`" `+removeperiodheader+`>
                          `+measurement+`
                        </th>
                      </tr>
                      <tr>
                        `+tableheader+`
                      </tr>
                    </thead>
                    <tbody>`+tablerow+`
                    </tbody>`;
        if(typeofoption	==	"download"){
        	$("#downloadPdfView").html(body);
        	const element = 	document.getElementById("downloadPdfView");
        	html2pdf().from(element).save();
        }else{          
     		$("#drilldownTableView").html(body);
     		$("#drilldownTableView").paging({ limit: 5 });
     	}
     }else{
     	if(item.dashBoardPreferencesValue.actual	==	true){
			tableheader	+=	'<th data-i18n="Actual">Actual</th>';
		}
		if(item.dashBoardPreferencesValue.target	==	true){
			tableheader	+=	'<th data-i18n="Target">Target</th>';
		}
		if(item.dashBoardPreferencesValue.gap	==	true){
			tableheader	+=	'<th data-i18n="Gap">Gap</th>';
		}
		if(item.dashBoardPreferencesValue.ytd	==	true){
			tableheader	+=	'<th data-i18n="YTD">YTD</th>';
		}	
		
		$.each(data,function(key,value){
			$.each(value,function(index,objval){
				var actualbody	=	(objval.actual !=	undefined?objval.actual:"");
				var targetbody	=	(objval.target !=	undefined?objval.target:"");
				var gapbody		=	(objval.gap !=	undefined?objval.gap:"");
				var ytdbody		=	(objval.ytd !=	undefined?objval.ytd:"");												
				var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
				var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
				var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");
				var ytdcolorhighlight		=	(checkPositiveorNegative(ytdbody)	==	1?"negativeHighlight":"");
				if(actualbody !=	""){
					tablerow 	+=	"<tr><td>"+index+"</td>";
					if(item.dashBoardPreferencesValue.actual	==	true){
						tablerow 	+=	"<td class="+actualcolorhighlight+">"+objval.currency+actualbody+"</td>";
					}
					if(item.dashBoardPreferencesValue.target	==	true){
						tablerow	+=	"<td class="+targetcolorhighlight+">"+objval.currency+targetbody+"</td>";
					}
					if(item.dashBoardPreferencesValue.gap	==	true){
						tablerow	+=	"<td class="+gapcolorhighlight+">"+objval.currency+gapbody+"</td>";
					}
					if(item.dashBoardPreferencesValue.ytd	==	true){
						tablerow	+=	"<td class="+ytdcolorhighlight+">"+objval.currency+ytdbody+"</td>";
					}
					tablerow 	+=	"</tr>";
				}
			});
		});
			
		var body	=	`
                    <thead>
                      <tr>
                        <th style="width: 80px;" data-i18n="Period">Period</th>
                        `+tableheader+`
                      </tr>
                    </thead>
                    <tbody>`+tablerow+`
                    </tbody>`;	
		
     	if(typeofoption	==	"download"){
        	$("#downloadPdfView").html(body);
        	const element = 	document.getElementById("downloadPdfView");
        	html2pdf().from(element).save();
        }else{          
     		$("#dataTableView").html(body);
     		$("#dataTableView").paging({ limit: 5 });
     	}
     	     	
     }             
}


function dataTabledownloadSuccesscallback(item,data){
	var layoutType 	= 	item.dashBoardPreferencesValue.type;
	var formula 	= 	((item.dashBoardPreferencesValue.formula != undefined && item.dashBoardPreferencesValue.formula != "")?item.dashBoardPreferencesValue.formula:"");
	var fieldName 	= 	((item.dashBoardPreferencesValue.fieldName != undefined && item.dashBoardPreferencesValue.fieldName != "")?item.dashBoardPreferencesValue.fieldName:"");
	if(layoutType	==	"drilltable"){		
		var tablerow 	= 	"";
		var tableheader = 	"";
		var quternamespan	=	3;
		var removeperiodheader	=	"";
		var checkfielditems	=	[];
		if(item.dashBoardPreferencesValue.actual	==	true){
			tableheader	+=	'<th data-i18n="Actual">Actual</th>';
			checkfielditems.push(true);
		}
		if(item.dashBoardPreferencesValue.target	==	true){
			tableheader	+=	'<th data-i18n="Target">Target</th>';
			checkfielditems.push(true);
		}
		if(item.dashBoardPreferencesValue.gap	==	true){
			tableheader	+=	'<th data-i18n="Gap">Gap</th>';
			checkfielditems.push(true);
		}
		if(checkfielditems.length	==	3){
			quternamespan	=	3;
		}else if(checkfielditems.length	==	2){
			quternamespan	=	2;
		}else if(checkfielditems.length	==	1){
			quternamespan	=	1;
		}else if(checkfielditems.length	==	0){
			quternamespan	=	0;
			removeperiodheader	=	"style='display:none'";
		}
			
		var measurement	=	((item.dashBoardPreferencesValue.measurement != undefined && item.dashBoardPreferencesValue.measurement != "")?item.dashBoardPreferencesValue.measurement:"Monthly");
	
		$.each(data,function(key,value){
			$.each(value,function(index,objval){
				//quaterheaderbody 	=	"<tr><th><i class=\""+objval.gapStatus+"\"></i></th><th>"+empName+"</th>";
				if(objval !=	"" && objval !=	undefined){
					$.each(objval,function(periodindex,quarterobj){
						if(periodindex 	!=	"overallGap"){
							var actualbody 	=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
							var targetbody 	=	(quarterobj.target !=	undefined?quarterobj.target:"");
							var gapbody 	=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
							var ytdbody 	=	(quarterobj.ytd !=	undefined?quarterobj.ytd:"");
							
							var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
							var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
							var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");
							var ytdcolorhighlight		=	(checkPositiveorNegative(ytdbody)	==	1?"negativeHighlight":"");												
							if(targetbody !=	""){
								tablerow 	+=	"<tr><td>"+periodindex+"</td>";
								if(item.dashBoardPreferencesValue.actual	==	true){
									tablerow 	+=	"<td>"+quarterobj.currency+actualbody+"</td>";
								}
								if(item.dashBoardPreferencesValue.target	==	true){
									tablerow	+=	"<td>"+quarterobj.currency+targetbody+"</td>";
								}
								if(item.dashBoardPreferencesValue.gap	==	true){
									tablerow	+=	"<td>"+quarterobj.currency+gapbody+"</td>";
								}
								tablerow 	+=	"</tr>";
							}	
						}
					});		
				}
			});
		});
	
		var body	=	`
		<table>
		<thead>
                      <tr>

                        <th>
                          Name/Period
                        </th>
                        `+tableheader+`
                      </tr>
                    </thead>
                    <tbody>`+tablerow+`
                    </tbody>
                  </table>`;
		

        
            html2canvas(body, {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 700
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("cutomer-details.pdf");
                }
            });
     }else{
     	if(item.dashBoardPreferencesValue.actual	==	true){
			tableheader	+=	'<th data-i18n="Actual">Actual</th>';
		}
		if(item.dashBoardPreferencesValue.target	==	true){
			tableheader	+=	'<th data-i18n="Target">Target</th>';
		}
		if(item.dashBoardPreferencesValue.gap	==	true){
			tableheader	+=	'<th data-i18n="Gap">Gap</th>';
		}
		if(item.dashBoardPreferencesValue.ytd	==	true){
			tableheader	+=	'<th data-i18n="YTD">YTD</th>';
		}	
		
		$.each(data,function(key,value){
			$.each(value,function(index,objval){
				var actualbody	=	(objval.actual !=	undefined?objval.actual:"");
				var targetbody	=	(objval.target !=	undefined?objval.target:"");
				var gapbody		=	(objval.gap !=	undefined?objval.gap:"");
				var ytdbody		=	(objval.ytd !=	undefined?objval.ytd:"");												
				var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
				var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
				var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");
				var ytdcolorhighlight		=	(checkPositiveorNegative(ytdbody)	==	1?"negativeHighlight":"");
				if(actualbody !=	""){
					tablerow 	+=	"<tr><td>"+index+"</td>";
					if(item.dashBoardPreferencesValue.actual	==	true){
						tablerow 	+=	"<td class=\""+actualcolorhighlight+"\">"+objval.currency+actualbody+"</td>";
					}
					if(item.dashBoardPreferencesValue.target	==	true){
						tablerow	+=	"<td class=\""+targetcolorhighlight+"\">"+objval.currency+targetbody+"</td>";
					}
					if(item.dashBoardPreferencesValue.gap	==	true){
						tablerow	+=	"<td class=\""+gapcolorhighlight+"\">"+objval.currency+gapbody+"</td>";
					}
					if(item.dashBoardPreferencesValue.ytd	==	true){
						tablerow	+=	"<td class=\""+ytdcolorhighlight+"\">"+objval.currency+ytdbody+"</td>";
					}
					tablerow 	+=	"</tr>";
				}
			});
		});
			
		var body	=	`
				<table>

                    <thead>
                      <tr>
                        <th style="width: 80px;" data-i18n="Period">Period</th>
                        `+tableheader+`
                      </tr>
                    </thead>
                    <tbody>`+tablerow+`
                    </tbody>
                  </table>`;	
		margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            };
		 doc.fromHTML(body, margins.left, margins.top, {
		        'width': margins.width,
		            'elementHandlers': specialElementHandlers
		    });
		    doc.save('sample-file.pdf');	
     }             
}

function handleeventdelete(){
	var id				=	$("#deleterecordid").val();
	if(id	==	""){
		return false;
	}
	var url	=	"/stratroom/charts/" + id;
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

function dashboardTextPopSuccessCallback(data) {
	
	updateDescription	=	data;
	$('#id').val(data.id);
	$("#displayname").val(data.dashBoardPreferencesValue.displayname);
	$("#card_type_select").val(data.dashBoardPreferencesValue.cardtypeselect);
	if(data.dashBoardPreferencesValue.cardtypeselect	==	"Chart"){
		$("#icon_select").attr("disabled",true);
	}
	$("#icon_select").val(data.dashBoardPreferencesValue.iconselect);
	$("#text_formula").val(data.dashBoardPreferencesValue.formula);
	$("#period").val(data.dashBoardPreferencesValue.period);
	$("#gap").val(data.dashBoardPreferencesValue.gap);
	$("#kpiFieldName").val(data.dashBoardPreferencesValue.fieldName);
}

function dashboardTablePopSuccessCallback(data) {
	
	updateDescription	=	data;
	$('#id').val(data.id);
	if(data.dashBoardPreferencesValue.actual !=	undefined && data.dashBoardPreferencesValue.actual ==	true){
		$("#dashbard_table_Form #drillactual").prop('checked', true);
	}
	if(data.dashBoardPreferencesValue.target !=	undefined && data.dashBoardPreferencesValue.target ==	true){
		$("#dashbard_table_Form #drilltarget").prop('checked', true);
	}
	if(data.dashBoardPreferencesValue.gap !=	undefined && data.dashBoardPreferencesValue.gap ==	true){
		$("#dashbard_table_Form #drillgap").prop('checked', true);
	}
	if(data.dashBoardPreferencesValue.ytd !=	undefined && data.dashBoardPreferencesValue.ytd ==	true){
		$("#dashbard_table_Form #drillytd").prop('checked', true);
	}
	$("#tableFieldName").val(data.dashBoardPreferencesValue.fieldName);
	$("#drillfrequency").val(data.dashBoardPreferencesValue.measurement);
	$("#tabletypeField").val(data.dashBoardPreferencesValue.type);
	$("#drilltable_kpi_formula").val(data.dashBoardPreferencesValue.formula);
}

function dashboardChartPopSuccessCallback(data,methodofchart) {
	
	updateDescription	=	data;
	$('#id').val(data.id);
	$("#displaynamechart").val(data.chartValue.displayname);
	if(data.chartValue.measurement !=	undefined){
		$("#chartfrequency").val(data.chartValue.measurement);
	}
	
	var axis =	(data.chartValue.displayaxischart ==	null || data.chartValue.displayaxischart ==	"" || data.chartValue.displayaxischart ==	undefined?"x":data.chartValue.displayaxischart);
	$("#displayaxischart").val(axis);
	$("#charttypeField").val(data.chartValue.type);
	var tablebody	=	"";
	$("#chart-setting-div").empty();
	//<input type="hidden" class="chartsettingsfieldname" value="`+chartsettingsfieldname+`" id="chartsettingsfieldname_`+List.id+`">
	if(data.chartValue.chartsettings !=	undefined && data.chartValue.chartsettings !=	'' && data.chartValue.chartsettings.length	!=	0){
		$.each(data.chartValue.chartsettings, function (i, List) {
		
		var displayname 	= 	(List.displayname !=	undefined?List.displayname:"");
		var chartformula 	= 	(List.chartformula !=	undefined?List.chartformula:"");
		var axis 			= 	(List.axis !=	undefined?List.axis:"");
		var fieldtype 		= 	(List.fieldtype !=	undefined?List.fieldtype:"");
		//var chartsettingsfieldname 	= 	(List.chartsettingsfieldname !=	undefined?List.chartsettingsfieldname:"");
		var colorcode 		= 	(List.colorcode !=	undefined?List.colorcode:"#e9ecef");
		var colordiv 		= 	(List.colordiv !=	undefined?List.colordiv:"");
		var removebtnEnable	=	``;
		if(deletepermission	==	true && i !=	0){
			removebtnEnable	=	`<div class="form-group col-md-12">
              <button class="remove-btn" type="button">
                <i class="fas fa-trash border-box"></i>
              </button>
            </div>`;
		}
		
		/*<span class="input-group-text pickr setpickr_`+List.id+`" data-toggle="modal"
            data-target="#color_palette_popup" onclick="handleGetChartColor(`+List.id+`,'`+colordiv+`')"
            style="width: 90px;border-radius: 0px;height: 30px;background:`+colorcode+`;"></span>*/
		
		tablebody	+=	`<div class="row chart-setting-clone">`+removebtnEnable+`
		<div class="form-group col-md-10 chartsettingsappend">
                        <label for="" data-i18n="Display Name">Display Name</label>
                        <input type="text" class="form-control browser-default multidisplayname" value="`+displayname+`"/>
                      </div>
                      <div class="form-group col-md-2 color_picks_1">
                        <label for="sub_initative_progress" style="text-align: left;">Color</label>
                        <div class="input-group" style="margin-bottom: 0;">
                          <div class="input-group-append">`;
		if(methodofchart	==	"BubbleChartDD" || methodofchart	==	"ColumnChartDD" || methodofchart	==	"LineChartDD" ||
				methodofchart	==	"AreaChartDD" || methodofchart	==	"MultiAxisDD"){
			tablebody	+=	`<span class="input-group-text pickr setpickr_`+List.id+`" data-toggle="modal"
	            data-target="#color_palette_popup" onclick="handleGetChartColor(`+List.id+`,'`+colordiv+`')"
	            style="width: 90px;border-radius: 0px;height: 30px;background:`+colorcode+`;"></span>`;
		}else{
			tablebody	+=	`<span class="input-group-text pickr setpickr_`+List.id+`" 
            style="width: 90px;border-radius: 0px;height: 30px;background:`+colorcode+`;"></span>`;
		}
		
		tablebody	+=	`<input type="hidden" class="colorboxdivelement_`+List.id+` colorboxelem" val='`+colordiv+`'>
                          </div>
                        </div>
                      </div>      	
                      <div class="form-group col-md-12">
                        <label for="" data-i18n="Data Field">Data Field</label>
                        <input type="text" class="form-control browser-default chart_formula chartsettingformula_`+List.id+`" readonly data-toggle="modal"
                          data-target="#chart_formula_popup" value="`+chartformula+`" onclick="handleChartFormulaEvent(this)"
                          role="button"
                        />
                        <a href="#" id="kpi_trigger1" data-toggle="modal" data-target=".chart_formula_popup"></a>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="" data-i18n="Axis">Axis</label>
                        <select class="form-control browser-default multiaxis" id="multiaxis_`+List.id+`">
                          <option value="Y-axis">Y-axis</option>
                          <option value="Z-axis">Z-axis</option>
                        </select>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="" data-i18n="Type">Type</label>
                        <select class="form-control browser-default multitypefield" id="multitypefield_`+List.id+`">
                          <option value="Actual" data-i18n="Actual">Actual</option>
                          <option value="Target" data-i18n="Target">Target</option>
                          <option value="Budget" data-i18n="Budget">Budget</option>
                          <option value="Forecast" data-i18n="Forecast">Forecast</option>
                          <option value="Gap" data-i18n="Gap">Gap</option>
                        </select>
                      </div>
                      <div>
                      
                      </div>
                      <div class="col-12">
                        <hr style="border: 1px solid #505050;" />
                      </div></div>
		`;
		
		});
	}else{
		tablebody	+=	`<div class="row chart-setting-clone"><div class="form-group col-md-10 chartsettingsappend">
                        <label for="" data-i18n="Display Name">Display Name</label>
                        <input type="text" class="form-control browser-default multidisplayname"/>
                      </div>
                      <div class="form-group col-md-2 color_picks_1">
                        <label for="sub_initative_progress" style="text-align: left;">Color</label>
                        <div class="input-group" style="margin-bottom: 0;">
                          <div class="input-group-append">`;

		if(methodofchart	==	"BubbleChartDD" || methodofchart	==	"ColumnChartDD" || methodofchart	==	"LineChartDD" ||
				methodofchart	==	"AreaChartDD" || methodofchart	==	"MultiAxisDD"){
			tablebody	+=	`<span class="input-group-text pickr setpickr_0" data-toggle="modal"
	            data-target="#color_palette_popup" onclick="handleGetChartColor(0,'')"
	            style="width: 90px;border-radius: 0px;height: 30px;"></span>`;
		}else{
			tablebody	+=	`<span class="input-group-text pickr setpickr_0" 
            style="width: 90px;border-radius: 0px;height: 30px;"></span>`;
		}
		
		tablebody	+=	`
                            <input type="hidden" class="colorboxdivelement_0 colorboxelem">
                          </div>
                        </div>
                      </div>	
                      <div class="form-group col-md-12">
                        <label for="" data-i18n="Data Field">Data Field</label>
                        <input type="text" class="form-control browser-default chart_formula chartsettingformula_0" id="chart_kpi_formula" readonly data-toggle="modal"
                          data-target="#chart_formula_popup" onclick="handleChartFormulaEvent(this)"
                          role="button"
                        />
                        <a href="#" id="kpi_trigger1" data-toggle="modal" data-target=".chart_formula_popup"></a>
                      </div>

                      <div class="form-group col-md-6">
                        <label for="" data-i18n="Axis">Axis</label>
                        <select class="form-control browser-default multiaxis" id="multiaxis_0">
                          <option value="Y-axis">Y-axis</option>
                          <option value="Z-axis">Z-axis</option>
                        </select>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="" data-i18n="Type">Type</label>
                        <select class="form-control browser-default multitypefield" id="multitypefield_0">
                          <option value="Actual" data-i18n="Actual">Actual</option>
                          <option value="Target" data-i18n="Target">Target</option>
                          <option value="Budget" data-i18n="Budget">Budget</option>
                          <option value="Forecast" data-i18n="Forecast">Forecast</option>
                          <option value="Gap" data-i18n="Gap">Gap</option>
                        </select>
                      </div>
                      <div>
                      </div>
                      <div class="col-12">
                        <hr style="border: 1px solid #505050;" />
                      </div></div>
		`;
	}

	$("#chart-setting-div").html(tablebody);
	
	if(data.chartValue.chartsettings !=	undefined && data.chartValue.chartsettings !=	'' && data.chartValue.chartsettings.length	!=	0){
		$.each(data.chartValue.chartsettings, function (i, List) {
			var axis 			= 	(List.axis !=	undefined?List.axis:"");
			var fieldtype 		= 	(List.fieldtype !=	undefined?List.fieldtype:"");
			$("#Multiaxis"+List.id).val(axis);
			$("#multitypefield_"+List.id).val(fieldtype);
		});	
	}	
	var colorchangeElement = document.querySelectorAll('.pickr');
                colorchangeElement.forEach((inputElement) => {
                    const pickr = new Pickr({
                        el: inputElement,
                        useAsButton: true,
                        theme: 'classic',

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
                        inputElement.style.background = color.toRGBA().toString(0);
                		pickr.hide();
                        var colorcode	=	$(inputElement).attr("id");
                        if(colorcode !=	"" && colorcode !=	undefined){
                        	var result =	colorcodesave(colorcode);
                        	if(typeof result === 'object' && result.status	==	false){
                        		$.notify(result.msg,{
							  style: 'error',
							  className: 'graynotify'
							});
                        		return false;
                        	}
                        }
                    })
                });
	
}

function collapseRight() {
	$(this).css('display', 'none');
	$('.collapse_arrow_right').css('display', 'block');
	var $body = $('body');
	$body.addClass('ini-hide');
	$body.removeClass('ini-show');
	initiativeBar();
}

function collapseLeft() {
	$(this).css('display', 'none');
	$('.collapse_arrow_left').css('display', 'block');
	var $body = $('body');
	$body.addClass('ini-show');
	$body.removeClass('ini-hide');
	initiativeBar();
}

function initiativeBar() {
	var $body = $('body');
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

function checkmodalisclosedornot(){
	
	if($('#text_setting').is(':visible')	==	true){
		$(document.body).addClass('modal-open');				
	}
	if($('#kpi_formula_popup').is(':visible')	==	false){
		$(document.body).addClass('modal-open');				
	}
	
	setTimeout(function(){  $(document.body).addClass('modal-open');
	}, 1000);
	
}
					
$("#closePopupId").click(function(){
	checkmodalisclosedornot();
});

function handleFormulaEvent(type) {
	$("#kpiformulaHandletype").val(type);
	$("#measureNames").empty();
	if(type	==	"KPI"){
		var getkpiformulaval	=	$("#text_formula").val();
		$("#fieldId").val($("#kpiFieldName").val());	
	}else if(type	==	"DRILLTABLE"){
		var getkpiformulaval	=	$("#drilltable_kpi_formula").val();
		$("#fieldId").val($("#tableFieldName").val());	
	}
	
	$("#formula").val(getkpiformulaval);	
	$.ajax({
		url : "/stratroom/retrieveNodeKeyList",
		success : function(nodekeylist) {
			$.each(nodekeylist, function(index, nodekey) {
				var highlight		=	"";	
				if(getkpiformulaval !=	"" && getkpiformulaval.search(nodekey.measureName) !=	-1){
					highlight	=	"kpiformuladescHighlight";
				}
				if(measureFieldenable	==	false){
					if(nodekey.measureType	==	0){
						addList('#measureNames', nodekey.measureName, nodekey.nodeKey,highlight)
					}
				}else if(measureFieldenable	==	true){
					addList('#measureNames', nodekey.measureName, nodekey.nodeKey,highlight)
				}
			});
		}
	});
}

function handleChartFormulaEvent(event) {
	//$(".chartformuladynamicdesc").hide();
	$(".formulacontentdesc").html(getformulabuilder('if'));
	$(".formulaheaderdesc").html('if'.toUpperCase());
	var getlastClass	=	$(event).attr('class').split(' ');
	getLastchartFormula	=	getlastClass[getlastClass.length-1];
	if(getLastchartFormula	==	"valid"){
		getLastchartFormula	=	getlastClass[getlastClass.length-2];
	}
	var getid			=	getLastchartFormula.split('_');	
	$("#chartmeasureNames").empty();
	/*if(type	==	""){
		var fieldvalue	=	($("#chartormulaHandletype").val() == ""?$("#chartsettingsfieldname_"+getid[1]).val():$("#chartormulaHandletype").val());
		$("#chartfieldId").val(fieldvalue);
	}else{
		$("#chartfieldId").val(type);
	}*/
	$("#chartsettingformula").css("border","1px solid black");
	
	//$("#chartormulaHandletype").val(type);
	var getkpiformulaval	=	$("."+getLastchartFormula).val();
	$("#chartsettingformula").val(getkpiformulaval);	
	$.ajax({
		url : "/stratroom/retrieveNodeKeyList",
		success : function(nodekeylist) {
			$.each(nodekeylist, function(index, nodekey) {
				var highlight		=	"";	
				if(getkpiformulaval !=	"" && getkpiformulaval.search(nodekey.measureName) !=	-1){
					highlight	=	"kpiformuladescHighlight";
				}
				if(measureFieldenable	==	false){
					if(nodekey.measureType	==	0){
						addchartList('#chartmeasureNames', nodekey.measureName, nodekey.nodeKey,highlight)
					}
				}else if(measureFieldenable	==	true){
					addchartList('#chartmeasureNames', nodekey.measureName, nodekey.nodeKey,highlight)
				}
			});
		  }
	  });
	$('#chart_formula_popup').on('shown.bs.modal', function () {
	    $('#chartsettingformula').focus();
	});
}

function addList(id, text, value,highlight) {
	if(nodeKeyMap[value] == null){
		nodeKeyMap[value] = text;	
	}
	$(id).append(`<li class="list-group-item `+highlight+`" onclick="updateFormula(${value},'',this)">${text}</li>`);
}

function addchartList(id, text, value,highlight) {
	if(chartnodeKeyMap[value] == null){
		chartnodeKeyMap[value] = text;	
	}
	$(id).append(`<li class="list-group-item `+highlight+`" onclick="updatechartFormula(${value},'',this)">${text}</li>`);
}

function updateFormula(input,formuladesc,currentElement) {
	if(formuladesc !=	"" && formuladesc !=	null){
		if($(".chartformuladynamicdesc").css("display")	==	"none"){
			$(".chartformuladynamicdesc").show();
		}
		$(".formulacontentdesc").html(getformulabuilder(formuladesc));
		$(".formulaheaderdesc").html(input.toUpperCase());
	}
	var box = $("#formula");
	var mesaureName = nodeKeyMap[input];
	var formulaval	=	box.val();
	var checkdefaultvalue	=	false;
	if(mesaureName	==	undefined){
		mesaureName = 	input;
	}
	mesaureName	=	(mesaureName	==	undefined?"":mesaureName);
	var finalval	=	formulaval + mesaureName;
	if($(currentElement).hasClass("kpiformuladescHighlight")){
		if(formulaval !=	"" && formulaval.lastIndexOf(mesaureName) !=	-1){
			var splitmeasure	=	formulaval.lastIndexOf(mesaureName);
			var removestr		=	mesaureName.length;
			var remaingingstr	=	splitmeasure+removestr;
			$(currentElement).removeClass("kpiformuladescHighlight");
			box.val(formulaval.slice(0, splitmeasure)  + formulaval.slice(remaingingstr));
			document.getElementById("formula").setSelectionRange(splitmeasure,splitmeasure);
		}
	}else{
		var curPos 	= 	document.getElementById("formula").selectionStart;
		var lastpos	=	parseInt(formulaval.slice(0, curPos).length+mesaureName.length);
	    box.val(formulaval.slice(0, curPos) + mesaureName + formulaval.slice(curPos));
	    document.getElementById("formula").setSelectionRange(lastpos,lastpos);
	    $(currentElement).addClass("kpiformuladescHighlight");
	}
	//box.val(finalval);
}

function updatechartFormula(input,formuladesc,currentElement) {
	var box = $("#chartsettingformula");
	if(formuladesc !=	"" && formuladesc !=	null){
		if($(".chartformuladynamicdesc").css("display")	==	"none"){
			$(".chartformuladynamicdesc").show();
		}
		$(".formulacontentdesc").html(getformulabuilder(formuladesc));
		$(".formulaheaderdesc").html(input.toUpperCase());
	}
	var mesaureName = chartnodeKeyMap[input];
	var formulaval	=	box.val();
	var checkdefaultvalue	=	false;
	if(mesaureName	==	undefined){
		mesaureName = 	input;
	}
	mesaureName	=	(mesaureName	==	undefined?"":mesaureName);
	var finalval	=	formulaval + mesaureName;
	if($(currentElement).hasClass("kpiformuladescHighlight")){
		if(formulaval !=	"" && formulaval.lastIndexOf(mesaureName) !=	-1){
			var splitmeasure	=	formulaval.lastIndexOf(mesaureName);
			var removestr		=	mesaureName.length;
			var remaingingstr	=	splitmeasure+removestr;
			$(currentElement).removeClass("kpiformuladescHighlight");
			box.val(formulaval.slice(0, splitmeasure)  + formulaval.slice(remaingingstr));
			document.getElementById("chartsettingformula").setSelectionRange(splitmeasure,splitmeasure);
		}
	}else{
		var curPos 	= 	document.getElementById("chartsettingformula").selectionStart;
		var lastpos	=	parseInt(formulaval.slice(0, curPos).length+mesaureName.length);
	    box.val(formulaval.slice(0, curPos) + mesaureName + formulaval.slice(curPos));
	    document.getElementById("chartsettingformula").setSelectionRange(lastpos,lastpos);
	    $(currentElement).addClass("kpiformuladescHighlight");
	}
    
	//box.val(finalval);
}

function handleFormulaValidate() {
	validateFormula("Validate");
}

function validateFormula(inputType){
	var component	=	$("#kpiformulaHandletype").val();
	var formulaValue;
	formulaValue = $("#formula").val();
	var formulaJson = {
			"formula" : formulaValue,
			 "type":component
		}
	$.ajax({
		url : "/stratroom/validateFormula/",
		type : 'post',
		contentType : "application/json",
		data : JSON.stringify(formulaJson),
		success : function(data, message) {
			if(data != "valid"){
				if(inputType == "Add"){
					$("#formula").val(formulaValue);
				}
				alert(data);
				return false;
			}else{
				if(inputType == "Validate"){
					alert("Formula is "+data);
				}else{
					if(component == "KPI"){
						$("#text_formula").val("");
						$("#text_formula").val(formulaValue);
						$("#kpiFieldName").val($("#fieldId").val());
						$("#closePopupId").click();
					}else if(component == "DRILLTABLE"){
						$("#drilltable_kpi_formula").val("");
						$("#drilltable_kpi_formula").val(formulaValue);
						$("#tableFieldName").val($("#fieldId").val());
						$("#closePopupId").click();
					}
				}
			}
		}
	});
}

function handleChartFormulaValidate() {
	validatechartFormula("Validate");
}

function validatechartFormula(inputType){
	var component	=	$("#chartormulaHandletype").val();
	var formulaValue;
	formulaValue = $("#chartsettingformula").val();
	var formulaJson = {
			"formula" : formulaValue,
			 "type":component
		}
	$.ajax({
		url : "/stratroom/validateFormula/",
		type : 'post',
		contentType : "application/json",
		data : JSON.stringify(formulaJson),
		success : function(data, message) {
			if(data != "valid"){
				$("#chartsettingformula").val(formulaValue);
				if(inputType == "Add"){
					$("#chartsettingformula").css("border","2px solid red");
				}
				if(inputType == "Validate"){
					$("#chartsettingformula").css("border","2px solid red");
				}
				return false;
			}else{
				if(inputType == "Validate"){
					$("#chartsettingformula").css("border","2px solid green");
				}else{
					$("."+getLastchartFormula).val("");
					$("."+getLastchartFormula).val(formulaValue);
					$("#chartormulaHandletype").val($("#chartfieldId").val());
					//var getid			=	getLastchartFormula.split('_');
					//$("#chartsettingsfieldname_"+getid[1]).val($("#chartfieldId").val());
					$("#chartclosePopupId").click();
				}
			}
		}
	});
}

function handleFormulaAdd() {
	validateFormula("Add");
}

function handleChartFormulaAdd() {
	validatechartFormula("Add");
}

function fieldmeasurefilter() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("fieldmeasurefilter");
    filter = input.value.toUpperCase();
    ul = document.getElementById("measureNames");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function fieldchartmeasurefilter() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("fieldchartmeasurefilter");
    filter = input.value.toUpperCase();
    ul = document.getElementById("chartmeasureNames");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


function bubbleRender(id,type,chartdataload,chartaxisfield,millions,percentage,chartdisplayname, colors,currencyval) {
	$("#Bubblechart"+id).empty();
	$("#Bubblelarge"+id).empty();
	$("#BubbleChartDD"+id).empty();
	
	var yaxisdata = ""
	if(millions)
	{
		yaxisdata = currencyval+" in Millions"
	}
	else if(percentage)
	{
		yaxisdata = "Value in %"
	}
	
	var xaxis 	=	[];
	var yaxis 	=	[];
	var sizeshow 	=	[];
	var chartdata	=	[];
    var layout = 	{
		series: chartdataload,
		chart: {
            height: 323,
            type: "bubble",
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
          },
          fill: {
            opacity: 0.8,
          },
          colors: ["#F3B415", "#F27036", "#663F59", "#6A6E94", "#4E88B4", "#00A7C6", "#18D8D8", '#A9D794',
              '#46AF78', '#A93F55', '#8C5E58', '#2176FF', '#33A1FD', '#7A918D', '#BAFF29'
            ],
			xaxis:{
				tickAmount: 12,
				type: "category",
				title:{
						text:chartdisplayname,
						font: {
					        family: '"Poppins", sans-serif'
					    }
					}
				},
			yaxis:{
				max: 70,
				type: "category",
				title:{
					text:yaxisdata,
					font: {
				        family: '"Poppins", sans-serif'
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
	

	if(type=="largedd"){
			var chart = new ApexCharts(
	          document.querySelector("#ColumnchartDD-1"),
	          layout
	        ).render();
		}else{
        var chart = new ApexCharts(
          document.querySelector("#Bubblechart"+id),
          layout
        ).render();
        var bubbleChart = new ApexCharts(
          document.querySelector("#Bubblelarge"+id),
          layout
        ).render();
     }   
}
function columnRenderComment(id,type,chartdataload,chartaxisfield,millions,percentage,chartdisplayname, colors,currencyval) {
	console.log(id,type,chartdataload,chartaxisfield,millions,percentage,chartdisplayname, colors,currencyval,"chart")
	$("#Columnchart"+id).empty();
	$("#Columnlarge"+id).empty();
	$("#ColumnChartDD"+id).empty();
	var xaxis 	=	[];
	var yaxis 	=	[];
	var sizeshow 	=	[];
	var yaxislabel	=	chartaxisfield;
	var yaxisdata = ""

	if(millions)
	{
		yaxisdata = currencyval+" in Millions"
	}
	else if(percentage)
	{
		yaxisdata = "Value in %"
	}
	
	var layout = 	{
		series: chartdataload,
		chart: {
            height: 323,
            type: "bar",
          },
          plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
		 stroke: {
            width: [0, 4],
          },
          dataLabels: {
            enabled: false,
			enabledOnSeries: [1],
          },
          colors: colors,
			xaxis:{
				categories: yaxislabel,
				title:{
						text:chartdisplayname,
						offsetY: 7,
						font: {
					        family: '"Poppins", sans-serif'
					    }
					}
				},
			yaxis:[
				{
				title:{
					text:yaxisdata,
					font: {
				        family: '"Poppins", sans-serif'
				      }
					}
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
		

/*	if(checkdecimalornot	==	true && percentage	==	true){
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
	
		if(type=="largedd"){
			var chart = new ApexCharts(
	          document.querySelector("#ColumnchartDD-1"),
	          layout
	        ).render();
		}else{
	        var chart = new ApexCharts(
	          document.querySelector("#Columnchart"+id),
	          layout
	        ).render();
	        var columnChart = new ApexCharts(
	          document.querySelector("#Columnlarge"+id),
	          layout
	        ).render();
	     }   
      }
function columnRender(id,type,chartdataload,chartaxisfield,millions,percentage,chartdisplayname, colors,currencyval) {
	$("#Columnchart"+id).empty();
	$("#Columnlarge"+id).empty();
	$("#ColumnChartDD"+id).empty();
	var xaxis 	=	[];
	var yaxis 	=	[];
	var sizeshow 	=	[];
	var yaxislabel	=	chartaxisfield;
	var yaxisdata = ""

	if(millions)
	{
		yaxisdata = currencyval+" in Millions"
	}
	else if(percentage)
	{
		yaxisdata = "Value in %"
	}
	
	var layout = 	{
		series: chartdataload,
		chart: {
            height: 323,
            type: "bar",
          },
          plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
		 stroke: {
            width: [0, 4],
          },
          dataLabels: {
            enabled: false,
			enabledOnSeries: [1],
          },
          colors: colors,
			xaxis:{
				categories: yaxislabel,
				title:{
						text:chartdisplayname,
						offsetY: 7,
						font: {
					        family: '"Poppins", sans-serif'
					    }
					}
				},
			yaxis:[
				{
				title:{
					text:yaxisdata,
					font: {
				        family: '"Poppins", sans-serif'
				      }
					}
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
		

/*	if(checkdecimalornot	==	true && percentage	==	true){
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
	
		if(type=="largedd"){
			var chart = new ApexCharts(
	          document.querySelector("#ColumnchartDD-1"),
	          layout
	        ).render();
		}else{
	        var chart = new ApexCharts(
	          document.querySelector("#Columnchart"+id),
	          layout
	        ).render();
	        var columnChart = new ApexCharts(
	          document.querySelector("#Columnlarge"+id),
	          layout
	        ).render();
	     }   
      }

function ecolumnRender(id, type, chartdataload, chartaxisfield, millions, percentage, chartdisplayname, colors, currencyval) {
   var yaxislabel = chartaxisfield || [];
    var yaxisdata = "";

    // Determine Y-axis label
    if (millions) {
        yaxisdata = (currencyval || '') + " in Millions";
    } 
    else if (percentage) {
        yaxisdata = "Value in %";
    } 
    else {
        yaxisdata = "$ (thousand)";
    }

    // Validate series data
    var series = [];

    if (!Array.isArray(chartdataload)) {
        console.error("chartdataload must be an array");
        return;
    }

    chartdataload.forEach(function (item, index) {

        var rawData = item.data || item.value || [];

        var cleanData = rawData.map(function (val) {
            if (typeof val === 'string') {
                var num = parseFloat(val.replace(/[^0-9.-]/g, ''));
                return isNaN(num) ? 0 : num;
            }
            return typeof val === 'number' ? val : 0;
        });

        series.push({
            name: item.name || ('Series ' + (index + 1)),
            type: 'bar',
            stack: 'total',
            data: cleanData,
            label: {
                show: false
            },
            emphasis: {
                focus: 'series'
            },
            itemStyle: {
                color: colors && colors[index] ? colors[index] : undefined
            }
        });

    });

    console.log("Rendering chart #" + id, {
        xAxisData: yaxislabel,
        seriesCount: series.length
    });

    var option = {

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            confine: true,
            textStyle: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: 12
            }
        },

        legend: {
            data: chartdataload.map(item => item.name),
            textStyle: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: 13
            }
        },

        grid: {
            left: '12%',   // increased to avoid overlap
            right: '4%',
            bottom: '15%', // increased bottom spacing
            top: '15%',
            containLabel: true
        },

        xAxis: {
            type: 'category',
            data: yaxislabel,
            name: chartdisplayname,
            nameLocation: 'middle',
            nameGap: 50,   // increased from 30 to prevent overlap
            axisLabel: {
                rotate: 45,
                interval: 0,
                fontSize: 10,
                fontFamily: '"Poppins", sans-serif',
                margin: 15   // added margin to prevent overlap
            }
        },

        yAxis: {
            type: 'value',
            name: yaxisdata,

            // FIX: prevent overlap
            nameLocation: 'end',
            nameGap: 65,   // increased from 45 to prevent overlap

            nameTextStyle: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: 12,
                padding: [0, 0, 0, 0]  // removed extra padding
            },

            axisLabel: {
                fontSize: 10,
                fontFamily: '"Poppins", sans-serif',

                formatter: function (value) {

                    if (percentage) {
                        return value + '%';
                    }

                    if (millions) {
                        return (value / 1000000).toFixed(1) + 'M';
                    }

                    if (value >= 1000) {
                        return (value / 1000) + 'K';
                    }

                    return value;
                }
            }
        },

        series: series,

        color: colors || ['#008FFB', '#00E396', '#feb019', '#f02fc2', '#607d8b']

    };


    // SMALL CHART
    var chartDom = document.querySelector("#Columnchart" + id);

    if (chartDom) {

        chartDom.style.height = chartDom.style.height || '323px';
        chartDom.style.width = chartDom.style.width || '100%';

        if (chartDom._echartsInstance) {
            chartDom._echartsInstance.dispose();
        }

        var chart = echarts.init(chartDom);

        chart.setOption(option);

        chartDom._echartsInstance = chart;

        setTimeout(function () {
            chart.resize();
        }, 100);
    }


    // LARGE MODAL CHART
    var chartDomLarge = document.querySelector("#Columnlarge" + id);

    if (chartDomLarge) {

        chartDomLarge.style.height = chartDomLarge.style.height || '600px';
        chartDomLarge.style.width = '100%';

        if (chartDomLarge._echartsInstance) {
            chartDomLarge._echartsInstance.dispose();
        }

        var columnChart = echarts.init(chartDomLarge);

        columnChart.setOption(option);

        chartDomLarge._echartsInstance = columnChart;

        var modalParent = chartDomLarge.closest('.modal');

        if (modalParent) {
            modalParent.addEventListener('shown.bs.modal', function () {
                columnChart.resize();
            });
        }

        setTimeout(function () {
            columnChart.resize();
        }, 100);
    }


    // WINDOW RESIZE
    window.addEventListener('resize', function () {

        if (chartDom && chartDom._echartsInstance) {
            chartDom._echartsInstance.resize();
        }

        if (chartDomLarge && chartDomLarge._echartsInstance) {
            chartDomLarge._echartsInstance.resize();
        }

    });

}
function elineRender(id, type, chartdataload, chartaxisfield, millions, percentage, chartdisplayname, colors, currencyval) {
   var yaxislabel = chartaxisfield || [];
    var yaxisdata = "";
    
    if (millions) { yaxisdata = (currencyval || '') + " in Millions"; } 
    else if (percentage) { yaxisdata = "Value in %"; } 
    else { yaxisdata = "$ (thousand)"; }

    var dimensions = ['category'];
    var source = [];
    var series = [];
    
    if (Array.isArray(chartdataload) && chartdataload.length > 0) {
        chartdataload.forEach(function(item, index) {
            dimensions.push(item.name || ('Series ' + (index + 1)));
        });
        
        yaxislabel.forEach(function(category, idx) {
            var row = { category: category };
            chartdataload.forEach(function(item) {
                var val = (item.data || [])[idx] || 0;
                if (typeof val === 'string') {
                    val = parseFloat(val.replace(/[^0-9.-]/g, '')) || 0;
                }
                row[item.name || 'Series'] = val;
            });
            source.push(row);
        });
        
        for (var i = 1; i < dimensions.length; i++) {
            series.push({
                type: 'bar',
                itemStyle: { color: colors && colors[i-1] ? colors[i-1] : undefined }
            });
        }
    }

    var option = {
        tooltip: { 
            trigger: 'axis', 
            axisPointer: { type: 'shadow' }, 
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 } 
        },
        legend: { 
            data: dimensions.slice(1), 
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 13 },
            top: 0,        // CHANGED: Moved to top
            bottom: 'auto' // CHANGED: Removed from bottom
        },
        dataset: { dimensions: dimensions, source: source },
        grid: { 
            left: '12%',   
            right: '8%', 
            bottom: '10%', // CHANGED: Reduced from 12% since legend is at top
            top: '20%',    // CHANGED: Increased from 15% for legend at top
            containLabel: true 
        },
        xAxis: { 
            type: 'category', 
            name: chartdisplayname,
            nameLocation: 'middle',
            nameGap: 45,
            nameTextStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 },
            axisLabel: { 
                rotate: 45, 
                interval: 0, 
                fontSize: 10, 
                fontFamily: '"Poppins", sans-serif',
                margin: 12,
                width: 100,
                overflow: 'break'
            }
        },
        yAxis: {
            type: 'value',
            name: yaxisdata,
            nameLocation: 'middle',
            nameGap: 40,
            nameTextStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 },
            axisLabel: {
                fontSize: 10, 
                fontFamily: '"Poppins", sans-serif',
                formatter: function(value) {
                    if (percentage) return value + '%';
                    if (millions) return (value / 1000000).toFixed(1) + 'M';
                    return value;
                }
            }
        },
        series: series,
        color: colors || ['#008FFB', '#00E396', '#feb019', '#f02fc2', '#607d8b']
    };


    renderChart("#Linechart" + id, option, '323px');
    renderChart("#Linelarge" + id, option, '600px');
}
function eareaRender(id, type, chartdataload, chartaxisfield, millions, percentage, chartdisplayname, colors, currencyval) {
    
    var yaxislabel = chartaxisfield || [];
    var yaxisdata = "";
    
    if (millions) { yaxisdata = (currencyval || '') + " in Millions"; } 
    else if (percentage) { yaxisdata = "Value in %"; } 
    else { yaxisdata = "$ (thousand)"; }

    var series = [];
    if (!Array.isArray(chartdataload)) { console.error("chartdataload must be an array"); return; }
    
    chartdataload.forEach(function(item, index) {
        var rawData = item.data || item.value || [];
        var cleanData = rawData.map(function(val) {
            if (typeof val === 'string') {
                var num = parseFloat(val.replace(/[^0-9.-]/g, ''));
                return isNaN(num) ? 0 : num;
            }
            return typeof val === 'number' ? val : 0;
        });
        series.push({
            name: item.name || ('Series ' + (index + 1)),
            type: 'line',
            stack: 'Total',
            areaStyle: { opacity: 0.8 },
            emphasis: { focus: 'series' },
            data: cleanData,
            itemStyle: { color: colors && colors[index] ? colors[index] : undefined },
            lineStyle: { width: 2 },
            label: {
                show: false,
                position: 'top',
                fontSize: 9,
                fontFamily: '"Poppins", sans-serif'
            }
        });
    });

    var option = {
        tooltip: { 
            trigger: 'axis', 
            axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } },
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 } 
        },
        legend: { 
            data: chartdataload.map(item => item.name), 
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 13 },
            top: 0,        // CHANGED: Moved to top
            bottom: 'auto' // CHANGED: Removed from bottom
        },
        grid: { 
            left: '12%', 
            right: '8%', 
            bottom: '10%', // CHANGED: Reduced from 12%
            top: '20%',    // CHANGED: Increased from 15% for legend
            containLabel: true 
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: yaxislabel,
            name: chartdisplayname,
            nameLocation: 'middle',
            nameGap: 45,
            nameTextStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 },
            axisLabel: { 
                rotate: 45, 
                interval: 0, 
                fontSize: 10, 
                fontFamily: '"Poppins", sans-serif',
                margin: 12,
                width: 100,
                overflow: 'break'
            }
        },
        yAxis: {
            type: 'value',
            name: yaxisdata,
            nameLocation: 'middle',
            nameGap: 40,
            nameTextStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 },
            axisLabel: {
                fontSize: 10, 
                fontFamily: '"Poppins", sans-serif',
                formatter: function(value) {
                    if (percentage) return value + '%';
                    if (millions) return (value / 1000000).toFixed(1) + 'M';
                    return value;
                }
            }
        },
        series: series,
        color: colors || ['#008FFB', '#00E396', '#feb019', '#f02fc2', '#607d8b']
    };

    renderChart("#Areachart" + id, option, '323px');
    renderChart("#Arealarge" + id, option, '600px');
}
function emultiaxisRender(id, type, chartdataload, chartaxisfield, millions, percentage, chartdisplayname, colors, currencyval) {
    var yaxislabel = chartaxisfield || [];
    var yaxisdata = "";
    
    if (millions) { yaxisdata = (currencyval || '') + " in Millions"; } 
    else if (percentage) { yaxisdata = "Value in %"; } 
    else { yaxisdata = "$ (thousand)"; }

    var series = [];
    if (!Array.isArray(chartdataload)) { console.error("chartdataload must be an array"); return; }
    
    chartdataload.forEach(function(item, index) {
        var rawData = item.data || item.value || [];
        var cleanData = rawData.map(function(val) {
            if (typeof val === 'string') {
                var num = parseFloat(val.replace(/[^0-9.-]/g, ''));
                return isNaN(num) ? 0 : num;
            }
            return typeof val === 'number' ? val : 0;
        });
        
        var isLine = (index === chartdataload.length - 1);
        series.push({
            name: item.name || ('Series ' + (index + 1)),
            type: isLine ? 'line' : 'bar',
            yAxisIndex: isLine ? 1 : 0,
            data: cleanData,
            symbol: isLine ? 'circle' : 'none',
            symbolSize: isLine ? 8 : 0,
            lineStyle: isLine ? { width: 3 } : {},
            label: { 
                show: isLine, 
                position: 'top', 
                fontSize: 10,
                fontFamily: '"Poppins", sans-serif',
                distance: 5
            },
            emphasis: { focus: 'series' },
            itemStyle: { color: colors && colors[index] ? colors[index] : undefined }
        });
    });

    var option = {
        tooltip: { 
            trigger: 'axis', 
            axisPointer: { type: 'cross', crossStyle: { color: '#999' } },
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 } 
        },
        legend: { 
            data: chartdataload.map(item => item.name), 
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 13 },
            top: 0,        // CHANGED: Moved to top
            bottom: 'auto' // CHANGED: Removed from bottom
        },
        grid: { 
            left: '12%', 
            right: '15%',  
            bottom: '10%', // CHANGED: Reduced from 12%
            top: '20%',    // CHANGED: Increased from 15% for legend
            containLabel: true 
        },
        xAxis: {
            type: 'category',
            data: yaxislabel,
            name: chartdisplayname,
            nameLocation: 'middle',
            nameGap: 45,
            nameTextStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 },
            axisPointer: { type: 'shadow' },
            axisLabel: { 
                rotate: 45, 
                interval: 0, 
                fontSize: 10, 
                fontFamily: '"Poppins", sans-serif',
                margin: 12,
                width: 100,
                overflow: 'break'
            }
        },
        yAxis: [
            {
                type: 'value',
                name: yaxisdata,
                nameLocation: 'middle',
                nameGap: 40,
                nameTextStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 },
                axisLabel: {
                    fontSize: 10, 
                    fontFamily: '"Poppins", sans-serif',
                    formatter: function(value) {
                        if (percentage) return value + '%';
                        if (millions) return (value / 1000000).toFixed(1) + 'M';
                        return value;
                    }
                }
            },
            {
                type: 'value',
                name: percentage ? 'Gap %' : 'Gap',
                nameLocation: 'middle',
                nameGap: 40,
                nameTextStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 },
                axisLabel: {
                    fontSize: 10, 
                    fontFamily: '"Poppins", sans-serif',
                    formatter: function(value) {
                        return percentage ? value + '%' : value;
                    }
                },
                splitLine: { show: false }
            }
        ],
        series: series,
        color: colors || ['#008FFB', '#00E396', '#feb019']
    };

    renderChart("#Multiaxis" + id, option, '323px');
    renderChart("#Multiaxislarge" + id, option, '600px');
}
function enegativecRender(id,type,chartdataload,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval) {
	  var yaxislabel = chartaxisfield || [];
    var yaxisdata = "";
    
    if (millions) { yaxisdata = (currencyval || '') + " in Millions"; } 
    else if (percentage) { yaxisdata = "Value in %"; } 
    else { yaxisdata = "$ (thousand)"; }

    var series = [];
    if (!Array.isArray(chartdataload)) { console.error("chartdataload must be an array"); return; }
    
    chartdataload.forEach(function(item, index) {
        var rawData = item.data || item.value || [];
        var cleanData = rawData.map(function(val) {
            if (typeof val === 'string') {
                var num = parseFloat(val.replace(/[^0-9.-]/g, ''));
                return isNaN(num) ? 0 : num;
            }
            return typeof val === 'number' ? val : 0;
        });
        series.push({
            name: item.name || ('Series ' + (index + 1)),
            type: 'bar',
            data: cleanData,
            label: { 
                show: true, 
                position: function(params) { return params.value >= 0 ? 'right' : 'left'; },
                formatter: function(params) { return Math.abs(params.value); },
                fontSize: 10,
                fontFamily: '"Poppins", sans-serif',
                distance: 8
            },
            emphasis: { focus: 'series' },
            itemStyle: { color: colors && colors[index] ? colors[index] : undefined }
        });
    });

    var option = {
        tooltip: { 
            trigger: 'axis', 
            axisPointer: { type: 'shadow' },
            formatter: function(params) {
                var result = params[0].name + '<br/>';
                params.forEach(function(param) {
                    result += param.marker + param.seriesName + ': ' + Math.abs(param.value) + '<br/>';
                });
                return result;
            },
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 } 
        },
        legend: { 
            data: chartdataload.map(item => item.name), 
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 13 },
            top: 0,
            bottom: 'auto'
        },
        grid: { 
            left: '15%',   
            right: '20%',  // INCREASED from 15% to 20% for more space
            bottom: '10%', 
            top: '20%',    
            containLabel: true 
        },
        xAxis: {
            type: 'value',
            name: yaxisdata,
            nameLocation: 'middle',    // CHANGED from 'end' to 'middle'
            nameGap: 30,               // INCREASED from 10 to 30
            nameTextStyle: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: 11
            },
            axisLabel: {
                fontSize: 10, 
                fontFamily: '"Poppins", sans-serif',
                formatter: function(value) { return Math.abs(value); },
                margin: 10
            },
            splitLine: { lineStyle: { type: 'dashed' } }
        },
        yAxis: {
            type: 'category',
            data: yaxislabel,
            name: chartdisplayname,
            nameLocation: 'middle',
            nameGap: 55,
            nameTextStyle: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: 12,
                padding: [10, 0, 0, 0]
            },
            axisLabel: { 
                fontSize: 10, 
                fontFamily: '"Poppins", sans-serif',
                width: 120,
                overflow: 'break'
            }
        },
        series: series,
        color: colors || ['#008FFB', '#00E396', '#feb019']
    };

    renderChart("#NegativeColumnchart" + id, option, '323px');
    renderChart("#NegativeColumnlarge" + id, option, '600px');
      }  

function estackedRender(id,type,datachartload,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval) {
  var yaxislabel = chartaxisfield || [];
    var yaxisdata = "";
    
    if (millions) { yaxisdata = (currencyval || '') + " in Millions"; } 
    else if (percentage) { yaxisdata = "Value in %"; } 
    else { yaxisdata = "$ (thousand)"; }

    var series = [];
    if (!Array.isArray(chartdataload)) { console.error("chartdataload must be an array"); return; }
    
    chartdataload.forEach(function(item, index) {
        var rawData = item.data || item.value || [];
        var cleanData = rawData.map(function(val) {
            if (typeof val === 'string') {
                var num = parseFloat(val.replace(/[^0-9.-]/g, ''));
                return isNaN(num) ? 0 : num;
            }
            return typeof val === 'number' ? val : 0;
        });
        series.push({
            name: item.name || ('Series ' + (index + 1)),
            type: 'bar',
            stack: 'total',
            data: cleanData,
            label: { 
                show: true, 
                position: 'right',
                fontSize: 10,
                fontFamily: '"Poppins", sans-serif',
                distance: 5  // Add distance from bar end
            },
            emphasis: { focus: 'series' },
            itemStyle: { color: colors && colors[index] ? colors[index] : undefined }
        });
    });

    var option = {
        tooltip: { 
            trigger: 'axis', 
            axisPointer: { type: 'shadow' }, 
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 } 
        },
        legend: { 
            data: chartdataload.map(item => item.name), 
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 13 } 
        },
        grid: { 
            left: '15%',   // Increased from 3% to prevent yAxis label overlap
            right: '15%',  // Increased from 4% to prevent bar label overlap
            bottom: '10%', // Increased for better spacing
            top: '15%', 
            containLabel: true 
        },
        xAxis: {
            type: 'value',
            name: yaxisdata,
            nameLocation: 'middle',
            nameGap: 35,  // Increased from 30
            nameTextStyle: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: 12
            },
            axisLabel: {
                fontSize: 10, 
                fontFamily: '"Poppins", sans-serif',
                formatter: function(value) {
                    if (percentage) return value + '%';
                    if (millions) return (value / 1000000).toFixed(1) + 'M';
                    return value;
                }
            }
        },
        yAxis: {
            type: 'category',
            data: yaxislabel,
            name: chartdisplayname,
            nameLocation: 'middle',
            nameGap: 50,  // Add gap to prevent overlap
            nameTextStyle: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: 12,
                padding: [10, 0, 0, 0]  // Add padding
            },
            axisLabel: { 
                fontSize: 10, 
                fontFamily: '"Poppins", sans-serif',
                width: 100,  // Set width for labels
                overflow: 'break'  // Break long labels
            }
        },
        series: series,
        color: colors || ['#008FFB', '#00E396', '#feb019', '#f02fc2', '#607d8b']
    };

    renderChart("#Stackedchart" + id, option, '323px');
    renderChart("#Stackedlarge" + id, option, '600px');
      }   
function ecolumnRenderDD(id, type, chartdataload, chartaxisfield, millions, percentage, chartdisplayname, colors, currencyval) {
   var yaxislabel = chartaxisfield || [];
    var yaxisdata = "";

    // Determine Y-axis label
    if (millions) {
        yaxisdata = (currencyval || '') + " in Millions";
    } 
    else if (percentage) {
        yaxisdata = "Value in %";
    } 
    else {
        yaxisdata = "$ (thousand)";
    }

    // Validate series data
    var series = [];

    if (!Array.isArray(chartdataload)) {
        console.error("chartdataload must be an array");
        return;
    }

    chartdataload.forEach(function (item, index) {

        var rawData = item.data || item.value || [];

        var cleanData = rawData.map(function (val) {
            if (typeof val === 'string') {
                var num = parseFloat(val.replace(/[^0-9.-]/g, ''));
                return isNaN(num) ? 0 : num;
            }
            return typeof val === 'number' ? val : 0;
        });

        series.push({
            name: item.name || ('Series ' + (index + 1)),
            type: 'bar',
            stack: 'total',
            data: cleanData,
            label: {
                show: false
            },
            emphasis: {
                focus: 'series'
            },
            itemStyle: {
                color: colors && colors[index] ? colors[index] : undefined
            }
        });

    });

    console.log("Rendering chart #" + id, {
        xAxisData: yaxislabel,
        seriesCount: series.length
    });

    var option = {

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            confine: true,
            textStyle: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: 12
            }
        },

        legend: {
            data: chartdataload.map(item => item.name),
            textStyle: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: 13
            }
        },

        grid: {
            left: '12%',   // increased to avoid overlap
            right: '4%',
            bottom: '15%', // increased bottom spacing
            top: '15%',
            containLabel: true
        },

        xAxis: {
            type: 'category',
            data: yaxislabel,
            name: chartdisplayname,
            nameLocation: 'middle',
            nameGap: 50,   // increased from 30 to prevent overlap
            axisLabel: {
                rotate: 45,
                interval: 0,
                fontSize: 10,
                fontFamily: '"Poppins", sans-serif',
                margin: 15   // added margin to prevent overlap
            }
        },

        yAxis: {
            type: 'value',
            name: yaxisdata,

            // FIX: prevent overlap
            nameLocation: 'end',
            nameGap: 65,   // increased from 45 to prevent overlap

            nameTextStyle: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: 12,
                padding: [0, 0, 0, 0]  // removed extra padding
            },

            axisLabel: {
                fontSize: 10,
                fontFamily: '"Poppins", sans-serif',

                formatter: function (value) {

                    if (percentage) {
                        return value + '%';
                    }

                    if (millions) {
                        return (value / 1000000).toFixed(1) + 'M';
                    }

                    if (value >= 1000) {
                        return (value / 1000) + 'K';
                    }

                    return value;
                }
            }
        },

        series: series,

        color: colors || ['#008FFB', '#00E396', '#feb019', '#f02fc2', '#607d8b']

    };


    // SMALL CHART
    var chartDom = document.querySelector("#Columnchart" + id);

    if (chartDom) {

        chartDom.style.height = chartDom.style.height || '323px';
        chartDom.style.width = chartDom.style.width || '100%';

        if (chartDom._echartsInstance) {
            chartDom._echartsInstance.dispose();
        }

        var chart = echarts.init(chartDom);

        chart.setOption(option);

        chartDom._echartsInstance = chart;

        setTimeout(function () {
            chart.resize();
        }, 100);
    }


    // LARGE MODAL CHART
    var chartDomLarge = document.querySelector("#Columnlarge" + id);

    if (chartDomLarge) {

        chartDomLarge.style.height = chartDomLarge.style.height || '600px';
        chartDomLarge.style.width = '100%';

        if (chartDomLarge._echartsInstance) {
            chartDomLarge._echartsInstance.dispose();
        }

        var columnChart = echarts.init(chartDomLarge);

        columnChart.setOption(option);

        chartDomLarge._echartsInstance = columnChart;

        var modalParent = chartDomLarge.closest('.modal');

        if (modalParent) {
            modalParent.addEventListener('shown.bs.modal', function () {
                columnChart.resize();
            });
        }

        setTimeout(function () {
            columnChart.resize();
        }, 100);
    }


    // WINDOW RESIZE
    window.addEventListener('resize', function () {

        if (chartDom && chartDom._echartsInstance) {
            chartDom._echartsInstance.resize();
        }

        if (chartDomLarge && chartDomLarge._echartsInstance) {
            chartDomLarge._echartsInstance.resize();
        }

    });

}
function elineRenderDD(id, type, chartdataload, chartaxisfield, millions, percentage, chartdisplayname, colors, currencyval) {
   var yaxislabel = chartaxisfield || [];
    var yaxisdata = "";
    
    if (millions) { yaxisdata = (currencyval || '') + " in Millions"; } 
    else if (percentage) { yaxisdata = "Value in %"; } 
    else { yaxisdata = "$ (thousand)"; }

    var dimensions = ['category'];
    var source = [];
    var series = [];
    
    if (Array.isArray(chartdataload) && chartdataload.length > 0) {
        chartdataload.forEach(function(item, index) {
            dimensions.push(item.name || ('Series ' + (index + 1)));
        });
        
        yaxislabel.forEach(function(category, idx) {
            var row = { category: category };
            chartdataload.forEach(function(item) {
                var val = (item.data || [])[idx] || 0;
                if (typeof val === 'string') {
                    val = parseFloat(val.replace(/[^0-9.-]/g, '')) || 0;
                }
                row[item.name || 'Series'] = val;
            });
            source.push(row);
        });
        
        for (var i = 1; i < dimensions.length; i++) {
            series.push({
                type: 'bar',
                itemStyle: { color: colors && colors[i-1] ? colors[i-1] : undefined }
            });
        }
    }

    var option = {
        tooltip: { 
            trigger: 'axis', 
            axisPointer: { type: 'shadow' }, 
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 } 
        },
        legend: { 
            data: dimensions.slice(1), 
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 13 },
            top: 0,        // CHANGED: Moved to top
            bottom: 'auto' // CHANGED: Removed from bottom
        },
        dataset: { dimensions: dimensions, source: source },
        grid: { 
            left: '12%',   
            right: '8%', 
            bottom: '10%', // CHANGED: Reduced from 12% since legend is at top
            top: '20%',    // CHANGED: Increased from 15% for legend at top
            containLabel: true 
        },
        xAxis: { 
            type: 'category', 
            name: chartdisplayname,
            nameLocation: 'middle',
            nameGap: 45,
            nameTextStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 },
            axisLabel: { 
                rotate: 45, 
                interval: 0, 
                fontSize: 10, 
                fontFamily: '"Poppins", sans-serif',
                margin: 12,
                width: 100,
                overflow: 'break'
            }
        },
        yAxis: {
            type: 'value',
            name: yaxisdata,
            nameLocation: 'middle',
            nameGap: 40,
            nameTextStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 },
            axisLabel: {
                fontSize: 10, 
                fontFamily: '"Poppins", sans-serif',
                formatter: function(value) {
                    if (percentage) return value + '%';
                    if (millions) return (value / 1000000).toFixed(1) + 'M';
                    return value;
                }
            }
        },
        series: series,
        color: colors || ['#008FFB', '#00E396', '#feb019', '#f02fc2', '#607d8b']
    };


    renderChart("#Linechart" + id, option, '323px');
    renderChart("#Linelarge" + id, option, '600px');
}
function eareaRenderDD(id, type, chartdataload, chartaxisfield, millions, percentage, chartdisplayname, colors, currencyval) {
    
    var yaxislabel = chartaxisfield || [];
    var yaxisdata = "";
    
    if (millions) { yaxisdata = (currencyval || '') + " in Millions"; } 
    else if (percentage) { yaxisdata = "Value in %"; } 
    else { yaxisdata = "$ (thousand)"; }

    var series = [];
    if (!Array.isArray(chartdataload)) { console.error("chartdataload must be an array"); return; }
    
    chartdataload.forEach(function(item, index) {
        var rawData = item.data || item.value || [];
        var cleanData = rawData.map(function(val) {
            if (typeof val === 'string') {
                var num = parseFloat(val.replace(/[^0-9.-]/g, ''));
                return isNaN(num) ? 0 : num;
            }
            return typeof val === 'number' ? val : 0;
        });
        series.push({
            name: item.name || ('Series ' + (index + 1)),
            type: 'line',
            stack: 'Total',
            areaStyle: { opacity: 0.8 },
            emphasis: { focus: 'series' },
            data: cleanData,
            itemStyle: { color: colors && colors[index] ? colors[index] : undefined },
            lineStyle: { width: 2 },
            label: {
                show: false,
                position: 'top',
                fontSize: 9,
                fontFamily: '"Poppins", sans-serif'
            }
        });
    });

    var option = {
        tooltip: { 
            trigger: 'axis', 
            axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } },
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 } 
        },
        legend: { 
            data: chartdataload.map(item => item.name), 
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 13 },
            top: 0,        // CHANGED: Moved to top
            bottom: 'auto' // CHANGED: Removed from bottom
        },
        grid: { 
            left: '12%', 
            right: '8%', 
            bottom: '10%', // CHANGED: Reduced from 12%
            top: '20%',    // CHANGED: Increased from 15% for legend
            containLabel: true 
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: yaxislabel,
            name: chartdisplayname,
            nameLocation: 'middle',
            nameGap: 45,
            nameTextStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 },
            axisLabel: { 
                rotate: 45, 
                interval: 0, 
                fontSize: 10, 
                fontFamily: '"Poppins", sans-serif',
                margin: 12,
                width: 100,
                overflow: 'break'
            }
        },
        yAxis: {
            type: 'value',
            name: yaxisdata,
            nameLocation: 'middle',
            nameGap: 40,
            nameTextStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 },
            axisLabel: {
                fontSize: 10, 
                fontFamily: '"Poppins", sans-serif',
                formatter: function(value) {
                    if (percentage) return value + '%';
                    if (millions) return (value / 1000000).toFixed(1) + 'M';
                    return value;
                }
            }
        },
        series: series,
        color: colors || ['#008FFB', '#00E396', '#feb019', '#f02fc2', '#607d8b']
    };

    renderChart("#Areachart" + id, option, '323px');
    renderChart("#Arealarge" + id, option, '600px');
}
function emultiaxisRenderDD(id, type, chartdataload, chartaxisfield, millions, percentage, chartdisplayname, colors, currencyval) {
    var yaxislabel = chartaxisfield || [];
    var yaxisdata = "";
    
    if (millions) { yaxisdata = (currencyval || '') + " in Millions"; } 
    else if (percentage) { yaxisdata = "Value in %"; } 
    else { yaxisdata = "$ (thousand)"; }

    var series = [];
    if (!Array.isArray(chartdataload)) { console.error("chartdataload must be an array"); return; }
    
    chartdataload.forEach(function(item, index) {
        var rawData = item.data || item.value || [];
        var cleanData = rawData.map(function(val) {
            if (typeof val === 'string') {
                var num = parseFloat(val.replace(/[^0-9.-]/g, ''));
                return isNaN(num) ? 0 : num;
            }
            return typeof val === 'number' ? val : 0;
        });
        
        var isLine = (index === chartdataload.length - 1);
        series.push({
            name: item.name || ('Series ' + (index + 1)),
            type: isLine ? 'line' : 'bar',
            yAxisIndex: isLine ? 1 : 0,
            data: cleanData,
            symbol: isLine ? 'circle' : 'none',
            symbolSize: isLine ? 8 : 0,
            lineStyle: isLine ? { width: 3 } : {},
            label: { 
                show: isLine, 
                position: 'top', 
                fontSize: 10,
                fontFamily: '"Poppins", sans-serif',
                distance: 5
            },
            emphasis: { focus: 'series' },
            itemStyle: { color: colors && colors[index] ? colors[index] : undefined }
        });
    });

    var option = {
        tooltip: { 
            trigger: 'axis', 
            axisPointer: { type: 'cross', crossStyle: { color: '#999' } },
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 } 
        },
        legend: { 
            data: chartdataload.map(item => item.name), 
            textStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 13 },
            top: 0,        // CHANGED: Moved to top
            bottom: 'auto' // CHANGED: Removed from bottom
        },
        grid: { 
            left: '12%', 
            right: '15%',  
            bottom: '10%', // CHANGED: Reduced from 12%
            top: '20%',    // CHANGED: Increased from 15% for legend
            containLabel: true 
        },
        xAxis: {
            type: 'category',
            data: yaxislabel,
            name: chartdisplayname,
            nameLocation: 'middle',
            nameGap: 45,
            nameTextStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 },
            axisPointer: { type: 'shadow' },
            axisLabel: { 
                rotate: 45, 
                interval: 0, 
                fontSize: 10, 
                fontFamily: '"Poppins", sans-serif',
                margin: 12,
                width: 100,
                overflow: 'break'
            }
        },
        yAxis: [
            {
                type: 'value',
                name: yaxisdata,
                nameLocation: 'middle',
                nameGap: 40,
                nameTextStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 },
                axisLabel: {
                    fontSize: 10, 
                    fontFamily: '"Poppins", sans-serif',
                    formatter: function(value) {
                        if (percentage) return value + '%';
                        if (millions) return (value / 1000000).toFixed(1) + 'M';
                        return value;
                    }
                }
            },
            {
                type: 'value',
                name: percentage ? 'Gap %' : 'Gap',
                nameLocation: 'middle',
                nameGap: 40,
                nameTextStyle: { fontFamily: '"Poppins", sans-serif', fontSize: 12 },
                axisLabel: {
                    fontSize: 10, 
                    fontFamily: '"Poppins", sans-serif',
                    formatter: function(value) {
                        return percentage ? value + '%' : value;
                    }
                },
                splitLine: { show: false }
            }
        ],
        series: series,
        color: colors || ['#008FFB', '#00E396', '#feb019']
    };

    renderChart("#Multiaxis" + id, option, '323px');
    renderChart("#Multiaxislarge" + id, option, '600px');
}
function renderChart(containerSelector, option, defaultHeight) {
    var chartDom = document.querySelector(containerSelector);
    if (!chartDom) return null;
    
    // Ensure dimensions
    chartDom.style.height = chartDom.style.height || defaultHeight;
    chartDom.style.width = '100%';
    
    // Dispose old instance
    if (chartDom._echartsInstance) {
        chartDom._echartsInstance.dispose();
    }
    
    // Initialize new chart
    var chart = echarts.init(chartDom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    chart.setOption(option);
    chartDom._echartsInstance = chart;
    
    // Force resize after render
    setTimeout(function() { chart.resize(); }, 50);
    
    // Modal resize handler
    var modalParent = chartDom.closest('.modal');
    if (modalParent) {
        modalParent.addEventListener('shown.bs.modal', function() {
            chart.resize();
        });
    }
    
    return chart;
}

// Global resize handler (call once in your main script)
window.addEventListener('resize', function() {
    document.querySelectorAll('[id*="Echarts"], [id*="Chart"]').forEach(function(el) {
        if (el._echartsInstance) {
            el._echartsInstance.resize();
        }
    });
});

function lineRender(id,type,chartdataload,chartaxisfield,millions,percentage,chartdisplayname, colors,currencyval) {
	$("#Linechart"+id).empty();
	$("#Linelarge"+id).empty();
	$("#LineChartDD"+id).empty();
	

	var yaxisdata = ""
	if(millions)
	{
		yaxisdata = currencyval+" in Millions"
	}
	else if(percentage)
	{
		yaxisdata = "Value in %"
	}
	
  	var min	=	0;
  	var max	=	0;
  	/*$.each(chartdataload,function(val,item){
		if(item.data.length > 0){
			if(val	==	0){
				min	=	item.data[0];
				max	=	item.data[0];
				return false;
			}
		}
	});*/
	
	$.each(chartdataload,function(val,item){
		var newmax=0;
		var newmin =0;
		if(item.data	!= undefined && item.data	!= "" && item.data.length > 0){
			 newmax = Math.max(...item.data);
			if(newmax > max){
				max	=	newmax;	
			}
			newmin 	= 	Math.min(...item.data);
			if(newmin < min){
				min	=	newmin;	
			}
		}
			
			else{
			max = 1;
		}
	});
		
  	/*$.each(chartdataload,function(val,item){
		if(item.data.length > 0){
			var newmax 	= 	item.data.reduce(function(a, b) {
		    	return Math.max(a, b);
			});
			
			max	=	newmax;
			if(newmax > max){
				max	=	newmax;	
			}
			
			var newmin 	= 	item.data.reduce(function(a, b) {
		    	return Math.min(a, b);
			});
			
			min	=	newmin;
			if(newmin > min){
				min	=	newmin;	
			}
		}else{
			max = 1;
		}
	});*/
	if(typeof min	===	"string"){
		min	=	parseInt(min);
	}
	if(typeof max	===	"string"){
		max	=	parseInt(max);
	}
	     
  	var xaxis 	=	[];
	var yaxis 	=	[];
	var percentage	=	false;
	var checkdecimalornot	=	false;
	var yaxislabel	=	chartaxisfield;
	var layout = 	{
		series: chartdataload,
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
		 stroke: {
            curve: "smooth",
          },
          dataLabels: {
            enabled: true
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
		legend: {
            position: "bottom",
            horizontalAlign: "center",
          },
          colors: colors,
			xaxis:{
				categories: chartaxisfield,
				title:{
						text:chartdisplayname,
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
					},
              		min: min,
            		max: max,
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
	if(type=="largedd"){
			var chart = new ApexCharts(
	          document.querySelector("#ColumnchartDD-1"),
	          layout
	        ).render();
		}else{
	    	var chart = new ApexCharts(
	            document.querySelector("#Linechart"+id),
	            layout
	          ).render();
	        var bubbleChart = new ApexCharts(
	          document.querySelector("#Linelarge"+id),
	          layout
	        ).render();
	      }  
      }
      
 function areaRender(id,type,chartdataload,chartaxisfield,millions,percentage,chartdisplayname, colors,currencyval) {
	 
	$("#Areachart"+id).empty();
	$("#Arealarge"+id).empty();
	$("#AreaChartDD"+id).empty();
	var xaxis 	=	[];
	var yaxis 	=	[];
	var sizeshow 	=	[];
	var chartdata	=	[];
	var yaxislabel	=	chartaxisfield;
	
	var yaxisdata = ""
	if(millions)
	{
		yaxisdata = currencyval+" in Millions"
	}
	else if(percentage)
	{
		yaxisdata = "Value in %"
	}
	
	var layout = 	{
		series: chartdataload,
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
          colors: colors,
			xaxis:{
				categories: yaxislabel,
				title:{
						text:chartdisplayname,
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
	
	if(type=="largedd"){
			var chart = new ApexCharts(
	          document.querySelector("#ColumnchartDD-1"),
	          layout
	        ).render();
		}else{
		
	var chart = new ApexCharts(
          document.querySelector("#Areachart"+id),
          layout
        ).render();
        var areaChart = new ApexCharts(
          document.querySelector("#Arealarge"+id),
          layout
        ).render();
     }
}

 function pieRender(id,type,chartdataload,chartaxisfield,checkdecimalornot,percentage,chartdisplayname, colors) {
	$("#Piechart"+id).empty();
	$("#Pielarge"+id).empty();
	var yaxislabel	=	[];
	var xaxis 	=	[];
	var yaxis 	=	[];
	var chartseries	=	[];
	$.each(chartdataload,function(val,item){
		yaxislabel.push(item.name);
		chartseries.push(item.data[0]);
	});
	
	/*$.each(chartdataload,function(val,item){
		$.each(item.data,function(val,dat){
			chartseries.push(dat)
		});
	});*/
	
	var layout = 	{
		series: chartseries,
		chart: {
            width: 350,
            type: "pie",
          },
          yaxis:{
							tickformat:'',
							range:''	
						},

						colors: colors,
		labels: yaxislabel,
		responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                  horizontalAlign: "center",
                  floating: true,
                },
              },
            },
          ],
		};
	
	/*if(yaxis.length > 0){
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
	}*/
	
	var chart = new ApexCharts(
          document.querySelector("#Piechart"+id),
          layout
        ).render();
        var areaChart = new ApexCharts(
          document.querySelector("#Pielarge"+id),
          layout
        ).render();
}

function waterfallRender(id,type,chartdataload,chartaxisfield,millions,percentage,chartdisplayname, colors,currencyval) {
	$("#Waterfallchart"+id).empty();
	$("#Waterfalllarge"+id).empty();
	var yaxisdata = ""
	if(millions)
	{
		yaxisdata = currencyval+" in Millions"
	}
	else if(percentage)
	{
		yaxisdata = "Value in %"
	}
	var yaxislabel	=	[];
	var xaxis 	=	[];
	var yaxis 	=	[];
    var layout = {
          series: chartdataload,
          chart: {
            type: "rangeBar",
            height: 323,
          },
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          dataLabels: {
            enabled: true,
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
          },
          colors: colors,
          	xaxis:{
				categories: yaxislabel,
				title:{
						text:chartdisplayname,
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
	
        var chart = new ApexCharts(
          document.querySelector("#Waterfallchart"+id),
          layout
        ).render();
        var waterfallChart = new ApexCharts(
          document.querySelector("#Waterfalllarge"+id),
          layout
        ).render();
      }
      
    
function multiaxisRender(id,type,chartdataload,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval) {
	
	$("#Multiaxis"+id).empty();
	$("#Multiaxislarge"+id).empty();
	$("#MultiAxisDD"+id).empty();
	var yaxisdata = ""
	if(millions)
	{
		yaxisdata = currencyval+" in Millions"
	}
	else if(percentage)
	{
		yaxisdata = "Value in %"
	}
	
	var yaxislabel	=	chartaxisfield;


	var xaxis 	=	[];
	var yaxis 	=	[];
        var layout = {
          series: chartdataload,
          chart: {
            height: 323,
            type: "line",
            stacked: false,
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            width: [1, 1, 4],
          },
          colors: colors,
          xaxis:{
				categories: yaxislabel,
				title:{
						text:chartdisplayname,
						font: {
					        family: '"Poppins", sans-serif'
					    },
					},
				},
			yaxis:[{
					axisTicks: {
	                	show: true,
	          		},
	          axisBorder: {
                show: true,
              },
				title:{
					text:yaxisdata,
					font: {
				        family: '"Poppins", sans-serif'
				      }
                },
                tooltip: {
                enabled: false,
              },
			}],
          tooltip: {
            fixed: {
              enabled: true,
              position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 60,
            },
          },
          legend: {
            horizontalAlign: "center",
          },
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
	
		if(type=="largedd"){
			var chart = new ApexCharts(
	          document.querySelector("#ColumnchartDD-1"),
	          layout
	        ).render();
		}else{
		

        var chart = new ApexCharts(
          document.querySelector("#Multiaxis"+id),
          layout
        ).render();

        var multiChart = new ApexCharts(
          document.querySelector("#Multiaxislarge"+id),
          layout
        ).render();   
     }
  }      

function stackedRender(id,type,datachartload,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval) {
	$("#Stackedchart"+id).empty();
	$("#Stackedlarge"+id).empty();
	var yaxisdata = ""
	if(millions)
	{
		yaxisdata = currencyval+" in Millions"
	}
	else if(percentage)
	{
		yaxisdata = "Value in %"
	}
	var yaxislabel	=	chartaxisfield;
	var xaxis 	=	[];
	var yaxis 	=	[];
        var layout = {
          series: datachartload,
          chart: {
            type: "bar",
            height: 323,
            stacked: true,
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          stroke: {
            width: 1,
            colors: ["#fff"],
          },
          colors: colors,
         xaxis: {
            categories: yaxislabel,
            title: {
              text: yaxisdata ,
              font: {
				        family: '"Poppins", sans-serif'
				      }
            },
            labels: {
              formatter: function (val) {
                return val;
              },
            },
          },
          yaxis: {
            title: {
              text: chartdisplayname,
              font: {
				        family: '"Poppins", sans-serif'
				      }
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val;
              },
            },
          },
          fill: {
            opacity: 1,
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
          },
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

        var chart = new ApexCharts(
          document.querySelector("#Stackedchart"+id),
          layout
        ).render();
        var stackedChart = new ApexCharts(
          document.querySelector("#Stackedlarge"+id),
          layout
        ).render();
      }     
      
      
      
function radialmultipleRender(id,type,chartdataload,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval) {
	$("#RadialMultichart"+id).empty();
	$("#RadialMultilarge"+id).empty();
	var yaxisdata = ""
	if(millions)
	{
		yaxisdata = currencyval+" in Millions"
	}
	else if(percentage)
	{
		yaxisdata = "Value in %"
	}
	var yaxislabel	=	[];
	var chartseries	=	[];
	var total	=	0;
	$.each(chartdataload,function(val,item){
		yaxislabel.push(item.name);
		chartseries.push(item.data[0])
		total	+=	parseInt(total);	
	});
	
    var layout = {
          series: chartseries,
          chart: {
            height: 336,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: "22px",
                },
                value: {
                  fontSize: "16px",
                },
                total: {
                  show: true,
                  label: "Total",
                  formatter: function (w) {
                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                    return total;
                  },
                },
              },
            },
          },
          labels: yaxislabel,
        };

        var chart = new ApexCharts(
          document.querySelector("#RadialMultichart"+id),
          layout
        ).render();
        var radialmultipleChart = new ApexCharts(
          document.querySelector("#RadialMultilarge"+id),
          layout
        ).render();
      }

function negativecRender(id,type,chartdataload,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval) {
	$("#NegativeColumnchart"+id).empty();
	$("#NegativeColumnlarge"+id).empty();
	var yaxisdata = ""
	if(millions)
	{
		yaxisdata = currencyval+" in Millions"
	}
	else if(percentage)
	{
		yaxisdata = "Value in %"
	}
	var yaxislabel	=	[];
	var chartseries	=	[];
	var total	=	0;
	var ranges	=	[];
	$.each(chartdataload,function(val,item){
		yaxislabel.push(item.name);
		chartseries.push(item.data[0]);
		total	+=	parseInt(total);
		ranges.push({"from":Math.min.apply(Math, item.data),"to":Math.max.apply(Math, item.data),"color":colors[val]});		
		
	});
	var xaxislabelset	=	{
        text: "Period"
      };
      
    if(yaxislabel.length >= 2){
    	var xaxislabelset	=	{
            text: "Period",
            offsetX: 0,
            offsetY: -12
          };
	}
    var layout = {
          series: chartdataload,
          chart: {
            type: "bar",
            height: 323,
          },
          plotOptions: {
            bar: {
              colors: {
                ranges: [ranges],
              },
              columnWidth: "80%",
            },
          },
          dataLabels: {
            enabled: false,
          },
          colors: colors,
          yaxis: {
            title: {
              text: yaxisdata,
            },
            labels: {
              formatter: function (y) {
                return y.toFixed(0) + "%";
              },
            },
          },
          xaxis: {
        	categories: chartaxisfield,
            title: xaxislabelset,
            labels: {
              rotate: -90,
            },
          },
          legend: {
            position: "bottom",
            show: true,
            horizontalAlign: "center",
            floating: true
          },
        };

        var chart = new ApexCharts(
          document.querySelector("#NegativeColumnchart"+id),
          layout
        ).render();
        var stackedChart = new ApexCharts(
          document.querySelector("#NegativeColumnlarge"+id),
          layout
        ).render();
      }        

      function initDateRangePicker(selector,ElementId,typeofposition) {
      	
      	var daterangevalue	=	$(selector).val();
      	var startdateval 	= 	localStorage.getItem("startdateval");
		var enddateval 		= 	localStorage.getItem("enddateval");
		var timestamp 		= 	0;
      	if(daterangevalue !=	"" && daterangevalue !=	undefined && daterangevalue.indexOf('-') !=	-1){
	      	timestamp 	= 	daterangevalue.split('-')
			var d 		= 	new Date(timestamp[0])
			startdateval= 	d.toLocaleDateString('en-US');
			
			//timestamp 	= 	Number(daterangevalue)
			var d 		= 	new Date(timestamp[1])
			enddateval= 	d.toLocaleDateString('en-US');
      	}
          var orientation =
            $("#dashboard-body .sub_initiatives").length % 2 === 0 ||
            $("#dashboard-body .sub_initiatives").length % 3 === 0
              ? "left"
              : "right";


			  var financialstart	=	(controlpanelgeneralsiteSettings !=	"" && (controlpanelgeneralsiteSettings.startMonth !=undefined && controlpanelgeneralsiteSettings.startMonth !=	"")?controlpanelgeneralsiteSettings.startMonth:"Jan");
			  var financialend	=	(controlpanelgeneralsiteSettings !=	"" && (controlpanelgeneralsiteSettings.endMonth !=undefined && controlpanelgeneralsiteSettings.endMonth !=	"")?controlpanelgeneralsiteSettings.endMonth:"Dec");
				var calenderperiod	=	(controlpanelgeneralsiteSettings !=	"" && (controlpanelgeneralsiteSettings.defaultDatePeriod !=undefined && controlpanelgeneralsiteSettings.defaultDatePeriod !=	"")?controlpanelgeneralsiteSettings.defaultDatePeriod:"Month");
				var calendarYearfinStart=	financialstart;
				var calendarYearfinEnd	=financialend;
				if(financialstart	==	"Jul"){
				  financialstart	=	7;
			  }else if(financialstart	==	"Apr"){
				  financialstart	=	4;
			  }else if(financialstart	==	"Jan"){
				  financialstart	=	1;
			  }
			  if(calenderperiod	==	"Month" || calenderperiod	==	"Monthly"){
				  calenderperiod	=	"month";
			  }else if(calenderperiod	==	"Quarter" || calenderperiod==	"Quarterly" ){
				  calenderperiod	=	"quarter";
			  }else if(calenderperiod	==	"Half Year" || calenderperiod	==	"HalfYearly"){
				  calenderperiod	=	"hyear";
			  }else if(calenderperiod	==	"Year" || calenderperiod ==	"Annually" ){
				  calenderperiod	=	"year";
			  }
	  
			  var idfieldvalue = selector.replace("#","")

          
          $(selector).daterangepicker({
            periods:["month","quarter","hyear","year"],
            "startDate" : startdateval,
			"endDate" : enddateval,	
            orientation: typeofposition,
            maxDate: [moment().add(30, "year"), "inclusive"],
			startMonthOfFicalYear:calendarYearfinStart,
			endMonthOfFicalYear:calendarYearfinEnd,
            period: calenderperiod,
			idfield: idfieldvalue,
            callback: function (startDate, endDate, period) {
              var ajaxtitle = startDate.format("L") + " - " + endDate.format("L");
              var title = startDate.format("MMM, YYYY") + " - " +endDate.format("MMM, YYYY");
              $(this).val(title);
				$.ajax({
					url : "/stratroom/charts/" + ElementId,
					success : function(data,status){
						inlineupdateDescription	=	data;
						if((editpermission	==	true || createpermission	==	true) && (drilleditpermission	==	true || drillcreatepermission	==	true)){
							handleInlineEditSave(ajaxtitle,"datarangechart");
						}
						var layoutType 	= 	data.chartValue.type;
						if(layoutType	==	"BubbleChartDD" || layoutType	==	"ColumnChartDD" || layoutType	==	"LineChartDD" || layoutType	==	"AreaChartDD" || layoutType	==	"MultiAxisDD"){
							caldenderupdatewidgetChartDDLoad(data);
						}else if(layoutType == "BubbleChart" || layoutType == "PieChart" || layoutType == "LineChart" || layoutType == "NegativeColumnChart" || layoutType == "StackedChart" || layoutType == "ColumnChart" || layoutType == "MultiAxis" || layoutType == "AreaChart"){
							chartdaterangeupdateTriggerchart(data);
						}
						else if(layoutType == "BubbleChartComment" || layoutType == "PieChartComment" || layoutType == "LineChartComment" || layoutType == "NegativeColumnChartComment" || layoutType == "StackedChartComment" || layoutType == "ColumnChartComment" || layoutType == "MultiAxisComment" || layoutType == "AreaChartComment"){
							chartdaterangeupdateTriggerchartComment(data);
						}	
					},
					error:readErrorMsg
				});
				
            },
          });

		  $(selector + ' #applybutton').mousedown(function(){
			dateRangeUpdate=true;
		})
          $.ajax({
				url : "/stratroom/charts/" + ElementId,
				success : function(data,status){
					inlineupdateDescription	=	data;
					var layoutType 	= 	data.chartValue.type;
					if(layoutType	==	"BubbleChartDD" || layoutType	==	"ColumnChartDD" || layoutType	==	"LineChartDD" || layoutType	==	"AreaChartDD" || layoutType	==	"MultiAxisDD"){
						caldenderupdatewidgetChartDDLoad(data);
					}else if(layoutType == "BubbleChart" || layoutType == "PieChart" || layoutType == "LineChart" || layoutType == "NegativeColumnChart" || layoutType == "StackedChart" || layoutType == "ColumnChart" || layoutType == "MultiAxis" || layoutType == "AreaChart"){
						chartdaterangeupdateTriggerchart(data);
					}else if(layoutType == "BubbleChartComment" || layoutType == "PieChartComment" || layoutType == "LineChartComment" || layoutType == "NegativeColumnChartComment" || layoutType == "StackedChartComment" || layoutType == "ColumnChartComment" || layoutType == "MultiAxisComment" || layoutType == "AreaChartComment" ){
							chartdaterangeupdateTriggerchartComment(data);
						}	
				},
				error:readErrorMsg
			});
        }
 
        
$(document).on('blur', ".inlineeditableTxt", function () {
	var elementId 	= 	$(this).attr("data-id");
	if(elementId	==	"" || elementId	==	0 || elementId	==	undefined){
		return false;
	}
	var oldelementValue = $(this).attr("data-oldHeader");
	var elementValue = $(this).text().trim();
	if (elementValue != oldelementValue) {
		$(this).attr("data-oldHeader", elementValue);
		$.ajax({
			url : "/stratroom/charts/" + elementId,
			success : function(data,status){
				inlineupdateDescription	=	data;
				handleInlineEditSave(elementValue,"chartdisplayname");	
			},
			error:readErrorMsg
		});
	}
});

function handleInlineEditSave(elementValue,typefield){
	var textObj = 	inlineupdateDescription;
	if(typefield	==	"chartdisplayname"){
		textObj["chartValue"]["chartdisplayname"]	=	elementValue;
		if(elementValue	==	"" || elementValue	==	0	|| elementValue	==	" "){
			var gettypeofchart	=	textObj.chartValue.type;
			if(gettypeofchart	==	"BubbleChart" || gettypeofchart	==	"PieChart"	|| gettypeofchart	==	"LineChart" || gettypeofchart	==	"NegativeColumnChart" || gettypeofchart	==	"StackedChart" || gettypeofchart	==	"ColumnChart" || gettypeofchart	==	"MultiAxis" || gettypeofchart	==	"AreaChart"){
				$(".inlineeditableTxt[data-id='"+textObj.id+"']").text("--");
				$(".inlineeditableTxt[data-id='"+textObj.id+"']").attr("data-oldHeader","--");
				textObj["chartValue"]["chartdisplayname"]	=	"--";
			}else if(gettypeofchart	==	"BubbleChartDD" || gettypeofchart	==	"ColumnChartDD" || gettypeofchart	==	"LineChartDD" || gettypeofchart	==	"AreaChartDD" || gettypeofchart	==	"MultiAxisDD"){
				textObj["chartValue"]["chartdisplayname"]	=	"Drill Down Table";
				$(".inlineeditableTxt[data-id='"+textObj.id+"']").text("Drill Down Table");
				$(".inlineeditableTxt[data-id='"+textObj.id+"']").attr("data-oldHeader","Drill Down Table");
			}else if(gettypeofchart	==	"BubbleChartComment" || gettypeofchart	==	"PieChartComment"	|| gettypeofchart	==	"LineChartComment" || gettypeofchart	==	"NegativeColumnChartComment" || gettypeofchart	==	"StackedChartComment" || gettypeofchart	==	"ColumnChartComment" || gettypeofchart	==	"MultiAxisComment" || gettypeofchart	==	"AreaChartComment" ){
				$(".inlineeditableTxt[data-id='"+textObj.id+"']").text("--");
				$(".inlineeditableTxt[data-id='"+textObj.id+"']").attr("data-oldHeader","--");
				textObj["chartValue"]["chartdisplayname"]	=	"--";
			}
		}else{
			textObj["chartValue"]["chartdisplayname"]	=	elementValue;
			$(".inlineeditableTxt[data-id='"+textObj.id+"']").attr("data-oldHeader",elementValue);
		}
		
	}else if(typefield	==	"datarangechart"){
		textObj["chartValue"]["datarangechart"]	=	elementValue;
	}
	
    $.ajax({
        url: "/stratroom/charts",
        type: "put",
        contentType: "application/json",
        data: JSON.stringify(textObj),
        success: function (data, status) {
        	if(typefield	==	"chartdisplayname"){
        		$.notify("Updated Successfully",{
							  style: 'success',
							  className: 'graynotify'
							});
        	}
            //location.reload(true);
        },
		error:readErrorMsg
    });
}

// Global utility function (ensure it exists)
function checkPositiveorNegative(val) {
    var num = parseFloat((val || "").replace(/[^\d.-]/g, ''));
    return isNaN(num) || num >= 0 ? 0 : 1; // 1 = negative → highlight
}
var loadedDrillRows = {};

function caldenderupdatewidgetChartDDLoad(item, paramsdeptname, flagcheck) {
    var tableElement = $(".drilldownTable_" + item.id);
    $(tableElement).empty();

    var layoutType = item.chartValue.type;
    var inlinedisplayname = (item.chartValue.chartdisplayname !== undefined ? item.chartValue.chartdisplayname : "Drill Down Table");
    var chartdisplayname = (item.chartValue.displayname !== undefined ? item.chartValue.displayname : "");
    var formula = (item.chartValue.formula && item.chartValue.formula !== "" ? item.chartValue.formula : "");
    var fieldName = (item.chartValue.fieldName && item.chartValue.fieldName !== "" ? item.chartValue.fieldName : "");
    var datarangechart = (item.chartValue.datarangechart && item.chartValue.datarangechart !== "" ? item.chartValue.datarangechart : $("#datePeriod").val());

    var body = "";
    var tableheader = "";
    var quternamespan = 3;
    var percentage = false;
    var millions = false;
    var currencyval = "$";
    var colors = [];
    var largechart = $(".largechart");

    // ✅ Define chart container ID properly
    var chartContainerId = "";
    if (layoutType === "BubbleChartDD") {
        chartContainerId = "Bubblechart" + item.id;
        $(largechart).attr("id", "Bubblelarge" + item.id);
    } else if (layoutType === "ColumnChartDD") {
        chartContainerId = "Columnchart" + item.id;
        $(largechart).attr("id", "Columnlarge" + item.id);
    } else if (layoutType === "LineChartDD") {
        chartContainerId = "Linechart" + item.id;
        $(largechart).attr("id", "Linelarge" + item.id);
    } else if (layoutType === "AreaChartDD") {
        chartContainerId = "Areachart" + item.id;
        $(largechart).attr("id", "Arealarge" + item.id);
    } else if (layoutType === "MultiAxisDD") {
        chartContainerId = "Multiaxis" + item.id;
        $(largechart).attr("id", "Multiaxislarge" + item.id);
    }

    $("#" + chartContainerId).empty();

    tableheader = '<th data-i18n="Actual">Actual</th><th data-i18n="Target">Target</th><th data-i18n="Gap">Gap</th>';
    var measurement = (item.chartValue.measurement && item.chartValue.measurement !== "" ? item.chartValue.measurement : "Monthly");
    var chartsettings = (item.chartValue.chartsettings && item.chartValue.chartsettings !== "" ? item.chartValue.chartsettings : []);
    var chartdataloadval = [];
    var chartaxisfield = [];
    var wholetableduplicate = [];
    var xaxis = [];
    var finalactualrows = "";

    if (chartsettings && chartsettings.length > 0) {
        var prevformula = "";
        var prevData = "";

        $.each(chartsettings, function (i, List) {
            var repull = true;
            var displayname = List.displayname || "";
            var chartformula = List.chartformula || "";
            var fieldName = List.fieldtype || "";
            var colorcode = (List.colorcode === "rgb(233, 236, 239)" ? "#26a0fc" : List.colorcode);
            colors.push(colorcode);

            if (prevformula === chartformula) {
                repull = false;
            } else {
                prevData = "";
            }
            prevformula = chartformula;

            var textObj = {
                "fieldName": fieldName,
                "formula": chartformula,
                "period": datarangechart,
                "type": "drillTable",
                "groupBy": "Dept",
                "tableType": "dril"
            };
            if (paramsdeptname) {
                textObj.deptName = paramsdeptname.replaceAll(':', " ");
            }

            $(".page-loader-wrapper").css("display", "block");

            if (repull) {
                $.ajax({
                    url: "/stratroom/formula/kpiList?tableFrequency=" + measurement + "&groupBy=Dept",
                    type: "post",
                    async: false,
                    contentType: "application/json",
                    data: JSON.stringify(textObj),
                    success: function (resultdata) {
                        $(".page-loader-wrapper").css("display", "none");
                        prevData = resultdata;
                        finalactualrows = "";

                        wholetableduplicate = [];
                        chartdataloadval = [];
                        chartaxisfield = [];
                        currencyval = "$";
                        millions = false;
                        percentage = false;

                        $.each(resultdata, function (index, frequencyitem) {
                            $.each(frequencyitem, function (frequency, department) {
                                if (!department || jQuery.isEmptyObject(department) || frequency === "childFlag") return;

                                var hasChildren = department.childFlag === true;
                                var firstCell = hasChildren
                                    ? `<td class="scrolldrill employeereportevent" data-deptname="${frequency}" data-id="${item.id}" data-loaded="false"><i class="fas fa-plus toggle-icon"></i></td>`
                                    : `<td class="scrolldrill"><i class="fas fa-minus" style="visibility:hidden; color:transparent;"></i></td>`;

                                var quaterheaderbody = "<tr>" + firstCell + "<td class='scrolldrill1'>" + (frequency.split('-')[0] || frequency) + "</td>";

                                var deptPeriods = [];
                                $.each(department, function (key, val) {
                                    if (!['childFlag', 'overallGap', 'gapStatus'].includes(key)) {
                                        if (!deptPeriods.includes(key)) {
                                            deptPeriods.push(key);
                                        }
                                    }
                                });
                                deptPeriods.sort();

                                deptPeriods.forEach(function (p) {
                                    if (!wholetableduplicate.includes(p)) {
                                        wholetableduplicate.push(p);
                                    }
                                });

                                wholetableduplicate.forEach(function (period) {
                                    var quarterobj = department[period] || { actual: "", target: "", gap: "", currency: "" };

                                    if (quarterobj.currency) currencyval = quarterobj.currency;
                                    if ((quarterobj.actual || "").includes("M") || (quarterobj.target || "").includes("M")) millions = true;
                                    else if ((quarterobj.actual || "").includes("%") || (quarterobj.target || "").includes("%")) percentage = true;

                                    var actualbody = quarterobj.actual || "";
                                    var targetbody = quarterobj.target || "";
                                    var gapbody = quarterobj.gap || "";

                                    var actualcolorhighlight = (checkPositiveorNegative(actualbody) == 1) ? "negativeHighlight" : "";
                                    var targetcolorhighlight = (checkPositiveorNegative(targetbody) == 1) ? "negativeHighlight" : "";
                                    var gapcolorhighlight = (checkPositiveorNegative(gapbody) == 1) ? "negativeHighlight" : "";

                                    quaterheaderbody += `<td class="${actualcolorhighlight}">${(quarterobj.currency || "") + actualbody}</td>`;
                                    quaterheaderbody += `<td class="${targetcolorhighlight}">${(quarterobj.currency || "") + targetbody}</td>`;
                                    quaterheaderbody += `<td class="${gapcolorhighlight}">${(quarterobj.currency || "") + gapbody}</td>`;
                                });

                                quaterheaderbody += "</tr>";
                                finalactualrows += quaterheaderbody;
                            });
                        });

                        wholetableduplicate.sort();
                        chartaxisfield = wholetableduplicate;

                        chartdataloadval = [];
                        $.each(chartsettings, function (sIdx, setting) {
                            var field = setting.fieldtype || "Actual";
                            var seriesNameSuffix = setting.displayname || field;
                            var seriesColor = (setting.colorcode === "rgb(233, 236, 239)" ? "#26a0fc" : setting.colorcode);

                            $.each(resultdata, function (i, freqItem) {
                                $.each(freqItem, function (deptName, deptData) {
                                    if (!deptData || jQuery.isEmptyObject(deptData) || deptName === "childFlag") return;

                                    var values = [];
                                    wholetableduplicate.forEach(function (period) {
                                        var obj = deptData[period] || {};
                                        var valStr = "0";
                                        if (field === "Actual") valStr = obj.actual || "0";
                                        else if (field === "Target") valStr = obj.target || "0";
                                        else if (field === "Gap") valStr = obj.gap || "0";

                                        var clean = (valStr || "").replace(/[^\d.-]/g, '');
                                        var num = clean !== "" ? parseFloat(clean) : 0;
                                        values.push(num);
                                    });

                                    chartdataloadval.push({
                                        name: seriesNameSuffix,
                                        data: values,
                                        color: seriesColor
                                    });
                                });
                            });
                        });
                    },
                    error: readErrorMsg
                });
            } else {
                $(".page-loader-wrapper").css("display", "none");
            }
        });
    }

    // Month color palette
    const MONTH_COLORS = [
        "#b28cba", "#ef6695", "#bcb6dd", "#20bcb9", "#ed9869", "#ef654a",
        "#55ae88", "#df96a1", "#ffd14e", "#f58b57", "#dabc40", "#4fa9dc"
    ];

    var wholetableheader = "";
    var quaterheaderrow = "";
    var colorIndex = 0;

    wholetableduplicate.forEach(function (period) {
        var bgColor = MONTH_COLORS[colorIndex % MONTH_COLORS.length];
        wholetableheader += `<th colspan="${quternamespan}" style="background-color:${bgColor}; color:white; font-weight:bold;">${period}</th>`;
        colorIndex++;
    });

    colorIndex = 0;
    wholetableduplicate.forEach(function (period) {
        var bgColor = MONTH_COLORS[colorIndex % MONTH_COLORS.length];
        quaterheaderrow += `
            <th style="background-color:${bgColor}; color:white;">Actual</th>
            <th style="background-color:${bgColor}; color:white;">Target</th>
            <th style="background-color:${bgColor}; color:white;">Gap</th>
        `;
        colorIndex++;
    });

    var tableHtml = `
        <table class="table table-sm table-bordered w-100 text-center" id="drilldownTable_${item.id}" style="margin-bottom:0!important;white-space:nowrap;">
            <thead>
                <tr>
                    <th class="scrolldrill" rowspan="2" style="vertical-align:middle;">
                        <i class="fas fa-arrow-up"></i>
                        <i class="fas fa-arrow-down"></i>
                    </th>
                    <th class="scrolldrill1" rowspan="2" style="vertical-align:middle;">Name/Period</th>
                    ${wholetableheader}
                </tr>
                <tr>
                    ${quaterheaderrow || tableheader}
                </tr>
            </thead>
            <tbody>
                ${finalactualrows}
            </tbody>
        </table>
    `;

    $(tableElement).append(tableHtml);

    // Render chart
    if (layoutType === "BubbleChartDD") {
        bubbleRender(item.id, 'load', chartdataloadval, chartaxisfield, millions, percentage, chartdisplayname, colors, currencyval);
    } else if (layoutType === "ColumnChartDD") {
        ecolumnRenderDD(item.id, 'load', chartdataloadval, chartaxisfield, millions, percentage, chartdisplayname, colors, currencyval);
    } else if (layoutType === "LineChartDD") {
        elineRenderDD(item.id, 'load', chartdataloadval, chartaxisfield, millions, percentage, chartdisplayname, colors, currencyval);
    } else if (layoutType === "AreaChartDD") {
        eareaRenderDD(item.id, 'load', chartdataloadval, chartaxisfield, millions, percentage, chartdisplayname, colors, currencyval);
    } else if (layoutType === "MultiAxisDD") {
        emultiaxisRenderDD(item.id, 'load', chartdataloadval, chartaxisfield, millions, percentage, chartdisplayname, colors, currencyval);
    }

    if (finalactualrows.split("</tr>").length - 1 > 6) {
        $("#drilldownTable_" + item.id).paging({ limit: 5 });
    }

    loadedDrillRows[item.id] = prevData;
}

function chartdaterangeupdateTriggerchart(item){
	
	var tableElement	=	$(".chartdrilldownTable_"+item.id);
	$(tableElement).empty();
	var layoutType 	= 	item.chartValue.type;
    var displayname1 = 	(item.chartValue.chartdisplayname != undefined && item.chartValue.chartdisplayname != ""?item.chartValue.chartdisplayname:"--");
    var chartdisplayname	=	(item.chartValue.displayname != undefined && item.chartValue.displayname != ""?item.chartValue.displayname:"");
    var measurement	=	(item.chartValue.measurement != undefined && item.chartValue.measurement != ""?item.chartValue.measurement:"Monthly");
	var chartsettings 	= 	item.chartValue.chartsettings;
	var fieldName 	= 	((item.chartValue.fieldName != undefined && item.chartValue.fieldName != "")?item.chartValue.fieldName:"");
	var datarangechart 	= 	((item.chartValue.datarangechart != undefined && item.chartValue.datarangechart != "")?item.chartValue.datarangechart:$("#datePeriod").val());
	var largechart	=	$(".largechart");
	var chartnamefield	=	"Bubblechart";
	if(layoutType	==	"BubbleChart"){
		chartnamefield	=	"Bubblechart";
		$(largechart).attr("id","Bubblelarge"+item.id);
		$("#Bubblelarge"+item.id).empty();
		$("#"+chartnamefield+item.id).empty();
	}else if(layoutType	==	"ColumnChart"){
		chartnamefield	=	"Columnchart";
		$(largechart).attr("id","Columnlarge"+item.id);
		$("#Columnlarge"+item.id).empty();
		$("#"+chartnamefield+item.id).empty();
	}else if(layoutType	==	"LineChart"){
		chartnamefield	=	"Linechart";
		$(largechart).attr("id","Linelarge"+item.id);
		$("#Linelarge"+item.id).empty();
		$("#"+chartnamefield+item.id).empty();
	}else if(layoutType	==	"AreaChart"){
		chartnamefield	=	"Areachart";
		$(largechart).attr("id","Arealarge"+item.id);
		$("#Arealarge"+item.id).empty();
		$("#"+chartnamefield+item.id).empty();
	}else if(layoutType	==	"PieChart"){
		chartnamefield	=	"Piechart";
		$(largechart).attr("id","Pielarge"+item.id);
		$("#Pielarge"+item.id).empty();
		$("#"+chartnamefield+item.id).empty();
	}else if(layoutType	==	"MultiAxis"){
		chartnamefield	=	"Multiaxis";
		$(largechart).attr("id","Multiaxislarge"+item.id);
		$("#Multiaxislarge"+item.id).empty();
		$("#"+chartnamefield+item.id).empty();
	}else if(layoutType	==	"StackedChart"){
		chartnamefield	=	"Stackedchart";
		$(largechart).attr("id","Stackedlarge"+item.id);
		$("#Stackedlarge"+item.id).empty();
		$("#"+chartnamefield+item.id).empty();
	}else if(layoutType	==	"NegativeColumnChart"){
		chartnamefield	=	"NegativeColumnchart";
		$(largechart).attr("id","NegativeColumnlarge"+item.id);
		$("#NegativeColumnchart"+item.id).empty();
		$("#"+chartnamefield+item.id).empty();
	}
	
	var chartdataloadval = [];
	var checkdecimalornot	=	false;
	var percentage		=	false;
	var millions = false;
	var currencyval = "$";
	var chartaxisfield	=	[];
	var colors =[];
	var body	=	"";
	var tablerow 	= 	"";
	var tableheader = 	"";
	var quternamespan	=	3;
	var removeperiodheader	=	"";
	tableheader	=	'<th data-i18n="Actual">Actual</th><th data-i18n="Target">Target</th><th data-i18n="Gap">Gap</th>';
	
	if(chartsettings !=	undefined && chartsettings !=	'' && chartsettings.length	!=	0){
		var prevformula="";
		var prevData="";
		$.each(chartsettings, function (i, List) {
			var repull=true;
			var displayname 	= 	(List.displayname !=	undefined?List.displayname:"");
			var chartformula 	= 	(List.chartformula !=	undefined?List.chartformula:"");
			var axis 			= 	(List.axis !=	undefined?List.axis:"");
			var yfieldaxis		=	1;
			var zfieldaxis		=	1;
			var fieldName 		= 	(List.fieldtype !=	undefined?List.fieldtype:"");
			if(prevformula === chartformula)
			{
				repull =false;
			
			}else{
				prevData =""
			}
			prevformula=  chartformula;
			var colorcode		=	(List.colorcode	==	"rgb(233, 236, 239)"?"#26a0fc":List.colorcode);
			colors.push(colorcode)

			//var chartsettingsfieldname 	= 	(List.chartsettingsfieldname !=	undefined?List.chartsettingsfieldname:"");
			if(chartformula	!=	"" && chartformula !=	undefined){
			var textObj	=	{"fieldName": fieldName,"formula": chartformula,"period": datarangechart,"type": "freqTable"};
			$(".page-loader-wrapper").css("display","block");
			if(repull)
			{
				$.ajax({
			        url: "/stratroom/formula/kpiList?tableFrequency="+measurement,
			        type: "post",
					async:false,
			        contentType: "application/json",
			        data: JSON.stringify(textObj),
			        success: function (data, status) {
						
			        	$(".page-loader-wrapper").css("display","none");
						prevData=data;
						var fieldvalue	=	1;
						var chartvalue	=	1;

						var chartprogress	=	[];
						var chartdataload 	= 	{};

						$.each(data,function(index,objval){
							var chartdata	=	[];
							var chartcolumndata	=	[];
							if(objval !=	"" && objval !=	undefined && !jQuery.isEmptyObject(objval)){
								fieldName	=	fieldName.toLowerCase();
								$.each(objval,function(periodindex,quarterobj){
									if(periodindex 	!=	"overallGap" && periodindex 	!=	""){
										var actualbody 	=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
										var targetbody 	=	(quarterobj.target !=	undefined?quarterobj.target:"");
										var gapbody 	=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
										var budgetbody 	=	(quarterobj.budget !=	undefined?quarterobj.budget:"");
										var forecastbody 	=	(quarterobj.forecast !=	undefined?quarterobj.forecast:"");
										if(typeof actualbody	===	"number"){
											actualbody	=	actualbody.toString();
										}if(typeof targetbody	===	"number"){
											targetbody	=	targetbody.toString();
										}if(typeof gapbody	===	"number"){
											gapbody	=	gapbody.toString();
										}if(typeof budgetbody	===	"number"){
											budgetbody	=	budgetbody.toString();
										}if(typeof forecastbody	===	"number"){
											forecastbody	=	forecastbody.toString();
										}
										if(quarterobj.currency !=	undefined && quarterobj.currency !=	""){
											currencyval= quarterobj.currency;
										}											
										
										if((actualbody.includes("M") || targetbody.includes("M")) || millions	==	true)
										{
											millions = true;	
										}
										else if ((actualbody.includes("%") || targetbody.includes("%")) || percentage	==	true)
										{
											percentage = true;
										}
										var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
										var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
										var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");												
										if(targetbody !=	""){
											tablerow 	+=	"<tr><td>"+periodindex+"</td>";
											tablerow 	+=	"<td class="+actualcolorhighlight+">"+quarterobj.currency+actualbody+"</td><td class="+targetcolorhighlight+">"+quarterobj.currency+targetbody+"</td><td class="+gapcolorhighlight+">"+quarterobj.currency+gapbody+"</td>";
											tablerow 	+=	"</tr>";
										}
										
										
										
										actualbody		=	convertonumber(actualbody);
										targetbody		=	convertonumber(targetbody);
										gapbody			=	convertonumber(gapbody);
										budgetbody		=	convertonumber(budgetbody);
										forecastbody	=	convertonumber(forecastbody);
										
										if(!isNumeric(actualbody)){
											actualbody=0;
										}
										if(!isNumeric(targetbody)){
											targetbody=0;
										}
										if(!isNumeric(gapbody)){
											gapbody=0;
										}
										if(fieldName	==	"actual"){
											chartvalue	=	actualbody;
										}else if(fieldName	==	"target"){
											chartvalue	=	targetbody;
										}else if(fieldName	==	"gap"){
											chartvalue	=	gapbody;
										}else if(fieldName	==	"budget"){
											chartvalue	=	budgetbody;
										}else if(fieldName	==	"forecast"){
											chartvalue	=	forecastbody;
										}
										if(layoutType	==	"BubbleChart"){
											var numberformat 	=	(typeof actualbody === "number"?convertInttoStringAndStringtoInt(actualbody):actualbody);	
											if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
												percentage			=	true;
											}else if (numberformat.indexOf("%") >= 0) {
												percentage			=	true;
											}else if (numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
											}
											var numberformat 	=	(typeof targetbody === "number"?convertInttoStringAndStringtoInt(targetbody):targetbody);	
											if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
												percentage			=	true;
											}else if (numberformat.indexOf("%") >= 0) {
												percentage			=	true;
											}else if (numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
											}
												
											chartdata.push({"x":periodindex,"y":actualbody,"z":targetbody});
												
										}
										
										if(layoutType	==	"ColumnChart" || layoutType	==	"NegativeColumnChart" || layoutType	==	"LineChart" || layoutType	==	"AreaChart" || layoutType	==	"PieChart" || layoutType	==	"StackedChart" || layoutType	==	"MultiAxis"){
											chartvalue	=	convertonumber(chartvalue);
											var numberformat 	=	(typeof chartvalue === "number"?convertInttoStringAndStringtoInt(chartvalue):chartvalue);	
											if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
												percentage			=	true;
											}else if (numberformat.indexOf("%") >= 0) {
												percentage			=	true;
											}else if (numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
											}
												
											chartcolumndata.push(chartvalue);
												
										}
										
										if(chartaxisfield && !chartaxisfield.includes(periodindex))
										{
											chartaxisfield.push(periodindex);

										}
										

									}
								});
								

								if(layoutType	==	"BubbleChart"){
									chartdataload	=	{"name":displayname,data:chartdata};
								}else if(layoutType	==	"LineChart" || layoutType	== "NegativeColumnChart" || layoutType	==	"AreaChart" || layoutType	==	"PieChart" || layoutType	==	"StackedChart"){
									chartdataload	=	{"name":displayname,data:chartcolumndata};
								}else if(layoutType	==	"MultiAxis"){
									chartdataload	=	{"name":displayname,"type":"column",data:chartcolumndata};
								}else if(layoutType	==	"ColumnChart"){
									chartdataload= {"name":displayname,"type":"column",data:chartcolumndata};
								}
							}
						});
						chartdataloadval.push(chartdataload);

		
					}, error:readErrorMsg
			    });
			}else
			{
				$(".page-loader-wrapper").css("display","none");

						var fieldvalue	=	1;
						var chartvalue	=	1;

						var chartprogress	=	[];
						var chartdataload 	= 	{};

						$.each(prevData,function(index,objval){
							var chartdata	=	[];
							var chartcolumndata	=	[];
							if(objval !=	"" && objval !=	undefined && !jQuery.isEmptyObject(objval)){
								fieldName	=	fieldName.toLowerCase();
								$.each(objval,function(periodindex,quarterobj){
									if(periodindex 	!=	"overallGap" && periodindex 	!=	""){
										var actualbody 	=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
										var targetbody 	=	(quarterobj.target !=	undefined?quarterobj.target:"");
										var gapbody 	=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
										var budgetbody 	=	(quarterobj.budget !=	undefined?quarterobj.budget:"");
										var forecastbody 	=	(quarterobj.forecast !=	undefined?quarterobj.forecast:"");
										if(typeof actualbody	===	"number"){
											actualbody	=	actualbody.toString();
										}if(typeof targetbody	===	"number"){
											targetbody	=	targetbody.toString();
										}if(typeof gapbody	===	"number"){
											gapbody	=	gapbody.toString();
										}if(typeof budgetbody	===	"number"){
											budgetbody	=	budgetbody.toString();
										}if(typeof forecastbody	===	"number"){
											forecastbody	=	forecastbody.toString();
										}
										if(quarterobj.currency !=	undefined && quarterobj.currency !=	""){
											currencyval= quarterobj.currency;
										}											
										
										if((actualbody.includes("M") || targetbody.includes("M")) || millions	==	true)
										{
											millions = true;	
										}
										else if ((actualbody.includes("%") || targetbody.includes("%")) || percentage	==	true)
										{
											percentage = true;
										}
									
										
										
										
										actualbody		=	convertonumber(actualbody);
										targetbody		=	convertonumber(targetbody);
										gapbody			=	convertonumber(gapbody);
										budgetbody		=	convertonumber(budgetbody);
										forecastbody	=	convertonumber(forecastbody);
										
										if(!isNumeric(actualbody)){
											actualbody=0;
										}
										if(!isNumeric(targetbody)){
											targetbody=0;
										}
										if(!isNumeric(gapbody)){
											gapbody=0;
										}
										if(fieldName	==	"actual"){
											chartvalue	=	actualbody;
										}else if(fieldName	==	"target"){
											chartvalue	=	targetbody;
										}else if(fieldName	==	"gap"){
											chartvalue	=	gapbody;
										}else if(fieldName	==	"budget"){
											chartvalue	=	budgetbody;
										}else if(fieldName	==	"forecast"){
											chartvalue	=	forecastbody;
										}
										if(layoutType	==	"BubbleChart"){
											var numberformat 	=	(typeof actualbody === "number"?convertInttoStringAndStringtoInt(actualbody):actualbody);	
											if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
												percentage			=	true;
											}else if (numberformat.indexOf("%") >= 0) {
												percentage			=	true;
											}else if (numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
											}
											var numberformat 	=	(typeof targetbody === "number"?convertInttoStringAndStringtoInt(targetbody):targetbody);	
											if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
												percentage			=	true;
											}else if (numberformat.indexOf("%") >= 0) {
												percentage			=	true;
											}else if (numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
											}
												
											chartdata.push({"x":periodindex,"y":actualbody,"z":targetbody});
												
										}
										
										if(layoutType	==	"ColumnChart" || layoutType	==	"NegativeColumnChart" || layoutType	==	"LineChart" || layoutType	==	"AreaChart" || layoutType	==	"PieChart" || layoutType	==	"StackedChart" || layoutType	==	"MultiAxis"){
											chartvalue	=	convertonumber(chartvalue);
											var numberformat 	=	(typeof chartvalue === "number"?convertInttoStringAndStringtoInt(chartvalue):chartvalue);	
											if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
												percentage			=	true;
											}else if (numberformat.indexOf("%") >= 0) {
												percentage			=	true;
											}else if (numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
											}
												
											chartcolumndata.push(chartvalue);
												
										}
										
										
										if(chartaxisfield && !chartaxisfield.includes(periodindex))
										{
											chartaxisfield.push(periodindex);
									//	console.log(chartaxisfield + " ::: periodindex ::: " + periodindex)

										}
										

									}
								});
								
								if(layoutType	==	"BubbleChart"){
									chartdataload	=	{"name":displayname,data:chartdata};
								}else if(layoutType	==	"LineChart" || layoutType	== "NegativeColumnChart" || layoutType	==	"AreaChart" || layoutType	==	"PieChart" || layoutType	==	"StackedChart"){
									chartdataload	=	{"name":displayname,data:chartcolumndata};
								}else if(layoutType	==	"MultiAxis"){
									chartdataload	=	{"name":displayname,"type":"column",data:chartcolumndata};
								}else if(layoutType	==	"ColumnChart"){
									chartdataload= {"name":displayname,"type":"column",data:chartcolumndata};
								}
							}
						});
						chartdataloadval.push(chartdataload);

				}
			}
		});
			prevformula="";
			   //each end 
	 	}
		
		body	=	`<table class="table table-sm table-bordered w-100 text-center"
    id="chartdrilldownTable_`+item.id+`"
    style="margin-bottom:0px!important; white-space:nowrap;">
                <thead>
                  <tr>
                    <th rowspan="2" style="width: 198px;">
                      Name/Period
                    </th>
                    <th colspan="`+quternamespan+`" `+removeperiodheader+`>
                      `+measurement+`
                    </th>
                  </tr>
                  <tr>
                    `+tableheader+`
                  </tr>
                </thead>
                <tbody>`+tablerow+`
                </tbody></table>`;
              		
		$(tableElement).append(body);
		
		$("#chartdrilldownTable_"+item.id).paging({ limit: 5 });
			 		
	 	if(layoutType	==	"BubbleChart"){
			bubbleRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"ColumnChart"){
			ecolumnRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"LineChart"){
			elineRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"AreaChart"){
			eareaRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"PieChart"){
			epieRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"MultiAxis"){
			emultiaxisRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"StackedChart"){
			estackedRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"NegativeColumnChart"){
			enegativecRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}
}
function chartdaterangeupdateTriggerchartComment(item){
	
	var tableElement	=	$(".chartdrilldownTable_"+item.id);
	$(tableElement).empty();
	var layoutType 	= 	item.chartValue.type;
    var displayname1 = 	(item.chartValue.chartdisplayname != undefined && item.chartValue.chartdisplayname != ""?item.chartValue.chartdisplayname:"--");
    var chartdisplayname	=	(item.chartValue.displayname != undefined && item.chartValue.displayname != ""?item.chartValue.displayname:"");
    var measurement	=	(item.chartValue.measurement != undefined && item.chartValue.measurement != ""?item.chartValue.measurement:"Monthly");
	var chartsettings 	= 	item.chartValue.chartsettings;
	var fieldName 	= 	((item.chartValue.fieldName != undefined && item.chartValue.fieldName != "")?item.chartValue.fieldName:"");
	var datarangechart 	= 	((item.chartValue.datarangechart != undefined && item.chartValue.datarangechart != "")?item.chartValue.datarangechart:$("#datePeriod").val());
	var largechart	=	$(".largechart");
	var chartnamefield	=	"ColumnChartComment";
	console.log(layoutType,"layout")
	if(layoutType	==	"ColumnChartComment"){
			chartnamefield	=	"Columnchart";
		$(largechart).attr("id","Columnlarge"+item.id);
		$("#Columnlarge"+item.id).empty();
		$("#"+chartnamefield+item.id).empty();
	}else if(layoutType	==	"LineChartComment"){
		chartnamefield	=	"Linechart";
		$(largechart).attr("id","Linelarge"+item.id);
		$("#Linelarge"+item.id).empty();
		$("#"+chartnamefield+item.id).empty();
	}else if(layoutType	==	"AreaChartComment"){
		chartnamefield	=	"Areachart";
		$(largechart).attr("id","Arealarge"+item.id);
		$("#Arealarge"+item.id).empty();
		$("#"+chartnamefield+item.id).empty();
	}else if(layoutType	==	"PieChartComment"){
		chartnamefield	=	"Piechart";
		$(largechart).attr("id","Pielarge"+item.id);
		$("#Pielarge"+item.id).empty();
		$("#"+chartnamefield+item.id).empty();
	}else if(layoutType	==	"MultiAxisComment"){
		chartnamefield	=	"Multiaxis";
		$(largechart).attr("id","Multiaxislarge"+item.id);
		$("#Multiaxislarge"+item.id).empty();
		$("#"+chartnamefield+item.id).empty();
	}else if(layoutType	==	"StackedChartComment"){
		chartnamefield	=	"Stackedchart";
		$(largechart).attr("id","Stackedlarge"+item.id);
		$("#Stackedlarge"+item.id).empty();
		$("#"+chartnamefield+item.id).empty();
	}else if(layoutType	==	"NegativeColumnChartComment"){
		chartnamefield	=	"NegativeColumnchart";
		$(largechart).attr("id","NegativeColumnlarge"+item.id);
		$("#NegativeColumnchart"+item.id).empty();
		$("#"+chartnamefield+item.id).empty();
	}
	
	var chartdataloadval = [];
	var checkdecimalornot	=	false;
	var percentage		=	false;
	var millions = false;
	var currencyval = "$";
	var chartaxisfield	=	[];
	var colors =[];
	var body	=	"";
	var tablerow 	= 	"";
	var tableheader = 	"";
	var quternamespan	=	3;
	var removeperiodheader	=	"";
	tableheader	=	'<th data-i18n="Actual">Actual</th><th data-i18n="Target">Target</th><th data-i18n="Gap">Gap</th>';
	
	if(chartsettings !=	undefined && chartsettings !=	'' && chartsettings.length	!=	0){
		var prevformula="";
		var prevData="";
		$.each(chartsettings, function (i, List) {
			var repull=true;
			var displayname 	= 	(List.displayname !=	undefined?List.displayname:"");
			var chartformula 	= 	(List.chartformula !=	undefined?List.chartformula:"");
			var axis 			= 	(List.axis !=	undefined?List.axis:"");
			var yfieldaxis		=	1;
			var zfieldaxis		=	1;
			var fieldName 		= 	(List.fieldtype !=	undefined?List.fieldtype:"");
			if(prevformula === chartformula)
			{
				repull =false;
			
			}else{
				prevData =""
			}
			prevformula=  chartformula;
			var colorcode		=	(List.colorcode	==	"rgb(233, 236, 239)"?"#26a0fc":List.colorcode);
			colors.push(colorcode)

			//var chartsettingsfieldname 	= 	(List.chartsettingsfieldname !=	undefined?List.chartsettingsfieldname:"");
			if(chartformula	!=	"" && chartformula !=	undefined){
			var textObj	=	{"fieldName": fieldName,"formula": chartformula,"period": datarangechart,"type": "freqTable"};
			$(".page-loader-wrapper").css("display","block");
			if(repull)
			{
				$.ajax({
			        url: "/stratroom/formula/kpiList?tableFrequency="+measurement,
			        type: "post",
					async:false,
			        contentType: "application/json",
			        data: JSON.stringify(textObj),
			        success: function (data, status) {
						
			        	$(".page-loader-wrapper").css("display","none");
						prevData=data;
						var fieldvalue	=	1;
						var chartvalue	=	1;

						var chartprogress	=	[];
						var chartdataload 	= 	{};

						$.each(data,function(index,objval){
							var chartdata	=	[];
							var chartcolumndata	=	[];
							if(objval !=	"" && objval !=	undefined && !jQuery.isEmptyObject(objval)){
								fieldName	=	fieldName.toLowerCase();
								$.each(objval,function(periodindex,quarterobj){
									if(periodindex 	!=	"overallGap" && periodindex 	!=	""){
										var actualbody 	=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
										var targetbody 	=	(quarterobj.target !=	undefined?quarterobj.target:"");
										var gapbody 	=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
										var budgetbody 	=	(quarterobj.budget !=	undefined?quarterobj.budget:"");
										var forecastbody 	=	(quarterobj.forecast !=	undefined?quarterobj.forecast:"");
										if(typeof actualbody	===	"number"){
											actualbody	=	actualbody.toString();
										}if(typeof targetbody	===	"number"){
											targetbody	=	targetbody.toString();
										}if(typeof gapbody	===	"number"){
											gapbody	=	gapbody.toString();
										}if(typeof budgetbody	===	"number"){
											budgetbody	=	budgetbody.toString();
										}if(typeof forecastbody	===	"number"){
											forecastbody	=	forecastbody.toString();
										}
										if(quarterobj.currency !=	undefined && quarterobj.currency !=	""){
											currencyval= quarterobj.currency;
										}											
										
										if((actualbody.includes("M") || targetbody.includes("M")) || millions	==	true)
										{
											millions = true;	
										}
										else if ((actualbody.includes("%") || targetbody.includes("%")) || percentage	==	true)
										{
											percentage = true;
										}
										var actualcolorhighlight	=	(checkPositiveorNegative(actualbody)	==	1?"negativeHighlight":"");
										var targetcolorhighlight	=	(checkPositiveorNegative(targetbody)	==	1?"negativeHighlight":"");
										var gapcolorhighlight		=	(checkPositiveorNegative(gapbody)	==	1?"negativeHighlight":"");												
										if(targetbody !=	""){
											tablerow 	+=	"<tr><td>"+periodindex+"</td>";
											tablerow 	+=	"<td class="+actualcolorhighlight+">"+quarterobj.currency+actualbody+"</td><td class="+targetcolorhighlight+">"+quarterobj.currency+targetbody+"</td><td class="+gapcolorhighlight+">"+quarterobj.currency+gapbody+"</td>";
											tablerow 	+=	"</tr>";
										}
										
										
										
										actualbody		=	convertonumber(actualbody);
										targetbody		=	convertonumber(targetbody);
										gapbody			=	convertonumber(gapbody);
										budgetbody		=	convertonumber(budgetbody);
										forecastbody	=	convertonumber(forecastbody);
										
										if(!isNumeric(actualbody)){
											actualbody=0;
										}
										if(!isNumeric(targetbody)){
											targetbody=0;
										}
										if(!isNumeric(gapbody)){
											gapbody=0;
										}
										if(fieldName	==	"actual"){
											chartvalue	=	actualbody;
										}else if(fieldName	==	"target"){
											chartvalue	=	targetbody;
										}else if(fieldName	==	"gap"){
											chartvalue	=	gapbody;
										}else if(fieldName	==	"budget"){
											chartvalue	=	budgetbody;
										}else if(fieldName	==	"forecast"){
											chartvalue	=	forecastbody;
										}
										if(layoutType	==	"BubbleChart"){
											var numberformat 	=	(typeof actualbody === "number"?convertInttoStringAndStringtoInt(actualbody):actualbody);	
											if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
												percentage			=	true;
											}else if (numberformat.indexOf("%") >= 0) {
												percentage			=	true;
											}else if (numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
											}
											var numberformat 	=	(typeof targetbody === "number"?convertInttoStringAndStringtoInt(targetbody):targetbody);	
											if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
												percentage			=	true;
											}else if (numberformat.indexOf("%") >= 0) {
												percentage			=	true;
											}else if (numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
											}
												
											chartdata.push({"x":periodindex,"y":actualbody,"z":targetbody});
												
										}
										
										if(layoutType	==	"ColumnChartComment" || layoutType	==	"NegativeColumnChartComment" || layoutType	==	"LineChartComment" || layoutType	==	"AreaChartComment" || layoutType	==	"PieChartComment" || layoutType	==	"StackedChartComment" || layoutType	==	"MultiAxisComment" ){
											chartvalue	=	convertonumber(chartvalue);
											var numberformat 	=	(typeof chartvalue === "number"?convertInttoStringAndStringtoInt(chartvalue):chartvalue);	
											if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
												percentage			=	true;
											}else if (numberformat.indexOf("%") >= 0) {
												percentage			=	true;
											}else if (numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
											}
												
											chartcolumndata.push(chartvalue);
												
										}
										
										if(chartaxisfield && !chartaxisfield.includes(periodindex))
										{
											chartaxisfield.push(periodindex);

										}
										

									}
								});
								

									if(layoutType	==	"BubbleChartComment"){
									chartdataload	=	{"name":displayname,data:chartdata};
								}else if(layoutType	==	"LineChartComment" || layoutType	== "NegativeColumnChartComment" || layoutType	==	"AreaChartComment" || layoutType	==	"PieChartComment" || layoutType	==	"StackedChartComment"){
									chartdataload	=	{"name":displayname,data:chartcolumndata};
								}else if(layoutType	==	"MultiAxisComment"){
									chartdataload	=	{"name":displayname,"type":"column",data:chartcolumndata};
								}else if(layoutType	==	"ColumnChartComment"){
									chartdataload= {"name":displayname,"type":"column",data:chartcolumndata};
								}
							}
						});
						chartdataloadval.push(chartdataload);

		
					}, error:readErrorMsg
			    });
			}else
			{
				$(".page-loader-wrapper").css("display","none");

						var fieldvalue	=	1;
						var chartvalue	=	1;

						var chartprogress	=	[];
						var chartdataload 	= 	{};

						$.each(prevData,function(index,objval){
							var chartdata	=	[];
							var chartcolumndata	=	[];
							if(objval !=	"" && objval !=	undefined && !jQuery.isEmptyObject(objval)){
								fieldName	=	fieldName.toLowerCase();
								$.each(objval,function(periodindex,quarterobj){
									if(periodindex 	!=	"overallGap" && periodindex 	!=	""){
										var actualbody 	=	(quarterobj.actual !=	undefined?quarterobj.actual:"");
										var targetbody 	=	(quarterobj.target !=	undefined?quarterobj.target:"");
										var gapbody 	=	(quarterobj.gap !=	undefined?quarterobj.gap:"");
										var budgetbody 	=	(quarterobj.budget !=	undefined?quarterobj.budget:"");
										var forecastbody 	=	(quarterobj.forecast !=	undefined?quarterobj.forecast:"");
										if(typeof actualbody	===	"number"){
											actualbody	=	actualbody.toString();
										}if(typeof targetbody	===	"number"){
											targetbody	=	targetbody.toString();
										}if(typeof gapbody	===	"number"){
											gapbody	=	gapbody.toString();
										}if(typeof budgetbody	===	"number"){
											budgetbody	=	budgetbody.toString();
										}if(typeof forecastbody	===	"number"){
											forecastbody	=	forecastbody.toString();
										}
										if(quarterobj.currency !=	undefined && quarterobj.currency !=	""){
											currencyval= quarterobj.currency;
										}											
										
										if((actualbody.includes("M") || targetbody.includes("M")) || millions	==	true)
										{
											millions = true;	
										}
										else if ((actualbody.includes("%") || targetbody.includes("%")) || percentage	==	true)
										{
											percentage = true;
										}
									
										
										
										
										actualbody		=	convertonumber(actualbody);
										targetbody		=	convertonumber(targetbody);
										gapbody			=	convertonumber(gapbody);
										budgetbody		=	convertonumber(budgetbody);
										forecastbody	=	convertonumber(forecastbody);
										
										if(!isNumeric(actualbody)){
											actualbody=0;
										}
										if(!isNumeric(targetbody)){
											targetbody=0;
										}
										if(!isNumeric(gapbody)){
											gapbody=0;
										}
										if(fieldName	==	"actual"){
											chartvalue	=	actualbody;
										}else if(fieldName	==	"target"){
											chartvalue	=	targetbody;
										}else if(fieldName	==	"gap"){
											chartvalue	=	gapbody;
										}else if(fieldName	==	"budget"){
											chartvalue	=	budgetbody;
										}else if(fieldName	==	"forecast"){
											chartvalue	=	forecastbody;
										}
										
										if(layoutType	==	"ColumnChartComment" || layoutType	==	"NegativeColumnChartComment" || layoutType	==	"LineChartComment" || layoutType	==	"AreaChartComment" || layoutType	==	"PieChartComment" || layoutType	==	"StackedChartComment" || layoutType	==	"MultiAxisComment"){
											chartvalue	=	convertonumber(chartvalue);
											var numberformat 	=	(typeof chartvalue === "number"?convertInttoStringAndStringtoInt(chartvalue):chartvalue);	
											if (numberformat.indexOf("%") >= 0 && numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
												percentage			=	true;
											}else if (numberformat.indexOf("%") >= 0) {
												percentage			=	true;
											}else if (numberformat.indexOf(".") >= 0) {
												checkdecimalornot	=	true;
											}
												
											chartcolumndata.push(chartvalue);
												
										}
										
										
										if(chartaxisfield && !chartaxisfield.includes(periodindex))
										{
											chartaxisfield.push(periodindex);
									//	console.log(chartaxisfield + " ::: periodindex ::: " + periodindex)

										}
										

									}
								});
								
							if(layoutType	==	"BubbleChartComment"){
									chartdataload	=	{"name":displayname,data:chartdata};
								}else if(layoutType	==	"LineChartComment" || layoutType	== "NegativeColumnChartComment" || layoutType	==	"AreaChartComment" || layoutType	==	"PieChartComment" || layoutType	==	"StackedChartComment"){
									chartdataload	=	{"name":displayname,data:chartcolumndata};
								}else if(layoutType	==	"MultiAxis"){
									chartdataload	=	{"name":displayname,"type":"column",data:chartcolumndata};
								}else if(layoutType	==	"ColumnChartComment"){
									chartdataload= {"name":displayname,"type":"column",data:chartcolumndata};
								}
							}
						});
						chartdataloadval.push(chartdataload);

				}
			}
		});
			prevformula="";
			   //each end 
	 	}
		
		body	=	`<table class="table table-sm table-bordered w-100 text-center"
    id="chartdrilldownTable_`+item.id+`"
    style="margin-bottom:0px!important; white-space:nowrap;">
                <thead>
                  <tr>
                    <th rowspan="2" style="width: 198px;">
                      Name/Period
                    </th>
                    <th colspan="`+quternamespan+`" `+removeperiodheader+`>
                      `+measurement+`
                    </th>
                  </tr>
                  <tr>
                    `+tableheader+`
                  </tr>
                </thead>
                <tbody>`+tablerow+`
                </tbody></table>`;
              		
		$(tableElement).append(body);
		
		$("#chartdrilldownTable_"+item.id).paging({ limit: 5 });
			 		
	 if(layoutType	==	"BubbleChartComment"){
			bubbleRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"ColumnChartComment"){
			ecolumnRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"LineChartComment"){
			elineRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"AreaChartComment"){
			eareaRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"PieChartComment"){
			epieRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"MultiAxisComment"){
			emultiaxisRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"StackedChartComment"){
			estackedRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}else if(layoutType	==	"NegativeColumnChartComment"){
			enegativecRender(item.id,'load',chartdataloadval,chartaxisfield,millions,percentage,chartdisplayname,colors,currencyval);
		}
}
function populateDeptReporteeList() {
	const elements = [
		'.chartDept'
	];

	// Clear existing options for all elements
	elements.forEach(elementId => {
		$(elementId).empty();
	});

	// Perform a single AJAX request to get the department reportees
	$.ajax({
		url: "/stratroom/departmentReportees",
		async: true,
		success: function (deptList) {
			console.log(deptList);
			// Add options to each element
			elements.forEach(elementId => {
				deptList.forEach(dept => {
					addOption(elementId, dept.name, dept.id);
				});
			});

		}
	});
}

// Populate all department reportee lists
populateDeptReporteeList();

$(document).on("focusout","#chartsettingformula",function(){
    $(this).css("border","1px solid black");
});

$("#chart-setting-div").on("click", ".remove-btn", function (e) {
	$(this).parents(".chart-setting-clone").remove();
});

$("#chart-setting").click(function(){
		var methodtype	=	$(".addchartsettings").attr("data-typeoftable");
		var i	=	parseInt(parseInt($(".chartsettingsappend").length)-1);
		++i;
		var removebtnEnable	=	'';
		if(deletepermission	==	true){
			removebtnEnable	=	`<div class="form-group col-md-12">
              <button class="remove-btn" type="button">
                <i class="fas fa-trash border-box"></i>
              </button>
            </div>`;
		}
		var tablebody	=	"";
		
		
		tablebody	+=	`<div class="row chart-setting-clone">
				`+removebtnEnable+`
				<div class="form-group col-md-10 chartsettingsappend">
                <label for="" data-i18n="Display Name">Display Name</label>
                <input type="text" class="form-control browser-default multidisplayname"/>
              </div>
              <div class="form-group col-md-2 color_picks_1">
                <label for="sub_initative_progress" style="text-align: left;">Color</label>
                <div class="input-group" style="margin-bottom: 0;">
                  <div class="input-group-append">`;
		if(methodtype	==	"BubbleChartDD" || methodtype	==	"ColumnChartDD" || methodtype	==	"LineChartDD" || 
				methodtype	==	"AreaChartDD" || methodtype	==	"MultiAxisDD"){
			tablebody	+=	`<span  class="input-group-text pickr setpickr_`+i+`" data-toggle="modal"
            data-target="#color_palette_popup" onclick="handleGetChartColor(`+i+`)" style="width: 90px;border-radius: 0px;height: 30px;"></span>`;
		}else{
			tablebody	+=	`<span class="input-group-text pickr setpickr_`+i+`" style="width: 90px;border-radius: 0px;height: 30px;"></span>`;
		}
		
		tablebody	+=	`<input type="hidden" class="colorboxdivelement_`+i+` colorboxelem">
                  </div>
                </div>
              </div>

              <div class="form-group col-md-12">
                <label for="" data-i18n="Data Field">Data Field</label>
                <input type="text" class="form-control browser-default chart_formula chartsettingformula_`+i+`" id="chart_kpi_formula" readonly data-toggle="modal"
                  data-target="#chart_formula_popup" onclick="handleChartFormulaEvent(this)"
                  role="button"
                />
                <a href="#" id="kpi_trigger1" data-toggle="modal" data-target=".chart_formula_popup"></a>
              </div>

              <div class="form-group col-md-6">
                <label for="" data-i18n="Axis">Axis</label>
                <select class="form-control browser-default multiaxis">
                  <option value="Y-axis">Y-axis</option>
                  <option value="Z-axis">Z-axis</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="" data-i18n="Type">Type</label>
                <select class="form-control browser-default multitypefield">
                  <option value="Actual" data-i18n="Actual">Actual</option>
                  <option value="Target" data-i18n="Target">Target</option>
                  <option value="Budget" data-i18n="Budget">Budget</option>
                  <option value="Forecast" data-i18n="Forecast">Forecast</option>
                  <option value="Gap" data-i18n='Gap'>Gap</option>
                </select>
              </div>
              <div>
              <input type="hidden" class="chartsettingsfieldname" id="chartsettingsfieldname_`+i+`">
              </div>
              <div class="col-12">
                <hr style="border: 1px solid #505050;" />
              </div>
           </div>   
`;
$("#chart-setting-div").append(tablebody);
var colorchangeElement = document.querySelectorAll('.pickr');
        colorchangeElement.forEach((inputElement) => {
            const pickr = new Pickr({
                el: inputElement,
                useAsButton: true,
                theme: 'classic',

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
                inputElement.style.background = color.toRGBA().toString(0);
        		pickr.hide();
                var colorcode	=	$(inputElement).attr("id");
                if(colorcode !=	"" && colorcode !=	undefined){
                	var result =	colorcodesave(colorcode);
                	if(typeof result === 'object' && result.status	==	false){
                		$.notify(result.msg,{
					  style: 'error',
					  className: 'graynotify'
					});
                		return false;
                	}
                }
            })
        });
});	

$(".colors-container>div").click(function(event) {
    $(".color-box>i").hide();
    $(".colors-container>div ").css("border", "none");
	var targetclass =    $(event.target).attr("class");
	var targetcolor =    $(event.target).css("background-color");
	if(targetclass	==	"" || targetclass	==	undefined){
		return false;
	}
	var dynamiccolorset	=	$("#colorplatElement").val();
	if(dynamiccolorset	==	""){
		return false;
	}
	var colortick	=	targetclass.split(' ');
	$("."+colortick[1]).children('i').attr("style","display:inline");
	$(".colorboxdivelement_"+dynamiccolorset).val(colortick[1]);
    var colorID = this.id;
    $(".setpickr_"+dynamiccolorset).css('background-color', targetcolor);
    if (colorID == "color1") {
        $("#color1").css("border", "2px solid #000");
    }

    if (colorID == "color2") {
        $("#color2").css("border", "2px solid #000");
    }

    if (colorID == "color3") {
        $("#color3").css("border", "2px solid #000");
    }

    if (colorID == "color4") {
        $("#color4").css("border", "2px solid #000");
    }

    if (colorID == "color5") {
        $("#color5").css("border", "2px solid #000");
    }

    if (colorID == "color6") {
        $("#color6").css("border", "2px solid #000");
    }

    if (colorID == "color7") {
        $("#color7").css("border", "2px solid #000");
    }

    if (colorID == "color8") {
        $("#color8").css("border", "2px solid #000");
    }

    if (colorID == "color9") {
        $("#color9").css("border", "2px solid #000");
    }

    if (colorID == "color10") {
        $("#color10").css("border", "2px solid #000");
    }

    if (colorID == "color11") {
        $("#color11").css("border", "2px solid #000");
    }

    if (colorID == "color12") {
        $("#color12").css("border", "2px solid #000");
    }

    if (colorID == "color13") {
        $("#color13").css("border", "2px solid #000");
    }

    if (colorID == "color14") {
        $("#color14").css("border", "2px solid #000");
    }

    if (colorID == "color18") {
        $("#color18").css("border", "2px solid #000");
    }
 });

function handleGetChartColor(id,colordiv){
	$(".color-box>i").hide();
    $(".colors-container>div ").css("border", "none");
	$("#colorplatElement").val(id);
	
	var colorelem	=	$(".colorboxdivelement_"+id).val();
	if(colorelem	!=	"" && colorelem !=	null){
		$("#colorplatDiv").val(colorelem);
		$("."+colorelem).parent('div').attr("style","border:2px solid #000")
		$("."+colorelem).children('i').attr("style","display:inline");
	}else{
		if(colordiv !=	""){
			$("#colorplatDiv").val(colordiv);
			$("."+colordiv).parent('div').attr("style","border:2px solid #000")
			$("."+colordiv).children('i').attr("style","display:inline");
		}
	}	
}

$(".colorsavechanges").click(function(){
	checkmodalisclosedornot();
});

function checkmodalisclosedornot(){
	
	if($('#chart_setting').is(':visible')	==	true){
		$(document.body).addClass('modal-open');				
	}
	
	setTimeout(function(){  $(document.body).addClass('modal-open');
	}, 1000);
	
}

$("#kpi_formula_popup #formula").on('keypress',function(e){
	var elemvalue	=	$(this).val();
	$("#kpi_formula_popup #measureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
		$("#kpi_formula_popup #measureNames li").removeClass("kpiformuladescHighlight");
	}
}).on('keyup',function(e){
	var elemvalue	=	$(this).val();
	$("#kpi_formula_popup #measureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
		$("#kpi_formula_popup #measureNames li").removeClass("kpiformuladescHighlight");
	}
});

$("#chart_formula_popup #chartsettingformula").on('keypress',function(e){
	var elemvalue	=	$(this).val();
	$("#chart_formula_popup #chartmeasureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
		$("#chart_formula_popup #chartmeasureNames li").removeClass("kpiformuladescHighlight");
	}
}).on('keyup',function(e){
	var elemvalue	=	$(this).val();
	$("#chart_formula_popup #chartmeasureNames li").each(function(i){
		var value	=	$(this).text();
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) ==	-1){
			$(this).removeClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue.indexOf(value) !=	-1){
			$(this).addClass("kpiformuladescHighlight");
		}
		if((value !=	"" && elemvalue !=	"") &&  elemvalue == value){
			$(this).addClass("kpiformuladescHighlight");
		}
	});
	if(elemvalue	==	""){
		$("#chart_formula_popup #chartmeasureNames li").removeClass("kpiformuladescHighlight");
	}
});


  function getPageList(){
    	var empId = $("#userPrincipal").val();
					$.ajax({
						url: "/stratroom/pageList/" + empId + "?language=" + "en",
						async: false,
						success: function (pagelist, status) {
							const pagelistttt = [
    {
        "id": 2409,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-06-27T08:06:05",
        "updatedTime": null,
        "pageName": "charts",
        "pageType": "Charts",
        "homePgFlag": null,
        "groupType": null,
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2410,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-06-27T08:07:49",
        "updatedTime": null,
        "pageName": "cockpit",
        "pageType": "Cockpit",
        "homePgFlag": null,
        "groupType": null,
        "pinned": null,
        "columnType": "TWO",
        "deptId": 1016
    },
    {
        "id": 2411,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 2108,
        "createdTime": "2025-06-27T08:08:41",
        "updatedTime": "2025-12-15T04:10:27",
        "pageName": "Risk",
        "pageType": "Risk",
        "homePgFlag": null,
        "groupType": "Govern",
        "pinned": "true",
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2418,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 2108,
        "createdTime": "2025-06-27T09:09:21",
        "updatedTime": "2025-12-15T04:11:09",
        "pageName": "CEOO Scorecard",
        "pageType": "Standard_View",
        "homePgFlag": null,
        "groupType": "Measure",
        "pinned": "true",
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2419,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-06-27T09:59:35",
        "updatedTime": null,
        "pageName": "my space",
        "pageType": "My Space",
        "homePgFlag": null,
        "groupType": null,
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2518,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-08-02T12:36:48",
        "updatedTime": null,
        "pageName": "SWOT",
        "pageType": "SWOT",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2519,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-08-02T12:52:51",
        "updatedTime": null,
        "pageName": "PESTLE ",
        "pageType": "PESTEL",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2520,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 2108,
        "createdTime": "2025-08-03T03:02:35",
        "updatedTime": "2025-12-22T09:12:32",
        "pageName": "Meeting",
        "pageType": "Meetings",
        "homePgFlag": null,
        "groupType": "Meet",
        "pinned": "true",
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2521,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 2108,
        "createdTime": "2025-08-04T04:29:06",
        "updatedTime": "2025-09-16T14:24:52",
        "pageName": "Strategy Planner",
        "pageType": "Strategy Formulation",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2533,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 2108,
        "createdTime": "2025-08-23T01:06:59",
        "updatedTime": "2025-12-15T04:10:43",
        "pageName": "Strategic Initiatives",
        "pageType": "Initiatives & Projects",
        "homePgFlag": null,
        "groupType": "Execute",
        "pinned": "true",
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2697,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-09-29T08:44:39",
        "updatedTime": null,
        "pageName": "Project Paln",
        "pageType": "Project Formulation",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2702,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-10-03T05:46:11",
        "updatedTime": null,
        "pageName": "",
        "pageType": "Strategy Formulation",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2704,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-10-04T04:04:09",
        "updatedTime": null,
        "pageName": "initiativies",
        "pageType": "Initiatives & Projects",
        "homePgFlag": null,
        "groupType": "Execute",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2769,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-10-16T07:33:49",
        "updatedTime": null,
        "pageName": "Strategic Initiative",
        "pageType": "Initiatives & Projects",
        "homePgFlag": null,
        "groupType": "Execute",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2775,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-10-22T11:51:15",
        "updatedTime": null,
        "pageName": "G FULL STRATEGIC INITIATIVE",
        "pageType": "Initiatives & Projects",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2788,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-10-28T04:53:39",
        "updatedTime": null,
        "pageName": "Grace Initiatives",
        "pageType": "Initiatives & Projects",
        "homePgFlag": null,
        "groupType": "Execute",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2798,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-11-04T09:36:18",
        "updatedTime": null,
        "pageName": "New initiative Project",
        "pageType": "Initiatives & Projects",
        "homePgFlag": null,
        "groupType": "Execute",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2807,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-11-07T13:38:21",
        "updatedTime": null,
        "pageName": "Cockpit New",
        "pageType": "Cockpit",
        "homePgFlag": null,
        "groupType": "Report",
        "pinned": null,
        "columnType": "TWO",
        "deptId": 1016
    },
    {
        "id": 2808,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-11-07T13:42:16",
        "updatedTime": null,
        "pageName": "Cockpit Reports New",
        "pageType": "Cockpit",
        "homePgFlag": null,
        "groupType": "Report",
        "pinned": null,
        "columnType": "TWO",
        "deptId": 1016
    },
    {
        "id": 2873,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-11-21T08:27:46",
        "updatedTime": null,
        "pageName": "Risk Test01",
        "pageType": "Risk Formulation",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2875,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-11-21T08:30:58",
        "updatedTime": null,
        "pageName": "Project Plan",
        "pageType": "Project Formulation",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
    {
        "id": 2913,
        "active": 0,
        "createdBy": 2108,
        "updatedBy": 0,
        "createdTime": "2025-12-31T10:53:30",
        "updatedTime": null,
        "pageName": "riskplantest",
        "pageType": "Risk Formulation",
        "homePgFlag": null,
        "groupType": "Plan",
        "pinned": null,
        "columnType": null,
        "deptId": 1016
    },
 
    
]
    console.log(pagelist, "pageListData");

    $.each(pagelist, function (index, page) {
        console.log(page, "pageData");

        // -----------------------
        // Add PIN ICON if pinned
        // -----------------------
        const pinIcon = page.pinned == "true" 
            ? '<img src="/stratroom/images/checkbox-303113_1280.png" style="width:12px;height:12px;margin-left:6px;" />'
            : '';

        // -----------------------
        // Create Page URL
        // -----------------------
        const pageUrl = "/stratroom/dashboard/" + page.createdBy + "?pageId=" + page.id;

        // -----------------------
        // MEASURE GROUP
        // -----------------------
        if (page.groupType == "Measure" || page.pageType == "Standard_View") {
            $('#measure').append(
                '<li><a class="dropdown-item" href="' + pageUrl + '" ' +
                'data-pageType="' + page.pageType + '" ' +
                'data-groupType="Measure" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );

        // -----------------------
        // PLAN GROUP
        // -----------------------
        } else if (
            page.groupType == "Plan" || page.pageType == "SWOT" || page.pageType == "PESTEL" ||
            page.pageType == "Strategy Map" || page.pageType == "Strategy Formulation" ||
            page.pageType == "Project Formulation" || page.pageType == "Risk Formulation" ||
            page.pageType == "Audit Management" || page.pageType == "AuditManagement"
        ) {
            $('#planningDropdown').append(
                '<li><a class="dropdown-item" href="' + pageUrl + '" ' +
                'data-pageType="' + page.pageType + '" data-groupType="Plan" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );

        // -----------------------
        // EXECUTE GROUP
        // -----------------------
        } else if (
            page.groupType == "Execute" || page.pageType == "Initiatives & Projects" ||
            page.pageType == "Task" || page.pageType == "Budget" || page.pageType == "Approval Page"
        ) {
            $('#executeDropdown').append(
                '<li><a class="dropdown-item" href="' + pageUrl + '" ' +
                'data-pageType="' + page.pageType + '" data-groupType="Execute" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );

        // -----------------------
        // GOVERN GROUP
        // -----------------------
        } else if (
            page.groupType == "Govern" || page.pageType == "Risk" || page.pageType == "Risk Formulation" ||
            page.pageType == "Risk View" || page.pageType == "RiskEvent" || page.pageType == "Risk Radar" || page.pageType == "Impact Assesment" || page.pageType == "Process Enabaler" || page.pageType == "Rpo" || page.pageType == "Compliance" || page.pageType == "Audit Management" 
        ) {
            $('#governDropdown').append(
                '<li><a class="dropdown-item" href="' + pageUrl + '" ' +
                'data-pageType="' + page.pageType + '" data-groupType="Govern" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );

        // -----------------------
        // MEET GROUP
        // -----------------------
        } else if (page.groupType == "Meet" || page.pageType == "Meetings") {
            $('#meetDropdown').append(
                '<li><a class="dropdown-item" href="' + pageUrl + '" ' +
                'data-pageType="' + page.pageType + '" data-groupType="Meet" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );

        // -----------------------
        // REPORT GROUP
        // -----------------------
        } else if (
            page.groupType == "Report" || page.pageType == "Cockpit" || page.pageType == "Charts" ||
            page.pageType == "My Performance" || page.pageType == "My Space"
        ) {

            var reportPageUrl;
            if (page.pageType == "My Performance" || page.pageType == "My Space") {
                reportPageUrl = pageUrl;
            } else {
                reportPageUrl = "/stratroom/whiteboard/" + empId + "?pageId=" + page.id;
            }

            $('#reportDropdown').append(
                '<li><a class="dropdown-item" href="' + reportPageUrl + '" ' +
                'data-pageType="' + page.pageType + '" data-groupType="Report" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );
        }
    });
}

					})
  }

getPageList();