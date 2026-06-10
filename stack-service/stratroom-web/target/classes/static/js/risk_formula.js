var currentEmp		=	$("#userPrincipal").val();
var nodeKeyMap = new Object();
var formulationupdateDescription	=	[];
var subinitiativeupdateDescription	=	[];
var formulationstrageylist	=	[];
var riskformodPermission	=	[];
var createpermission	=	false;
var editpermission		=	false;
var deletepermission	=	false;
var viewpermission		=	false;
var reporteelist = [];
var completereporteeList	=	{};
var topparentswotDetails	=	{};
var deptlist	=	{};
let urlparams = (new URL(document.location)).searchParams;
let pageNo 		= 	urlparams.get("pageId");
var formulationStatusflag	=	false;
var approvedformulationdate	=	new Date();
var departmentlist	=	[];
var causelistoptions	=	{}
var employeeselectedItems	=	{};

var causecreatepermission	=	false;
var causeviewpermission	=	false;
var causeeditpermission	=	false;
var causedeletepermission	=	false;

var plancreatepermission	=	false;
var planviewpermission	=	false;
var plandeletepermission	=	false;
var planeditpermission	=	false;

var consequencecreatepermission	=	false;
var consequenceeditpermission	=	false;
var consequencedeletepermission	=	false;
var consequenceviewpermission	=	false;

var actioncreatepermission	=	false;
var actioneditpermission	=	false;
var actiondeletepermission	=	false;
var actionviewpermission	=	false;

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

function getriskpermission(){
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName=Risk Formulation",
		async:false,
		success : function(data) {
			$.each(data,function(forindex,fordata){
				if(forindex	==	"Risk Formulation"){
					riskformodPermission	=	fordata.Formulation;
					if(fordata.Cause.privilegeCreate !=	undefined && fordata.Cause.privilegeCreate == "TRUE"){	
						causecreatepermission	=	true;
					}
					if(fordata.Cause.privilegeUpdate !=	undefined && fordata.Cause.privilegeUpdate == "TRUE"){
						causeeditpermission	=	true;
					}
					if(fordata.Cause.privilegeDelete !=	undefined && fordata.Cause.privilegeDelete == "TRUE"){
						causedeletepermission	=	true;
					}
					if(fordata.Cause.privilegeView !=	undefined && fordata.Cause.privilegeView == "TRUE"){
						causeviewpermission	=	true;
					}
					//plan
					if(fordata.Plan.privilegeCreate !=	undefined && fordata.Plan.privilegeCreate == "TRUE"){	
						plancreatepermission	=	true;
					}
					if(fordata.Plan.privilegeUpdate !=	undefined && fordata.Plan.privilegeUpdate == "TRUE"){
						planeditpermission	=	true;
					}
					if(fordata.Plan.privilegeDelete !=	undefined && fordata.Plan.privilegeDelete == "TRUE"){
						plandeletepermission	=	true;
					}
					if(fordata.Plan.privilegeView !=	undefined && fordata.Plan.privilegeView == "TRUE"){
						planviewpermission	=	true;
					}
					//action
					if(fordata.Action.privilegeCreate !=	undefined && fordata.Action.privilegeCreate == "TRUE"){	
						actioncreatepermission	=	true;
					}
					if(fordata.Action.privilegeUpdate !=	undefined && fordata.Action.privilegeUpdate == "TRUE"){
						actioneditpermission	=	true;
					}
					if(fordata.Action.privilegeDelete !=	undefined && fordata.Action.privilegeDelete == "TRUE"){
						actiondeletepermission	=	true;
					}
					if(fordata.Action.privilegeView !=	undefined && fordata.Action.privilegeView == "TRUE"){
						actionviewpermission	=	true;
					}
					//Consequence
					if(fordata.Consequence.privilegeCreate !=	undefined && fordata.Consequence.privilegeCreate == "TRUE"){	
						consequencecreatepermission	=	true;
					}
					if(fordata.Consequence.privilegeUpdate !=	undefined && fordata.Consequence.privilegeUpdate == "TRUE"){
						consequenceeditpermission	=	true;
					}
					if(fordata.Consequence.privilegeDelete !=	undefined && fordata.Consequence.privilegeDelete == "TRUE"){
						consequencedeletepermission	=	true;
					}
					if(fordata.Consequence.privilegeView !=	undefined && fordata.Consequence.privilegeView == "TRUE"){
						consequenceviewpermission	=	true;
					}
				}
			});
		}
	});
}

$(function () {
	getpageName();
	getriskpermission();
	getreportee();
	getcompletereporteeList();
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
	
	if(riskformodPermission.privilegeCreate !=	undefined && riskformodPermission.privilegeCreate == "TRUE"){	
		createpermission	=	true;
	}
	
	if(riskformodPermission.privilegeUpdate !=	undefined && riskformodPermission.privilegeUpdate == "TRUE"){
		editpermission	=	true;
	}
	
	if(riskformodPermission.privilegeDelete !=	undefined && riskformodPermission.privilegeDelete == "TRUE"){
		deletepermission	=	true;
	}
	
	if(riskformodPermission.privilegeView !=	undefined && riskformodPermission.privilegeView == "TRUE"){
		viewpermission	=	true;
	}
	
	if(enableaccesscontrolMenu	==	true){
		//createpermission	=	true;
		//editpermission		=	true;
	//	deletepermission	=	true;
//		viewpermission		=	true;
	}
	
	if(createpermission	==	false && enableaccesscontrolMenu	==	false){
		$(".addriskformulation").remove();
		$(".uploadbtn").remove();
		$(".approvedmaintain").hide()
	}
	if(deletepermission	==	false && enableaccesscontrolMenu	==	false){
		$(".deleteformulation").remove();
	}
	
	if(createpermission	==	false && editpermission	==	false && viewpermission	==	false && deletepermission	==	false){
		$(".exportprojectformulation").remove();
	}
	
	if(pageNo	!=	""){
		$(".exceldownloadlink").attr("href","download/riskFormulationDetails?formulationId="+pageNo);
	}else{
		$(".exceldownloadlink").attr("href","#");
		$(".exceldownloadlink").removeAttr("target");
	}
	
	if(plancreatepermission	==	false){
		$("#causeplantype option[value='Plan']").remove()
	}
	
	if(causecreatepermission	==	false){
		$("#causeplantype option[value='Cause']").remove()
	}
	
	var	pageUrl = "/stratroom/riskFormulation/"+pageNo+"?loadFlag=false";
	$.ajax({
		url : pageUrl,
		async: false,
		success : function(data){
			if(data.employeeList !=	undefined && data.employeeList !=	"" && data.employeeList !=	null){
				var approvedresetIDs	=	[];
				employeeselectedItems	=	data.employeeList;	
				$.each(data.employeeList,function(key,values){
					approvedresetIDs.push(values.id);
				});
				
				$("#approvedresetIDs").val(approvedresetIDs.join(','));
			}else{
				$("#approvedresetIDs").val(data.updatedBy);
			}
			
			if(data.status !=	undefined && data.status !=	""){
				if(data.status	==	"Approved"){
					formulationStatusflag	=	true;
					approvedformulationdate	=	data.createdTime;
					editpermission		=	false;
					deletepermission	=	false;
					$(".addriskformulation").removeAttr("data-toggle");
					$(".addriskformulation").removeAttr("data-target");
					$(".uploadbtn").removeAttr("data-target");
					$(".uploadbtn").removeAttr("data-toggle");
					$(".approvedmaintain").html('<i style="font-size: 14px; font-weight: 600" class="far fa-undo" data-toggle="tooltip" data-placement="bottom" title="Reset"></i>');
					$('[data-toggle="tooltip"]').tooltip();
				}else{
					approvedformulationdate	=	data.updatedTime;
					$(".approvedmaintain").html('<i style="font-size: 14px; font-weight: 600" class="far fa-check-circle" data-toggle="tooltip" data-placement="bottom" title="Approve"></i>');
					$('[data-toggle="tooltip"]').tooltip();
				}
				$(".approvedmaintain").attr("data-status",data.status);
			}
		}
	});
			
	var	pageUrl = "/stratroom/formulationRiskList?formulationId="+pageNo;
	$.ajax({
		url : pageUrl,
		async: false,
		success : function(data){
			causelistoptions	=	data;
			formulationSuccessCallback(data,'');
		},
		error:function(){
			$(".page-loader-wrapper").hide();
		}
	});
	$('[rel="tooltip"]').tooltip();

});


function getcompletereporteeList() {	
	if (jQuery.isEmptyObject(getcompletereporteeList)) {
		$.ajax({
			url : "/stratroom/user/moduleAccessUserList?moduleName=Risk Formulation",
			async:false,
			success : function(employeeList) {
				completereporteeList 	=	employeeList;
			}
		});
	}
}

function getreportee() {
	
	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url: "/stratroom/organization/employeeList",
			async:false,
			success : function(employeeList) {
				reporteelist = employeeList;
			}
		});
	} 
}

function getdeptlist() {	
	if (jQuery.isEmptyObject(deptlist)) {
		$.ajax({
			url : "/stratroom/allDepartmentList",
			async:false,
			success : function(employeeList) {
				deptlist 	=	employeeList;
				/*$.each(deptlist, function(index, kpiObj) {
					if(kpiObj !=  ""){
						addOptionDept(".departmentlist", kpiObj, kpiObj)
					}
				});*/
			}
		});
	}
}

