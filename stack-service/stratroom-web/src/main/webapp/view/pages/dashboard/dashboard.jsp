<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<head>
	<jsp:include page="../common/header.jsp"></jsp:include>
<link rel="stylesheet" href="${contextroot}/css/datepickerair.css">
<link rel="stylesheet" href="${contextroot}/css/select2.min.css"/>

</head>
<body class="light" data-page="scorecard">
	<header id="header" class="header shadow-sm">
		<jsp:include page="../common/top-navigation.jsp"></jsp:include>
		<jsp:include page="../common/left-navigation.jsp"></jsp:include>
	</header>
	
	<div style="display: none;">
		<jsp:include page="../common/right-navigation.jsp"></jsp:include>
	</div>
	<div id=loadpage>
	<div class="droppable" style="width: 1000px;height:1000px;"></div>
	</div>
	<input type="hidden" id="ischeckinitiativeurlornot" value="INITIATIVE">	
  	<c:if test="${dashboardId != null}">
		<input id="pagenumber" type="hidden" name="pagenumber" value ="<c:out value="${dashboardId}" />">
	</c:if>
	  	<c:if test="${pageEmpId != null}">
		<input id="pageEmpId" type="hidden" name="pageEmpId" value ="<c:out value="${pageEmpId}" />">
	</c:if>
	<!-- #END# Page level body content -->

	
</body>

