<script id="comments-row-template" type="x-tmpl-mustache">

			<li>
				<div class="d-flex flex-row">
					<div class="flex-column comment_image">
						<img {{{Owner}}} alt="User" width="40">
					</div>
					<div class="flex-column comment_details">
						<ul>
							<li><span class="message-data-name"><strong class="formattextreader">{{createdByName}}</strong></span></li>
							<li class="commentsdesc">{{commentsName}} , {{title}}</li>
							<li>
								<ul class="d-flex flex-row">
									<li class="reply">Reply</li>
									<li class="risksumcountclick {{likeTextclass}}" data-id="{{id}}">{{likeText}}</li>
									<li class="parentcounter"><span class="badge badge-dark counter">{{count}}</span></li>
									<li>{{createdTime}}</li>
								</ul>
							</li>
						</ul>
					</div>
					<div class="flex-column">
						{{{risksumOptions}}}
					</div>
				</div>
			</li>

</script>