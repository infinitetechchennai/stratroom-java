<script id="kpireportTabletemplate" type="x-tmpl-mustache">
<div class="card custom-card table-card h-100">
    <div class="card-header">
        <div class="c-header-left">
            <h5 class="card-title">{{{kpitableInlineEditIcon}}}</h5>
        </div>
        {{{kpiParentOptions}}}
    </div>
    <div class="card-body employee_div_body_box activities-box">
        <div class="col-lg-12 col-md-12">
            <div class="card" style="margin-right:-10px !important">
                <div class="drilltableBody">
                    <div class="table-responsive box">
                        <table class="table table-bordered w-100 centered-table" 
                               style="margin-bottom: 0px !important;white-space: nowrap;">
                            <thead>
                                {{{quaterheader}}}
                            </thead>
                            <tbody>
                                {{{quaterheaderbody}}}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</script>