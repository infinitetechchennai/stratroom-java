<script id="kpiDetailsViewTemplate" type="text/x-handlebars-template">
 <div class="card custom-card kpi_page_details accordion-item">
              <div class="card-header accordion-header flex-wrap">                
                  <div class="c-header-left kpi_details-title-box flex-nowrap">
                    <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    </div>

                    <div class="user-card">
                      <div class="user-image user-image-sm user-active">
                        <img {{{Owner}}} alt="George" width="24" height="24">
                      </div>
                    </div>
                   
                    <h5 class="card-title me-auto">
                      <strong class="editableTxt1">{{name}}</strong>
                    </h5>

                  </div>
                   
              								        
                  <div class="card-actions justify-content-end">
                   {{{kpiParentEditBtn}}}
                   {{{kpiParentuploadBtn}}}
                    {{{kpiParentviewBtn}}}

                    <div class="dropdown">
                      <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <img width="16" height="16" src="/stratroom/images/menu-dot-vertical-i.svg">
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                        <li>
                          <a class="dropdown-item" href="#">Download</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">Delete</a>
                        </li>
                      </ul>
                    </div>
                  </div>
               
              </div>
              <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent=".accordionExample">
                <div class="accordion-body">
                  <div class="grid gap-2">
                    <div class="g-col-12 g-col-md-4">
                      <div class="table-responsive h-100">
                        <table class="table table-sm table-lefth table-bordered text-center mb-0 align-middle h-100">
                          <tbody>                            
                            <tr>
                              <th width="40%">Department</th>
                              <td>{{userDept}}</td>
                            </tr>
                            <tr>
                              <th>KPI ID</th>
                              <td>{{kpiId}}</td>
                            </tr>
                            <tr>
                              <th>Threshold</th>
                              <td>
                                <div class="d-flex flex-wrap justify-content-center gap-2">
                                  <span>
                                  <span class="icon"><img src="/stratroom/images/buzzer-red-i.svg" width="16" height="16" /></span> &lt;=
                                </span>
                                <span>
                                  <span class="icon"><img src="/stratroom/images/buzzer-yellow-i.svg" width="16" height="16" /></span> &gt;=
                                </span>
                                <span>
                                  <span class="icon"><img src="/stratroom/images/buzzer-green-i.svg" width="16" height="16" /></span>&gt;=
                                </span>

                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="g-col-12 g-col-md-4">
                      <div class="table-responsive h-100">
                        <table class="table table-sm table-lefth table-bordered text-center mb-0 align-middle h-100">
                          <tbody>

                            <tr>
                              <th width="40%">Frequency</th>
                              <td>{{period}}</td>
                            </tr>
                            <tr>
                              <th>Status</th>
                              <td>
                             {{statusLight}}
                              </td>
                            </tr>
                            <tr>
                              <th>Trend</th>
                              <td>
                               {{trend}}
                              </td>
                            </tr>
                            <tr>
                              <th>Risk</th>
                              <td>
                                {{{riskStatusLight}}}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="g-col-12 g-col-md-4">
                      <div class="table-responsive h-100">
                        <table class="table table-sm table-lefth table-bordered text-center mb-0 align-middle h-100">
                          <tbody>
                            <tr>
                              <th width="40%">Actual</th>
                              <td>{{actual}}</td>
                            </tr>
                            <tr>
                              <th>Target</th>
                              <td>{{target}}</td>
                            </tr>
                            <tr>
                              <th>Budget</th>
                              <td>{{budget}}</td>
                            </tr>
                            <tr>
                              <th>Forecast</th>
                              <td>{{forecast}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
   </script>
                       
                            