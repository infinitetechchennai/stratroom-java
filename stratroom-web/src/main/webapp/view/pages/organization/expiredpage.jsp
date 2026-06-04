<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<title>StratRoom</title>
<link rel="stylesheet"
	href="${contextroot}/css/fonts/fontawesome_v_5/font-awesome.min.css">
<link rel="stylesheet"
	href="${contextroot}/css/fonts/fontawesome_v_5/all.css">

<link href="${contextroot}/css/app.min.css" rel="stylesheet">
<!-- Custom Css -->
<link href="${contextroot}/css/style.css" rel="stylesheet" />
<link href="${contextroot}/css/custom.css" rel="stylesheet" />
<link href="${contextroot}/css/initatives.css" rel="stylesheet" />
<link href="${contextroot}/css/startroom/wedgets.css" rel="stylesheet" />
<!-- You can choose a theme from css/styles instead of get all themes -->
<link href="${contextroot}/css/styles/all-themes.css" rel="stylesheet" />
<link href="${contextroot}/css/employee.css" rel="stylesheet" />
<link rel="stylesheet" href="${contextroot}/css/jquery-ui.min.css">

<script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
<script type="text/javascript"
	src="${contextroot}/js/jquery/jquery.validate.min.js"></script>

<style>
.orientation-right {
        top: 60px !important;
        right: 0 !important;
        left: auto !important;
        position: fixed;
      }

      #notifications .row::-webkit-scrollbar {
        width: 0px;
        background: transparent; /* make scrollbar transparent */
      }
</style>
</head>


<body class="light">
	<!-- Page Loader -->
	<!-- #Top Bar -->
	
	<!--#END View -->
	<section class="content">
		<div class="page-header row no-gutters py-2 m-t--70" style="width:76%;">
			<div class="col-lg-6 col-md-6 text-center text-sm-left pt-2 mb-0 ml-4">
				<h5 class="page-title" style="font-weight: 600; text-transform: uppercase">LINK EXPIRED</h5>
			</div>
		</div>
		
		
		<!-- End Page Header -->
		<div class="container-fluid">
        <div class="row">
          <div class="col-md-9">
            <div class="card" style="padding: 25px 100px">
            	<center><h2>Your password reset link has been expired, Kindly reset password again please!!!</h2></center>
            	<center><a href="https://ec2-13-232-172-210.ap-south-1.compute.amazonaws.com:8443/stratroom/" style="color:blue !important;font-size:20px;">clik here!!!</a></center>
				<center><i class="fas fa-frown" style="color:#ef3aa6;font-size:30em;"></i></center>
            </div>
          </div>
        </div>
      </div>
	</section>

	<!-- Plugins Js -->

	<script src="${contextroot}/js/app.min.js"></script>
	<!-- Knob Js -->
	<script src="${contextroot}/js/jquery-ui.min.js"></script>
	<script src="${contextroot}/js/moment.js"></script>
	<script src="${contextroot}/js/jquery.editable.min.js"></script>
	<script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
	<script src="${contextroot}/js/handlebars.js"></script>
	<script src="${contextroot}/js/widgets.js"></script>
	<script src="${contextroot}/js/notify.js"></script>
	<script src="${contextroot}/js/initial.js"></script>
</body>