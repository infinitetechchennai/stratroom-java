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
				<h5 class="page-title" style="font-weight: 600; text-transform: uppercase">RESET PASSWORD</h5>
			</div>
		</div>
		
		
		<!-- End Page Header -->
		<div class="container-fluid">
        <div class="row">
          <div class="col-md-9">
		  <form id="reset_password_form" name="reset_password_form">
            <div class="card" style="padding: 25px 100px">
              <div class="row">
				<div class="col-10 form-group">
                  <label>Password</label>
                  <input
                    type="password" id="password" name="password"
                    class="form-control browser-default"
                    autocomplete="off"
                  />
                </div>
			</div>
			                
			<div class="row">	
                <div class="col-10 form-group">
                  <label for="Target">Confirm Password</label>
                  <input
                    type="password" id="conpassword" name="conpassword"
                    class="form-control browser-default"
                    autocomplete="off"
                  />
                </div>

                <div class="col-12">
                  <div class="form-line">
                    <button class="initative_save_btn" value="Save" data-i18n="Save">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
			</form>
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
	<script>
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
		
	$('.modal-dialog').draggable({
            handle: ".modal-header"
        });
	let reseturlparams 	= 	(new URL(document.location)).searchParams;
	let tokenurl 		= 	reseturlparams.get("token");
	$( "#reset_password_form" ).validate({
  	  rules: {
  	    password:{
  	    	required: true,
  	    	minlength : 5
  	    },conpassword:{
  	    	required: true,
  	    	minlength : 5,
  	    	equalTo : "#password"
  	    }
  	  },
  	   messages: {
            required: "Name is required"
        },
        submitHandler: function(form) {
        	forgotlink();
        }
  	});
	
	function forgotlink(){
		$(".initative_save_btn").attr("disabled",true);
		var reqdata	=	{"password":$("#conpassword").val(),"jwtToken":tokenurl};	
		$.ajax({
	        url: "/stratroom/resetPassword",
	        type: 'post',
	        contentType: "application/json",
	        data: JSON.stringify(reqdata),
	        success: function (data, status) {
	        	if(data.updateFlag){
	        		$.notify("Success:Your password reset has been updated successfully", {
						  style: 'success',
						  className: 'graynotify'
						});	
	        		setTimeout(function() { window.location = "/stratroom"; }, 3000);
	        	}
	        },error:readErrorMsg
	    });
	}
	
	function readErrorMsg(msg,status){
		$(".initative_save_btn").removeAttr("disabled");
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
	
	</script>
</body>