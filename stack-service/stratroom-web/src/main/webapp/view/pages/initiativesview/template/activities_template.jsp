<script id="activities-row-template" type="x-tmpl-mustache">
<div
	class="d-flex flex-row employe_content_border sub_initiative_details">
	<div class="d-flex flex-column flex-fill profile_content">
		<div class="d-flex flex-row">
			<div class="d-flex flex-column init_flex_profile">
				<p class="formattextreader">{{activityName}}</p>
			</div>
			<div class="d-flex flex-column">
				{{{activitieUserSlecteditem}}}
				<ul class="list-unstyled order-list d-flex" id="initiativeactivitieUser_{{id}}">
					{{{activitieUser}}}
				</ul>
			</div>
		</div>
		<div class="d-flex flex-row">
			<div class="d-flex flex-column flex-fill">
				<div class="d-flex flex-row">
					<div class="icon">
						<div id="onechartpie" class="{{chartprocesstempname}}"></div>
					</div>
					<div class="pie-progress">{{activityProgress}}</div>
				</div>
			</div>
			<div class="d-flex flex-column">
				<div>
					<strong>{{startenddate}}</strong>
				</div>
			</div>
			</div>
		</div>


		<div class="flex-column">
			{{{activtiesOptions}}}
		</div>
	</div>
</script>