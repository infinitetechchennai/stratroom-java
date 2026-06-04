<script id="comments-row-template" type="x-tmpl-mustache">
    <li>
        <div class="d-flex flex-row">
            <div class="flex-column comment_image">
                <img {{{Owner}}} class="rounded-circle imgprofile" alt="User" width="40">
            </div>
            <div class="flex-column comment_details">
                <ul>
                    <li><span class="message-data-name"><strong class="formattextreader">{{createdByName}}, {{title}}</strong></span></li>
                    <li class="commentsdesc">
                        <!-- Editable comment text container with data attributes -->
                        <div class="comment-text" 
                             id="comment-text-{{id}}" 
                             data-comment-id="{{id}}"
                             data-initiative-id="{{initiativeId}}"
                             data-original-desc="{{{escapedDesc}}}">
                            {{commentsName}}
                        </div>
                    </li>
                    <li>
                        <ul class="d-flex flex-row">
                            <li class="initiativecommentReply">Reply</li>
                            <li class="countinitiativeclick {{likeTextclass}}" data-id="{{id}}">{{likeText}}</li>
                            <li class="parentcounter"><span class="badge badge-dark counter">{{count}}</span></li>
                            <li>{{createdTime}}</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="flex-column">
                {{{commentsrowOptions}}}
            </div>
        </div>
    </li>
</script>