function formulationSuccessCallback(data,deptfilter) {
	formulationstrageylist	=	data;
	$(".page-loader-wrapper").hide();
	var bodyRows		=	``;
	if(viewpermission	==	true){
		$(".formulationlist").html('');
		$.each(data, function (index, risk) {
			var subdaterangeformatted	=	"";
			var id	=	risk.id;
			if (risk.riskValue.dateraised != undefined && risk.riskValue.dateraised != '') {
				var dateraised = risk.riskValue.dateraised;
				subdaterangeformatted = new Date(dateraised).toLocaleDateString('en-GB', {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				})
			}
			
			var showhighlightpanel	=	localStorage.getItem("riskinitiativeid");
			
			var collapsedclass		=	"collapsed";
			var collapsedshowornot	=	"";
			if(showhighlightpanel  !=	null && showhighlightpanel !=	"" && showhighlightpanel.indexOf('-')){
				var showpanelsplit	=	showhighlightpanel.split('-');	
				if(showpanelsplit[1] ==	pageNo && showpanelsplit[0] == id){
					collapsedclass		=	"";
					collapsedshowornot	=	"show";
				}
			}
		
			var departmentname	=	"";
			if(risk.department !=	"" && typeof(risk.department)== "string"){
				departmentname	=	risk.department;
			}else{
				if(deptlist !=	""){
					$.each(deptlist,function(index,deptindex){
						if(deptindex.id	==	risk.department){
							departmentname	=	deptindex.name;
							return false;
						}
					});
				}
			}
			
			bodyRows 	+= 	`<div class="col-lg-6 col-md-6 col-sm-12 project-panel-col">
            <div
              class="panel panel-default project-panel"
              style="border-left: 2px solid #c9c9c9"
            >
              <div class="panel-heading" role="tab" id="heading1">
                <div class="panel-title">
                  <a
                    role="button"
                    class="`+collapsedclass+`"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapse`+id+`"
                    aria-expanded="true"
                    aria-controls="collapse`+id+`"
                  >
                    <div class="row">
                      <div class="col-auto pr-0 branch-border">
                        <span><i class="fas fa-chevron-down"></i></span>
                      </div>
                      <div class="col" style="min-width: 55%;max-width: 55%;overflow: hidden;">
                        <h4 style="margin:0;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
                          `+risk.riskValue.name+`
                        </h4>
                      </div>
                      <div class="col-md-auto" style="min-width: 15%;max-width: 15%;overflow: hidden;">
                        <p style="margin:0;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">`+departmentname+`</p>
                      </div>
                      <div class="col-md-auto" style="min-width: 15%;max-width: 15%;overflow: hidden;">
                        <p style="margin:0;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">`+risk.riskValue.impact+`</p>
                      </div>
                      <div class="col-md-auto" style="min-width: 15%;max-width: 15%;overflow: hidden;">
                        <p style="margin:0;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">`+risk.riskValue.status+`</p>
                      </div>`;
                      
                var RiskOptions	=	"";
				if(deletepermission	==	false && viewpermission	==	false && editpermission	==	false){
					RiskOptions	=	"";
				}else{
					RiskOptions	=	`<ul class="header-dropdown" style="margin-top: 20px;">
                          <li class="dropdown">
                            <a
                              href="#"
                              onclick="return false;"
                              style="margin-top: -6px"
                              class="dropdown-toggle"
                              data-toggle="dropdown"
                              role="button"
                              aria-haspopup="true"
                              aria-expanded="true"
                            >
                              <i class="fas fa-ellipsis-v"></i>
                            </a>
                            <ul
                              class="dropdown-menu editoptionparentdropdown-menu pull-right"
                              id="project-options"
                              x-placement="bottom-start"
                              style="
                                position: absolute;
                                will-change: transform;
                                top: 0px;
                                left: 0px;
                                transform: translate3d(0px, 24px, 0px);
                              "
                            >`;
					
					if(viewpermission	==	true){
						RiskOptions	+=	`<li><a href="#" data-toggle="modal" data-target="#view_risk_l1" onclick="riskFormulationAdd(`+id+`,'view');">View</a></li>`;
					}
				
					if(editpermission	==	true && !formulationStatusflag){
						RiskOptions	+=	`<li><a href="#" data-toggle="modal" data-target="#add_risk_l1" onclick="riskFormulationAdd(`+id+`,'edit')">Edit</a></li>`;
					}
					
					if(deletepermission	==	true && !formulationStatusflag){
						RiskOptions	+=	`<li><a class="pointer" onclick="riskFormulationAdd(`+id+`,'delete')">Delete</a></li>`;
					}
					
					RiskOptions	+=	`</ul></li></ul>`;
				}
                      
                bodyRows +=	`<div class="col-lg-1">
                        `+RiskOptions+`
                        </div>
                    </div>
                  </a>
                </div>
              </div>`;
                
                var deptpush	=	departmentname+'-'+risk.department;
                
				if(deptpush !=	"" && deptpush !=	undefined && (deptfilter	==	"" || deptfilter	==	"success")){
					if ( $.inArray( deptpush, departmentlist ) == -1 ) {
						departmentlist.push(deptpush);
					}
				}	
				
    			var subriskbody	=	``;
    			var subriskadd	=	``;
    			var subriskfooter	=	``;
    			var incr	=	0;
    			
				var subriskflag	=	false;
				var subriskplanflag	=	false;
    			
    			if(risk.subRiskList !=	undefined && risk.subRiskList !=	""){	
    				$.each(risk.subRiskList, function (subindex, subrisk) {
    					
    					if(subrisk.subRiskValue.type == 'Cause')
						{
							subriskflag	=	true;
    						var subriskOptions	=	"";
        					if(causedeletepermission	==	false && causeviewpermission	==	false && causeeditpermission	==	false){
        						subriskOptions	=	"";
        					}else{
        						subriskOptions	=	`<ul class="header-dropdown" style="margin-top: 20px;">
        	                          <li class="dropdown">
        	                            <a
        	                              href="#"
        	                              onclick="return false;"
        	                              style="margin-top: -6px"
        	                              class="dropdown-toggle"
        	                              data-toggle="dropdown"
        	                              role="button"
        	                              aria-haspopup="true"
        	                              aria-expanded="true"
        	                            >
        	                              <i class="fas fa-ellipsis-v"></i>
        	                            </a>
        	                            <ul
        	                              class="dropdown-menu editoptionparentdropdown-menu pull-right"
        	                              id="project-options"
        	                              x-placement="bottom-start"
        	                              style="
        	                                position: absolute;
        	                                will-change: transform;
        	                                top: 0px;
        	                                left: 0px;
        	                                transform: translate3d(0px, 24px, 0px);
        	                              "
        	                            >`;
        						
        						if(causeviewpermission	==	true){
        							subriskOptions	+=	`<li><a href="#" data-toggle="modal" data-target="#view_risk_l2" onclick="subRiskEvent(`+id+`,`+subrisk.id+`,'view');">View</a></li>`;
        						}
        					
        						if(causeeditpermission	==	true && !formulationStatusflag){
        							subriskOptions	+=	`<li><a href="#" data-toggle="modal" data-target="#add_risk_l2" onclick="subRiskEvent(`+id+`,`+subrisk.id+`,'edit')">Edit</a></li>`;
        						}
        						
        						if(causedeletepermission	==	true && !formulationStatusflag){
        							subriskOptions	+=	`<li><a class="pointer" onclick="subRiskEvent(`+id+`,`+subrisk.id+`,'delete')">Delete</a></li>`;
        						}
        						
        						subriskOptions	+=	`</ul></li></ul>`;
        					}
        					
        						subriskbody	+=	`<div
        		                id="collapse`+id+`"
        		                class="panel-collapse collapse `+collapsedshowornot+`"
        		                role="tabpanel"
        		                aria-labelledby="heading"
        		              >
        		                <div class="panel-body">
        		                	<div  class="panel-group level2"  id="accordion1" role="tablist"  aria-multiselectable="true">
        		                		<div class="panel panel-default" id=`+subrisk.subRiskValue.type+`_`+subrisk.id+`>
        		                			<div class="panel-heading" role="tab" id="heading_`+subrisk.subRiskValue.type+`_`+subrisk.id+`">
        		                  				<div class="panel-title">
    					    		                  <a
    					                            role="button"
    					                            class=""
    					                            data-toggle="collapse"
    					                            data-parent="#accordion1"
    					                            href="#collapse_`+subrisk.subRiskValue.type+`_`+subrisk.id+`"
    					                            aria-expanded="true"
    					                            aria-controls="collapse_`+subrisk.subRiskValue.type+`_`+subrisk.id+`"
    					                          >
        		                    <div class="row">
        		                      <div class="col-auto pr-0 branch-border">
        		                        <span><i class="fas fa-chevron-down"></i></span>
        		                      </div>
        		                      <div class="col">
        		                        <h4>`+subrisk.subRiskValue.name+`
        		                        </h4>
        		                      </div>
    		                        	<div class="col-md-auto">
        		                        	<p>`+subrisk.subRiskValue.rating+`</p>
        		                        </div>
        		                      <div class="col-lg-1">`+subriskOptions+`</div>
        		                    </div>
        		                    </a>
        		                  </div>
        		                </div>`;
        						if(subrisk.activitiesList !=	undefined && subrisk.activitiesList !=	""){	
        		    				$.each(subrisk.activitiesList, function (subactivities, activities) {
        		    					var consequenceOptions	=	"";
        		    					var consequencebody =""
        		    					if(consequencedeletepermission	==	false && consequenceviewpermission	==	false && consequenceeditpermission	==	false){
        		    						consequenceOptions	=	"";
        		    					}else{
        		    						consequenceOptions	=	`<ul class="header-dropdown" style="margin-top: 20px;">
        		    	                          <li class="dropdown">
        		    	                            <a
        		    	                              href="#"
        		    	                              onclick="return false;"
        		    	                              style="margin-top: -6px"
        		    	                              class="dropdown-toggle"
        		    	                              data-toggle="dropdown"
        		    	                              role="button"
        		    	                              aria-haspopup="true"
        		    	                              aria-expanded="true"
        		    	                            >
        		    	                              <i class="fas fa-ellipsis-v"></i>
        		    	                            </a>
        		    	                            <ul
        		    	                              class="dropdown-menu editoptionparentdropdown-menu pull-right"
        		    	                              id="project-options"
        		    	                              x-placement="bottom-start"
        		    	                              style="
        		    	                                position: absolute;
        		    	                                will-change: transform;
        		    	                                top: 0px;
        		    	                                left: 0px;
        		    	                                transform: translate3d(0px, 24px, 0px);
        		    	                              "
        		    	                            >`;
        		    						
        		    						if(consequenceviewpermission	==	true){
        		    							consequenceOptions	+=	`<li><a href="#" data-toggle="modal" data-target="#view_risk_l2" onclick="subRisksectionEvent(`+id+`,`+activities.id+`,'`+subrisk.subRiskValue.type+`',`+subrisk.id+`,'view');">View</a></li>`;
        		    						}
        		    					
        		    						if(consequenceeditpermission	==	true && !formulationStatusflag){
        		    							consequenceOptions	+=	`<li><a href="#" data-toggle="modal" data-target="#add_risk_l3" onclick="subRisksectionEvent(`+id+`,`+activities.id+`,'`+subrisk.subRiskValue.type+`',`+subrisk.id+`,'edit')">Edit</a></li>`;
        		    						}
        		    						
        		    						if(consequencedeletepermission	==	true && !formulationStatusflag){
        		    							consequenceOptions	+=	`<li><a class="pointer" onclick="subRisksectionEvent(`+id+`,`+activities.id+`,'`+subrisk.subRiskValue.type+`',`+subrisk.id+`,'delete')">Delete</a></li>`;
        		    						}
        		    						
        		    						consequenceOptions	+=	`</ul></li></ul>`;
        		    					}
        				    					
        		    						consequencebody	+=	`<div
        		    		                id="collapse_Cause_`+activities.activityValue.id+`"
        		    		                class="panel-collapse collapse show"
        		    		                role="tabpanel"
        		    		                aria-labelledby="heading_Cause_`+activities.activityValue.id+`"
        		    		              >
        		    		                <div class="panel-body">
        		    		                	<div class="panel-title">
        		    		                		<div class="row" style="margin-left: -8px">
        		    		                			<div class="col-auto pr-0 branch-border">
        		    		                			<span> </span>
        		    		                			</div>
        		    		                      <div class="col">
        		    		                        <h4>`+activities.activityValue.name+`
        		    		                        </h4>
        		    		                      </div>
        		    		                        <div class="col-md-auto">
        		    		                        	<p>`+activities.activityValue.rating+`</p>
        		    		                        	</div>
        		    		                      <div class="col-lg-1">`+consequenceOptions+`</div>
        		    		                    </div>
        		    		                  </div>
        		    		                </div></div>`;
        		    						subriskbody+=	consequencebody;
        		    				});
        						}
        						
        						if(consequencecreatepermission	==	true && formulationStatusflag == false){
        	    					var subriskfooter = `
        	    		                <div
        			                        id="collapse_`+subrisk.subRiskValue.type+`_`+subrisk.id+`"
        			                        class="panel-collapse collapse show"
        			                        role="tabpanel"
        			                        aria-labelledby="heading_`+subrisk.subRiskValue.type+`_`+subrisk.id+`"
        			                      >
        	                        <div class="panel-body">
        	                          <div
        	                            class="panel-group level3"
        	                            id="accordion2"
        	                            role="tablist"
        	                            aria-multiselectable="true"
        	                          >
        	                            <div class="panel panel-default">
        	                              <div
        	                                class="panel-heading"
        	                                role="tab"
        	                                id="heading1_1_1"
        	                              >
        	                                <div class="panel-title">
        	                                  <div class="row" style="margin-left: -8px">
        	                                    <div class="col-auto pr-0 branch-border">
        	                                      <span> </span>
        	                                    </div>
        	                                    <div class="col">
        	                                      <span
        	                                        data-toggle="modal"
        	                                        data-target="#add_risk_l3"
        	                                        style="margin-left: -20px"
        	                                      >
        	                                        <i class="fas fa-plus border-box" onclick="subRisksectionEvent(`+subrisk.riskId+`,`+subrisk.id+`,'`+subrisk.subRiskValue.type+`',`+subrisk.id+`,'add')"></i>
        	                                      </span>
        	                                    </div>
        	                                  </div>
        	                                </div>
        	                              </div>
        	                            </div></div></div></div>`;
        	    					subriskbody	+=	subriskfooter;
        	    					}
								if(subriskflag	==	true){
									subriskbody	+=	`</div></div></div></div>`;	
								}
						}else if(subrisk.subRiskValue.type == 'Plan')
						{
							subriskplanflag	=	true;
							var subriskOptions	=	"";
        					if(plandeletepermission	==	false && planviewpermission	==	false && planeditpermission	==	false){
        						subriskOptions	=	"";
        					}else{
        						subriskOptions	=	`<ul class="header-dropdown" style="margin-top: 20px;">
        	                          <li class="dropdown">
        	                            <a
        	                              href="#"
        	                              onclick="return false;"
        	                              style="margin-top: -6px"
        	                              class="dropdown-toggle"
        	                              data-toggle="dropdown"
        	                              role="button"
        	                              aria-haspopup="true"
        	                              aria-expanded="true"
        	                            >
        	                              <i class="fas fa-ellipsis-v"></i>
        	                            </a>
        	                            <ul
        	                              class="dropdown-menu editoptionparentdropdown-menu pull-right"
        	                              id="project-options"
        	                              x-placement="bottom-start"
        	                              style="
        	                                position: absolute;
        	                                will-change: transform;
        	                                top: 0px;
        	                                left: 0px;
        	                                transform: translate3d(0px, 24px, 0px);
        	                              "
        	                            >`;
        						
        						var	subplanid	=	(subrisk.subRiskValue.id !=	undefined && subrisk.subRiskValue.id !=	""?subrisk.subRiskValue.id:"0");
        						
        						if(planviewpermission	==	true){
        							subriskOptions	+=	`<li><a href="#" data-toggle="modal" data-target="#view_risk_l5" onclick="subRiskPlanEvent(`+subrisk.riskId+`,`+subplanid+`,'`+subrisk.subRiskValue.type+`',`+subrisk.id+`,'view');">View</a></li>`;
        						}
        					
        						if(planeditpermission	==	true && !formulationStatusflag){
        							subriskOptions	+=	`<li><a href="#" data-toggle="modal" data-target="#add_risk_l2" onclick="subRiskPlanEvent(`+subrisk.riskId+`,`+subplanid+`,'`+subrisk.subRiskValue.type+`',`+subrisk.id+`,'edit');">Edit</a></li>`;
        						}
        						
        						if(plandeletepermission	==	true && !formulationStatusflag){
        							subriskOptions	+=	`<li><a class="pointer" onclick="subRiskEvent(`+subrisk.riskId+`,`+subrisk.id+`,'delete')">Delete</a></li>`;
        						}
        						
        						subriskOptions	+=	`</ul></li></ul>`;
        					}
        					
        					var actionname	=	'';
        					if(subrisk.subRiskValue.action !=	undefined){
        						actionname	=	subrisk.subRiskValue.action;	
        					}else if(subrisk.subRiskValue.rating !=	undefined){
        						actionname	=	subrisk.subRiskValue.rating;	
        					}
        						subriskbody	+=	`<div
        		                id="collapse`+id+`"
        		                class="panel-collapse collapse `+collapsedshowornot+`"
        		                role="tabpanel"
        		                aria-labelledby="heading1"
        		              >
        		                <div class="panel-body">
        		                	<div  class="panel-group level2"  id="accordion1" role="tablist"  aria-multiselectable="true">
        		                		<div class="panel panel-default" id=`+subrisk.subRiskValue.type+`_`+subrisk.id+`>
        		                			<div class="panel-heading" role="tab" id="heading_`+subrisk.subRiskValue.type+`_`+subrisk.id+`">
        		                  				<div class="panel-title">
    					    		                  <a
    					                            role="button"
    					                            class=""
    					                            data-toggle="collapse"
    					                            data-parent="#accordion1"
    					                            href="#collapse_`+subrisk.subRiskValue.type+`_`+subrisk.id+`"
    					                            aria-expanded="true"
    					                            aria-controls="collapse_`+subrisk.subRiskValue.type+`_`+subrisk.id+`"
    					                          >
        		                    <div class="row">
        		                      <div class="col-auto pr-0 branch-border">
        		                        <span><i class="fas fa-chevron-down"></i></span>
        		                      </div>
        		                      <div class="col">
        		                        <h4>`+subrisk.subRiskValue.name+`
        		                        </h4>
        		                      </div>
    		                        	<div class="col-md-auto">
        		                        	<p>`+actionname+`</p>
        		                        </div>
        		                      <div class="col-lg-1">`+subriskOptions+`</div>
        		                    </div>
        		                    </a>
        		                  </div>
        		                </div>`;
        						
        						if(subrisk.activitiesList !=	undefined && subrisk.activitiesList !=	""){	
        		    				$.each(subrisk.activitiesList, function (subactivities, activities) {
        		    					if(activities.activityValue.status == "Pending"){
	        		    					var consequenceOptions	=	"";
	        		    					var actionOptions	=	"";
	        		    					var actionbody	=	"";
	        		    					if(actiondeletepermission	==	false && actionviewpermission	==	false && actioneditpermission	==	false){
	        		    						actionOptions	=	"";
	        		    					}else{
	        		    						actionOptions	=	`<ul class="header-dropdown" style="margin-top: 20px;">
	        		    	                          <li class="dropdown">
	        		    	                            <a
	        		    	                              href="#"
	        		    	                              onclick="return false;"
	        		    	                              style="margin-top: -6px"
	        		    	                              class="dropdown-toggle"
	        		    	                              data-toggle="dropdown"
	        		    	                              role="button"
	        		    	                              aria-haspopup="true"
	        		    	                              aria-expanded="true"
	        		    	                            >
	        		    	                              <i class="fas fa-ellipsis-v"></i>
	        		    	                            </a>
	        		    	                            <ul
	        		    	                              class="dropdown-menu editoptionparentdropdown-menu pull-right"
	        		    	                              id="project-options"
	        		    	                              x-placement="bottom-start"
	        		    	                              style="
	        		    	                                position: absolute;
	        		    	                                will-change: transform;
	        		    	                                top: 0px;
	        		    	                                left: 0px;
	        		    	                                transform: translate3d(0px, 24px, 0px);
	        		    	                              "
	        		    	                            >`;
	        		    						
	        		    						if(actionviewpermission	==	true){
	        		    							actionOptions	+=	`<li><a href="#" data-toggle="modal" data-target="#view_risk_l4" onclick="subRiskActionEvent(`+id+`,`+activities.id+`,'`+subrisk.subRiskValue.type+`',`+activities.activityValue.id+`,'view');">View</a></li>`;
	        		    						}
	        		    					
	        		    						if(actioneditpermission	==	true && !formulationStatusflag){
	        		    							actionOptions	+=	`<li><a href="#" data-toggle="modal" data-target="#add_risk_l4" onclick="subRiskActionEvent(`+id+`,`+activities.id+`,'`+subrisk.subRiskValue.type+`',`+activities.activityValue.id+`,'edit')">Edit</a></li>`;
	        		    						}
	        		    						
	        		    						if(actiondeletepermission	==	true && !formulationStatusflag){
	        		    							actionOptions	+=	`<li><a class="pointer" onclick="subRiskActionEvent(`+id+`,`+activities.id+`,'`+subrisk.subRiskValue.type+`',`+id+`,'delete')">Delete</a></li>`;
	        		    						}
	        		    						
	        		    						actionOptions	+=	`</ul></li></ul>`;
	        		    					}
	        				    					
	        	    						actionbody	+=	`<div
	        	    		                id="collapse_Plan_`+activities.activityValue.id+`"
	        	    		                class="panel-collapse collapse show"
	        	    		                role="tabpanel"
	        	    		                aria-labelledby="heading_Plan_`+activities.activityValue.id+`"
	        	    		              >
	        	    		                <div class="panel-body">
	        	    		                	<div class="panel-title">
	        	    		                		<div class="row" style="margin-left: -8px">
	        	    		                			<div class="col-auto pr-0 branch-border">
	        	    		                			<span> </span>
	        	    		                			</div>
	        	    		                      <div class="col">
	        	    		                        <h4>`+activities.activityValue.name+`
	        	    		                        </h4>
	        	    		                      </div>
	        	    		                        <div class="col-md-auto">
	        	    		                        	<p>`+activities.activityValue.status+`</p>
	        	    		                        </div>
	        	    		                      <div class="col-lg-1">`+actionOptions+`</div>
	        	    		                    </div>
	        	    		                  </div>
	        	    		                </div></div>`;
	        	    						
	        		    					subriskbody+=	actionbody;
        		    					}
        		    				});
        						}
        						
        						if(actioncreatepermission	==	 true && formulationStatusflag == false){
        	    					var subriskfooter = `
        	    		                <div
        			                        id="collapse_`+subrisk.subRiskValue.type+`_`+subrisk.id+`"
        			                        class="panel-collapse collapse show"
        			                        role="tabpanel"
        			                        aria-labelledby="heading_`+subrisk.subRiskValue.type+`_`+subrisk.id+`"
        			                      >
        	                        <div class="panel-body">
        	                          <div
        	                            class="panel-group level3"
        	                            id="accordion2"
        	                            role="tablist"
        	                            aria-multiselectable="true"
        	                          >
        	                            <div class="panel panel-default">
        	                              <div
        	                                class="panel-heading"
        	                                role="tab"
        	                                id="heading1_1_1"
        	                              >
        	                                <div class="panel-title">
        	                                  <div class="row" style="margin-left: -8px">
        	                                    <div class="col-auto pr-0 branch-border">
        	                                      <span> </span>
        	                                    </div>
        	                                    <div class="col">
        	                                      <span
        	                                        data-toggle="modal"
        	                                        data-target="#add_risk_l4"
        	                                        style="margin-left: -20px"
        	                                      >
        	                                        <i class="fas fa-plus border-box" onclick="subRiskActionEvent(`+subrisk.riskId+`,`+subrisk.id+`,'`+subrisk.subRiskValue.type+`',`+subrisk.id+`,'add')"></i>
        	                                      </span>
        	                                    </div>
        	                                  </div>
        	                                </div>
        	                              </div>
        	                            </div></div></div></div>`;
        	    					subriskbody	+=	subriskfooter;
        	    					}
									if(subriskplanflag	==	true){
										subriskbody	+=	`</div></div></div></div>`;	
									}
        		                        	  
						}
    				});
    			
					/*if(subriskflag	==	true && subriskplanflag	==	true){
						bodyRows 	+=	subriskbody+`</div></div></div></div></div></div></div></div>`;	
					}else if(subriskflag	==	false && subriskplanflag	==	true){
						bodyRows 	+=	subriskbody+`</div></div></div></div>`;	
					}else if(subriskflag	==	true && subriskplanflag	==	false){
						bodyRows 	+=	subriskbody+`</div></div></div></div>`;	
					}else{
						bodyRows 	+=	subriskbody;	
					}*/
					bodyRows 	+=	subriskbody;
    			}
    			
				if((causecreatepermission	==	true || plancreatepermission	==	true) && formulationStatusflag == false){
					subriskadd	=	`
	              <div
	                id="collapse`+id+`"
	                class="panel-collapse collapse `+collapsedshowornot+`"
	                role="tabpanel"
	                aria-labelledby="heading1"
	              >
	                <div class="panel-body">
	                    <div class="row" style="margin-left: -8px">
	                      <div class="col-auto pr-0 branch-border">
	                        <span></span>
	                      </div>
	                      <div class="col">
	                        <span
	                          data-toggle="modal"
	                          data-target="#add_risk_l2"
	                          style="margin-left: -20px"
	                        >
	                          <i class="fas fa-plus border-box" onclick="subRiskEvent(`+id+`,'0','add')"></i>
	                        </span>
	                      </div>
	                    </div>
	                  </div>
	                </div>`;
    			}	

			bodyRows 	+=	subriskadd+`</div></div>`;		
                //bodyRows 	+=	subriskadd+`</div></div></div></div></div></div>`;
		});
		
		$(".formulationlist").html(bodyRows);	
	}
	
	if(deptfilter	==	"" || deptfilter	==	"success"){
		$('ul.departmentlist li:not(:first-child)').empty();
		if(departmentlist.length){
			$.each(departmentlist, function(index, kpiObj) {
				if(kpiObj !=  "" && kpiObj.indexOf('-')){
					var options	=	kpiObj.split('-');
					addOptionDept(".departmentlist", options[0], options[1])
				}
			});
		}
	}
}

