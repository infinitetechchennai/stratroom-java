<script id="riskdetail-template" type="text/x-handlebars-template">
<div class="card-header accordion-header flex-wrap">
                        <div class="c-header-left kpi_details-title-box flex-nowrap">
                          <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          </div>
        
                          <div class="user-card">
                            <div class="user-image user-image-sm user-active">
                              <img {{{Owner}}} alt="User" width="24" height="24">
                            </div>
                          </div>
        
                          <h5 class="card-title me-auto">
                            <strong class="editableTxt1">{{title}}</strong>
                          </h5>
        
                        </div>
                        <div class="card-actions justify-content-end">
                          <div class="heat-map">

                                    <select id="heatmapselect" name="" class="form-select form-select-sm" onchange="getRiskVersion()">
                                        <option value="" selected disabled>Select Version</option>
                                        
                                    </select>
                                </div>
                                <button type="button" class="btn btn-sm btn-icon" onclick="sendApproval()" >
                                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Approval">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="check" style="width: 14px; height: 14px;" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"></path></svg>
                                </span>
                              </button>
                              {{{editicon}}}	
                               <span data-bs-toggle="modal" data-bs-target=".file_upload_popupattachment" class="btn btn-sm btn-icon">
                            <i class="fas fa-paperclip title_edit_icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                              title="File Upload"></i>
                          </span>
                        		
									             {{{viewiconpreference}}}

                                 <a href="#" onclick="generateRiskPDF()" data-bs-toggle="tooltip" data-bs-placement="bottom"
                        data-bs-title="Generate Report" class="btn btn-sm btn-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="file-text" style="width: 16px; height: 16px;" class="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
                    </a>
                         
                          <div class="dropdown">
                            <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="more-vertical" style="width: 14px; height: 14px;" class="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
                              <li>
                                <a class="dropdown-item" href="#">Download</a>
                              </li>
                             <li>
    <a class="dropdown-item" href="#" onclick="deleteRiskDetail({{ogId}})">Delete</a>
</li>
                            </ul>
                          </div>
                        </div>
        
                      </div>
                        <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                          <div class="grid gap-2">
                              <div class="g-col-12 g-col-md-4">
                              <div class="table-responsive h-100">
                                <table class="table table-sm table-lefth table-bordered text-center mb-0 align-middle h-100">
                                  <tbody>
                                    <tr>
                                      <th width="40%">Department</th>
                                      <td>{{dept}}</td>
                                  </tr>
                                  <tr>
                                      <th>Related Parties</th>
                                      <td id="initative_ID">{{relatedparties}}</td>
                                  </tr>
                                  <tr>
                                      <th>Risk Category</th>
                                      <td>{{riskcategory}}</td>
                                  </tr>
                                  <tr>
    <th>
        <p class="m-0 p-0 i-alert">
            <strong>Inherent Risk Score</strong>
            <span class="icon" id="popoverInherentRS" onclick="togglePopup('riskPopupInherent')">
                <img src="/stratroom/images/info-i.svg" />
            </span>
            
            <!-- THE POPUP CONTENT (Hidden by default) -->
            <div id="riskPopupInherent" class="custom-popup" style="display:none; position:absolute; background:white; border:1px solid #ccc; padding:10px; z-index:1000; width:300px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <div>
          <div class="d-flex justify-content-between gap-3 mb-3 align-items-center">
     <h5 class="h6 mb-0">Risk Score Key</h5>
     <!-- <button type="button" class="btn-close" aria-label="Close"></button> -->
   </div>
        <table class="table table-sm border mb-0 w-100">
  <tbody>
    <tr>
      <th>Tidak Signifikan</th>
      <td width="30">1</td>
      <th>Hampir Pernah Terjadi</th>
      <td width="30">A</td>
    </tr>
    <tr>
      <th>Ringan</th>
      <td width="30">2</td>
      <th>Sangat Jarang</th>
      <td width="30">B</td>
    </tr>
    <tr>
      <th>Moderat</th>
      <td width="30">3</td>
      <th>Jarang</th>
      <td width="30">C</td>
    </tr>
    <tr>
      <th>Berat</th>
      <td width="30">4</td>
      <th>Sering</th>
      <td width="30">D</td>
    </tr>
    <tr>
      <th>Fatal</th>
      <td width="30">5</td>
      <th>Sangat Sering</th>
      <td width="30">E</td>
    </tr>
  </tbody>
</table></div>
            </div>
        </p>
    </th>
    <td>{{inherentscore}}</td>
</tr>
                                  <tr>
                                      <th>
                                          <p class="i-alert">
                                              <strong>Residual Risk Score</strong>
                                              <span class="icon" id="popoverResidualRS"><img
                                                      src="/stratroom/images/info-i.svg" /></span>
                                          </p>
                                      </th>
                                      <td>{{residualscore}}</td>
                                  </tr>
                                   <tr>
                                      <th>Version</th>
                                      <td>{{version}}</td>
                                  </tr>
                                  <tr>
                                      <th>Risk Level</th>
                                      <td>{{riskStatus}}</td>
                                  </tr>
                                  <tr>
                                      <th>Risk Code</th>
                                      <td>{{id}}</td>
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
                                      <th>Date Raised</th>
                                      <td>{{ch_dateRaised}}</td>
                                  </tr>
                                  <tr>
                                      <th>KPI</th>
<td>
  {{#each impactDesc}}
    <span class="badge label-bg-indigo me-1">{{this}}</span>
  {{/each}}
</td>

                                  </tr>
                                  <tr>
                                      <th>Financial Impact
                                      </th>
                                      <td>
  <div class="d-flex justify-content-center gap-1 flex-wrap">
    <span class="badge label-bg-indigo">{{financialImpact}}</span>
  </div>
</td>

                                  </tr>
                                  <tr>
                                      <th>Next Assessment</th>
                                      <td>{{{ch_nextAssessment}}}</td>
                                  </tr>
                                  <tr>
                                      <th>Date Completed</th>
                                      <td>{{ch_dateCompleted}}</td>
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
                                      <th>POS</th>
                                      <td>{{{riskposval}}}
                                      </td>
                                  </tr>
                                  <tr>
                                      <th>ISO</th>
                                      <td>{{riskisoval}}</td>
                                  </tr>
                                  <tr>
                                      <th>Information Asset
                                      </th>
                                     <td>
  <div class="d-flex justify-content-center gap-1 flex-wrap">
    <span class="badge label-bg-orange">{{{riskinformationassetval}}}</span>
  </div>
</td>

                                  </tr>
                                  <tr>
                                      <th>Others</th>
                                      <td>{{{riskothersval}}}</td>
                                  </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                           
                          </div>
                        </div>      
                      </div>
 </script>