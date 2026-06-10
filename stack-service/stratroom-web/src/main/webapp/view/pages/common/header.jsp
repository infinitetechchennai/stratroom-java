<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta content="width=device-width, initial-scale=1" name="viewport" />
<title>StratRoom</title>

<link href="${contextroot}/css/bootstrap.min.css" rel="stylesheet">
<link href="${contextroot}/css/basic.css?v0.004" rel="stylesheet">
<link href="${contextroot}/css/main.css?v0.004" rel="stylesheet">
<link href="${contextroot}/css/responsive.css" rel="stylesheet">

<!-- Font Awsome Icons -->
<link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
<link href="${contextroot}/css/jquery.contextMenu.min.css" rel="stylesheet">
<!-- Favicon-->
<!-- <link rel="icon" href="images/favicon.ico" type="image/x-icon"> -->
<!-- Plugins Core Css -->
<!-- <link href="${contextroot}/css/app.min.css" rel="stylesheet"> -->
<link rel="stylesheet" href="${contextroot}/css/fonts/fontawesome_v_5/font-awesome.min.css">
<link rel="stylesheet" href="${contextroot}/css/fonts/fontawesome_v_5/all.css">
<!-- Custom Css -->
<!-- <link href="${contextroot}/css/style.css" rel="stylesheet" /> -->
        		 <!-- <link href="${contextroot}/css/custom.css" rel="stylesheet" /> -->
<link href="${contextroot}/css/daterangepicker.min.css" rel="stylesheet">

<!-- <link href="${contextroot}/css/startroom/wedgets.css" rel="stylesheet" /> -->
<!-- You can choose a theme from css/styles instead of get all themes -->
<!-- <link href="${contextroot}/css/styles/all-themes.css" rel="stylesheet" /> -->
<!-- <link href="${contextroot}/css/table-view.css" rel="stylesheet" /> -->

<!-- <link href="css/table-view.css" rel="stylesheet" /> -->
<link href="${contextroot}/css/jquery-ui.min.css" rel="stylesheet">
<link href="${contextroot}/css/nano.min.css" rel="stylesheet" />
<link href="${contextroot}/css/monolith.min.css" rel="stylesheet" />
<link href="${contextroot}/css/classic.min.css" rel="stylesheet" />
<link href="${contextroot}/css/file-upload.css" rel="stylesheet">
<link href="${contextroot}/css/jquery.contextMenu.min.css" rel="stylesheet">

  <style>
    .btn-secondary {
        color: #fff;
        background-color: #6c757d;
        border-color: #6c757d;
        padding: 0px 12px;
        font-size: 12px;
        background-color: #02162a;
        margin-right: 3px;
        margin-bottom: 9px;
        border-radius: 8px !important;
        margin-top: 8px;
    }
    .btn-secondary:hover {
        color: #fff !important;
        background-color: #6c757d !important;
        border-color: #6c757d !important;
        padding: 0px 12px !important;
        font-size: 12px !important;
        background-color: #02162a !important;
        margin-right: 3px !important;
        margin-bottom: 9px !important;
        border-radius: 8px !important;
        margin-top: 8px !important;
    }
    .list-group {
        max-height: 215px;
        margin-bottom: 10px;
        overflow: scroll;
        overflow-x: inherit;
        -webkit-overflow-scrolling: touch;
        font-size: 11px;
        border: 1px solid #e9ecef;
    }

    #result_panel>.panelbody>.list-group>.list-group-item{
        padding: 5px 10px !important;
    }

    #formula_builder, #summary_calculation{
        font-size: 11px !important;
    }

    #kpi_formula_popup>.modal-content>.modal-body{
            padding: 0 25px !important;
    }

    #kpi_formula_popup>.modal-content>.modal-body.card>.tab-content{
            padding: 0;
    }
    #formula_builder{
        padding-bottom: 0px;
    }
    .panel:hover {
        cursor: pointer;
    }

    #formula-builder .col-md-4{
        margin-bottom: 0px;
    }
    .modal #kpi_formula_popup{
        background-color: rgba(238, 238, 238, 0) !important;
    }
    /* .modal-backdrop{
        opacity:0.5 !important;
    } */
    #kpi_formula_popup .modal-content .nav li a.nav-link{
        font-size: 12px !important;
    }
    #datepickers-container{
      z-index: 10000;
    }

    .datepicker--nav{    
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        -ms-box-shadow: none;
        box-shadow: none;
        background-color: #ffff;
        color: #9c9c9c;
        width: 100%;
        height: 36px;
    }
  </style><script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>
<script type="text/javascript" src="${contextroot}/js/jquery/jquery.validate.min.js"></script>
<script type="text/javascript" src="${contextroot}/js/jquery/additional-methods.min.js"></script>
<script type="text/javascript" src="${contextroot}/js/notify.js"></script>
<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>

<script type="text/javascript">
jQuery.validator.setDefaults({
	debug : false,
	success : "valid"
});

$("#pageForm").validate({
	rules : {
		pagename : {
			required : true
		},
		category : {
			required : true
		}
	},
	messages : {
		required : "Name is required"
	},
	submitHandler : function(form) {
		addpage();
	}
});
</script>