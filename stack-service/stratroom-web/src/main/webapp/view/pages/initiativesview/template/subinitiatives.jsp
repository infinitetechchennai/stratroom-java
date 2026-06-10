<script id="subinitiatives-template" type="x-tmpl-mustache">

	<div
		class="d-flex flex-row employe_content_border sub_initiative_details">
		<div class="d-flex flex-column flex-fill profile_content">
			<div class="d-flex flex-row">
				<div class="d-flex flex-column init_flex_profile">
					<p>{{title}}</p>
				</div>
				<div class="d-flex flex-column">
					{{{subinitiativeUserSlecteditem}}}
					<ul class="list-unstyled order-list d-flex sub_initiative_user_class" id="subinitiativeUser_{{id}}">
						{{{subinitiativeUser}}}
					</ul>
				</div>
			</div>
			<div class="d-flex flex-row">
				<div class="d-flex flex-column flex-fill">
					<div class="d-flex flex-row">
						<div class="progress-s progress">
							<div
								class="{{statusLight}}" 
								role="progressbar" aria-valuenow="{{subIniProgressval}}" aria-valuemin="0"
								aria-valuemax="100" style="width:{{subIniProgressval}}%"></div>
						</div>
						<div class="progress_value">{{subIniProgressvalpercent}}</div>
					</div>
				</div>
			<div class="d-flex flex-column">
				<div>
					<strong>{{dateRange}}</strong>
				</div>
			</div>
			</div>
			</div>
			<div class="flex-column">
				{{{subInitiativeOptions}}}
			</div>
		</div>
</script>