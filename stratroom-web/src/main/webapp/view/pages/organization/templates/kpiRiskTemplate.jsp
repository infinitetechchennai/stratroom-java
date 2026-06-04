<script id="kpiRiskTemplate" type="text/x-handlebars-template">
       <div class="list-group-item">
                    <div class="bar-chart">
                      <div class="d-flex gap-2"><h4 class="title mb-0">{{name}}</h4></div>
                      
                      <div class="numbers">
                        <div class="text-muted left">{{riskStatus}}</div>
                        <div class="text-muted right">{{dateRaised}}</div>
                      </div>
                    </div>
                    {{{kpiriskrowOptions}}}
                  </div>
</script>
 