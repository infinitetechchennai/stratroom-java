<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Left Sidebar -->
            <aside id="leftsidebar" class="sidebar">
                <!-- Menu -->
                <div class="menu">
                    <ul class="list">
                        <li class="active">
                            <a href="organizationHome" class="">
                                <i class="menu-icon ti-home"></i>
                                <span>Organisation Structure</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" onClick="return false;" class="menu-toggle">
                                <i class="menu-icon ti-image"></i>
                                <span>Dashboards</span>
                            </a>
                            <ul class="ml-menu">
                                <li>
                                    <a href="dashboardview">BSC Dashboard</a>
                                </li>
                                <li>
                                    <a href="#">Strategy Map</a>
                                </li>
                            </ul>
                        </li>

                        <li class="">
                            <a href="#" onClick="return false;" class="">
                                <i class="menu-icon ti-bar-chart"></i>
                                <span data-i18n="Charts">Charts</span>
                            </a>
                        </li>

                        <li class="">
                            <a href="#" onClick="return false;" class="">
                                <i class="menu-icon ti-key"></i>
                                <span>Users & Access</span>
                            </a>
                        </li>

                        <li class="">
                            <a href="#" onClick="return false;" class="">
                                <i class="menu-icon ti-vector"></i>
                                <span>Workflows</span>
                            </a>
                        </li>

                        <li class="">
                            <a href="#" onClick="return false;" class="">
                                <i class="menu-icon ti-bell"></i>
                                <span>Notifications & Alerts</span>
                            </a>
                        </li>

                        <li class="">
                            <a href="dataManagementHome"  class="">
                                <i class="menu-icon ti-server"></i>
                                <span>Data Management</span>
                            </a>
                        </li>

                        <li>
                            <a href="#" onClick="return false;" class="menu-toggle">
                                <i class="menu-icon ti-layout-media-right-alt"></i>
                                <span>Template Management</span>
                            </a>
                            <ul class="ml-menu">
                                <li>
                                    <a href="#" id="sub-menu" onClick="return false;" class="menu-toggle">
                                            Scorecard Layouts
                                        </a>
                                    <ul class="ml-menu">
                                        <li class="draggable"><a href="standardView">Standard BSC View</a></li>
                                        <li><a href="dashBoardView">Dashboard View</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="initiativesListView" id="sub-menu" class="menu-toggle">
                                        Initiative
                                        </a>
                                    <ul class="ml-menu">
                                        <li><a href="#">Sub Initiatives</a></li>
                                        <li><a href="#">Tasks</a></li>
                                        <li><a href="#">Activities</a></li>
                                        <li><a href="#">Milestones</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">Reports Table</a>
                                </li>
                                <li>
                                    <a href="#" id="sub-menu" onClick="return false;" class="menu-toggle" data-i18n="Comments">
                                        Comments
                                        </a>
                                    <ul class="ml-menu">
                                        <li><a href="#">Comments & Observations</a></li>
                                        <li><a href="#">Proof of Evidence</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="employeeView">Employee Layout</a>
                                </li>
                                <li>
                                    <a href="#">Appraisal</a>
                                </li>
                                <li>
                                    <a data-toggle="modal" data-target=".data_collection_form">Data Collection Form</a>
                                </li>
                            </ul>
                        </li>

                        <li class="">
                            <a href="#" onClick="return false;" class="">
                                <i class="menu-icon ti-home"></i>
                                <span>Widget Management</span>
                            </a>
                        </li>

                        <li class="">
                            <a href="#" onClick="return false;" class="">
                                <i class="menu-icon ti-pie-chart"></i>
                                <span>Reports</span>
                            </a>
                        </li>

                    </ul>
                </div>
                <!-- #Menu -->
            </aside>
