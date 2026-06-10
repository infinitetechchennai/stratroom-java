<script id="milestones-row-template" type="x-tmpl-mustache">
<div
	class="d-flex flex-row employe_content_border sub_initiative_details">
	<div class="d-flex flex-column flex-fill profile_content">
		<div class="d-flex flex-row">
			<div class="d-flex flex-column init_flex_profile">
				<p>{{desc}}</p>
			</div>
			<div class="d-flex flex-column">
				<div>
					<strong>{{status}}</strong>
				</div>
			</div>
		</div>
		<div class="d-flex flex-row">
			<div class="d-flex flex-column flex-fill">
				<div class="d-flex flex-row">
					<div class="progress-s progress">
						<div
							class="{{statusLight}}"
							role="progressbar" aria-valuenow="{{milstoneProgressval}}" aria-valuemin="0"
							aria-valuemax="100" style="width:{{milstoneProgressval}}%"></div>
					</div>
					<div class="progress_value">{{mileStoneProgress}}</div>
				</div>
			</div>
			<div class="d-flex flex-column">
                <strong>{{date}}</strong>
			</div>
		</div>
		</div>
		<div class="flex-column">
			{{{milestonerowOptions}}}
		</div>
	</div>
	</script>