<script id="pestelactionchild-template" type="x-tmpl-mustache">
	<tr>
		<td><textarea class="form-control pestelactions" rows="5" name="pestelactions[]">{{name}}</textarea></td>
		<td><input type="text" class="modal-custom-input date_pickers_single bydate" style="height: 34px !important;" data-language="en" name="bydate[]" value="{{bydate}}" id="bydate" autocomplete="off"/></td>
		<td><input type="hidden" class="action_multiownerid" id="action_multiownerid_{{id}}" name="multiowners[]" value="{{multiowner}}">
			<div class="fullscreen">
				<ul class="list-unstyled order-list">{{{subinitiativeUser}}}
					<div class="image-upload"><label for="file-input">
						<li _ngcontent-hhc-c5="" class="avatar avatar-sm"><a href="#" class="favgs" data-toggle="modal" data-target="#addpeopleactions"><span _ngcontent-hhc-c5="" onclick="actionsaddpeople({{id}})" class="badge">+</span></a>
						</li></label>
					</div>
				</ul>
			</div>
		</td>
		<td><input type="checkbox" class="actionstatuscheck" {{checkstatus}}/></td>
	</tr>
</script>