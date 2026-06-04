<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <c:set var="contextroot" value="${pageContext.request.contextPath}" />
    <!-- <link href="${contextroot}/css/initatives.css" rel="stylesheet" />
<link href="${contextroot}/css/custom.css" rel="stylesheet">
<link href="${contextroot}/css/icheck-bootstrap.min.css" rel="stylesheet" />
<link rel="stylesheet" href="${contextroot}/css/employee.css" rel="stylesheet" /> -->

    <style>
.avatar-initial {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: bold;
  text-transform: uppercase;
}
    </style>
    <script>
        /*function preview_images() {
            var total_file = document.getElementById("images").files.length;
            for (var i = 0; i < total_file; i++) {
                $("#image_preview").append(
                    "<div class='col-md-3' style='padding-bottom: 4%' '><img class='img-responsive' src='" +
                    URL.createObjectURL(event.target.files[i]) +
                    "'></div>"
                );
            }
        }*/
    </script>




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
                        <h5 class="confirm-modal-content" data-translate="Do you really want to delete">Do you really want to delete?</h5>
                        <br>
                        <div class="form-line right">
                            <input type="hidden" id="deleterecordid" /> <input type="hidden" id="deleterecordtype" />
                            <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close"
                                data-i18n="Cancel" data-translate="Cancel">Cancel</button>
                            <button type="button" class="btn btn-danger confirm-modal-deleteBtn"
                                onclick="handleswoteventdelete()" data-translate="Delete">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 
        <div class="modal custom-modal custom-delete-modal fade" id="delete-modal deleteModalswot" data-backdrop="static"
		data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        
		<div class="modal-dialog modal-dialog-centered" style="--stratroom-modal-width:320px" >
		  <div class="modal-content">
			<div class="modal-body">
			  <div class="card custom-card delete-card border-0">
				<div class="card-body">
	
				   <div class="delete-box">
				  <h4 class="title">Do you really want to delete?</h4>              
				  <div class="btn-wrap">
					<button type="button" class="btn btn-sm btn-label-secondary rounded-pill" data-dismiss="modal" aria-label="Close">
					  Cancel
					</button>
					<button class="btn btn-sm btn-danger rounded-pill orgDeleteconfirm" value="Yes" onclick="handleswoteventdelete()">Delete</button>
				  </div>
				</div>
				</div>
			  </div>
			</div>
	
		  </div>
		</div>
	  </div> -->

        <div id="deleteAttachmentModal" class="modal fade">
            <div class="modal-dialog modal-confirm">
                <div class="modal-content">
                    <div class="modal-header" style="display: flex; justify-content: space-between;">
                        <h4 class="modal-title">Delete</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <h5 class="confirm-modal-content" data-translate="Do you really want to delete">Do you really want to delete?</h5>
                        <br>
                        <div class="form-line right">
                            <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close"
                                data-i18n="Cancel" data-translate="Cancel">Cancel</button>
                            <button type="button" class="btn btn-danger confirm-modal-deleteBtn"
                                onclick="deleteuploadAttachment()" data-translate="Delete">Delete</button>
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
							<strong style="color: #333; font-size: 16px;">SWOT
								ANALYSIS</strong>
						</h5>
					</div>
					<div class="d-flex flex-column" id="initiate_sidebar">
						<div
							class="d-flex flex-column sub_initiative_sidebar_details side_border_s"
							id="strength_list">
							<div class="d-flex flex-row p-b-5">
								<div class="d-flex flex-column profile_content">
									<span
										style="font-size: 13px; font-weight: 600; color: #fff; margin: 12px 0 6px 0px; text-transform: uppercase;">Strengths</span>
								</div>
							</div>
						</div>

						<div
							class="d-flex flex-column sub_initiative_sidebar_details side_border_w"
							id="weaknesses_list">
							<div class="d-flex flex-row p-b-5">
								<div class="d-flex flex-column profile_content">
									<span
										style="font-size: 13px; font-weight: 600; color: #fff; margin: 12px 0 6px 0px; text-transform: uppercase;">Weaknesses</span>
								</div>
							</div>
						</div>

						<div
							class="d-flex flex-column sub_initiative_sidebar_details side_border_o"
							id="oppurtunities_list">
							<div class="d-flex flex-row p-b-5">
								<div class="d-flex flex-column profile_content">
									<span
										style="font-size: 13px; font-weight: 600; color: #fff; margin: 12px 0 6px 0px; text-transform: uppercase;">Opportunities</span>
								</div>
							</div>
						</div>

						<div
							class="d-flex flex-column sub_initiative_sidebar_details side_border_t"
							id="threats_list">
							<div class="d-flex flex-row p-b-5">
								<div class="d-flex flex-column profile_content">
									<span
										style="font-size: 13px; font-weight: 600; color: #fff; margin: 12px 0 6px 0px; text-transform: uppercase;">Threats</span>
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
    <div class="modal custom-modal fade" id="swot_add_multiuser_popup"  data-bs-backdrop="static" data-bs-keyboard="false"
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
    <!-- <div class="modal custom-modal fade" id="addpeople" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Edit Users</h4>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body d-grid gap-3">
                    <div class="attendees-search">
                        <div>
                            <div class="form-check">
                                <label class="form-check-label" style="padding-left: 12px"><input class="form-check-input"
                                        id="allusersaccess" type="checkbox" value="" /><span class="form-check-sign">
                                        <span class="check" style="margin-left: -17px; margin-top: 0"></span></span>All
                                    Users
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
                    <div class="list-group add-attendees">
                         <input type="hidden" id="responsibleid">
                <div class="d-flex flex-column employee_div_body_box sub-ini-box" id="sub-ini-box_view">
                    <span class="listusers"> </span>
                </div>
                    </div>
                </div>
            </div>
        </div>
       </div> -->

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

    <!-- <div id="addpeopleactions" class="modal fade" role="dialog">
        <div class="modal-dialog">
          
            <div class="modal-content">
                <div class="modal-header" style="background-color: #1e252d; color: #fff;">
                    <h6 class="modal-title" color : #f0f2f5; id="myLargeModalLabel_1">Edit
                        People</h6>
                    <button type="button" class="close actionpeopleselectedUsers" id="actionsclosePopupId"
                        data-dismiss="modal" aria-label="Close">&times;
                    </button>
                </div>
                <div class="row showalluseractions" style="
              padding: 0 50px;
              margin-bottom: 10px !important;
              margin-top: 10px;
            ">

                    <div class="col-5">
                        <div class="form-check">
                            <label class="form-check-label" style="padding-left: 12px"><input class="form-check-input"
                                    id="allusersactions" type="checkbox" value="" /><span class="form-check-sign">
                                    <span class="check" style="margin-left: -17px; margin-top: 0"></span></span>All
                                Users</label>
                        </div>
                    </div>
                    <div class="col-7 pr-0">
                        <span class="pull-right" id="actions_search2" style="margin-right: -12px">
                            <i class="fas fa-search border-box"></i>
                        </span>
                        <span class="pull-right search-section" style="display: none; margin-right: -12px"
                            id="actions_search_section2">
                            <input type="text" class="search" autocomplete="off" id="searchactions"
                                placeholder="Search" />
                            <i class="fas fa-search"></i>
                            <i class="fas fa-times" id="action_close_search2"></i>
                        </span>
                    </div>
                </div>
                <div class="d-flex flex-column employee_div_body_box sub-ini-box" id="sub-ini-box_view">
                    <input type="hidden" id="actionsresponsibleid"> <span class="actionslistusers"> </span>
                </div>
              
            </div>
        </div>
    </div> -->

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
    <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="recommendation"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" data-translate="Recommendation">Recommendation</h5>
                    
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                    <button type="button" class="btn btn-label-secondary recommendationclose" data-bs-dismiss="modal"
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
                                <button type="button" class="btn-default1 btn recommendationclose" data-dismiss="modal"
                                    data-i18n="Cancel">
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

                <h4>Actions</h4>
                <div class="float-right addactmeetingoption">
                    <button onclick="action('action_table')" class="form-control rounded-circle"
                        style="margin-top: -4px; border: none;">
                        <i class="fa fa-plus"></i>
                    </button>

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
                                <button type="button" class="btn-default1 btn actionclose" data-dismiss="modal"
                                    data-i18n="Cancel">
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
    <!-- <div id="uploaded_files" class="modal fade" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-lg">
         
            <div class="modal-content">
                <div class="modal-header">
                    <h4 data-i18n="File Upload">File Uploaddd</h4>
                    <button type="button" class="close pull-right" data-dismiss="modal">
                        &times;</button>
                </div>
                <div class="modal-body">
                    <div class="row" style="padding: 16px;">
                        <div class="col-md-12" style="margin-top: -12px; padding-bottom: 8px;">
                            <button class="btn btn-custom-secondary addfilemeetingoption" data-toggle="modal"
                                data-target="#file_upload_popup">
                                <i class="fa fa-plus" data-toggle="tooltip" data-placement="bottom" title="Add"></i>
                            </button>
                        </div>
                        <input type="hidden" id="fileuploadtype">
                        <input type="hidden" id="fileuploadcount">
                        <div class="col-md-12">
                            <div class="tableBody">
                                <div class="table-responsive" id="listfileuploadTable">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->

    <div class="modal custom-modal fade" id="uploaded_files" tabindex="-1" role="dialog"
        aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <!-- <div class="modal-header">
                    <h5 >Attachments</h5>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
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
                    <button class="btn btn-primary" value="Save" data-dismiss="modal" data-translate="Save">Save
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
                    <h4 data-i18n="File Upload">File Upload</h4>
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



    <!-- Modal -->
    <div id="impact" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <!--button type="button" class="close pull-right" data-dismiss="modal">&times;</button-->
                    <h4>Impacts</h4>
                </div>
                <div class="modal-body">
                    <p data-i18n="Impact">Impact</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default data-dismiss=" modal">Close</button>
                </div>
            </div>
        </div>
    </div>


    <!-- File Upload PopUp -->
    <div class="modal fade file_upload_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="myLargeModalLabel" data-i18n="File Upload">File Upload</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <form action="" method="post" enctype="multipart/form-data">
                            <div class="col-md-12" style="width: 100%; margin-bottom: 2%;">
                                <input type="file" style="padding-bottom: 12%; padding-top: 3%; padding-right: 5%;"
                                    class="form-control" id="images" name="images[]" onchange="preview_images();"
                                    multiple />
                            </div>
                            <div class="col-md-12" style="margin-bottom: 6%;">
                                <input type="submit" class="btn" name="submit_image"
                                    style="background-color: #1e252d; color: #ffff;" value="Upload Multiple Image" />
                            </div>
                        </form>
                    </div>
                    <div class="row" id="image_preview"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- End of File Upload PopUp -->

    <!-- Modal -->
    <div id="input" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header" style="background-color: #1e252d; color: #fff;">
                    <!--button type="button" class="close pull-right" data-dismiss="modal">&times;</button-->
                    <h4>Input Form</h4>
                </div>
                <div class="modal-body">
                    <div>
                        <textarea class="form-control" rows="4" cols="80" name="input_form_text"
                            id="input_form_text"> </textarea>
                        <div class="text-right color-white">
                            <br /> <input class="btn green_btn" id="inputform_sbt"
                                style="background-color: #1e252d; color: #fff;" type="submit" value="Submit" />
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

    <!-- Modal -->
    <div id="flag" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">

                    <h4>Status</h4>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="row">
                            <div class="col-md-4 custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="defaultChecked1" name="statusflag"
                                    value="flag-green" checked /> <label class="custom-control-label"
                                    for="defaultChecked1"><img src="${contextroot}/images/flag-green.png" alt="status"
                                        width="23px" height="23px" /></label>
                            </div>
                            <div class="col-md-4 custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="defaultChecked2" name="statusflag"
                                    value="flag-orange" />
                                <label class="custom-control-label" for="defaultChecked2"><img
                                        src="${contextroot}/images/flag-orange.png" alt="status" width="23px"
                                        height="23px" /></label>
                            </div>
                            <div class="col-md-4 custom-control custom-radio">
                                <input type="radio" class="custom-control-input" id="defaultChecked3" name="statusflag"
                                    value="flag-red" /> <label class="custom-control-label" for="defaultChecked3"> <img
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

    <main class="pt-2 pb-2">
        <div class="container-lg">
            <div class="page-header grid gap-2 pb-1">
                <div class="g-col-8 d-flex align-items-center">
                    <h4 class="title">
                        <span class="icon">
                            <img src="/stratroom/images/swot-i.svg" alt="SWOT Analysis" title=" SWOT Analysis"
                                width="16" height="16">
                            <!-- <i data-lucide="handshake" style="width: 18px; height: 18px;"></i> -->
                        </span>
                       <span data-translate="title"> SWOT Analysis </span>
                    </h4>
                </div>
                <div class="load-page page-actions g-col-4">


                    <div class="page-icons">
                        <ul>
                            <li>
                                <a href="#" data-bs-toggle="modal">
                                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="View">
                                        <img src="/stratroom/images/view-i.svg" width="12" height="12" />
                                         <!-- <i data-lucide="eye" style="width: 16px; height: 16px;"></i> -->
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#file-validate-form" data-bs-toggle="modal">
                                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Import">
                                        <img src="/stratroom/images/import-i.svg" width="12" height="12" alt="import"
                                            title="import">
                                            <!-- <i data-lucide="import" style="width: 16px; height: 16px;"></i> -->
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#" data-bs-toggle="modal">
                                    <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Export">
                                        <img src="/stratroom/images/export-i.svg" width="12" height="12" alt="import"
                                            title="Export">
                                              <!-- <i data-lucide="file-up" style="width: 16px; height: 16px;"></i> -->
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

        <!-- End Page Header -->
        <div class="container-fluid" style="display: none;">
            <!-- COl -->
            <!-- <div class="collapse_arrow_right" style="display: none;">
                <i class="arrow_collapse_size fas fa-caret-right"></i>
            </div>
            <div class="collapse_arrow_left">
                <i class="arrow_collapse_size fas fa-caret-left"></i>
            </div> -->

            <jsp:include page="templates/swotchild.jsp"></jsp:include>
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

     <div class="modal custom-modal fade" id="attendess-list" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Edit Users</h4>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body d-grid gap-3">
                    <div class="attendees-search">
                        <div>
                            <div class="form-check cusom-check">
                                <input class="form-check-input" type="checkbox" value="" id="allusers">
                                <label class="form-check-label" for="allusers">
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
                    <div class="list-group add-attendees">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="floating-box shadow-sm">
        <a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/organization-i.svg" width="18"
                    height="18" alt="organization"></span></a>
        <a class="control-link" href="#"><span class="icon"><img src="/stratroom/images/template.svg" width="18"
                    height="18" alt="organization"></span></a>
    </div>




    <!--  -->

    <!--  -->

    <script src="${contextroot}/js/datepickerair.js"></script>
    <script src="${contextroot}/js/datepicker.en.js"></script>
    <script src="${contextroot}/js/widgets.js"></script>
    <script src="${contextroot}/js/swotanalysis.js"></script>
    <script src="${contextroot}/js/lucide.js"></script>
    <script>
        $('.swot_add_multiuser_popup,#addpeople,#addpeopleactions').modal({
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