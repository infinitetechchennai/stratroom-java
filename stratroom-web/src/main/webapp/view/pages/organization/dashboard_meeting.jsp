<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<script>
	function preview_images() {
		var total_file = document.getElementById("images").files.length;
		for (var i = 0; i < total_file; i++) {
			$("#image_preview")
					.append(
							"<div class='col-md-3' style='padding-bottom: 4%' '><img class='img-responsive' src='"
									+ URL
											.createObjectURL(event.target.files[i])
									+ "'></div>");
		}
	}
</script>


<div>
<input type="hidden" id="userrolename" value="${principal.profile.userRoleName}">
	<jsp:include page="modal/meetingModal.jsp"></jsp:include>

	<div id="deleteModalswot" class="modal fade">
		<div class="modal-dialog modal-confirm">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">Delete</h4>
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<h5 class="confirm-modal-content">Do you really want to delete?</h5>
					<br>
					<div class="form-line right">
						<input type="hidden" id="deleterecordid" />
						<button type="button" class="btn-default1 btn"
							data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
						<button type="button"
							class="btn btn-danger confirm-modal-deleteBtn"
							onclick="handleswoteventdelete()">Delete</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!--#Multionwer add swot start -->
	<div class="modal fade swot_add_multiuser_popup_old" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">

				<div class="modal-header">
					<h6 class="modal-title" id="myLargeModalLabel_1">Edit Users</h6>
					<button type="button" class="close getselectedActivitiesUsers"
						id="activities_current_id" data-activities_sub_current_id=""
						data-dismiss="modal" aria-label="Close">&times;</button>
				</div>

				<div class="row showactivitiesusers" style="
              padding: 0 50px;
              margin-bottom: 10px !important;
              margin-top: 10px;
            ">
            
            <div class="col-5">
              <div class="form-check">
                <label class="form-check-label" style="padding-left: 12px"
                  ><input class="form-check-input" id="allusersactivities" type="checkbox" value=""/><span class="form-check-sign">
                    <span
                      class="check"
                      style="margin-left: -17px; margin-top: 0"
                    ></span></span
                  >All Users</label
                >
              </div>
            </div>
            <div class="col-7 pr-0">
              <span class="pull-right" id="activities_search2" style="margin-right: -12px">
                <i class="fas fa-search border-box"></i>
              </span>
              <span
                class="pull-right search-section"
                style="display: none; margin-right: -12px"
                id="activities_search_section2"
              >
                <input type="text" class="search" autocomplete="off" id="searchactivities" placeholder="Search" />
                <i class="fas fa-search"></i>
                <i class="fas fa-times" id="activities_close_search2"></i>
              </span>
            </div>
         </div>


				<div id="user_subview" class=""></div>
				<input type="hidden" id="swotajaxid">

				<div class="d-flex flex-column employee_div_body_box sub-ini-box"
					id="sub-ini-box_view">
					<span id="activities-ini-box_view_users"></span>
				</div>
			</div>
		</div>
	</div>



    <div class="modal custom-modal fade swot_add_multiuser_popup"  data-backdrop="static" data-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
            <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Edit Users</h4>
                    <button type="button" class="btn-close getselectedActivitiesUsers" data-dismiss="modal" aria-label="Close" id="activities_current_id"></button>
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

	<div id="addpeople_old" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header"
					style="background-color: #1e252d; color: #fff;">
					<h6 class="modal-title" color : #f0f2f5; id="myLargeModalLabel_1">Edit
						People</h6>
					<button type="button" class="close peopleselectedUsers"
						id="closePopupId" data-dismiss="modal" aria-label="Close">&times;
					</button>
				</div>
				<!--<div class="modal-body">-->
				<div class="row showallusericon" style="
              padding: 0 50px;
              margin-bottom: 10px !important;
              margin-top: 10px;
            ">
            
            <div class="col-5">
              <div class="form-check">
                <label class="form-check-label" style="padding-left: 12px"
                  ><input class="form-check-input" id="allusersaccess" type="checkbox" value=""/><span class="form-check-sign">
                    <span
                      class="check"
                      style="margin-left: -17px; margin-top: 0"
                    ></span></span
                  >All Users</label
                >
              </div>
            </div>
            <div class="col-7 pr-0">
              <span class="pull-right" id="search2" style="margin-right: -12px">
                <i class="fas fa-search border-box"></i>
              </span>
              <span
                class="pull-right search-section"
                style="display: none; margin-right: -12px"
                id="search_section2"
              >
                <input type="text" class="search" autocomplete="off" id="searchrecommendation" placeholder="Search" />
                <i class="fas fa-search"></i>
                <i class="fas fa-times" id="close_search2"></i>
              </span>
            </div>
           </div>
				<input type="hidden" id="responsibleid">
				<div class="d-flex flex-column employee_div_body_box sub-ini-box"
					id="sub-ini-box_view">
					<span class="listusers"> </span>
				</div>

				<!--<button type="button" class="form-control add" id="peopleSave" style="background-color: #1e252d; color: #fff;">
						Save</button>
				</div>
				<div class="modal-footer">
					<button type="button" id="closePopupId" onclick="checkmodalisclosedornot()" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>-->
			</div>
		</div>
	</div>

	<div id="addpeople" class="modal custom-modal"  data-backdrop="static" data-keyboard="false"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
            <div class="modal-content">

                <div class="modal-header">
                    <h4 class="modal-title">Edit Users</h4>
                    <button type="button" class="btn-close peopleselectedUsers" data-dismiss="modal" aria-label="Close" id="closePopupId"></button>
                </div>

                <div class="modal-body d-grid gap-3">

                    <div class="attendees-search">
                        <div>
                            <div class="form-check cusom-check">
                                <input class="form-check-input" type="checkbox" value="" id="allusersaccess">
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
	                  <!-- <div id="user_subview" class=""></div> -->
				    <input type="hidden" id="responsibleid">
                    <div class="list-group add-attendeesnotes">
                      
                      
                    </div>
                </div>
            </div>
        </div>
    </div>




	<!-- <div id="addpeopleactions" class="modal fade" role="dialog">
		<div class="modal-dialog">
		
			<div class="modal-content">
				<div class="modal-header"
					style="background-color: #1e252d; color: #fff;">
					<h6 class="modal-title" color : #f0f2f5; id="myLargeModalLabel_1">Edit
						People</h6>
					<button type="button" class="close actionpeopleselectedUsers"
						id="actionsclosePopupId" data-dismiss="modal" aria-label="Close">&times;
					</button>
				</div>
			
				<div class="row showalluseractions" style="
              padding: 0 50px;
              margin-bottom: 10px !important;
              margin-top: 10px;
            ">
            
            <div class="col-5">
              <div class="form-check">
                <label class="form-check-label" style="padding-left: 12px"
                  ><input class="form-check-input" id="allusersactions" type="checkbox" value=""/><span class="form-check-sign">
                    <span
                      class="check"
                      style="margin-left: -17px; margin-top: 0"
                    ></span></span
                  >All Users</label
                >
              </div>
            </div>
            <div class="col-7 pr-0">
              <span class="pull-right" id="actions_search2" style="margin-right: -12px">
                <i class="fas fa-search border-box"></i>
              </span>
              <span
                class="pull-right search-section"
                style="display: none; margin-right: -12px"
                id="actions_search_section2"
              >
                <input type="text" class="search" autocomplete="off" id="searchactions" placeholder="Search" />
                <i class="fas fa-search"></i>
                <i class="fas fa-times" id="action_close_search2"></i>
              </span>
            </div>
           </div>
				<div class="d-flex flex-column employee_div_body_box sub-ini-box"
					id="sub-ini-box_view">
					<input type="hidden" id="actionsresponsibleid"> <span
						class="actionslistusers"> </span>
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

	<div id="SendingAttachment" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header"
					style="background-color: #1e252d; color: #fff;">
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
				<div class="modal-header"
					style="background-color: #1e252d; color: #fff;">
					<h6 class="modal-title" color : #f0f2f5; id="">View Link</h6>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
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
	<!-- <div id="recommendation_old" class="modal fade" role="dialog">
		<div class="modal-dialog modal-lg" style="margin-top: 8%;">
			
			<div class="modal-content">
				<div class="modal-header">
					<h4>Recommendation</h4>
					<div class="float-right addmeetingoption">
						<button onclick="notes('note_table')"
							class="form-control rounded-circle"
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
								<button type="button" class="btn-default1 btn recommendationclose" data-dismiss="modal" data-i18n="Cancel">
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


   <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="recommendation"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" data-translate="page.meetings.meetingsListAction.notes">Notes</h5>
                    
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="recommendationtype" id="recommendationtype">
                    <input type="hidden" name="recommendationtype" id="recommendationcount">
                    <table class="table tab-sm table-bordered align-center" id="note_table">
                        <thead>
                            <tr>
                                <th class="text-center" data-translate="page.meetings.meetingsListAction.notesItems.recommendation">Recommendation</th>
                                <th class="text-center" data-translate="page.meetings.meetingsListAction.notesItems.responsible">Responsible</th>
                                <th class="text-center" >Actions</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                           
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary recommendationclose" data-dismiss="modal"
                        data-i18n="Cancel" data-translate="page.meetings.cancel">
                        Cancel
                    </button>
                    <button class="btn btn-primary" onclick="recommendationsubmit()" data-i18n="Save" data-translate="page.meetings.save">
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
                    <h5 class="modal-title">Recommendation</h5>
                    
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="recommendationtype" id="recommendationtype">
                    <input type="hidden" name="recommendationtype" id="recommendationcount">
                    <table id="note_table" class="table tab-sm table-bordered align-center" id="note_table">
                        <thead>
                            <tr>
                                <th class="text-center">Recommendation</th>
                                <th class="text-center">Responsible</th>
                                <th class="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                           
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary recommendationclose" data-bs-dismiss="modal"
                        data-i18n="Cancel">
                        Cancel
                    </button>
                    <button class="btn btn-primary" onclick="recommendationsubmit()" data-i18n="Save">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div> -->
	<!-- <div class="modal custom-modal fade" data-backdrop="static" data-keyboard="false" id="recommendation"
        tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
        <div
            class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Notes</h5>
                    <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table tab-sm table-bordered align-center" id="kpidrilldownTable">
                        <thead>
                            <tr>
                                <th class="text-center">Recommendation</th>
                                <th class="text-center">Responsible</th>
                                <th class="text-center">Actions</th>
                            </tr>
                        </thead>
                       <tbody id="tableBody">
						</tbody>
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

	<!-- Action Modal -->
	  <div class="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="action" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" >Actions/Tasks</h5>
					<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<input type="hidden" id="actionsid">
					<input type="hidden" name="recommendationtype" id="actiontype">
					<input type="hidden" name="recommendationtype" id="actioncount">
					<table class="table table-sm table-bordered align-center" id="action_table">
						<thead>
							<tr>
								<th class="text-center" >Actions/Tasks</th>
								<!-- <th class="text-center" data-translate="page.meetings.meetingsListAction.actionItems.byDate">By Date</th> -->
								<!-- <th class="text-center" data-translate="page.meetings.meetingsListAction.actionItems.responsible">Responsible</th>
								<th class="text-center" data-translate="page.meetings.meetingsListAction.actionItems.status">Status</th> -->
								<th class="text-center" data-translate="page.meetings.meetingsListAction.actionItems.actions">Actions</th>
							</tr>
						</thead>
						<tbody id="actionBodyData">

						</tbody>
					</table>

				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-label-secondary" data-dismiss="modal" aria-label="Close" data-translate="page.meetings.cancel">
						Cancel
					</button>
					<button class="btn btn-primary" value="Save" onclick="actionssubmit()" data-translate="page.meetings.save">Save
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- <div id="action" class="modal fade" role="dialog">
		<div class="modal-dialog modal-lg"
			style="margin-top: 6%; max-width: 60% !important;">
			
			<div class="modal-content">
				<div class="modal-header">
					<h4>Actions</h4>
					<div class="float-right addactmeetingoption">
						<button onclick="action('action_table')"
							class="form-control rounded-circle"
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
								<button type="button" class="btn-default1 btn actionclose" data-dismiss="modal" data-i18n="Cancel">
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
	<div id="uploaded_files_old" class="modal fade" role="dialog">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<h4 data-i18n="File Upload">File Upload</h4>
					<button type="button" id="closeuploadfilesId" class="close pull-right" data-dismiss="modal">&times;</button>
				</div>
				<div class="modal-body">
					<div class="row" style="padding: 16px;">
						<div class="col-md-12"
							style="margin-top: -12px; padding-bottom: 8px;">
							<button class="btn btn-custom-secondary addfilemeetingoption" data-toggle="modal"
								data-target="#file_upload_popup">
								<i class="fa fa-plus" data-toggle="tooltip" data-placement="bottom" title="Add"></i>
							</button>
						</div>
						<div class="col-md-12">
							<div class="tableBody">
							<input type="hidden" id="fileuploadtype">
							<input type="hidden" id="fileuploadcount">
								<div class="table-responsive" id="listfileuploadTable"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

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
                    <h4 data-i18n="File Upload" data-translate="page.meetings.meetingsListAction.attachments">Attachments</h4>
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
                                            style="border: 1px solid #ced4da; background-color: #e9ecef; padding: 6px 12px; border-left: none; border-top-left-radius: 0; border-bottom-left-radius: 0;">
                                            Upload
                                        </button>
                                    </div>
                                    <div class="mb-3 form-text" data-translate="page.meetings.meetingsListAction.attachmentsItems.upload_info">Supported file type (jpeg, pdf, pptx, xlsx, docx)</div>
                                </div>
                            </div>

                            <input type="hidden" id="fileuploadtype">
                            <input type="hidden" id="fileuploadcount">
                            <div class="table-responsive">
                                <div class="table-responsive" id="listfileuploadTableData"></div>
                            </div>
                        </div>

                    </div>


                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-label-secondary" data-dismiss="modal" aria-label="Close" data-translate="page.meetings.cancel">
                        Cancel
                    </button>
                    <button class="btn btn-primary" value="Save" data-dismiss="modal" data-translate="page.meetings.save">Save
                    </button>
                </div>
            </div>
        </div>
    </div>

	<!-- File Upload PopUp -->
	<div class="modal fade" id="file_upload_popup" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4 data-i18n="File Upload">File Upload</h4>
					<button type="button" id="closeUpload" class="close pull-right"
						data-dismiss="modal">&times;</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="form-group col-md-10" style="padding-right: 4px;">
							<input type="file" class="modal-custom-input"
								id="attachementuploadfile"
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
	<div class="modal fade" id="file_upload_popup1" tabindex="-1"
		role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4 data-i18n="File Upload">File Upload</h4>
					<button type="button" id="closeUpload1" class="close pull-right"
						data-dismiss="modal">&times;</button>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="form-group col-md-10" style="padding-right: 4px;">
							<input type="file" class="modal-custom-input"
								id="attachementuploadfile1"
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
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<h5 class="confirm-modal-content">Do you really want to delete?</h5>
					<br>
					<div class="form-line right">
						<button type="button" class="btn-default1 btn"
							data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
						<button type="button"
							class="btn btn-danger confirm-modal-deleteBtn"
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
              <!-- <img src="/stratroom/images/meetings-i.svg" alt="meetings" title="meetings"> -->
              <i data-lucide="users" style="width: 18px; height: 18px;"></i>
            </span>
             <span data-translate="page.meetings.title">Meetings</span>
          </h4>
        </div>
        
      </div>
    </div>
    <div class="container-lg py-2">
      <div class="card custom-card">
        <div class="card-header">
          <div class="c-header-left">
            <h5 class="card-title me-auto">
              <strong editable="true" contenteditable="true" onkeypress="return (this.innerText.length <= 36)" data-translate="page.meetings.meetingsList">
                Meetings List</strong>
            </h5>
          </div>
          <div class="card-actions">
            <button type="button" class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#create_meeting" onclick="handleswotevent('', 'add')" style="background-color : #e9ecef;">
              <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Create Meeting">
                <i class="fas fa-plus title_edit_icon"></i>
              </span>
            </button>
          </div>
        </div>
      <div class="card-body p-3">
        <div class="meetingList">

        </div>
      </div>
      </div>

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
	<link href="${contextroot}/css/bootstrap.min.css" rel="stylesheet">
	<script src="${contextroot}/js/paging.js"></script>
	<script src="${contextroot}/js/widgets.js"></script>
	<script src="${contextroot}/js/meeting.js"></script>
	<!-- <script src="${contextroot}/js/date-time-pickerair.js"></script>
	 -->

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
	
	<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

	<script>
			$('.swot_add_multiuser_popup,#addpeople,#addpeopleactions')
					.modal({
						show : false,
						backdrop : 'static',
						keyboard : false
					});
					$('.modal-dialog').draggable({
            handle: ".modal-header"
        });


		
		</script>

