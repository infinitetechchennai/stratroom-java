<script id="risk-comments-template" type="x-tmpl-mustache">
<div class="card custom-card table-card table-container h-100">
    <div class="card-header">
        <div class="c-header-left">
            <h5 class="card-title">
                {{{commentsinlineEditIcon}}}
            </h5>
            {{{commentsInitiativeOptions}}}
        </div>
    </div>
    
    <!-- Scrollable area: comments + input at bottom -->
    <div class="card-body overflow-auto comment-history comments-list" 
         id="comment-conversation_1" 
         style="height: 262px; display: flex; flex-direction: column;">
        
        <!-- Comments List -->
        {{{commentRows}}}
        
        <!-- Comment Input Box - NOW AT BOTTOM OF SCROLLABLE AREA -->
        <div class="comment-input-sticky" style="margin-top: auto; padding-top: 10px; border-top: 1px solid #eee;width:100%">
            {{{commentsCreateIcon}}}
        </div>
        
    </div>
</div>
</script>