<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
	<c:set var="contextroot" value="${pageContext.request.contextPath}" />
	<!-- <link href="${contextroot}/css/initatives.css" rel="stylesheet" />
<link href="${contextroot}/css/custom.css" rel="stylesheet">
<link href="${contextroot}/css/icheck-bootstrap.min.css" rel="stylesheet" />
<link rel="stylesheet" href="${contextroot}/css/employee.css" rel="stylesheet" />
<link rel="stylesheet" href="${contextroot}/css/chosen.min.css"> -->
	<script>
		/*function preview_images() {
			var total_file = document.getElementById("images").files.length;
			for (var i = 0; i < total_file; i++) {
				$("#image_preview")
						.append(
								"<div class='col-md-3' style='padding-bottom: 4%' '><img class='img-responsive' src='"
										+ URL
												.createObjectURL(event.target.files[i])
										+ "'></div>");
			}
		}*/
	</script>

	<style>
		.select2 .select2-search--dropdown {
			padding: 3px 2px 0px 0px;
		}

		.select2-container--default .select2-selection--single .select2-selection__rendered {
			height: 38px !important;
			font-size: 14px !important;
		}

		.select2-results ul li {
			font-size: 14px !important;
		}

		.select2-container--default .select2-search--dropdown .select2-search__field {
			border: 1px solid #aaa;
			border-radius: 4px !important;
			font-size: 14px !important;
		}

		.select2-container .select2-selection--single {
			height: 38px !important;
			border-radius: 4px !important;
		}

		.select2-selection--single .select2-selection__rendered {
			line-height: 38px;
		}

		.select2-container--default .select2-selection--single .select2-selection__arrow {
			height: 38px !important;
		}

		.select2-container--default .select2-selection--single .select2-selection__rendered {
			color: #444;
			font-size: 14px !important;
			line-height: 38px !important;
		}

		input.select2-search__field {
			height: 38px !important;
			font-size: 14px !important;
			font-weight: normal !important;
		}

		.select2-selection--single {
			border: 1px solid #ced4da !important;
			border-radius: 4px !important;
			font-size: 14px !important;
		}

		.nameText {
			margin: 5px 0 1em 0;
			overflow: hidden;
		}

		.search-section .fa-times {
			position: absolute;
			right: 2px;
			top: 2px;
			font-size: 13px;
			color: #c2c2c2;
			cursor: pointer;
		}

		.search-section .fa-search {
			position: absolute;
			left: 36px;
			top: 1px;
			font-size: 13px;
			color: #c2c2c2;
		}

		.nameText p {
			margin: 0;
		}

		.line-clamp {
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		.chosen-search input[type=text] {
			width: 97% !important;
		}

		.employee_div_body_box {
			padding: 25px !important;
		}

		input,
		button,
		select,
		optgroup,
		textarea {
			font-family: "Poppins", sans-serif !important;
		}

		#awsviewlink {
			word-break: break-all;
		}

		.activeswotwrap {
			border: 2px solid black !important;
		}

		.pagecolumncontent {
			min-height: 40px !important;
			max-height: 40px !important;
		}

		.impactcontent {
			min-height: 30px !important;
			max-height: 30px !important;
		}

		.swotboxdefaultBox {
			min-height: 290px !important;
			max-height: 290px !important;
		}

		.politicalwrap {
			background-color: #9c2545;
			color: #ffffff;
			padding: 8px 12px;
			border-radius: 8px 0 8px 0;
			margin-left: -16px;
			margin-top: -16px;
			position: absolute;
			font-size: 14px;
			font-weight: 600;
		}

		.economicalwrap {
			background-color: #002f73;
			color: #ffffff;
			padding: 8px 12px;
			border-radius: 8px 0 8px 0;
			margin-left: -16px;
			margin-top: -16px;
			position: absolute;
			font-size: 14px;
			font-weight: 600;
		}

		.socialwrap {
			background-color: #a4730d;
			color: #ffffff;
			padding: 8px 12px;
			border-radius: 8px 0 8px 0;
			margin-left: -16px;
			margin-top: -16px;
			position: absolute;
			font-size: 14px;
			font-weight: 600;
		}

		.technologicalwrap {
			background-color: #af3c00;
			color: #ffffff;
			padding: 8px 12px;
			border-radius: 8px 0 8px 0;
			margin-left: -16px;
			margin-top: -16px;
			position: absolute;
			font-size: 14px;
			font-weight: 600;
		}

		.environmentalwrap {
			background-color: #437204;
			color: #ffffff;
			padding: 8px 12px;
			border-radius: 8px 0 8px 0;
			margin-left: -16px;
			margin-top: -16px;
			position: absolute;
			font-size: 14px;
			font-weight: 600;
		}

		.legalwrap {
			background-color: #490136;
			color: #ffffff;
			padding: 8px 12px;
			border-radius: 8px 0 8px 0;
			margin-left: -16px;
			margin-top: -16px;
			position: absolute;
			font-size: 14px;
			font-weight: 600;
		}

		.orientation-right {
			top: 60px !important;
			right: 0 !important;
			left: auto !important;
			position: fixed;
		}

		.cardBox {
			border-radius: 8px !important;
			border: none !important;
			padding: 16px 16px 0 16px;
		}

		.card-icons i {
			font-size: 12px;
			color: #919191;
			cursor: pointer;
		}

		.card-icons i:nth-child(2) {
			margin-left: 8px;
		}

		.page-card-desc {
			color: #919191;
			font-size: 12px;
			margin-top: 8px;
		}

		.business-impact {
			color: #1e252d;
			font-weight: 600;
			font-size: 11px;
		}

		.business-impact span:nth-child(2) {
			color: #919191;
			text-transform: none;
			font-weight: 500;
		}

		.next-due p {
			font-size: 12px;
			color: #919191;
			margin-top: 8px;
		}

		.status span i {
			font-size: 14px;
			color: #20eaab;
		}

		.card-footer {
			display: flex !important;
			-webkit-box-orient: horizontal !important;
			-webkit-box-direction: normal !important;
			flex-direction: row !important;
			justify-content: space-evenly;
			text-align: center;
			padding: 10px 0;
		}

		.card-footer-icon i {
			font-size: 18px;
			color: rgb(226, 226, 226) !important;
			cursor: pointer;
		}

		.modal-custom-input {
			border: 1px solid #e5e5e5 !important;
			border-radius: 4px !important;
			width: 98% !important;
			height: 65% !important;
			padding: 0 8px !important;
			font-size: 14px !important;
		}

		.gj-datepicker-md [role="right-icon"] {
			top: 6px;
		}

		.gj-timepicker-md [role="right-icon"] {
			top: 5px;
		}

		.political-impact li {
			font-size: 14px;
			color: #1e252d;
			line-height: 32px;
		}

		.political-impact li i {
			color: #ff0e5e;
		}

		.pestel-indicator {
			background-color: #042c73;
			color: #ffffff;
			padding: 8px 12px;
			border-radius: 8px 0 8px 0;
			margin-left: -16px;
			margin-top: -16px;
			position: absolute;
			font-size: 14px;
			font-weight: 600;
		}

		.custom-control {
			position: relative;
			display: block;
			min-height: 1.5rem;
			padding-left: 2.7rem;
		}

		.status-flag {
			font-size: 14px;
			margin-left: -12px;
			margin-top: 2px;
			position: absolute;
			cursor: pointer;
		}

		.side_border_p {
			background-color: #9c2545 !important;
			border-radius: 8px;
			text-align: center;
		}

		.side_border_e {
			background-color: #002f73 !important;
			border-radius: 8px;
			text-align: center;
		}

		.side_border_s {
			background-color: #a4730d !important;
			border-radius: 8px;
			text-align: center;
		}

		.side_border_t {
			background-color: #af3c00 !important;
			border-radius: 8px;
			text-align: center;
		}

		.side_border_en {
			background-color: #437204 !important;
			border-radius: 8px;
			text-align: center;
		}

		.side_border_l {
			background-color: #490136 !important;
			border-radius: 8px;
			text-align: center;
		}

		#section .container-fluid .collapse_arrow_left .arrow_collapse_size {
			position: fixed;
			background: #fff;
			font-size: 20px !important;
			top: 22%;
			z-index: 999;
			color: #a3a3a3;
			margin-left: -30px;
			padding: 14px 6px 14px 2px;
			border-top: 1px solid #e9ecef;
			border-right: 1px solid #e9ecef;
			border-bottom: 1px solid #e9ecef;
			border-left: 0px solid #e9ecef;
			border-radius: 0px 12px 12px 0px;
			cursor: pointer;
			transition: 0.5s;
		}

		#section .container-fluid .collapse_arrow_right .arrow_collapse_size {
			position: fixed;
			background: #fff;
			font-size: 20px !important;
			top: 22%;
			z-index: 999;
			color: #a3a3a3;
			margin-left: -30px;
			padding: 14px 6px 14px 2px;
			border-top: 1px solid #e9ecef;
			border-right: 1px solid #e9ecef;
			border-bottom: 1px solid #e9ecef;
			border-left: 0px solid #e9ecef;
			border-radius: 0px 12px 12px 0px;
			cursor: pointer;
			transition: 0.5s;
		}

		.input-calender-icon {
			color: #5a6169;
			position: absolute;
			bottom: 26%;
			right: 6%;
			font-size: 16px;
		}

		.input-calender-icon1 {
			color: #5a6169;
			position: absolute;
			bottom: 40%;
			right: 2%;
			font-size: 16px;
		}

		.paging-nav {
			text-align: right;
			padding-top: 2px;
		}

		.paging-nav a {
			margin: 6px 2px;
			text-decoration: none;
			display: inline-block;
			padding: 4px 10px;
			background: #71767a;
			color: #fff !important;
			border-radius: 3px;
		}

		.paging-nav .selected-page {
			background: #1e252d;
			font-weight: bold;
		}

		#fileuploadTable thead tr th {
			border: 1px solid #cecece !important;
			padding: 6px 4px 6px 4px;
			font-size: 12px !important;
			color: #4e4e4e;
			background: #f7f7f7;
			font-weight: 600;
		}

		#fileuploadTable tbody tr td {
			border: 1px solid #cecece !important;
			padding: 8px 4px 8px 4px !important;
			font-size: 12px !important;
			color: #535353;
		}
	</style>

	<div class="sidebarcontent" style="display:none;">
		<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
		<jsp:include page="modal/swot_StrengthModal.jsp"></jsp:include>

		<div id="deleteModalswot" class="modal fade">
			<div class="modal-dialog modal-confirm">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Delete</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">
						<h5 class="confirm-modal-content">Do you really want to delete?</h5>
						<br>
						<div class="form-line right">
							<input type="hidden" id="deleterecordid" /> <input type="hidden" id="deleterecordtype" />
							<button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close"
								data-i18n="Cancel">Cancel</button>
							<button type="button" class="btn btn-danger confirm-modal-deleteBtn"
								onclick="handleswoteventdelete()">Delete</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- <aside id="initiative_sidebar" class="initiative_sidebar">
			<div class="sub_initiatives" id="sub_initiatives"
				style="height: 100%;">
				<div class="card" style="height: 100%;">
					<div class="header d-flex flex-row initiate_sidebar"
						style="margin-top: 5%;">
						<h5 class="prob flex-fill" style="text-align: center;">
							<strong style="color: #333; font-size: 16px;">PESTEL
								ANALYSIS</strong>
						</h5>
					</div>
					<div class="d-flex flex-column" id="initiate_sidebar">
						<div
							class="d-flex flex-column sub_initiative_sidebar_details side_border_p"
							id="political_list">
							<div class="d-flex flex-row p-b-5">
								<div class="d-flex flex-column profile_content">
									<span
										style="font-size: 13px; font-weight: 600; color: #fff; margin: 12px 0 6px 0px; text-transform: uppercase;">POLITICAL</span>
								</div>
							</div>
						</div>

						<div
							class="d-flex flex-column sub_initiative_sidebar_details side_border_e"
							id="economical_list">
							<div class="d-flex flex-row p-b-5">
								<div class="d-flex flex-column profile_content">
									<span
										style="font-size: 13px; font-weight: 600; color: #fff; margin: 12px 0 6px 0px; text-transform: uppercase;">ECONOMICAL</span>
								</div>
							</div>
						</div>

						<div
							class="d-flex flex-column sub_initiative_sidebar_details side_border_s"
							id="social_list">
							<div class="d-flex flex-row p-b-5">
								<div class="d-flex flex-column profile_content">
									<span
										style="font-size: 13px; font-weight: 600; color: #fff; margin: 12px 0 6px 0px; text-transform: uppercase;">SOCIAL</span>
								</div>
							</div>
						</div>

						<div
							class="d-flex flex-column sub_initiative_sidebar_details side_border_t"
							id="technological_list">
							<div class="d-flex flex-row p-b-5">
								<div class="d-flex flex-column profile_content">
									<span
										style="font-size: 13px; font-weight: 600; color: #fff; margin: 12px 0 6px 0px; text-transform: uppercase;">TECHNOLOGICAL</span>
								</div>
							</div>
						</div>

						<div
							class="d-flex flex-column sub_initiative_sidebar_details side_border_en"
							id="environmental_list">
							<div class="d-flex flex-row p-b-5">
								<div class="d-flex flex-column profile_content">
									<span
										style="font-size: 13px; font-weight: 600; color: #fff; margin: 12px 0 6px 0px; text-transform: uppercase;">ENVIRONMENTAL</span>
								</div>
							</div>
						</div>

						<div
							class="d-flex flex-column sub_initiative_sidebar_details side_border_l"
							id="legal_list">
							<div class="d-flex flex-row p-b-5">
								<div class="d-flex flex-column profile_content">
									<span
										style="font-size: 13px; font-weight: 600; color: #fff; margin: 12px 0 6px 0px; text-transform: uppercase;">LEGAL</span>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</aside> -->
	</div>
	<!--#END View -->

	<!--#Multionwer add swot start -->
	<!-- <div class="modal fade swot_add_multiuser_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1"
		aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header modalheadercolor">
					<h6 class="modal-title" id="myLargeModalLabel_1">Edit
						Activities Users</h6>
					<button type="button" class="close getselectedActivitiesUsers" id="activities_current_id"
						data-activities_sub_current_id="" data-dismiss="modal" aria-label="Close">&times;</button>
				</div>

				<div class="row showactivitiesusers" style="
              padding: 0 50px;
              margin-bottom: 10px !important;
              margin-top: 10px;
            ">

					<div class="col-5">
						<div class="form-check">
							<label class="form-check-label" style="padding-left: 12px"><input class="form-check-input"
									id="allusersactivities" type="checkbox" value="" /><span class="form-check-sign">
									<span class="check" style="margin-left: -17px; margin-top: 0"></span></span>All
								Users</label>
						</div>
					</div>
					<div class="col-7 pr-0">
						<span class="pull-right" id="activities_search2" style="margin-right: -12px">
							<i class="fas fa-search border-box"></i>
						</span>
						<span class="pull-right search-section" style="display: none; margin-right: -12px"
							id="activities_search_section2">
							<input type="text" class="search" autocomplete="off" id="searchactivities"
								placeholder="Search" />
							<i class="fas fa-search"></i>
							<i class="fas fa-times" id="activities_close_search2"></i>
						</span>
					</div>
				</div>
				<div id="user_subview" class=""></div>
				<input type="hidden" id="swotajaxid">
				<div class="d-flex flex-column employee_div_body_box sub-ini-box" id="sub-ini-box_view">
					<span id="activities-ini-box_view_users"></span>
				</div>
			</div>
		</div>
	</div> -->
	
	   <div class="modal custom-modal fade swot_add_multiuser_popup" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
            <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Edit Users</h4>
                    <button type="button" class="btn-close getselectedActivitiesUsers" data-bs-dismiss="modal" aria-label="Close" id="activities_current_id"></button>
                </div>

                <div class="modal-body d-grid gap-3">

                    <div class="attendees-search">
                        <div>
                            <div class="form-check cusom-check">
                                <input class="form-check-input" type="checkbox" value="" id="allusersactivities">
                                <label class="form-check-label check" for="allusers">
                                    All Users
                                </label>
                            </div>
                        </div>
                        <div class="search">
                            <div class="input-group input-group-sm">
                                <input type="text" class="form-control" placeholder="Recipient's username"
                                    aria-label="Recipient's username" aria-describedby="button-addon2">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                                    <i class="fas fa-search" data-toggle="tooltip" data-placement="bottom" title=""
                                        data-original-title="Files"></i>
                                </button>
                            </div>
                        </div>
                    </div>
	                  <div id="user_subview" class=""></div>
				            <input type="hidden" id="swotajaxid">
                    <div class="list-group add-attendees">
                      
                      
                    </div>
                </div>
            </div>
        </div>
    </div>
	<!--#Multionwer add swot end -->

	<!-- <div id="addpeople" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <div class="modal-content">
                
                <div class="modal-header">
                    <h4 class="modal-title">Edit Users</h4>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="row showallusericon" style="
              padding: 0 50px;
              margin-bottom: 10px !important;
              margin-top: 10px;
            ">

                    <div class="col-5">
                         <div class="form-check cusom-check">
                                <input class="form-check-input" type="checkbox" value="" id="allusersaccess">
                                <label class="form-check-label" for="allusers">
                                    All Users
                                </label>
                            </div>
                    </div>
                    <div class="col-7 pr-0">
                        <span class="pull-right" id="search2" style="margin-right: -12px">
                            <i class="fas fa-search border-box"></i>
                        </span>
                        <span class="pull-right search-section" style="display: none; margin-right: -12px"
                            id="search_section2">
                            <input type="text" class="search" autocomplete="off" id="searchrecommendation"
                                placeholder="Search" />
                            <i class="fas fa-search"></i>
                            <i class="fas fa-times" id="close_search2"></i>
                        </span>
                    </div>
                </div>
                <input type="hidden" id="responsibleid">
                <div class="d-flex flex-column employee_div_body_box sub-ini-box" id="sub-ini-box_view">
                    <span class="listusers"> </span>
                </div>


            </div>
        </div>
    </div> -->

    <div class="modal custom-modal fade" id="addpeople" data-backdrop="static" data-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Edit Users</h4>
                    <button type="button" class="btn-close peopleselectedUsers" data-dismiss="modal" id="actionsclosePopupId" aria-label="Close"></button>
                </div>

                <div class="modal-body d-grid gap-3">
                    <div class="attendees-search">
                        <div>
                            <div class="form-check cusom-check">
                                <input class="form-check-input" type="checkbox" value="" id="allusersaccess">
                                <label class="form-check-label" for="allusers" >
                                    All Users
                                </label>
                            </div>
                        </div>
                        <div class="search">
                            <div class="input-group input-group-sm">
                                <input type="text" class="form-control" placeholder="Recipient's username"
                                    aria-label="Recipient's username" aria-describedby="button-addon2" id="searchrecommendation">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                                    <i class="fas fa-search" data-toggle="tooltip" data-placement="bottom" title=""
                                        data-original-title="Files"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="list-group add-attendees">
                        <input type="hidden" id="responsibleid">
                        <span class="listusers"> </span>
                       
                        
                    </div>
                </div>
            </div>
        </div>
    </div>


	     <div class="modal custom-modal fade" id="addpeopleactions" data-backdrop="static" data-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Edit Users</h4>
                    <button type="button" class="btn-close actionpeopleselectedUsers" data-dismiss="modal" id="actionsclosePopupId" aria-label="Close"></button>
                </div>

                <div class="modal-body d-grid gap-3">
                    <div class="attendees-search">
                        <div>
                            <div class="form-check cusom-check">
                                <input class="form-check-input" type="checkbox" value="" id="allusersactions">
                                <label class="form-check-label" for="allusers" >
                                    All Users
                                </label>
                            </div>
                        </div>
                        <div class="search">
                            <div class="input-group input-group-sm">
                                <input type="text" class="form-control" placeholder="Recipient's username"
                                    aria-label="Recipient's username" aria-describedby="button-addon2" id="searchactions">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                                    <i class="fas fa-search" data-toggle="tooltip" data-placement="bottom" title=""
                                        data-original-title="Files"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="list-group add-attendees">
                        <input type="hidden" id="actionsresponsibleid">
                        <span class="actionslistusers"> </span>
                       
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="modal custom-modal fade" id="addpeopleactions" data-backdrop="static" data-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Edit Users</h4>
                    <button type="button" class="btn-close actionpeopleselectedUsers" data-dismiss="modal" id="actionsclosePopupId" aria-label="Close"></button>
                </div>

                <div class="modal-body d-grid gap-3">
                    <div class="attendees-search">
                        <div>
                            <div class="form-check cusom-check">
                                <input class="form-check-input" type="checkbox" value="" id="allusersactions">
                                <label class="form-check-label" for="allusers" >
                                    All Users
                                </label>
                            </div>
                        </div>
                        <div class="search">
                            <div class="input-group input-group-sm">
                                <input type="text" class="form-control" placeholder="Recipient's username"
                                    aria-label="Recipient's username" aria-describedby="button-addon2" id="searchactions">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                                    <i class="fas fa-search" data-toggle="tooltip" data-placement="bottom" title=""
                                        data-original-title="Files"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="list-group add-attendees">
                        <input type="hidden" id="actionsresponsibleid">
                        <span class="actionslistusers"> </span>
                       
                        
                    </div>
                </div>
            </div>
        </div>
    </div> -->

	<div id="SendingAttachment" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header" style="background-color: #1e252d; color: #fff;">
					<h6 class="modal-title" color : #f0f2f5; id="">Please wait</h6>
				</div>
				<div class="modal-body">
					<h6>Sending Attachment...</h6>
				</div>
			</div>
		</div>
	</div>

	<div id="ViewAttachment" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header" style="background-color: #1e252d; color: #fff;">
					<h6 class="modal-title" color : #f0f2f5; id="">View Link</h6>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<h6>Click view below link</h6>
					<a href="" target="_blank" id="awsviewlink"></a>
				</div>
			</div>
		</div>
	</div>

	<!-- Recommendation Modal -->
	   <div class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" id="recommendation"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" data-translate="Recommendation">Recommendation</h5>
                    
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="recommendationtype" id="recommendationtype">
                    <input type="hidden" name="recommendationtype" id="recommendationcount">
                    <table class="table tab-sm table-bordered align-center" id="note_table">
                        <thead>
                            <tr>
                                <th class="text-center" data-translate="Recommendation">Recommendation</th>
                                <th class="text-center" data-translate="Responsible">Responsible</th>
                                <th class="text-center" data-translate="Action">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                           
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary recommendationclose" data-dismiss="modal"
                        data-i18n="Cancel" data-translate="Cancel">
                        Cancel
                    </button>
                    <button class="btn btn-primary" onclick="recommendationsubmit()" data-i18n="Save" data-translate="Save">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
	<!-- <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="recommendation"
		tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div
			class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Notes</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				
				<div class="modal-body">
					<input type="hidden" name="recommendationtype" id="recommendationtype">
					<input type="hidden" name="recommendationtype" id="recommendationcount">
					<table class="table tab-sm table-bordered align-center" id="note_table">
						<thead>
							<tr>
								<th class="text-center">Recommendation</th>
								<th class="text-center">Responsible</th>
								<th class="text-center">Actions</th>
							</tr>
						</thead>
						<tbody id="recommendationbody">
					</table>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
						Cancel
					</button>
					<button class="btn btn-primary" value="Save" onclick="recommendationsubmit()">Save
					</button>
				</div>
			</div>
		</div>
	</div> -->
	<!-- <div id="recommendation" class="modal fade" role="dialog">
		<div class="modal-dialog modal-lg" style="margin-top: 8%;">
			
			<div class="modal-content">
				<div class="modal-header">
					<h4>Recommendation</h4>
					<div class="float-right addmeetingoption">
						<button onclick="notes('note_table')" class="form-control rounded-circle"
							style="margin-top: -4px; border: none;">
							<i class="fa fa-plus"></i>
						</button>
					</div>
					<div class="float-right closemeetingoption" style="display:none;">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
				</div>
				<div class="modal-body">
					<input type="hidden" name="recommendationtype" id="recommendationtype">
					<input type="hidden" name="recommendationtype" id="recommendationcount">
					<table id="note_table" class="table table-bordered">
						<thead class="bg-light">
							<tr>
								<th>Recommendation</th>
								<th style="width: 50px;">Responsible</th>
								<th style="width: 50px;">Actions</th>
							</tr>
						</thead>
						<tbody id="recommendationbody">
						</tbody>
					</table>

					<div class="row m-t-10">
						<div class="col-md-12">
							<hr />
						</div>
						<div class="col-12">
							<div class="form-line right actionsbtn">
								<button type="button" class="btn-default1 btn recommendationclose" data-dismiss="modal">
									Cancel
								</button>
								<button class="initative_save_btn" onclick="recommendationsubmit()" data-i18n="Save">
									Save
								</button>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div> -->

	<!-- Action Modal -->
  <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="action" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" data-translate="">Actions/Tasks</h5>
					<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<input type="hidden" id="actionsid">
					<input type="hidden" name="recommendationtype" id="actiontype">
					<input type="hidden" name="recommendationtype" id="actioncount">
					<table class="table table-sm table-bordered align-center" id="action_table">
						<thead>
							<tr>
								<th class="text-center" data-translate="">Actions/Tasks</th>
								<!-- <th class="text-center" data-translate="">From Date</th>
								<th class="text-center" data-translate="">To Date</th>
								<th class="text-center" data-translate="Responsible">Responsible</th>
								<th class="text-center" data-translate="Status">Status</th> -->
								<th class="text-center" data-translate="Action">Actions</th>
							</tr>
						</thead>
						<tbody id="actionBodyData">

						</tbody>
					</table>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-label-secondary" data-dismiss="modal" aria-label="Close" data-translate="Cancel">
						Cancel
					</button>
					<button class="btn btn-primary" value="Save" onclick="actionssubmit()" data-translate="Save">Save
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- <div id="action" class="modal fade" role="dialog">
		<div class="modal-dialog modal-lg" style="margin-top: 6%; max-width: 60% !important;">
			
			<div class="modal-content">
				<div class="modal-header">
					<h4>Actions</h4>
					<div class="float-right addactmeetingoption">
						<button onclick="action('action_table')" class="form-control rounded-circle"
							style="margin-top: -4px; border: none;">
							<i class="fa fa-plus"></i>
						</button>
					</div>
					<div class="float-right closeactmeetingoption" style="display:none;">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
				</div>
				<div class="modal-body">
					<input type="hidden" id="actionsid">
					<input type="hidden" name="recommendationtype" id="actiontype">
					<input type="hidden" name="recommendationtype" id="actioncount">
					<table id="action_table" class="table table-bordered">
						<thead class="bg-light">
							<tr>
								<th>Actions</th>
								<th style="width: 150px;">By Date</th>
								<th style="width: 50px;">Responsible</th>
								<th style="width: 50px;">Status</th>
								<th style="width: 50px;">Actions</th>
							</tr>
						</thead>
						<tbody id="actionbody">

						</tbody>
					</table>

					<div class="row m-t-10">
						<div class="col-md-12">
							<hr />
						</div>
						<div class="col-12">
							<div class="form-line right actionsbtn">
								<button type="button" class="btn-default1 btn actionclose" data-dismiss="modal">
									Cancel
								</button>
								<button class="initative_save_btn" onclick="actionssubmit()" data-i18n="Save">
									Save
								</button>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div> -->

	<!-- File upload Modal -->
	  <div class="modal custom-modal fade" id="uploaded_files" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <!-- <div class="modal-header">
                    <h5 >Attachments</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div> -->
                <div class="modal-header">
                    <h4 data-i18n="File Upload" data-translate="Attachments">Attachments</h4>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="card border-0">
                        <div class="card-body">
                            <div class="row">
                                <div class="attachment-upload">
                                    <div class="input-group mb-1"
                                        style="display: flex; align-items: stretch; width: 100%;">
                                        <input type="file" class="form-control" id="attachementuploadfile"
                                            accept=".pdf,.ppt,.jpeg,.xlsx,.doc,.docx"
                                            style="flex: 1; border-top-right-radius: 0; border-bottom-right-radius: 0;">
                                        <button type="button" id="attachementupload"
                                            style="border: 1px solid #ced4da; background-color: #e9ecef; padding: 6px 12px; border-left: none; border-top-left-radius: 0; border-bottom-left-radius: 0;" data-translate="Upload">
                                            Upload
                                        </button>
                                    </div>
                                    <div class="mb-3 form-text">Supported file type (jpeg, pdf, pptx, xlsx, docx)</div>
                                </div>
                            </div>

                            <input type="hidden" id="fileuploadtype">
                            <input type="hidden" id="fileuploadcount">
                            <div class="table-responsive">
                                <div class="table-responsive" id="listfileuploadTable"></div>
                            </div>
                        </div>

                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-dismiss="modal" aria-label="Close" data-translate="Cancel">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-translate="Save">Save
                    </button>
                </div>
            </div>
        </div>
    </div>

	<!-- File Upload PopUp -->
	<div class="modal fade" id="file_upload_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
		aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4 data-i18n="File Upload">File Upload</h4>
					<button type="button" id="closeUpload" class="close pull-right" data-dismiss="modal">
						&times;</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="form-group col-md-10" style="padding-right: 4px;">
							<input type="file" class="modal-custom-input" id="attachementuploadfile"
								style="height: 38px !important; padding: 5px !important; margin-bottom: 8px;"
								accept=".pdf,.ppt,.jpeg,.xlsx,.doc,.docx" /> <span>Supported
								file type (jpeg,pdf,pptx,xlsx,docx)</span>
						</div>
						<div class="form-group col-md-2" style="padding-left: 4px;">
							<button type="button" id="attachementupload"
								class="btn custom-form-control btn-custom-primary">
								Upload</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- File Upload PopUp -->
	<div class="modal fade" id="file_upload_popup1" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
		aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4>File Upload</h4>
					<button type="button" id="closeUpload" class="close pull-right" data-dismiss="modal">
						&times;</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="form-group col-md-10" style="padding-right: 4px;">
							<input type="file" class="modal-custom-input" id="attachementuploadfile1"
								style="height: 38px !important; padding: 5px !important; margin-bottom: 8px;"
								accept=".pdf,.ppt,.jpeg,.xlsx,.doc,.docx" /> <span>Supported
								file type (jpeg,pdf,pptx,xlsx,docx)</span>
						</div>
						<div class="form-group col-md-2" style="padding-left: 4px;">
							<button type="button" id="attachementupload1"
								class="btn custom-form-control btn-custom-primary">
								Upload</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div id="deleteAttachmentModal" class="modal fade">
		<div class="modal-dialog modal-confirm">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Delete</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<h5 class="confirm-modal-content">Do you really want to delete?</h5>
					<br>
					<div class="form-line right">
						<button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close"
							data-i18n="Cancel">Cancel</button>
						<button type="button" class="btn btn-danger confirm-modal-deleteBtn"
							onclick="deleteuploadAttachment()">Delete</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<main class="pt-2 pb-2">


		<div class="container-lg">
			<div class="page-header grid gap-2 pb-1">
				<div class="g-col-8 d-flex align-items-center">
					<h4 class="title">
						<span class="icon">
							<img src="/stratroom/images/pestel-i.svg" alt="PESTEL Analysis" title="PESTEL Analysis"
								width="16" height="16">
								<!-- <i data-lucide="brain" style="width: 18px; height: 18px;"></i> -->
						</span>
						<span data-translate="title">PESTEL ANALYSIS</span>
					</h4>
				</div>
				<div class="load-page page-actions g-col-4">


					<div class="page-icons">
						<ul>
							<li>
								<a href="#" data-bs-toggle="modal">
									<span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="View">
										<img src="/stratroom/images/view-i.svg" width="12" height="12" />
										 <!-- <i data-lucide="eye" style="width: 18px; height: 18px;"></i> -->
									</span>
								</a>
							</li>
							<li>
								<a href="#file-validate-form" data-bs-toggle="modal">
									<span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Import">
										<img src="/stratroom/images/import-i.svg" width="12" height="12" alt="import"
											title="import">
											<!-- <i data-lucide="import" style="width: 18px; height: 18px;"></i> -->
									</span>
								</a>
							</li>
							<li>
								<a href="#" data-bs-toggle="modal">
									<span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Export">
										<img src="/stratroom/images/export-i.svg" width="12" height="12" alt="import"
											title="Export">
											<!-- <i data-lucide="file-up" style="width: 18px; height: 18px;"></i> -->
									</span>
								</a>
							</li>


						</ul>
					</div>

				</div>
			</div>
		</div>

		<c:if test="${userPrincipal != null}">
			<input id="userPrincipal" type="hidden" name="userPrincipal" value="<c:out value="
				${userPrincipal.profile.empId}" />">
		</c:if>
		<c:if test="${pagenumber != null}">
			<input id="pagenumber" type="hidden" name="pagenumber" value="<c:out value=" ${pagenumber}" />">
		</c:if>

		<div class="container-fluid" style="display: none;">

			<div class="collapse_arrow_right" style="display: none;">
				<i class="arrow_collapse_size fas fa-caret-right"></i>
			</div>
			<!-- <div class="collapse_arrow_left">
				<i class="arrow_collapse_size fas fa-caret-left"></i>
			</div> -->

			<jsp:include page="templates/pestelchild.jsp"></jsp:include>
			<script id="swot-strength-template-parent" type="x-tmpl-mustache">
				{{{bodyRows}}}
			</script>

			<div class="row" id="strength_section"></div>
		</div>




	</main>
	<footer class="col-12 text-center py-2 copyright" 
			style="position:fixed; bottom:0; left:0; width:100%; margin:0; padding:8px;">
				<p class="mb-0" style="margin:0;">Copyright &copy; 
				<span id="year"></span> <strong>StratRoom</strong>
				</p>

				<script>
				document.getElementById("year").textContent = new Date().getFullYear();
				</script>
			</footer>

	<div class="floating-box shadow-sm">
		<a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/organization-i.svg" width="18"
					height="18" alt="organization"></span></a>
		<a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/template.svg" width="18"
					height="18" alt="organization"></span></a>
	</div>

	<!-- <section class="content" id="section">

	

		<div class="page-header row no-gutters py-2 m-t-70" style="display:none;">
			<div
				class="col-lg-6 col-md-6 text-center text-sm-left pt-2 mb-0 ml-4">
				<h5 class="page-title"
					style="font-weight: 600; text-transform: uppercase;" data-i18n="PESTEL">PESTEL</h5>
			</div>
		</div>
		<c:if test="${userPrincipal != null}">
			<input id="userPrincipal" type="hidden" name="userPrincipal" value="<c:out value="
				${userPrincipal.profile.empId}" />">
		</c:if>
		<c:if test="${pagenumber != null}">
			<input id="pagenumber" type="hidden" name="pagenumber" value="<c:out value=" ${pagenumber}" />">
		</c:if>
		
		<div class="container-fluid" style="display: none;">
			
			<div class="collapse_arrow_right" style="display: none;">
				<i class="arrow_collapse_size fas fa-caret-right"></i>
			</div>
			<div class="collapse_arrow_left">
				<i class="arrow_collapse_size fas fa-caret-left"></i>
			</div>

			<jsp:include page="templates/pestelchild.jsp"></jsp:include>
			<script id="swot-strength-template-parent" type="x-tmpl-mustache">
				{{{bodyRows}}}
			</script>

			<div class="row" id="strength_section"></div>
		</div>


		
		<div id="impact" class="modal fade" role="dialog">
			<div class="modal-dialog">
				
				<div class="modal-content">
					<div class="modal-header">
						
						<h4>Impacts</h4>
					</div>
					<div class="modal-body">
						<p data-i18n="Impact">Impact</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>


		
		<div class="modal fade file_upload_popup" tabindex="-1" role="dialog"
			aria-labelledby="myLargeModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h6 class="modal-title" id="myLargeModalLabel">File Upload</h6>
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="row">
							<form action="" method="post" enctype="multipart/form-data">
								<div class="col-md-12" style="width: 100%; margin-bottom: 2%;">
									<input type="file"
										style="padding-bottom: 12%; padding-top: 3%; padding-right: 5%;"
										class="form-control" id="images" name="images[]"
										onchange="preview_images();" multiple />
								</div>
								<div class="col-md-12" style="margin-bottom: 6%;">
									<input type="submit" class="btn" name="submit_image"
										style="background-color: #1e252d; color: #ffff;"
										value="Upload Multiple Image" />
								</div>
							</form>
						</div>
						<div class="row" id="image_preview"></div>
					</div>
				</div>
			</div>
		</div>

	
		<div id="input" class="modal fade" role="dialog">
			<div class="modal-dialog">
				
				<div class="modal-content">
					<div class="modal-header"
						style="background-color: #1e252d; color: #fff;">
						
						<h4>Input Form</h4>
					</div>
					<div class="modal-body">
						<div>
							<textarea class="form-control" rows="4" cols="80"
								name="input_form_text" id="input_form_text"> </textarea>
							<div class="text-right color-white">
								<br /> <input class="btn green_btn" id="inputform_sbt"
									style="background-color: #1e252d; color: #fff;" type="submit"
									value="Submit" />
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close
						</button>
					</div>
				</div>
			</div>
		</div>

		
		<div id="flag" class="modal fade" role="dialog">
			<div class="modal-dialog">
				
				<div class="modal-content">
					<div class="modal-header">
						
						<h4>Status</h4>
					</div>
					<div class="modal-body">
						<div>
							<div class="row">
								<div class="col-md-4 custom-control custom-radio">
									<input type="radio" class="custom-control-input"
										id="defaultChecked1" name="statusflag" value="flag-green"
										checked /> <label class="custom-control-label"
										for="defaultChecked1"><img src="${contextroot}/images/flag-green.png"
										alt="status" width="23px" height="23px" /></label>
								</div>
								<div class="col-md-4 custom-control custom-radio">
									<input type="radio" class="custom-control-input"
										id="defaultChecked2" name="statusflag" value="flag-orange" />
									<label class="custom-control-label" for="defaultChecked2"><img
										src="${contextroot}/images/flag-orange.png" alt="status" width="23px"
										height="23px" /></label>
								</div>
								<div class="col-md-4 custom-control custom-radio">
									<input type="radio" class="custom-control-input"
										id="defaultChecked3" name="statusflag" value="flag-red" /> <label
										class="custom-control-label" for="defaultChecked3"> <img
										src="${contextroot}/images/flag-red.png" alt="status" width="23px"
										height="23px" />
									</label>
								</div>
							</div>
							<br />

							<button type="button" class="form-control green_form addflagb">
								Submit</button>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">
							Close</button>
					</div>
				</div>
			</div>
		</div>
	</section> -->

	<!-- Plugins Js -->
	<script src="${contextroot}/js/paging.js"></script>
	<script src="${contextroot}/js/datepickerair.js"></script>
	<script src="${contextroot}/js/datepicker.en.js"></script>
	<script src="${contextroot}/js/widgets.js"></script>
	<script src="${contextroot}/js/chosen.jquery.min.js"></script>
	<script src="${contextroot}/js/pestelanalysisnew.js"></script>
	<script>
		$('.swot_add_multiuser_popup,#addpeople,#addpeopleactions')
			.modal({
				show: false,
				backdrop: 'static',
				keyboard: false
			});
		$('.modal-dialog').draggable({
			handle: ".modal-header"
		});

		$.fn.select2.amd.define("SearchableSingleSelection", [
			"select2/utils",
			"select2/selection/single",
			"select2/selection/eventRelay",
			"select2/dropdown/search"
		],
			function (Utils, SingleSelection, EventRelay, DropdownSearch) {
				var adapter = Utils.Decorate(SingleSelection, DropdownSearch);
				adapter = Utils.Decorate(adapter, EventRelay);

				adapter.prototype.render = function () {
					var $rendered = DropdownSearch.prototype.render.call(this, SingleSelection.prototype.render);

					this.$searchContainer.hide();
					this.$element.siblings('.select2').find('.selection').prepend(this.$searchContainer);

					return $rendered;
				};

				var bindOrigin = adapter.prototype.bind;
				adapter.prototype.bind = function (container) {
					var self = this;

					bindOrigin.apply(this, arguments);

					container.on('open', function () {
						self.$selection.hide();
						self.$searchContainer.show();
					});

					container.on('close', function () {
						self.$searchContainer.hide();
						self.$selection.show();
					});
				};

				return adapter;
			});

		/*
		* A select2 adapter to show simple dropdown list without a searchbox inside
		*/
		$.fn.select2.amd.define("UnsearchableDropdown", [
			"select2/utils",
			"select2/dropdown",
			"select2/dropdown/attachBody",
			"select2/dropdown/closeOnSelect"
		],

			function (Utils, Dropdown, AttachBody, CloseOnSelect) {
				var adapter = Utils.Decorate(Dropdown, AttachBody);
				adapter = Utils.Decorate(adapter, CloseOnSelect);
				return adapter;
			});


		$('#swot_strength_Form #strength_impact,#swot_strength_Form #department_swot').select2({
			selectionAdapter: $.fn.select2.amd.require("SearchableSingleSelection"),
			dropdownAdapter: $.fn.select2.amd.require("UnsearchableDropdown")
		});
	</script>