<jsp:include page="../common/footer.jsp"></jsp:include>
<script type="text/javascript">

	$(document).ready(function() {
		/* 
			todo: Get the list of widgets 
		*/
	    setTimeout(function() { $('.page-loader-wrapper').fadeOut(); }, 50);

		$('.droppable').droppable({
		    accept: '.draggable',
		    drop: on_element_drop
		});
		
		var pagename="";
		var page="";
		$.ajax({
			url : "/stratroom/pages/" + $('#pagenumber').val(),
			success : loadpages 
		});
		
		function loadpages(data, status) {
			pagename = data.pageName
			console.log(pagename, "pageeeeee");
			//var templatesArr = ['Standard_View'];//, 'Initiative_View'];
			//templatesArr.forEach(function (template, idx){ 
				if (data.pageType == 'Standard_View') {
					$('#loadpage').load('/stratroom/standardViewtemplate');
				}else if (data.pageType == 'Scorecardview') {
					$('#loadpage').load('/stratroom/standardViewtemplateView');
				} else if (data.pageType == 'Initiatives & Projects') {
					$('#loadpage').load('/stratroom/initiativestemplate');
				} else if (data.pageType == 'InitiativeView') {
					$('#loadpage').load('/stratroom/initiativestemplateView');
				}else if (data.pageType == 'SWOT') {
					$('#loadpage').load('/stratroom/dashboardSwotanalysis');
				} else if (data.pageType == 'PESTEL') {
					$('#loadpage').load('/stratroom/dashboardPestelanalysis');
				} else if (data.pageType == 'Meetings') {
					$('#loadpage').load('/stratroom/dashboardMeeting');
				} 
				else if (data.pageType == 'Strategy Map') {
					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();
					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'strategyMap?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'strategyMap?pageId='+$('#pagenumber').val();
					} 
					
				}
				else if (data.pageType == 'Process Enabaler') {

					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();   
		
					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'processenabler?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'processenabler?pageId='+$('#pagenumber').val();
					}				
				}

				else if (data.pageType == 'Rpo') {

                var newURL	=	window.location.href;
                newURL	=	newURL.toLowerCase();   
                
                if(newURL.indexOf('dashboard') >= 0){
                	newURL	=	newURL.split("dashboard");
                	window.location	=	newURL[0]+'rpo?pageId='+$('#pagenumber').val();	
                }else{
                	window.location	=	'rpo?pageId='+$('#pagenumber').val();
                }				
                }

				//Budget
				else if (data.pageType == 'Budget') {

				var newURL	=	window.location.href;
				newURL	=	newURL.toLowerCase();   

				if(newURL.indexOf('dashboard') >= 0){
					newURL	=	newURL.split("dashboard");
					window.location	=	newURL[0]+'budget?pageId='+$('#pagenumber').val();	
				}else{
					window.location	=	'budget?pageId='+$('#pagenumber').val();
				}				
				}

				else if (data.pageType == 'compliance' || data.pageType == 'Compliance') {

					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();   

					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'compliance?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'compliance?pageId='+$('#pagenumber').val();
					}				
				}

				else if (data.pageType == 'complianceDashboard' || data.pageType == 'Compliance Dashboard') {
					console.log(data.pageType, "kkkkkkk");

					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();   

					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'complianceDashboard?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'complianceDashboard?pageId='+$('#pagenumber').val();
					}				
				}

				else if (data.pageType == 'Scorecard Dashboard' || data.pageType == 'scorecardDashboard') {
					console.log(data.pageType, "kkkkkkk");

					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();   

					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'scorecardDashboard?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'scorecardDashboard?pageId='+$('#pagenumber').val();
					}				
				}

				else if (data.pageType == 'Incident Management' || data.pageType == 'IncidentManagement') {
					console.log(data.pageType, "kkkkkkk");

					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();   

					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'incidentManagement?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'incidentManagement?pageId='+$('#pagenumber').val();
					}				
				}

				else if (data.pageType == 'InitiativeStrategic' || data.pageType == 'initiativeStrategic' || data.pageType == "Initiative Strategic") {

					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();   

					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'initiativeStrategic?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'initiativeStrategic?pageId='+$('#pagenumber').val();
					}				
				}

				//Task
				else if (data.pageType == 'Task') {

				var newURL	=	window.location.href;
				newURL	=	newURL.toLowerCase();   

				if(newURL.indexOf('dashboard') >= 0){
					newURL	=	newURL.split("dashboard");
					window.location	=	newURL[0]+'task?pageId='+$('#pagenumber').val();	
				}else{
					window.location	=	'task?pageId='+$('#pagenumber').val();
				}				
				}

				else if (data.pageType == 'Impact Survey') {

                var newURL	=	window.location.href;
                newURL	=	newURL.toLowerCase();   
                
                if(newURL.indexOf('dashboard') >= 0){
                	newURL	=	newURL.split("dashboard");
                	window.location	=	newURL[0]+'impactAssesment?pageId='+$('#pagenumber').val();	
                }else{
                	window.location	=	'impactAssesment?pageId='+$('#pagenumber').val();
                }				
                }

				else if (data.pageType == 'Risk View') {

                var newURL	=	window.location.href;
                newURL	=	newURL.toLowerCase();   
                
                if(newURL.indexOf('dashboard') >= 0){
                	newURL	=	newURL.split("dashboard");
                	window.location	=	newURL[0]+'riskView?pageId='+$('#pagenumber').val();	
                }else{
                	window.location	=	'riskView?pageId='+$('#pagenumber').val();
                }				
                }

				else if (data.pageType == 'Approval Page') {

                var newURL	=	window.location.href;
                newURL	=	newURL.toLowerCase();   
                
                if(newURL.indexOf('dashboard') >= 0){
                	newURL	=	newURL.split("dashboard");
                	window.location	=	newURL[0]+'approvalPage?pageId='+$('#pagenumber').val();	
                }else{
                	window.location	=	'approvalPage?pageId='+$('#pagenumber').val();
                }				
                }
				else if (data.pageType == 'My Space') {
					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();
					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'employeeView?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'employeeView?pageId='+$('#pagenumber').val();
					} 
					//$('#loadpage').load('/stratroom/employeeView');
				} else if (data.pageType == 'Risk') {
					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();
					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'risks?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'risks?pageId='+$('#pagenumber').val();
					} 
					//$('#loadpage').load('/stratroom/dashboardRisks?pageId='+$('#pagenumber').val());
					//window.location	=	'dashboardRisks?pageId='+$('#pagenumber').val();
				} else if (data.pageType == 'Risk Radar') {
					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();
					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'riskRadar?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'riskRadar?pageId='+$('#pagenumber').val();
					} 
					//$('#loadpage').load('/stratroom/dashboardRisks?pageId='+$('#pagenumber').val());
					//window.location	=	'dashboardRisks?pageId='+$('#pagenumber').val();
				}else if (data.pageType == 'Risk Dashboard') {
					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();
					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'riskDashboard?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'riskDashboard?pageId='+$('#pagenumber').val();
					} 
					//$('#loadpage').load('/stratroom/dashboardRisks?pageId='+$('#pagenumber').val());
					//window.location	=	'dashboardRisks?pageId='+$('#pagenumber').val();
				}else if (data.pageType == 'Audit Dashboard') {
					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();
					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'auditDashboard?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'auditDashboard?pageId='+$('#pagenumber').val();
					} 
					//$('#loadpage').load('/stratroom/dashboardRisks?pageId='+$('#pagenumber').val());
					//window.location	=	'dashboardRisks?pageId='+$('#pagenumber').val();
				}else if (data.pageType == 'Initiative Dashboard') {
					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();
					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'initiativeDashboard?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'initiativeDashboard?pageId='+$('#pagenumber').val();
					} 
					//$('#loadpage').load('/stratroom/dashboardRisks?pageId='+$('#pagenumber').val());
					//window.location	=	'dashboardRisks?pageId='+$('#pagenumber').val();
				}else if (data.pageType == 'RiskEvent') {
					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();
					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'riskevent?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'riskevent?pageId='+$('#pagenumber').val();
					} 
					//$('#loadpage').load('/stratroom/dashboardRisks?pageId='+$('#pagenumber').val());
					//window.location	=	'dashboardRisks?pageId='+$('#pagenumber').val();
				} else if (data.pageType == 'Strategy Formulation' || data.pageType == 'strategy formulation') {
					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();
					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'strategyformulation?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'strategyformulation?pageId='+$('#pagenumber').val();
					} 
				} else if (data.pageType == 'Project Formulation') {
					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();
					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'projectformulation?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'projectformulation?pageId='+$('#pagenumber').val();
					} 
					
				}else if (data.pageType == "Audit Management" || data.pageType == 'AuditManagement' || data.pageType == 'AuditManagement') {
					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();
					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'auditManagementPage?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'auditManagementPage?pageId='+$('#pagenumber').val();
					} 
					
				}else if (data.pageType == 'Risk Formulation') {
					var newURL	=	window.location.href;
					newURL	=	newURL.toLowerCase();
					if(newURL.indexOf('dashboard') >= 0){
						newURL	=	newURL.split("dashboard");
						window.location	=	newURL[0]+'riskformulation?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'riskformulation?pageId='+$('#pagenumber').val();
					} 
					
				} 		
				else if(data.pageType == 'PowerBI')
				{
					$('#loadpage').load('/stratroom/powerBi');
				}
			//});
			pagename = data.pageName
			page= data.pageType ;
		}
		
		function on_element_drop(event, ui){
		  var template = ui.draggable.find("a").first().text();
		  console.log(template);
		//  $('.droppable').load("${pageContext.request.contextPath}/"+template)
		var pagetype = 'Standard_View';
		if(template == 'Standard Scorecard')
			{
			//$('#loadpage').load('/stratroom/standardViewtemplate');
			pagetype = 'Standard_View';
			}
		else if (template.trim() == 'Initiative Management')
			{
			console.log("Initiative Matched");
			//$('#loadpage').load('/stratroom/initiativestemplate');
			pagetype = 'Initiative_View';
			}
			
		
		
		
		var pageobj = {
				"active":0,
				"id": $('#pagenumber').val(),
				"createdBy": $("#userPrincipal").val(),
				"pageName" : pagename,
				"pageType": pagetype
			}
		
		
		$.ajax({
			url : "/stratroom/pages",
			type : 'put',
			contentType : "application/json",
			data : JSON.stringify(pageobj),
			success : function(data, status) {
				if(template == 'Standard Scorecard')
				{
					$('#loadpage').load('/stratroom/standardViewtemplate');
				}
				else if (template.trim() == 'Initiative Management')
				{
					$('#loadpage').load('/stratroom/initiativestemplate');
				}

			},
			error : function(data, status) {
						if (data.exception = 'Duplicate PageName Provided') {
							$.notify("Duplicate PageName Provided",{
							  style: 'error',
							  className: 'graynotify'
							});
						}
					}
		});
		}

		$(".draggable").draggable({
		    revert: "invalid",
		    stack: ".draggable",
		    helper: 'clone',
		    refreshPositions: true
		});
		
	});	
	$('.modal-dialog').draggable({
            handle: ".modal-header"
        });
		
	</script>
<script src="${contextroot}/js/select2.min.js"></script>
<script src="${contextroot}/js/notify.js"></script>