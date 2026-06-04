<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<c:set var="contextroot" value="${pageContext.request.contextPath}" />

<!-- Right Sidebar -->
<aside id="rightsidebar" class="right-sidebar open">
	<div class="tab-content">
		<div role="tabpanel" class="tab-pane in active in active stretchLeft"
			id="skins">
			<div class="slimScrollDiv"
				style="position: relative; overflow: hidden; width: auto;">
				<div class="demo-skin"
					style="overflow: hidden; width: auto; height: auto;">
					<div class="rightSetting">
						<p class="left">Profile</p>
						
							<!-- <p class="left" style="margin-left: 60px; font-size: 12px;color:black;font-weight:bold">
							<a href="/stratroom/logout">Logout</a></p>-->
						<a href="#">
							<p class="right editProfile" style="font-weight:bold;font-size: 12px;">Edit</p>
						</a>
						<ul
							class="setting-list profile-default list-unstyled m-t-20 center">
							<!-- <li class="center">
                                                <i class="fa fa-user-circle" style="font-size: 110px"></i>
                                            </li> -->
							<c:if test="${principal != null}">
							<c:set value="${principal.profile}" var="employeeProfile" scope="session"/>
								<li _ngcontent-hhc-c5="" class="center avatar avatar-sm"
									style="width: 85px">
									
									<c:if test="${not empty principal.profile.profileImage}">
										<img _ngcontent-hhc-c5="" alt="user"
									id="profileImage" width="110" class="rounded-circle"
									src="${principal.profile.profileImage}"/>
									</c:if> 
									
									<c:if test="${empty principal.profile.profileImage}">									
									
									<img _ngcontent-hhc-c5="" alt="user"
									id="profileImage" width="110" data-name="${employeeProfile.formatImageName()}" class="rounded-circle profileplanuser">
									</c:if>
									
									
									</li>
								<li>
									<p class="center name">
										<c:out value="${principal.profile.firstName}" />
									</p>
								</li>
								<li>
									<p class="center grey1">
										<c:out value="${principal.profile.firstName}" />
										,
										<c:out value="${principal.profile.location}" />
									</p>
								</li>
								<li>
									<p class="center grey1">
										<c:out value="${principal.profile.emailAddress}" />
									</p>
								</li>
							</c:if>
						</ul>
						<c:if test="${not empty employeeProfile}">
						<ul class="setting-list profile-replace list-unstyled m-t-20"
							style="display: none">
							<li class="center">
								<form:form id="profileForm" name="profileForm"  action="updateProfile" modelAttribute="profileFormBean" method="post">
									<div class="form-group">
										<div class="form-line profile-pic">
											<!-- <i  class="fa fa-user-circle" style="font-size: 100px; opacity:0.5"></i> -->
											<li id="profileImageupdate" _ngcontent-hhc-c5=""
												class="center avatar avatar-sm"
												style="width: 85px;">
												
												<c:if test="${not empty employeeProfile.profileImage}">
													<img _ngcontent-hhc-c5="" alt="user" width="110" height="30"
												class="rounded-circle" id="showprofileimage" src="<c:out value="${(employeeProfile.profileImage !=	null?employeeProfile.profileImage:'')}"/>">
												</c:if> 
													
												<c:if test="${empty employeeProfile.profileImage}">	
													<img _ngcontent-hhc-c5="" alt="user" height="30"
													id="showprofileimage" alt="user" width="110" data-name="${employeeProfile.formatImageName()}" class="rounded-circle profileplanuser">
												</c:if>
												
											</li> 
											<input id="imageUpload" type="file" value="${(employeeProfile.profileImage !=	null?employeeProfile.profileImage:'')}"
												placeholder="Photo" required="" capture="" />
											<form:input id="imageUploadtext" type="hidden" path="profileImage" value="${(employeeProfile.profileImage !=	null?employeeProfile.profileImage:'')}"
												placeholder="Photo" required="" capture="" />	
												
											<div class="edit">
												<a href="#" id="profileupdateimageupload"><i class="fa fa-pencil-alt"></i></a>
											</div>
										</div>
										<input type="hidden" id="oldprofileimage" value="${(employeeProfile.profileImage !=	null?employeeProfile.profileImage:'')}">
										<div class="form-line">
											<label for="name" class="left" data-i18n="Name">Name</label> <form:input path="firstName" cssClass="form-control" value="${employeeProfile.firstName}" required="true"></form:input>
										</div>
										<div class="form-line">
											<label for="name" class="left">Password</label> <form:password path="password" cssClass="form-control"  value="${employeeProfile.password}" required="true"/>
										</div>
										<form:hidden path="empId" cssClass="form-control" value="${employeeProfile.empId}" readonly="true" />
										<form:hidden path="parentEmpId"  value="${employeeProfile.parentEmpId}" />
										<form:hidden path="deptUniqueId"  value="${employeeProfile.deptDetails.deptID}" />
										<div class="form-line">
											<label for="title" class="left">Title</label> <form:input path="title" cssClass="form-control" value="${employeeProfile.title}" required="true"/>
										</div>

										<div class="form-line">
											<label for="email" class="left">Email</label> <form:input path="emailAddress" cssClass="form-control" value="${employeeProfile.emailAddress}" required="true"></form:input>
										</div>
										
										<div class="form-line">
											<label for="email" class="left" data-i18n="Department">Department</label> <form:input path="department" cssClass="form-control" value="${employeeProfile.department}" required="true"></form:input>
										</div>

										<div class="form-line">
											<label for="location" class="left">Location</label> <form:input  path="location" cssClass="form-control" value="${employeeProfile.location}" />
										</div>

										<div class="form-line center">
											<input type="button" class="btn-default1 btn cancelEditProfile"
												value="Cancel" style="font-size:14px !important;"/>
											<input type="submit" class="btn-default btn-black" value="Submit" />
										</div>

									</div>
								</form:form>
							</li>
						</ul>
						</c:if>
					</div>

					<div class="row clearfix reportingmanagementTab">
						<!-- Basic Examples -->
						<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div class="">
								<div class="body">
									<div class="row clearfix">
										<div class="col-xs-12 ol-sm-12 col-md-12 col-lg-12">
											<div class="panel-group" id="accordion_1" role="tablist"
												aria-multiselectable="true">
												<div class="panel">
													<c:if test="${employeeProfile.parentEmpId != 0}">
													<div class="panel-heading profile_report" role="tab"
														id="headingOne_1">
														<h4 class="panel-title">
															<a role="button" data-toggle="collapse"
																data-parent="#accordion_1" href="#collapseOne_1"
																aria-expanded="true" aria-controls="collapseOne_1">
																Reporting To</a>
														</h4>
													</div>
													</c:if>
													<div id="collapseOne_1" class="panel-collapse collapse in"
														role="tabpanel" aria-labelledby="headingOne_1">
														<div class="panel-body profile_edit">
															<div class="rightSetting">
																<!-- <p class="left">Reporting To</p> -->
																<ul
																	class="setting-list reporting-default list-unstyled m-t-20">
																	<c:if test="${principal.profile.parentEmployee != null}">
																	<c:set value="${principal.profile.parentEmployee}" var="parentEmployee" scope="session"/>
																	<li class="row reportingRow">
																		<div class="col-md-3 p-b-10">
																			<!-- <li id="profileImage" _ngcontent-hhc-c5="" class="center avatar avatar-sm" style="width:85px; z-index:-1"> -->
																				<c:if test="${not empty parentEmployee.profileImage}">
																					<img _ngcontent-hhc-c5="" alt="user" width="110"
																	class="rounded-circle" src="<c:out value="${parentEmployee.profileImage}"/>">
																		  </c:if>
																	   <c:if test="${empty parentEmployee.profileImage}">
																		<img _ngcontent-hhc-c5="" alt="user"
																		 alt="user" width="110" data-name="${parentEmployee.formatImageName()}" class="rounded-circle profileplanuser">
																	   </c:if>
																			<!-- </li> -->
																		</div>
																		<div class="col-md-7 p-t-5">
																			<p class="center name"><c:out value="${parentEmployee.firstName}"/></p>
																			<p class="center grey1"><c:out value="${parentEmployee.title}"/></p>

																		</div>
																		<!--<div class="col-md-1" style="float: right;">
																			<a href="#" class="reportingEdit"><i
																				class="fas fa-pencil-alt" style="font-size: 14px"></i></a>
																		</div>-->
																	</li>
																	
																	</c:if>
																</ul>
																<ul
																	class="setting-list reporting-replace-add list-unstyled m-t-20"
																	style="display: none">
																	<li class="row">
																		<form id="reportingAddForm">
																			<div class="form-group">
																				<div class="form-line center profile-pic">
																					<img _ngcontent-hhc-c5="" alt="user" width="60"
																						class="rounded-circle"
																						src="<c:out value="${contextroot}"/>/images/user/usrbig7.jpg"> <input
																						id="reportingImageUpload" type="file"
																						name="profile_photo1" placeholder="Photo"
																						required="" capture="">
																					<div class="edit1">
																						<a href="#"><i class="fa fa-pencil-alt"></i></a>
																					</div>
																				</div>
																				<div class="form-line">
																					<label for="name" class="left" data-i18n="Name">Name</label> <input
																						type="text" name="name" class="form-control">
																				</div>
																				<div class="form-line">
																					<label for="title" class="left">Title</label> <input
																						type="text" name="title" class="form-control">
																				</div>

																				<div class="form-line center">
																					<button class="btn-default1 btn canceladdReporting"
																						value="Cancel" data-i18n="Cancel">Cancel</button>
																					<button class="initative_save_btn"
																						value="Submit">Submit</button>
																				</div>
																			</div>
																		</form>
																	</li>
																</ul>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row clearfix reportingmanagementTab">
						<!-- Basic Examples -->
						<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div class="">
								<div class="body">
									<div class="row clearfix">
										<div class="col-xs-12 ol-sm-12 col-md-12 col-lg-12">
											<div class="panel-group" id="accordion_2" role="tablist"
												aria-multiselectable="true">
												<div class="panel">
													<div class="panel-heading profile_direct" role="tab"
														id="headingOne_2">
														<h4 class="panel-title">
															<a role="button" data-toggle="collapse"
																data-parent="#accordion_2" href="#collapseOne_2"
																aria-expanded="true" aria-controls="collapseOne_2">
																Direct Reportees </a>
														</h4>
													</div>
													<div id="collapseOne_2" class="panel-collapse collapse in"
														role="tabpanel" aria-labelledby="headingOne_2">
														<div class="panel-body profile_edit">
															<div class="rightSetting">
																<!-- <p class="left">Direct Reportees</p> -->
																<ul
																	class="setting-list direct-default list-unstyled m-t-20">
																	<c:if test="${principal.profile.reporteeList != null}">
																	<c:forEach items="${principal.profile.reporteeList}" var="reportee" >
																	<li class="row reportingRow">
																		<div class="col-md-3 p-b-10">
																			<c:if test="${not empty reportee.profileImage}">
																								<img _ngcontent-hhc-c5="" alt="user" width="110"
																				class="rounded-circle" src="<c:out value="${reportee.profileImage}"/>">
									                                                  </c:if>
									                                               <c:if test="${empty reportee.profileImage}">
																					<img _ngcontent-hhc-c5="" alt="user"
																					alt="user" width="110" data-name="${reportee.formatImageName()}" class="rounded-circle profileplanuser">
									                                               </c:if>
																		</div>
																		<div class="col-md-7 p-t-5">
																			<p class="center name"><c:out value="${reportee.firstName}"/></p>
																			<p class="center grey1"><c:out value="${reportee.title}"/></p>
																		</div>
																	</li>
																	</c:forEach>
																	</c:if>
																</ul>
																<ul
																	class="setting-list direct-replace-add list-unstyled m-t-20"
																	style="display: none">
																	<li class="row">
																		<form id="directAddForm">
																			<div class="form-group">
																				<div class="form-line center profile-pic">
																					<img _ngcontent-hhc-c5="" alt="user" width="60"
																						class="rounded-circle"
																						src="<c:out value="${contextroot}"/>/images/user/usrbig7.jpg"> <input
																						id="directImageUpload" type="file"
																						name="profile_photo1" placeholder="Photo"
																						required="" capture="">
																					<div class="edit1">
																						<a href="#"><i class="fa fa-pencil-alt"></i></a>
																					</div>

																				</div>
																				<div class="form-line">
																					<label for="name" class="left" data-i18n="Name">Name</label> <input
																						type="text" name="name" class="form-control">
																				</div>
																				<div class="form-line">
																					<label for="title" class="left">Title</label> <input
																						type="text" name="title" class="form-control">
																				</div>

																				<div class="form-line center">
																					<button class="btn-default1 btn canceladdDirect"
																						value="Cancel" data-i18n="Cancel">Cancel</button>
																					<button class="btn-default btn-black"
																						value="Submit">Submit</button>
																				</div>
																			</div>
																		</form>
																	</li>
																</ul>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row clearfix reportingmanagementTab">
						<!-- Basic Examples -->
						<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div class="">
								<div class="body">
									<div class="row clearfix">
										<div class="col-xs-12 ol-sm-12 col-md-12 col-lg-12">
											<div class="panel-group" id="accordion_3" role="tablist"
												aria-multiselectable="true">
												<div class="panel">
													<div class="panel-heading profile_responsilities"
														role="tab" id="headingOne_3">
														<h4 class="panel-title">
															<a role="button" data-toggle="collapse"
																data-parent="#accordion_3" href="#collapseOne_3"
																aria-expanded="true" aria-controls="collapseOne_3">
																My Responsibilities </a>
														</h4>
													</div>
													<div id="collapseOne_3" class="panel-collapse collapse in"
														role="tabpanel" aria-labelledby="headingOne_3">
														<div class="panel-body profile_edit">
															<ul class="ml-menu profile_accordion">
																<li><a href="#">My KPI's</a></li>
																<li><a href="#" data-i18n="My Initiatives">My Initiatives</a></li>
																<li><a href="#">My Activities</a></li>
																<li><a href="#">My Tasks</a></li>
																<li><a href="#">My Forms</a></li>
															</ul>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="slimScrollBar" style="background: rgba(0, 0, 0, 0.5); width: 6px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 0px; z-index: 99; right: 1px; height: 482px;"></div>
                                <div class="slimScrollRail" style="width: 6px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 0px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div> -->
			</div>
		</div>
		                <div role="tabpanel" class="tab-pane stretchRight" id="settings">
                    <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto;">
                        <div class="demo-settings" style="overflow: hidden; width: auto; height: auto;">
                            <p>GENERAL SETTINGS</p>
                            <ul class="setting-list">
                                <li>
                                    <span>Report Panel Usage</span>
                                    <div class="switch">
                                        <label>
                                            <input type="checkbox" checked="">
                                            <span class="lever switch-col-green"></span>
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <span>Email Redirect</span>
                                    <div class="switch">
                                        <label>
                                            <input type="checkbox">
                                            <span class="lever switch-col-blue"></span>
                                        </label>
                                    </div>
                                </li>
                            </ul>
                            <p>SYSTEM SETTINGS</p>
                            <ul class="setting-list">
                                <li>
                                    <span>Notifications</span>
                                    <div class="switch">
                                        <label>
                                            <input type="checkbox" checked="">
                                            <span class="lever switch-col-purple"></span>
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <span>Auto Updates</span>
                                    <div class="switch">
                                        <label>
                                            <input type="checkbox" checked="">
                                            <span class="lever switch-col-cyan"></span>
                                        </label>
                                    </div>
                                </li>
                            </ul>
                            <p>ACCOUNT SETTINGS</p>
                            <ul class="setting-list">
                                <li>
                                    <span>Offline</span>
                                    <div class="switch">
                                        <label>
                                            <input type="checkbox" checked="">
                                            <span class="lever switch-col-red"></span>
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <span>Location Permission</span>
                                    <div class="switch">
                                        <label>
                                            <input type="checkbox">
                                            <span class="lever switch-col-lime"></span>
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="slimScrollBar" style="background: rgba(0, 0, 0, 0.5); width: 6px; position: absolute; top: 0px; opacity: 0.4; display: block; border-radius: 0px; z-index: 99; right: 1px;"></div>
                        <div class="slimScrollRail" style="width: 6px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 0px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div>
                    </div>
                </div>
	</div>
</aside>
<!-- #END# Right Sidebar -->
 