
var business_impact = "";
var recommandation_text = "";
var radioValue = "";
var swottype = "";
var currentEmp		=	$("#userPrincipal").val();
var topparentswotDetails	=	{};
var moduleDataList = [];
var kpiList	=	[];
var swotupdateDescription	=	[];
var pageNo =  $('#pagenumber').val();
var orgmodPermission	=	[];
var createpermission	=	false;
var editpermission		=	false;
var deletepermission	=	false;
var viewpermission		=	false;
var implementationtypemethod	=	false;


if($("#userrolename").val()	==	"Super User" || $("#userrolename").val()	==	"Admin"){
	if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
		$(".subusermenuname").text('Organisation Tracker');
		$(".orgtracker").addClass("homepageHighlight");
		if($(".topmenubreadcrumb").length){
			$(".topmenubreadcrumb").show();
		}
		if($(".sidebarNavigate").length){
			$(".sidebarNavigate").show();
		}
	}
}

function getorgpermission(){
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName=Org Tracker",
		async:false,
		success : function(data) {
			$.each(data,function(forindex,fordata){
				if(forindex	==	"Org Tracker" && !jQuery.isEmptyObject(fordata)){
					$.each(fordata,function(forindex1,fordata1){
						if(!jQuery.isEmptyObject(fordata1)){
							orgmodPermission	=	fordata1;
						}
					});
				}
			});
		}
	});
}

function getorgmodpermission(){
	$.ajax({
		type : "GET",
		url : "/stratroom/user/modulePermissions?moduleName=Organization",
		async:false,
		success : function(data) {
			if(data.Organization.privilegeView !=	undefined && data.Organization.privilegeView == "FALSE"){
				$(".organizationHomebtn").hide();
			}
		}
	});
}

$(function () {
	
	
	getorgpermission();
	getorgmodpermission();
	if(orgmodPermission.privilegeCreate !=	undefined && orgmodPermission.privilegeCreate == "TRUE"){	
		createpermission	=	true;
	}
	
	if(orgmodPermission.privilegeUpdate !=	undefined && orgmodPermission.privilegeUpdate == "TRUE"){
		editpermission	=	true;
	}
	
	if(orgmodPermission.privilegeDelete !=	undefined && orgmodPermission.privilegeDelete == "TRUE"){
		deletepermission	=	true;
	}
	
	if(orgmodPermission.privilegeView !=	undefined && orgmodPermission.privilegeView == "TRUE"){
		viewpermission	=	true;
	}
	
	if((controlpanelgeneralsiteSettings.implementation !=	null && controlpanelgeneralsiteSettings.implementation !=	undefined) && (controlpanelgeneralsiteSettings.implementationType !=	null && controlpanelgeneralsiteSettings.implementationType !=	undefined)){
		if(controlpanelgeneralsiteSettings.implementationType	==	"Department"){
			implementationtypemethod	=	true
		}
	}
	
	$('#message').val('');
	$('#orgtrackerlist').empty();
	
	if(!viewpermission){
		$(".orgtrackerlist").remove();
		$("#search1").remove();
		$(".exportbtn").remove();
		$(".resetvalue").remove();
	}
	
	$("#orgdownloadpdf").attr("href","download?flagType=&type=pdf&datePeriod="+$('#datePeriod').val());
	$("#orgdownloadcsv").attr("href","download?flagType=&type=csv&datePeriod="+$('#datePeriod').val());
	if($("#userrolename").val()	==	"Super User" || $("#userrolename").val()	==	"Admin"){
		if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
			$(".orgtracker").addClass("homepageHighlight");	
		}
	}
	
    if(viewpermission){
    	getDepartmentList();
    }
});

