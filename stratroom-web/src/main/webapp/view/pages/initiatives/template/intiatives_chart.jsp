<script id="chart-template" type="x-tmpl-mustache">
<div class="card custom-card table-card h-100">
  <div class="card-header">
    <div class="c-header-left">
      <h5 class="card-title">
        {{{chartinlineEditIcon}}}
      </h5>
      <div class="card-actions">
        {{{subInitiativeOptions}}}
      </div>
    </div>
  </div>
  <div>
    <div class="card-body overflow-auto gantt-chart" style="height: 340px;">
      <!-- 🔑 Dynamic container ID -->
      <div id="chartdiv_{{id}}" class="charttemplatediv"></div>
    </div>
  </div>
</div>
</script>

