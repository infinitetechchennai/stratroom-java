<script id="comments-row-template" type="x-tmpl-mustache">
  <div class="comment">
    <div class="comment-content">
      <div class="comment-card">
        
        <!-- Profile Image -->
        <img {{{Owner}}} class="rounded-circle user-img" alt="User" width="40" height="40">

        <!-- Comment Content -->
        <div class="comment-cr">
          <div class="comment-highlight">
            
            <!-- Header -->
            <div class="comment-head ">
              <h6 class="user-name mb-0">
                {{createdByName}}, {{title}}
              </h6>
              <span class="comment-time">{{createdTime}}</span>
            </div>

            <!-- Comment Text -->
            <div class="comment-text">
              {{commentsName}}
            </div>
          </div>

          <!-- Hidden ID -->
          <div id="initiativecommentId" style="display: none;">{{id}}</div>

          <!-- Actions -->
          <div class="comment-actions">
            <span class="initiativecommentReply" data-id="{{id}}">Reply</span>
            <span class="countinitiativeclick like-btn {{likeTextclass}}" data-id="{{id}}">{{likeText}}</span>
            <span class="parentcounter"><span class="like-count">{{count}}</span></span>
            {{{commentsrowOptions}}}
          </div>
        </div>
      </div>

      <!-- Reply Input -->
      <div class="reply-section " style="display: none;">
        {{{commentsReplyCreateIcon}}}
      </div>
    </div>

    <!-- Replies Nested -->
   <div class="replies replybar">
   <div class="reply">
  {{#replies}}
    {{> init-reply-template}}
  {{/replies}}
   </div>
</div>
  </div>


</script>
<script id="init-reply-template" type="x-tmpl-mustache">
  <div class="reply-content">
    <div class="reply-card">
      <img {{{Owner}}} class="user-img rounded-circle" width="22" height="22" alt="User">
      <div class="comment-cr">
        <div class="comment-highlight">
          <div class="comment-head">
            <h6 class="user-name">{{createdByName}}, {{title}}</h6>
            <span class="comment-time">{{createdTime}}</span>
          </div>
          <div class="comment-text">{{commentsName}}</div>
        </div>
        <div class="comment-actions">
          <span class="like-btn countinitiativeclick {{likeTextclass}}" data-id="{{id}}"">Like</span>
          <span class="like-count">0</span>
          <span class="initiativecommentReply" data-id="{{id}}">Reply</span>
          <span class="edit-btn">Edit</span>
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