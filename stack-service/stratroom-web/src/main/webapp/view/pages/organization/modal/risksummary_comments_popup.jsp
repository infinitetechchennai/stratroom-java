
      <!--#START Comment Edit Description -->
      <div
        class="modal fade"
        id="comment_edit_popup"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel_1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4>Edit Comment</h4>
              <button
                type="button"
                class="close pull-right"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>
            <div class="modal-body">
              <form id="risksum_comments_Form">
                <div class="row">
                  <div class="form-group col-md-12">
                    <label for="meeting-name">Comment</label>
                    <textarea class="form-control" rows="6" id="comments" name="comments" autocomplete="off"></textarea>
                  </div>
                </div>
                <input type="hidden" name="risksum_comments_id" id="risksum_comments_id" />
                <input type="hidden" name="action"/>
                <hr/>
                <div class="row m-t-10">
					<div class="col-12">
						<div class="form-line right">
							<button type="button" class="btn-default1 btn" data-dismiss="modal" data-i18n="Cancel">
							  Cancel
							</button>
							<button class="initative_save_btn" data-i18n="Save">
							  Save
							</button>
						</div>
					</div>
				</div>
              </form>
            </div>
            <div class="modal-footer">
            </div>
          </div>
        </div>
      </div>
      <!--#END Comment Description -->            
      <script>

            jQuery.validator.setDefaults({
            	  debug: false,
            	  success: "valid"
            	});
           
            	$( "#risksum_comments_Form" ).validate({
            	  rules: {
            	    comments:{
            	    	required: true
            	    }
            	  },
            	   messages: {
                      required: "Name is required"
                  },
                  submitHandler: function(form) {
                  	handleRiskSummaryCommentsSave('edit');
                  }
            	});
            </script>