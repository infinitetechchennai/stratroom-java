<script id="tasks-row-template" type="x-tmpl-mustache">
  <div class="list-group-item">
    <div class="bar-chart">
      <div class="d-flex gap-2 align-items-start">
        <h4 class="title m-0">{{tasksName}}</h4>
        <span class="badge {{statusClass}} rounded-pill ms-auto">
          {{status}}
        </span>
      </div>

      <div class="progress-wrap">
        <div class="progress flex-grow-1">
          <div class="progress-bar progress-bar-striped rounded-pill"
               role="progressbar"
               style="width: {{taskProgress}}%;"
               aria-valuenow="{{taskProgress}}"
               aria-valuemin="0"
               aria-valuemax="100"></div>
        </div>
        <span class="badge">{{tasksProgress}}</span>
      </div>

      <span class="text-muted">{{startenddate}}</span>
    </div>
    <div class="list-actions">
      {{{tasksOptions}}}
    </div>
  </div>	
</script>

<script id="attachments-row-template" type="x-tmpl-mustache">

	  <div class="list-group-item">
                    <div class="bar-chart">
                      <div class="d-flex gap-2"><h4 class="title mb-0">{{attachmentsName}}</h4></div>
                      
                      <div class="numbers">
                        <div class="text-muted left">{{fileName}}</div>
                        <div class="text-muted right"></div>
                      </div>
                    </div>
                    <div class="list-actions">
                   {{{attachmentsOptions}}}
                    </div>
                  </div>
</script>
