<!-- <script id="kpi-template" type="x-tmpl-mustache">
	<div class="row card-full-div">
                    <div class="col-auto pr-0 pt-3">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input class="form-check-input kpilistdata" id="kpilistdataid_{{id}}" type="checkbox" value="{{id}}" {{kpichecked}}/>
                          <span class="form-check-sign">
                            <span class="check"></span>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card {{highlight}} kpiitem" onclick="openKPIAdd('{{id}}','edit')" id="kpihigh_{{id}}">
                        <div class="row">
                          <div class="col-10">
                            <div class="line-shortner name pull-left">
                              <span>{{name}}</span>
                            </div>
                          </div>
                          <div class="col-2">
                            <div class="period pull-right">
                              <span>{{kpi_measurement}}</span>
                            </div>
                          </div>
                        </div>
                        <div class="row" style="padding-top: 12px;margin-bottom: -10px !important;">
                          <div class="col-6">
                            <div class="target pull-left">
                              <span> <strong>Target: </strong>{{target}}</span>
                            </div>
                          </div>
                          <div class="col-6">
                            <div class="owner pull-right" style="padding-right: 12px">
                              <ul class="list-unstyled order-list">
                                <li class="avatar avatar-sm">
                                  <img {{{Owner}}} alt="user" />
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
</script> -->


  <script id="kpi-template" type="x-tmpl-mustache">
    <li class="nested-item non-draggable">
        <div class="caret"></div>
        <div class="card strategy-box parent {{highlight}} kpiitem" id="kpihigh_{{id}}" onclick="openKPIAdd('{{id}}','edit')">
            <div class="strategy-section">
                <div class="strategy-content">
                    <div class="icon">
                        <img src="assets/images/icons/kpi-i.svg" width="16" height="16">
                    </div>
                    <div class="content">
                        <div class="d-flex flex-column gap-1">
                            <p class="strategy-label">
                                <input class="form-check-input kpilistdata" id="kpilistdataid_{{id}}" 
                                    type="checkbox" value="{{id}}" {{kpichecked}} style="margin-right: 5px;"/>
                                <strong>{{name}}</strong> - {{kpi_measurement}}
                            </p>
                            <p class="strategy-label"><strong>Target</strong> - {{target}}</p>
                        </div>
                    </div>
                </div>
                <div class="strategy-action">
                    <ul class="list-unstyled action-list">
                        <li>
                            <a href="#add-sub-kpi" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip"
                                    data-bs-placement="bottom"
                                    data-bs-title="Add Sub-KPI">
                                    <i class="fas fa-plus title_edit_icon"></i>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#edit-sub-kpi" data-bs-toggle="modal" onclick="openKPIAdd('{{id}}','edit')">
                                <span class="icon" data-bs-toggle="tooltip"
                                    data-bs-placement="bottom"
                                    data-bs-title="Edit Sub-KPI">
                                    <img src="assets/images/icons/edit-i.svg"
                                        width="8" height="8" />
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="#delete-modal" data-bs-toggle="modal">
                                <span class="icon" data-bs-toggle="tooltip"
                                    data-bs-placement="bottom"
                                    data-bs-title="Delete">
                                    <img src="assets/images/icons/delete-i.svg"
                                        width="12" height="12" />
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </li>
  </script>