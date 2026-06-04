<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
	<%@ page contentType="text/html; charset=UTF-8" %>
		<%@ page pageEncoding="UTF-8" %>
			<c:set var="contextroot" value="${pageContext.request.contextPath}" />
			<c:set var="textcontextroot" value="${homePgFlag}" />

			<style>
				.dropdown-menu.show {
					display: block !important;
				}

				.custom-context-menu {
					position: fixed;
					z-index: 1000;
					background: white;
					border: 1px solid #ddd;
					border-radius: 4px;
					box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
					padding: 5px 0;
					min-width: 150px;
					display: none;
				}

				.custom-context-menu button {
					display: block;
					width: 100%;
					padding: 8px 15px;
					text-align: left;
					background: none;
					border: none;
					cursor: pointer;
				}

				.custom-context-menu button:hover {
					background-color: #f5f5f5;
				}
			</style>
			<!-- Left Sidebar -->
			<div>
				<nav class="navbar navbar-expand-md navbar-light">
					<div class="container-lg gap-2 gap-md-3">
						<!-- Logo Section -->
						<form class="position-relative logo me-auto">
							<!-- <a href="<c:out value='${contextroot}'/>/organizationHome" class="logo-preview"
								id="logoPreview">
								<img class="img-fluid" src="/stratroom/images/logo.png" alt="startroom" width="180"
									height="30">
							</a> -->

							<a href="#" onClick="return false;" class="navbar-toggle collapsed"
								data-toggle="collapse" data-target="#navbar-collapse"
								aria-expanded="false"></a> <a href="#" onClick="return false;"
								class="bars"></a> <a href="#" onClick="return false;"
								class="bar_nav sidemenu-collapse"><i class="nav-hdr-btn ti-menu"
								style="color: #000"></i></a> <a class="navbar-brand nav_float" href="#">
								<img class="applogofinal" id="appLogo" width="180"
									height="30" onclick="handleLandingPageNavigation()"
								src="<c:out value="${contextroot}"/>/images/Startroom_Final logo-01_1.png"
								alt=""> 
							</a>
							<input type="file" id="fileInput" accept="image/*" style="display: none;"
								onchange="previewImage(event)">
							<!-- <label for="fileInput" class="upload-btn">
								<span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
									data-bs-title="Edit Logo">
									<img src="/stratroom/images/edit-i.svg" width="12" height="12" alt="">
								</span>
							</label> -->
						</form>

						<!-- Mobile Menu -->
						<div class="offcanvas offcanvas-start offcanvas-navbar" tabindex="-1" id="mobileMenu"
							aria-labelledby="mobileMenuLabel">
							<div class="offcanvas-header border-bottom">
								<h5 class="offcanvas-title" id="mobileMenuLabel">Menu</h5>
								<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
									aria-label="Close"></button>
							</div>
							<div class="offcanvas-body">
								<div class="navbar-collapse">
									<ul class="navbar-nav ms-auto menulistaccess">
										<!-- Organisation -->
										<!-- <li class="nav-item organizationhome contextmenustratroompage1" data-id="Organisation" data-pagetpe="main">
                            <a class="nav-link dropdown-toggle" href="#"  role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        Plan
                            </a>
							  <ul class="dropdown-menu border-0 shadow-sm" id="planningDropdown">
                              
                            </ul>
                        </li> -->

										<li class="nav-item dropdown">
											<a class="nav-link dropdown-toggle planHeader" href="#" role="button"
												data-bs-toggle="dropdown" data-translate="Plan">
												Plan
											</a>
											<ul class="dropdown-menu border-0 shadow-sm submenu" id="planningDropdown">

											</ul>
										</li>

										<!-- Dashboard -->
										<li class="nav-item dropdown">
											<a class="nav-link dropdown-toggle measureHeader" href="#" role="button"
												data-bs-toggle="dropdown" data-translate="menu.measure">
												Measure
											</a>
											<ul class="dropdown-menu border-0 shadow-sm submenu" id="measure">

											</ul>
										</li>


										<li class="nav-item dropdown">
											<a class="nav-link dropdown-toggle executeHeader" href="#" role="button"
												data-bs-toggle="dropdown" data-translate="menu.execute">
												Execute
											</a>
											<ul class="dropdown-menu border-0 shadow-sm submenu" id="executeDropdown">

											</ul>
										</li>

										<!-- Access Control -->
										<!-- <li class="nav-item enableaccesscontrolMenu contextmenustratroompage1" data-id="Access Control" data-pagetpe="main">
                            <a class="nav-link" href="<c:out value='${contextroot}'/>/accesscontrol">
                                <i class="fas fa-user-lock"></i> Access Control
                            </a>
                        </li> -->


										<li class="nav-item dropdown datasourceclass ">
											<a class="nav-link dropdown-toggle governHeader" href="#" role="button"
												data-bs-toggle="dropdown" data-translate="menu.govern">
												Govern
											</a>
											<ul class="dropdown-menu border-0 shadow-sm submenu" id="governDropdown">
												<!-- <li data-id="compliance"><a class="dropdown-item"
														href="<c:out value='${contextroot}'/>/compliance">Compliance</a>
												</li> -->
											</ul>
										</li>

										<!-- Templates -->
										<li class="nav-item dropdown templatelink">
											<a class="nav-link dropdown-toggle meetHeader" href="#" role="button"
												data-bs-toggle="dropdown" data-translate="menu.meet">
												Meet
											</a>
											<ul class="dropdown-menu border-0 shadow-sm templatenames submenu"
												id="meetDropdown">

											</ul>
										</li>

										<li class="nav-item dropdown templatelink">
											<a class="nav-link dropdown-toggle reportHeader" href="#" role="button"
												data-bs-toggle="dropdown" data-translate="menu.report">
												Report
											</a>
											<ul class="dropdown-menu border-0 shadow-sm templatenames submenu"
												id="reportDropdown">

											</ul>
										</li>

									</ul>
								</div>
							</div>
						</div>

						

						<!-- Right Side Controls -->
						<div class="menu-controls global-control d-flex flex-wrap">


							<!-- Notification -->
						<div class="nav-item dropdown">
                        <a class="control-link" href="#" id="notificationDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false" data-bs-placement="bottom"
                            data-bs-title="Notification">
                            <span class="icon">
                                <img src="/stratroom/images/notification-i.svg" width="18" height="18" alt="notification">
                            </span>
                        </a>

                         <ul class="dropdown-menu dropdown-menu-icon border-0 shadow-sm drop-down-notificationList"
                            aria-labelledby="notificationDropdown" 
                            data-bs-auto-close="outside"
                            style="width: 350px; max-width: calc(100vw - 2rem); max-height: 400px; overflow-y: auto;">
                          
                            
                        </ul>
                    </div>

							<!-- Control Panel Dropdown (for admin users) -->
							<c:if
								test="${principal.profile.userRoleName == 'Super User' || principal.profile.userRoleName == 'Admin'}">
								<div class="nav-item dropdown">
									<a class="control-link" href="#" id="controlPanelDropdown" role="button"
										data-bs-toggle="dropdown" aria-expanded="false">
										<span class="icon">
											<img src="/stratroom/images/control-panel-i.svg" width="18" height="18">
										</span>
									</a>
									<ul class="dropdown-menu dropdown-menu-icon dropdown-menu-end border-0 shadow-sm"
										aria-labelledby="controlPanelDropdown">
										<li class="controlpanel roothomepage contextmenustratroompage1"
											data-id="Control Panel" data-pagetpe="main">
											<a class="dropdown-item controlPanelHeader" data-translate="topbar.settingsItems.controlPanel"
												href="<c:out value='${contextroot}'/>/controlpanel">
												<span class="icon"><img src="/stratroom/images/control-panel-i.svg"
														width="18" height="18" alt=""></span>
												Control Panel
											</a>
										</li>
										<li class="audittrailpage roothomepage contextmenustratroompage1"
											data-id="Audit Trail" data-pagetpe="main">
											<a class="dropdown-item auditTrailHeader"
												href="<c:out value='${contextroot}'/>/audittrailpage" data-translate="topbar.settingsItems.auditTrail">
												<span class="icon"><img src="/stratroom/images/audit-trail-i.svg"
														width="18" height="18" alt=""></span>
												Audit Trail
											</a>
										</li>
										<li class="userrolepage roothomepage contextmenustratroompage1"
											data-id="User Role" data-pagetpe="main">
											<a class="dropdown-item userRoleHeader"
												href="<c:out value='${contextroot}'/>/userrolemanagement" data-translate="topbar.settingsItems.userRoles">
												<span class="icon"><img src="/stratroom/images/user-role-i.svg"
														width="18" height="18" alt=""></span>
												User Role
											</a>
										</li>
									</ul>
								</div>
							</c:if>

							<!-- User Dropdown -->
							<div class="nav-item dropdown">
								<a class="control-link" href="#" id="userDropdown" role="button"
									data-bs-toggle="dropdown" aria-expanded="false">
									<span class="icon">
										<img src="/stratroom/images/user-i.svg" width="18" height="18" alt="">
									</span>
								</a>
								<ul class="dropdown-menu dropdown-menu-icon dropdown-menu-end border-0 shadow-sm"
									aria-labelledby="userDropdown">
									<li>
										<a class="dropdown-item profile-card" href="#">
											<span class="icon" onclick="handleLandingPageNavigation()">
												<img src="/stratroom/images/user-i.svg" width="32" height="32" alt="">
											</span>
											<div>
												<h4>Hi ${principal.profile.firstName}</h4>
												<small>welcome to your Multi-Governance Portal</small>
											</div>
										</a>
									</li>
									<li>
										<!-- <a class="dropdown-item" href="#create-template" data-bs-toggle="modal">
                            <span class="icon"><img src="/stratroom/images/template.svg" width="18" height="18" alt=""></span>
                             My Forms
                        </a> -->

										<a data-translate="topbar.profileItems.myForms" class="dropdown-item myFormHeader" href="<c:out value='${contextroot}'/>/kpidataform">My
											Form</a>

									</li>

									<li>
										<!-- <a class="dropdown-item" href="#create-template" data-bs-toggle="modal">
                            <span class="icon"><img src="/stratroom/images/template.svg" width="18" height="18" alt=""></span>
                             My Forms
                        </a> -->

										<a class="dropdown-item performanceContractHeader" href="<c:out value='${contextroot}'/>/kpiPerformanceContract" data-translate="topbar.profileItems.performanceContract">Performance 
											Contract</a>

									</li>
									<li>
									

										<a class="dropdown-item performancePlanHeader" href="<c:out value='${contextroot}'/>/performanceImprovementPlan">
										<span data-translate="topbar.profileItems.performanceContractPlan">Performance  Improvement Plan</span></a>

									</li>

									<li>
									

										<a class="dropdown-item" href="<c:out value='${contextroot}'/>/kpiTargetAcceptanceForm">
										<span >Kpi Target Acceptance Form</span></a>

									</li>
									<li>
										<a class="dropdown-item logoutHeader" href="<c:out value='${contextroot}'/>/logout" data-translate="topbar.profileItems.logout">
											<span class="icon"><img src="/stratroom/images/logout-i.svg" width="18"
													height="18" alt=""></span>
											Logout
										</a>
									</li>
								</ul>
							</div>

							<!-- Mobile Menu Toggle -->
							<div class="hamburger is-md" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu"
								aria-controls="mobileMenu">
								<div class="hamburger-icon">
									<span class="hamburger-line"></span>
									<span class="hamburger-line"></span>
									<span class="hamburger-line"></span>
								</div>
							</div>
						</div>

						<!-- Hidden fields -->
						<c:if test="${principal != null}">
							<input id="userPrincipal" type="hidden" name="userPrincipal" value="<c:out value="
								${principal.profile.empId}" />">
						</c:if>
						<c:if test="${userPrincipal != null}">
							<input id="userPrincipalnavigate" type="hidden" name="userPrincipalnavigate"
								value="<c:out value=" ${userPrincipal.profile.empId}" />">
						</c:if>
					</div>
				</nav>
			</div>

			<!-- <c:if test="${principal.profile.userRoleName == 'Super User' || principal.profile.userRoleName == 'Admin'}">
				<aside id="" class="sidebarNavigate" style="display:none">

					<div class="menuNew">
						<div class="collapse_sb_right">
							<i class="collapse_sb_size fas fa-caret-left"></i>
						</div>
						<div class="collapse_sb_left" style="display: none">
							<i class="collapse_sb_size fas fa-caret-right"></i>
						</div>
						<div class="s-user text-center"><span
								class="s-profile">${userPrincipal.profile.firstName}</span></div>
						<ul class="listNew">
							<li class="superdashboardclass">
								<a href="#" onClick="return false;" class="menu-toggle">

									<span>Dashboards</span>
								</a>
								<ul class="ml-menu" id="supercustompage">
									<li><a class="addnewpagehover waves-effect waves-block" data-toggle="modal"
											data-target=".page_description_popup" value="add" data-name="user"
											style="background-color: #4c4c4c; padding-left: 0; text-align: center; color: #fff !important;">
											<strong data-i18n="New board">New Board</strong></a></li>

								</ul>
							</li>
							<li class="superdashboardclass1">
								<a href="#" onClick="return false;" class="menu-toggle">

									<span>Whiteboard</span>
								</a>
								<ul class="ml-menu" id="supercustompage1">
									<li><a class="addnewpagehover waves-effect waves-block" data-toggle="modal"
											data-target=".whiteboard_addpage_popup" value="add" data-name="user"
											style="background-color: #4c4c4c; padding-left: 0; text-align: center; color: #fff !important;">
											<strong data-i18n="New board">New Board</strong>
										</a></li>

								</ul>
							</li>
						</ul>

					</div>

				</aside>
			</c:if> -->
			<!-- Dashboard Add Popup -->
			 
			<div class="modal fade page_description_popup" id="dashboard_add_popup" tabindex="-1" role="dialog"
				aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-lg">
					<div class="modal-content" style="height:auto !important;">
						<div class="modal-header org-modal-title">
							<h4 class="modal-title org-modal-title" id="myLargeModalLabel" style="color: white;">Add
								Board</h4>
							<button type="button" class="close pull-right" data-dismiss="modal" id="pagePopUpId">
								&times;</button>
						</div>
						<div class="modal-body">
							<form id="pageForm">
								<div class="row">
									<div class="form-group col-md-6" id="boardnamedup">
										<label data-i18n="Name">Name</label> <input type="text"
											class="form-control browser-default" name="pagename" id="pagename"
											placeholder="" autocomplete="off" onKeyPress="return scorecardname(event);">
									</div>
									<input type="hidden" id="boardusertype">
									<div class="form-group col-md-6">
										<label data-i18n="Board Type">Board Type</label>
										<select id="category" name="category"
											class="form-control browser-default dashboardpagecategory"
											style="height: auto !important;">
											<option value="" data-i18n="Select Type">Select Type</option>
											<!--<option value="ScoreCard">ScoreCard</option>
								<option value="Initiative_View">Initiative</option>
								<option value="Swot">Swot Analysis</option>
								<option value="Pestel">Pestel Analysis</option>
								<option value="Meeting">Meeting Management</option>
								<option value="Employee">Employee Performance</option>
								<option value="Risk">Risk Management</option>-->
											<!-- <option value="Strategy Formulation">Strategy
								Formulation</option>
							<option value="Budget & Forecast">Budget & Forecast</option>
							<option value="P3M">P3M</option> -->
										</select>
									</div>
									<div class="col-12">
										<hr />
									</div>
									<div class="col-12">
										<div class="form-line right">
											<button type="button" class="btn-default1 btn cancelB" data-dismiss="modal"
												aria-label="Close" data-i18n="Cancel">Cancel</button>
											<button type="submit" class="initative_save_btn" value="Save"
												data-i18n="Save">Save</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<!-- END Dashboard Add Popup -->

			<!-- Whiteboard Add Popup -->
			<div class="modal fade whiteboard_addpage_popup" id="whiteboard_add_popup" tabindex="-1" role="dialog"
				aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-lg">
					<div class="modal-content" style="height:auto !important;">
						<div class="modal-header">
							<h4 class="modal-title org-modal-title" id="myLargeModalLabel" style="color: white;">Add
								Board</h4>
							<button type="button" class="close pull-right" id="closepageModalpopup"
								data-dismiss="modal">
								&times;</button>
						</div>
						<div class="modal-body">
							<form id="pageForm1">
								<div class="row">
									<div class="form-group col-md-6" id="whiteboardnamedup">
										<label for="" data-i18n="Name">Name</label> <input type="text"
											name="whiteBoardname" id="whiteBoardname" placeholder=""
											class="form-control browser-default" autocomplete="off"
											onKeyPress="return scorecardname(event);" />
									</div>
									<input type="hidden" id="boardusertype">
									<div class="form-group col-md-6">
										<label for="" data-i18n="Board Type">Board Type</label> <select
											id="whiteboardType" name="whiteboardType"
											class="form-control browser-default whiteboardpagecategory"
											style="height: auto !important;">
											<option value="" data-i18n="Select Type">Select Type</option>
											<!--<option value="Cockpit">Cockpit</option>
								<option value="Chart">Chart</option>-->
											<!-- <option value="Report">Report</option>
							<option value="Strategy Map">Map</option> -->
										</select>
									</div>
									<div class="col-12">
										<hr />
									</div>
									<div class="col-12">
										<div class="form-line right">
											<button type="button" class="btn-default1 btn cancelB" data-dismiss="modal"
												aria-label="Close" data-i18n="Cancel">Cancel</button>
											<button type="submit" class="initative_save_btn" value="Save"
												data-i18n="Save">Save</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<!-- END Whiteboard Add Popup -->

			<div id="deleteModalPage" class="modal fade">
				<div class="modal-dialog modal-confirm">
					<div class="modal-content" style="height:auto !important;">
						<div class="modal-header">
							<h4 class="modal-title org-modal-title">Delete</h4>
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						</div>
						<div class="modal-body">
							<h5 class="confirm-modal-content">Do you really want to
								delete?</h5>
							<br>
							<div class="form-line right">
								<input type="hidden" id="deleterecordpageid" /> <input type="hidden"
									id="deleterecordtype" />
								<button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close"
									data-i18n="Cancel">Cancel</button>
								<button type="button" class="btn btn-danger confirm-modal-deleteBtn"
									onclick="handlepageeventdelete()">Delete</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div id="homeModalPage" class="modal fade">
				<div class="modal-dialog modal-confirm">
					<div class="modal-content" style="height:auto !important;">
						<div class="modal-header">
							<h4 class="modal-title org-modal-title">Set Home Page</h4>
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						</div>
						<div class="modal-body">
							<h5 class="confirm-modal-content sethomepagecontent"
								style="font-weight:normal !important;color:#777 !important;"></h5>
							<br>
							<div class="form-line right">
								<input type="hidden" id="sethomerecordpageid" /> <input type="hidden"
									id="sethomerecordtype" />
								<input type="hidden" id="sethomerecordpagename" />
								<input type="hidden" id="sethomemethodtype" />
								<input type="hidden" id="setboarduserid" />
								<button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close"
									data-i18n="Cancel">Cancel</button>
								<button type="button" class="initative_save_btn" onclick="setHomePage()"
									data-i18n="Save">Save</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
				<div class="modal-dialog">
					<form id="editForm" class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Edit Menu Text</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<input type="text" id="editInput" class="form-control" required>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary" type="submit" >Save</button>
					</div>
					</form>
				</div>
			</div>

			<!-- Whiteboard Edit Popup -->
			<div class="modal fade whiteboard_editpage_popup" id="whiteboard_add_popup" tabindex="-1" role="dialog"
				aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-lg">
					<div class="modal-content" style="height:auto !important;">
						<div class="modal-header">
							<h4 class="modal-title org-modal-title" id="myLargeModalLabel" style="color: white;">Edit
								Board</h4>
							<button type="button" class="close pull-right" data-dismiss="modal">
								&times;</button>
						</div>
						<div class="modal-body">
							<form id="editpageForm">
								<div class="row">
									<div class="form-group col-md-12" id="whiteboardnamedupedit">
										<label for="" data-i18n="Name">Name</label>
										<input type="text" name="editwhiteBoardname" id="editwhiteBoardname"
											placeholder="" class="form-control browser-default" autocomplete="off"
											onKeyPress="return scorecardname(event);" />
									</div>
									<input type="hidden" id="editpageid">
									<input type="hidden" id="editpagetype">
									<div class="col-12">
										<hr />
									</div>
									<div class="col-12">
										<div class="form-line right">
											<button type="button" class="btn-default1 btn cancelB" data-dismiss="modal"
												aria-label="Close" data-i18n="Cancel">Cancel</button>
											<button type="submit" class="initative_save_btn" value="Save"
												data-i18n="Save" >Save</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<!-- END Whiteboard Edit Popup -->

			<div id="contextMenu" class="custom-context-menu">
				<button id="editItem"    href="#editModal"
                 data-bs-toggle="modal">Edit</button>
				<button id="deleteItem">Delete</button>
				<button id="moveUpItem">Move Up</button>
				<button id="moveDownItem">Move Down</button>
				<button id="upPin">Pin</button>
			</div>

			<script>
				var editGrouptype = "";
				var editPageId = "";
				var editPageType = ""
				document.addEventListener('DOMContentLoaded', () => {
					const contextMenu = document.getElementById('contextMenu');
					let targetLi = null;


					document.addEventListener('contextmenu', (e) => {
						console.log(e, e.pageX, e.pageY, "pagexpayy")
						const li = e.target.closest('.submenu li');
						if (li) {
							e.preventDefault();
							e.stopPropagation();

							targetLi = li;


							contextMenu.style.display = 'block';
							contextMenu.style.opacity = '0';
							void contextMenu.offsetWidth;



							contextMenu.style.opacity = '1';
							contextMenu.style.left = e.pageX + 'px';
							contextMenu.style.top = e.pageY + 'px';
						}
					});

					// Close menu when clicking anywhere else
					document.addEventListener('click', (e) => {
						if (!contextMenu.contains(e.target)) {
							contextMenu.style.display = 'none';
						}
					});

					// Close menu on Escape key
					document.addEventListener('keydown', (e) => {
						if (e.key == 'Escape') {
							contextMenu.style.display = 'none';
						}
					});




					// Menu action handlers
					document.getElementById('editItem').addEventListener('click', () => {
						if (!targetLi) return;
						
						// Get the anchor tag inside the li
						const aTag = targetLi.querySelector('a');
						
						if (aTag) {
							
							const href = aTag.getAttribute('href');
							const pageIdMatch = href.match(/pageId=(\d+)/);
							const pageId = pageIdMatch ? pageIdMatch[1] : null;
							
							
							const pageType = aTag.getAttribute('data-pagetype');
							const groupType = aTag.getAttribute('data-grouptype');
							
							
							console.log('pageId:', pageId);         
							console.log('pageType:', pageType);    
							console.log('groupType:', groupType);
							
							editPageType = pageType;
							editGrouptype = groupType;
							editPageId = pageId;


							
							document.getElementById('editInputPageId').value = pageId;
							document.getElementById('editInputPageType').value = pageType;
							document.getElementById('editInputGroupType').value = groupType;

							contextMenu.style.display = "none";
							
							
						}
					});

					document.getElementById('deleteItem').addEventListener('click', () => {
						if (targetLi && confirm('Are you sure you want to delete this item?')) {
							// targetLi.remove();
							// contextMenu.style.display = 'none';

							const aTag = targetLi.querySelector('a');
							const href = aTag.getAttribute('href');
							const pageIdMatch = href.match(/pageId=(\d+)/);
							const pageId = pageIdMatch ? pageIdMatch[1] : null;

							console.log(pageId, "pageId")
                           
							$.ajax({
								url: "/stratroom/pages/" + pageId,
								type: "delete",
								contentType: "application/json",
								success: function (data, status) {
									window.location.href = "/stratroom/login"

									contextMenu.style.display = "none";
								    location.reload(true);
									
								},
								error: function () {
									$(".page-loader-wrapper").css("display", "none");
								}
							});
						}
					});

					document.getElementById('moveUpItem').addEventListener('click', () => {
						if (targetLi?.previousElementSibling) {
							targetLi.parentNode.insertBefore(targetLi, targetLi.previousElementSibling);
						}

						contextMenu.style.display = "none";
					});

					document.getElementById('moveDownItem').addEventListener('click', () => {
						if (targetLi?.nextElementSibling) {
							targetLi.parentNode.insertBefore(targetLi.nextElementSibling, targetLi);
						}
						contextMenu.style.display = "none";
					});

					document.getElementById('upPin').addEventListener('click', () => {
						if (!targetLi) return;
						
						
						    const aTag = targetLi.querySelector('a');
					
							console.log(aTag, "aTaggggggg");
							const href = aTag.getAttribute('href');
							const pageIdMatch = href.match(/pageId=(\d+)/);
							const pageId = pageIdMatch ? pageIdMatch[1] : null;
							const pageNameText = aTag.textContent.trim()
							
							
							const pageType = aTag.getAttribute('data-pagetype');
							const groupType = aTag.getAttribute('data-grouptype');
							
							
							
							console.log('pageId:', pageId);         
							console.log('pageType:', pageType);    
							
							
							editPageType = pageType;
							editGrouptype = groupType;
							editPageId = pageId;

							console.log(editPageType, editGrouptype, editPageId, "ereerrerrrrr");
							

							var currentEmp = $("#userPrincipal").val().trim();
							console.log(currentEmp, "currentEmp");
							var payload = {
								"id": editPageId,
								"active": 0,
								"createdBy": currentEmp,
								"groupType": editGrouptype,
								"pageName": pageNameText,
								"pageType": editPageType,
								"pinned" : "true"
							}

							console.log(payload, "payloadggg");

							$.ajax({
								url: "/stratroom/pages",
								type: 'put',
								contentType: "application/json",
								data: JSON.stringify(payload),
								success: function (data, status) {
									window.location.reload(true);
								},

								error: function (data, status) {
									
								}
							});
									
									
						
					});
				});
			</script>
			<script>


				$(document).ready(function () {
					const storedLanguage = localStorage.getItem('selectedLang') || 'en';
					console.log(storedLanguage, "storedLanguage")

					
					if(storedLanguage == "ar"){
						$(".reportHeader").text("تقرير");
						$(".meetHeader").text("اجتماع");
						$(".governHeader").text("حكم");
						$(".executeHeader").text("ينفذ");
						$(".measureHeader").text("قياس");
						$(".planHeader").text("خطة");
						$(".logoutHeader").text("تسجيل خروج");
						$(".myFormHeader").text("النموذج الخاص بي")
						$(".performanceContractHeader").text("عقد الأداء")
						$(".performancePlanHeader").text("خطة تحسين الأداء")
						$(".controlPanelHeader").text("لوحة التحكم")
						$(".auditTrailHeader").text("سجل التدقيق")
						$(".userRoleHeader").text("دور المستخدم")
					}else if(storedLanguage == "am" ){
						    $(".reportHeader").text("ሪፖርት");
							$(".meetHeader").text("ስብሰባ");
							$(".governHeader").text("መንግስት");
							$(".executeHeader").text("አፈፃፀም");
							$(".measureHeader").text("መለኪያ");
							$(".planHeader").text("ዕቅድ");
							$(".logoutHeader").text("ውጣ");
							$(".myFormHeader").text("የኔ ቅጽ");
							$(".performanceContractHeader").text("የአፈፃፀም ውል");
							$(".performancePlanHeader").text("የአፈፃፀም ማሻሻያ ዕቅድ");
							$(".controlPanelHeader").text("የመቆጣጠሪያ ፓነል");
							$(".auditTrailHeader").text("የኦዲት መንገድ");
							$(".userRoleHeader").text("የተጠቃሚ ሚና");
					}else{
						$(".reportHeader").text("Report");
						$(".meetHeader").text("Meet");
						$(".governHeader").text("Govern");
						$(".executeHeader").text("Execute");
						$(".measureHeader").text("Measure");
						$(".planHeader").text("Plan");
						$(".logoutHeader").text("Logout");
						$(".myFormHeader").text("My Form")
						$(".performanceContractHeader").text("Performance Contract")
						$(".performancePlanHeader").text("Performance Improvement Plan")
						$(".controlPanelHeader").text("Control Panel")
						$(".auditTrailHeader").text("Audit Trail")
						$(".userRoleHeader").text("User Role")
						
					}
					 var methodType = "get";
					$.ajax({
						url: "/stratroom/notificationList",
						type: methodType,
						contentType: "application/json",
						success: function(response) {
							var dropdownMenu = $(".dropdown-menu-notification");
							var htmlContent = ""; 

							for (var i = 0; i < response.length; i++) {
								var notification = response[i];
								var message = notification.notificationValue.message;
								var formattedDate = notification.notificationValue.formattedDate;
								var status = notification.status;

								
								var title = message;
								var desc = ""; 

								
								if (message.length > 100) {
									desc = message.substring(0, 100) + "...";
								} else {
									desc = message;
								}

								
								var icon = '<i data-lucide="bell" style="width: 16px; height: 16px;"></i>';
								var bgColor = "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)";
								var textColor = "#333";

							
								htmlContent += '<li><a class="dropdown-item d-flex align-items-start p-3" href="#">';
								htmlContent += '<span class="icon me-3 mt-1 d-flex align-items-center justify-content-center" ';
								htmlContent += 'style="width: 32px; height: 32px; background: ' + bgColor + '; border-radius: 50%; color: ' + textColor + ';">';
								htmlContent += icon;
								htmlContent += '</span>';
								htmlContent += '<div class="flex-grow-1">';
								htmlContent += '<div class="fw-medium">' + title + '</div>';
								htmlContent += '<small class="text-muted">' + desc + '</small>';
								htmlContent += '<div class="text-muted small">' + formattedDate + '</div>';
								htmlContent += '</div>';
								htmlContent += '</a></li>';
							}

							
							if (response.length > 0) {
								htmlContent += '<li><hr class="dropdown-divider"></li>';
							}

							htmlContent += '<li><a class="dropdown-item text-center py-2" href="#">';
							htmlContent += '<small class="text-primary fw-medium">View all notifications</small>';
							htmlContent += '</a></li>';

							
							dropdownMenu.html(htmlContent);

							
							if (typeof lucide !== 'undefined') {
								lucide.createIcons();
							}
						},
						error: function(xhr, status, err) {
							console.error("Failed to load notifications:", err);
							var dropdownMenu = $(".dropdown-menu");
							dropdownMenu.html(
								'<li><a class="dropdown-item text-danger" href="#">Error loading notifications</a></li>' +
								'<li><hr class="dropdown-divider"></li>' +
								'<li><a class="dropdown-item text-center py-2" href="#">' +
								'<small class="text-primary fw-medium">View all notifications</small></a></li>'
							);
						}
					});

					//Notification
						const notificationDropdown = document.getElementById('notificationDropdown');
						const dropdownMenu = document.querySelector('[aria-labelledby="notificationDropdown"]');
						const notificationOffcanvas = document.getElementById('notificationOffcanvas');
						console.log(notificationDropdown, dropdownMenu, notificationOffcanvas, "function called");

						if (notificationDropdown && dropdownMenu) {
                // Override dropdown behavior on mobile
                notificationDropdown.addEventListener('click', function(e) {
					getNotification();
					console.log("this function clicked");
                    const viewportWidth = window.innerWidth;
                    
                    if (viewportWidth <= 576) {
                       
                        e.preventDefault();
                        e.stopPropagation();
                        
                       
                        const originalToggle = this.getAttribute('data-bs-toggle');
                        this.removeAttribute('data-bs-toggle');
                        
                       
                        const offcanvasInstance = new bootstrap.Offcanvas(notificationOffcanvas);
                        offcanvasInstance.show();
                        
                       
                        setTimeout(() => {
                            this.setAttribute('data-bs-toggle', originalToggle);
                        }, 100);
                        
                        return false;
                    }
                });
                
                notificationDropdown.addEventListener('show.bs.dropdown', function(e) {
                    const viewportWidth = window.innerWidth;
                    
                    // Prevent dropdown on mobile
                    if (viewportWidth <= 576) {
                        e.preventDefault();
                        return false;
                    }
                    
                    // Reset classes for desktop
                    dropdownMenu.classList.remove('dropdown-menu-end', 'dropdown-menu-start');
                    
                    // Get dropdown trigger position
                    const triggerRect = notificationDropdown.getBoundingClientRect();
                    const dropdownWidth = 350; // Default dropdown width
                    const scrollbarWidth = 15; // Approximate scrollbar width
                    
                    // Calculate available space on right and left
                    const spaceRight = viewportWidth - triggerRect.right - scrollbarWidth;
                    const spaceLeft = triggerRect.left;
                    
                    // Auto position based on available space
                    if (spaceRight >= dropdownWidth) {
                        // Enough space on right, align to start (left)
                        dropdownMenu.classList.add('dropdown-menu-start');
                    } else if (spaceLeft >= dropdownWidth) {
                        // Not enough space on right but enough on left, align to end (right)
                        dropdownMenu.classList.add('dropdown-menu-end');
                    } else {
                        // Try to center or use the side with more space
                        if (spaceRight > spaceLeft) {
                            dropdownMenu.classList.add('dropdown-menu-start');
                        } else {
                            dropdownMenu.classList.add('dropdown-menu-end');
                        }
                    }
                });
                
                // Reset positioning on window resize
                window.addEventListener('resize', function() {
                    const viewportWidth = window.innerWidth;
                    
                    // Close dropdown if switching to mobile
                    if (viewportWidth <= 576 && dropdownMenu.classList.contains('show')) {
                        const dropdownInstance = bootstrap.Dropdown.getInstance(notificationDropdown);
                        if (dropdownInstance) {
                            dropdownInstance.hide();
                        }
                    }
                    
                    // Trigger repositioning if dropdown is open on desktop
                    if (viewportWidth > 576 && dropdownMenu.classList.contains('show')) {
                        notificationDropdown.dispatchEvent(new Event('show.bs.dropdown'));
                    }
                });
            }
					//Notification

					var empId = $("#userPrincipal").val();
					$.ajax({
						url: "/stratroom/pageList/" + empId + "?language=" + "en",
						async: false,
						// success: function (pagelist, status) {
						// 	console.log(pagelist, "pageListData");

						// 	$.each(pagelist, function (index, page) {
						// 		console.log(page, "pageData");
						// 		if (page.groupType == "Measure" || page.pageType == "Standard_View") {
						// 			const pageUrl = "/stratroom/dashboard/" + page.createdBy
						// 				+ "?pageId=" + page.id
						// 			$('#measure').append(
						// 				'<li ><a class="dropdown-item" href="' + pageUrl + '" data-pageType="'+ page.pageType+'" data-groupType="Measure" data-pinType="'+page.pin+'">'
						// 				+ page.pageName + '</a></li>')
						// 		} else if (page.groupType == "Plan" || page.pageType == "SWOT" || page.pageType == "PESTEL" || page.pageType == "Strategy Map" || page.pageType == "Strategy Formulation" || page.pageType == "Project Formulation" || page.pageType == "Risk Formulation" || page.pageType == "Audit Management" || page.pageType == "AuditManagement") {
						// 			console.log("Plan Function Activated");
						// 			const pageUrl = "/stratroom/dashboard/" + page.createdBy
						// 				+ "?pageId=" + page.id
						// 			$('#planningDropdown').append(
						// 				'<li ><a class="dropdown-item" href="' + pageUrl + '"  data-pageType="'+ page.pageType+'" data-groupType="Plan" data-pinType="'+page.pin+'">'
						// 				+ page.pageName + '</a></li>')
						// 		} else if (page.groupType == "Execute" || page.pageType == "Initiatives & Projects" || page.pageType == "Task" || page.pageType == "Budget" || page.pageType == "Approval Page") {
						// 			const pageUrl = "/stratroom/dashboard/" + page.createdBy
						// 				+ "?pageId=" + page.id
						// 			$('#executeDropdown').append(
						// 				'<li ><a class="dropdown-item" href="' + pageUrl + '"  data-pageType="'+ page.pageType+'" data-groupType="Execute" data-pinType="'+page.pin+'">'
						// 				+ page.pageName + '</a></li>')
						// 		} else if (page.groupType == "Govern" || page.pageType == "Risk" || page.pageType == "Risk Formulation" || page.pageType == "Risk View" || page.pageType == "RiskEvent" || page.pageType == "Risk Radar" || page.pageType == "Compliance" || page.pageType == "Audit Management") {
						// 			const pageUrl = "/stratroom/dashboard/" + page.createdBy
						// 				+ "?pageId=" + page.id
						// 			$('#governDropdown').append(
						// 				'<li ><a class="dropdown-item" href="' + pageUrl + '"  data-pageType="'+ page.pageType+'" data-groupType="Govern" data-pinType="'+page.pin+'">'
						// 				+ page.pageName + '</a></li>')
						// 		} else if (page.groupType == "Meet" || page.pageType == "Meetings") {
						// 			const pageUrl = "/stratroom/dashboard/" + page.createdBy
						// 				+ "?pageId=" + page.id
						// 			$('#meetDropdown').append(
						// 				'<li ><a class="dropdown-item" href="' + pageUrl + '"  data-pageType="'+ page.pageType+'" data-groupType="Meet" data-pinType="'+page.pin+'">'
						// 				+ page.pageName + '</a></li>')
						// 		} else if (page.groupType == "Report" || page.pageType == "Cockpit" || page.pageType == "Charts" || page.pageType == "My Performance" || page.pageType == "My Space" || page.pageType == "Cockpit") {
						// 			var reportPageUrl;
						// 			if (page.pageType == "My Performance" || page.pageType == "My Space") {
						// 				reportPageUrl = "/stratroom/dashboard/" + page.createdBy
						// 					+ "?pageId=" + page.id
						// 			} else {
						// 				reportPageUrl = "/stratroom/whiteboard/" + empId
						// 					+ "?pageId=" + page.id
						// 			}

						// 			$('#reportDropdown').append(
						// 				'<li ><a class="dropdown-item" href="' + reportPageUrl + '"  data-pageType="'+ page.pageType+'" data-groupType="Report" data-pinType="'+page.pin+'">'
						// 				+ page.pageName + '</a></li>')
						// 		}
						// 	});
						// }
						success: function (pagelist, status) {

    console.log(pagelist, "pageListData");

    $.each(pagelist, function (index, page) {
        console.log(page, "pageData");

        // -----------------------
        // Add PIN ICON if pinned
        // -----------------------
        const pinIcon = page.pinned == "true" 
            ? '<img src="/stratroom/images/checkbox-303113_1280.png" style="width:12px;height:12px;margin-left:6px;" />'
            : '';

        // -----------------------
        // Create Page URL
        // -----------------------
        const pageUrl = "/stratroom/dashboard/" + page.createdBy + "?pageId=" + page.id;

        // -----------------------
        // MEASURE GROUP
        // -----------------------
        if (page.groupType == "Measure" || page.pageType == "Standard_View") {
            $('#measure').append(
                '<li><a class="dropdown-item" href="' + pageUrl + '" ' +
                'data-pageType="' + page.pageType + '" ' +
                'data-groupType="Measure" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );

        // -----------------------
        // PLAN GROUP
        // -----------------------
        } else if (
            page.groupType == "Plan" || page.pageType == "SWOT" || page.pageType == "PESTEL"  || page.pageType == "Strategy Formulation" ||
            page.pageType == "Project Formulation" || page.pageType == "Risk Formulation" ||
            page.pageType == "Audit Management" || page.pageType == "AuditManagement" 
        ) {
            $('#planningDropdown').append(
                '<li><a class="dropdown-item" href="' + pageUrl + '" ' +
                'data-pageType="' + page.pageType + '" data-groupType="Plan" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );

        // -----------------------
        // EXECUTE GROUP
        // -----------------------
        } else if (
            page.groupType == "Execute" || page.pageType == "Initiatives & Projects"  ||
            page.pageType == "Task" || page.pageType == "Budget" || page.pageType == "Approval Page" || page.pageType == "InitiativeView" 
        ) {
            $('#executeDropdown').append(
                '<li><a class="dropdown-item" href="' + pageUrl + '" ' +
                'data-pageType="' + page.pageType + '" data-groupType="Execute" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );

        // -----------------------
        // GOVERN GROUP
        // -----------------------
        } else if (
            page.groupType == "Govern" || page.pageType == "Risk" || page.pageType == "Risk Formulation" || page.pageType == "Audit Dashboard"  || page.pageType == "Risk View" || page.pageType == "RiskEvent" || page.pageType == "Impact Assesment" || page.pageType == "Process Enabaler" || page.pageType == "Rpo" || page.pageType == "Compliance" || page.pageType == "Audit Management"  || page.pageType == "IncidentManagement" || page.pageType == "Incident Management"
        ) {
            $('#governDropdown').append(
                '<li><a class="dropdown-item" href="' + pageUrl + '" ' +
                'data-pageType="' + page.pageType + '" data-groupType="Govern" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );

        // -----------------------
        // MEET GROUP
        // -----------------------
        } else if (page.groupType == "Meet" || page.pageType == "Meetings") {
            $('#meetDropdown').append(
                '<li><a class="dropdown-item" href="' + pageUrl + '" ' +
                'data-pageType="' + page.pageType + '" data-groupType="Meet" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );

        // -----------------------
        // REPORT GROUP
        // -----------------------
        } else if (
            page.groupType == "Report" || page.pageType == "Cockpit" || page.pageType == "Charts" ||
            page.pageType == "My Performance" || page.pageType == "My Space"
        ) {

            var reportPageUrl;
            if (page.pageType == "My Performance" || page.pageType == "My Space") {
                reportPageUrl = pageUrl;
            } else {
                reportPageUrl = "/stratroom/whiteboard/" + empId + "?pageId=" + page.id;
            }

            $('#reportDropdown').append(
                '<li><a class="dropdown-item" href="' + reportPageUrl + '" ' +
                'data-pageType="' + page.pageType + '" data-groupType="Report" data-pinType="' + page.pinned + '">' +
                page.pageName + pinIcon + '</a></li>'
            );
        }
    });
}

					})
					var useraccessid = localStorage.getItem('useraccessid')
					if (useraccessid != "" && useraccessid != null) {
						$.ajaxSetup({
							beforeSend: function (xhr) {
								xhr.setRequestHeader("useraccessid", useraccessid);
							}
						});
					}

					var systemip = localStorage.getItem('systemip');
					var existsystemreq = localStorage.getItem('existsystemreq');
					if ((systemip != null || systemip != "") && (existsystemreq == null || existsystemreq == "")) {
						//$.getJSON("https://api.ipify.org/?format=json", function(e) {
						//systemip	=	e.ip;
						//localStorage.setItem('systemip',systemip);
						localStorage.setItem('existsystemreq', "sent");
						var currentEmp = $("#userPrincipal").val();
						var data = { "userId": currentEmp, "createdBy": currentEmp, "action": "User Login", "systemIp": systemip };
						$.ajax({
							url: "/stratroom/auditTrail",
							type: "post",
							async: false,
							contentType: "application/JSON",
							data: JSON.stringify(data),
							success: function (res) {

							}
						});
				/*}).fail(function(e){
					localStorage.setItem('systemip',"Cross site error");
					var data	=	{"action":"User Login","systemIp":"Cross site error"};
					$.ajax({
						url:"/stratroom/auditTrail",
						type:"post",
						async:false,
						contentType:"application/JSON",
						data:JSON.stringify(data),
						success:function(res){
							
						}
					});
				})*/;
					}


					$.ajaxSetup({
						beforeSend: function (xhr) {
							xhr.setRequestHeader("systemip", systemip);
						}
					});

					$(".menulistaccess li").each(function () {
						$(this).removeClass("active");
					});
					var newURL = window.location.href;
					newURL = newURL.toLowerCase();


					dashboardpagecategory();
					whiteboardpagecategory();
					homeFlagpage();
					$(".superadmindropdown").append('<a href="/stratroom/organizationHome" class="subuserlink dropdown-item">Organization</a>')
					//$(".superadmindropdown").append('<a href="/stratroom/orgtracker" class="orgtracker dropdown-item">Organisation Tracker</a>')
					var empId = $("#userPrincipal").val();
					var navigateempId = $("#userPrincipalnavigate").val();

					$.ajax({
						// url: "/stratroom/pageList/" + empId + "?language=" + "en",
						async: false,
						success: function (pagelist, status) {
							console.log(pagelist, "pageListData");
							var searchurlparams = (new URL(document.location)).searchParams;
							var presentpageNo = searchurlparams.get("pageId");
							var presentsetactive = "";
							var homepageHighlight = "";
							$.each(pagelist, function (index, page) {
								pagefunction = "pagecustom(" + page.id + ")";

								console.log(pagelist, "pageListData");

								if (page.pageType == "Cockpit" || page.pageType == "Charts" || page.pageType == "StrategyMap" || page.pageType == "Report") {
									var pagenumber = $("#pagenumber").val();
									if (pagenumber == page.id) {
										$(".page-title").html(page.pageName);
									}
									localStorage.removeItem('dashboardexpand');
									if ((presentpageNo != "" && presentpageNo != undefined && presentpageNo != null) && presentpageNo == page.id) {
										$('.whiteboardclass #custompage1').css('display', 'block !important');
										presentsetactive = "active";
									} else {
										presentsetactive = "";
									}
									if (presentsetactive == "active") {
										$("li.whiteboardclass a:first").not("ul#custompage1").addClass("toggled");
									}
									if (page.homePgFlag != null && page.homePgFlag == true) {
										homepageHighlight = "homepageHighlight";
										if (newURL.indexOf('login') >= 0) {
											presentsetactive = "active";
											$('.dashboardclass #custompage').css('display', 'block !important');
											localStorage.setItem('dashboardexpand', page.id);
										}
									} else {
										homepageHighlight = "";
									}

									var pageUrl = "/stratroom/whiteboard/" + empId
										+ "?pageId=" + page.id
									//$('#custompage').append('<li><a href="#" onclick='+pagefunction+'>'+page.pageName+'</a></li>')
									$('#custompage1').append(
										'<li ><a class="dropdown-item" href="' + pageUrl + '">'
										+ page.pageName + '</a></li>')

									if (navigateempId == empId) {
										pageUrl = "/stratroom/whiteboard/" + empId
											+ "?pageId=" + page.id
										$('#supercustompage1').append(
											'<li class="contextmenustratroompage" id="pageeditoption_' + page.id + '" data-id="' + page.id + '" data-pagetype="' + page.pageType + '" data-page="' + page.pageName + '"><a class="dropdown-item" href="' + pageUrl + '">'
											+ page.pageName + '</a></li>')
										$(".superadmindropdown").append('<a class="dropdown-item" href="' + pageUrl + '" class="dropdown-item superusertopmenu ' + page.id + '">' + page.pageName + '</a>')
									}
								} else {
									var pagenumber = $("#pagenumber").val();
									let pageurlparams = (new URL(document.location)).searchParams;
									let pageaccessNo = pageurlparams.get("pageId");
									if (pagenumber == page.id) {
										$(".page-title").html(page.pageName);
									}

									if (page.pageType == "Standard_View" && pageaccessNo == page.id) {
										localStorage.setItem('defaultscorecardpagename', page.pageName);
									}

									if ((presentpageNo != "" && presentpageNo != undefined && presentpageNo != null) && presentpageNo == page.id) {
										$('.dashboardclass #custompage').css('display', 'block !important');
										localStorage.setItem('dashboardexpand', page.id);
										presentsetactive = "active";
									} else {
										presentsetactive = "";
									}

									if (page.homePgFlag != null && page.homePgFlag == true) {
										homepageHighlight = "homepageHighlight";
										if (newURL.indexOf('login') >= 0 || newURL.indexOf('organizationHome') >= 0) {
											presentsetactive = "active";
											$('.dashboardclass #custompage').css('display', 'block !important');
											localStorage.setItem('dashboardexpand', page.id);
										}
									} else {
										homepageHighlight = "";
									}

									if (presentsetactive == "active") {
										$("li.dashboardclass a:first").not("ul#custompage").addClass("toggled");
									}
									var pageUrl = "/stratroom/dashboard/" + page.createdBy
										+ "?pageId=" + page.id
									//$('#custompage').append('<li><a href="#" onclick='+pagefunction+'>'+page.pageName+'</a></li>')
									$('#custompage').append(
										'<li ><a class="dropdown-item" href="' + pageUrl + '">'
										+ page.pageName + '</a></li>')
									if (navigateempId == empId) {
										pageUrl = "/stratroom/dashboard/" + page.createdBy
											+ "?pageId=" + page.id
										$('#supercustompage').append(
											'<li> <a class="dropdown-item" href="' + pageUrl + '">'
											+ page.pageName + '</a></li>')
										$(".superadmindropdown").append('<a class="dropdown-item" href="' + pageUrl + '" class="dropdown-item superusertopmenu ' + page.id + '">' + page.pageName + '</a>')
									}
								}

							});

							if ($("#custompage li").length == 0) {
								$(".dashboardclass").remove();
							}
							if ($("#supercustompage li").length == 0) {
								$(".superdashboardclass").remove();
							}

							if (newURL.indexOf('excelupload') >= 0) {
								$("li.datasourceclass a:first").addClass("toggled");
								$(".exceluploadlink").addClass("active");
							}

							if (newURL.indexOf('exceltemplate') >= 0) {
								$("li.templatelink a:first").addClass("toggled");
								$(".exceltemplatesmenu").addClass("active");
							}


							if (newURL.indexOf('processenabler') >= 0) {
								$("li.templatelink a:first").addClass("toggled");
								$(".processmenu").addClass("active");
							}

							if (newURL.indexOf('budget') >= 0) {
								$("li.templatelink a:first").addClass("toggled");
								$(".processmenu").addClass("active");
							}

							if (newURL.indexOf('rpo') >= 0) {
								$("li.templatelink a:first").addClass("toggled");
								$(".rpotemplatesmenu").addClass("active");

								if (newURL.indexOf('masters') >= 0) {
									$("li.templatelink a:first").addClass("toggled");
									$(".masterstemplatesmenu").addClass("active");

								}
							}
						}
					});

					if (navigateempId != empId) {
						$.ajax({
							// url : "/stratroom/pageList/" + navigateempId,
							async: false,
							success: function (pagelist, status) {
								var searchurlparams = (new URL(document.location)).searchParams;
								var presentpageNo = searchurlparams.get("pageId");
								var presentsetactive = "";
								var homepageHighlight = "";
								$.each(pagelist, function (index, page) {
									pagefunction = "pagecustom(" + page.id + ")";
									if (page.pageType == "Cockpit" || page.pageType == "Charts" || page.pageType == "StrategyMap") {
										var pagenumber = $("#pagenumber").val();
										if (pagenumber == page.id) {
											$(".page-title").html(page.pageName);
										}

										localStorage.removeItem('subdashboardexpand');
										if ((presentpageNo != "" && presentpageNo != undefined && presentpageNo != null) && presentpageNo == page.id) {
											$('.subdashboardexpand1 #supercustompage1').css('display', 'block !important');
											presentsetactive = "active";
										} else {
											presentsetactive = "";
										}
										if (presentsetactive == "active") {
											$("li.subdashboardexpand1 a:first").not("ul#supercustompage1").addClass("toggled");
										}
										if (page.homePgFlag != null && page.homePgFlag == true) {
											homepageHighlight = "homepageHighlight";
											if (newURL.indexOf('login') >= 0 || newURL.indexOf('organizationHome') >= 0) {
												presentsetactive = "active";
												$('.subdashboardexpand1 #supercustompage1').css('display', 'block !important');
												localStorage.setItem('subdashboardexpand', page.id);
											} else {
												presentsetactive = "";
											}
										} else {
											homepageHighlight = "";
										}

										var pageUrl = "/stratroom/whiteboard/" + navigateempId
											+ "?pageId=" + page.id;
										$('#supercustompage1').append(
											'<li class="contextmenustratroompagesub ' + presentsetactive + ' ' + homepageHighlight + '" id="pageeditoption_' + page.id + '" data-id="' + page.id + '" data-pagetype="' + page.pageType + '" data-page="' + page.pageName + '"><a class="dropdown-item" href="' + pageUrl + '">'
											+ page.pageName + '</a></li>')
										$(".superadmindropdown").append('<a class="dropdown-item" href="' + pageUrl + '" class="dropdown-item superusertopmenu ' + page.id + '">' + page.pageName + '</a>')
									} else {
										var pagenumber = $("#pagenumber").val();
										let pageurlparams = (new URL(document.location)).searchParams;
										let pageaccessNo = pageurlparams.get("pageId");
										if (pagenumber == page.id) {
											$(".page-title").html(page.pageName);
										}

										if ((presentpageNo != "" && presentpageNo != undefined && presentpageNo != null) && presentpageNo == page.id) {
											$('.superdashboardclass #supercustompage').css('display', 'block !important');
											localStorage.setItem('subdashboardexpand', page.id);
											presentsetactive = "active";
										} else {
											presentsetactive = "";
										}


										if (page.homePgFlag != null && page.homePgFlag == true) {
											homepageHighlight = "homepageHighlight";

											if (newURL.indexOf('login') >= 0 || newURL.indexOf('organizationHome') >= 0) {
												presentsetactive = "active";
												$('.superdashboardclass #supercustompage').css('display', 'block !important');
												localStorage.setItem('subdashboardexpand', page.id);
											}
										} else {
											homepageHighlight = "";
										}

										if (presentsetactive == "active") {
											$("li.superdashboardclass a:first").not("ul#supercustompage").addClass("toggled");
										}

										var pageUrl = "/stratroom/dashboard/" + page.createdBy
											+ "?pageId=" + page.id
										$('#supercustompage').append(
											'<li class="contextmenustratroompagesub ' + presentsetactive + ' ' + homepageHighlight + '" id="pageeditoption_' + page.id + '" data-id="' + page.id + '" data-pagetype="' + page.pageType + '" data-page="' + page.pageName + '"><a class="dropdown-item" href="' + pageUrl + '">'
											+ page.pageName + '</a></li>')
										$(".superadmindropdown").append('<a class="dropdown-item" href="' + pageUrl + '" class="dropdown-item superusertopmenu ' + page.id + '">' + page.pageName + '</a>')
									}

								});
							}
						});
					}

					$("#custompage li a").each(function () {
						$(this).removeClass("toggled");
					});
					$("#custompage1 li a").each(function () {
						$(this).removeClass("toggled");
					});

					$(".addnewpagehover").click(function () {
						var typeuser = $(this).attr("data-name");
						$("#boardusertype").val(typeuser)
					});

					$("#pageForm").validate({
						rules: {
							pagename: "required",
							category: "required",
						},
						messages: {
							pagename: "Please enter your board name",
							category: "Please select module type ",
						},
						errorPlacement: function (error, element) {
							error.insertAfter(element);
						},

						submitHandler: function (form) {
							addpage();
						}

					});

					$("#pageForm1").validate({
						rules: {
							whiteBoardname: "required",
							whiteboardType: "required",
						},
						messages: {
							whiteBoardname: "Please enter your board name",
							whiteboardType: "Please select whiteboard type ",
						},
						errorPlacement: function (error, element) {
							error.insertAfter(element);
						},

						submitHandler: function (form) {
							addWhitePage();
						}

					});

					$("#editpageForm").validate({
						rules: {
							editwhiteBoardname: "required"
						},
						messages: {
							editwhiteBoardname: "Please enter your board name"
						},
						errorPlacement: function (error, element) {
							error.insertAfter(element);
						},

						submitHandler: function (form) {
							EditWhitePage();
						}

					});
				});

				function dashboardpagecategory() {

					$.ajax({
						url: "/stratroom/pageTypeList",
						success: function (pagelist, status) {

							/*var checkemptydash	=	false;
							if(jQuery.inArray("View", riskPermission) !== -1 || jQuery.inArray("View", initiativePermission) !== -1 ||
							jQuery.inArray("View", employeePermission) !== -1 || jQuery.inArray("View", pestelPermission) !== -1 ||
							jQuery.inArray("View", meetingPermission) !== -1 || jQuery.inArray("View", scorecardPermission) !== -1 ||
							jQuery.inArray("View", swotPermission) !== -1){
								checkemptydash		=	true;
							}
							
							if (jQuery.isEmptyObject(pagelist) && checkemptydash	==	false) {
								$(".dashboardclass").remove();
							}*/
							$.each(pagelist, function (index, page) {
								$(".dashboardpagecategory").append('<option value="' + index + '">' + page + '</option>');
							});
						}
					});
				}

				function homeFlagpage() {
					$.ajax({
						url: "/stratroom/checkHomePageFlag",
						success: function (response) {
							var accessPgFlag = false;
							var orgPgFlag = false;
							var controlPgFlag = false;
							var audittrailPgFlag = false;
							var userrolePgFlag = false;
							if (response.accessPgFlag != undefined && response.accessPgFlag == true) {
								accessPgFlag = true;
								$(".enableaccesscontrolMenu").addClass("homepageHighlight");
							}
							if (response.orgPgFlag != undefined && response.orgPgFlag == true) {
								orgPgFlag = true;
								$(".organizationhome").addClass("homepageHighlight");
							}
							if (response.controlPgFlag != undefined && response.controlPgFlag == true) {
								controlPgFlag = true;
								$(".controlpanel").addClass("homepageHighlight");
							}
							if (response.audittrailPgFlag != undefined && response.audittrailPgFlag == true) {
								audittrailPgFlag = true;
								$(".audittrailpage").addClass("homepageHighlight");
							}
							if (response.userrolePgFlag != undefined && response.userrolePgFlag == true) {
								userrolePgFlag = true;
								$(".userrolepage").addClass("homepageHighlight");
							}
							var newURL = window.location.href;
							newURL = newURL.toLowerCase();

							if (newURL.indexOf('organizationhome') >= 0) {
								$('ul.menulistaccess li.organizationhome').addClass("active");
								localStorage.removeItem('dashboardexpand');
								localStorage.removeItem('subdashboardexpand');
							}

							if (newURL.indexOf('accesscontrol') >= 0) {
								$('ul.menulistaccess li.enableaccesscontrolMenu').addClass("active");
								localStorage.removeItem('dashboardexpand');
								localStorage.removeItem('subdashboardexpand');
							}

							if (newURL.indexOf('controlpanel') >= 0) {
								$('ul.menulistaccess li.controlpanel').addClass("active");
								localStorage.removeItem('dashboardexpand');
								localStorage.removeItem('subdashboardexpand');
							}

							if (newURL.indexOf('audittrailpage') >= 0) {
								$('ul.menulistaccess li.audittrailpage').addClass("active");
								localStorage.removeItem('dashboardexpand');
								localStorage.removeItem('subdashboardexpand');
							}

							if (newURL.indexOf('userrolemanagement') >= 0) {
								$('ul.menulistaccess li.userrolepage').addClass("active");
								localStorage.removeItem('dashboardexpand');
								localStorage.removeItem('subdashboardexpand');
							}

							if (newURL.indexOf('login') >= 0) {
								/*$(".menulistaccess li").each(function(){
									$(this).removeClass("active");
								});*/
								if (accessPgFlag == true) {
									$('ul.menulistaccess li.enableaccesscontrolMenu').addClass("active");
								}
								if (controlPgFlag == true) {
									$('ul.menulistaccess li.controlpanel').addClass("active");
								}
								if (orgPgFlag == true) {
									$('ul.menulistaccess li.organizationhome').addClass("active");
								}
								if (audittrailPgFlag == true) {
									$('ul.menulistaccess li.audittrailpage').addClass("active");
								}
								if (userrolePgFlag == true) {
									$('ul.menulistaccess li.userrolepage').addClass("active");
								}
							}
						}
					})
				}

				function whiteboardpagecategory() {

					$.ajax({
						url: "/stratroom/pageTypeList?boardType=whiteboard",
						success: function (pagelist, status) {
							var checkemptywhite = false;
							/*if(jQuery.inArray("View", chartsPermission) !== -1 || jQuery.inArray("View", dashboardPermission) !== -1){
								checkemptywhite		=	true;
							}
							if (jQuery.isEmptyObject(pagelist) && checkemptywhite	==	false) {
								$(".whiteboardclass").remove();
							}*/
							$.each(pagelist, function (index, page) {
								$(".whiteboardpagecategory").append('<option value="' + index + '">' + page + '</option>');
							});
						},
						error: function () {
							//$(".whiteboardclass").remove();
						}
					});
				}

				function addpage() {

					var pagename = $('#pageForm #pagename').val()
					if (pagename == undefined || pagename == "" || pagename == 0) {
						return false;
					}

					var pagetype = $('#pageForm #category').val()
					if (pagetype == null || pagetype == "" || pagetype == undefined) {
						return false;
					}
					var userboard = $("#boardusertype").val();
					var currentboarduser = (userboard == "root" ? $("#userPrincipal").val() : $("#userPrincipalnavigate").val());
					var pageobj = {
						"active": 0,
						"createdBy": currentboarduser,
						"pageName": pagename,
						"pageType": pagetype
					}


					var pageUrl = '';
					$
						.ajax({
							url: "/stratroom/pages",
							type: 'post',
							contentType: "application/json",
							data: JSON.stringify(pageobj),
							success: function (data, status) {
								console.log("New page  created..");
								if (pagetype == "Scorecard" || pagetype == "Standard_View") {
									localStorage.setItem('defaultscorecardpagename', pagename);
								}

								$.ajax({
									url: "/stratroom/pages/" + data.pageDTO.id,
									success: function (page, status) {
										/* var pageUrl ='';								
											pageUrl = "<c:out value='${contextroot}'/>/dashboard/"+ page.pageName+ "/"+ $("#userPrincipal").val();
										 */
										pageUrl = "<c:out value='${contextroot}'/>/dashboard/"
											+ currentboarduser
											+ "?pageId=" + page.id;
										console.log(pageUrl)
										//$('#custompage').append('<li><a href="#" onclick='+pagefunction+'>'+page.pageName+'</a></li>')
										$('#custompage').append(
											'<li class="contextmenustratroompage roothomepage"><a class="dropdown-item" href="' + pageUrl + '">'
											+ page.pageName
											+ '</a></li>')
										//$('.page_description_popup').css('display', 'none');
										$("#pagePopUpId").click();
									}
								});

								var newURL = window.location.href;
								newURL = newURL.toLowerCase();
								newURL = newURL.split("?");

								var finalurl = newURL[0];
								console.log("Final Url :: " + finalurl)

								if (finalurl.includes('organizationhome')) {
									var res = finalurl.replace("organizationhome",
										"dashboard");
									window.location = res + '/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('dashboard')) {
									var dashnewURL = finalurl.split("dashboard");
									window.location = dashnewURL[0] + 'dashboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('login')) {
									var dashnewURL = finalurl.split("login");
									window.location = dashnewURL[0] + 'dashboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('whiteboard')) {
									var dashnewURL = finalurl.split("whiteboard");
									window.location = dashnewURL[0] + 'dashboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('risks')) {
									localStorage.setItem("risk_pagenumber", "");
									var dashnewURL = finalurl.split("risks");
									window.location = dashnewURL[0] + 'dashboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('strategyformulation')) {
									localStorage.setItem("formulation_pagenumber", "");
									var dashnewURL = finalurl.split("strategyformulation");
									window.location = dashnewURL[0] + 'dashboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('projectformulation')) {
									localStorage.setItem("formulation_pagenumber", "");
									var dashnewURL = finalurl.split("projectformulation");
									window.location = dashnewURL[0] + 'dashboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('riskformulation')) {
									localStorage.setItem("formulation_pagenumber", "");
									var dashnewURL = finalurl.split("riskformulation");
									window.location = dashnewURL[0] + 'dashboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('charts')) {
									var dashnewURL = finalurl.split("charts");
									window.location = dashnewURL[0] + 'dashboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('strategyMap')) {
									var dashnewURL = finalurl.split("strategyMap");
									window.location = dashnewURL[0] + 'dashboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('dashboardpreference')) {
									var dashnewURL = finalurl
										.split("dashboardpreference");
									window.location = dashnewURL[0] + 'dashboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('employeeview')) {
									var dashnewURL = finalurl.split("employeeview");
									window.location = dashnewURL[0] + 'dashboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('accesscontrol')) {
									var dashnewURL = finalurl.split("accesscontrol");
									window.location = dashnewURL[0] + 'dashboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else {
									// Default redirect to the dashboard if no match
									window.location = '/stratroom/dashboard/' + currentboarduser + "?pageId=" + data.pageDTO.id;;
								}

							},

							error: function (data, status) {
								if (data.exception == 'Duplicate PageName Provided') {
									$("#boardnamedup").nextAll().remove();
									$("#boardnamedup")
										.append(
											"<span id='spanid' style='color:red'>BoardName already exist</span>");
								} else {
									if (!jQuery.isEmptyObject(data.responseText)) {
										$.each(JSON.parse(data.responseText), function (key, value) {
											if (key == "exception") {
												$.notify(value, {
													style: 'error',
													className: 'graynotify'
												});
											}
										});

									}
								}
							}

						});
				};


				function EditWhitePage() {

					var pagename = $('#editpageForm #editwhiteBoardname').val()
					if (pagename == undefined || pagename == "" || pagename == 0) {
						return false;
					}

					var pageid = $('#editpageForm #editpageid').val()
					if (pageid == null || pageid == "" || pageid == undefined) {
						return false;
					}
					var pagetype = $('#editpageForm #editpagetype').val()
					if (pagetype == null || pagetype == "" || pagetype == undefined) {
						return false;
					}

					var pageobj = {
						"id": pageid,
						"active": 0,
						"createdBy": $("#userPrincipal").val(),
						"pageName": pagename,
						"pageType": pagetype
					}

					var pageUrl = '';
					$.ajax({
						url: "/stratroom/pages",
						type: 'put',
						contentType: "application/json",
						data: JSON.stringify(pageobj),
						success: function (data, status) {
							window.location.reload(true);
						},

						error: function (data, status) {
							if (data.exception == 'Duplicate PageName Provided') {
								$("#whiteboardnamedupedit").nextAll().remove();
								$("#whiteboardnamedupedit")
									.append(
										"<span id='spanid' style='color:red'>BoardName already exist</span>");
							} else {
								if (!jQuery.isEmptyObject(data.responseText)) {
									$.each(JSON.parse(data.responseText), function (key, value) {
										if (key == "exception") {
											$.notify(value, {
												style: 'error',
												className: 'graynotify'
											});
										}
									});

								}
							}
						}
					});
				};

				function addWhitePage() {

					var pagename = $('#pageForm1 #whiteBoardname').val()
					if (pagename == undefined || pagename == "" || pagename == 0) {
						return false;
					}

					var pagetype = $('#pageForm1 #whiteboardType').val()
					if (pagetype == null || pagetype == "" || pagetype == undefined) {
						return false;
					}

					var userboard = $("#boardusertype").val();
					var currentboarduser = (userboard == "root" ? $("#userPrincipal").val() : $("#userPrincipalnavigate").val());
					var pageobj = {
						"active": 0,
						"createdBy": currentboarduser,
						"pageName": pagename,
						"pageType": pagetype
					}

					var pageUrl = '';
					$
						.ajax({
							url: "/stratroom/pages",
							type: 'post',
							contentType: "application/json",
							data: JSON.stringify(pageobj),
							success: function (data, status) {
								console.log("New whiteboard  created..");
								$
									.ajax({
										url: "/stratroom/pages/" + data.pageDTO.id,
										success: function (page, status) {
											pageUrl = "<c:out value='${contextroot}'/>/whiteboard/"
												+ currentboarduser
												+ "?pageId=" + page.id;
											$('#custompage1').append(
												'<li data-id="' + page.id + '" class="contextmenustratroompage roothomepage" data-pagetype="' + page.pageType + '" data-page="' + page.pageName + '"><a class="dropdown-item" href="' + pageUrl + '">'
												+ page.pageName
												+ '</a></li>')
											//$('.whiteboard_addpage_popup').css('display', 'none');
											$("#closepageModalpopup").click();
										}
									});

								var newURL = window.location.href;
								newURL = newURL.toLowerCase();
								newURL = newURL.split("?");
								var finalurl = newURL[0];
								if (finalurl.includes('organizationhome')) {
									var res = finalurl.replace("organizationhome",
										"whiteboard");
									window.location = res + '/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('dashboard')) {
									var dashnewURL = finalurl.split("dashboard");
									window.location = dashnewURL[0] + 'whiteboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('login')) {
									var dashnewURL = finalurl.split("login");
									window.location = dashnewURL[0] + 'whiteboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('whiteboard')) {
									var dashnewURL = finalurl.split("whiteboard");
									window.location = dashnewURL[0] + 'whiteboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('risks')) {
									var dashnewURL = finalurl.split("risks");
									window.location = dashnewURL[0] + 'whiteboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('dashboardpreference')) {
									var dashnewURL = finalurl
										.split("dashboardpreference");
									window.location = dashnewURL[0] + 'whiteboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('charts')) {
									var dashnewURL = finalurl.split("charts");
									window.location = dashnewURL[0] + 'whiteboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('strategyMap')) {
									var dashnewURL = finalurl.split("strategyMap");
									window.location = dashnewURL[0] + 'whiteboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else if (finalurl.includes('employeeview')) {
									var dashnewURL = finalurl.split("employeeview");
									window.location = dashnewURL[0] + 'whiteboard/'
										+ currentboarduser + "?pageId="
										+ data.pageDTO.id;
								} else {
									// Default redirect to the dashboard if no match
									window.location = '/stratroom/whiteboard/' + currentboarduser + "?pageId=" + data.pageDTO.id;;
								}
							},

							error: function (data, status) {
								if (data.exception == 'Duplicate PageName Provided') {
									$("#whiteBoardname").nextAll().remove();
									$("#whiteboardnamedup")
										.append(
											"<span id='spanid' style='color:red'>BoardName already exist</span>");
								} else {
									if (!jQuery.isEmptyObject(data.responseText)) {
										$.each(JSON.parse(data.responseText), function (key, value) {
											if (key == "exception") {
												$.notify(value, {
													style: 'error',
													className: 'graynotify'
												});
											}
										});

									}
								}
							}
						});
				};

				$(".userrolepage").click(function () {
					localStorage.setItem("roletab", "User");
				});

				$(".close").click(function () {
					$("#pageForm").validate().resetForm();
					$("#pageForm1").validate().resetForm();
					$('#boardnamedup').find('span').remove();
					$('whiteboardnamedup').find('span').remove();
					$('#whiteBoardname').val('');
					$('#pagename').val('');
					$('#category').val('');
					$('#whiteboardType').val('');
				});

				$(".cancelB").click(function () {
					$("#pageForm").validate().resetForm();
					$("#pageForm1").validate().resetForm();
					$('#boardnamedup').find('span').remove();
					$('whiteboardnamedup').find('span').remove();
					$('#whiteBoardname').val('');
					$('#pagename').val('');
					$('#category').val('');
					$('#whiteboardType').val('');
				});

				function handlepageeventdelete() {

					var id = $("#deleterecordpageid").val();
					if (id == "") {
						return false;
					}
					var urlparams = (new URL(document.location)).searchParams;
					var getpageNo = urlparams.get("pageId");
					$(".page-loader-wrapper").css("display", "block");
					$.ajax({
						url: "/stratroom/pages/" + id,
						type: "delete",
						contentType: "application/json",
						success: function (data, status) {
							if (getpageNo == id) {
								var newURL = window.location.href;
								newURL = newURL.toLowerCase();
								if (newURL.indexOf('dashboard') >= 0) {
									newURL = newURL.split("dashboard");
									window.location = newURL[0] + 'login';
								} else if (newURL.indexOf('whiteboard') >= 0) {
									newURL = newURL.split("whiteboard");
									window.location = newURL[0] + 'login';
								} else {
									window.location = "login";
								}
							} else {
								location.reload(true);
							}
						},
						error: function () {
							$(".page-loader-wrapper").css("display", "none");
						}
					});
				}

				function setHomePage() {
					var sethomemethodtype = $("#sethomemethodtype").val();
					if (sethomemethodtype == "boards") {
						var pagename = $('#homeModalPage #sethomerecordpagename').val()
						if (pagename == undefined || pagename == "" || pagename == 0) {
							return false;
						}

						var pageid = $('#homeModalPage #sethomerecordpageid').val()
						if (pageid == null || pageid == "" || pageid == undefined) {
							return false;
						}
						var pagetype = $('#homeModalPage #sethomerecordtype').val()
						if (pagetype == null || pagetype == "" || pagetype == undefined) {
							return false;
						}

						var pageobj = {
							"id": $("#setboarduserid").val(),
							"pageName": pagename,
							"pageId": pageid
						}
					} else {
						var pagename = $('#homeModalPage #sethomerecordpagename').val()
						var pageid = $('#homeModalPage #sethomerecordpageid').val()
						if (!Number.isInteger(pageid)) {
							pageid = 0;
						}

						var pageobj = {
							"id": $("#userPrincipal").val(),
							"pageName": pagename,
							"pageId": pageid
						}
					}

					var pageUrl = '';
					$.ajax({
						url: "/stratroom/homePagePreferences",
						type: 'post',
						contentType: "application/json",
						data: JSON.stringify(pageobj),
						success: function (data, status) {
							window.location.reload(true);
						},

						error: function (data, status) {

						}
					});
				};

				function pagecustom(pageno) {
					$("body").load("/stratroom/custompage/" + pageno);
				}


				document.getElementById('editForm').addEventListener('submit', function(e) {
				  e.preventDefault();
				  updatePageName(e); 
				});


				function updatePageName(event) {
					var currentEmp = $("#userPrincipal").val().trim();
					console.log(currentEmp, "currentEmp");
					var payload = {
						"id": editPageId,
						"active": 0,
						"createdBy": currentEmp,
						"groupType": editGrouptype,
						"pageName": $("#editInput").val(),
						"pageType": editPageType,
					}

					console.log(payload, "payload");

					$.ajax({
						url: "/stratroom/pages",
						type: 'put',
						contentType: "application/json",
						data: JSON.stringify(payload),
						success: function (data, status) {
							window.location.reload(true);
						},

						error: function (data, status) {
							if (data.exception == 'Duplicate PageName Provided') {
								$("#whiteboardnamedupedit").nextAll().remove();
								$("#whiteboardnamedupedit")
									.append(
										"<span id='spanid' style='color:red'>BoardName already exist</span>");
							} else {
								if (!jQuery.isEmptyObject(data.responseText)) {
									$.each(JSON.parse(data.responseText), function (key, value) {
										if (key == "exception") {
											$.notify(value, {
												style: 'error',
												className: 'graynotify'
											});
										}
									});

								}
							}
						}
					});
				}

				function getNotification() {
					var methodType = "get";
					$.ajax({
						url: "/stratroom/notificationList",
						type: methodType,
						contentType: "application/json",
						success: function(response) {
							var dropdownMenu = $(".drop-down-notificationList");
							var htmlContent = ""; 

							
							for (var i = 0; i < response.length; i++) {
								var maxTitleLength = 27;
							var notification = response[i];
							var message = notification.notificationValue.message;
							var formattedDate = notification.notificationValue.formattedDate;

							var title = message;



    
						    htmlContent += 
								'<li>' +
								'  <a class="dropdown-item d-flex align-items-start p-3 text-decoration-none" href="#">' +
								'    <span class="icon me-3 mt-1 d-flex align-items-center justify-content-center" style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; color: white;">' +
								'      <i data-lucide="message-circle" style="width: 16px; height: 16px;"></i>' +
								'    </span>' +
								'    <div class="flex-grow-1 d-flex flex-column" style="width: 80%;">' +
								'      <div class="fw-medium" style="white-space: normal; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; max-height: 3.6em;">' + 
									title + 
								'      </div>' +
								'      <div class="text-muted small" style="white-space: normal; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; max-height: 1.2em;">' + 
									formattedDate + 
								'      </div>' +
								'    </div>' +
								'  </a>' +
								'</li>';
							}

							
							if (response.length > 0) {
								htmlContent += '<li><hr class="dropdown-divider"></li>';
							}

							htmlContent += '<li><a class="dropdown-item text-center py-2" href="#">';
							htmlContent += '<small class="text-primary fw-medium">View all notifications</small>';
							htmlContent += '</a></li>';

							
							dropdownMenu.html(htmlContent);

							
							if (typeof lucide !== 'undefined') {
								lucide.createIcons();
							}
						},
						error: function(xhr, status, err) {
							console.error("Failed to load notifications:", err);
							var dropdownMenu = $(".dropdown-menu");
							dropdownMenu.html(
								'<li><a class="dropdown-item text-danger" href="#">Error loading notifications</a></li>' +
								'<li><hr class="dropdown-divider"></li>' +
								'<li><a class="dropdown-item text-center py-2" href="#">' +
								'<small class="text-primary fw-medium">View all notifications</small></a></li>'
							);
						}
					});
				}


				function handleLandingPageNavigation(){
					  const pageUrl = "/stratroom/login"
					  window.location.href = pageUrl;
				}
			</script>

			 
            <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
			<script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
			<script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
			<script src="${contextroot}/js/mustache.min.js"></script>
			<script type="text/javascript" src="${contextroot}/js/stratroom.js"></script>
			<script type="text/javascript" src="${contextroot}/js/jquery/jquery.validate.min.js"></script>