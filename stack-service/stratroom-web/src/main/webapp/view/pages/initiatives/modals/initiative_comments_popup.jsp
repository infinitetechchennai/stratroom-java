
	<!-- #Start Initiaties Comments PopUp -->

            <div class="modal fade kpi_comments_popup" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header modalheadercolor">
                            <h6 class="modal-title" id="myLargeModalLabel_1" data-i18n="Initiatives Comment Update">Initiatives Comment Update</h6>
                            <button type="button" class="close" id="kpiComments" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="initiaties_comments_Form">
                                <input type="hidden" name="initiaties_comments_id" id="initiaties_comments_id" />
                                <input type="hidden" name="initiaties_comments_initiatieid" id="initiaties_comments_initiatieid" />
                                <div class="form-row">       
                                    <div class="form-group col-md-12">
                                        <label for="sub_initative_desc" data-i18n="Comment">Comment</label>
                                        <textarea rows="3" cols="" class="form-control browser-default" name="initiaties_Comments" id="initiaties_Comments" placeholder="" autocomplete="off"></textarea>
                                    </div>
                                </div><hr/>
                                    <input type="hidden" name="action" value="" />
                                
                                <div class="form-line right">
                                    <button type="button" class="btn-default1 btn" data-dismiss="modal" aria-label="Close" data-i18n="Cancel">Cancel</button>
                                    <button class="initative_save_btn" value="Save" data-i18n="Save">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- #END# Initiaties Comments PopUp -->
            
            <script>

            jQuery.validator.setDefaults({
            	  debug: false,
            	  success: "valid"
            	});
           
            	$( "#initiaties_comments_Form" ).validate({
            	  rules: {
            	    initiaties_Comments:{
            	    	required: true
            	    }
            	  },
            	   messages: {
                      required: "Name is required"
                  },
                  submitHandler: function(form) {
                  	handleCommentsSave('','','edit');
                  }
            	});
            </script>