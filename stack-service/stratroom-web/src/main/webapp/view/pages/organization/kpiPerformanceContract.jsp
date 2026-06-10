<!DOCTYPE html>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
  <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <c:set var="contextroot" value="${pageContext.request.contextPath}" />

    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>StratRoom</title>
    </head>

    <style>
      .btn-generatePdf {
        margin: 2px;
        height: 24px;
        width: 24px;
        padding: 0;
        border: none;
      }
    </style>

    <script type="text/javascript" src="${contextroot}/js/jquery.min.js"></script>

    <body class="light">
      <input type="hidden" id="userrolename" value="${principal.profile.userRoleName}" />

      <div style="display: none">
        <jsp:include page="../common/right-navigation.jsp"></jsp:include>
      </div>

      <jsp:include page="../common/top-navigation.jsp"></jsp:include>
      <header id="header" class="header shadow-sm">
        <jsp:include page="../common/left-navigation.jsp"></jsp:include>
      </header>
      <!--#END View -->
      <main class="pt-2 pb-2">
        <div class="container-lg">
          <div class="page-header grid gap-2 pb-1">
            <div class="g-col-8 d-flex align-items-center">
              <h4 class="title">
                <span class="icon">
                  <img src="/stratroom/images/audit-trail-i.svg" alt="control-panel" title="control-panel" width="18"
                    height="18" />
                </span>
                <span data-translate="title">Performance Contract</span>
              </h4>
            </div>

            <div class="load-page page-actions g-col-4">
              <div class="d-flex">

                <!-- <select id="myTeam" class="form-select form-select-sm">
                <option value="" selected disabled>Select My Team</option>
                <option value="team1">Design Team</option>
                <option value="team2">Development Team</option>
                <option value="team3">QA Team</option>
                <option value="team4">HR Team</option>
                <option value="team5">Management</option>
              </select> -->
                <select id="department_selectdw" class="dept_select form-select form-select-sm" style="width: 100%;"
                  onchange="onDepartmentChange(this.value)">
                  <option value="">Select Department</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="container-lg py-2">
          <div class="card custom-card">
            <div class="card-header">
              <div class="c-header-left">
                <h5 class="card-title">
                  <strong editable="true" contenteditable="true" data-translate="title"
                    onkeypress="return (this.innerText.length <= 36)">Performance Contract</strong>
                </h5>
              </div>
              <div class="card-actions">
                <button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#employee-performance-modal">
                  <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Empoyee perfomence">
                    <i data-lucide="user-check" width="16" height="16"></i>
                  </span>
                </button>
              </div>
            </div>

            <div class="card-body p-3">
              <div class="grid">
                <div class="g-col-12 g-col-xl-3 g-col-md-4">
                  <div class="d-flex flex-column justify-content-center text-center gap-2 p-3 bg-primary rounded mb-3"
                    style="--stratroom-bg-opacity:0.1">


                    <div class="user-card flex-column gap-2 justify-content-center">
                      <div class="user-image user-image-lg">
                        <!-- <img src="assets/images/user/user7.jpg" alt="George" width="48" height="48"> -->
                        <span class="img-initial rounded-circle">CH</span>
                      </div>
                      <div class="user-text d-flex flex-column">
                        <h6 class="text-heading text-truncate"> Chris Hemsworth</h6>
                        <small>Chairman Board of Directors</small>
                      </div>
                    </div>


                  </div>
                  <div>
                    <div class="mb-3">

                      <div class="grid gap-0 grid-from-box">
                        <div class="form-group g-col-12 p-2">
                          <h6 class="mb-2">Performance Ratings</h6>
                          <ul class="mb-0 list-unstyled small d-flex flex-column gap-1">
                            <li><strong class="text-success">3 = Good</strong> (Overall performance consistently meets
                              requirements in essential job areas)</li>
                            <li><strong class="text-warning">2 = Fair</strong> (Overall performance needs improvement in
                              essential job areas)</li>
                            <li><strong class="text-danger">1 = Poor</strong> (Overall performance is regularly
                              unacceptable
                              in one or more essential job areas)</li>
                          </ul>
                        </div>




                      </div>
                    </div>
                    <div class="mb-3">
                      <h6 class="mb-2">Overall Performance</h6>
                      <table class="table table-bordered table-striped text-center align-middle">
                        <thead class="table-dark">
                          <tr>
                            <th>Category</th>
                            <th>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>SI Score</td>
                            <td id="siScoreTotal"></td>
                          </tr>
                          <tr>
                            <td>RI Score</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>LMC Score</td>
                            <td id="LMCScore">0</td>
                          </tr>
                          <tr>
                            <td>BC Score</td>
                            <td id="BCScore">0</td>
                          </tr>
                          <tr>
                            <td>PDP Score</td>
                            <td>0</td>
                          </tr>
                          <!-- <tr class="fw-bold">
                                <td>Total</td>
                                <td>100%</td>
                            </tr> -->
                        </tbody>
                      </table>
                    </div>


                    <div class="mb-3">

                      <div class="grid gap-0 grid-from-box">
                        <div class="form-group g-col-12 p-2">
                          <h6 class="mb-2">Document Structure</h6>
                          <ul class="mb-0 list-unstyled small d-flex flex-column gap-1">
                            <li>
                              <strong class="text-primary">Section I - Strategic Initiatives:</strong>
                              Activities undertaken by the employee under strategic initiatives.
                            </li>
                            <li>
                              <strong class="text-primary">Section II - Routine Initiatives:</strong>
                              Activities undertaken by the employee as part of routine responsibilities.
                            </li>
                            <li>
                              <strong class="text-primary">Section III - Leadership and Management
                                Capabilities:</strong>
                              Employee leadership and management capabilities in delivering divisional and Authority
                              objectives.
                            </li>
                            <li>
                              <strong class="text-primary">Section IV Behavioural Capabilities:</strong>
                              Corporate values and behaviours demonstrated in day-to-day activities.
                            </li>
                            <li>
                              <strong class="text-primary">Section V - Personal Development Plan:</strong>
                              Employee development needs based on performance gaps or job requirements identified by the
                              Line Manager.
                            </li>
                          </ul>
                        </div>




                      </div>
                    </div>








                  </div>

                  <!-- <div class="d-flex flex-column gap-4 p-3 rounded border">
                        <div class="user-card ">
                          <div class="user-image user-active">
                            <img src="assets/images/user/usrbig1.jpg" alt="Chris" width="32" height="32">
                          </div>
                          <div class="user-text d-flex flex-column">
                            <h6 class="text-heading text-truncate">Chris</h6>
                            <small>Chris@demo.com</small>
                          </div>
                        </div>
                        <div class="performance-ratings">
                          <h6>Performance Ratings</h6>
                          <ul class="mb-0 list-unstyled small">
                            <li><strong class="text-success">3 = Good</strong> (Overall performance consistently meets
                              requirements in essential job areas)</li>
                            <li><strong class="text-warning">2 = Fair</strong> (Overall performance needs improvement in
                              essential job areas)</li>
                            <li><strong class="text-danger">1 = Poor</strong> (Overall performance is regularly unacceptable
                              in one or more essential job areas)</li>
                          </ul>
                        </div>
                      </div> -->
                </div>
                <div class="g-col-12 g-col-xl-9 g-col-md-8 grid gap-3">
                  <div class="g-col-6">
                    <div class="form-group">
                      <label for="inputState" data-translate="Scorecard">Scorecard</label>
                      <select id="inputState" class="form-select persp_status" onchange="scoreCardChange()">
                        <option selected disabled>Select Scorecard</option>
                        <!-- Options will be populated dynamically -->

                      </select>
                    </div>


                    <!-- <div class="form-group">
                          <label for="inputState">Scorecard</label>
                          <select id="inputState" class="form-select persp_status">
                            <option value="" data-i18n="Select Scorecard">Select Scorecard</option>
                            <option value="3006">St_ Annes_Mission_Hospital_Balanced_Scorecard</option>
                            <option value="3005">Ok_Zimbabwe_ Store_Balanced_Scorecard</option>
                            <option value="3004" selected>OK_Zimbabwe_Balanced_Scorecard</option>
                            <option value="3003">Bank Scorecard</option>
                            <option value="3002">ENPC Scorecard</option>
                            <option value="3001">CSO Scorecard</option>
                            <option value="3000">CEO OKR Scorecard</option>
                            <option value="2998">Chief Sustainability Officer Scorecard</option>
                            <option value="2997">CRO Scorecard</option>
                            <option value="2949">BOD Scorecard</option>
                          </select>
                        </div> -->
                  </div>
                  <div class="g-col-12 g-col-md-6">
                    <div class="form-group d-flex flex-wrap gap-2">
                      <label class="form-label d-block" data-translate="general.Site Language">Select <span
                          class="text-danger">*</span></label>

                      <div class="form-check">
                        <input class="form-check-input lang-checkbox" type="checkbox" value="kpi" id="kpi">
                        <label class="form-check-label" for="kpi">Kpi</label>
                      </div>

                      <div class="form-check">
                        <input class="form-check-input lang-checkbox" type="checkbox" value="subKpi" id="subKpi">
                        <label class="form-check-label" for="subKpi">Sub Kpi</label>
                      </div>




                    </div>
                  </div>
                  <div class="g-col-12" style="height: 600px;overflow: auto;">

                    <div id="kpi_performance_table" class="questionnaire-block-grid size-300"></div>
                  </div>
                  <div class="g-col-12">
                    <div id="kpi_performance_table_total"
                      class="kpi-performance-header d-flex gap-3 flex-wrap align-items-center">
                    </div>
                  </div>
                  <div class="g-col-12">
                    <div class="form-group">
                      <label for="Comments" data-i18n="Comments">Comments</label>
                      <textarea class="form-control comments" id="comments"></textarea>
                    </div>
                  </div>
                  <div class="g-col-12">
                    <div class="form-group">
                      <label for="" class="form-label">Upload File</label>
                      <label for="uploadBox" class="upload-label upload-box">
                        <div class="upload">Choose a file or drag it here.</div>
                        <input type="file" class="file-input" id="uploadBox"
                          accept=".doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png">
                      </label>
                      <div class="upload-preview row g-3"></div>
                    </div>
                  </div>
                  <div class="g-col-12 pt-3">
                    <div class="form-line right">
                      <button type="button" class="btn btn-label-primary" data-dismiss="modal" aria-label="Close"
                        onclick="saveKpiPerformance()">
                        Submit
                      </button>
                      <!-- <button class="btn btn-primary" value="Save">
                            Save
                          </button> -->
                    </div>
                  </div>
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

      <!--#START Task Add -->
      <div id="employee-performance-modal" class="modal custom-modal fade" data-bs-backdrop="static"
        data-bs-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="employeePperformanceLabel"
        aria-hidden="true">
        <div
          class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="employeePperformanceLabel">Employee Performance</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-3">
              <div class="grid gap-3">
                <div class="g-col-12 grid gap-3">
                  <div class="g-col-12">
                    <div class="questionnaire-blocktop">
                      <div class="form-group">
                        <label for="LMC" data-i18n="LMC" class="form-label">Leadership And Management
                          Capabilities</label>
                      </div>
                      <div class="table-responsive">
                        <table id="lmcTable" class="table table-bordered w-100 ">
                          <thead class="table-light text-center align-middle">
                            <tr>
                              <th rowspan="2" style="min-width: 180px;">Key Performance Area</th>
                              <th rowspan="2" style="min-width: 200px;">Operational Goal</th>
                              <th rowspan="2" style="min-width: 180px;">Key Activity</th>
                              <th rowspan="2" style="min-width: 160px;">Outputs</th>
                              <th rowspan="2" style="min-width: 200px;">Target Date &amp; Standard</th>
                              <th colspan="3" style="min-width: 200px;">Score</th>
                            </tr>
                            <tr>
                              <th>Self</th>
                              <th>Manager</th>
                              <th>Consensual</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <td rowspan="5"><strong>PERFORMANCE<br>MANAGEMENT</strong></td>
                              <td>Achieve 100% development of the Divisional Workplan</td>
                              <td>Develop Divisional Workplan</td>
                              <td>Divisional Work Plan</td>
                              <td rowspan="2">On 20 April 2023, in line with Strategic Management Framework</td>
                              <td rowspan="2">
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-1-self-1" name="lmc-1-self"
                                      value="1">
                                    <label class="form-check-label" for="lmc-1-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-1-self-2" name="lmc-1-self"
                                      value="2">
                                    <label class="form-check-label" for="lmc-1-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-1-self-3" name="lmc-1-self"
                                      value="3">
                                    <label class="form-check-label" for="lmc-1-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td rowspan="2">
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-1-manager-1"
                                      name="kpi-1-manager" value="1">
                                    <label class="form-check-label" for="kpi-1-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-1-manager-2"
                                      name="kpi-1-manager" value="2">
                                    <label class="form-check-label" for="kpi-1-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-1-manager-3"
                                      name="kpi-1-manager" value="3">
                                    <label class="form-check-label" for="kpi-1-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td rowspan="2">
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-1-consensual-1"
                                      name="kpi-1-consensual" value="1">
                                    <label class="form-check-label" for="kpi-1-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-1-consensual-2"
                                      name="kpi-1-consensual" value="2">
                                    <label class="form-check-label" for="kpi-1-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-1-consensual-3"
                                      name="kpi-1-consensual" value="3">
                                    <label class="form-check-label" for="kpi-1-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>Achieve 100% implementation of the Divisional Workplan</td>
                              <td>Monitor implementation of the Divisional Workplan</td>
                              <td>Divisional Workplan implemented</td>
                            </tr>

                            <tr>
                              <td>Achieve 100% compliance to reporting framework</td>
                              <td>Prepare Divisional Performance Report</td>
                              <td>Divisional Performance Report</td>
                              <td>On the 5th of the month
                                following end of a
                                quarter, In line with the
                                Authority Reporting
                                Framework </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-2-self-1" name="lmc-2-self"
                                      value="1">
                                    <label class="form-check-label" for="lmc-2-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-2-self-2" name="lmc-2-self"
                                      value="2">
                                    <label class="form-check-label" for="lmc-2-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-2-self-3" name="lmc-2-self"
                                      value="3">
                                    <label class="form-check-label" for="lmc-2-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-2-manager-1"
                                      name="kpi-2-manager" value="1">
                                    <label class="form-check-label" for="kpi-2-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-2-manager-2"
                                      name="kpi-2-manager" value="2">
                                    <label class="form-check-label" for="kpi-2-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-2-manager-3"
                                      name="kpi-2-manager" value="3">
                                    <label class="form-check-label" for="kpi-2-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-2-consensual-1"
                                      name="kpi-2-consensual" value="1">
                                    <label class="form-check-label" for="kpi-2-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-2-consensual-2"
                                      name="kpi-2-consensual" value="2">
                                    <label class="form-check-label" for="kpi-2-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-2-consensual-3"
                                      name="kpi-2-consensual" value="3">
                                    <label class="form-check-label" for="kpi-2-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td rowspan="2">Achieve 100% compliance to performance management system</td>
                              <td rowspan="2">Ensure development and assessment of performance agreements</td>
                              <td>Performance Agreements in place</td>
                              <td>In line with Authority Performance Management System</td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-3-self-1" name="lmc-3-self"
                                      value="1">
                                    <label class="form-check-label" for="lmc-3-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-3-self-2" name="lmc-3-self"
                                      value="2">
                                    <label class="form-check-label" for="lmc-3-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-3-self-3" name="lmc-3-self"
                                      value="3">
                                    <label class="form-check-label" for="lmc-3-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-3-manager-1"
                                      name="kpi-3-manager" value="1">
                                    <label class="form-check-label" for="kpi-3-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-3-manager-2"
                                      name="kpi-3-manager" value="2">
                                    <label class="form-check-label" for="kpi-3-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-3-manager-3"
                                      name="kpi-3-manager" value="3">
                                    <label class="form-check-label" for="kpi-3-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-3-consensual-1"
                                      name="kpi-3-consensual" value="1">
                                    <label class="form-check-label" for="kpi-3-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-3-consensual-2"
                                      name="kpi-3-consensual" value="2">
                                    <label class="form-check-label" for="kpi-3-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-3-consensual-3"
                                      name="kpi-3-consensual" value="3">
                                    <label class="form-check-label" for="kpi-3-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>Performance Assessments conducted </td>
                              <td>In line with the Authority PerformanceManagement System</td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-4-self-1" name="lmc-4-self-1"
                                      value="1">
                                    <label class="form-check-label" for="lmc-4-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-4-self-2" name="lmc-4-self-1"
                                      value="2">
                                    <label class="form-check-label" for="lmc-4-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-4-self-3" name="lmc-4-self-1"
                                      value="3">
                                    <label class="form-check-label" for="lmc-4-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-4-manager-1"
                                      name="kpi-4-manager" value="1">
                                    <label class="form-check-label" for="kpi-4-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-4-manager-2"
                                      name="kpi-4-manager" value="2">
                                    <label class="form-check-label" for="kpi-4-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-4-manager-3"
                                      name="kpi-4-manager" value="3">
                                    <label class="form-check-label" for="kpi-4-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-4-consensual-1"
                                      name="kpi-4-consensual" value="1">
                                    <label class="form-check-label" for="kpi-4-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-4-consensual-2"
                                      name="kpi-4-consensual" value="2">
                                    <label class="form-check-label" for="kpi-4-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-4-consensual-3"
                                      name="kpi-4-consensual" value="3">
                                    <label class="form-check-label" for="kpi-4-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <!-- PEOPLE MANAGEMENT & EMPOWERMENT -->
                            <tr>
                              <td rowspan="2"><strong>PEOPLE MANAGEMENT<br>&amp; EMPOWERMENT</strong></td>
                              <td>Achieve 100% development of Coaching and Mentorship Plan</td>
                              <td>Develop Divisional Coaching and Mentorship Plan</td>
                              <td rowspan="2">Annual Divisional Coaching and Mentorship Plan </td>
                              <td rowspan="2">In line with Human Resource Rules</td>
                              <td rowspan="2">
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-5-self-1" name="lmc-5-self-1"
                                      value="1">
                                    <label class="form-check-label" for="lmc-5-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-5-self-2" name="lmc-5-self-1"
                                      value="2">
                                    <label class="form-check-label" for="lmc-5-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-5-self-3" name="lmc-5-self-1"
                                      value="3">
                                    <label class="form-check-label" for="lmc-5-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td rowspan="2">
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-5-manager-1"
                                      name="kpi-5-manager" value="1">
                                    <label class="form-check-label" for="kpi-5-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-5-manager-2"
                                      name="kpi-5-manager" value="2">
                                    <label class="form-check-label" for="kpi-5-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-5-manager-3"
                                      name="kpi-5-manager" value="3">
                                    <label class="form-check-label" for="kpi-5-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td rowspan="2">
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-5-consensual-1"
                                      name="kpi-5-consensual" value="1">
                                    <label class="form-check-label" for="kpi-5-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-5-consensual-2"
                                      name="kpi-5-consensual" value="2">
                                    <label class="form-check-label" for="kpi-5-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-5-consensual-3"
                                      name="kpi-5-consensual" value="3">
                                    <label class="form-check-label" for="kpi-5-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>Achieve 100% implementation of Coaching and Mentorship Plan</td>
                              <td>Implement Divisional Coaching and Mentorship Plan</td>


                            </tr>

                            <!-- FINANCIAL MANAGEMENT -->
                            <tr>
                              <td rowspan="2"><strong>FINANCIAL<br>MANAGEMENT</strong></td>
                              <td>Achieve 85% absorption capacity (budget variance)</td>
                              <td>Implement Divisional Budget</td>
                              <td>Divisional Budget Variance Report</td>
                              <td rowspan="2">On the 5th of the month following end of the quarter, In line with the LCA
                                Financial Rules
                              </td>
                              <td rowspan="2">
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-6-self-1" name="lmc-6-self-1"
                                      value="1">
                                    <label class="form-check-label" for="lmc-6-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-6-self-2" name="lmc-6-self-1"
                                      value="2">
                                    <label class="form-check-label" for="lmc-6-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="lmc-6-self-3" name="lmc-6-self-1"
                                      value="3">
                                    <label class="form-check-label" for="lmc-6-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td rowspan="2">
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-6-manager-1"
                                      name="kpi-6-manager" value="1">
                                    <label class="form-check-label" for="kpi-6-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-6-manager-2"
                                      name="kpi-6-manager" value="2">
                                    <label class="form-check-label" for="kpi-6-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-6-manager-3"
                                      name="kpi-6-manager" value="3">
                                    <label class="form-check-label" for="kpi-6-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td rowspan="2">
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-7-consensual-1"
                                      name="kpi-7-consensual" value="1">
                                    <label class="form-check-label" for="kpi-7-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-7-consensual-2"
                                      name="kpi-7-consensual" value="2">
                                    <label class="form-check-label" for="kpi-7-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="kpi-7-consensual-3"
                                      name="kpi-7-consensual" value="3">
                                    <label class="form-check-label" for="kpi-7-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>Achieve 99% compliance to procurement requirements</td>
                              <td>Monitor divisional budget</td>
                              <td>Divisional Compliance Procurement Report</td>



                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div class="g-col-12">
                    <div class="questionnaire-blocktop">
                      <div class="form-group">
                        <label for="BC" data-i18n="BC" class="form-label">Behavioural Capabilities</label>
                      </div>
                      <div class="table-responsive">
                        <table id="bcTable" class="table table-bordered w-100 ">
                          <thead class="table-light text-center align-middle">
                            <tr>
                              <th rowspan="2" style="min-width: 180px;">Corporating Values</th>
                              <th rowspan="2" style="min-width: 200px;">Category</th>
                              <th rowspan="2" style="min-width: 180px;">Expected Behaviours </th>

                              <th colspan="3" style="min-width: 200px;">Score</th>
                            </tr>
                            <tr>
                              <th>Self</th>
                              <th>Manager</th>
                              <th>Consensual</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <td rowspan="8"><strong>CARE:</strong> We care for our employees, consumers and service
                                providers</td>
                              <td rowspan="5">People -oriented </td>
                              <td>Good Communicator, able to communicate with clarity when working with colleagues</td>

                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-1-self-1" name="bc-1-self"
                                      value="1">
                                    <label class="form-check-label" for="bc-1-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-1-self-2" name="bc-1-self"
                                      value="2">
                                    <label class="form-check-label" for="bc-1-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-1-self-3" name="bc-1-self"
                                      value="3">
                                    <label class="form-check-label" for="bc-1-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-1-manager-1" name="bc-1-manager"
                                      value="1">
                                    <label class="form-check-label" for="bc-1-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-1-manager-2" name="bc-1-manager"
                                      value="2">
                                    <label class="form-check-label" for="bc-1-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-1-manager-3" name="bc-1-manager"
                                      value="3">
                                    <label class="form-check-label" for="bc-1-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-1-consensual-1"
                                      name="bc-1-consensual" value="1">
                                    <label class="form-check-label" for="bc-1-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-1-consensual-2"
                                      name="bc-1-consensual" value="2">
                                    <label class="form-check-label" for="bc-1-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-1-consensual-3"
                                      name="bc-1-consensual" value="3">
                                    <label class="form-check-label" for="bc-1-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Listening actively to other's concerns and ideas</td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-2-self-1" name="bc-2-self"
                                      value="1">
                                    <label class="form-check-label" for="bc-2-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-2-self-2" name="bc-2-self"
                                      value="2">
                                    <label class="form-check-label" for="bc-2-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-2-self-3" name="bc-2-self"
                                      value="3">
                                    <label class="form-check-label" for="bc-2-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-2-manager-1" name="bc-2-manager"
                                      value="1">
                                    <label class="form-check-label" for="bc-2-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-2-manager-2" name="bc-2-manager"
                                      value="2">
                                    <label class="form-check-label" for="bc-2-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-2-manager-3" name="bc-2-manager"
                                      value="3">
                                    <label class="form-check-label" for="bc-2-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-2-consensual-1"
                                      name="bc-2-consensual" value="1">
                                    <label class="form-check-label" for="bc-2-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-2-consensual-2"
                                      name="bc-2-consensual" value="2">
                                    <label class="form-check-label" for="bc-2-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-2-consensual-3"
                                      name="bc-2-consensual" value="3">
                                    <label class="form-check-label" for="bc-2-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Patience, able to keep a level head in stressful situations</td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-3-self-1" name="bc-3-self-1"
                                      value="1">
                                    <label class="form-check-label" for="bc-3-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-3-self-2" name="bc-3-self-1"
                                      value="2">
                                    <label class="form-check-label" for="bc-3-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-3-self-3" name="bc-3-self-1"
                                      value="3">
                                    <label class="form-check-label" for="bc-3-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-3-manager-1" name="bc-3-manager"
                                      value="1">
                                    <label class="form-check-label" for="bc-3-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-3-manager-2" name="bc-3-manager"
                                      value="2">
                                    <label class="form-check-label" for="bc-3-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-3-manager-3" name="bc-3-manager"
                                      value="3">
                                    <label class="form-check-label" for="bc-3-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-3-consensual-1"
                                      name="bc-3-consensual" value="1">
                                    <label class="form-check-label" for="bc-3-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-3-consensual-2"
                                      name="bc-3-consensual" value="2">
                                    <label class="form-check-label" for="bc-3-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-3-consensual-3"
                                      name="bc-3-consensual" value="3">
                                    <label class="form-check-label" for="bc-3-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Provides feedback timeously </td>

                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-4-self-1" name="bc-4-self-1"
                                      value="1">
                                    <label class="form-check-label" for="bc-4-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-4-self-2" name="bc-4-self-1"
                                      value="2">
                                    <label class="form-check-label" for="bc-4-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-4-self-3" name="bc-4-self-1"
                                      value="3">
                                    <label class="form-check-label" for="bc-4-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-4-manager-1" name="bc-4-manager"
                                      value="1">
                                    <label class="form-check-label" for="bc-4-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-4-manager-2" name="bc-4-manager"
                                      value="2">
                                    <label class="form-check-label" for="bc-4-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-4-manager-3" name="bc-4-manager"
                                      value="3">
                                    <label class="form-check-label" for="bc-4-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-4-consensual-1"
                                      name="bc-4-consensual" value="1">
                                    <label class="form-check-label" for="bc-4-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-4-consensual-2"
                                      name="bc-4-consensual" value="2">
                                    <label class="form-check-label" for="bc-4-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-4-consensual-3"
                                      name="bc-4-consensual" value="3">
                                    <label class="form-check-label" for="bc-4-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Flexibility, understanding that there are multiple ways to complete a task </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-5-self-1" name="bc-5-self-1"
                                      value="1">
                                    <label class="form-check-label" for="bc-5-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-5-self-2" name="bc-5-self-1"
                                      value="2">
                                    <label class="form-check-label" for="bc-5-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-5-self-3" name="bc-5-self-1"
                                      value="3">
                                    <label class="form-check-label" for="bc-5-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-5-manager-1" name="bc-5-manager"
                                      value="1">
                                    <label class="form-check-label" for="bc-5-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-5-manager-2" name="bc-5-manager"
                                      value="2">
                                    <label class="form-check-label" for="bc-5-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-5-manager-3" name="bc-5-manager"
                                      value="3">
                                    <label class="form-check-label" for="bc-5-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-5-consensual-1"
                                      name="bc-5-consensual" value="1">
                                    <label class="form-check-label" for="bc-5-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-5-consensual-2"
                                      name="bc-5-consensual" value="2">
                                    <label class="form-check-label" for="bc-5-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-5-consensual-3"
                                      name="bc-5-consensual" value="3">
                                    <label class="form-check-label" for="bc-5-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td rowspan="3">Service oriented and customer care </td>
                              <td>Emotional intelligence, able to relate to anybody, especially frustrated clients or
                                employees and intuitively understand them and communicate with empathy</td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-6-self-1" name="bc-6-self-1"
                                      value="1">
                                    <label class="form-check-label" for="bc-6-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-6-self-2" name="bc-6-self-1"
                                      value="2">
                                    <label class="form-check-label" for="bc-6-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-6-self-3" name="bc-6-self-1"
                                      value="3">
                                    <label class="form-check-label" for="bc-6-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-6-manager-1" name="bc-6-manager"
                                      value="1">
                                    <label class="form-check-label" for="bc-6-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-6-manager-2" name="bc-6-manager"
                                      value="2">
                                    <label class="form-check-label" for="bc-6-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-6-manager-3" name="bc-6-manager"
                                      value="3">
                                    <label class="form-check-label" for="bc-6-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-6-consensual-1"
                                      name="bc-6-consensual" value="1">
                                    <label class="form-check-label" for="bc-6-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-6-consensual-2"
                                      name="bc-6-consensual" value="2">
                                    <label class="form-check-label" for="bc-6-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-6-consensual-3"
                                      name="bc-6-consensual" value="3">
                                    <label class="form-check-label" for="bc-6-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Good communicator, able to communicate with clarity when working with customers</td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-7-self-1" name="bc-7-self-1"
                                      value="1">
                                    <label class="form-check-label" for="bc-7-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-7-self-2" name="bc-7-self-1"
                                      value="2">
                                    <label class="form-check-label" for="bc-7-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-7-self-3" name="bc-7-self-1"
                                      value="3">
                                    <label class="form-check-label" for="bc-7-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-7-manager-1" name="bc-7-manager"
                                      value="1">
                                    <label class="form-check-label" for="bc-7-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-7-manager-2" name="bc-7-manager"
                                      value="2">
                                    <label class="form-check-label" for="bc-7-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-7-manager-3" name="bc-7-manager"
                                      value="3">
                                    <label class="form-check-label" for="bc-7-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-7-consensual-1"
                                      name="bc-7-consensual" value="1">
                                    <label class="form-check-label" for="bc-7-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-7-consensual-2"
                                      name="bc-7-consensual" value="2">
                                    <label class="form-check-label" for="bc-7-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-7-consensual-3"
                                      name="bc-7-consensual" value="3">
                                    <label class="form-check-label" for="bc-7-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Ability to intuit not just what went wrong, but also what action the customer was
                                ultimately after and offer pre-emptive advice or a solution that the customer doesn’t
                                even realize is an option</td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-8-self-1" name="bc-8-self-1"
                                      value="1">
                                    <label class="form-check-label" for="bc-8-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-8-self-2" name="bc-8-self-1"
                                      value="2">
                                    <label class="form-check-label" for="bc-8-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-8-self-3" name="bc-8-self-1"
                                      value="3">
                                    <label class="form-check-label" for="bc-8-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-8-manager-1" name="bc-8-manager"
                                      value="1">
                                    <label class="form-check-label" for="bc-8-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-8-manager-2" name="bc-8-manager"
                                      value="2">
                                    <label class="form-check-label" for="bc-8-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-8-manager-3" name="bc-8-manager"
                                      value="3">
                                    <label class="form-check-label" for="bc-8-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-8-consensual-1"
                                      name="bc-8-consensual" value="1">
                                    <label class="form-check-label" for="bc-8-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-8-consensual-2"
                                      name="bc-8-consensual" value="2">
                                    <label class="form-check-label" for="bc-8-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-8-consensual-3"
                                      name="bc-8-consensual" value="3">
                                    <label class="form-check-label" for="bc-8-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <!-- COLLABORATIVE -->

                            <tr>
                              <td rowspan="5"><strong>COLLABORATIVE:</strong> We will be collaborating with our
                                stakeholders and key strategic partners for success</td>
                              <td rowspan="5"></td>
                              <td>Good Communicator, able to communicate with clarity</td>

                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-9-self-1" name="bc-9-self-1"
                                      value="1">
                                    <label class="form-check-label" for="bc-9-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-9-self-2" name="bc-9-self-1"
                                      value="2">
                                    <label class="form-check-label" for="bc-9-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-9-self-3" name="bc-9-self-1"
                                      value="3">
                                    <label class="form-check-label" for="bc-9-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-9-manager-1" name="bc-9-manager"
                                      value="1">
                                    <label class="form-check-label" for="bc-9-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-9-manager-2" name="bc-9-manager"
                                      value="2">
                                    <label class="form-check-label" for="bc-9-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-9-manager-3" name="bc-9-manager"
                                      value="3">
                                    <label class="form-check-label" for="bc-9-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-9-consensual-1"
                                      name="bc-9-consensual" value="1">
                                    <label class="form-check-label" for="bc-9-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-9-consensual-2"
                                      name="bc-9-consensual" value="2">
                                    <label class="form-check-label" for="bc-9-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-9-consensual-3"
                                      name="bc-9-consensual" value="3">
                                    <label class="form-check-label" for="bc-9-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>Setting realistic expectations</td>

                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-10-self-1" name="bc-10-self-1"
                                      value="1">
                                    <label class="form-check-label" for="bc-10-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-10-self-2" name="bc-10-self-1"
                                      value="2">
                                    <label class="form-check-label" for="bc-10-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-10-self-3" name="bc-10-self-1"
                                      value="3">
                                    <label class="form-check-label" for="bc-10-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-10-manager-1"
                                      name="bc-10-manager" value="1">
                                    <label class="form-check-label" for="bc-10-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-10-manager-2"
                                      name="bc-10-manager" value="2">
                                    <label class="form-check-label" for="bc-10-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-10-manager-3"
                                      name="bc-10-manager" value="3">
                                    <label class="form-check-label" for="bc-10-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-10-consensual-1"
                                      name="bc-10-consensual" value="1">
                                    <label class="form-check-label" for="bc-10-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-10-consensual-2"
                                      name="bc-10-consensual" value="2">
                                    <label class="form-check-label" for="bc-10-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-10-consensual-3"
                                      name="bc-10-consensual" value="3">
                                    <label class="form-check-label" for="bc-10-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>Listening actively to other's concerns and ideas</td>

                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-11-self-1" name="bc-11-self-1"
                                      value="1">
                                    <label class="form-check-label" for="bc-11-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-11-self-2" name="bc-11-self-1"
                                      value="2">
                                    <label class="form-check-label" for="bc-11-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-11-self-3" name="bc-11-self-1"
                                      value="3">
                                    <label class="form-check-label" for="bc-11-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-11-manager-1"
                                      name="bc-11-manager" value="1">
                                    <label class="form-check-label" for="bc-11-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-11-manager-2"
                                      name="bc-11-manager" value="2">
                                    <label class="form-check-label" for="bc-11-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-11-manager-3"
                                      name="bc-11-manager" value="3">
                                    <label class="form-check-label" for="bc-11-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-11-consensual-1"
                                      name="bc-11-consensual" value="1">
                                    <label class="form-check-label" for="bc-11-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-11-consensual-2"
                                      name="bc-11-consensual" value="2">
                                    <label class="form-check-label" for="bc-11-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-11-consensual-3"
                                      name="bc-11-consensual" value="3">
                                    <label class="form-check-label" for="bc-11-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>Accountability, taking responsibility for own work and the work of your employees</td>

                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-12-self-1" name="bc-12-self-1"
                                      value="1">
                                    <label class="form-check-label" for="bc-12-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-12-self-2" name="bc-12-self-1"
                                      value="2">
                                    <label class="form-check-label" for="bc-12-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-12-self-3" name="bc-12-self-1"
                                      value="3">
                                    <label class="form-check-label" for="bc-12-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-12-manager-1"
                                      name="bc-12-manager" value="1">
                                    <label class="form-check-label" for="bc-12-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-12-manager-2"
                                      name="bc-12-manager" value="2">
                                    <label class="form-check-label" for="bc-12-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-12-manager-3"
                                      name="bc-12-manager" value="3">
                                    <label class="form-check-label" for="bc-12-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-12-consensual-1"
                                      name="bc-12-consensual" value="1">
                                    <label class="form-check-label" for="bc-12-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-12-consensual-2"
                                      name="bc-12-consensual" value="2">
                                    <label class="form-check-label" for="bc-12-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-12-consensual-3"
                                      name="bc-12-consensual" value="3">
                                    <label class="form-check-label" for="bc-12-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>Embraces change, ability to adjust quickly to changing circumstances</td>

                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-13-self-1" name="bc-13-self-1"
                                      value="1">
                                    <label class="form-check-label" for="bc-13-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-13-self-2" name="bc-13-self-1"
                                      value="2">
                                    <label class="form-check-label" for="bc-13-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-13-self-3" name="bc-13-self-1"
                                      value="3">
                                    <label class="form-check-label" for="bc-13-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-13-manager-1"
                                      name="bc-13-manager" value="1">
                                    <label class="form-check-label" for="bc-13-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-13-manager-2"
                                      name="bc-13-manager" value="2">
                                    <label class="form-check-label" for="bc-13-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-13-manager-3"
                                      name="bc-13-manager" value="3">
                                    <label class="form-check-label" for="bc-13-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-13-consensual-1"
                                      name="bc-13-consensual" value="1">
                                    <label class="form-check-label" for="bc-13-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-13-consensual-2"
                                      name="bc-13-consensual" value="2">
                                    <label class="form-check-label" for="bc-13-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-13-consensual-3"
                                      name="bc-13-consensual" value="3">
                                    <label class="form-check-label" for="bc-13-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>


                            <!-- Creativity -->

                            <tr>
                              <td rowspan="4"><strong>CREATIVITY:</strong> Our operations will be driven by creativity
                              </td>
                              <td rowspan="4"></td>
                              <td>Willing to take risks and trying new ways of doing things that improve efficiency in
                                the workplace and can easily be used on a daily basis at work. </td>

                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-14-self-1" name="bc-14-self-1"
                                      value="1">
                                    <label class="form-check-label" for="bc-14-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-14-self-2" name="bc-14-self-1"
                                      value="2">
                                    <label class="form-check-label" for="bc-14-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-14-self-3" name="bc-14-self-1"
                                      value="3">
                                    <label class="form-check-label" for="bc-14-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-14-manager-1"
                                      name="bc-1-manager" value="1">
                                    <label class="form-check-label" for="bc-1-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-14-manager-2"
                                      name="bc-1-manager" value="2">
                                    <label class="form-check-label" for="bc-14-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-14-manager-3"
                                      name="bc-1-manager" value="3">
                                    <label class="form-check-label" for="bc-14-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-14-consensual-1"
                                      name="bc-14-consensual" value="1">
                                    <label class="form-check-label" for="bc-14-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-14-consensual-2"
                                      name="bc-14-consensual" value="2">
                                    <label class="form-check-label" for="bc-14-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-14-consensual-3"
                                      name="bc-14-consensual" value="3">
                                    <label class="form-check-label" for="bc-14-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>Apply their imagination to everyday scenarios to come up with
                                unique solutions to the challenges they may face at work.
                                Instead of simply accepting ideas, they question them, build on
                                them and apply them to for efficiency in the workplace</td>

                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-15-self-1" name="bc-15-self-1"
                                      value="1">
                                    <label class="form-check-label" for="bc-15-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-15-self-2" name="bc-15-self-1"
                                      value="2">
                                    <label class="form-check-label" for="bc-15-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-15-self-3" name="bc-15-self-1"
                                      value="3">
                                    <label class="form-check-label" for="bc-15-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-15-manager-1"
                                      name="bc-15-manager" value="1">
                                    <label class="form-check-label" for="bc-15-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-15-manager-2"
                                      name="bc-15-manager" value="2">
                                    <label class="form-check-label" for="bc-15-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-15-manager-3"
                                      name="bc-15-manager" value="3">
                                    <label class="form-check-label" for="bc-15-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-15-consensual-1"
                                      name="bc-15-consensual" value="1">
                                    <label class="form-check-label" for="bc-15-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-15-consensual-2"
                                      name="bc-15-consensual" value="2">
                                    <label class="form-check-label" for="bc-15-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-15-consensual-3"
                                      name="bc-15-consensual" value="3">
                                    <label class="form-check-label" for="bc-15-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>Have a strong understanding of the usual processes and
                                practices that govern their workplaces, therefore they can easily
                                recognize when established practices could benefit from
                                improvement. Do not conform without thought and therefore
                                able to have fresh perspective about what is usually accepted as
                                a normal procedure or practice in the workplace, allowing room
                                for continuous improvement.</td>

                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-16-self-1" name="bc-16-self-1"
                                      value="1">
                                    <label class="form-check-label" for="bc-16-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-16-self-2" name="bc-16-self-1"
                                      value="2">
                                    <label class="form-check-label" for="bc-16-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-16-self-3" name="bc-16-self-1"
                                      value="3">
                                    <label class="form-check-label" for="bc-16-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-16-manager-1"
                                      name="bc-16-manager" value="1">
                                    <label class="form-check-label" for="bc-16-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-16-manager-2"
                                      name="bc-16-manager" value="2">
                                    <label class="form-check-label" for="bc-16-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-16-manager-3"
                                      name="bc-16-manager" value="3">
                                    <label class="form-check-label" for="bc-16-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-16-consensual-1"
                                      name="bc-16-consensual" value="1">
                                    <label class="form-check-label" for="bc-16-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-16-consensual-2"
                                      name="bc-16-consensual" value="2">
                                    <label class="form-check-label" for="bc-16-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-16-consensual-3"
                                      name="bc-16-consensual" value="3">
                                    <label class="form-check-label" for="bc-16-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <td>Value preparation and are skilled at thinking about possible
                                solutions to problems from multiple angles. Think of the possible
                                issues they might need to improve their work.</td>

                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-17-self-1" name="bc-17-self-1"
                                      value="1">
                                    <label class="form-check-label" for="bc-17-self-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-17-self-2" name="bc-17-self-1"
                                      value="2">
                                    <label class="form-check-label" for="bc-17-self-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-17-self-3" name="bc-17-self-1"
                                      value="3">
                                    <label class="form-check-label" for="bc-17-self-3"><span>3</span></label>
                                  </div>
                                </div>

                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-17-manager-1"
                                      name="bc-17-manager" value="1">
                                    <label class="form-check-label" for="bc-17-manager-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-17-manager-2"
                                      name="bc-17-manager" value="2">
                                    <label class="form-check-label" for="bc-17-manager-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-17-manager-3"
                                      name="bc-17-manager" value="3">
                                    <label class="form-check-label" for="bc-17-manager-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div class="form-check-group">
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-17-consensual-1"
                                      name="bc-17-consensual" value="1">
                                    <label class="form-check-label" for="bc-17-consensual-1"><span>1</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-17-consensual-2"
                                      name="bc-17-consensual" value="2">
                                    <label class="form-check-label" for="bc-17-consensual-2"><span>2</span></label>
                                  </div>
                                  <div class="form-check">
                                    <input class="form-check-input" type="radio" id="bc-17-consensual-3"
                                      name="bc-17-consensual" value="3">
                                    <label class="form-check-label" for="bc-17-consensual-3"><span>3</span></label>
                                  </div>
                                </div>
                              </td>
                            </tr>

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div class="g-col-12">
                    <div class="questionnaire-blocktop">
                      <div class="form-group">
                        <label for="PDP" data-i18n="PDP" class="form-label">Personal Development Plan</label>
                      </div>
                      <div class="table-responsive">
                        <table id="pdpTable" class="table table-bordered w-100 ">
                          <thead class="table-light text-center align-middle">
                            <tr>
                              <th style="min-width: 80px;max-width: 80px; white-space: normal;">Key Performance Area
                              </th>
                              <th style="min-width: 80px;max-width: 80px; white-space: normal;">Performance Gap
                                Identified</th>
                              <th style="min-width: 180px; max-width: 180px; white-space: normal;">Type Of Training
                                Intervention Needed (Course, Attachment, On-the-job Training Etc.) </th>
                              <th style="min-width: 80px;max-width: 80px; white-space: normal;">Recommended Period For
                                Intervention</th>
                              <th style="min-width: 80px;max-width: 80px; white-space: normal;">Control In The Interim
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <td><input id="pdp_key_area" type="text"
                                  class="form-control form-control-sm impact-input text-center"></td>
                              <td><input id="pdp_gap" type="text"
                                  class="form-control form-control-sm impact-input text-center"></td>
                              <td><input id="pdp_training" type="text"
                                  class="form-control form-control-sm impact-input text-center"></td>
                              <td><input id="pdp_intervention" type="text"
                                  class="form-control form-control-sm impact-input text-center"></td>
                              <td><input id="pdp_control" type="text"
                                  class="form-control form-control-sm impact-input text-center"></td>
                            </tr>


                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div class="g-col-12">
                    <div class="kpi-performance-header d-flex gap-3 flex-wrap align-items-center">
                      <div class="header-col">Total - <span id="totalScoreData">0</span></div>
                      <div class="header-col">Self - <span id="totalselfScore">0</span></div>
                      <div class="header-col">Manager - <span id="totalmanagerScore">0</span></div>
                      <div class="header-col">Consensual - <span id="totalconsensualScore">0</span></div>
                      <div class="header-col">
                        <button class="btn btn-generatePdf" title="Download">
                          <i class="fas fa-file-pdf-o"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="g-col-12">
                    <div class="form-group">
                      <label for="epComments" data-i18n="epComments">Comments</label>
                      <textarea class="form-control comments" id="employeePerformanceComments"></textarea>
                    </div>
                  </div>
                  <div class="g-col-12">
                    <div class="form-group">
                      <label for="" class="form-label">Upload File</label>
                      <label for="uploadBox" class="upload-label upload-box">
                        <div class="upload">Choose a file or drag it here.</div>
                        <input type="file" class="file-input" id="uploadBox"
                          accept=".doc,.docx,.pdf,.xls,.xlsx,.jpg,.jpeg,.png">
                      </label>
                      <div class="upload-preview row g-3"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                Cancel
              </button>
              <button class="btn btn-primary" value="Save" onclick="saveLeadershipManagement()">Save</button>


            </div>
          </div>
        </div>
      </div>
      <!--#END Task Add -->

      <!-- Plugins Js -->
      <link href="assets/css/pickr.min.css" rel="stylesheet" />
      <link href="assets/css/daterangepicker.min.css" rel="stylesheet" />
      <link href="assets/css/jquery-ui.min.css" rel="stylesheet" />
      <link href="assets/css/select2.min.css" rel="stylesheet" />

      <script src="${contextroot}/js/app.min.js"></script>
      <script type="text/javascript" src="${contextroot}/js/jquery.contextMenu.min.js"></script>
      <script type="text/javascript" src="${contextroot}/js/jquery.ui.position.js"></script>
      <!-- Custom Js -->
      <script src="${contextroot}/js/admin.js"></script>
      <!-- Knob Js -->
      <script type="text/javascript" src="${contextroot}/js/knockout-3.5.0.js"></script>
      <script type="text/javascript" src="${contextroot}/js/daterangepicker.min.js"></script>

      <!-- Knob Js -->
      <script src="${contextroot}/js/jquery-ui.min.js"></script>
      <script src="${contextroot}/js/moment.js"></script>
      <script src="${contextroot}/js/jquery.editable.min.js"></script>
      <script src="${contextroot}/js/bootstrap.bundle.min.js"></script>
      <script src="${contextroot}/js/datepickerair.js"></script>
      <script src="${contextroot}/js/datepicker.en.js"></script>
      <script src="${contextroot}/js/handlebars.js"></script>
      <script src="${contextroot}/js/widgets.js"></script>
      <script src="${contextroot}/js/notify.js"></script>
      <script src="${contextroot}/js/select2.min.js"></script>
      <script src="${contextroot}/js/kpiPerformanceContract.js"></script>
      <script src="${contextroot}/js/initial.js"></script>
      <script src="${contextroot}/js/html2pdf.bundle.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.29/jspdf.plugin.autotable.min.js"></script>







      <script>
        var attachment = {
          kpiAttachment: []
        };

        var documentData = {}

        document.querySelectorAll('.file-input').forEach((inputEl) => {
          const previewContainer = inputEl.closest('.form-group').querySelector('.upload-preview');
          const uploadBox = inputEl.closest('.upload-box');

          function generateUniqueReference() {
            return Date.now() + '_' + Math.random().toString(36).substring(2, 10);
          }

          function getFileContentAsBase64(file, callback) {
            const reader = new FileReader();
            reader.onload = function (event) {
              const base64String = event.target.result.split(',')[1];
              callback(base64String);
            };
            reader.readAsDataURL(file);
          }

          function render() {
            previewContainer.innerHTML = '';
            attachment.kpiAttachment.forEach((fileObj, index) => {
              const file = fileObj.file;
              const fileURL = URL.createObjectURL(file);
              const wrapper = document.createElement('div');
              wrapper.className = 'col-md-3 upload-item';
              wrapper.style.padding = '10px';

              if (file.type.startsWith('image/')) {
                wrapper.innerHTML =
                  '<div class="card h-100 shadow-sm">' +
                  '<img src="' + fileURL + '" class="card-img-top img-fluid" alt="' + file.name + '">' +
                  '<div class="card-body p-2">' +
                  '<p class="card-text text-truncate small mb-2">' + file.name + '</p>' +
                  '<div class="d-flex justify-content-between">' +
                  '<a href="' + fileURL + '" download="' + file.name + '" class="btn btn-sm btn-outline-primary"><i class="fa fa-download"></i></a>' +
                  '<button type="button" class="btn btn-sm btn-outline-danger" data-index="' + index + '"><i class="fa fa-trash"></i></button>' +
                  '</div>' +
                  '</div>' +
                  '</div>';
              } else {
                wrapper.innerHTML =
                  '<div class="card h-100 shadow-sm">' +
                  '<div class="card-body p-2">' +
                  '<p class="card-text text-truncate mb-3">' + file.name + '</p>' +
                  '<div class="d-flex justify-content-between">' +
                  '<a href="' + fileURL + '" download="' + file.name + '" class="btn btn-sm btn-outline-primary"><i class="fa fa-download"></i></a>' +
                  '<button type="button" class="btn btn-sm btn-outline-danger" data-index="' + index + '"><i class="fa fa-trash"></i></button>' +
                  '</div>' +
                  '</div>' +
                  '</div>';
              }

              previewContainer.appendChild(wrapper);
            });

            // Attach delete event listeners
            previewContainer.querySelectorAll('button[data-index]').forEach(btn => {
              btn.addEventListener('click', () => {
                const i = parseInt(btn.getAttribute('data-index'));
                attachment.kpiAttachment.splice(i, 1);
                render();
                updateDocumentsValue();
              });
            });
          }

          function updateDocumentsValue() {
            if (attachment.kpiAttachment.length > 0) {
              const fileObj = attachment.kpiAttachment[0];
              getFileContentAsBase64(fileObj.file, function (base64Content) {
                window.documentsValue = {
                  file: base64Content,
                  name: fileObj.file.name,
                  size: fileObj.file.size + ' bytes',
                  type: fileObj.file.type,
                  uniqueFileReference: fileObj.uniqueFileReference,
                  uploadedOn: fileObj.uploadedOn
                };

                documentData = {
                  file: base64Content,
                  name: fileObj.file.name,
                  size: fileObj.file.size + ' bytes',
                  type: fileObj.file.type,
                  uniqueFileReference: fileObj.uniqueFileReference,
                  uploadedOn: fileObj.uploadedOn
                };
                console.log("documentsValue updated:", window.documentsValue);
              });
            } else {
              window.documentsValue = null;
              console.log("documentsValue cleared");
            }
          }

          inputEl.addEventListener('change', () => {
            const newFiles = Array.from(inputEl.files);
            newFiles.forEach(file => {
              console.log(file, "file");
              attachment.kpiAttachment.push({
                file: file,
                uploadedOn: new Date(),
                uniqueFileReference: generateUniqueReference()
              });
            });
            inputEl.value = "";
            render();
            updateDocumentsValue();
          });

          uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadBox.classList.add('border-primary');
          });

          uploadBox.addEventListener('dragleave', () => {
            uploadBox.classList.remove('border-primary');
          });

          uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadBox.classList.remove('border-primary');
            const droppedFiles = Array.from(e.dataTransfer.files);
            droppedFiles.forEach(file => {
              console.log(file, "dropped file");
              attachment.kpiAttachment.push({
                file: file,
                uploadedOn: new Date(),
                uniqueFileReference: generateUniqueReference()
              });
            });
            render();
            updateDocumentsValue();
          });
        });

        window.attachment = attachment;
        // window.updateDocumentsValue = updateDocumentsValue;
      </script>
      <script>
        var kpiData = {}
        var getIdData = {}
        var userDepartemntIdValue = ""
        var selectedDepartmentIdValue = ""
        $(document).ready(function () {
          var userId = $("#userPrincipal").val();
          const departmentSelect = document.getElementById('department_selectdw');

          function getDepartment() {
            $.ajax({
              type: "GET",
              url: "/stratroom/departmentReportees",
              async: false,
              success: function (data) {

                //Login User details
                $.ajax({
                  url: "/stratroom/userRole/" + userId,
                  type: "GET",
                  success: function (data) {
                    console.log(data, "dataaaaaaauser");

                    if (!data.departmentList || data.departmentList.length == 0) {
                      console.error("No departments found for this user.");
                      return;
                    }

                    var userDeptId = data.departmentList[0].id || "";
                    userDepartemntIdValue = userDeptId;
                    var userDeptName = data.departmentList[0].id || "";


                    scoreCradListData(userDeptId)
                    console.log(userDeptId, userDeptName, "userDeptIdName");
                  }
                });
                //Login User details
                // clear old options except the first one
                $('#department_selectdw').find('option:not(:first)').remove();

                $.each(data, function (index, module) {
                  const option = document.createElement('option');
                  option.value = module.id;
                  option.textContent = module.name;
                  departmentSelect.appendChild(option);
                });

                // Initialize Select2 only once
                if (!$('#department_selectdw').hasClass("select2-hidden-accessible")) {
                  $('#department_selectdw').select2({
                    placeholder: "Select Department",
                    width: 'resolve'
                  });
                } else {

                  $('#department_selectdw').trigger('change.select2');
                }

                if (!$('#page_selectdw').hasClass("select2-hidden-accessible")) {
                  $('#page_selectdw').select2({
                    placeholder: "Select",
                    width: 'resolve'
                  });
                } else {

                  $('#page_selectdw').trigger('change.select2');
                }
              }
            });
          }

          getDepartment();

          //////////


          var useraccessid = localStorage.getItem('rootuseraccessid');
          console.log(useraccessid, "useraccessid");

          $.ajax({
            url: "/stratroom/userRole/" + useraccessid,
            type: "get",
            contentType: "application/json",
            success: function (data) {
              const users = data;
              const username = users.name || "NN";
              const userEmail = users.emailAddress || "";


              $('.user-text h6').text(username);
              $('.user-text small').text(userEmail);

              var userProfileConcate = (users.profileImage == undefined || users.profileImage == "")
                ? "data-name='" + username + "' class='rounded-circle swotmultiuserimage'"
                : "src='" + users.profileImage + "' class='rounded-circle'";


              var imgTag = "<img " + userProfileConcate + " />";

              const userImageContainer = $('.user-image');
              userImageContainer.empty().append(imgTag);


              $('.swotmultiuserimage').each(function () {
                const $img = $(this);
                const name = $img.data('name') || 'NN';
                const initials = name
                  ? name
                    .trim()
                    .slice(0, 2)
                    .toUpperCase()
                  : "NN";

                console.log(initials, "initials");

                const $div = $('<div></div>')
                  .addClass($img.attr('class'))
                  .text(initials)


                $img.replaceWith($div);
              });
            },
            error: function (xhr, status, err) {
              console.error("Error:", err);
            }
          });


        });

        // scoreCradListData();
        function scoreCradListData(deptId) {
          selectedDepartmentIdValue = deptId;
          const storedLanguage = localStorage.getItem("selectedLang") || "en"
          loadLanguage(storedLanguage)
          $.ajax({
            // url: "/stratroom/scoreCardListByDeptId/",
            //  url: "/stratroom/pageDeptList/" + deptId + "?pageType=scorecard",
            url: "/stratroom/getscoreCardListByDeptIds?deptIds=" + deptId,
            type: "get",
            contentType: "application/json",
            success: function (data, status) {
              console.log(data, "scorecardData");
              const select = $("#inputState");
              select.empty();

              select.append("<option selected disabled>Select Scorecard</option>");

              if (data.length == 0) {
                select.append("<option disabled>No Scorecards available</option>");
                return;
              }
              data.forEach(function (scorecard) {
                const option =
                  "<option value='" +
                  scorecard.id +
                  "'>" +
                  scorecard.name +
                  "</option>";
                select.append(option);
              });
            },
            error: readErrorMsg,
          });
        }


        //onchange function for scorecard selection
        function scoreCardChange() {
          const selectedValue = $("#inputState").val();
          console.log("Selected Scorecard ID:", selectedValue);
          if (!selectedValue) {
            return;
          }

          // Dummy data - same as your example
          const kpiData = {
            "subkpidtoList": [
              {
                "id": 24528,
                "orgId": 4,
                "subKpiName": "subkpi002",
                "subKpiIdSequence": null,
                "createdBy": 2108,
                "updatedBy": 0,
                "createdTime": "2025-08-02T06:45:09",
                "updatedTime": null,
                "active": 0,
                "owner": 2108,
                "objectiveId": 1910,
                "subKpiValue": {
                  "createdByName": "Grace",
                  "subweight": "",
                  "targetCurrency": "",
                  "kpiCurrency": "",
                  "customthresholdenable": false,
                  "kpiId": "24103",
                  "dataType": "Percentage",
                  "description": "des",
                  "weight": "",
                  "threshold": "",
                  "target": "0",
                  "thresholdFormula": "",
                  "kpi_datasource": "Manual",
                  "ownerName": "Grace",
                  "kpiType": "Lead",
                  "subMeasureName": "subkpi002",
                  "kpi_measurement": "Quarterly",
                  "kpi_start_end_date": "08/19/2025 - 08/30/2025",
                  "status": "Manual"
                },
                "subKpiId": "MPT.1",
                "includeReportee": false,
                "customReportees": null,
                "startDate": "2025-08-18",
                "endDate": "2025-08-29",
                "actType": 1,
                "kpiFormula": {
                  "formula": "",
                  "fieldName": "",
                  "type": null,
                  "groupBy": null,
                  "deptName": null,
                  "currency": null,
                  "dataType": null,
                  "empployeeIds": [
                    "2108",
                    2108
                  ],
                  "period": null,
                  "tableType": null
                },
                "empId": 0,
                "kpiId": 24103,
                "subKPIEntrysDTO": null,
                "thresholdvalueupdate": false,
                "createDateString": null,
                "updatedDateString": null
              },
              {
                "id": 24528,
                "orgId": 4,
                "subKpiName": "subkpi002",
                "subKpiIdSequence": null,
                "createdBy": 2108,
                "updatedBy": 0,
                "createdTime": "2025-08-02T06:45:09",
                "updatedTime": null,
                "active": 0,
                "owner": 2108,
                "objectiveId": 1910,
                "subKpiValue": {
                  "createdByName": "Grace",
                  "subweight": "",
                  "targetCurrency": "",
                  "kpiCurrency": "",
                  "customthresholdenable": false,
                  "kpiId": "24103",
                  "dataType": "Percentage",
                  "description": "des",
                  "weight": "",
                  "threshold": "",
                  "target": "0",
                  "thresholdFormula": "",
                  "kpi_datasource": "Manual",
                  "ownerName": "Grace",
                  "kpiType": "Lead",
                  "subMeasureName": "subkpi002",
                  "kpi_measurement": "Quarterly",
                  "kpi_start_end_date": "08/19/2025 - 08/30/2025",
                  "status": "Manual"
                },
                "subKpiId": "MPT.1",
                "includeReportee": false,
                "customReportees": null,
                "startDate": "2025-08-18",
                "endDate": "2025-08-29",
                "actType": 1,
                "kpiFormula": {
                  "formula": "",
                  "fieldName": "",
                  "type": null,
                  "groupBy": null,
                  "deptName": null,
                  "currency": null,
                  "dataType": null,
                  "empployeeIds": [
                    "2108",
                    2108
                  ],
                  "period": null,
                  "tableType": null
                },
                "empId": 0,
                "kpiId": 24103,
                "subKPIEntrysDTO": null,
                "thresholdvalueupdate": false,
                "createDateString": null,
                "updatedDateString": null
              }
            ]
          }




          // AJAX call (kept as in your original code)
          $.ajax({
            url: "/stratroom/subkpiEntryList/" + selectedValue + "?employeeView",
            type: "get",
            contentType: "application/json",
            success: function (data, status) {
              getIdData = data;
              console.log(userDepartemntIdValue, selectedDepartmentIdValue, "userdepartmentIdVa")
              // Handle success if needed
              const kpiData = data

              const container = document.getElementById("kpi_performance_table");
              container.innerHTML = "";

              if (selectedType == "subKpi") {
                if (kpiData && kpiData.subkpidtoList && kpiData.subkpidtoList.length > 0) {
                  kpiData.subkpidtoList.forEach((item, index) => {
                    console.log(item, "item");
                    const num = (index + 1).toString().padStart(2, '0');
                    const kpiId = item.id;
                    const subKPIEntrysDTOId = item.subKPIEntrysDTO ? item.subKPIEntrysDTO.id : null;
                    const preferenceId = item.subKPIEntrysDTO ? item.subKPIEntrysDTO.preferenceId : null;
                    $('#preferenceIdValue').val(preferenceId);

                    let roleHtml = "";

                    const ratings = item.subKPIEntrysDTO || {};
                    const selfRating = ratings.selfRating || 0;
                    const managerRating = ratings.managerRating || 0;
                    const consensualRating = ratings.consensualRating || 0;
                    const commentValue = kpiData?.values?.performanceContract?.performanceValue?.comments ? kpiData?.values?.performanceContract?.performanceValue?.comments : '';
                    $('#comments').val(commentValue);

                    ["self", "manager", "consensual"].forEach(role => {

                      const ratingValue =
                        role == "self" ? selfRating :
                          role == "manager" ? managerRating :
                            consensualRating;

                      const isDisabled = isRoleDisabled(role) ? ' disabled' : '';

                      roleHtml +=
                        '<div class="d-flex align-items-center gap-2 mt-2">' +
                        '<label class="form-label mb-0">' + role.toUpperCase() + '</label>' +
                        '<div class="form-check-group">' +

                        [1, 2, 3].map(val =>
                          '<div class="form-check">' +
                          '<input class="form-check-input kpi-radio" type="radio"' +
                          ' id="kpi-' + num + '-' + role + '-' + val + '"' +
                          ' name="kpi-' + num + '-' + role + '"' +
                          ' value="' + val + '"' +
                          ' data-role="' + role + '"' +
                          (ratingValue == val ? ' checked' : '') +
                          isDisabled +
                          '>' +
                          '<label class="form-check-label" for="kpi-' + num + '-' + role + '-' + val + '">' +
                          '<span>' + val + '</span>' +
                          '</label>' +
                          '</div>'
                        ).join("") +

                        '</div>' +
                        '</div>';
                    });



                    function isRoleDisabled(role) {
                      // Rule 1: Self + Manager filled → only consensual enabled
                      console.log(consensualRating, selfRating, managerRating, "consensual ratings");
                      if (selfRating && managerRating && consensualRating == 0) {
                        return role !== "consensual";
                      }

                      // Rule 2: Not manager & self already rated → manager enabled
                      if (userDepartemntIdValue !== selectedDepartmentIdValue && selfRating && managerRating == 0) {
                        return role !== "manager";
                      }

                      // Rule 3: User is manager → self enabled
                      if (userDepartemntIdValue == selectedDepartmentIdValue && selfRating == 0) {
                        return role !== "self";
                      }

                      // Default: everything disabled
                      return true;
                    }



                    const html =
                      '<div class="questionnaire-block">' +
                      '<label class="form-label">' + (index + 1) + '. ' + item.subKpiName + '</label>' +
                      '<input type="hidden" name="kpi-' + kpiId + '-kpiId" value="' + (kpiId || '') + '">' +
                      '<input type="hidden" name="kpi-' + subKPIEntrysDTOId + '-subKPIEntrysDTOId" value="' + (subKPIEntrysDTOId || '') + '">' +
                      '<input type="hidden" name="kpi-' + preferenceId + '-preferenceId" value="' + (preferenceId || '') + '">' +
                      roleHtml +
                      '</div>';

                    container.innerHTML += html;
                  });


                  updateTotalScores();


                  document.querySelectorAll('.kpi-radio').forEach(radio => {
                    radio.addEventListener('change', updateTotalScores);
                  });
                }
              } else if (selectedType == "kpi") {
                if (kpiData && kpiData.kpidtoList && kpiData.kpidtoList.length > 0) {
                  kpiData.kpidtoList.forEach((item, index) => {
                    console.log(item, "item");
                    const num = (index + 1).toString().padStart(2, '0');
                    const kpiId = item.id;
                    const kPIEntrysDTOId = item.kpiEntrysDTO ? item.kpiEntrysDTO.id : null;
                    const preferenceId = item.kpiEntrysDTO ? item.kpiEntrysDTO.preferenceId : null;
                    $('#preferenceIdValue').val(preferenceId);

                    let roleHtml = "";

                    const ratings = item.kpiEntrysDTO || {};
                    const selfRating = ratings.selfRating || 0;
                    const managerRating = ratings.managerRating || 0;
                    const consensualRating = ratings.consensualRating || 0;
                    const commentValue = kpiData?.values?.performanceContract?.performanceValue?.comments ? kpiData?.values?.performanceContract?.performanceValue?.comments : '';
                    $('#comments').val(commentValue);

                    ["self", "manager", "consensual"].forEach(role => {

                      const ratingValue =
                        role == "self" ? selfRating :
                          role == "manager" ? managerRating :
                            consensualRating;

                      const isDisabled = isRoleDisabled(role) ? ' disabled' : '';

                      roleHtml +=
                        '<div class="d-flex align-items-center gap-2 mt-2">' +
                        '<label class="form-label mb-0">' + role.toUpperCase() + '</label>' +
                        '<div class="form-check-group">' +

                        [1, 2, 3].map(val =>
                          '<div class="form-check">' +
                          '<input class="form-check-input kpi-radio" type="radio"' +
                          ' id="kpi-' + num + '-' + role + '-' + val + '"' +
                          ' name="kpi-' + num + '-' + role + '"' +
                          ' value="' + val + '"' +
                          ' data-role="' + role + '"' +
                          (ratingValue == val ? ' checked' : '') +
                          isDisabled +
                          '>' +
                          '<label class="form-check-label" for="kpi-' + num + '-' + role + '-' + val + '">' +
                          '<span>' + val + '</span>' +
                          '</label>' +
                          '</div>'
                        ).join("") +

                        '</div>' +
                        '</div>';
                    });



                    function isRoleDisabled(role) {
                      // Rule 1: Self + Manager filled → only consensual enabled
                      console.log(consensualRating, selfRating, managerRating, "consensual ratings");
                      if (selfRating && managerRating && consensualRating == 0) {
                        return role !== "consensual";
                      }

                      // Rule 2: Not manager & self already rated → manager enabled
                      if (userDepartemntIdValue !== selectedDepartmentIdValue && selfRating && managerRating == 0) {
                        return role !== "manager";
                      }

                      // Rule 3: User is manager → self enabled
                      if (userDepartemntIdValue == selectedDepartmentIdValue && selfRating == 0) {
                        return role !== "self";
                      }

                      // Default: everything disabled
                      return true;
                    }



                    const html =
                      '<div class="questionnaire-block">' +
                      '<label class="form-label">' + (index + 1) + '. ' + item.kpiName + '</label>' +
                      '<input type="hidden" name="kpi-' + kpiId + '-kpiId" value="' + (kpiId || '') + '">' +
                      '<input type="hidden" name="kpi-' + kPIEntrysDTOId + '-kPIEntrysDTOId" value="' + (kPIEntrysDTOId || '') + '">' +
                      '<input type="hidden" name="kpi-' + preferenceId + '-preferenceId" value="' + (preferenceId || '') + '">' +
                      roleHtml +
                      '</div>';

                    container.innerHTML += html;
                  });


                  updateTotalScores();


                  document.querySelectorAll('.kpi-radio').forEach(radio => {
                    radio.addEventListener('change', updateTotalScores);
                  });
                }

              }
            },
            error: readErrorMsg,
          });
        }






        //save api
        function saveKpiPerformance() {
          var currentEmp = $("#userPrincipal").val().trim()
          var subKPIEntries = [];
          var kpiEntries = [];
          var predfId = "";


          var blocks = document.querySelectorAll("#kpi_performance_table .questionnaire-block");

          var kpiblocks = document.querySelectorAll("#kpi_performance_table .questionnaire-block");


           kpiblocks.forEach(function (block) {
            console.log(block, "blockData");
            var hiddenInput = block.querySelector('input[type="hidden"][name*="kPIEntrysDTOId"]');
            if (!hiddenInput) return;

            var hiddenInputOne = block.querySelector('input[type="hidden"][name*="preferenceId"]');
            var hiddenInputTwo = block.querySelector('input[type="hidden"][name*="kpiId"]');


            var nameParts = hiddenInput.name.split('-');
            var subkpiId = nameParts[1];

            var nameParts1 = hiddenInputOne.name.split('-');
            var subkpiId1 = nameParts[1];

            var nameParts2 = hiddenInputTwo.name.split('-');
            var subkpiId2 = nameParts2[1];

            console.log(nameParts, subkpiId, "nameParts");

            // Now get the values using the correct ID
            var kPIEntrysDTOId = subkpiId;
            var preferenceId = subkpiId1;
            predfId = preferenceId;

            console.log(kPIEntrysDTOId, preferenceId, "kPIEntrysDTOId");
            var subkpiName = block.querySelector('label.form-label').textContent.replace(/^\d+\.\s/, '').trim();
            const selfSelected = block.querySelector("input[name^='kpi-'][name*='self']:checked");
            const managerSelected = block.querySelector("input[name^='kpi-'][name*='manager']:checked");
            const consensualSelected = block.querySelector("input[name^='kpi-'][name*='consensual']:checked");

            const selfRating = selfSelected?.value || "--";
            const managerRating = managerSelected?.value || "--";
            const consensualRating = consensualSelected?.value || "--";
            kpiEntries.push({
              "kpiId": parseInt(subkpiId2),
              "kpiName": subkpiName,
              "selfRating": parseInt(selfRating),
              "managerRating": parseInt(managerRating),
              "consensualRating": parseInt(consensualRating),
              "id": kPIEntrysDTOId ? parseInt(kPIEntrysDTOId) : null,
              "preferenceId": preferenceId ? parseInt(preferenceId) : null
            });
          });



          blocks.forEach(function (block) {
            console.log(block, "blockData");
            var hiddenInput = block.querySelector('input[type="hidden"][name*="subKPIEntrysDTOId"]');
            if (!hiddenInput) return;

            var hiddenInputOne = block.querySelector('input[type="hidden"][name*="preferenceId"]');
            var hiddenInputTwo = block.querySelector('input[type="hidden"][name*="kpiId"]');


            var nameParts = hiddenInput.name.split('-');
            var subkpiId = nameParts[1];

            var nameParts1 = hiddenInputOne.name.split('-');
            var subkpiId1 = nameParts[1];

            var nameParts2 = hiddenInputTwo.name.split('-');
            var subkpiId2 = nameParts2[1];

            console.log(nameParts, subkpiId, "nameParts");

            // Now get the values using the correct ID
            var subKPIEntrysDTOId = subkpiId;
            var preferenceId = subkpiId1;
            predfId = preferenceId;

            console.log(subKPIEntrysDTOId, preferenceId, "subKPIEntrysDTOId");

            var subkpiName = block.querySelector('label.form-label').textContent.replace(/^\d+\.\s/, '').trim();
            const selfSelected = block.querySelector("input[name^='kpi-'][name*='self']:checked");
            const managerSelected = block.querySelector("input[name^='kpi-'][name*='manager']:checked");
            const consensualSelected = block.querySelector("input[name^='kpi-'][name*='consensual']:checked");

            const selfRating = selfSelected?.value || "--";
            const managerRating = managerSelected?.value || "--";
            const consensualRating = consensualSelected?.value || "--";
            subKPIEntries.push({
              "subkpiId": parseInt(subkpiId2),
              "subkpiName": subkpiName,
              "selfRating": parseInt(selfRating),
              "managerRating": parseInt(managerRating),
              "consensualRating": parseInt(consensualRating),
              "id": subKPIEntrysDTOId ? parseInt(subKPIEntrysDTOId) : null,
              "preferenceId": preferenceId ? parseInt(preferenceId) : null
            });
          });





          var selfTotal = 0, managerTotal = 0, consensualTotal = 0;

          const totalKpis = subKPIEntries.length; // total number of KPIs
          const maxRatingPerKpi = 3;

          subKPIEntries.forEach(entry => {
            console.log(entry, "entryRating");
            selfTotal += entry.selfRating;
            managerTotal += entry.managerRating;
            consensualTotal += entry.consensualRating;
          });


          let avgConsensualRating = 0;

          if (totalKpis > 0) {
            avgConsensualRating =
              (consensualTotal / (totalKpis * maxRatingPerKpi)) * 100;
          }

          // Optional: round to 2 decimals
          avgConsensualRating = Number(avgConsensualRating.toFixed(2));

          console.log("Avg Consensual Rating %:", avgConsensualRating);


          let ratingValue = 0; // default

          if (avgConsensualRating >= 0 && avgConsensualRating <= 60) {
            ratingValue = 1;
          } else if (avgConsensualRating >= 61 && avgConsensualRating <= 85) {
            ratingValue = 2;
          } else if (avgConsensualRating >= 86 && avgConsensualRating <= 100) {
            ratingValue = 3;
          }

          // Store rating value
          console.log("Stored Rating Value:", ratingValue);


          const payload = {
            "owner": getIdData?.values?.performanceContract?.owner ? getIdData?.values?.performanceContract?.owner : "0" || "0",
            "createdBy": getIdData?.values?.performanceContract?.createdBy ? getIdData?.values?.performanceContract?.createdBy : "0" || "0",
            "deptId": "",
            "id": getIdData?.values?.performanceContract?.id ? getIdData?.values?.performanceContract?.id : "0" || "0",
            "scorecardId": $("#inputState").val() || "0",
            "preferenceId": predfId ? parseInt(predfId) : null,
            "employeeDocuments": {
              "owner": currentEmp,
              "documentsValue": {
                "name": documentData.name ? documentData.name : "",
                "type": documentData.type ? documentData.type : "",
                "uploadedOn": new Date(),
                "size": documentData.size ? documentData.size : "",
                "file_value": documentData.file ? documentData.file : "",
              },
            },
            "performanceValue": {
              "comments": $("#comments").val(),
              "selfRatingTotal": selfTotal ? selfTotal.toString() : "0",
              "managerRating": managerTotal ? managerTotal.toString() : "0",
              "consensualRating": consensualTotal ? consensualTotal.toString() : "0",
              "preferenceId": predfId ? parseInt(predfId) : null,
              "totalconsensualScoreRating": ratingValue,
            },

            ...(selectedType === "kpi" && {
              kpiEntrysList: kpiEntries || []
            }),

            ...(selectedType === "subKpi" && {
              subKPIEntrysList: subKPIEntries || []
            })
          };

          console.log(payload, documentData, "payload");

          $.ajax({
            url: "/stratroom/web/saveSubkpiEntry",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(payload),
            success: function (response) {
              console.log("Success:", response);
              $.notify("Success: Performance Contract saved successfully", {
                style: 'success',
                className: 'graynotify'
              });
              location.reload();
            },
            error: function (error) {
              console.error("Error:", error);
            }
          });
        }




        document.addEventListener("DOMContentLoaded", function () {
          document.addEventListener("click", async function (event) {
            if (!event.target.closest('.btn-generatePdf')) return;

            const scorecardSelect = document.querySelector(".persp_status");
            const scorecardValue = scorecardSelect?.value || "";
            if (!scorecardValue) {
              alert("Please select a Scorecard before downloading.");
              return;
            }

            const enqName = "Chris";
            const email = "Chris@demo.com";
            const submissionDate = new Date().toLocaleDateString();
            const score = `${scorecardSelect.options[scorecardSelect.selectedIndex].text}` || "--";

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;
            const marginLeft = 10;
            const marginRight = pageWidth - marginLeft;

            const coverImage = "https://stratroom.io/assets/images/diagnostic-cover.jpeg";
            const logoUrl = "https://stratroom.io/assets/images/logo.jpg";

            // Utility
            const addFullPageImage = (imageUrl) => {
              doc.addImage(imageUrl, 'JPEG', 0, 0, pageWidth, pageHeight);
              doc.addPage();
            };

            const header = () => {
              const imgX = 10, imgY = 5, imgWidth = 50, imgHeight = 10;
              const textStartY = imgY + 5;

              doc.addImage(logoUrl, "JPEG", imgX, imgY, imgWidth, imgHeight);
              doc.setFontSize(13);
              doc.setFont("helvetica", "bold");
              doc.text("Performance Contract Report", marginRight, textStartY - 3, { align: "right" });

              doc.setFont("helvetica", "normal");
              doc.setFontSize(9);
              doc.text(`Generated Date: ${submissionDate}`, marginRight, textStartY + 1, { align: "right" });
              doc.text(`Generated By: ${enqName} | Scorecard: ${score}`, marginRight, textStartY + 10, { align: "right" });

              doc.line(10, imgHeight + 12, pageWidth - 10, imgHeight + 12);
              return imgHeight + 20;
            };

            const footer = () => {
              const currentYear = new Date().getFullYear();
              doc.setFontSize(8);
              doc.text(`Copyright © ${currentYear}, StratRoom. All Rights Reserved.`, pageWidth / 2, 292, { align: "center" });
              doc.line(10, pageHeight - 12, pageWidth - 10, pageHeight - 12);
            };

            // Add Cover
            addFullPageImage(coverImage);

            // Main Header
            let y = header();

            // == Build Table Data ==
            let tableBody = [];
            let selfTotal = 0;
            let managerTotal = 0;
            let consensualTotal = 0;

            const blocks = document.querySelectorAll(".questionnaire-block");

            if (blocks.length == 0) {
              alert("No KPI questions found. Please complete the form first.");
              return;
            }

            blocks.forEach((block, index) => {
              const kpiTitle = block.querySelector("label.form-label")?.innerText?.trim() || `KPI ${index + 1}`;

              const selfSelected = block.querySelector("input[name^='kpi-'][name*='self']:checked");
              const managerSelected = block.querySelector("input[name^='kpi-'][name*='manager']:checked");
              const consensualSelected = block.querySelector("input[name^='kpi-'][name*='consensual']:checked");

              const selfValue = selfSelected?.value || "--";
              const managerValue = managerSelected?.value || "--";
              const consensualValue = consensualSelected?.value || "--";

              if (!selfSelected && !managerSelected && !consensualSelected) {
                return; // Skip if no selections
              }

              if (selfSelected) selfTotal++;
              if (managerSelected) managerTotal++;
              if (consensualSelected) consensualTotal++;

              tableBody.push([
                (index + 1).toString(),
                kpiTitle,
                selfValue,
                managerValue,
                consensualValue
              ]);
            });

            if (tableBody.length == 0) {
              alert("No KPI selections found. Please fill in the form before exporting.");
              return;
            }


            doc.autoTable({
              head: [["#", "KPI", "SELF", "MANAGER", "CONSENSUAL"]],
              body: tableBody,
              startY: y,
              margin: { top: y, bottom: 20 },
              styles: { fontSize: 9, cellPadding: 2 },
              headStyles: { fillColor: [40, 100, 150], textColor: 255 }
            });

            // == Totals Row ==
            doc.autoTable({
              startY: doc.lastAutoTable.finalY + 5,
              body: [
                ["", "Total", selfTotal.toString(), managerTotal.toString(), consensualTotal.toString()]
              ],
              styles: { fontStyle: "bold", fontSize: 10 },
              theme: "grid",
              margin: { left: 14 }
            });


            footer();

            // Save PDF
            doc.save(`Performance_Contract_Report_${submissionDate}.pdf`);
          });
        });


        function onDepartmentChange(deptId) {
          console.log("Selected Department ID:", deptId);
          scoreCradListData(deptId);
          // Your logic here...
        }



        //file upload



      </script>


      <script>
        let selectedType = "subKpi"; // default value

        $(document).ready(function () {
          // Default check Sub Kpi
          $("#subKpi").prop("checked", true);

          $(".lang-checkbox").on("change", function () {
            // Allow only one selection
            $(".lang-checkbox").not(this).prop("checked", false);

            selectedType = $(this).is(":checked") ? $(this).val() : "";
            console.log("Selected Type:", selectedType);
          });
        });
      </script>

      <script>

        var employeeExperianceId = null;
        //Leadership and management save 

        function getValueByIdPrefix(prefix) {
          for (var i = 1; i <= 3; i++) {
            var id = prefix + "-" + i;
            var el = document.getElementById(id);

            console.log("Checking ID:", id, el);

            if (el && el.checked) {
              return el.value;
            }
          }
          return "";
        }

        function avg(arr) {
          var sum = 0, count = 0;

          for (var i = 0; i < arr.length; i++) {
            var v = parseInt(arr[i] || 0, 10);
            if (v > 0) {
              sum += v;
              count++;
            }
          }
          return count ? (sum / count) : "";
        }





        function collectLMCData_IdBased() {

          var s1Self = getValueByIdPrefix("lmc-1-self");
          var s2Self = getValueByIdPrefix("lmc-2-self");
          var s3Self = getValueByIdPrefix("lmc-3-self");
          var s4Self = getValueByIdPrefix("lmc-4-self");

          var s1Manager = getValueByIdPrefix("kpi-1-manager");
          var s2Manager = getValueByIdPrefix("kpi-2-manager");
          var s3Manager = getValueByIdPrefix("kpi-3-manager");
          var s4Manager = getValueByIdPrefix("kpi-4-manager");

          var s1Cons = getValueByIdPrefix("kpi-1-consensual");
          var s2Cons = getValueByIdPrefix("kpi-2-consensual");
          var s3Cons = getValueByIdPrefix("kpi-3-consensual");
          var s4Cons = getValueByIdPrefix("kpi-4-consensual");


          // convert safely ("" → 0)
          s1Self = parseInt(s1Self || 0);
          s2Self = parseInt(s2Self || 0);
          s3Self = parseInt(s3Self || 0);
          s4Self = parseInt(s4Self || 0);

          s1Manager = parseInt(s1Manager || 0);
          s2Manager = parseInt(s2Manager || 0);
          s3Manager = parseInt(s3Manager || 0);
          s4Manager = parseInt(s4Manager || 0);

          s1Cons = parseInt(s1Cons || 0);
          s2Cons = parseInt(s2Cons || 0);
          s3Cons = parseInt(s3Cons || 0);
          s4Cons = parseInt(s4Cons || 0);

          return {
            performanceMangement: {
              s1Sefl: getValueByIdPrefix("lmc-1-self"),
              s1Manager: getValueByIdPrefix("kpi-1-manager"),
              s1Consensual: getValueByIdPrefix("kpi-1-consensual"),

              s2Sefl: getValueByIdPrefix("lmc-2-self"),
              s2Manager: getValueByIdPrefix("kpi-2-manager"),
              s2Consensual: getValueByIdPrefix("kpi-2-consensual"),

              s3Sefl: getValueByIdPrefix("lmc-3-self"),
              s3Manager: getValueByIdPrefix("kpi-3-manager"),
              s3Consensual: getValueByIdPrefix("kpi-3-consensual"),

              s4Sefl: getValueByIdPrefix("lmc-4-self"),
              s4Manager: getValueByIdPrefix("kpi-4-manager"),
              s4Consensual: getValueByIdPrefix("kpi-4-consensual"),


              averageSelf: (s1Self + s2Self + s3Self + s4Self) / 4,
              averageManager: (s1Manager + s2Manager + s3Manager + s4Manager) / 4,
              averageConsensual: (s1Cons + s2Cons + s3Cons + s4Cons) / 4,
              totalAverage:
                (s1Self + s2Self + s3Self + s4Self +
                  s1Manager + s2Manager + s3Manager + s4Manager +
                  s1Cons + s2Cons + s3Cons + s4Cons) / 12


            },

            peopleManagement: {
              s1Sefl: getValueByIdPrefix("lmc-5-self"),
              s1Manager: getValueByIdPrefix("kpi-5-manager"),
              s1Consensual: getValueByIdPrefix("kpi-5-consensual"),
              "averageSelf": parseFloat(getValueByIdPrefix("lmc-5-self") || 0),
              "averageManager": parseFloat(getValueByIdPrefix("kpi-5-manager") || 0),
              "averageConsensual": parseFloat(getValueByIdPrefix("kpi-5-consensual") || 0),
              "totalAverage": (
                (parseFloat(getValueByIdPrefix("lmc-5-self") || 0) +
                  parseFloat(getValueByIdPrefix("kpi-5-manager") || 0) +
                  parseFloat(getValueByIdPrefix("kpi-5-consensual") || 0)
                ) / 3)
            },

            financialManagement: {
              s1Sefl: getValueByIdPrefix("lmc-6-self"),
              s1Manager: getValueByIdPrefix("kpi-6-manager"),
              s1Consensual: getValueByIdPrefix("kpi-6-consensual"),

              "averageSelf": parseFloat(getValueByIdPrefix("lmc-6-self") || 0),
              "averageManager": parseFloat(getValueByIdPrefix("kpi-6-manager") || 0),
              "averageConsensual": parseFloat(getValueByIdPrefix("kpi-6-consensual") || 0),
              "totalAverage": (
                (parseFloat(getValueByIdPrefix("lmc-6-self") || 0) +
                  parseFloat(getValueByIdPrefix("kpi-6-manager") || 0) +
                  parseFloat(getValueByIdPrefix("kpi-6-consensual") || 0)
                ) / 3)
            }
          };
        }



        function collectBehaviouralCapabilities() {

          var cSelf = [
            getValueByIdPrefix("bc-1-self"),
            getValueByIdPrefix("bc-2-self"),
            getValueByIdPrefix("bc-3-self"),
            getValueByIdPrefix("bc-4-self"),
            getValueByIdPrefix("bc-5-self"),
            getValueByIdPrefix("bc-6-self"),
            getValueByIdPrefix("bc-7-self"),
            getValueByIdPrefix("bc-8-self")
          ];

          var cMgr = [
            getValueByIdPrefix("bc-1-manager"),
            getValueByIdPrefix("bc-2-manager"),
            getValueByIdPrefix("bc-3-manager"),
            getValueByIdPrefix("bc-4-manager"),
            getValueByIdPrefix("bc-5-manager"),
            getValueByIdPrefix("bc-6-manager"),
            getValueByIdPrefix("bc-7-manager"),
            getValueByIdPrefix("bc-8-manager")
          ];

          var cCon = [
            getValueByIdPrefix("bc-1-consensual"),
            getValueByIdPrefix("bc-2-consensual"),
            getValueByIdPrefix("bc-3-consensual"),
            getValueByIdPrefix("bc-4-consensual"),
            getValueByIdPrefix("bc-5-consensual"),
            getValueByIdPrefix("bc-6-consensual"),
            getValueByIdPrefix("bc-7-consensual"),
            getValueByIdPrefix("bc-8-consensual")
          ];

          // COLLABORATIVE
          var colSelf = [
            getValueByIdPrefix("bc-9-self"),
            getValueByIdPrefix("bc-10-self"),
            getValueByIdPrefix("bc-11-self"),
            getValueByIdPrefix("bc-12-self"),
            getValueByIdPrefix("bc-13-self")
          ];

          var colMgr = [
            getValueByIdPrefix("bc-9-manager"),
            getValueByIdPrefix("bc-10-manager"),
            getValueByIdPrefix("bc-11-manager"),
            getValueByIdPrefix("bc-12-manager"),
            getValueByIdPrefix("bc-13-manager")
          ];

          var colCon = [
            getValueByIdPrefix("bc-9-consensual"),
            getValueByIdPrefix("bc-10-consensual"),
            getValueByIdPrefix("bc-11-consensual"),
            getValueByIdPrefix("bc-12-consensual"),
            getValueByIdPrefix("bc-13-consensual")
          ];

          // CREATIVITY
          var crSelf = [
            getValueByIdPrefix("bc-14-self"),
            getValueByIdPrefix("bc-15-self"),
            getValueByIdPrefix("bc-16-self"),
            getValueByIdPrefix("bc-17-self")
          ];

          var crMgr = [
            getValueByIdPrefix("bc-14-manager"),
            getValueByIdPrefix("bc-15-manager"),
            getValueByIdPrefix("bc-16-manager"),
            getValueByIdPrefix("bc-17-manager")
          ];

          var crCon = [
            getValueByIdPrefix("bc-14-consensual"),
            getValueByIdPrefix("bc-15-consensual"),
            getValueByIdPrefix("bc-16-consensual"),
            getValueByIdPrefix("bc-17-consensual")
          ];

          return {
            care: {
              s1Sefl: getValueByIdPrefix("bc-1-self"),
              s1Manager: getValueByIdPrefix("bc-1-manager"),
              s1Consensual: getValueByIdPrefix("bc-1-consensual"),

              s2Sefl: getValueByIdPrefix("bc-2-self"),
              s2Manager: getValueByIdPrefix("bc-2-manager"),
              s2Consensual: getValueByIdPrefix("bc-2-consensual"),

              s3Sefl: getValueByIdPrefix("bc-3-self"),
              s3Manager: getValueByIdPrefix("bc-3-manager"),
              s3Consensual: getValueByIdPrefix("bc-3-consensual"),

              s4Sefl: getValueByIdPrefix("bc-4-self"),
              s4Manager: getValueByIdPrefix("bc-4-manager"),
              s4Consensual: getValueByIdPrefix("bc-4-consensual"),

              s5Sefl: getValueByIdPrefix("bc-5-self"),
              s5Manager: getValueByIdPrefix("bc-5-manager"),
              s5Consensual: getValueByIdPrefix("bc-5-consensual"),

              s6Sefl: getValueByIdPrefix("bc-6-self"),
              s6Manager: getValueByIdPrefix("bc-6-manager"),
              s6Consensual: getValueByIdPrefix("bc-6-consensual"),

              s7Sefl: getValueByIdPrefix("bc-7-self"),
              s7Manager: getValueByIdPrefix("bc-7-manager"),
              s7Consensual: getValueByIdPrefix("bc-7-consensual"),

              s8Sefl: getValueByIdPrefix("bc-8-self"),
              s8Manager: getValueByIdPrefix("bc-8-manager"),
              s8Consensual: getValueByIdPrefix("bc-8-consensual"),

              averageSelf: avg(cSelf),
              averageManager: avg(cMgr),
              averageConsensual: avg(cCon),
              totalAverage: avg(cSelf.concat(cMgr, cCon))
            },

            collabarative: {
              s1Sefl: getValueByIdPrefix("bc-9-self"),
              s1Manager: getValueByIdPrefix("bc-9-manager"),
              s1Consensual: getValueByIdPrefix("bc-9-consensual"),

              s2Sefl: getValueByIdPrefix("bc-10-self"),
              s2Manager: getValueByIdPrefix("bc-10-manager"),
              s2Consensual: getValueByIdPrefix("bc-10-consensual"),

              s3Sefl: getValueByIdPrefix("bc-11-self"),
              s3Manager: getValueByIdPrefix("bc-11-manager"),
              s3Consensual: getValueByIdPrefix("bc-11-consensual"),

              s4Sefl: getValueByIdPrefix("bc-12-self"),
              s4Manager: getValueByIdPrefix("bc-12-manager"),
              s4Consensual: getValueByIdPrefix("bc-12-consensual"),

              s5Sefl: getValueByIdPrefix("bc-13-self"),
              s5Manager: getValueByIdPrefix("bc-13-manager"),
              s5Consensual: getValueByIdPrefix("bc-13-consensual"),

              averageSelf: avg(colSelf),
              averageManager: avg(colMgr),
              averageConsensual: avg(colCon),
              totalAverage: avg(colSelf.concat(colMgr, colCon))
            },

            creativity: {
              s1Sefl: getValueByIdPrefix("bc-14-self"),
              s1Manager: getValueByIdPrefix("bc-14-manager"),
              s1Consensual: getValueByIdPrefix("bc-14-consensual"),

              s2Sefl: getValueByIdPrefix("bc-15-self"),
              s2Manager: getValueByIdPrefix("bc-15-manager"),
              s2Consensual: getValueByIdPrefix("bc-15-consensual"),

              s3Sefl: getValueByIdPrefix("bc-16-self"),
              s3Manager: getValueByIdPrefix("bc-16-manager"),
              s3Consensual: getValueByIdPrefix("bc-16-consensual"),

              s4Sefl: getValueByIdPrefix("bc-17-self"),
              s4Manager: getValueByIdPrefix("bc-17-manager"),
              s4Consensual: getValueByIdPrefix("bc-17-consensual"),

              averageSelf: avg(crSelf),
              averageManager: avg(crMgr),
              averageConsensual: avg(crCon),
              totalAverage: avg(crSelf.concat(crMgr, crCon))
            }
          };
        }

        function n(v) {
          return parseFloat(v) || 0;
        }

        function saveLeadershipManagement() {

          const leadershippayloadData = collectLMCData_IdBased();

          const behaviorPayloadData = collectBehaviouralCapabilities();

          console.log(leadershippayloadData, behaviorPayloadData, "leadershippayloadData");


          const payload = {
            id: employeeExperianceId ? parseInt(employeeExperianceId) : null,
            "owner": parseInt($("#userPrincipal").val().trim()),
            "deptId": parseInt(userDepartemntIdValue),
            "totalSelf": $("#totalselfScore").text() ? parseFloat($("#totalselfScore").text()) : 0,
            "totalManager": $("#totalmanagerScore").text() ? parseFloat($("#totalmanagerScore").text()) : 0,
            "totalConsensual": $("#totalconsensualScore").text() ? parseFloat($("#totalconsensualScore").text()) : 0,
            "performanceFormValue": {
              "leadershippayloadData": leadershippayloadData,
              "behaviorPayloadData": behaviorPayloadData,
              personalDevelopmentPlan: {
                keyperformanceArea: document.getElementById("pdp_key_area").value || "",
                performanceGap: document.getElementById("pdp_gap").value || "",
                trainingIntervention: document.getElementById("pdp_training").value || "",
                intervention: document.getElementById("pdp_intervention").value || "",
                controlIntheIntern: document.getElementById("pdp_control").value || ""
              },
              "comments": document.getElementById("employeePerformanceComments").value || ""
            },

          }

          console.log("Payload to be sent:", payload);

          $.ajax({
            url: "/stratroom/employeePerformance",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(payload),
            success: function (response) {
              console.log("Success:", response);
              $.notify("Success: Leadership and Management saved successfully", {
                style: 'success',
                className: 'graynotify'
              });

              window.location.reload();
            },
            error: function (error) {
              console.error("Error:", error);
            }
          });
        }

        //Get retrievePerformanceFormList

        function retrievePerformanceFormList() {
          $.ajax({
            url: "/stratroom/retrievePerformanceFormList/" + parseInt($("#userPrincipal").val().trim()),
            type: "GET",
            contentType: "application/json",
            success: function (data, status) {
              employeeExperianceId = data[0]?.id || null;
              const LMCself1 = data[0]?.performanceFormValue?.leadershippayloadData?.financialManagement?.averageSelf || 0;
              const LMCSelf2 = data[0]?.performanceFormValue?.leadershippayloadData?.peopleManagement?.averageSelf || 0;
              const LMCself3 = data[0]?.performanceFormValue?.leadershippayloadData?.performanceMangement?.averageSelf || 0;
              const LMCSelfScore = (parseFloat(LMCself1) + parseFloat(LMCSelf2) + parseFloat(LMCself3)) / 3;
              console.log(LMCself1, LMCSelf2, LMCself3, LMCSelfScore, "LMCSelfScore");

              const LMCManager1 = data[0]?.performanceFormValue?.leadershippayloadData?.financialManagement?.averageManager || 0;
              const LMCManager2 = data[0]?.performanceFormValue?.leadershippayloadData?.peopleManagement?.averageManager || 0;
              const LMCManager3 = data[0]?.performanceFormValue?.leadershippayloadData?.performanceMangement?.averageManager || 0;
              const LMCManagerScore = (parseFloat(LMCManager1) + parseFloat(LMCManager2) + parseFloat(LMCManager3)) / 3;
              console.log(LMCManager1, LMCManager2, LMCManager3, LMCManagerScore, "LMCManagerScore");

              const LMCConsensual1 = data[0]?.performanceFormValue?.leadershippayloadData?.financialManagement?.averageConsensual || 0;
              const LMCConsensual2 = data[0]?.performanceFormValue?.leadershippayloadData?.peopleManagement?.averageConsensual || 0;
              const LMCConsensual3 = data[0]?.performanceFormValue?.leadershippayloadData?.performanceMangement?.averageConsensual || 0;
              const LMCConsensualScore = (parseFloat(LMCConsensual1) + parseFloat(LMCConsensual2) + parseFloat(LMCConsensual3)) / 3;
              console.log(LMCConsensual1, LMCConsensual2, LMCConsensual3, LMCConsensualScore, "LMCConsensualScore");

              const totalLMCScore = LMCSelfScore + LMCManagerScore + LMCConsensualScore;
              console.log("Total LMC Score:", totalLMCScore);

              $("#LMCScore").text(totalLMCScore.toFixed(2));

              //Bc Scores
              const BCself1 = data[0]?.performanceFormValue?.behaviorPayloadData?.care?.averageSelf || 0;
              const BCself2 = data[0]?.performanceFormValue?.behaviorPayloadData?.collabarative?.averageSelf || 0;
              const BCself3 = data[0]?.performanceFormValue?.behaviorPayloadData?.creativity?.averageSelf || 0;
              const BCselfScore = (parseFloat(BCself1) + parseFloat(BCself2) + parseFloat(BCself3)) / 3;
              console.log(BCself1, BCself2, BCself3, BCselfScore, "BCSelfScore");

              const BCManager1 = data[0]?.performanceFormValue?.behaviorPayloadData?.care?.averageManager || 0;
              const BCManager2 = data[0]?.performanceFormValue?.behaviorPayloadData?.collabarative?.averageManager || 0;
              const BCManager3 = data[0]?.performanceFormValue?.behaviorPayloadData?.creativity?.averageManager || 0;
              const BCManagerScore = (parseFloat(BCManager1) + parseFloat(BCManager2) + parseFloat(BCManager3)) / 3;
              console.log(BCManager1, BCManager2, BCManager3, BCManagerScore, "BCManagerScore");

              const BCConsensual1 = data[0]?.performanceFormValue?.behaviorPayloadData?.care?.averageConsensual || 0;
              const BCConsensual2 = data[0]?.performanceFormValue?.behaviorPayloadData?.collabarative?.averageConsensual || 0;
              const BCConsensual3 = data[0]?.performanceFormValue?.behaviorPayloadData?.creativity?.averageConsensual || 0;
              const BCConsensualScore = (parseFloat(BCConsensual1) + parseFloat(BCConsensual2) + parseFloat(BCConsensual3)) / 3;
              console.log(BCConsensual1, BCConsensual2, BCConsensual3, BCConsensualScore, "BCConsensualScore");

              const totalBcScore = BCselfScore + BCManagerScore + BCConsensualScore;
              console.log("Total Bc Score:", totalBcScore);

              $("#BCScore").text(totalBcScore.toFixed(2));


              prefillLmcTable(data[0]?.performanceFormValue || {});

              prefillBcTable(data[0]?.performanceFormValue || {});

              // PDP Prefill
              $("#pdp_key_area").val(data[0]?.performanceFormValue?.personalDevelopmentPlan?.keyperformanceArea || "");
              $("#pdp_gap").val(data[0]?.performanceFormValue?.personalDevelopmentPlan?.performanceGap || "");
              $("#pdp_training").val(data[0]?.performanceFormValue?.personalDevelopmentPlan?.trainingIntervention || "");
              $("#pdp_intervention").val(data[0]?.performanceFormValue?.personalDevelopmentPlan?.intervention || "");
              $("#pdp_control").val(data[0]?.performanceFormValue?.personalDevelopmentPlan?.controlIntheIntern || "");

              //total scores
              $("#totalScoreData").text(data[0]?.totalSelf || 0 + data[0]?.totalManager || 0 + data[0]?.totalConsensual || 0);
              $("#totalselfScore").text(data[0]?.totalSelf || 0);
              $("#totalmanagerScore").text(data[0]?.totalManager || 0);
              $("#totalconsensualScore").text(data[0]?.totalConsensual || 0);

              $("#employeePerformanceComments").val(data[0]?.performanceFormValue?.comments || "");


            },
            error: function (error) {
              console.error("Error:", error);
            }
          });
        }


        function prefillLmcTable(data) {

          console.log(data, "prefillData");
          // PERFORMANCE MANAGEMENT
          checkRadio("lmc-1-self", data?.leadershippayloadData?.performanceMangement?.s1Sefl);
          checkRadio("kpi-1-manager", data?.leadershippayloadData?.performanceMangement?.s1Manager);
          checkRadio("kpi-1-consensual", data?.leadershippayloadData?.performanceMangement?.s1Consensual);

          checkRadio("lmc-2-self", data?.leadershippayloadData?.performanceMangement?.s2Sefl);
          checkRadio("kpi-2-manager", data?.leadershippayloadData?.performanceMangement?.s2Manager);
          checkRadio("kpi-2-consensual", data?.leadershippayloadData?.performanceMangement?.s2Consensual);

          checkRadio("lmc-3-self", data?.leadershippayloadData?.performanceMangement?.s3Sefl);
          checkRadio("kpi-3-manager", data?.leadershippayloadData?.performanceMangement?.s3Manager);
          checkRadio("kpi-3-consensual", data?.leadershippayloadData?.performanceMangement?.s3Consensual);

          checkRadio("lmc-4-self", data?.leadershippayloadData?.performanceMangement?.s4Sefl);
          checkRadio("kpi-4-manager", data?.leadershippayloadData?.performanceMangement?.s4Manager);
          checkRadio("kpi-4-consensual", data?.leadershippayloadData?.performanceMangement?.s4Consensual);
          // PEOPLE MANAGEMENT
          checkRadio("lmc-5-self", data?.leadershippayloadData?.peopleManagement?.s1Sefl);
          checkRadio("kpi-5-manager", data?.leadershippayloadData?.peopleManagement?.s1Manager);
          checkRadio("kpi-5-consensual", data?.leadershippayloadData?.peopleManagement?.s1Consensual);
          // FINANCIAL MANAGEMENT
          checkRadio("lmc-6-self", data?.leadershippayloadData?.financialManagement?.s1Sefl);
          checkRadio("kpi-6-manager", data?.leadershippayloadData?.financialManagement?.s1Manager);
          checkRadio("kpi-7-consensual", data?.leadershippayloadData?.financialManagement?.s1Consensual);
        };


        function prefillBcTable(data) {
          console.log(data, "prefillDataBC");

          // CARE
          checkRadio("bc-1-self", data?.behaviorPayloadData?.care?.s1Sefl);
          checkRadio("bc-1-manager", data?.behaviorPayloadData?.care?.s1Manager);
          checkRadio("bc-1-consensual", data?.behaviorPayloadData?.care?.s1Consensual);

          checkRadio("bc-2-self", data?.behaviorPayloadData?.care?.s2Sefl);
          checkRadio("bc-2-manager", data?.behaviorPayloadData?.care?.s2Manager);
          checkRadio("bc-2-consensual", data?.behaviorPayloadData?.care?.s2Consensual);

          checkRadio("bc-3-self", data?.behaviorPayloadData?.care?.s3Sefl);
          checkRadio("bc-3-manager", data?.behaviorPayloadData?.care?.s3Manager);
          checkRadio("bc-3-consensual", data?.behaviorPayloadData?.care?.s3Consensual);

          checkRadio("bc-4-self", data?.behaviorPayloadData?.care?.s4Sefl);
          checkRadio("bc-4-manager", data?.behaviorPayloadData?.care?.s4Manager);
          checkRadio("bc-4-consensual", data?.behaviorPayloadData?.care?.s4Consensual);

          checkRadio("bc-5-self", data?.behaviorPayloadData?.care?.s5Sefl);
          checkRadio("bc-5-manager", data?.behaviorPayloadData?.care?.s5Manager);
          checkRadio("bc-5-consensual", data?.behaviorPayloadData?.care?.s5Consensual);

          checkRadio("bc-6-self", data?.behaviorPayloadData?.care?.s6Sefl);
          checkRadio("bc-6-manager", data?.behaviorPayloadData?.care?.s6Manager);
          checkRadio("bc-6-consensual", data?.behaviorPayloadData?.care?.s6Consensual);

          checkRadio("bc-7-self", data?.behaviorPayloadData?.care?.s7Sefl);
          checkRadio("bc-7-manager", data?.behaviorPayloadData?.care?.s7Manager);
          checkRadio("bc-7-consensual", data?.behaviorPayloadData?.care?.s7Consensual);

          checkRadio("bc-8-self", data?.behaviorPayloadData?.care?.s8Sefl);
          checkRadio("bc-8-manager", data?.behaviorPayloadData?.care?.s8Manager);
          checkRadio("bc-8-consensual", data?.behaviorPayloadData?.care?.s8Consensual);

          // COLLABARATIVE
          checkRadio("bc-9-self", data?.behaviorPayloadData?.collabarative?.s1Sefl);
          checkRadio("bc-9-manager", data?.behaviorPayloadData?.collabarative?.s1Manager);
          checkRadio("bc-9-consensual", data?.behaviorPayloadData?.collabarative?.s1Consensual);
          checkRadio("bc-10-self", data?.behaviorPayloadData?.collabarative?.s2Sefl);
          checkRadio("bc-10-manager", data?.behaviorPayloadData?.collabarative?.s2Manager);
          checkRadio("bc-10-consensual", data?.behaviorPayloadData?.collabarative?.s2Consensual);
          checkRadio("bc-11-self", data?.behaviorPayloadData?.collabarative?.s3Sefl);
          checkRadio("bc-11-manager", data?.behaviorPayloadData?.collabarative?.s3Manager);
          checkRadio("bc-11-consensual", data?.behaviorPayloadData?.collabarative?.s3Consensual);
          checkRadio("bc-12-self", data?.behaviorPayloadData?.collabarative?.s4Sefl);
          checkRadio("bc-12-manager", data?.behaviorPayloadData?.collabarative?.s4Manager);
          checkRadio("bc-12-consensual", data?.behaviorPayloadData?.collabarative?.s4Consensual);
          checkRadio("bc-13-self", data?.behaviorPayloadData?.collabarative?.s5Sefl);
          checkRadio("bc-13-manager", data?.behaviorPayloadData?.collabarative?.s5Manager);
          checkRadio("bc-13-consensual", data?.behaviorPayloadData?.collabarative?.s5Consensual);

          // CREATIVITY
          checkRadio("bc-14-self", data?.behaviorPayloadData?.creativity?.s1Sefl);
          checkRadio("bc-14-manager", data?.behaviorPayloadData?.creativity?.s1Manager);
          checkRadio("bc-14-consensual", data?.behaviorPayloadData?.creativity?.s1Consensual);
          checkRadio("bc-15-self", data?.behaviorPayloadData?.creativity?.s2Sefl);
          checkRadio("bc-15-manager", data?.behaviorPayloadData?.creativity?.s2Manager);
          checkRadio("bc-15-consensual", data?.behaviorPayloadData?.creativity?.s2Consensual);
          checkRadio("bc-16-self", data?.behaviorPayloadData?.creativity?.s3Sefl);
          checkRadio("bc-16-manager", data?.behaviorPayloadData?.creativity?.s3Manager);
          checkRadio("bc-16-consensual", data?.behaviorPayloadData?.creativity?.s3Consensual);
          checkRadio("bc-17-self", data?.behaviorPayloadData?.creativity?.s4Sefl);
          checkRadio("bc-17-manager", data?.behaviorPayloadData?.creativity?.s4Manager);
          checkRadio("bc-17-consensual", data?.behaviorPayloadData?.creativity?.s4Consensual);
        }


        function checkRadio(prefix, value) {
          if (!value) return;

          var radio = document.getElementById(prefix + "-" + value);
          if (radio) {
            radio.checked = true;
          }
        }



        retrievePerformanceFormList();



      </script>

      <script>
        /* ===============================
           GLOBAL TOTAL HOLDERS
        ================================ */
        var lmcSelf = 0, lmcMgr = 0, lmcCon = 0;
        var bcSelf = 0, bcMgr = 0, bcCon = 0;

        /* ===============================
           CALCULATE TABLE TOTALS
        ================================ */
        function calculateTableTotals(tableId) {
          var table = document.getElementById(tableId);
          if (!table) return null;

          var selfTotal = 0;
          var managerTotal = 0;
          var consensualTotal = 0;

          table
            .querySelectorAll('input[type="radio"]:checked')
            .forEach(function (r) {
              var value = parseInt(r.value) || 0;
              var name = r.name || "";

              if (name.indexOf("-self") !== -1) {
                selfTotal += value;
              } else if (name.indexOf("-manager") !== -1) {
                managerTotal += value;
              } else if (name.indexOf("-consensual") !== -1) {
                consensualTotal += value;
              }
            });

          return {
            self: selfTotal,
            manager: managerTotal,
            consensual: consensualTotal
          };
        }

        /* ===============================
           CHANGE HANDLER (ALL TABLES)
        ================================ */
        document.addEventListener("change", function (e) {

          var radio = e.target.closest('table input[type="radio"]');
          if (!radio) return;

          var table = radio.closest("table");
          if (!table || !table.id) return;


          var totals = calculateTableTotals("lmcTable");
          if (!totals) return;

          lmcSelf = totals.self;
          lmcMgr = totals.manager;
          lmcCon = totals.consensual;

          console.log("LMC Self:", lmcSelf);
          console.log("LMC Manager:", lmcMgr);
          console.log("LMC Consensual:", lmcCon);



          var totals2 = calculateTableTotals("bcTable");
          if (!totals2) return;

          bcSelf = totals2.self;
          bcMgr = totals2.manager;
          bcCon = totals2.consensual;

          console.log("BC Self:", bcSelf);
          console.log("BC Manager:", bcMgr);
          console.log("BC Consensual:", bcCon);




          const totalSelfScore = lmcSelf + bcSelf;
          const totalManagerScore = lmcMgr + bcMgr;
          const totalConsensualScore = lmcCon + bcCon;
          const grandTotalScore = totalSelfScore + totalManagerScore + totalConsensualScore;

          $("#totalselfScore").text(totalSelfScore);
          $("#totalmanagerScore").text(totalManagerScore);
          $("#totalconsensualScore").text(totalConsensualScore);
          $("#totalScoreData").text(grandTotalScore);
        });
      </script>






    </body>