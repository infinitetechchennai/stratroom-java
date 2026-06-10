<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<head>
	<jsp:include page="../common/header.jsp"></jsp:include>
<link rel="stylesheet" href="${contextroot}/css/datepickerair.css">
<link rel="stylesheet" href="${contextroot}/css/select2.min.css"/>
</head>
<body class="light">
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
		
	    setTimeout(function() { $('.page-loader-wrapper').fadeOut(); }, 50);
				
		var pagename="";
		var page="";
		$.ajax({
			url : "/stratroom/pages/" + $('#pagenumber').val(),
			success : loadpages 
		});

		function loadpages(data, status) {
			
			var newURL	=	window.location.href;
			 newURL	=	newURL.toLowerCase();
			
				if (data.pageType == 'Cockpit') {
					//$('#loadpage').load('/stratroom/dashboardPreference');										 
					 if(newURL.indexOf('whiteboard') >= 0){
						newURL	=	newURL.split("whiteboard");
						window.location	=	newURL[0]+'dashboardPreference?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'dashboardPreference?pageId='+$('#pagenumber').val();
					}  
				} else if (data.pageType == 'Charts') {
					//$('#loadpage').load('/stratroom/charts');
					 if(newURL.indexOf('whiteboard') >= 0){
							newURL	=	newURL.split("whiteboard");
							window.location	=	newURL[0]+'charts?pageId='+$('#pagenumber').val();	
						}else{
							window.location	=	'charts?pageId='+$('#pagenumber').val();
						}  
				}if (data.pageType == 'Report') {
					//$('#loadpage').load('/stratroom/dashboardPreference');										 
					 if(newURL.indexOf('whiteboard') >= 0){
						newURL	=	newURL.split("whiteboard");
						window.location	=	newURL[0]+'dashboardPreference?pageId='+$('#pagenumber').val();	
					}else{
						window.location	=	'dashboardPreference?pageId='+$('#pagenumber').val();
					}  
				}else if (data.pageType == 'StrategyMap') {
					//$('#loadpage').load('/stratroom/charts');
					 if(newURL.indexOf('whiteboard') >= 0){
							newURL	=	newURL.split("whiteboard");
							window.location	=	newURL[0]+'strategyMap?pageId='+$('#pagenumber').val();	
						}else{
							window.location	=	'strategyMap?pageId='+$('#pagenumber').val();
						}  
				} else if(data.pageType == 'PowerBI')
				{
					$('#loadpage').load('/stratroom/powerBi');
				}
			pagename = data.pageName
			page= data.pageType ;
		}
			
	});	
	$('.modal-dialog').draggable({
            handle: ".modal-header"
        });
	</script>
<script src="${contextroot}/js/select2.min.js"></script>
<script src="${contextroot}/js/notify.js"></script>