<script>
  let startTimePicker;
  let endTimePicker;

  document.getElementById('create_meeting').addEventListener('shown.bs.modal', function () {
    console.log("Modal shown - initializing flatpickr");

    // Destroy existing instances
    if (startTimePicker) startTimePicker.destroy();
    if (endTimePicker) endTimePicker.destroy();

    // Initialize Start Time Picker with OK button
    startTimePicker = flatpickr("#starttime", {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      time_24hr: true,
      onReady: function (selectedDates, dateStr, instance) {
        // Avoid adding multiple OK buttons
        if (instance.calendarContainer.querySelector(".flatpickr-ok-btn")) return;

        const okButton = document.createElement("button");
        okButton.textContent = "OK";
        okButton.type = "button";
        okButton.className = "flatpickr-ok-btn btn btn-sm btn-primary mt-2 w-100";
        okButton.style.padding = "8px";
        okButton.style.fontWeight = "500";

        instance.calendarContainer.appendChild(okButton);

        okButton.addEventListener("click", function () {
          instance.close(); // Close the picker
        });
      },
      onChange: function (selectedDates, dateStr, instance) {
        if (endTimePicker) {
          endTimePicker.set('minDate', dateStr);
        }
      }
    });

    endTimePicker = flatpickr("#endtime", {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      time_24hr: true,
      minDate: document.getElementById("starttime").value || null,
      onReady: function (selectedDates, dateStr, instance) {

        if (instance.calendarContainer.querySelector(".flatpickr-ok-btn")) return;
        const okButton = document.createElement("button");
        okButton.textContent = "OK";
        okButton.type = "button";
        okButton.className = "flatpickr-ok-btn btn btn-sm btn-primary mt-1 w-100";
    

        instance.calendarContainer.appendChild(okButton);

        okButton.addEventListener("click", function () {
          instance.close();
        });
      }
    });
  });

  
  document.getElementById('create_meeting').addEventListener('hidden.bs.modal', function () {
    if (startTimePicker) {
      startTimePicker.destroy();
      startTimePicker = null;
    }
    if (endTimePicker) {
      endTimePicker.destroy();
      endTimePicker = null;
    }
  });
</script>

		