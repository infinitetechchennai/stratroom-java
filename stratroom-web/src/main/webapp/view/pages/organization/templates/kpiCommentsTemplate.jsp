
<script id="kpiCommentsViewTemplate" type="text/x-handlebars-template">
    <div class="comment-container">
        <!-- <div class="comment-avatar">
            <img  {{{Owner}}} class="rounded-circle kpicommentsimgprofile" >
        </div> -->
        <div class="comment-body">
            <div class="comment-header">
                <div class="comment-user-info">
                    <span class="user-name">{{name}}</span>
                    <span class="user-title">{{title}}</span>
                    <span class="comment-time">{{createdTime}}</span>
                </div>
                <div class="comment-actions">
                    {{{commentsrowOptions}}}
                </div>
            </div>
            <div class="comment-content">{{desc}}</div>
            <div class="comment-footer">
                <button class="btn-like countclick {{likeTextclass}}" data-id="{{id}}">
                    <i class="far fa-thumbs-up"></i> {{likeText}}
                </button>
                <span class="like-count badge">{{count}}</span>
                <button class="btn-reply kpiCommentReply" data-id="{{id}}">
                    <i class="far fa-comment"></i> Reply
                </button>
            </div>
        </div>
    </div>
</script>

<script id="kpiCommentsreplyViewTemplate" type="text/x-handlebars-template">
    <div class="comment-container reply">
        <div class="comment-avatar">
            <img {{{Owner}}} class="rounded-circle kpicommentsimgprofile" alt="{{name}}">
        </div>
        <div class="comment-body">
            <div class="comment-header">
                <div class="comment-user-info">
                    <span class="user-name">{{name}}</span>
                    <span class="user-title">{{title}}</span>
                    <span class="comment-time">{{createdTime}}</span>
                </div>
                <div class="comment-actions">
                    {{{commentsrowOptions}}}
                </div>
            </div>
            <div class="comment-content">{{desc}}</div>
            <div class="comment-footer">
                <button class="btn-like countclick {{likeTextclass}}" data-id="{{id}}">
                    <i class="far fa-thumbs-up"></i> {{likeText}}
                </button>
                <span class="like-count badge">{{count}}</span>
                <button class="btn-reply kpiCommentReply" data-id="{{id}}">
                    <i class="far fa-comment"></i> Reply
                </button>
            </div>
        </div>
    </div>
</script>