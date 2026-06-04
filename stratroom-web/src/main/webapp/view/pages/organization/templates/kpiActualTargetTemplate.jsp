<script id="kpiActualTargetTemplate" type="x-tmpl-mustache">
<div class="card custom-card table-card h-100">
      <div class="card-header">
              <div class="c-header-left">
                <h5 class="card-title">
                 {{{kpitableInlineEditIcon}}} 
                </h5>
				
              </div>
			  {{{kpiParentOptions}}}
              
            </div>

	
			<div class="card-body employee_div_body_box activities-box">
				 <table id="kpidataTable" class="table table-bordered w-100">
                <thead class="text-center">
						<tr>
							<th data-i18n="Period">Period</th>
							{{{datatableheaderrow}}}
						</tr>
					</thead>
					<tbody>
					{{{bodyRows}}}
					</tbody>
				</table>
		</div>
	
</div>
</script>