$(".resetvalue").click(function(){
	$("#search1").show();
	$("#search_section1").hide();
	var id = $(this).attr("data-id");
	var name = $(this).attr("data-name");
	if(id == "" || id == undefined || id == null){
		return false;
	}
	if(!$("#usertrack"+id).is(":visible")){
		return false;
	}
	var encodeval	=	encodeURIComponent(name);
	var datePeriod 	= 	$('#datePeriod').val();
	$("#orgdownloadpdf").attr("href","download?flagType="+encodeval+"&type=pdf&datePeriod="+datePeriod);
	$("#orgdownloadcsv").attr("href","download?flagType="+encodeval+"&type=csv&datePeriod="+datePeriod);
	//$("#orgdownloadpdf").attr("href","download?flagType=&type=pdf&datePeriod="+$('#datePeriod').val());
	//$("#orgdownloadcsv").attr("href","download?flagType=&type=csv&datePeriod="+$('#datePeriod').val());
	$(".divcorner").show();
	//$('div[id^=usertrack]').hide();
	var url	=	"/stratroom/clearOrgTrack/"+id;
	if($("#message").val() !=	""){
    	url	=	"/stratroom/clearOrgTrack/"+id+"?type=search";
    }
	$.ajax({
		url : url,
		type: "delete",
		async:false,
		success : function(data) {
			location.reload(true);
		},error:readErrorMsg
	});	
});


function getDepartmentList() {
	console.log(implementationtypemethod)
	var datePeriod 	= 	$('#datePeriod').val();
	var url = (implementationtypemethod?"allDepartmentListByLoginUser?datePeriod="+datePeriod+"":"designationList?datePeriod="+datePeriod);
	$.ajax({
		url : "/stratroom/"+url,
		type: "GET",
		async:false,
		success : function(data) {
			var bodyRows	=	"";
			if(implementationtypemethod){
				$.each(data, function(index, reportee) {
					var	statusClr	=	(reportee.status ==	"Active"?"black":"gray");
					var deleteoption	=	""; 
					if(statusClr	==	"gray" && deletepermission && $("#userrolename").val()	==	"Super User"){
						deleteoption	=	`<span style="float: right;padding: 12px;"> <ul class="header-dropdown" style="margin-bottom: 0px">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true" style="color: #1e252d !important">
              <i class="fas fa-ellipsis-v"></i>
            </a>
            <ul class="dropdown-menu pull-right" id="project-options" x-placement="bottom-start" style="position: absolute;will-change: transform;top: 0px;left: 0px;transform: translate3d(0px, 24px, 0px);">
              <li>
                <a href="#" onclick="deleteorgtrackerid(`+reportee.id+`)" style="font-weight: normal !important;">Delete</a>
              </li>
            </ul>
          </li>
        </ul></span>`;
					}
					var deptiduni	=	(reportee.deptID != undefined?reportee.deptID:'');
					bodyRows	+=	`<div class="divcorner" id="tracker`+reportee.id+`">
							<center><button style="width:auto;color:`+statusClr+`" type="button" class="button" onclick="toggle_visibility('usertrack`+reportee.id+`','`+reportee.name+`','`+reportee.id+`','`+deptiduni+`');" data-toggle="collapse"><span>`+reportee.name+`</span></button>`+deleteoption+`</center>
			   <div id="usertrack`+reportee.id+`" class="collapse tracker">
		        </div>
			   </div>`;
				});
			}
			
			if(!implementationtypemethod){
				$.each(data, function(index, reportee) {
					var	statusClr	=	(reportee['status'] ==	"Active"?"black":"gray");
					var deleteoption	=	""; 
					if(statusClr	==	"gray" && deletepermission && $("#userrolename").val()	==	"Super User"){
						deleteoption	=	`<span style="float: right;padding: 12px;"> <ul class="header-dropdown" style="margin-bottom: 0px">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true" style="color: #1e252d !important">
              <i class="fas fa-ellipsis-v"></i>
            </a>
            <ul class="dropdown-menu pull-right" id="project-options" x-placement="bottom-start" style="position: absolute;will-change: transform;top: 0px;left: 0px;transform: translate3d(0px, 24px, 0px);">
              <li>
                <a href="#" onclick="deleteorgtrackerid(`+reportee.id+`)" style="font-weight: normal !important;">Delete</a>
              </li>
            </ul>
          </li>
        </ul></span>`;
					}
					var deptiduni	=	'';
					bodyRows	+=	`<div class="divcorner" id="tracker`+reportee.id+`">
							<center><button style="width:auto;color:`+statusClr+`" type="button" class="button" onclick="toggle_visibility('usertrack`+reportee.id+`','`+reportee['name']+`','`+reportee.id+`','`+reportee.id+`');" data-toggle="collapse"><span>`+reportee['name']+`</span></button>`+deleteoption+`</center>
			   <div id="usertrack`+reportee.id+`" class="collapse tracker">
		        </div>
			   </div>`;
				});
			}
			
			if(jQuery.isEmptyObject(data)){
		    	bodyRows	=	`<div class="divcorner">
						<center><button type="button" class="button" data-toggle="collapse"><span>No Records Found</span></button></center>
		   </div>`;
		    }
			
			$("#orgtrackerlist").html(bodyRows);
		}
	});
}

