<!-- ===== SUB-INITIATIVE (Level 1) ===== -->
 <style>

  .status-bg-red {
  background-color: #dc3545 !important; /* Bootstrap danger */
}
.status-bg-yellow {
  background-color: #ffc107 !important; /* Bootstrap warning */
}
.status-bg-green {
  background-color: #28a745 !important; /* Bootstrap success */
}
 </style>
<script id="subinitiative-template" type="x-tmpl-mustache">
  <div class="accordion-item ">
    <div class="accordion-header bg-primary" style="--stratroom-bg-opacity:0.02">
      <!-- Title Row -->
      <div class="d-flex justify-content-between p-2 gap-1">
        <button class="btn p-0 btn-title justify-content-start"
                data-bs-toggle="collapse"
                data-bs-target="#subinitiative-{{id}}"
                aria-expanded="false"
                aria-controls="subinitiative-{{id}}">
                 <div class="row row-cols-1 g-2">
          <span>{{title}}</span>
               </div> 
        </button>
        <div class="list-actions">
          <ul class="list-unstyled d-flex align-items-center avatar-group mb-0" style="width:24px;margin-top:-1px;">
            {{{subinitiativeUser}}}
          </ul>
          {{{subInitiativeOptions}}}
        </div>
      </div>
      <!-- Progress + Date Row (always visible) -->
      <div class="p-2 d-flex flex-row gap-1 w-100">
        <div class="progress-wrap green">
              <div class="progress flex-grow-1" style="--stratroom-bg-opacity:1">
          <div class="progress-bar progress-bar-striped rounded-pill"
               role="progressbar"
               style="width: {{progress}}%;"
               aria-valuenow="{{progress}}"
               aria-valuemin="0"
               aria-valuemax="100"></div>
          </div>
          <span class="badge">{{progress}}%</span>
        </div>
       
      </div>
      <div class="d-flex flex-column justify-content-center">
        <div class="text-muted ms-auto" style="margin-left:8px !important">{{dateRange}}</div>
        </div>
    </div>
    <!-- Collapsible Body (activities inside) -->
    <div id="subinitiative-{{id}}" class="accordion-collapse collapse">
      <div class="accordion-body gap-0 p-0">
        {{{activitiesHtml}}}
      </div>
    </div>
  </div>
</script>


<!-- ===== ACTIVITY (Level 2) ===== -->
<script id="activity-template" type="x-tmpl-mustache">
  <div class="accordion-item border-0">
    <div class="accordion-header bg-primary" style="--stratroom-bg-opacity:0.02">
      <!-- Title Row -->
      <div class="d-flex justify-content-between p-2 gap-1">
        
        <div class="btn p-0 btn-title justify-content-start"
                data-bs-toggle="collapse"
                data-bs-target="#subactivity-{{id}}"
                aria-expanded="false"
                aria-controls="subactivity-{{id}}">  
                <div class="row row-cols-1 g-2">
          <span class="col mb-0">{{title}}</span></div>
        </div>
        <div class="list-actions">
          <ul class="list-unstyled d-flex align-items-center avatar-group mb-0" style="width:24px;margin-top:-1px;">
            {{{activitieUser}}}
          </ul>
          {{{activtiesOptions}}}
        </div>
      </div>
      <!-- Progress + Date Row (always visible) -->
      <div class="p-2 d-flex flex-row gap-1 w-100">
        <div class="d-flex flex-column flex-fill">
           <div class="d-flex flex-row align-items-center gap-2">
          <div class="chart-pie" data-percent="{{progress}}"></div>
          <span class="pie-progress">{{progress}}%</span>
        </div>
        </div>
        <div class="d-flex flex-column justify-content-center">
        <div class="text-muted ms-auto">{{dateRange}}</div>
        </div>
      </div>
    </div>
    <!-- Collapsible Body (sub-activities inside) -->
    <div id="subactivity-{{id}}" class="accordion-collapse collapse">
        {{{subActivitiesHtml}}}

    </div>
  </div>
  
</script>

<!-- ===== SUB-ACTIVITY (Level 3) ===== -->
<script id="sub-activity-template" type="x-tmpl-mustache">
  <div class="list-group-item border-bottom">
    <!-- Title Row -->
    <div class="d-flex justify-content-between p-2 gap-1">
      <div class="p-0 btn-title">
        <div class="row row-cols-1 g-2">
        <span class="col mb-0">{{title}}</span>
        </div>
      </div>
      <div class="list-actions">
        <ul class="list-unstyled d-flex align-items-center avatar-group mb-0" style="width:24px;margin-top:-1px;">
          {{{subActivityUser}}}
        </ul>
        {{{subActivityOptions}}}
      </div>
    </div>
    <!-- Progress + Date Row -->
    <div class="p-2 d-flex flex-row gap-1 w-100">
      <div class="d-flex flex-column flex-fill">
      <div class="d-flex align-items-center gap-2">
         <div class="progress-item">
      <div class="pie-chart">
        <div class="pie-prog" data-percent="{{progress}}"></div>
        <div class="progress-value">{{progress}}%</div>
      </div>
    </div>
      </div>
      </div>
        <div class="d-flex flex-column justify-content-center">
      <span class="text-muted">{{dateRange}}</span>
      </div>
    </div>
  </div>
</script>