<!-- #END# Left Sidebar -->
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
						<a href="logout">
							<p class="center">Logout</p>
						</a>
						<a href="#">
							<p class="right editProfile">Edit</p>
							<p class="right editProfile"></p>
						</a>
						<ul
							class="setting-list profile-default list-unstyled m-t-20 center">
							<!-- <li class="center">
                                                <i class="fas fa-user-circle" style="font-size: 110px"></i>
                                            </li> -->
							<c:if test="${userPrincipal != null}">
								<li _ngcontent-hhc-c5="" class="center avatar avatar-sm"
									style="width: 85px"><img _ngcontent-hhc-c5="" alt="user"
									id="profileImage" width="110" class="rounded-circle"
									src="<c:out value="${userPrincipal.profile.profileImage}" />"></li>
								<li>
									<p class="center name">
										<c:out value="${userPrincipal.profile.firstName}" />
									</p>
								</li>
								<li>
									<p class="center grey1">
										<c:out value="${userPrincipal.profile.firstName}" />
										,
										<c:out value="${userPrincipal.profile.location}" />
									</p>
								</li>
								<li>
									<p class="center grey1">
										<c:out value="${userPrincipal.profile.emailAddress}" />
									</p>
								</li>
							</c:if>
						</ul>
						<ul class="setting-list profile-replace list-unstyled m-t-20"
							style="display: none">
							<li class="center">
								<form id="profileForm">
									<div class="form-group">
										<div class="form-line profile-pic">
											<!-- <i  class="fas fa-user-circle" style="font-size: 100px; opacity:0.5"></i> -->
											<li id="profileImage" _ngcontent-hhc-c5=""
												class="center avatar avatar-sm"
												style="width: 85px; z-index: -1"><img
												_ngcontent-hhc-c5="" alt="user" width="110"
												class="rounded-circle" src="images/user/usrbig7.jpg">
											</li> <input id="imageUpload" type="file" name="profile_photo"
												placeholder="Photo" required="" capture="">
											<div class="edit">
												<a href="#"><i class="fa fa-pencil-alt"></i></a>
											</div>
										</div>
										<div class="form-line">
											<label for="name" class="left" data-i18n="Name">Name</label> <input
												type="text" name="name" class="form-control">
										</div>
										<div class="form-line">
											<label for="id" class="left">Employee ID</label> <input
												type="text" name="id" class="form-control">
										</div>

										<div class="form-line">
											<label for="title" class="left">Title</label> <input
												type="text" name="title" class="form-control">
										</div>

										<div class="form-line">
											<label for="email" class="left">Email</label> <input
												type="email" name="email" class="form-control">
										</div>

										<div class="form-line">
											<label for="location" class="left">Location</label> <input
												type="text" name="location" class="form-control">
										</div>

										<div class="form-line center">
											<button class="btn-default1 btn cancelEditProfile"
												value="Cancel" style="font-size:14px; !important;" data-i18n="Cancel">Cancel</button>
											<button class="initative_save_btn" value="Submit">Submit</button>
										</div>

									</div>
								</form>
							</li>
							<li>
								<!-- <p class="center name">Karthick</p> -->
							</li>
						</ul>
					</div>

					<div class="row clearfix">
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
																Reporting To </a>
														</h4>
													</div>
													</c:if>
													<div id="collapseOne_1" class="panel-collapse collapse in"
														role="tabpanel" aria-labelledby="headingOne_1">
														<div class="panel-body profile_edit">
															<div class="rightSetting">
																<!-- <p class="left">Reporting To</p> -->
																<a href="#" id="reportingAdd">
																	<p class="right">Add</p>
																</a>
																<ul
																	class="setting-list reporting-default list-unstyled m-t-20">
																	<li class="row reportingRow">
																		<div class="col-md-3 p-b-10">
																			<!-- <li id="profileImage" _ngcontent-hhc-c5="" class="center avatar avatar-sm" style="width:85px; z-index:-1"> -->
																			<img _ngcontent-hhc-c5="" alt="user" width="110"
																				class="rounded-circle" src="images/user/usrbig7.jpg">
																			<!-- </li> -->
																		</div>
																		<div class="col-md-7 p-t-5">
																			<p class="center name">Arun</p>
																			<p class="center grey1">Developer</p>

																		</div>
																		<!--<div class="col-md-1" style="float: right;">
																			<a href="#" class="reportingEdit"><i
																				class="fas fa-pencil-alt" style="font-size: 14px"></i></a>
																		</div>-->
																	</li>
																	<li class="row reportingRow">
																		<div class="col-md-3 p-b-10">
																			<img _ngcontent-hhc-c5="" alt="user" width="110"
																				class="rounded-circle" src="images/user/usrbig8.jpg">
																		</div>
																		<div class="col-md-7 p-t-5">
																			<p class="center name">Santhosh</p>
																			<p class="center grey1">CTO</p>
																		</div>
																		<div class="col-md-1" style="float: right;">
																			<a href="#" class="reportingEdit"><i
																				class="fas fa-pencil-alt" style="font-size: 14px"></i></a>
																		</div>
																	</li>
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
																						src="images/user/usrbig7.jpg"> <input
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
					<div class="row clearfix">
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
																<a href="#" id="directAdd">
																	<p class="right">Add</p>
																</a>
																<ul
																	class="setting-list direct-default list-unstyled m-t-20">
																	<li class="row reportingRow">
																		<div class="col-md-3 p-b-10">
																			<img _ngcontent-hhc-c5="" alt="user" width="110"
																				class="rounded-circle" src="images/user/usrbig6.jpg">
																		</div>
																		<div class="col-md-7 p-t-5">
																			<p class="center name">Karthick</p>
																			<p class="center grey1">Manager</p>

																		</div>
																		<div class="col-md-1" style="float: right;">
																			<a href="#" class="directEdit"><i
																				class="fas fa-pencil-alt" style="font-size: 14px"></i></a>
																		</div>
																	</li>
																	<li class="row reportingRow">
																		<div class="col-md-3 p-b-10">
																			<img _ngcontent-hhc-c5="" alt="user" width="110"
																				class="rounded-circle" src="images/user/usrbig9.jpg">
																		</div>
																		<div class="col-md-7 p-t-5">
																			<p class="center name">Naren</p>
																			<p class="center grey1">Designer</p>

																		</div>
																		<div class="col-md-1" style="float: right;">
																			<a href="#" class="directEdit"><i
																				class="fas fa-pencil-alt" style="font-size: 14px"></i></a>
																		</div>
																	</li>
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
																						src="images/user/usrbig7.jpg"> <input
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
					<div class="row clearfix">
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
	</div>
</aside>
<!-- #END# Right Sidebar -->