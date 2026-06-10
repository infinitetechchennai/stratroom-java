 <script id="initiative-template" type="text/x-handlebars-template">
            <div class="card card-widget card-plan sub_initiative_sidebar_details {{initiativeSidebarHighLight}} {{initiativeProgressSideBar}} sidebareventId{{id}}"
     onclick="initiativedetail('{{id}}')">


  <div class="card-header d-flex align-items-center">
    <div class="user-image user-image-sm user-active">
      {{{userImageHtml}}}
    </div>

    <div class="d-flex gap-1 align-items-center ms-auto">
      <span class="badge rounded-pill riCategory {{#if categoryType}} status-bg-green{{/if}}" style="--stratroom-bg-opacity:1">
  {{categoryType}}
</span>
    </div>
  </div>

  <div class="card-body">

    <h4 class="card-title mb-1 formattextreader" style="text-overflow:ellipsis;">
      {{intiative_content}}
    </h4>


    <div class="bar-chart">
      <div class="d-flex gap-2 align-items-start">
        <h6 class="title m-0">{{OwnerName}}</h6> 
      </div>

      <div class="progress-wrap d-flex align-items-center gap-2">
        <div class="progress flex-grow-1">
          <div class="progress-bar progress-bar-striped rounded-pill {{initiativeProgressBar}}"
               role="progressbar"
               style="width: {{progressval}}%;"
               aria-valuenow="{{progressval}}"
               aria-valuemin="0"
               aria-valuemax="100">
          </div>
        </div>
        <span class="badge">{{progress_val_per}}</span>
      </div>

      <div class="text-muted mt-1">Due By : {{dueDate}}</div>
    </div>
  </div>
</div>

</script> 
<!-- 
<script id="initiative-template" type="text/x-handlebars-template">
  <div class="card card-widget card-plan sub_initiative_sidebar_details {{initiativeSidebarHighLight}} {{initiativeProgressSideBar}} sidebareventId{{id}}"
       onclick="initiativedetail('{{id}}')">

    <div class="card-header d-flex align-items-center">
      <div class="user-image user-image-sm user-active">
        {{{userImageHtml}}}
      </div>
      <div class="d-flex gap-1 align-items-center ms-auto">
        <span class="badge rounded-pill riCategory {{#if categoryType}} status-bg-green{{/if}}" style="--stratroom-bg-opacity:1">
          {{categoryType}}
        </span>
      </div>
    </div>

    <div class="card-body">
      <h4 class="card-title mb-1 formattextreader" style="text-overflow:ellipsis;">
        {{intiative_content}}
      </h4>

      <div class="bar-chart">
        <div class="d-flex gap-2 align-items-start">
          <h6 class="title m-0"></h6>
        </div>

        <div class="progress-wrap d-flex align-items-center gap-2">
          <div class="progress flex-grow-1">
            <div class="progress-bar progress-bar-striped rounded-pill {{initiativeProgressBar}}"
                 role="progressbar"
                 style="width: {{progressval}}%;"
                 aria-valuenow="{{progressval}}"
                 aria-valuemin="0"
                 aria-valuemax="100">
            </div>
          </div>
          <span class="badge">{{progress_val_per}}</span>
        </div>

        <div class="text-muted mt-1">Due By : {{dueDate}}</div>
      </div>
    </div>
  </div>
</script> -->