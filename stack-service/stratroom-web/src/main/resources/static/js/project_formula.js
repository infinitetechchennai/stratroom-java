var currentEmp		=	$("#userPrincipal").val();
var nodeKeyMap = new Object();
var formulationupdateDescription	=	[];
var subinitiativeupdateDescription	=	[];
var formulationstrageylist	=	[];
var projectformodPermission	=	[];
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
var employeeselectedItems	=	{};

var initiativescreatepermission	=	false;
var initiativesviewpermission	=	false;
var	initiativeseditpermission	=	false;
var	initiativesdeletepermission	=	false;
	
var subinitiativescreatepermission	=	false;
var milestonecreatepermission	=	false;
var activitiescreatepermission	=	false;

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

function getprojectpermission(){
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName=Project Formulation",
		async:false,
		success : function(data) {
			$.each(data,function(forindex,fordata){
				if(forindex	==	"Project Formulation"){
					projectformodPermission	=	fordata.Formulation;
					
					if(fordata.Initiatives.privilegeCreate !=	undefined && fordata.Initiatives.privilegeCreate == "TRUE"){	
						initiativescreatepermission	=	true;
					}
					if(fordata.Initiatives.privilegeUpdate !=	undefined && fordata.Initiatives.privilegeUpdate == "TRUE"){
						initiativeseditpermission	=	true;
					}
					if(fordata.Initiatives.privilegeDelete !=	undefined && fordata.Initiatives.privilegeDelete == "TRUE"){
						initiativesdeletepermission	=	true;
					}
					if(fordata.Initiatives.privilegeView !=	undefined && fordata.Initiatives.privilegeView == "TRUE"){
						initiativesviewpermission	=	true;
					}
					
					if(fordata.Activities.privilegeCreate !=	undefined && fordata.Activities.privilegeCreate == "TRUE"){	
						activitiescreatepermission	=	true;
					}
					if(fordata.Milestones.privilegeCreate !=	undefined && fordata.Milestones.privilegeCreate == "TRUE"){	
						milestonecreatepermission	=	true;
					}
					
					$.each(fordata,function(forindex1,fordata1){
						if(forindex1	==	"Sub Initiatives"){
							if(fordata1.privilegeCreate !=	undefined && fordata1.privilegeCreate == "TRUE"){	
								subinitiativescreatepermission	=	true;
							}
						}
					});
				}
			});
		}
	});
}


$(function () {		
	getpageName();
	getprojectpermission();
	getreportee();
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
	      "background-color": "grey !important"
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
	
	if(projectformodPermission.privilegeCreate !=	undefined && projectformodPermission.privilegeCreate == "TRUE"){	
		createpermission	=	true;
	}
	
	if(projectformodPermission.privilegeUpdate !=	undefined && projectformodPermission.privilegeUpdate == "TRUE"){
		editpermission	=	true;
	}
	
	if(projectformodPermission.privilegeDelete !=	undefined && projectformodPermission.privilegeDelete == "TRUE"){
		deletepermission	=	true;
	}
	
	if(projectformodPermission.privilegeView !=	undefined && projectformodPermission.privilegeView == "TRUE"){
		viewpermission	=	true;
	}
	
	if(enableaccesscontrolMenu	==	true){
		//createpermission	=	true;
		//editpermission		=	true;
		//deletepermission	=	true;
		//viewpermission		=	true;
	}
	
	
	if(createpermission	==	false && enableaccesscontrolMenu	==	false){
		$(".addprojectformulation").remove();
		$(".uploadbtn").remove();
		$(".approvedmaintain").hide()
	}
	if(deletepermission	==	false && enableaccesscontrolMenu	==	false){
		$(".deleteformulation").remove();
	}
	
	$.each(reporteelist,function(ownkey,empvalue){
		if(empvalue.id	==	currentEmp){
			topparentswotDetails	=	{"id":empvalue.id,"name":empvalue.name,"image":empvalue.image,"dept":empvalue.dept};
		}
	});
	
	if(pageNo	!=	""){
		$(".exceldownloadlink").attr("href","download/formulationDetails?formulationId="+pageNo);
	}else{
		$(".exceldownloadlink").attr("href","#");
		$(".exceldownloadlink").removeAttr("target");
	}
	
	if(createpermission	==	false && editpermission	==	false && viewpermission	==	false && deletepermission	==	false){
		$(".exportprojectformulation").remove();
	}
	
	var	pageUrl = "/stratroom/projectFormulation/"+pageNo+"?loadFlag=false";
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
					$(".addprojectformulation").removeAttr("data-toggle");
					$(".addprojectformulation").removeAttr("data-target");
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
			
	var	pageUrl = "/stratroom/formulationInitiativesList?formulationId="+pageNo;
	$.ajax({
		url : pageUrl,
		async: false,
		success : function(data){
			formulationSuccessCallback(data,'');
		},
		error:function(){
			$(".page-loader-wrapper").hide();
		}
	});
	$('[rel="tooltip"]').tooltip();
});

