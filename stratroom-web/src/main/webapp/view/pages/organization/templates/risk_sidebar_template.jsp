<script id="risk-template" type="text/x-handlebars-template">
  <div  class="card card-widget card-plan active">
               <div class="card-header risk_sub_initiative_sidebar_details sub_initiative_sidebar_details {{initiativeProgressBar}} {{initiativeSidebarHighLight}} sidebarriskid_{{id}}"
    onclick="populateRiskDetails({{id}}, 'risk')">
      <div class="avatar">
        <img {{{Owner}}} alt="User" width="18" height="18">
      </div>
      <div class="d-flex gap-1 align-items-center ms-auto" ><span class="badge rounded-pill riCategory {{#if riskCategory}}status-bg-green{{/if}}" style="--stratroom-bg-opacity:1">
  {{riskCategory}}
</span>
        
      </div>
      <div class="card-body" style="width: 143%;">
        <h4 class="card-title mb-1">{{intiative_content}}</h4>
          <div class="d-flex gap-2 align-items-center">
                  <!-- <p class="card-label mb-1"><strong class="riCategory">Strategic Risk</strong></p> -->
<span class="text-muted period">Last Assesment: {{dueDate}}</span>

                 <div class="d-flex" style="margin-left: 212px;position: fixed;">
                    <span class="icon goal">
                      <img width="16" height="16" src="/stratroom/images/buzzer-green-i.svg" alt="goal">
                    </span>
              
                  </div>
                </div>
      </div>
  </div>
</div>
</script>

<script id="subrisk-template" type="text/x-handlebars-template">
  <div  class="card card-widget card-plan active">
  <div class="card-header risk_sub_initiative_sidebar_details sub_initiative_sidebar_details {{initiativeProgressBar}} {{initiativeSidebarHighLight}} sidebarriskid_{{id}}"
    onclick="populateRiskDetails({{id}}, 'draft')">     
     <div class="avatar">
        <img {{{Owner}}} alt="User" width="18" height="18">
      </div>
      <div class="d-flex gap-1 align-items-center ms-auto" ><span class="badge rounded-pill riCategory {{#if riskCategory}}status-bg-yellow{{/if}}" style="--stratroom-bg-opacity:1">
  {{riskCategory}}
</span>
       
      </div>
      <div class="card-body" style="width: 143%;">
        <h4 class="card-title mb-1">{{intiative_content}}</h4>
          <div class="d-flex gap-2 align-items-center">
                  <!-- <p class="card-label mb-1"><strong class="riCategory">Strategic Risk</strong></p> -->

 <span class="text-muted period">Last Assesment: {{dueDate}}</span>

                                    <div class="d-flex" style="margin-left: 212px;position: fixed;">
              
                    <span class="icon goal">
                      <img width="16" height="16" src="/stratroom/images/buzzer-yellow-i.svg" alt="goal">
                    </span>
              
                  </div>
                </div>
      </div>
  </div>
  </div>
</script>