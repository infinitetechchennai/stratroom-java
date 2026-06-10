<div class="modal fade risk_commentsreply_update_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header modalheadercolor">
                <h6 class="modal-title" id="myLargeModalLabel_2">Risk Reply Update</h6>
                <button type="button" class="close" id="kpiComments" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="risk_commentsreply_Form">
                    <input type="hidden" name="risk_commentsreply_id" id="risk_commentsreply_id" />
                    <input type="hidden" name="risk_commentsreply_riskid" id="risk_commentsreply_riskid" />
                    <div class="form-row">       
                        <div class="form-group col-md-12">
                            <label for="risk_comment_desc">Reply</label>
                            <textarea rows="3" cols="" class="form-control browser-default" name="risk_Commentsreply" id="risk_Commentsreply" placeholder="" autocomplete="off"></textarea>
                        </div>
                    </div><hr/>
                        <input type="hidden" name="action" value="" />
                    
                    <div class="form-line right">
                       <button type="button" class="btn btn-label-secondary btn-default1 btn"
									data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
                        <button class="initative_save_btn" onclick="updateRiskReplyComment()" value="Save">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>