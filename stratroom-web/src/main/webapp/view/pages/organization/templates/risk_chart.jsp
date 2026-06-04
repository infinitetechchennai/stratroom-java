 <script id="risk-chart-template" type="x-tmpl-mustache">
	
<div class="card custom-card table-card table-container">
                        <div class="card-header">
                            <div class="c-header-left">
                                <div class="heat-map">
			<select id="heatmapselection" name=""  class="form-select form-select-sm" >
				<option value="inherent">Inherent Heat Map</option>
				<option value="residual">Residual Heat Map</option>

			  </select>
							</div>
		</h5>
		{{{subInitiativeOptions}}}
	</div>
</div>
</div>

	<div id="charttableheat">
		<div id="chartdiv" class="charttemplatediv"></div>
	</div>

	<div class="card col-lg-12 d-none" id="cardtableheat">

		<table class="table table-bordered w-100">
			<thead>
				<tr>
					<th id="impact-header">Impact Name</th>
					<th>Risk Impact Category</th>
					<th data-i18n="Type">Type</th>
					<th>Impact Value</th>
					<th>Likelihood Value</th>
					<th>Risk Score</th>
				</tr>
			</thead>
			<tbody>
				<!-- Dynamic rows will be inserted here -->
			</tbody>
		</table>

	  </div>
</div>
</script>