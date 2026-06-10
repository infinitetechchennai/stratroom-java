  <script id="formulationdetail-template" type="text/x-handlebars-template">
        
    <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; gap: 0.25rem;">
  <div class="c-header-left" style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: nowrap;">
      <h5 class="card-title m-0">
          <strong>{{title}}</strong>
      </h5>
      <span class="badge text-{{badgeClass planType}} rounded-pill" style="display: inline-flex; align-items: center;">
         {{planType}}
      </span>
  </div>
  <div class="card-actions" style="display: flex; align-items: center; column-gap: 0.25rem;">
      <div class="dropdown">
           <button type="button" class="btn btn-sm btn-icon" data-bs-toggle="modal"
                            data-bs-target="#add-prespective" style="width: 28px; height: 22px; background-color: white">
                            <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add">
                                <i class="fas fa-plus title_edit_icon"></i>
                            </span>
                        </button>
          <button class="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown"
              aria-expanded="true" style="width: 28px; height: 22px; background-color: white">
              <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom"
                  data-bs-title="More">
                  <img width="16" height="16" src="images/menu-dot-vertical-i.svg">
              </span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end border-0 shadow">
              <li>
                  <a class="dropdown-item" href="#cause_conq_view_popup"
                      data-bs-toggle="modal" data-translate="View">{{{viewHeader}}}</a>
              </li>
              <li>
                  <a class="dropdown-item" href="#" onclick="return false;" data-translate="Delete">{{{deleteHeader}}}</a>
              </li>
          </ul>
      </div>
  </div>
</div>



  <div class="card-header custom-card-column bg-white" style="--stratroom-card-border-color: rgba(var(--stratroom-black-rgb), 0.2);">
      <div class="card-header-form">
          <div class="form-group">
              <label class="form-label" data-translate="Department">{{{departmentHeader}}}</label>
              <p class="form-control-plaintext">{{dept}}</p>
          </div>

          <div class="form-group">
              <label class="form-label" data-translate="Start/End Date">{{{StartEndDate}}}</label>
              <p class="form-control-plaintext">{{startDate}} - {{endDate}}</p>
          </div>
          <div class="form-group">
              <label class="form-label" data-translate="Plan Type">{{{planTypeHeader}}}</label>
              <p class="form-control-plaintext">{{planType}}</p>
          </div>

          <div class="form-group">
              <label class="form-label" data-translate="Formulation Team" data-translate="Formulation Team">{{{formulationTeamHeader}}}</label>

              <div class="d-flex align-items-start justify-content-center">
                  <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                    {{{resultPorfileContent}}}
                  </ul>
                </div>
             
          </div>
          <div class="form-group">
              <label class="form-label" data-translate="Approved By">{{{approvedByHeader}}}</label>

              <div class="d-flex align-items-start justify-content-center">
                  <ul class="list-unstyled d-flex align-items-center avatar-group mb-0">
                    {{{approvedUserlogo}}}
                  </ul>
                </div>
              
          </div>

      </div>



  </div>
    <!-- <div class="card" style="padding: 12px 16px">
              <div class="row">
                <div class="col-12">
                  <div class="heading">
                    <h6 style="margin-bottom: -4px">
                      {{title}}{{{deleteicon}}}
                    </h6>
                  </div>
                  <hr style="border-top: 2px solid #e9ecef" />
                  <div class="header-content" style="margin-top: -4px; margin-bottom: -20px">
                    <ul>
                      <li>
                        <strong data-i18n="Department">Department(s)</strong>
                        <p>{{dept}}</p>
                      </li>
                      <li>
                        <strong>Start Date</strong>
                        <p>{{startDate}}</p>
                      </li>
                      <li>
                        <strong>End Date</strong>
                        <p>{{endDate}}</p>
                      </li>
                      <li>
                        <strong>Plan Type</strong>
                        <p>{{planType}}</p>
                      </li>
                      <li>
                        <strong>Formulation Team</strong>
                        <span>
                          <ul class="list-unstyled order-list">
                          {{{resultPorfileContent}}}
                          </ul>
                        </span>
                      </li>
                      <li>
                        <strong>Approved By</strong>
                        <span>
                          <ul class="list-unstyled order-list">
                            {{{approvedUserlogo}}}
                          </ul>
                        </span>
                      </li>
                      <li>
                        <strong>Approved Date</strong>
                        <p>{{approvedDate}}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> -->
 </script>