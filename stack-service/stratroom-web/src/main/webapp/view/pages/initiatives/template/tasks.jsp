<script id="tasks-template" type="x-tmpl-mustache">
  <div class="card custom-card table-card h-100">
            <div class="card-header">
              <div class="c-header-left">
                <h5 class="card-title">
			{{{tasksinlineEditIcon}}}
		</h5>
		<div class="card-actions">
		{{{tasksCreateIcon}}}
		{{{tasksOptions}}}
		</div>
		</div>
	</div>
	 <div class="card-body employee_div_body_box sub-ini-box overflow-auto" style="height: 340px;">

              <div class="list-group initiatives-bar">
				{{{tasksRows}}}
			  </div>
	</div>
</div>
</script>
<script id="attachments-template" type="x-tmpl-mustache">
  <div class="card custom-card table-card h-100">
            <div class="card-header">
              <div class="c-header-left">
                <h5 class="card-title">
			{{{attachmentsinlineEditIcon}}}
		</h5>
		<div class="card-actions">
		{{{attachmentsCreateIcon}}}
		{{{attachmentsOptions}}}
	</div>
		</div>
	</div>
	 <div class="card-body employee_div_body_box sub-ini-box overflow-auto" style="height: 340px;">

              <div class="list-group initiatives-bar">
				{{{attachmentsRows}}}
			  </div>
	</div>
</div>
</script>