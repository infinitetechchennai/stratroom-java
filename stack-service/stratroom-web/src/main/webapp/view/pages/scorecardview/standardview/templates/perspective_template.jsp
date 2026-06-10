<script id="perspective-template" type="x-tmpl-mustache">
<div class="col-lg-6 col-md-6 select-toggle {{showhidetitle}}" style="display:{{displayblock}}">
    <div class="card">
        <div {{{scorecardStatuslight}}}>
		<span style="color: black;font-size: 13px;font-weight: 600;position: absolute;left: -43px;">{{scorecardStatusvalueofweight}}</span>
            <h2 class="prob">
                <strong class="perspective">{{title}}</strong>
			</h2>
			<input type="hidden" name="defaultscr" value="{{defaultscr}}" />
            {{{perspectiveOptionsicon}}}
        </div>

        <div class="tableBody">
            <div class="table-responsive">
                <table class="treetable table table-striped dashboard-task-infos align-center" id="table1">                    
                    {{{headerRow}}}
                    
					{{{bodyRows}}}
                </table>
            </div>
        </div>
    </div>
</div>
</script>