function getreportee() {
	
	if (jQuery.isEmptyObject(reporteelist)) {
		$.ajax({
			url: "/stratroom/user/moduleAccessUserList?moduleName=Project Formulation",
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
					addOptionDept(".departmentlist", kpiObj.name, kpiObj.id)
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
		$.each(data, function (index, initiative) {
			var subdaterangeformatted	=	"";
			var id	=	initiative.id;
			if (initiative.initiativeValue.daterange != undefined && initiative.initiativeValue.daterange != '') {
				var daterange = initiative.initiativeValue.daterange;
				if (daterange.includes("-")) {
					var dateval = daterange.split('-');
					subdaterangeformatted = new Date(dateval[0]).toLocaleDateString('en-GB', {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				}) + " - " + new Date(dateval[1]).toLocaleDateString('en-GB', {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				});
				}
			}
			
			var showhighlightpanel	=	localStorage.getItem("projectinitiativeid");
			
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
			if(initiative.department !=	"" && typeof(initiative.department)== "string"){
				departmentname	=	initiative.department;
			}else{
				if(deptlist !=	""){
					$.each(deptlist,function(index,deptindex){
						if(deptindex.id	==	initiative.department){
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
                          `+initiative.initiativeValue.name+`
                        </h4>
                      </div>
                      <div class="col-md-auto" style="min-width: 15%;max-width: 15%;overflow: hidden;">
                        <p style="margin:0;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">`+departmentname+`</p>
                      </div>
                      <div class="col-md-auto">
                        <p>`+subdaterangeformatted+`</p>
                      </div>`;
				
				var deptpush	=	departmentname+'-'+initiative.department;
				if(deptpush !=	"" && deptpush !=	undefined && (deptfilter	==	"" || deptfilter	==	"success")){
					if ( $.inArray( deptpush, departmentlist ) == -1 ) {
						departmentlist.push(deptpush);
					}
				}
				
                var InitiativeOptions	=	"";
				if(deletepermission	==	false && viewpermission	==	false && editpermission	==	false){
					InitiativeOptions	=	"";
				}else{
					InitiativeOptions	=	`<ul class="header-dropdown" style="margin-top: 20px;">
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
						InitiativeOptions	+=	`<li><a href="#" data-toggle="modal" data-target="#view_formulation" onclick="projectFormulationAdd(`+id+`,'view');">View</a></li>`;
					}
				
					if(editpermission	==	true && !formulationStatusflag){
						InitiativeOptions	+=	`<li><a href="#" data-toggle="modal" data-target="#add_formulation" onclick="projectFormulationAdd(`+id+`,'edit')">Edit</a></li>`;
					}
					
					if(deletepermission	==	true && !formulationStatusflag){
						InitiativeOptions	+=	`<li><a href="#" onclick="projectFormulationAdd(`+id+`,'delete')">Delete</a></li>`;
					}
					
					InitiativeOptions	+=	`</ul></li></ul>`;
				}
                      
                bodyRows +=	`<div class="col-lg-1">
                        `+InitiativeOptions+`
                        </div>
                    </div>
                  </a>
                </div>
              </div>`;
              
			var subinitiativebody	=	``;
			var subinitiativeadd	=	``;
			var incr	=	0;
			
			if(initiative.subInitiativeList !=	undefined && initiative.subInitiativeList !=	""){
				$.each(initiative.subInitiativeList, function (subindex, subinitiative) {
					incr++;
					var subid	=	subinitiative.id;
					var subinitdaterangeformatted	=	"";
					if (subinitiative.subInitiativeValue.daterange != undefined && subinitiative.subInitiativeValue.daterange != '') {
						var daterange = subinitiative.subInitiativeValue.daterange;
						if (daterange.includes("-")) {
							var dateval = daterange.split('-');
							subinitdaterangeformatted = new Date(dateval[0]).toLocaleDateString('en-GB', {
								day: 'numeric',
								month: 'short',
								year: 'numeric'
							}) + " - " + new Date(dateval[1]).toLocaleDateString('en-GB', {
								day: 'numeric',
								month: 'short',
								year: 'numeric'
							});
						}else{
							
							subinitdaterangeformatted = new Date(daterange).toLocaleDateString('en-GB', {
								day: 'numeric',
								month: 'short',
								year: 'numeric'
							});
						}
					}
					
					var sunInitiativeOptions	=	"";
					if(initiativesviewpermission	==	false && initiativeseditpermission	==	false && initiativesdeletepermission	==	false){
						sunInitiativeOptions	=	"";
					}else{
						sunInitiativeOptions	=	`<ul class="header-dropdown" style="margin-top: 20px;">
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
						
						if(initiativesviewpermission	==	true){
							sunInitiativeOptions	+=	`<li><a href="#" data-toggle="modal" data-target="#view_lv_formulation" onclick="subInitiativeEvent(`+id+`,`+subid+`,'view');">View</a></li>`;
						}
					
						if(initiativeseditpermission	==	true && !formulationStatusflag){
							sunInitiativeOptions	+=	`<li><a href="#" data-toggle="modal" data-target="#add_lv_formulation" onclick="subInitiativeEvent(`+id+`,`+subid+`,'edit')">Edit</a></li>`;
						}
						
						if(initiativesdeletepermission	==	true && !formulationStatusflag){
							sunInitiativeOptions	+=	`<li><a href="#" onclick="subInitiativeEvent(`+id+`,`+subid+`,'delete')">Delete</a></li>`;
						}
						
						sunInitiativeOptions	+=	`</ul></li></ul>`;
					}
					
					//if((subindex >= 0 && subindex <= 3)){				
						subinitiativebody	+=	`<div
		                id="collapse`+id+`"
		                class="panel-collapse collapse `+collapsedshowornot+`"
		                role="tabpanel"
		                aria-labelledby="heading1"
		              >
		                <div class="panel-body">
		                  <div class="panel-title">
		                    <div class="row" style="margin-left: -8px">
		                      <div class="col-auto pr-0 branch-border">
		                        <span> </span>
		                      </div>
		                      <input type="hidden" value="`+initiative.initiativeValue.daterange+`" id="parentdaterange_`+id+`">
		                      <div class="col">
		                        <h4>`+subinitiative.subInitiativeValue.name+`
		                        </h4>
		                      </div>
		                      <div class="col-md-auto">
		                        <p>`+subinitdaterangeformatted+`</p>
		                      </div>
		                      <div class="col-lg-1">`+sunInitiativeOptions+`</div>
		                    </div>
		                  </div>
		                </div>
		              </div>`;
	              
	              //}
	              
	              //if(incr >= 4){
		              //	subinitiativeadd	=	``;		              
	              	//}else{
	              		if((initiativescreatepermission	==	true || subinitiativescreatepermission	==	true || milestonecreatepermission	==	true || activitiescreatepermission	==	true) && formulationStatusflag ==	false){
	              		subinitiativeadd	=	`
		              <div
		                id="collapse`+id+`"
		                class="panel-collapse collapse `+collapsedshowornot+`"
		                role="tabpanel"
		                aria-labelledby="heading1"
		              >
		                <div class="panel-body" id="last-child">
		                  <div class="panel-title">
		                    <div class="row" style="margin-left: -8px">
		                      <div class="col-auto pr-0 branch-border">
		                        <span> </span>
		                      </div>
		                      <input type="hidden" value="`+initiative.initiativeValue.daterange+`" id="parentdaterange_`+id+`">
		                      <div class="col">
		                        <span
		                          data-toggle="modal"
		                          data-target="#add_lv_formulation"
		                          style="margin-left: -20px"
		                        >
		                          <i class="fas fa-plus border-box" onclick="subInitiativeEvent(`+id+`,'0','add')"></i>
		                        </span>
		                      </div>
		                    </div>
		                  </div>
		                </div>
		              </div>`;
		              }
	              		
	              	//}
				});
			}else{
			
				if((initiativescreatepermission	==	true || subinitiativescreatepermission	==	true || milestonecreatepermission	==	true || activitiescreatepermission	==	true) && formulationStatusflag ==	false){
						subinitiativeadd	=	`
		              <div
		                id="collapse`+id+`"
		                class="panel-collapse collapse `+collapsedshowornot+`"
		                role="tabpanel"
		                aria-labelledby="heading1"
		              >
		                <div class="panel-body" id="last-child">
		                  <div class="panel-title">
		                    <div class="row" style="margin-left: -8px">
		                      <div class="col-auto pr-0 branch-border">
		                        <span> </span>
		                      </div>
		                      <input type="hidden" value="`+initiative.initiativeValue.daterange+`" id="parentdaterange_`+id+`">
		                      <div class="col">
		                        <span
		                          data-toggle="modal"
		                          data-target="#add_lv_formulation"
		                          style="margin-left: -20px"
		                        >
		                          <i class="fas fa-plus border-box" onclick="subInitiativeEvent(`+id+`,'0','add')"></i>
		                        </span>
		                      </div>
		                    </div>
		                  </div>
		                </div>
		              </div>`;
		              
		           }
			}	
			
            bodyRows 	+=	subinitiativebody;
            bodyRows 	+=	subinitiativeadd+`</div></div>`;
		});
		$(".formulationlist").html(bodyRows);	
	}
	if(deptfilter	==	""){
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

      	function projectFormulationAdd(id,action) {
      		
        	
      		formvalidationerrorreset();
			$("#project_formulation_Form").trigger('reset');
			$("#project_formulation_Form input[name='action']").val(action);
			$('#project_formulation_Form #Initiative_owner').find('option').remove().end();
			$('#project_formulation_Form #formulationDept').find('option').remove().end();
			$('#project_formulation_Form #formulationDept').append(`<option value="">Select Department</option>`);
			$('#project_formulation_Form #Initiative_owner').append(`<option value="">Select Owner</option>`);
			populateOwnerDropdownInitiative('#add_formulation #Initiative_owner');
			populateDeptList('#formulationDept');
			
			
			
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
	        	//$("#project_formulation_Form #formulationDept").trigger("chosen:updated");
				// when adding
				//$("#Initiative_owner").val(currentEmp);
	        	$(".modalheaderprojectname").html("Add");
			}else if (action == 'delete') {
				$("#deletescoreid").val(id);
				$("#deleterecordtype").val("formularregister");
				$('#deleteModalprojectformulation').modal('toggle');
				$(window).on("resize", function(){
				    $(".modal:visible").each(alignModal);
				}); 
				$(".modal").on("shown.bs.modal", alignModal);
				
			} else { // view and edit
				
				if (action == 'view') {
					$('#ownername,#viewname,#viewdepart,#viewtype,#viewdate,#viewbudget,#viewforecast').html('');
				}
				
				$("#project_formulation_Form input[name='id']").val(id);
				
				$.ajax({
					url: "/stratroom/initiatives/projectFormulation/" + id,
					success: function(data){
						formulationupdateDescription	=	data;
						initiativepopSuccessCallback(data,action);
					}
				});
			}
      }
      
	function initiativepopSuccessCallback(initiativedata,action) {
		if(action	==	"edit"){
			$(".modalheaderprojectname").html("Edit");
			if(initiativedata.owner	==	""){
				//$("#Initiative_owner").val(currentEmp);
			}else{
				$('#Initiative_owner').val(initiativedata.owner);
			}
			$('#Initiative_owner').select2({
				selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
				dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
			});
			$('.persp_name').val(initiativedata.initiativeValue.name);
			$("#formulationDept").val(initiativedata.departmentId);
			$('#formulationDept').select2({
				  selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
				  dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
				});
			$("#formulationtype").val(initiativedata.initiativeValue.type);
			$("#startDate").val(initiativedata.initiativeValue.daterange);
			$("#budget").val(initiativedata.initiativeValue.Total);
			$("#forecast").val(initiativedata.initiativeValue.forecastval);
		}else if(action	==	"view"){
			$('#ownername').html(initiativedata.initiativeValue.ownerName);
			$('#viewname').html(initiativedata.initiativeValue.name);
			$("#viewdepart").html(initiativedata.department);
			/*if(deptlist !=	""){
				$.each(deptlist,function(index,deptindex){
					if(deptindex.id	==	initiativedata.department){
						$("#viewdepart").html(deptindex.name);
						return false;
					}
				});
			}*/
			$("#viewtype").html(initiativedata.initiativeValue.type);
			$("#viewbudget").html(initiativedata.initiativeValue.Total)
			var subdaterangeformatted	=	"";
			if (initiativedata.initiativeValue.daterange != undefined && initiativedata.initiativeValue.daterange != '') {
				var daterange = initiativedata.initiativeValue.daterange;
				if (daterange.includes("-")) {
					var dateval = daterange.split('-');
					subdaterangeformatted = new Date(dateval[0]).toLocaleDateString('en-GB', {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				}) + " - " + new Date(dateval[1]).toLocaleDateString('en-GB', {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				});
				}
			}
			
			$("#viewdate").html(subdaterangeformatted);
			$("#viewbudget").html(initiativedata.initiativeValue.Total);
			$("#viewforecast").html(initiativedata.initiativeValue.forecastval);
		}	
	}

	/*$('.chosen-select').chosen({}).change( function(obj, result) {
		$(".chosen-container-single").find('label.error').remove();
    	if(result.selected	==	"" || result.selected	==	undefined){
			$('*[id=formulationDept-error]').each(function() {
			    $(this).remove();
			});
			//$(".chosen-container-single").append('<label id="formulationDept-error" class="error" for="formulationDept">This field is required.</label>');
		}else{
			$(".chosen-container-single").find('label.error').remove();
		}
	});*/
	
	//$.validator.setDefaults({ ignore: ":hidden:not(.chosen-select)" });

	$.validator.addMethod('startDatePattern', function (value) { 
		return /. - ./.test(value); 
	}, 'Please enter a valid start and end Date.');

    $( "#project_formulation_Form" ).validate({
    	  rules: {
    	    name:{
    	    	required: true
    	    },formulationDept:{
    	    	required: true
    	    },formulationtype:{
    	    	required: true
    	    },startDate:{
    	    	required: true, startDatePattern : "Required Date "
    	    }
    	    //,Initiative_owner:{
    	    	//required: true
    	    //}
    	  },
    	  errorPlacement: function(error, element) {
  	    	if((element.hasClass('select2') && element.next('.select2-container').length) || (element.hasClass('selectroleuser') && element.next('.select2-container').length)) {
  		        error.insertAfter(element.next('.select2-container'));
  		    }else{
  		    	error.insertAfter(element);
  		    }
  	   },
    	   messages: {
              required: "Name is required"
          },
          submitHandler: function(form) {
          	handleformulationSave();
          }
    	});
            		
		function handleformulationSave(){
			var action	=	$("#project_formulation_Form input[name='action']").val();
		    var swotObj = 	getformulationObj(action);
		    var methodType = 'post';
			var id	=	$("#project_formulation_Form input[name='id']").val();
			if(action	==	"edit"){
				swotObj.id 		= 	(id !=	""?id:"");	
			}
			
		    $.ajax({
		        url: "/stratroom/initiatives/projectFormulation",
		        type: methodType,
		        contentType: "application/json",
		        data: JSON.stringify(swotObj),
		        success: function (data, status) {
		        	localStorage.setItem("projectinitiativeid",data.id+'-'+pageNo);
		            location.reload(true);
		        },
				error:readErrorMsg
		    });
		}
	
	function subInitiativeEvent(initiativeid,id,action) {
			if(initiativeid	==	""){
				return false;
			}
			
			if(subinitiativescreatepermission	==	false){
				$("#subtype option[value='Sub initiative']").remove()
			}
			
			if(activitiescreatepermission	==	false){
				$("#subtype option[value='Activity']").remove()
			}
			if(milestonecreatepermission	==	false){
				$("#subtype option[value='Milestone']").remove()
			}
			
      		formvalidationerrorreset();
			$("#subinitiatives_Form").trigger('reset');
			$("#subinitiatives_Form input[name='action']").val(action);
			$("#subinitiatives_Form input[name='id']").val(id);
			
			var parentdaterange	=	$("#parentdaterange_"+initiativeid).val();
			
			$("#subinitiatives_Form input[name='initiativeid']").val(initiativeid);	
	        if (action == 'add') {
	        	$(".modalheadersubprojectname").html("Add");
				// when adding
				var resultPorfileContent	=	activitiessubinitiativePorfileContent([],0);
				$("#subinitiativeowners").html(resultPorfileContent['userownerlist_data']);
				$(".subownerlist").html(resultPorfileContent['userownerlist']);
				$(".subownerlist").attr("id","initiativeactivitieUser0");
				$('.swotuserimage').initial({
					charCount: 2,
					height: 30,
					width: 30,
					fontSize: 18
				});
				if(parentdaterange !=	"" && parentdaterange !=	undefined && parentdaterange !=	null){
					var splitdataerant	=	parentdaterange.split('-');
					var startdate = new Date($.trim(splitdataerant[0]));
					var enddate = new Date($.trim(splitdataerant[1]));
					$("#subdaterange").datepicker({
						language: 'en',
						minDate: startdate,
						maxDate: enddate,
						range: true,
						autoClose: true,
						position: "top left",
						//todayButton: true,
						onSelect: function (fd) {
						}
					});
				}else{
					$("#subdaterange").datepicker({
						language: 'en',
						range: true,
						autoClose: true,
						position: "top left",
						//todayButton: true,
						onSelect: function (fd) {
						}
					});
				}	
			}else if (action == 'delete') {
				$("#deletescoreid").val(id);
				$("#deleterecordtype").val("subinitiatives");
				$('#deleteModalprojectformulation').modal('toggle');
				$(window).on("resize", function(){
				    $(".modal:visible").each(alignModal);
				}); 
				$(".modal").on("shown.bs.modal", alignModal);
				
			} else { // view and edit
				
				if (action == 'view') {
					$('#view_lv_formulation').modal('toggle');
					$('#viewsubname,#viewsubdate,#viewsubtype,.viewsubownerlist').html('');
				}
				
				$("#subinitiatives_Form input[name='id']").val(id);
				
				$.ajax({
					url: "/stratroom/subinitiatives/projectFormulation/" + id,
					success: function(data){
						subinitiativeupdateDescription	=	data;
						subinitiativepopSuccessCallback(data,action);
					}
				});
			}
      }
	
	function subinitiativepopSuccessCallback(initiativedata,action) {
		var subtypeval	=	initiativedata.type;
		var parentdaterange	=	$("#parentdaterange_"+$("#subinitiatives_Form input[name='initiativeid']").val()).val();
		if(action	==	"edit"){
			$(".modalheadersubprojectname").html("Edit");
			$('.sub_name').val(initiativedata.subInitiativeValue.name);
			$("#subtype").val(initiativedata.type);
			if(subtypeval	==	"Milestone"){
				$(".ownermilestone").hide();
				var milestonedate	=	`<label for="Name">End Date</label>
	                <input
	                  type="text" name="subdaterange" id="subdaterange"
	                  class="form-control persp_date browser-default date_pickers_bottom datepicker-here" 
	                  data-language="en"
	                  value="" autocomplete="off"
	                />`;
				$(".milestonesubdaterange").html(milestonedate);
				if(parentdaterange !=	"" && parentdaterange !=	undefined && parentdaterange !=	null){
					var splitdataerant	=	parentdaterange.split('-');
					var startdate = new Date($.trim(splitdataerant[0]));
					var enddate = new Date($.trim(splitdataerant[1]));
					$("#subdaterange").datepicker({
						language: 'en',
						minDate: startdate,
						maxDate: enddate,
						autoClose: true,
						position: "top left",
						todayButton: true,
						onSelect: function (fd) {
						}
					});
				}else{
					$("#subdaterange").datepicker({
						language: 'en',
						autoClose: true,
						position: "top left",
						todayButton: true,
						onSelect: function (fd) {
						}
					});
				}
			}else{
				$(".ownermilestone").show();
				var milestonedate	=	`<label for="Name">Start / End Date</label>
	                <input
	                  type="text" name="subdaterange" id="subdaterange"
	                  class="form-control persp_date browser-default date_pickers_bottom datepicker-here"
	                  data-range="true"
	                  data-multiple-dates-separator=" - "
	                  data-language="en"
	                  value="" autocomplete="off"
	                />`;
				$(".milestonesubdaterange").html(milestonedate);
				
				if(parentdaterange !=	"" && parentdaterange !=	undefined && parentdaterange !=	null){
					var splitdataerant	=	parentdaterange.split('-');
					var startdate = new Date($.trim(splitdataerant[0]));
					var enddate = new Date($.trim(splitdataerant[1]));
					$("#subdaterange").datepicker({
						language: 'en',
						minDate: startdate,
						maxDate: enddate,
						range: true,
						autoClose: true,
						position: "top left",
						//todayButton: true,
						onSelect: function (fd) {
						}
					});
				}else{
					$("#subdaterange").datepicker({
						language: 'en',
						range: true,
						autoClose: true,
						position: "top left",
						//todayButton: true,
						onSelect: function (fd) {
						}
					});
				}
			}
			$("#subdaterange").val(initiativedata.subInitiativeValue.daterange);
			$("#subinitiativeowners").html('');
			$(".subownerlist").html('');
			if(initiativedata.employeeList !=	undefined && initiativedata.employeeList !=	""){
				var resultPorfileContent	=	activitiessubinitiativePorfileContent(initiativedata.employeeList,initiativedata.id);
				$(".subownerlist").attr("id","initiativeactivitieUser"+initiativedata.id);
				$("#subinitiativeowners").html(resultPorfileContent['userownerlist_data']);
				$(".subownerlist").html(resultPorfileContent['userownerlist']);
			}
			$('.swotuserimage').initial({
				charCount: 2,
				height: 30,
				width: 30,
				fontSize: 18
			});
		}else if(action	==	"view"){
			$('#viewsubname').html(initiativedata.subInitiativeValue.name);
			$('#viewsubtype').html(initiativedata.type);
			var subdaterangeformatted	=	"";
			if (initiativedata.subInitiativeValue.daterange != undefined && initiativedata.subInitiativeValue.daterange != '') {
				var daterange = initiativedata.subInitiativeValue.daterange;
				if (daterange.includes("-")) {
					var dateval = daterange.split('-');
					subdaterangeformatted = new Date(dateval[0]).toLocaleDateString('en-GB', {
						day: 'numeric',
						month: 'short',
						year: 'numeric'
					}) + " - " + new Date(dateval[1]).toLocaleDateString('en-GB', {
						day: 'numeric',
						month: 'short',
						year: 'numeric'
					});
				}else{
					subdaterangeformatted = new Date(daterange).toLocaleDateString('en-GB', {
						day: 'numeric',
						month: 'short',
						year: 'numeric'
					});
				}
			}
			$("#viewsubdate").html(subdaterangeformatted);
			if(subtypeval	==	"Milestone"){
				$(".viewmilestonelable").text("End Date");
				$(".ownermilestone").hide();
			}else{
				$(".viewmilestonelable").text("Start / End Date");
				$(".ownermilestone").show();
			}
			if(initiativedata.employeeList !=	undefined && initiativedata.employeeList !=	""){
				var resultPorfileContent	=	activitiessubinitiativePorfileContent(initiativedata.employeeList,initiativedata.id);
				$(".viewsubownerlist").html(resultPorfileContent['userownerlist']);
			}
			$(".viewsubownerlist").css("pointer-events","none");
			$('.swotuserimage').initial({
				charCount: 2,
				height: 30,
				width: 30,
				fontSize: 18
			});				
		}	
	}
	
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
	

	
	function handleactivitiesMultioownersuserevent(id,action) {
		if(editpermission	==	false && createpermission	==	false){
			return false;
		}
		
		if($("#view_lv_formulation").is(":visible")){
			return false;
		}
		
		$("#activities_user_edit_popup").modal('toggle');
		var imageElement 	=	"initiativeactivitieUser"+id;
		var data 	=	{};
		if (action == 'edit') {
			$("#subactivities-ini-box_view_users").html('');
			$("#subactivities-ini-box_view_users").html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
			$("#activities_current_id").attr("data-activities_sub_current_id",id);
			
			$.ajax({
				url: "/stratroom/user/moduleAccessUserList?moduleName=Project Formulation",
				async:false,
				success : function(result,status){
					var subinitiativeUser 	=	"";
					var ischecked 	=	"";
					var selectedItem 	=	[];
					
					if($("#activities_selected_user_"+id).length){
						selectedItem	=	$("#activities_selected_user_"+id).val().split(',');
					}	
					
					if(result.length	==	0){
						$(".showsubactivitiesusers").css('display','none');
					}
					
					if(result.length	==	selectedItem.length){
						$("#allsubusersactivities").prop("checked","checked");
					}else{
						$("#allsubusersactivities").prop("checked",false);
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
						subinitiativeUser 	+=	'<div class="d-flex flex-row employe_content_border sub_initiative_details" data-namesearch="'+username+'"><div class="d-flex flex-column flex-fill profile_content"><div class="d-flex flex-row"><div class="form-check"><label class="form-check-label"><input id="" class="form-check-input" name="subactivities_owner[]" '+ischecked+' type="checkbox" value="'+users.id+'"><span class="form-check-sign"> <span class="check"></span></span></label></div><div class="d-flex flex-column init_flex_profile" style="margin-top: 3%;text-align: center;"><h5>'+users.name+'</h5></div><div class="img_details" style="width: 20%;"><img alt="'+username+'" '+userProfileConcate+'></div></div></div></div>';
					});
					$("#subactivities-ini-box_view_users").html('');
					$("#subactivities-ini-box_view_users").html(subinitiativeUser);
					$('.swotmultiuserimage').initial({ charCount : 2, height : 30, width : 30, fontSize : 18 });
				}
			});
			$('#activitiessub-ini-box_view').slimscroll({
				height: '340px',
				size: '3px',
				color: '#9c9c9c'
			});
		}
	}
		
     	function getformulationObj(action) {
			var initiativeObj = {
				"owner": $("#Initiative_owner").val(),
				"formulationId": pageNo,
				"createdBy": currentEmp,
				"department": $("#formulationDept option:selected").text(),
				"departmentId": $("#formulationDept").val(),
				"initiativeValue": {
					"name": $(".persp_name").val(),
					"daterange": $("#startDate").val(),
					"type": $("#formulationtype").val(),
					"Total": $("#budget").val(),
					"forecastval": $("#forecast").val()
				}
			}
		
			var existdatadonotupdate = ["name", "daterange", "type", "Total", "forecastval"];
			if (action == "edit" && (formulationupdateDescription !== undefined || formulationupdateDescription != "")) {
				$.each(formulationupdateDescription.initiativeValue, function (index, value) {
					if ($.inArray(index, existdatadonotupdate) == -1) {
						initiativeObj["initiativeValue"][index] = value;
					}
				});
			}
	
			return initiativeObj;
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
     	
     	function activitiessubinitiativePorfileContent(usersimg,resultId){
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
     		
     		var htmlcontent	=	'<input type="hidden" value="'+userseslectedData.join(',')+'" id="activities_selected_user_'+resultId+'">';
     		returnresult['userownerlist_data']	=	htmlcontent;

     		functionName	=	"handleactivitiesMultioownersuserevent";
     		
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

     	
    	function getstatusObj(status) {
			var initiativeObj = {
				"approvedBy": currentEmp,
				"id": pageNo,
				"status": status			
			
			}
		
	
			return initiativeObj;
		}
    	
    	$(document).on("click",".uploadbtn",function(){
      		if(formulationStatusflag	==	true){
        		$.notify("Error: This is approved formulation so you will not able to add", {
							  style: 'error',
							  className: 'graynotify'
							});
				return false;
        	}
    	});
    	
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
    		
    		var	pageUrl = "/stratroom/status/projectFormulation";
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
					url: "/stratroom/user/moduleAccessUserList?moduleName=Project Formulation",
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

		function populateOwnerDropdownInitiative(elementId) {
			var numberOfOptions = $(elementId + ' > option').length;
		
			if (jQuery.isEmptyObject(reporteelist)) {
				$.ajax({
					url: "/stratroom/reporteeList",
					async: false,
					success: function (employeeList) {
						reporteelist = employeeList;
						$.each(employeeList, function (index, reportee) {
							addOption(elementId, reportee.name, reportee.id)
						});
					}
				});
			} else if (numberOfOptions < 2) {
				$.each(reporteelist, function (index, reportee) {
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
		
		function populateobjectiveOwnerDropdownScorecard(elementId,formtypeElement) {
			var numberOfOptions = $(elementId + ' > option').length;
			$(elementId).empty();
			$(elementId).append('<option value="" data-i18n="Choose">Choose</option>');
			$.ajax({
				url : "/stratroom/user/moduleAccessUserList?moduleName=Project Formulation",
				async:false,
				success : function(employeeList) {
					completereporteeList = employeeList;
					$.each(employeeList, function(index, reportee) {
						addOption(elementId, reportee.name, reportee.id)
					});
				}
			});
		}
		
		function getSubinitiativeObj(action) {
			
				var objectiveObj = {
					"initiativeId":$("#subinitiatives_Form input[name='initiativeid']").val(),
					"subInitiativeValue" : {
						"name" : $(".sub_name").val(),
						"daterange" : $("#subdaterange").val(),
						"type":$("#subtype").val()
					}
				}
				

				var existdatadonotupdate = ["name", "daterange","type"];
				if (action == "edit" && (subinitiativeupdateDescription !== undefined || subinitiativeupdateDescription != "")) {
					$.each(subinitiativeupdateDescription.subInitiativeValue, function (index, value) {
						if ($.inArray(index, existdatadonotupdate) == -1) {
							objectiveObj["subInitiativeValue"][index] = value;
						}
					});
				}
			
			return  objectiveObj;
			   
		}
     
    $( "#subinitiatives_Form" ).validate({
    	  rules: {
    	    name:{
    	    	required: true
    	    },
    	    subtype:{
    	    	required: true
    	    },subdaterange: {
		      required: true
		    }
    	  },
    	   messages: {
              required: "Name is required"
          },
          submitHandler: function(form) {
          	handleSubinitiativeSave();
          }
    	});
    
		function handleSubinitiativeSave(){
			var action	=	$("#subinitiatives_Form input[name='action']").val();
		    var swotObj = 	getSubinitiativeObj(action);
		    var methodType 	= 	'post';
			var id		=	$("#subinitiatives_Form input[name='id']").val();
			if(action	==	"edit" && id !=	0){
				swotObj.id 		= 	(id !=	""?id:"");	
			}
			
			if ($("#activities_selected_user_"+id).val()) {
				swotObj.subInitiativeValue.multipleowners = $("#activities_selected_user_" + id).val();
			} else {
				swotObj.subInitiativeValue.multipleowners = currentEmp;
			}
			if(swotObj.subInitiativeValue.type	==	"Milestone"){
				swotObj.subInitiativeValue.multipleowners = currentEmp;
			}
			
			if(swotObj.subInitiativeValue.type	!=	"Milestone"){
				var startdate	=	"";
				var enddate		=	"";
				var parentdaterange	=	$("#parentdaterange_"+$("#subinitiatives_Form input[name='initiativeid']").val()).val();
				if (parentdaterange != undefined && parentdaterange != '' && parentdaterange !=	null) {
					var splitdataerant	=	parentdaterange.split('-');
					startdate 	= 	new Date($.trim(splitdataerant[0]));
					enddate 	= 	new Date($.trim(splitdataerant[1]));
				}
				
				var validatedate = $("#subdaterange").val();
				if (validatedate != undefined && validatedate.includes("-")) {
					if (startdate != "" && enddate != "") {
						var dateval = validatedate.split('-');
						if (new Date(dateval[0]) >= startdate && new Date(dateval[0]) <= enddate) {
						} else {
							$.notify('Failed: Start and end date should be between this formulation',{
									  style: 'error',
									  className: 'graynotify'
									});
							return false;
						}
						
						if (new Date(dateval[1]) >= startdate && new Date(dateval[1]) <= enddate) {
						} else {
							$.notify('Failed: Start and end date should be between this formulation',{
									  style: 'error',
									  className: 'graynotify'
									});
							return false;
						}
					}
				} else {
					$.notify('Failed: Invalidate date format',{
									  style: 'error',
									  className: 'graynotify'
									});
					return false;
				}
			}else{
				var startdate	=	"";
				var enddate		=	"";
				var parentdaterange	=	$("#parentdaterange_"+$("#subinitiatives_Form input[name='initiativeid']").val()).val();
				if (parentdaterange != undefined && parentdaterange != '' && parentdaterange !=	null) {
					var splitdataerant	=	parentdaterange.split('-');
					startdate 	= 	new Date($.trim(splitdataerant[0]));
					enddate 	= 	new Date($.trim(splitdataerant[1]));
				}
				
				var validatedate = $("#subdaterange").val();
				if (validatedate != undefined && validatedate !=	"") {
					if (startdate != "" && enddate != "") {
						if (new Date(validatedate) >= startdate && new Date(validatedate) <= enddate) {
						} else {
							$.notify('Failed: Start and end date should be between this formulation',{
									  style: 'error',
									  className: 'graynotify'
									});
							return false;
						}
						
						if (new Date(validatedate) >= startdate && new Date(validatedate) <= enddate) {
						} else {
							$.notify('Failed: Start and end date should be between this formulation',{
									  style: 'error',
									  className: 'graynotify'
									});
							return false;
						}
					}
				}
			}	
			
		    $.ajax({
		        url: "/stratroom/subinitiatives/projectFormulation",
		        type: methodType,
		        contentType: "application/json",
		        data: JSON.stringify(swotObj),
		        success: function (data, status) {
		        	localStorage.setItem("projectinitiativeid",swotObj.initiativeId+'-'+pageNo);
		            location.reload(true);
		        },
				error:readErrorMsg
		    });
		}
		

function handleproFormulationdelete(){
	
	var id	=	$("#deletescoreid").val();
	var type=	$("#deleterecordtype").val();
	if(id	==	"" || type	==	""){
		return false;
	}
	var requestmethod	=	"delete";
	var url	=	"";
	if(type	==	"formularregister"){
		url	=	"/stratroom/initiatives/projectFormulation/" + id;
	}else if(type	==	"subinitiatives"){
		url	=	"/stratroom/subinitiatives/projectFormulation/" + id;
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
		
		var	pageUrl = "/stratroom/formulationInitiativesList?formulationId="+pageNo;
		if(department	!=	"All"){
			pageUrl = "/stratroom/formulationInitiativesList?formulationId="+pageNo+"&department="+encodeURIComponent(departmentval);
		}
		
		$(".page-loader-wrapper").show();
		$.ajax({
			url : pageUrl,
			async: false,
			success : function(data){
				localStorage.setItem("projectinitiativeid",'');
				formulationSuccessCallback(data,department);
			},
			error:function(){
				$(".page-loader-wrapper").hide();
			}
		});
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
			$.notify("Error: No initiative added in project formulation so you cann't able to approve", {
							  style: 'error',
							  className: 'graynotify'
							});
				return false;
		}
		
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
			url : "/stratroom/status/projectFormulation",
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
						
						var	pageUrl = "/stratroom/projectFormulation/"+pageNo+"?loadFlag=false";
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
						var userProfileConcate 	= 	((users.image ==	undefined || users.image == "")?"data-name='"+username+"' class='rounded-circle swotuserimage' ":" class='rounded-circle' src='"+users.image+"'");
						var subinitiativeUser 	=	'<li class="avatar avatar-sm"><img '+userProfileConcate+' alt="'+username+'"></li>';
					
										
					if(status	==	"Approved"){
						$("#statusofflag").val('Pending');
						var resultPorfileContent	=	subinitiativePorfileContent(employeeselectedItems,pageNo);
						formulationStatusflag	=	false;
						if(projectformodPermission.privilegeUpdate !=	undefined && projectformodPermission.privilegeUpdate == "TRUE"){
							editpermission	=	true;
						}
						if(projectformodPermission.privilegeDelete !=	undefined && projectformodPermission.privilegeDelete == "TRUE"){
							deletepermission	=	true;
						}
						
						if(enableaccesscontrolMenu	==	true){
							//editpermission		=	true;
							//deletepermission	=	true;
						}
	
						$(".approvedmaintain").html('<i style="font-size: 14px; font-weight: 600" class="far fa-check-circle" data-toggle="tooltip" data-placement="bottom" title="Approve"></i>');
						$(".approvedmaintain").attr("data-status","Pending");
						$(".addprojectformulation").attr("data-toggle","modal");
						$(".addprojectformulation").attr("data-target","#add_formulation");
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
						$(".addprojectformulation").removeAttr("data-toggle");
						$(".addprojectformulation").removeAttr("data-target");
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
					
					var	pageUrl = "/stratroom/formulationInitiativesList?formulationId="+pageNo;
					$.ajax({
						url : pageUrl,
						async: false,
						success : function(data){
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
	
	$(document).on("change","#subtype",function(){
		var parentdaterange	=	$("#parentdaterange_"+$("#subinitiatives_Form input[name='initiativeid']").val()).val();
		var subtypeval	=	$(this).val();
		if(subtypeval	==	"Milestone"){
			$(".ownermilestone").hide();
			var milestonedate	=	`<label for="Name">End Date</label>
                <input
                  type="text" name="subdaterange" id="subdaterange"
                  class="form-control persp_date browser-default date_pickers_bottom datepicker-here" 
                  data-language="en"
                  value="" autocomplete="off"
                />`;
			$(".milestonesubdaterange").html(milestonedate);
			if(parentdaterange !=	"" && parentdaterange !=	undefined && parentdaterange !=	null){
				var splitdataerant	=	parentdaterange.split('-');
				var startdate = new Date($.trim(splitdataerant[0]));
				var enddate = new Date($.trim(splitdataerant[1]));
				$("#subdaterange").datepicker({
					language: 'en',
					minDate: startdate,
					maxDate: enddate,
					autoClose: true,
					position: "top left",
					todayButton: true,
					onSelect: function (fd) {
					}
				});
			}else{
				$("#subdaterange").datepicker({
					language: 'en',
					autoClose: true,
					position: "top left",
					todayButton: true,
					onSelect: function (fd) {
					}
				});
			}
			
		}else{
			var resultPorfileContent	=	activitiessubinitiativePorfileContent([],$("#subinitiatives_Form input[name='id']").val());
			$("#subinitiativeowners").html(resultPorfileContent['userownerlist_data']);
			$(".subownerlist").html(resultPorfileContent['userownerlist']);
			$(".subownerlist").attr("id","initiativeactivitieUser"+$("#subinitiatives_Form input[name='id']").val());
			$('.swotuserimage').initial({
				charCount: 2,
				height: 30,
				width: 30,
				fontSize: 18
			});
			$(".ownermilestone").show();
			var milestonedate	=	`<label for="Name">Start / End Date</label>
                <input
                  type="text" name="subdaterange" id="subdaterange"
                  class="form-control persp_date browser-default date_pickers_bottom datepicker-here"
                  data-range="true"
                  data-multiple-dates-separator=" - "
                  data-language="en"
                  value="" autocomplete="off"
                />`;
			$(".milestonesubdaterange").html(milestonedate);
			if(parentdaterange !=	"" && parentdaterange !=	undefined && parentdaterange !=	null){
				var splitdataerant	=	parentdaterange.split('-');
				var startdate = new Date($.trim(splitdataerant[0]));
				var enddate = new Date($.trim(splitdataerant[1]));
				$("#subdaterange").datepicker({
					language: 'en',
					minDate: startdate,
					maxDate: enddate,
					range: true,
					autoClose: true,
					position: "top left",
					//todayButton: true,
					onSelect: function (fd) {
					}
				});
			}else{
				$("#subdaterange").datepicker({
					language: 'en',
					range: true,
					autoClose: true,
					position: "top left",
					//todayButton: true,
					onSelect: function (fd) {
					}
				});
			}
		}
	});
	
	$(document).on("click","#allusersaccess",function(){
		if(editpermission	==	false && createpermission	==	false){
			return false;
		}
		var propcheck	=	$(this).is(":checked");
		if(propcheck	==	true){
			$("input[name='activities_owner[]']").each(function(index,value){
				$(this).prop("checked","checked");
			});
		}
		if(propcheck	==	false){
			$("input[name='activities_owner[]']").each(function(index,value){
				$(this).prop("checked",false);
			});
		}
	});
	
	$("#search2").click(function () {
        $("#search_section2").show();
        $("#search2").hide();
    });

	$("#close_search2").click(function () {
	    $("#search2").show();
	    $("#search_section2").hide();
	});
	
var file;

function readFile(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		file = input.files[0];
		reader.onload = function () {
			var htmlPreview =
				'<div class="box-body-border">' +
				'<img width="20" src="../images/file-icon.png"/>' +
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
	formdata.append("projectFormulationData", file);
	$(".page-loader-wrapper").css("display", "block");
	if(file !=	"" && file != undefined) {
		$.ajax({
			url: "/stratroom/import/projectFormulation?type=validation",
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
	formdata.append("projectFormulationData", file);
	$(".page-loader-wrapper").css("display", "block");
	$.ajax({
		url: "/stratroom/import/projectFormulation?type=save",
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
	initiativeStatististics('No of Project formulation Processed',(data.no_of_processed !=	undefined?data.no_of_processed:""));
	initiativeStatististics('No of Project formulation created',(data.no_of_created !=	undefined?data.no_of_created:""));
	initiativeStatististics('No of Project formulation updated',(data.no_of_updated !=	undefined?data.no_of_updated:""));
	initiativeStatististics('No of Failed',(data.no_of_failed !=	undefined?data.no_of_failed:""));
	
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


$(document).on("change", "#importinitiative", function (e) {
	e.preventDefault();
	var formdata = new FormData();
	if ($(this).prop('files').length > 0) {
		file = $(this).prop('files')[0];
		formdata.append("initiativeData", file);
	}
	$(".page-loader-wrapper").css("display", "block");
	$.ajax({
		url: "/stratroom/importBulkInitiativesDetails",
		type: "POST",
		data: formdata,
		processData: false,
		contentType: false,
		success: function (data, status) {
			$(".upLoadSuccessModal").modal("show");
			$("#getCode").text(data.result);
			initiativeUploadNotFoundData(data,data.parsingError)
			$(".fileuploadclose").trigger('click');
			$(".page-loader-wrapper").css("display", "none");
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
					$.notify("Error:" + errorparse.exception, {
							  style: 'error',
							  className: 'graynotify'
							});
				}
			}
		}
	});

});
	
	
	function usersfilter(fieldNameId) {
	    var input, filter, ul, li, a, i, txtValue;
	    input = document.getElementById(fieldNameId);
	    filter = input.value.toUpperCase();
	    ul = document.getElementById("activities-ini-box_view_users");
	    li = ul.getElementsByTagName("div h5");
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
	

  	
  	$("#searchusers").on("keyup", function() {
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
  	
  	
  	function handleMultioownersuserevent(id,action) {
  		if(editpermission	==	false && createpermission	==	false){
			return false;
		}
  		$("#user_edit_popup").modal("toggle");
  		var imageElement 	=	"approve_by";
  		
  		var data 	=	{};
  		$("#activities-ini-box_view_users").html('');
  		$("#activities-ini-box_view_users").html('<i class="fa fa-spinner fa-spin fa-10x fa-fw"></i>');
  		
  		$.ajax({
  			url: "/stratroom/user/moduleAccessUserList?moduleName=Project Formulation",
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
  		
  		$('#sub-ini-box_view').slimscroll({
			height: '340px',
			size: '3px',
			color: '#9c9c9c'
		});
  	}	

  	$(document).on("click","#allusersactivities",function(){
  		
  		var propcheck	=	$(this).is(":checked");
  		if(propcheck	==	true){
  			$("#activities-ini-box_view_users input[name='activities_owner[]']").each(function(index,value){
  				$(this).prop("checked","checked");
  			});
  			
  			var multiowners	= 	$("#activities-ini-box_view_users input[name='activities_owner[]']:checked").map(function(){
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
  		
  		var	pageUrl = "/stratroom/status/projectFormulation";
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
  	
$(document).on("click","#allsubusersactivities",function(){
  		
  		var propcheck	=	$(this).is(":checked");
  		if(propcheck	==	true){
  			$("#subactivities-ini-box_view_users input[name='subactivities_owner[]']").each(function(index,value){
  				$(this).prop("checked","checked");
  			});
  			
  			var multiowners	= 	$("#subactivities-ini-box_view_users input[name='subactivities_owner[]']:checked").map(function(){
  		    	return this.value;
  			}).get();
  		}
  		if(propcheck	==	false){
  			$("#subactivities-ini-box_view_users input[name='subactivities_owner[]']").each(function(index,value){
  				$(this).prop("checked",false);
  			});
  			
  			var ids	=	$("#activities_current_id").attr("data-activities_sub_current_id");
  			var multiowners	=	$("#activities_selected_user_"+ids).val();
  		}
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

  	
  	$("#activities_search1").click(function () {
  	    $("#activities_search_section1").show();
  	    $("#activities_search1").hide();
  	});

  	$("#activities_close_search1").click(function () {
  		$("#subsearchactivities").val('');
  	    $("#activities_search1").show();
  	    $("#activities_search_section1").hide();
  	    var value = $("#subsearchactivities").val().toLowerCase();
  		$("#subactivities-ini-box_view_users .employe_content_border h5").filter(function(e) {
  			var FindElement	=	$(this).closest("div.employe_content_border");
  			//var FindElement	=	$(this).closest("div.employe_content_border").find(".profile_content");
  			if($(this).text().toLowerCase().indexOf(value) > -1){
  				$(FindElement).attr("style","display:block !important");
  			}else{
  				$(FindElement).attr("style","display:none !important");
  			}
  	    });
  		$("#activities_search1").show();
  	    $("#activities_search_section1").hide();
  	});

  	$("#subsearchactivities").on("keyup", function() {
  		var value = $(this).val().toLowerCase();
  		$("#subactivities-ini-box_view_users .employe_content_border h5").filter(function(e) {
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
  		if($("#user_edit_popup").is(":visible")){
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
  		}
  	});
  	
  	
  	
  	$("#budget").on({
  	    keyup: function() {
  	    	formatCurrency($(this),"value");
  	    },keypress: function() {
  	    	formatCurrency($(this),"value");
  	    },
  	    blur: function() { 
  	    	formatCurrency($(this),"value", "blur");
  	    }
  	});
  	
  	$(document).on("click",".getActivitiesUsers",function(){
  		if(editpermission	==	false && createpermission	==	false){
  			return false;
  		}
  		$("#subsearchactivities").val('');
  	    $("#activities_search1").show();
  	    $("#activities_search_section1").hide();
  		var id = $("#activities_current_id").attr("data-activities_sub_current_id");
  		if((id ==	undefined || id ==	"" || id ==	" ")){
  			return false;
  		}
  		var imageElement 	=	"initiativeactivitieUser"+id;
  		
  		var userseslectedData 	=	[];
  		var selectedSubinitiativeOwner = $("#activities_user_edit_popup input[name='subactivities_owner[]']:checked").each(function(index){
  			userseslectedData.push(parseInt($(this).val()));
  		});

  		var functionParams	=	id+','+'"edit"';
  		var functionName	=	"handleactivitiesMultioownersuserevent";
  		var modalPopupName	=	"#activities_user_edit_popup";
  		$("#activities_selected_user_"+id).val(userseslectedData.join(','));
  		
  		if(!jQuery.isEmptyObject(userseslectedData)){
  			$.ajax({
  				url: "/stratroom/user/moduleAccessUserList?moduleName=Project Formulation",
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
  			$("#activities_selected_user_"+id).val(users.id);
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