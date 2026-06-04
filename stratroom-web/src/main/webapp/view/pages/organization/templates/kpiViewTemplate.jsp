<script id="kpiViewTemplate" type="text/x-handlebars-template">
  <div class="card text-start text-card text-card-main border {{kpistatusLight}} kpiliststatus_{{id}}" onclick="populateKpiDetails({{id}})">
    <div class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
      <div class="icon">
        <img width="14" height="14" src="/stratroom/images/hash-i.svg" alt="hash">
      </div>
      <div class="text-muted period ms-auto month">{{period}}</div>
    </div>
    <div class="card-body p-2">
      <h4 class="card-title">{{name}}</h4>
      <div class="grid gap-2 border-top pt-2">
        <div class="g-col-6 form-group border-end">
          <label class="form-label text-muted">Actual</label>
          <p class="form-control-plaintext {{actualpositive}}">{{actual}}</p>
        </div>
        <div class="g-col-6 text-end form-group">
          <label class="form-label text-muted">Target</label>
          <p class="form-control-plaintext {{targetpositive}}">{{target}}</p>
        </div>
      </div>
    </div>
  </div>
</script>
<script id="subkpiViewTemplate" type="text/x-handlebars-template">
  <div class="card text-start text-card text-card-main border {{kpistatusLight}} kpiliststatus_{{subKpiid}}" onclick="populateKpiDetails({{subKpiid}})">
    <div class="card-header border-0 bg-transparent pb-0 px-2 gap-1 d-flex align-items-center justify-content-between">
      <div class="icon">
        <img width="14" height="14" src="/stratroom/images/hash-i.svg" alt="hash">
      </div>
      <div class="text-muted period ms-auto month">{{subKpiperiod}}</div>
    </div>
    <div class="card-body p-2">
      <h4 class="card-title">{{subKpiname}}</h4>
      <div class="grid gap-2 border-top pt-2">
        <div class="g-col-6 form-group border-end">
          <label class="form-label text-muted">Actual</label>
          <p class="form-control-plaintext {{actualpositive}}">{{subKpiactual}}</p>
        </div>
        <div class="g-col-6 text-end form-group">
          <label class="form-label text-muted">Target</label>
          <p class="form-control-plaintext {{targetpositive}}">{{subKpitarget}}</p>
        </div>
      </div>
    </div>
  </div>
</script>
