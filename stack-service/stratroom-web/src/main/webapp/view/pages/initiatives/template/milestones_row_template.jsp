<!-- ================= MILESTONE ROW TEMPLATE ================= -->
<script id="milestones-row-template" type="x-tmpl-mustache">
  <div class="list-group-item">
    <div class="bar-chart">
      <div class="d-flex gap-2 align-items-start">
        <h4 class="title m-0">{{desc}}</h4>
        <span class="badge {{statusClass}} rounded-pill ms-auto">
          {{status}}
        </span>
      </div>

      <div class="progress-wrap">
        <div class="progress flex-grow-1">
          <div class="progress-bar progress-bar-striped rounded-pill"  
               role="progressbar"
               style="width: {{mileProgress}}%;"
               aria-valuenow="{{mileProgress}}"
               aria-valuemin="0"
               aria-valuemax="100"></div>
        </div>
        <span class="badge">{{mileStoneProgress}}</span>
      </div>

      <span class="text-muted">{{date}}</span>
    </div>

    <div class="list-actions">
      {{{milestonerowOptions}}}
    </div>
  </div>
</script>
