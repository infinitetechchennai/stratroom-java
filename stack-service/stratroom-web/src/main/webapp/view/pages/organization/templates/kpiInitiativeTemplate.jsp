<script id="kpiInitiativeTemplate" type="text/x-handlebars-template">

        <div class="list-group-item">
                    <div class="bar-chart">
                      <h4 class="title m-0">{{name}}</h4>
                      <div class="progress-wrap yellow">
                        <div class="progress flex-grow-1">
                          <div class="progress-bar bg-warning progress-bar-striped rounded-pill" role="progressbar"
                            style="width:{{progress}}%" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <span class="badge">{{progress}}%</span>
                      </div>
                      <div class="text-muted">{{daterange}}</div>
                    </div>

 {{{kpiinirowOptions}}}
                 
                  </div>
                        
</script>