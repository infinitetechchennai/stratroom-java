<style>
  th {
  text-transform: uppercase;
  width: 55%;
}
td{
  text-align: center;
}
</style>
<script id="initiativedetail-template" type="text/x-handlebars-template">

 <div class="card-header accordion-header flex-wrap">
                <div class="c-header-left kpi_details-title-box flex-nowrap">
                  <div class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  </div>

                  <div class="user-card">
                    <div class="user-image user-image-sm user-active">
                      <img id="initiatieProfile" {{{Owner}}} alt="user" width="24" height="24">
                    </div>
                  </div>

                  <h5 class="card-title me-auto">
                   
                    <strong editable="true" contenteditable="true"
                    onkeypress="return (this.innerText.length <= 36)">{{title}}</strong>
                  </h5>

                </div>
                <div class="card-actions justify-content-end">
                 {{{initiativeParentEditBtn}}}
                 {{{initiativeParentuploadBtn}}}
                 {{{initiativeParentviewBtn}}}
                  <!-- <span type="button" class="btn btn-sm btn-icon" id="popoverFilter">
                    <i data-lucide="eye" style="width: 14px; height: 14px;" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View"></i>
                  </span> -->
                {{{initiativeParentDeleteBtn}}}
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
                              <td>{{userDept}}</td>
                            </tr>
                            <tr>
                              <th>Initiative ID</th>
                              <td>{{id}}</td>
                              <input type="hidden" name="parentinitiativeId" value="{{id}}">
                            </tr>

                            <tr>
                              <th>Progress
                              </th>
                              <td>
                                <div class="pt-1 bar-chart">
                                  <div class="progress-wrap red">
                                       <div class="progress-s progress">
                                        <div id="progressbar" class="{{statusLight}}" role="progressbar" aria-valuenow="{{progressval}}" aria-valuemin="0" aria-valuemax="100" style="width:{{progressval}}%">
                                        </div>
<div id="initative_ID" style="display: none;">{{id}}</div>
                                    </div>
                                    <span class="badge">{{progressvalpercent}}</span>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr>
                              <th>Start Date
                              </th>
                              <td>
                                {{{startDateFormatted}}}
                              </td>
                            </tr>
                            <tr>
                              <th>End by
                              </th>
                              <td>
                                {{{endDateFormatted}}}
                              </td>
                            </tr>
                            <tr>
                              <th>Remaining</th>
                              <td>
                                 {{{diffdays}}}
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
                              <th>Status</th>
                              <td>
                                <span class="icon">{{initiativeStatus}}</span>
                              </td>
                            </tr>
                            <tr>
                              <th>Reaction</th>
                              <td>
                                <p class="mb-0">
                                  {{{initiativeReaction}}}</i>
                                </p>
                              </td>
                            </tr>

                            <tr>
                              <th width="40%">Perspective</th>
                              <td>{{perspectiveName}}</td>
                            </tr>
                            <tr>
                              <th width="40%">Objective</th>
                              <td>{{{objectiveDesc}}}</td>
                            </tr>
                            
                           <tr>
  <th width="40%">Impact-KPI</th>
  <td>
    {{#each impactDesc}}
      <span class="badge label-bg-dark me-1">{{this}}</span>
    {{/each}}
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
                              <th width="40%">Total Asset Budget</th>
                              <td>{{{totalassetbudgetdatafield}}}</td>
                            </tr>
                            <tr>
                              <th>Total Asset Realization</th>
                              <td>{{{totalRealizationzAssetdatafield}}}</td>
                            </tr>
                            <tr>
                              <th>Total Liabilities Budget</th>
                              <td>{{{totalLiabilitiesBudgetdatafield}}}</td>
                            </tr>
                            <tr>
                              <th>Total Liabilities Realization</th>
                              <td>{{{totalRealizationLiabilitiesdatafield}}}</td>
                            </tr>
                            <tr>
                              <th>Total Budget</th>
                              <td>{{{totalBudgetdatafield}}}</td>
                            </tr>
                            <tr>
                              <th>Total Budget Realization</th>
                              <td>{{{totalRealizationBudgetdatafield}}}</td>
                            </tr>
                            <tr>
                              <th>Total Asset Realization %</th>
                              <td>{{{totalAssetBudgetRealization_percentdatafield}}}</td>
                            </tr>
                            <tr>
                              <th>Total Liabilities Realization %</th>
                              <td>{{{totalLiabilitiesRealization_percentdatafield}}}</td>
                            </tr>
                            <tr>
                              <th>Total Budget Realization % </th>
                              <td>{{{totalBudgetRealization_percentdatafield}}}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                   
                  </div>
                </div>

              </div>
                            
 </script>
                            