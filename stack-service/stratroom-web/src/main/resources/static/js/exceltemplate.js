
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
var excelmodPermission	=	[];
var createpermission	=	false;
var editpermission		=	false;
var deletepermission	=	false;
var viewpermission		=	false;
var reporteelist 		= 	{};

if($("#userrolename").val()	==	"Super User" || $("#userrolename").val()	==	"Admin"){
	if($("#userPrincipal").val()	!= $("#userPrincipalnavigate").val()){
		//$(".subusermenuname").text('Excel Templates');
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
		url : "/stratroom/user/modulePermissions?moduleName=Template",
		async:false,
		success : function(data) {
			$.each(data,function(forindex,fordata){
				if(forindex	==	"Template"){
					if(!jQuery.isEmptyObject(fordata)){
						if(fordata.Excel.privilegeCreate !=	undefined && fordata.Excel.privilegeCreate == "FALSE"){	
							$(".excelimport").remove()
						}
						if(fordata.Excel !=	undefined){
							excelmodPermission	=	fordata.Excel;	
						}
					}
				}
			});
		}
	});
}

$(function () {		
	getauditpermission();	
	if(excelmodPermission.privilegeCreate !=	undefined && excelmodPermission.privilegeCreate == "TRUE"){	
		createpermission	=	true;
	}
	
	if(excelmodPermission.privilegeUpdate !=	undefined && excelmodPermission.privilegeUpdate == "TRUE"){
		editpermission	=	true;
	}
	
	if(excelmodPermission.privilegeDelete !=	undefined && excelmodPermission.privilegeDelete == "TRUE"){
		deletepermission	=	true;
	}
	
	if(excelmodPermission.privilegeView !=	undefined && excelmodPermission.privilegeView == "TRUE"){
		viewpermission	=	true;
	}
	
//	if(enableaccesscontrolMenu	==	true){
//		createpermission	=	true;
	//	editpermission		=	true;
		//deletepermission	=	true;
		//viewpermission		=	true;
	//}
	if(!createpermission){
		$(".excelimport").remove()
	}
	if(!viewpermission){
		$(".excelsearchbtn").remove()
	}
    if(viewpermission){
    	getExcelTemplateList();
    }
});

$(".resetvalue").click(function(){
	$(".audittraildate").val('');
	getExcelTemplateList();
});

function getExcelTemplateList() {
	
    $.ajax({
        url: "/stratroom/listOfFiles",
        type: "GET",
        success: function (response, status) {
        	ExcelTemplateShow(response);
        },
        error:readErrorMsg
    });
}



function ExcelTemplateShow(resdata) {
    $(".exceltemplatecontent").empty();
	var	bodyRows	=	"";
	if(resdata	==	"File Not Found" || jQuery.isEmptyObject(resdata)){
    	bodyRows	=	`File not Uploaded`
    }else{    
		$.each(resdata, function (ii, data) {
			$.each(data, function (i, List) {
				var name	=	List.split('.');
				var titledit	=	"";
				if($("#userrolename").val()	==	"Super User"){  
					titledit	=	`<p class="filenames editableTxt1" data-extnname="`+name[1]+`" data-temtype="`+ii+`" data-oldname="`+name[0]+`" onkeypress="return (this.innerText.length <= 30)" editable="true" contenteditable="true">`+name[0]+`</p>`;
	            }else{
	            	titledit	=	`<p class="filenames">`+name[0]+`</p>`;
	            }
		    	
				bodyRows	+=	`<div class="col-lg-3 searchname">
		            <div class="card divbox">
		              <div class="card-body"><a href="/stratroom/downloadTemplateFile?fileName=`+List+`&templateType=`+ii+`"><i class="fas fa-file-excel file"></i></a><br /><br />
		              `+titledit+`</div>
		            </div>
		          </div>`;
			});
	    });
	}
    
    
    
	$(".exceltemplatecontent").html(bodyRows);
}

$('.templatesearch').on('keyup', function(e) {
	// Search text
	   var text = $(this).val().toLowerCase();
	   // Hide all content class element
	   $('.searchname').hide(); 
	   $('.searchname .filenames').each(function(){
		   if($(this).text().toLowerCase().indexOf(""+text+"") != -1 ){
			   $(this).closest('.searchname').show();
		   }
	   });
});

$("#search1").click(function () {
	$('.templatesearch').val('');
	$("#search_section1").show();
    $("#search1").hide();
});

$("#close_search1").click(function () {
	$('.templatesearch').val('');
	$('.searchname').show();
	$("#search1").show();
	$("#search_section1").hide();
});

$(document).on('blur', ".editableTxt1", function () {
	var oldelementValue = $(this).attr("data-oldname");
	var oldextnValue = $(this).attr("data-extnname");
	var temptype = $(this).attr("data-temptype");
	var elementValue = $(this).text().trim();
	if(temptype	==	"" || elementValue == "" || oldelementValue	==	""){
		return false;
	}
	if (elementValue != oldelementValue) {
		$(this).attr("data-oldname", elementValue);
		$(this).append('<span id="inlineloader"><i class="fa fa-spinner fa-spin fa-2x fa-fw"></i>');
		var newfilename	=	elementValue+'.'+oldextnValue;
		var oldfilename	=	oldelementValue+'.'+oldextnValue;
		$.ajax({
			url : "/stratroom/updateFileName?newFileName="+newfilename+"&oldFileName="+oldfilename+"&templateType="+temptype,
			type : "POST",
			contentType : "application/json",
			async:false,
			success : function(data, status) {
				$("body span#inlineloader").remove();
			},
			error:function(){
				$("body span#inlineloader").remove();
				$(this).attr("data-oldname", oldelementValue);
				$(this).text(oldelementValue);
				$.notify("Error:Unable to update name,Kindly try again", {
					  style: 'error',
					  className: 'graynotify'
					});
			}
		});
	}
});