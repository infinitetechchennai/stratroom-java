 <script id="comments-template" type="x-tmpl-mustache">
<div class="card">
	<div class="header d-flex flex-row">
		<h5 class="prob d-flex flex-fill">
			<strong class="editableTxt1"
				onkeypress="return (this.innerText.length <= 25)" data-oldcommentsHeader="{{commentsHeader}}" id="commentsHeader" editable="true">{{commentsHeader}}</strong>
		</h5>
		<ul class="header-dropdown m-r--2 d-flex">
    		<li class="dropdown m-t--10">
        		<a href="#" onclick="return false;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
            		<i class="material-icons">more_vert</i>
        		</a>
        		<ul class="dropdown-menu pull-right" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 24px, 0px);">
            		<li>
                	<a href="#" data-toggle="modal" data-target=".sub_comments_view_popup" onclick="risksummarycommentsviewdetails({{id}})">View</a>
            		</li>
        		</ul>
    		</li>
		</ul>
	</div>
	<div class="comment-history" id="comment-conversation_1">
		<ul id="comment-conversation">
			{{{commentRows}}}
		</ul>
	</div>
	<div class="comment_send">
	<form id="comments_Form">
		<div class="form-group d-flex flex-row align-items-center">
			<div class="form-line">
				<input type="text" name="comments" id="comments" class="form-control"
					placeholder="Type a comment..." />
			</div>
			<div class="send_btn" onclick="handleRiskCommentsSave('add')">
				<i class="fas fa-arrow-right"></i>
			</div>
		</div>
	</form>
	</div>
</div>
</script>