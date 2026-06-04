<div class="modal fade kpi_commentsreply_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header modalheadercolor">
                            <h6 class="modal-title" id="myLargeModalLabel_1" data-i18n="Initiatives Comment Update">Initiatives Comment Update</h6>
                            <button type="button" class="close" id="kpiComments" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                        <div class="modal-body">
                            <form id="initiaties_commentsreply_Form">
                                <input type="hidden" name="initiaties_commentsreply_id" id="initiaties_commentsreply_id" />
                                <input type="hidden" name="initiaties_Commentsreplydesc" id="initiaties_Commentsreplydesc" />
                                <input type="hidden" name="initiaties_commentsreply_initiatieid" id="initiaties_commentsreply_initiatieid" />
                                <div class="form-row">       
                                    <div class="form-group col-md-12">
                                        <label for="sub_initative_desc" data-i18n="Comment">Comment</label>
                                        <textarea rows="3" cols="" class="form-control browser-default" name="initiaties_Commentsreply" id="initiaties_Commentsreply" placeholder="" autocomplete="off"></textarea>
                                    </div>
                                </div><hr/>
                                    <input type="hidden" name="action" value="" />
                                    <div class="form-line right">
                                        <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
                                        <button type="button" class="initative_save_btn" onclick="handleReplyCommentsUpdate(event)" value="Save" data-i18n="Save">Save</button>

                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>