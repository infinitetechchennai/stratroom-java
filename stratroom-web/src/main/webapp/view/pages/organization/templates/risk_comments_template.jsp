<style>
	.replybar::-webkit-scrollbar {
    width: 6px; /* Adjust the scrollbar width */
}
</style>
<script id="risk-comments-row-template" type="x-tmpl-mustache">
    <div class="comment">
      <div class="comment-content">
        <div class="comment-card">
          <img {{{Owner}}} class="rounded-circle user-img imgprofile" alt="User" width="25" height="25">
          <div class="comment-cr ">
            <div class="comment-highlight">
              <div class="comment-head">
                <h6 class="user-name">{{createdByName}}, {{title}}</h6>
                <span class="comment-time">{{createdTime}}</span>
              </div>

             <div class="comment-text" id="comment-text-{{id}}" data-original="{{commentsName}}">
  {{commentsName}}
</div>


            <div id="commentId" style="display:none;">{{id}}</div>
            <div id="commentsParendId" style="display:none;">{{commentsParendId}}</div>

            <!-- Actions -->
            <div class="comment-actions">
              <span class="riskcountclick like-btn {{likeTextclass}}" data-id="{{id}}">{{likeText}}</span>
              <span class="parentcounter">
                <span class="like-count counter">{{count}}</span>
              </span>
              <span class="commentReply" data-id="{{id}}">Reply</span>
              {{{commentsrowOptions}}}
            </div>
          </div>
          <div class="reply-section" style="display:none;">
          {{{commentsReplyCreateIcon}}}
        </div>
        </div>

        
      </div>
      <div class="replies replybar">
        <div class="reply">
          {{#replies}}
            {{> risk-reply-template}}
          {{/replies}}
        </div>
      </div>
    </div>
</script>
<script id="risk-reply-template" type="x-tmpl-mustache">
  <div class="reply-content">
    <div class="reply-card">
      <img {{{Owner}}} class="user-img rounded-circle" width="22" height="22" alt="User">
      <div class="comment-cr">
        <div class="comment-highlight">
          <div class="comment-head">
            <h6 class="user-name">{{replyCreated}}, {{replyTitle}}</h6>
            <span class="comment-time">{{replyTime}}</span>
          </div>
          <div class="comment-text">{{replyCommentsName}}</div>
        </div>
        <div class="comment-actions">
          <!-- ADDED: class 'riskcountreplyclick' and data-id="{{id}}" -->
          <!-- ADDED: logic for initial text/class if needed, otherwise defaults to Like -->
          <span class="like-btn riskcountreplyclick {{likeTextclass}}" data-id="{{id}}">{{likeText}}</span>
          
          <!-- Ensure this span has class 'like-count' so JS can find it -->
          <span class="like-count">{{count}}</span>
          
          <span class="commentReply" data-id="{{id}}">Reply</span>
          <!-- <span class="edit-btn">Edit</span> -->
          <span class="delete-btn">Delete</span>
        </div>
      </div>
    </div>
  </div>
</script>

<script>
  $(document).on("click", ".commentReply", function () {
    // find the closest comment block and its reply section
    var comment = $(this).closest(".comment");
    var replySection = comment.find(".reply-section");

    // toggle reply section
    replySection.toggle();
});

</script>