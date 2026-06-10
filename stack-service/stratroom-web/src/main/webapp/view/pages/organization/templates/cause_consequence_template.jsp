<script id="cause-consequence-template" type="x-tmpl-mustache">
<div class="card custom-card table-card table-container h-100">
	 <div class="card-header">
	  <div class="c-header-left">
		<h5 class="card-title">
			{{{causeconsequenceinlineEditIcon}}}
		</h5>
		 <div class="card-actions"> 
		{{{createcauseIcon}}}
		{{{causepermissionOptions}}}
		 </div>
	  </div>
	</div>
	<div class="card-body overflow-auto" style="height: 340px;">
                        <div class="accordion accordion-flush-risk accordion-custom accordion-collopse-content"
                          id="accordionCauseandConsequence">
	{{{causeRows}}}
	</div>
	</div>
</div>
</script>