function AccesscontrolListShow(data,id) {
	var typeofname	=	(implementationtypemethod?"Department":"Designation");
	
    $("#"+id).empty();
    var table	=	`<div class="table-responsive">
		        <table class="access-control-table">
		          <thead>
		            <tr>
		              <th style="width: 12%;">Parent</th>
		              <th style="width: 12%;">Owner</th>
		              <th style="width: 12%;">`+typeofname+`</th>
		            <th style="width: 20%;">Email</th>
		            <th style="width: 20%;">Pages</th>
		            <th style="width: 12%;">From Date</th>
		          <th style="width: 12%;">To Date</th>
		            </tr>
		          </thead>
		            <tbody>`;	
	var	bodyRows	=	"";
    $.each(data, function (i, List) {
		var parentName	=	(List.parentName !=	null && List.parentName !=	undefined?List.parentName:"");
		var ownerName	=	(List.ownerName !=	null && List.ownerName !=	undefined?List.ownerName:"");
		var designation	=	(List.designation !=	null && List.designation !=	undefined?List.designation:"");
		var email	=	(List.designation !=	null && List.email !=	undefined?List.email:"");
		var pages	=	(List.pages !=	null && List.pages !=	undefined?List.pages:"");
		var fromDate	=	(List.fromDate !=	null && List.fromDate !=	undefined?List.fromDate:"");
		var toDate	=	(List.toDate !=	null && List.toDate !=	undefined?List.toDate:"");
		bodyRows	+=	`<tr><td>`+parentName+`</td><td>`+ownerName+`</td><td>`+designation+`</td><td>`+email+`</td><td>`+pages+`</td><td>`+fromDate+`</td><td>`+toDate+`</td></tr>`;
    });
	
    if(jQuery.isEmptyObject(data)){
    	bodyRows	=	`<tr><td colspan="7">No Records Found</td></tr>`
    }
    table	+=	bodyRows+`</table></div>`;
    $("#"+id).html(table);
}

	$("#open_search").click(function () {
		$(".nav-search").show();
		$("#open_search").hide();
	});

	$("#close_search").click(function () {
		$("#open_search").show();
		$(".nav-search").hide();
	});
  
	$("#search1").click(function () {
		$("#search_section1").show();
		$("#search1").hide();
	});

	$("#close_search1").click(function () {
		$("#message").val('');
		$("#message").attr("placeholder","Search...")
		$(".divcorner").show();
		$("#orgdownloadpdf").attr("href","download?flagType=&type=pdf&datePeriod="+$('#datePeriod').val());
		$("#orgdownloadcsv").attr("href","download?flagType=&type=csv&datePeriod="+$('#datePeriod').val());
		$('div[id^=usertrack]').hide();
		$("#search1").show();
		$("#search_section1").hide();
		if(viewpermission){
	    	getDepartmentList();
	    }
	});
	  
	function toggle_visibility(id,name,ids,deptid) {
	    var e = document.getElementById(id);
	    var encodeval	=	encodeURIComponent(name);
	    var datePeriod 	= 	$('#datePeriod').val();
	    $(".resetvalue").attr("data-id",ids);
	    $(".resetvalue").attr("data-name",name);
	    if (e.style.display == ''){
	    	e.style.display = 'none';
	    }
	    var url	=	"/stratroom/orgTrackList?flagType="+encodeval+"&datePeriod="+datePeriod;
	    if($("#message").val() !=	"" && implementationtypemethod){
	    	url	=	"/stratroom/orgTrackList?flagType="+encodeval+"&datePeriod="+datePeriod+"&type=search&id="+deptid;
	    }
	    if($("#message").val() ==	"" && implementationtypemethod){
	    	url	=	"/stratroom/orgTrackList?flagType="+encodeval+"&datePeriod="+datePeriod+"&id="+deptid;
	    }
	    
	    if (e.style.display == 'none'){
	    	$.ajax({
		        url: url,
		        type: "GET",
		        async:false,
		        success: function (response, status) {
		        	$("#orgdownloadpdf").attr("href","download?flagType="+encodeval+"&type=pdf&datePeriod="+datePeriod);
		        	$("#orgdownloadcsv").attr("href","download?flagType="+encodeval+"&type=csv&datePeriod="+datePeriod);
					AccesscontrolListShow(response,id);
					e.style.display = 'block';
		        },
		        error:readErrorMsg
		    });
	    }else{
	    	e.style.display = 'none';
	    	$("#orgdownloadpdf").attr("href","download?flagType=&type=pdf&datePeriod="+datePeriod);
	    	$("#orgdownloadcsv").attr("href","download?flagType=&type=csv&datePeriod="+datePeriod);
	    }
	    $('div[id^=usertrack]').not('#'+id).hide();
	}
	
	$('#message').on('keyup', function(e) {
		var value = $(this).val().toLowerCase();
		//$('.divcorner').hide();
		//$('.divcorner:contains("'+value+'")').show();
		value	=	$.trim(value);
		if(value != ""){
			$("#orgtrackerlist").html('');
			var datePeriod 	= 	$('#datePeriod').val();
			var url = (implementationtypemethod?"allDepartmentListByLoginUser?datePeriod="+datePeriod+"":"designationList?datePeriod="+datePeriod);
			$.ajax({
				url : "/stratroom/"+url+"&name="+value,
				type: "GET",
				async:false,
				success : function(data) {
					var bodyRows	=	"";
					
					if(!jQuery.isEmptyObject(data)){
						
						if(implementationtypemethod){
							$.each(data, function(index, reportee) {
								var	statusClr	=	(reportee.status ==	"Active"?"black":"gray");
								var deptiduni	=	(reportee.deptID != undefined?reportee.deptID:'');
								bodyRows	+=	`<div class="divcorner" id="tracker`+reportee.id+`">
										<center><button style="width:auto;color:`+statusClr+`" type="button" class="button" onclick="toggle_visibility('usertrack`+reportee.id+`','`+reportee.name+`','`+reportee.id+`','`+deptiduni+`');" data-toggle="collapse"><span>`+reportee.name+`</span></button></center>
						   <div id="usertrack`+reportee.id+`" class="collapse tracker">
					        </div>
						   </div>`;
							});
						}
						
						if(!implementationtypemethod){
							$.each(data, function(index, reportee) {
								var	statusClr	=	(reportee['status'] ==	"Active"?"black":"gray");
								var deptiduni	=	"";
								bodyRows	+=	`<div class="divcorner" id="tracker`+reportee.id+`">
										<center><button style="width:auto;color:`+statusClr+`" type="button" class="button" onclick="toggle_visibility('usertrack`+reportee.id+`','`+reportee['name']+`','`+reportee.id+`','`+deptiduni+`');" data-toggle="collapse"><span>`+reportee['name']+`</span></button></center>
						   <div id="usertrack`+reportee.id+`" class="collapse tracker">
					        </div>
						   </div>`;
							});
						}
					}
					
					if(jQuery.isEmptyObject(data)){
				    	bodyRows	=	`<div class="divcorner">
								<center><button type="button" class="button" data-toggle="collapse"><span>No Records Found</span></button></center>
				   </div>`;
				    }
					
					$("#orgtrackerlist").html(bodyRows);
				}
			});
		}
		if(value == ""){
			getDepartmentList();
		}
	});
	
	function deleteorgtrackerid(id){		
		if(id !=	""){
			$("#deleterecordorgtrackerid").val(id)
			$('#deleteModalPageorg').modal('toggle');
			
			$(window).on("resize", function(){
			    $(".modal:visible").each(alignModal);
			}); 
			$(".modal").on("shown.bs.modal", alignModal);
		}
	}

	function handleorgeventdelete(){
		var id				=	$("#deleterecordorgtrackerid").val();
		if(id	==	""){
			return false;
		}
		var url = (implementationtypemethod?"deleteOrgDept/"+id:"/stratroom/deleteEmployee/" + id);
		
		var method	=	"delete";
		
		$.ajax({
			url : url,
			type : method,
			contentType : "application/json",
			success : function(data, status) {
				$('#deleteModalPageorg').modal('toggle');
				getDepartmentList();
			},
			error:readErrorMsg
		});
	}