function addOption(id, text, value) {
	$(id).append(`<option value="${value}">${text}</option>`);
}

function addOptionDept(id, text, value) {
	$(id).append(`<li><a class="dropdown-item filterdept" href="#" data-value="${value}">${text}</a></li>`);
}

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
		}

      	function riskFormulationAdd(id,action) {
      		
      		formvalidationerrorreset();
			$("#risk_formulation_Form").trigger('reset');
			$("#risk_formulation_Form input[name='action']").val(action);
			$('#risk_formulation_Form #Risk_owner').find('option').remove().end();
			//$('#risk_formulation_Form #department').find('option').remove().end();			
			$('#risk_formulation_Form #Risk_owner').append(`<option value="">Select Owner</option>`);
			$('#risk_formulation_Form #riskfordepartment').append(`<option value="">Select Department</option>`);
			populateOwnerDropdownRisk('#add_risk_l1 #Risk_owner');
			populateDeptList('#risk_formulation_Form #riskfordepartment');
			
			$("#startDate").datepicker({
				language: 'en',
				range: true,
				autoClose: true,
				position: "top left",
				//todayButton: true,
				onSelect: function (fd) {
				}
			});
				
	        if (action == 'add') {
	        	if(formulationStatusflag	==	true){
	        		$.notify("Error: This is approved formulation so you will not able to add", {
								  style: 'error',
								  className: 'graynotify'
								});
					return false;
	        	}
				// when adding
				$("#Risk_owner").val(currentEmp);
				$('#Risk_owner').select2({
					selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
					dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
				});
				$(".modalheaderprojectname").html("Add");
				$("#risk_formulation_Form #Impact").val('');
				$("#risk_formulation_Form #Likelihood").val('');
				$("#risk_formulation_Form #riskfordepartment").val('');
			}else if (action == 'delete') {
				$("#deletescoreid").val(id);
				$("#deleterecordtype").val("Risk");
				$('#deleteModalriskformulation').modal('toggle');
				$(window).on("resize", function(){
				    $(".modal:visible").each(alignModal);
				}); 
				$(".modal").on("shown.bs.modal", alignModal);
				
			} else { // view and edit
				
				if (action == 'view') {
					$('#ownername,#viewname,#viewdepart,#viewtype,#viewdate,#viewbudget,#viewforecast').html('');
				}
				
				$("#risk_formulation_Form input[name='id']").val(id);
				
				$.ajax({
					url: "/stratroom/risk/riskFormulation/" + id,
					success: function(data){
						formulationupdateDescription	=	data;
						riskpopSuccessCallback(data,action);
					}
				});
			}
      }
      
	function riskpopSuccessCallback(riskdata,action) {
		if(action	==	"edit"){
			$(".modalheaderprojectname").html("Edit");
			if(riskdata.owner	==	""){
				$("#Risk_owner").val(currentEmp);
			}else{
				$('#Risk_owner').val(riskdata.owner);
			}
			$('#Risk_owner').select2({
				selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
				dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
			});
			$('.persp_name').val(riskdata.riskValue.name);
			$("#risk_formulation_Form #riskfordepartment").val(riskdata.departmentId);
			$('#riskfordepartment').select2({
				  selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
				  dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
				});
			$("#risk_formulation_Form  #kpi_start_end_date").val(riskdata.riskValue.dateraised);
			$("#risk_formulation_Form #Impact").val(riskdata.riskValue.impact);
			$("#risk_formulation_Form #Category").val(riskdata.riskValue.category);
			$("#risk_formulation_Form #Likelihood").val(riskdata.riskValue.likelihood);
			$("#risk_formulation_Form #Score").val(riskdata.riskValue.score);
			$("#risk_formulation_Form #Status").val(riskdata.riskValue.status);

		}else if(action	==	"view"){
			$('#name').html(riskdata.riskValue.name);
			$('#likelihood').html(riskdata.riskValue.likelihood);
			$("#impact").html(riskdata.riskValue.impact);
			$("#categoryval").html(riskdata.riskValue.category);
			$("#score").html(riskdata.riskValue.score);
			$("#status").html(riskdata.riskValue.status);
			$("#dateraised").html(riskdata.riskValue.dateraised);
			$("#owner").html(riskdata.riskValue.ownerName);
		}	
	}
 
	
	$(document).on("change", "#risk_formulation_Form #Likelihood", function() {
		var score = $(this).find(':selected').attr('data-score');
		var statusval = $(this).find(':selected').attr('data-status');
		var impact = $("#risk_formulation_Form #Impact").find(':selected').attr('data-score');
		var likelihood = $("#risk_formulation_Form #Likelihood").find(':selected').attr('data-score');
		if(score != "" && (impact !=	"" && impact !=	undefined)){
			score = score * impact;
			$("#risk_formulation_Form #Score").val(score);
		}else if(score != "" && impact ==	""){
			score = score * score;
			$("#risk_formulation_Form #Score").val(score);
		}
			//$(".riskDetail_description_popup #impact").val(status);
			if((impact == "1" || impact == "2") && likelihood == "1")
				{
					$("#Status").val("Very Low")
				}
			else if(impact == "1" && likelihood == "2")
				{
				$("#Status").val("Very Low")
				}
			else if((impact == "3" || impact == "4") && likelihood == "1")
			{
				$("#Status").val("Low")
			}
			else if((impact == "2" || impact == "3") && likelihood == "2")
			{
				$("#Status").val("Low")
			}
			else if(impact == "1"  && likelihood == "3")
			{
				$("#Status").val("Low")
			}
			else if(impact == "5"  && likelihood == "1")
			{
				$("#Status").val("Tolerable")
			}
			else if(impact == "4"  && likelihood == "2")
			{
				$("#Status").val("Tolerable")
			}
			else if((impact == "2" || impact == "3")  && likelihood == "3")
			{
				$("#Status").val("Tolerable")
			}
			else if((impact == "1" || impact == "2")  && likelihood == "4")
			{
				$("#Status").val("Tolerable")
			}
			else if(impact == "1"  && likelihood == "5")
			{
				$("#Status").val("Tolerable")
			}
			else if(impact == "5"  && likelihood == "2")
			{
				$("#Status").val("High")
			}
			else if((impact == "4" || impact == "5")  && likelihood == "3")
			{
				$("#Status").val("High")
			}
			else if(impact == "3"  && likelihood == "4")
			{
				$("#Status").val("High")
			}
			else if((impact == "2" || impact == "3") && likelihood == "5")
			{
				$("#Status").val("High")
			}
			else if(impact == "5" && likelihood == "3")
			{
				$("#Status").val("Very High")
			}
			else if((impact == "4" || impact == "5") && likelihood == "4")
			{
				$("#Status").val("Very High")
			}	
			else if((impact == "4" || impact == "5") && likelihood == "5")
			{
				$("#Status").val("Very High")
			}		
		
	});

	$(document).on("change", "#risk_formulation_Form #Impact", function() {
		var score = $(this).find(':selected').attr('data-score');
		var impact = $("#risk_formulation_Form #Impact").find(':selected').attr('data-score');
		var likelihood = $("#risk_formulation_Form #Likelihood").find(':selected').attr('data-score');
		if(score != "" && (likelihood !=	"" && likelihood !=	undefined)){
			score = score * likelihood;
			$("#risk_formulation_Form #Score").val(score);
		}else if(score != "" && likelihood ==	""){
			score = score * score;
			$("#risk_formulation_Form #Score").val(score);
		}
			//$(".riskDetail_description_popup #impact").val(status);
		if((impact == "1" || impact == "2") && likelihood == "1")
		{
			$("#Status").val("Very Low")
		}
	else if(impact == "1" && likelihood == "2")
		{
		$("#Status").val("Very Low")
		}
	else if((impact == "3" || impact == "4") && likelihood == "1")
	{
		$("#Status").val("Low")
	}
	else if((impact == "2" || impact == "3") && likelihood == "2")
	{
		$("#Status").val("Low")
	}
	else if(impact == "1"  && likelihood == "3")
	{
		$("#Status").val("Low")
	}
	else if(impact == "5"  && likelihood == "1")
	{
		$("#Status").val("Tolerable")
	}
	else if(impact == "4"  && likelihood == "2")
	{
		$("#Status").val("Tolerable")
	}
	else if((impact == "2" || impact == "3")  && likelihood == "3")
	{
		$("#Status").val("Tolerable")
	}
	else if((impact == "1" || impact == "2")  && likelihood == "4")
	{
		$("#Status").val("Tolerable")
	}
	else if(impact == "1"  && likelihood == "5")
	{
		$("#Status").val("Tolerable")
	}
	else if(impact == "5"  && likelihood == "2")
	{
		$("#Status").val("High")
	}
	else if((impact == "4" || impact == "5")  && likelihood == "3")
	{
		$("#Status").val("High")
	}
	else if(impact == "3"  && likelihood == "4")
	{
		$("#Status").val("High")
	}
	else if((impact == "2" || impact == "3") && likelihood == "5")
	{
		$("#Status").val("High")
	}
	else if(impact == "5" && likelihood == "3")
	{
		$("#Status").val("Very High")
	}
	else if((impact == "4" || impact == "5") && likelihood == "4")
	{
		$("#Status").val("Very High")
	}	
	else if((impact == "4" || impact == "5") && likelihood == "5")
	{
		$("#Status").val("Very High")
	}		

	});
	
	$.validator.setDefaults({ ignore: ":hidden:not(.chosen-select)" });
	$( "#risk_formulation_Form" ).validate({
    	  rules: {
    	    name:{
    	    	required: true
    	    },Type:{
    	    	required: true
    	    },Likelihood:{
    	    	required: true
    	    },Impact:{
    	    	required: true
    	    },kpi_start_end_date:{
    	    	required: true
    	    },department:{
    	    	required: true
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
              required: "Required Fields Missing"
          },
          submitHandler: function(form) {
          	handleformulationSave();
          }
    	});
            		
		function handleformulationSave(){
			var action	=	$("#risk_formulation_Form input[name='action']").val();
		    var formulationObj = 	getformulationObj(action);
		    var methodType = 'post';
			var id	=	$("#risk_formulation_Form input[name='id']").val();
			if(action	==	"edit"){
				formulationObj.id 		= 	(id !=	""?id:"");	
			}
			
		    $.ajax({
		        url: "/stratroom/risk/riskFormulation",
		        type: methodType,
		        contentType: "application/json",
		        data: JSON.stringify(formulationObj),
		        success: function (data, status) {
		        	localStorage.setItem("riskinitiativeid",data.id+'-'+pageNo);
		            location.reload(true);
		        },
				error:readErrorMsg
		    });
		}
	

		function subRisksectionEvent(riskId, parentid, type, id ,action) {
			
			if(riskId	==	""){
				return false;
			}
			
      		formvalidationerrorreset();
			$("#consequence_formulation_Form").trigger('reset');
			$("#consequence_formulation_Form input[name='action']").val(action);
			$("#consequence_formulation_Form input[name='id']").val(parentid);
			$("#consequence_formulation_Form input[name='riskId']").val(riskId);
			$("#consequence_formulation_Form input[name='parentId']").val(id);	
			$("#consequence_formulation_Form input[name='parentinfo']").val(type);
	        if (action == 'add') {
	        	$(".modalsubconseqheader").html('Add');
			}else if (action == 'delete') {
				$("#deletescoreid").val(parentid);
				$("#deleterecordtype").val("subriskactivities");
				$('#deleteModalriskformulation').modal('toggle');
				$(window).on("resize", function(){
				    $(".modal:visible").each(alignModal);
				}); 
				$(".modal").on("shown.bs.modal", alignModal);
				
			} else { // view and edit
				
				if (action == 'view') {
					$('#view_lv_formulation').modal('toggle');
					$('#viewsubname,#viewsubdate,#viewsubtype,.viewsubownerlist').html('');
				}
				
				$("#subrisk_formulation_Form input[name='id']").val(parentid);
				
				$.ajax({
					url: "/stratroom/activity/riskFormulation/" + parentid,
					success: function(data){
						subriskupdateDescription	=	data;
						subsectionriskpopSuccessCallback(data,action);
					}
				});
			}
      }
		
		function subRiskActionEvent(riskId, parentid, type, id ,action) {
			
			if(riskId	==	""){
				return false;
			}
			
      		formvalidationerrorreset();
			$("#action_formulation_Form").trigger('reset');
			$("#action_formulation_Form input[name='action']").val(action);
			$("#action_formulation_Form input[name='id']").val(parentid);
			$("#action_formulation_Form input[name='riskId']").val(riskId);
			$("#action_formulation_Form input[name='parentId']").val(id);	
			$("#action_formulation_Form input[name='parentinfo']").val(type);
	        if (action == 'add') {
	        	
			}else if (action == 'delete') {
				$("#deletescoreid").val(parentid);
				$("#deleterecordtype").val("subriskactivities");
				$('#deleteModalriskformulation').modal('toggle');
				$(window).on("resize", function(){
				    $(".modal:visible").each(alignModal);
				}); 
				$(".modal").on("shown.bs.modal", alignModal);
				
			} else { // view and edit
				
				$.ajax({
					url: "/stratroom/activity/riskFormulation/" + parentid,
					success: function(data){
						subriskupdateDescription	=	data;
						subsectionactionpopSuccessCallback(data,action);
					}
				});
			}
      }
		
		function subsectionactionpopSuccessCallback(riskdata,action) {
			var subtypeval	=	riskdata.activityValue.type;
			if(action	==	"edit"){
				$('.action_name').val(riskdata.activityValue.name);
				if(riskdata.activityValue.type == 'Action')
				{
					$("#action_formulation_Form input[name='parentinfo']").val("Plan");
				}
				$("#action_formulation_Form #parentId").val(riskdata.id);
				$("#action_formulation_Form #type").val(riskdata.activityValue.type);
				$("#action_formulation_Form #riskId").val(riskdata.riskId);
				$("#action_formulation_Form #id").val(riskdata.id);
				$("#action_formulation_Form #actionresolveby").val(riskdata.activityValue.resolveby);
				$("#action_formulation_Form #actionStatus").val(riskdata.activityValue.status);
				
			}else if(action	==	"view"){
				$('#l4_name').html(riskdata.activityValue.name);
				$('#l4_type').html(riskdata.activityValue.type);
				$('#l4_resolveby').html(riskdata.activityValue.resolveby);
				$('#l4_status').html(riskdata.activityValue.status);

			}	
		}

		function subRiskPlanEvent(riskId, parentid, type, id ,action) {
			
			if(riskId	==	""){
				return false;
			}
			
			$(".causeform").hide();
        	$(".planform").show();
        	$('#plan_formulation_Form #Type').find('option').remove().end().append('<option value="Plan">Plan</option>');
			$(".modalheadersubprojectname").html("Plan Description");
			
      		formvalidationerrorreset();
			$("#plan_formulation_Form").trigger('reset');
			$("#plan_formulation_Form input[name='action']").val(action);
			$("#plan_formulation_Form input[name='id']").val(id);
			$("#plan_formulation_Form input[name='riskId']").val(riskId);
			$("#plan_formulation_Form input[name='parentId']").val(parentid);	
			$("#plan_formulation_Form input[name='parentinfo']").val(type);
	        if (action == 'add') {
	        	
			}else if (action == 'delete') {
				$("#deletescoreid").val(id);
				$("#deleterecordtype").val("subrisk");
				$('#deleteModalriskformulation').modal('toggle');
				$(window).on("resize", function(){
				    $(".modal:visible").each(alignModal);
				}); 
				$(".modal").on("shown.bs.modal", alignModal);
				
			} else { // view and edit
				
				$.ajax({
					url: "/stratroom/subRisk/riskFormulation/" + id,
					success: function(data){
						subriskupdateDescription	=	data;
						subsectionplanpopSuccessCallback(data,action);
					}
				});
			}
      }
		
		function subsectionplanpopSuccessCallback(riskdata,action) {
			
			var subtypeval	=	riskdata.subRiskValue.type;
			var name	=	(riskdata.subRiskValue.name !=	undefined?riskdata.subRiskValue.name:"");
			var planaction	=	(riskdata.subRiskValue.action !=	undefined?riskdata.subRiskValue.action:"");
			var plancause	=	(riskdata.subRiskValue.plancause !=	undefined?riskdata.subRiskValue.plancause:"");
			var resolveby	=	(riskdata.subRiskValue.resolveby !=	undefined?riskdata.subRiskValue.resolveby:"");
			
			if(action	==	"edit"){
	        	$('#plan_formulation_Form #Type').find('option').remove().end().append('<option value="Plan">Plan</option>');
	        	
				$("#plan_formulation_Form #plancause").empty();
				$("#plan_formulation_Form #plancause").append('<option value="" data-i18n="Choose">Choose</option>');
				
				if(causelistoptions !=	""){
					$.each(causelistoptions,function(index,value){
						if(value.id == riskdata.riskId){
							$.each(value.subRiskList,function(index1,value1){
								if(value1.type == "Cause"){
									addOption("#plan_formulation_Form #plancause", value1.subRiskValue.name, value1.id);
					    		}
							});
						}
					});
	        	}
				
				$('.plan_name').val(name);
				$("#plan_formulation_Form input[name='parentinfo']").val("Risk");
				$("#plan_formulation_Form #parentId").val(riskdata.subRiskValue.id);
				$("#plan_formulation_Form #type").val(riskdata.subRiskValue.type);
				$("#plan_formulation_Form #riskId").val(riskdata.riskId);
				$("#plan_formulation_Form #id").val(riskdata.id);
				$("#plan_formulation_Form #planresolveby").val(resolveby);
				$("#plan_formulation_Form #plancause").val(plancause);
				$("#plan_formulation_Form #planaction").val(planaction);
				
			}else if(action	==	"view"){
				$('#l5_name').html(name);
				$('#l5_type').html(subtypeval);
				$('#l5_resolveby').html(resolveby);
				//$('#l5_cause').html(plancause);
				if(causelistoptions !=	""){
					$.each(causelistoptions,function(index,value){
						if(value.id == riskdata.riskId){
							$.each(value.subRiskList,function(index1,value1){
								if(value1.id == plancause){
									$('#l5_cause').html(value1.subRiskValue.name);
					    		}
							});
						}
					});
	        	}
				$('#l5_action').html(planaction);
			}	
		}

		
		function subRiskEvent(riskId,id,action) {
			if(riskId	==	""){
				return false;
			}
			
      		formvalidationerrorreset();
			$("#subrisk_formulation_Form").trigger('reset');
			$("#subrisk_formulation_Form input[name='action']").val(action);
			$("#subrisk_formulation_Form input[name='id']").val(id);
			$("#subrisk_formulation_Form input[name='riskId']").val(riskId);
			
			$("#plan_formulation_Form").trigger('reset');
			$("#plan_formulation_Form input[name='action']").val(action);
			$("#plan_formulation_Form input[name='id']").val(id);
			$("#plan_formulation_Form input[name='riskId']").val(riskId);
			$("#plan_formulation_Form input[name='parentId']").val(0);
			
	        if (action == 'add') {
	        	$(".causeform").show();
	        	$(".planform").hide();
	        	$("#plan_formulation_Form #plancause").empty();
				$("#plan_formulation_Form #plancause").append('<option value="" data-i18n="Choose">Choose</option>');
				if(causelistoptions !=	""){
					$.each(causelistoptions,function(index,value){
						if(value.id == riskId){
							$.each(value.subRiskList,function(index1,value1){
								if(value1.type == "Cause"){
									addOption("#plan_formulation_Form #plancause", value1.subRiskValue.name, value1.id);
					    		}
							});
						}
					});
	        	}
				
	        	$(".modalheadersubprojectname").html("Cause Description");
			}else if (action == 'delete') {
				$("#deletescoreid").val(id);
				$("#deleterecordtype").val("subrisk");
				$('#deleteModalriskformulation').modal('toggle');
				$(window).on("resize", function(){
				    $(".modal:visible").each(alignModal);
				}); 
				$(".modal").on("shown.bs.modal", alignModal);
				
			} else { // view and edit
				
				if (action == 'view') {
					$('#view_risk_l2').modal('toggle');
				}
				
				$("#subrisk_formulation_Form input[name='id']").val(id);
				
				$.ajax({
					url: "/stratroom/subRisk/riskFormulation/" + id,
					success: function(data){
						subriskupdateDescription	=	data;
						subriskpopSuccessCallback(data,action);
					}
				});
			}
      }
		function subsectionriskpopSuccessCallback(riskdata,action) {
			var subtypeval	=	riskdata.activityValue.type;
			if(action	==	"edit"){
				$(".modalsubconseqheader").html('Edit');
				$('.cons_name').val(riskdata.activityValue.name);
				$("#consequence_formulation_Form #Rating").val(riskdata.activityValue.rating);
				if(riskdata.activityValue.type == 'Consequence')
					{
					$("#consequence_formulation_Form input[name='parentinfo']").val("Cause");
					}
				if(riskdata.activityValue.type == 'Action')
				{
					$("#consequence_formulation_Form input[name='parentinfo']").val("Plan");
				}
				$("#consequence_formulation_Form #parentId").val(riskdata.subRiskId);
				$("#consequence_formulation_Form #type").val(riskdata.activityValue.type);
				$("#consequence_formulation_Form #riskId").val(riskdata.subRiskId);
				$("#consequence_formulation_Form #id").val(riskdata.id);
				
			}else if(action	==	"view"){
				$('#l2_name').html(riskdata.activityValue.name);
				$('#l2_type').html(riskdata.activityValue.type);
				$('#l2_rating').html(riskdata.activityValue.rating);

			}	
	}
		
	function subriskpopSuccessCallback(riskdata,action) {
		var subtypeval	=	riskdata.subRiskValue.type;
		if(action	==	"edit"){
			$(".causeform").show();
        	$(".planform").hide();
        	$('#subrisk_formulation_Form #Type').find('option').remove().end().append('<option value="Cause">Cause</option>');
			$(".modalheadersubprojectname").html("Cause Description");
			$('.subrisk_name').val(riskdata.subRiskValue.name);
			$("#subrisk_formulation_Form #Type").val(riskdata.subRiskValue.type);
			$("#subrisk_formulation_Form #Rating").val(riskdata.subRiskValue.rating);

		}else if(action	==	"view"){
			$('#l2_name').html(riskdata.subRiskValue.name);
			$('#l2_type').html(riskdata.subRiskValue.type);
			$('#l2_rating').html(riskdata.subRiskValue.rating);

		}	
	}
	
	$(document).on("change",".causeplantype",function(){
		var value	=	$(this).val();
		if(value	==	"Cause"){
			formvalidationerrorreset();
			//$("#subrisk_formulation_Form").trigger('reset');
			$("#subrisk_formulation_Form .causeplantype").val('Cause');
			if($("#subrisk_formulation_Form .subrisk_name").val()	!=	''){
				
			}else{
				$("#subrisk_formulation_Form .subrisk_name").val('');
			}
			
			$("#subrisk_formulation_Form #Rating").val('');
			$(".causeform").show();
			$(".planform").hide();
			$(".modalheadersubprojectname").html("Cause Description");
			$("#risk_formulation_Form").trigger('reset');
		}else{
			formvalidationerrorreset();
			//$("#plan_formulation_Form").trigger('reset');
			$("#plan_formulation_Form .plan_name").val('');
			$("#plan_formulation_Form #planaction").val('');
			$("#plan_formulation_Form #plancause").val('');
			$("#plan_formulation_Form #planresolveby").val('');
			$("#plan_formulation_Form .causeplantype").val('Plan');
			$(".planform").show();
			$(".causeform").hide();
			$(".modalheadersubprojectname").html("Plan Description");
		}
	});
	
	function checkmodalisclosedornot(){
		if($('#add_lv_formulation').is(':visible')	==	true){
			$(document.body).addClass('modal-open');				
		}		
		setTimeout(function(){  $(document.body).addClass('modal-open');
		}, 1000);
	}
					
	$("#activities_current_id").click(function(){
		checkmodalisclosedornot();
	});
	
	
		
     	function getformulationObj(action) {
			var riskObj = {
				"owner": $("#risk_formulation_Form  #Risk_owner").val(),
				"formulationId": pageNo,
				"createdBy": currentEmp,
				"department": $("#risk_formulation_Form #riskfordepartment option:selected").text(),
				"departmentId": $("#risk_formulation_Form #riskfordepartment").val(),
				"impactId": 0,
				"riskValue": {
					"name": $("#risk_formulation_Form  .persp_name").val(),
					"dateraised": $("#risk_formulation_Form  #kpi_start_end_date").val(),
					"impact": $("#risk_formulation_Form  #Impact").val(),
					"likelihood": $("#risk_formulation_Form  #Likelihood").val(),
					"category": $("#risk_formulation_Form  #Category").val(),
					"status":  $("#risk_formulation_Form  #Status").val(),
					"score":  $("#risk_formulation_Form  #Score").val()
				}
			}
			
			return riskObj;
		}
    	
     	function subinitiativePorfileContent(usersimg,resultId){
     		var subinitiativeUser	=	"";
     		var returnresult	=	[];
     		var functionParams	=	resultId+','+'"edit"';
     		var functionName	=	"";
     		var modalPopupName	=	"";
     		var profileBadgeIncrement 	=	"";
     		if(usersimg !=	undefined){
     			profileBadgeIncrement	=	(usersimg.length >= 3?parseInt(usersimg.length)-parseInt(2):"");	
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
     		
     		//var htmlcontent	=	'<input type="hidden" value="'+userseslectedData.join(',')+'" id="activities_selected_user_'+resultId+'">';
     		//returnresult['userownerlist_data']	=	htmlcontent;
     		functionName	=	"handleMultioownersuserevent";
     		
     		if(usersimg !=	undefined && usersimg.length 	!=	0){
     			var badgeincrement	=	false;		
     			$.each(usersimg,function(index,users){
     				var username	=	hasWhiteSpaceName(users.name);
     				if(username == "" ||	username == " "){
     					username	=	"User";
     				}
     							
     				var userProfileConcate = ((users.image ==	undefined || users.image == "")?'data-name="'+username+'" class="rounded-circle swotuserimage" ':' class="rounded-circle" src="'+users.image+'"');		
     				subinitiativeUser 	+=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
     				if(usersimg.length >= 3 && index >= 2 && index <= 2){
     					subinitiativeUser 	=	subinitiativeUser.replace('<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>','');
     					subinitiativeUser 	+=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
     					badgeincrement	=	true;
     					return false;
     				}
     			});
     			if(badgeincrement	==	false){
     				subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+</span></li>';
     			}
     		}else{
     			var users 	=	topparentswotDetails;
     			var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
     			var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotuserimage' ":" class='rounded-circle' src='"+users.image+"'");
     			subinitiativeUser 	=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
     			subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+</span></li>';
     		}
     		returnresult['userownerlist']	=	subinitiativeUser;
     		return returnresult;
     	}
		
     	$(document).on("click","input[name='activities_owner[]']",function(){
    		
    		var multiowners	= 	$("input[name='activities_owner[]']:checked").map(function(){
            	return this.value;
        	}).get();
    		
    		var employeedids	=	$("#approvedresetIDs").val();
    		if(multiowners.length	==	0){
    			employeedids	=	currentEmp;
    			$("#approvedresetIDs").val(currentEmp);
    		}else{
    			employeedids	=	multiowners.join(',');
    			$("#approvedresetIDs").val(multiowners.join(','));
    		}
    		
    		var methodType 		= 	'post';
    		
    		var	pageUrl = "/stratroom/status/riskFormulation";
    		var status	=	$("#statusofflag").val();
    		if(status	==	""){
    			return false;
    		}
    		var statusdata	=	{};
    		if(employeedids	==	"" || employeedids	==	null){
    			employeedids	=	currentEmp;
    		}
    		employeedids	=	employeedids.split(',');
    		statusdata	=	{id:pageNo,status:status,employeeIDs:employeedids};
    		
    		$.ajax({
    			url : pageUrl,
    			type : methodType,
    			contentType : "application/json",
    			data : JSON.stringify(statusdata),
    			success : function(data, status) {
    				// $.notify("Updated Successfully");
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
			
			var imageElement 	=	"approve_by";
			$("#searchactivities").val('');
		    $("#activities_search2").show();
		    $("#activities_search_section2").hide();
			var userseslectedData 	=	[];
			var selectedSubinitiativeOwner = $("#user_edit_popup input[name='activities_owner[]']:checked").each(function(index){
				userseslectedData.push(parseInt($(this).val()));
			});
		
			var functionParams	=	pageNo+','+'"edit"';
			var functionName	=	"handleMultioownersuserevent";
			var modalPopupName	=	"#user_edit_popup";
			$("#approvedresetIDs").val(userseslectedData.join(','));
			
			if(!jQuery.isEmptyObject(userseslectedData)){
				$.ajax({
					url: "/stratroom/user/moduleAccessUserList?moduleName=Risk Formulation",
					success : function(data, status) {
						var subinitiativeUser	=	"";
						if(userseslectedData.length !=	data.length){
							var profileBadgeIncrement 	=	(userseslectedData.length >= 3?parseInt(userseslectedData.length)-parseInt(2):"");
							var badgeinc	=	false;
							$.each(data,function(key,users){
									$.each(userseslectedData,function(index,selectedvalue){
										if(selectedvalue ==	users.id){
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
										}
									});
							});
							if(badgeinc	==	false){
								subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+'+profileBadgeIncrement+'</span></li>';
							}
						}
						if(userseslectedData.length ==	data.length){
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
						}
							
						$("#"+imageElement).html('');
						$("#"+imageElement).html(subinitiativeUser);
						$('.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
					}
				});
			}else{
				var users 	=	topparentswotDetails;
				$("#approvedresetIDs").val(users.id);
				userseslectedData.push(users.id);
				var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
				var userProfileConcate = ((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotmultiuserimage' ":"src='"+users.image+"' class='rounded-circle'");
				subinitiativeUser 	=	'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><img '+userProfileConcate+' alt="'+username+'" width="50"></li>';
				subinitiativeUser 	=	subinitiativeUser+'<li class="avatar avatar-sm" onclick='+functionName+'('+functionParams+')><span _ngcontent-hhc-c5="" class="badge">+</span></li>';
				$("#"+imageElement).html('');
				$("#"+imageElement).html(subinitiativeUser);
				$('.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
			}
		});		

  
		function populateOwnerDropdownRisk(elementId) {
			var numberOfOptions = $(elementId + ' > option').length;
		
			if (jQuery.isEmptyObject(completereporteeList)) {
				$.ajax({
					url : "/stratroom/user/moduleAccessUserList?moduleName=Risk Formulation",
					async:false,
					success : function(employeeList) {
						completereporteeList 	=	employeeList;
					}
				});
			} else if (numberOfOptions < 2) {
				$.each(completereporteeList, function (index, reportee) {
					addOption(elementId, reportee.name, reportee.id)
				});
			}
		}
		
		function populateDeptList(elementId) {
			var numberOfOptions = $(elementId + ' > option').length;
			if (jQuery.isEmptyObject(deptlist)) {
				$.ajax({
					url : "/stratroom/allDepartmentList",
					async:false,
					success : function(kpiListValue) {
						deptlist 	= 	kpiListValue;
						$.each(deptlist, function(index, kpiObj) {
							if(kpiObj !=	""){
								addOption(elementId, kpiObj.name, kpiObj.id)
							}
						});
					}
				});
			} else if (numberOfOptions < 2) {
				$.each(deptlist, function(index, reportee) {
					if(reportee !=	""){
						addOption(elementId, reportee.name, reportee.id)
					}
				});
			}
		}
		

	function getSubRiskObj(action) {
			
			var objectiveObj = {
				"riskId":$("#subrisk_formulation_Form input[name='riskId']").val(),
				"subRiskValue" : {
					"name" : $(".subrisk_name").val(),
					"type":"Cause",
					"rating": $("#subrisk_formulation_Form #Rating").val()
				}
			}
			
	
		return  objectiveObj;
		   
	}
 
$( "#subrisk_formulation_Form" ).validate({
	  rules: {
	    name:{
	    	required: true
	    },
	    Type:{
	    	required: true
	    },Rating: {
	      required: true
	    }
	  },
	   messages: {
          required: "Required field missing"
      },
      submitHandler: function(form) {
      	handleSubRiskSave();
      }
	});
        		
	function handleSubRiskSave(){
		var action	=	$("#subrisk_formulation_Form input[name='action']").val();
	    var subriskobj = 	getSubRiskObj(action);
	    var methodType 	= 	'post';
		var id		=	$("#subrisk_formulation_Form input[name='id']").val();
		if(action	==	"edit" && id !=	0){
			subriskobj.id 		= 	(id !=	""?id:"");	
		}
		
		subriskobj.subRiskValue.multipleowners = currentEmp;


	    $.ajax({
	        url: "/stratroom/subRisk/riskFormulation/",
	        type: methodType,
	        contentType: "application/json",
	        data: JSON.stringify(subriskobj),
	        success: function (data, status) {
	        	localStorage.setItem("riskinitiativeid",subriskobj.riskId+'-'+pageNo);
	            location.reload(true);
	        },
			error:readErrorMsg
	    });
	}
	
	function getSubSectionRiskObj(action,riskId,parentId, sectiontype) {
		
		var objectiveObj = {
			//"riskId":riskId,
			"subRiskId":parentId,
			"activityValue" : {
				"name" : $(".cons_name").val(),
				"type":sectiontype,
				"rating": $("#consequence_formulation_Form #Rating").val(),
				"id":parentId
			}
		}
		

	return  objectiveObj;
	   
}
	
	$( "#consequence_formulation_Form" ).validate({
		  rules: {
		    name:{
		    	required: true
		    },Type:{
		    	required: true
		    },Rating: {
		      required: true
		    }
		  },
		   messages: {
	          required: "Required field missing"
	      },
	      submitHandler: function(form) {
	      	handleSubRiskSectionSave();
	      }
		});
	        		
		function handleSubRiskSectionSave(){
			var action	=	$("#consequence_formulation_Form input[name='action']").val();
			var riskId = $("#consequence_formulation_Form input[name='riskId']").val()
			var parentId = $("#consequence_formulation_Form input[name='parentId']").val()
			var typeval = $("#consequence_formulation_Form input[name='parentinfo']").val()
			var sectiontype="";
			if (typeval == 'Cause')
				{
				sectiontype = 'Consequence'
				}
			if (typeval == 'Plan')
			{
				sectiontype = 'Action'
			}
			
		    var subsectionriskobj = 	getSubSectionRiskObj(action,riskId,parentId, sectiontype);
		    var methodType 	= 	'post';
			var id		=	$("#consequence_formulation_Form input[name='id']").val();
			if(action	==	"edit" && id !=	0){
				subsectionriskobj.id 		= 	(id !=	""?id:"");	
			}
			
			subsectionriskobj.activityValue.multipleowners = currentEmp;

			
		    $.ajax({
		        url: "/stratroom/activity/riskFormulation/",
		        type: methodType,
		        contentType: "application/json",
		        data: JSON.stringify(subsectionriskobj),
		        success: function (data, status) {
		        	localStorage.setItem("riskinitiativeid",riskId+'-'+pageNo);
		            location.reload(true);
		        },
				error:readErrorMsg
		    });
		}

		$( "#action_formulation_Form" ).validate({
			  rules: {
			    name:{
			    	required: true
			    },Type:{
			    	required: true
			    },resolveby: {
			      required: true
			    },Status: {
			      required: true
			    }
			  },
			   messages: {
		          required: "Required field missing"
		      },
		      submitHandler: function(form) {
		      	handleSubActionSectionSave();
		      }
			});
		
		function getSubSectionActionObj(action,riskId,parentId, sectiontype) {
			
			var objectiveObj = {
				//"riskId":riskId,
				"subRiskId":parentId,
				"activityValue" : {
					"name" : $(".action_name").val(),
					"type":sectiontype,
					"id":parentId,
					"status":$("#actionStatus").val(),
					"resolveby":$("#actionresolveby").val()
				}
			}
			

		return  objectiveObj;
		   
	}
		
		function handleSubActionSectionSave(){
			var action	=	$("#action_formulation_Form input[name='action']").val();
			var riskId = $("#action_formulation_Form input[name='riskId']").val()
			var parentId = $("#action_formulation_Form input[name='parentId']").val()
			var typeval = $("#action_formulation_Form input[name='parentinfo']").val()
			var sectiontype="";
			if (typeval == 'Plan')
			{
				sectiontype = 'Action'
			}
			
		    var subsectionriskobj = 	getSubSectionActionObj(action,riskId,parentId, sectiontype);
		    var methodType 	= 	'post';
			var id		=	$("#action_formulation_Form input[name='id']").val();
			if(action	==	"edit" && id !=	0){
				subsectionriskobj.id 		= 	(id !=	""?id:"");	
			}
			
			subsectionriskobj.activityValue.multipleowners = currentEmp;

			
		    $.ajax({
		        url: "/stratroom/activity/riskFormulation/",
		        type: methodType,
		        contentType: "application/json",
		        data: JSON.stringify(subsectionriskobj),
		        success: function (data, status) {
		        	localStorage.setItem("riskinitiativeid",riskId+'-'+pageNo);
		            location.reload(true);
		        },
				error:readErrorMsg
		    });
		}
		
		$( "#plan_formulation_Form" ).validate({
			  rules: {
			    name:{
			    	required: true
			    },Type:{
			    	required: true
			    },planaction: {
			      required: true
			    },plancause: {
			      required: true
			    },planresolveby: {
				      required: true
				    }
			  },
			   messages: {
		          required: "Required field missing"
		      },
		      submitHandler: function(form) {
		      	handleSubPlanSectionSave();
		      }
			});
		
		function handleSubPlanSectionSave(){
			var action	=	$("#plan_formulation_Form input[name='action']").val();
			var riskId = $("#plan_formulation_Form input[name='riskId']").val()
			var parentId = $("#plan_formulation_Form input[name='parentId']").val()
			var sectiontype="Plan";
		    var subsectionriskobj = 	getSubSectionPlanObj(action,riskId,parentId, sectiontype);
		    var methodType 	= 	'post';
			var id		=	$("#plan_formulation_Form input[name='id']").val();
			if(action	==	"edit" && id !=	0){
				subsectionriskobj.id 		= 	(id !=	""?id:"");	
			}
			
			subsectionriskobj.subRiskValue.multipleowners = currentEmp;

			
		    $.ajax({
		        url: "/stratroom/subRisk/riskFormulation/",
		        type: methodType,
		        contentType: "application/json",
		        data: JSON.stringify(subsectionriskobj),
		        success: function (data, status) {
		        	localStorage.setItem("riskinitiativeid",riskId+'-'+pageNo);
		            location.reload(true);
		        },
				error:readErrorMsg
		    });
		}
		
		function getSubSectionPlanObj(action,riskId,parentId, sectiontype) {
			
			var objectiveObj = {
				"riskId":riskId,
				"subRiskValue" : {
					"name" : $(".plan_name").val(),
					"type":sectiontype,
					"action":$("#planaction").val(),
					"plancause":$("#plancause").val(),
					"resolveby":$("#planresolveby").val()
				}
			}
			

		return  objectiveObj;
		   
	}

function handleriskFormulationdelete(){
	
	var id	=	$("#deletescoreid").val();
	var type=	$("#deleterecordtype").val();
	if(id	==	"" || type	==	""){
		return false;
	}
	var requestmethod	=	"delete";
	var url	=	"";
	if(type	==	"Risk"){
		url	=	"/stratroom/risk/riskFormulation/" + id;
	}else if(type	==	"subrisk"){
		url	=	"/stratroom/subRisk/riskFormulation/" + id;
	}else if(type	==	"subriskactivities"){
		url	=	"/stratroom/activity/riskFormulation/" + id;
	}
	
	$.ajax({
		url : url,
		type : requestmethod,
		contentType : "application/json",
		success : function(data, status) {
			location.reload(true);
		},
		error : readErrorMsg
	});
}


	$(document).on("click",".departmentlist li",function () {
		$(".departmentlist li a").removeClass("selected-group");
		$(".departmentlist li").removeClass("selected-group");
		var department	=	$.trim($(this).text());
		var departmentval	=	$(this).find(".filterdept").attr("data-value");
		
		if (department == "All") {
		  	$("#displayText").text("All");
		  	$(this).addClass("selected-group");
		}else{
		  	$("#displayText").text(department);
		  	$(this).addClass("selected-group");
		}
		
		var	pageUrl = "/stratroom/formulationRiskList?formulationId="+pageNo;
		if(department	!=	"All"){
			var departmentencode = encodeURIComponent(departmentval);
			pageUrl = "/stratroom/formulationRiskList?formulationId="+pageNo+"&department="+departmentencode;
		}
		$(".page-loader-wrapper").show();
		$.ajax({
			url : pageUrl,
			async: false,
			success : function(data){
				causelistoptions	=	data;
				localStorage.setItem("riskinitiativeid","");
				formulationSuccessCallback(data,department);
			},
			error:function(){
				$(".page-loader-wrapper").hide();
			}
		});
	});
      
      $("#selectall").click(function () {
        if ($(this).is(":checked")) {
          $(".user-select-check input").attr("checked", true);
        } else {
          $(".user-select-check input").attr("checked", false);
        }
      });

      $("li:last-child").each(function () {
        $this = $(this);
        // Check if LI has children
        if ($this.children("ul").length === 0) {
          // Add border-left in every UL where the last LI has not children
          $this.closest("#tree ul").css("border-left", "1px solid gray");
        } else {
          $this.closest("ul").css("margin-top", "20px");
          // Add margin in other levels of the list
          $this
            .closest("ul")
            .find("li")
            .children("ul")
            .css("margin-top", "20px");
        }
      });
  	$(".approve_reset").on("click", function (e) {
    	e.stopPropagation();
  	});

  	$(document).on("click","body",function(e){
  		if ($(e.target).hasClass('approvedmaintain') || $(e.target).hasClass('approve_reset') || $(e.target).hasClass('fa-check-circle') || $(e.target).hasClass('fa-undo')) {
  	        return false;
  	    }
  		$(".approveditem,.approve_reset").removeClass('show');
  	});
  	
  	$(document).on("click",".approvedmaintain",function () {
		$('[data-toggle="tooltip"]').tooltip("hide");
		var status	=	$(this).attr("data-status");
		if(status ==	""){
			return false;
		}
		if($(".formulationlist").length	==	0){
			$.notify("Error: No Risk added in risk formulation so you will not be able to approve", {
							  style: 'error',
							  className: 'graynotify'
							});
				return false;
		}
		
		var	pageUrl = "/stratroom/status/riskFormulation";
		var statusdata	=	{};
		var employeedids,originalempids	=	$("#approvedresetIDs").val();
		if(employeedids	==	"" || employeedids	==	null){
			employeedids	=	currentEmp;
		}
		employeedids	=	employeedids.split(',');
		if(status	==	"Approved"){
			statusdata	=	{id:pageNo,status:"Pending",employeeIDs:employeedids};
		}else{
			statusdata	=	{id:pageNo,status:"Approved",employeeIDs:employeedids};
		}
		
		$(".page-loader-wrapper").show();
		$.ajax({
			url : pageUrl,
			type: 'post',
	        contentType: "application/json",
	        data: JSON.stringify(statusdata),
			async: false,
			success : function(data){
				$(".page-loader-wrapper").hide();
				if(data !=	undefined && data	==	true){
					
						$.each(completereporteeList,function(ownkey,empvalue){
							if(empvalue.id	==	currentEmp){
								topparentswotDetails	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
							}
						});
						
						var	pageUrl = "/stratroom/riskFormulation/"+pageNo+"?loadFlag=false";
						$.ajax({
							url : pageUrl,
							async: false,
							success : function(data){
								var approvedresetIDs	=	[];
								if(data.employeeList !=	undefined && data.employeeList !=	"" && data.employeeList !=	null){
									employeeselectedItems	=	data.employeeList;	
									$.each(data.employeeList,function(key,values){
										approvedresetIDs.push(values.id);
									});
									$("#approvedresetIDs").val(approvedresetIDs.join(','));
								}else{
									employeeselectedItems	=	[];
									$("#approvedresetIDs").val(data.updatedBy);
								}
								
								if(data.status !=	undefined && data.status !=	""){
									$.each(completereporteeList,function(ownkey,empvalue){
										if(empvalue.id	==	data.updatedBy){
											topparentswotDetails	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
										}
									});	
									approvedformulationdate	=	data.updatedTime;
								}
							}
						});
						
						
						approvedformulationdate	=	new Date(approvedformulationdate);
						var datestring 	= 	approvedformulationdate.getDate()  + "/" + (approvedformulationdate.getMonth()+1) + "/" + approvedformulationdate.getFullYear();
						var users 	=	topparentswotDetails;
						var username 	=	((users.name ==	undefined || users.name == "")?"User":users.name);
						var userProfileConcate 	= 	((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotmultiuserimage' ":" class='rounded-circle' src='"+users.image+"'");
						var subinitiativeUser 	=	'<li class="avatar avatar-sm"><img '+userProfileConcate+' alt="'+username+'"></li>'; 
						
										
					if(status	==	"Approved"){
						$("#statusofflag").val('Pending');
						var resultPorfileContent	=	subinitiativePorfileContent(employeeselectedItems,pageNo);
						formulationStatusflag	=	false;
						if(riskformodPermission.privilegeUpdate !=	undefined && riskformodPermission.privilegeUpdate == "TRUE"){
							editpermission	=	true;
						}
						if(riskformodPermission.privilegeDelete !=	undefined && riskformodPermission.privilegeDelete == "TRUE"){
							deletepermission	=	true;
						}
						
						if(enableaccesscontrolMenu	==	true){
							//editpermission		=	true;
							//deletepermission	=	true;
						}
	
						$(".approvedmaintain").html('<i style="font-size: 14px; font-weight: 600" class="far fa-check-circle" data-toggle="tooltip" data-placement="bottom" title="Approve"></i>');
						$(".approvedmaintain").attr("data-status","Pending");
						$(".addriskformulation").attr("data-toggle","modal");
						$(".addriskformulation").attr("data-target","#add_risk_l1");
						$(".uploadbtn").attr("data-target",".file_upload_popup")
						$(".uploadbtn").attr("data-toggle","modal")
						$(".approve_reset").html(`<li style="padding: 16px 16px 0px 16px">
				                <div class="form-group">
				                  <label for="Name">Reset By</label>
				                  <div class="owner" style="padding-right: 12px">
				                    <ul class="list-unstyled order-list" id="approve_by" data-toggle="modal" data-target="#user_edit_popup" style="cursor: pointer;">
				                      `+resultPorfileContent['userownerlist']+`
				                    </ul>
				                  </div>
				                </div>
				              </li>
				              <li style="padding: 16px 16px 16px 16px">
				                <div class="form-group">
				                  <label for="Name">Reset Date</label>
				                  <input
				                    type="text"
				                    class="form-control browser-default"
				                    value="`+datestring+`"
				                    readonly
				                  />
				                </div>
				              </li>`);
						$('[data-toggle="tooltip"]').tooltip();
					}else{
						var resultPorfileContent	=	subinitiativePorfileContent(employeeselectedItems,pageNo);
						$("#statusofflag").val('Approved');
						formulationStatusflag	=	true;
						editpermission		=	false;
						deletepermission	=	false;
						$(".addriskformulation").removeAttr("data-toggle");
						$(".addriskformulation").removeAttr("data-target");
						$(".uploadbtn").removeAttr("data-toggle");
						$(".uploadbtn").removeAttr("data-target");
						$(".approvedmaintain").html('<i style="font-size: 14px; font-weight: 600" class="far fa-undo" data-toggle="tooltip" data-placement="bottom" title="Reset"></i>');
						$(".approvedmaintain").attr("data-status","Approved");
						
						$(".approve_reset").html(`<li style="padding: 16px 16px 0px 16px">
				                <div class="form-group">
				                  <label for="Name">Approved By</label>
				                  <div class="owner" style="padding-right: 12px">
				                    <ul class="list-unstyled order-list" id="approve_by" data-toggle="modal" data-target="#user_edit_popup" style="cursor: pointer;">
				                      `+resultPorfileContent['userownerlist']+`
				                    </ul>
				                  </div>
				                </div>
				              </li>
				              <li style="padding: 16px 16px 16px 16px">
				                <div class="form-group">
				                  <label for="Name">Approved Date</label>
				                  <input
				                    type="text"
				                    class="form-control browser-default"
				                    value="`+datestring+`"
				                    readonly
				                  />
				                </div>
				              </li>`);
						$('[data-toggle="tooltip"]').tooltip();
					}
					$('.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
					$(".approveditem,.approve_reset").addClass('show');
					
					var	pageUrl = "/stratroom/formulationRiskList?formulationId="+pageNo;
					$.ajax({
						url : pageUrl,
						async: false,
						success : function(data){
							causelistoptions	=	data;
							formulationSuccessCallback(data,'');
						},
						error:function(){
							$(".page-loader-wrapper").hide();
						}
					});
				}
			},
			error:function(){
				$(".page-loader-wrapper").hide();
			}
		});
		$('.swotuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
	});

var file;

function readFile(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		file = input.files[0];
		reader.onload = function () {
			var htmlPreview =
				'<div class="box-body-border">' +
				'<img width="20" src="../stratroom/images/file-icon.png"/>' +
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

$("#uploadnext-btn-1").click(function () {
	if(!$("input[name='img_logo']").val()){
		$.notify("Error:Kindly select a file",{
							  style: 'error',
							  className: 'graynotify'
							});
		return false;
	}
	
	var file		=	$("input[name='img_logo']")[0].files[0];
	$("#validateImportHide").empty();
	$("#file-upload").hide();
	$("#file-validate").show();
	$("#file-save").hide();
	$(".form-progressbar li:nth-child(2)").addClass("active");
	var formdata = new FormData();
	formdata.append("riskFormulationData", file);
	$(".page-loader-wrapper").css("display", "block");
	if(file !=	"" && file != undefined) {
		$.ajax({
			url: "/stratroom/import/riskFormulation?type=validation",
			type: "POST",
			data: formdata,
			processData: false,
			contentType: false,
			success: function (data, status) {
				initiativeUploadNotFoundData(data,data.parsingError)
				$(".page-loader-wrapper").css("display", "none");
			},
			error:function(data){
				$(".page-loader-wrapper").hide();
				readErrorMsg(data);	
			}
		});
	}else {
		$("#fileerrorshow").html('Please select upload file');
		$("#fileerrorshow").show();
		$(".page-loader-wrapper").css("display", "none");
		$("#file-upload").show();		
		$("#file-validate").hide();
		$("#file-validate1").hide();
		$("#file-save").hide();
		$(".form-progressbar li:nth-child(1)").removeClass("active");
		$(".form-progressbar li:nth-child(2)").removeClass("active");
	}
});

$(document).on('click', '#next-btn-2', function() {	
	$("#file-upload").hide();
	$("#file-validate").hide();
	$("#file-save").show();
	$(".form-progressbar li:nth-child(3)").addClass("active");
	var formdata = new FormData();
	var file	=	$('input[name="img_logo"]')[0].files[0];
	formdata.append("riskFormulationData", file);
	$(".page-loader-wrapper").css("display", "block");
	$.ajax({
		url: "/stratroom/import/riskFormulation?type=save",
		type: "POST",
		data: formdata,
		processData: false,
		contentType: false,
		success: function (data, status) {		
			$(".page-loader-wrapper").css("display", "none");
			initiativeUploadSuccess(data);
		},
	});
});

$(document).on('click', '#prev-btn1', function() {	
	$(".uploadvalidationSuccess").empty();	
	$("#validateImportHide").empty();	
	$("#file-upload").show();
	$("#file-validate").hide();
	$("#file-save").hide();
	$(".form-progressbar li:nth-child(2)").removeClass("active");
	$(".form-progressbar li:nth-child(1)").addClass("active");
});

$(document).on('click', '#prev-btn2', function() {	
	$(".uploadStatististics").empty();	
	$("#statisticmessage").html("");
	$(".error-div").hide();
	$("#file-upload").hide();
	$("#file-validate").show();
	$("#file-save").hide();
	$(".form-progressbar li:nth-child(3)").removeClass("active");
	$(".form-progressbar li:nth-child(2)").addClass("active");
});

function initiativeUploadNotFoundData(data,result) {
	$(".uploadvalidationSuccess").empty();	
	var initiative_import_error;
	
	if(!jQuery.isEmptyObject(data) && data.result	==	"Not-Success"){
		$("#imagevalidate").attr("src","images/Not-Verified.png");
		validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
		'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
	}
	if(!jQuery.isEmptyObject(data) && (data.result	==	"success" || data.result	==	"Success")){
		$(".error-div").hide();
		$("#imagevalidate").attr("src","images/Success.png");
		validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
		'<button class="initative_save_btn pull-right" id="next-btn-2" style="font-weight: 600;">Next</button>';
	}
	
	$.each(result, function (i, List) {
		initiative_import_error = '<tr>' +
			'<td style="width: 150px; text-align: center;">' + List.Excel_SheetName + '</td>' +			
			'<td style="width: 150px; text-align: center; ">' + List.rowNo + '</td>' +
			'<td style="width: 150px; text-align: center;">' + List.highLightcellName + '</td>' +
			'<td style="width: 250px; text-align: center;">' + List.error + '</td>' +
			'</tr>';
		$(".uploadvalidationSuccess").append(initiative_import_error);
	});	
	
	/*if(result != undefined){					
		$("#imagevalidate").attr("src","../stratroom/images/Not-Verified.png");
		$(".error-div").show();

		var validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
			'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;cursor: not-allowed;" disabled>Next</button>';		
	}*/ 
	if (jQuery.isEmptyObject(data)) {
		$(".error-div").hide();
		$("#imagevalidate").attr("src","images/Not-Verified.png");
		
		validateImport ='<button type="button" class="btn-default1 btn" id="prev-btn1" style="font-weight: 600;">Previous</button>'+
		'<button class="initative_save_btn pull-right checkbuttoncolor" id="next-btn-2" style="font-weight: 600;" disabled>Next</button>';
	}				
	$("#validateImportHide").append(validateImport);
}

function initiativeUploadSuccess(data) {
	$(".uploadStatististics").empty();	
	$(".error-div").show();
	$("#imagevalidate").attr("src","images/Success.png");
	//$("#statisticmessage").append('Import Successful');
	initiativeStatististics('No of Risk formulation Processed',(data.no_of_processed !=	undefined?data.no_of_processed:""));
	initiativeStatististics('No of Risk formulation created',(data.no_of_created !=	undefined?data.no_of_created:""));
	initiativeStatististics('No of Risk formulation updated',(data.no_of_updated !=	undefined?data.no_of_updated:""));
	initiativeStatististics('No of Failed',(data.no_of_failed != undefined?data.no_of_failed:""));
	
}

function initiativeStatististics(staticsvalue,fnresult) {
	var initiative_Statististics = '<tr>' +
	'<td style="width: 300px; text-align: left;">'+staticsvalue+'</td>' +
	'<td style="width: 300px; text-align: center;">' +fnresult+ '</td>' +	
	'</tr>';
	$(".uploadStatististics").append(initiative_Statististics);
}

$(document).on('click', '#done-btn', function() {					
	location.reload(true);
});

$(document).on('click',".close",function () {
	$(".box-body").empty();
	$("#fileerrorshow").html("");
	$("#statisticmessage").html("");
	$("#file-upload").show();
	$("#file-validate").hide();
	$("#file-save").hide();
	$(".form-progressbar li:nth-child(1)").removeClass("active");
	$(".form-progressbar li:nth-child(2)").removeClass("active");
	$(".form-progressbar li:nth-child(3)").removeClass("active");
});

$(document).on("click",".uploadbtn",function(){
		if(formulationStatusflag	==	true){
		$.notify("Error: This is approved formulation so you will not able to add", {
					  style: 'error',
					  className: 'graynotify'
					});
		return false;
	}
});


function handleMultioownersuserevent(id,action) {
	$("#user_edit_popup").modal("toggle");
	var imageElement 	=	"approve_by";
	
	var data 	=	{};
	$("#activities-ini-box_view_users").html('');
	$("#activities-ini-box_view_users").html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
	$.ajax({
		url: "/stratroom/user/moduleAccessUserList?moduleName=Risk Formulation",
		async:false,
		success : function(result,status){
			var subinitiativeUser 	=	"";
			var ischecked 	=	"";
			var selectedItem 	=	[];
			
			if($("#approvedresetIDs").length){
				selectedItem	=	$("#approvedresetIDs").val().split(',');
			}	
			
			var datas 	=	[];
			$.each(result, function(index, users) {
				datas.push(users.id);
			});
			
			if(result.length	==	0){
				$(".showactivitiesusers").css('display','none');
			}
			
			if(result.length	==	selectedItem.length){
				$("#allusersactivities").prop("checked","checked");
			}else{
				$("#allusersactivities").prop("checked",false);
			}
			
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
			$('.swotuserimage,.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
		}
	});
}	

$(document).on("click","#allusersactivities",function(){
	
	var propcheck	=	$(this).is(":checked");
	if(propcheck	==	true){
		$("#activities-ini-box_view_users input[name='activities_owner[]']").each(function(index,value){
			$(this).prop("checked","checked");
		});
		
		var multiowners	= 	$("input[name='activities_owner[]']:checked").map(function(){
	    	return this.value;
		}).get();
		var employeedids	=	multiowners.join(',');
	}
	if(propcheck	==	false){
		$("#activities-ini-box_view_users input[name='activities_owner[]']").each(function(index,value){
			$(this).prop("checked",false);
		});
		
		var multiowners	=	$("#approvedresetIDs").val();
		var employeedids	=	multiowners;
	}
	
	var methodType 		= 	'post';
	
	var	pageUrl = "/stratroom/status/riskFormulation";
	var status	=	$("#statusofflag").val();
	if(status	==	""){
		return false;
	}
	var statusdata	=	{};
	if(employeedids	==	"" || employeedids	==	null){
		employeedids	=	currentEmp;
	}
	employeedids	=	employeedids.split(',');
	statusdata	=	{id:pageNo,status:status,employeeIDs:employeedids};
	
	$.ajax({
		url : pageUrl,
		type : methodType,
		contentType : "application/json",
		data : JSON.stringify(statusdata),
		success : function(data, status) {
			// $.notify("Updated Successfully");
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

$(document).on("click","body",function(e){
	var element	=	e.target;
	if($(element).hasClass("getselectedActivitiesUsers") || $(element).hasClass("form-check-sign") || $(element).hasClass("form-check-input") || $(element).hasClass("approve_reset")){
		if(!$(".approvedmaintain").hasClass("show")){
			$(".approvedmaintain").addClass("show");
		}
		if(!$(".approve_reset").hasClass("show")){
			$(".approve_reset").addClass("show");
		}
	}else{
		$(".approvedmaintain").removeClass("show");
		$(".approve_reset").removeClass("show");
	}
});

/*$(".submitevent").click(function(){
	var impactbusi	=	$("#risk_formulation_Form #department").val();
	$(".chosen-container-single").find('label.error').remove();
	if(impactbusi	==	"" || impactbusi	==	undefined){
		$(".chosen-container-single").append('<label id="strength_type-error" class="error" for="strength_type">This field is required.</label>');
		return false;
	}else{
		$(".chosen-container-single").find('label.error').remove();
	}
});*/

