<!-- <script id="formulation-template" type="text/x-handlebars-template">
     	<div class="d-flex flex-column sub_initiative_sidebar_details {{initiativeSidebarHighLight}} sidebarriskid_{{id}}"
              onclick="openStrategyAdd({{id}},'edit')">
              <div class="d-flex flex-row p-b-5">
                <div class="flex-column profile_image">
                  <img {{{Owner}}} alt="User" width="25"/>
                </div>
                <div class="d-flex flex-column profile_content">
                  <p>{{intiative_content}}</p>
                </div>
              </div>
              <div class="flex-row justify-content-between m-t--10">
                <div class="flex-column ini_side_depart_bar">
                  <div class="employee_info" data-i18n="Department">Department(s)</div>
                  <p>{{formulationDept}}</p>
                </div>
              </div>
            </div>
</script> -->

<script id="formulation-template" type="text/x-handlebars-template">
  
  <div class="d-grid gap-2" style="padding-bottom: 10px;">
    <div
      class="card card-widget card-plan sidebarriskid_{{id}}"
       onclick="openStrategyAdd({{id}},'card')"
    >
      <div class="card-header">
        <div class="avatar">
          <img {{{Owner}}} alt="User" width="18" height="18" />
        </div>

        <div class="d-flex gap-1 align-items-center ms-auto">
          {{#if startDate}}
            <span class="text-muted period">{{startDate}}</span>
          {{/if}}
          <div class="card-actions">
            <a
             
              class="btn btn-sm btn-outline-icon border-0"
              data-bs-toggle="modal"
            >
              <span
                class="icon hover-effect"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                data-bs-title="Edit Strategic plan"
                onclick="openStrategyAdd({{id}},'edit')"
              >
                <img
                  src="images/edit-i.svg"
                  width="12"
                  height="12"
                  alt="edit"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
      <div class="card-body">
        <h4 class="card-title mb-1">{{intiative_content}}</h4>
        <p class="card-label mb-1" data-translate="Department">{{departmentHeader}} -
          <strong>{{formulationDept}}</strong></p>
        {{#if approvedDate}}
          <p class="card-label mb-1" data-translate="Approved Date">{{approveDateHeader}} -
            <strong>{{approvedDate}}</strong></p>
        {{/if}}
        <div class="badge text-{{badgeClass planType}} rounded-pill">{{planType}}</div>
      </div>
    </div>
  </div>
</script>

<style>
   .hover-effect {
        background-color: white;
    }
    .hover-effect:hover {
        background-color: #ddd;
    }
</style>
