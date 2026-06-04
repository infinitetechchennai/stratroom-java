<!-- Add Group -->
    <div
      class="modal fade"
      id="add_group"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel_1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h4 id="accessHeaderName"></h4>
            <button type="button" class="close pull-right" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div class="modal-body">
          	<form id="access_control_Form">
            <div class="row">
              <div class="form-group col-md-6">
                <label for="">Group Name</label>
                <input type="text" name="groupname" id="groupname" class="form-control browser-default" autocomplete="off"/>
              </div>
              <div class="form-group col-md-6">
                <label for="" style="display: block;">Modules</label>
                <select class="form-control browser-default module-multi-select" name="modules[]" id="modules" multiple="multiple">
                  
                </select>
              </div>
              	<input type="hidden" name="action" value="" />
				<input type="hidden" name="id" value="" />
              <div class="form-group col-md-12 mt-2">
                <label for="kpi_fields">Permissions</label>
                <ul class="d-flex flex-row flex-wrap ml-2">
                  <li>
                    <div class="form-check">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input class="form-check-input" id="viewaccess" type="checkbox" value=""/>
                          View
                          <span class="form-check-sign">
                            <span class="check"></span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="form-check">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input class="form-check-input" id="createaccess" type="checkbox" value=""/>
                          Create
                          <span class="form-check-sign">
                            <span class="check"></span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="form-check">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input class="form-check-input" id="editaccess" type="checkbox" value=""/>
                          Edit
                          <span class="form-check-sign">
                            <span class="check"></span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="form-check">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input class="form-check-input" id="deleteaccess" type="checkbox" value=""/>
                          Delete
                          <span class="form-check-sign">
                            <span class="check"></span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="col-12">
                <hr style="border: 1px solid #505050;" />
              </div>
              <div class="col-12">
                <div class="form-line right">
                  <button
                    type="button"
                    class="btn-default1 btn"
                    data-dismiss="modal"
                    aria-label="Close"
                    data-i18n="Cancel"
                  >
                    Cancel
                  </button>
                  <button class="initative_save_btn" value="Save" data-i18n="Save">
                    Save
                  </button>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END Add Group -->
    
<script>
	jQuery.validator.setDefaults({
	  debug: false,
	  success: "valid"
	});
	
	$( "#access_control_Form" ).validate({
	  rules: {
		groupname: {
	      required: true
	    }
	  },
	   messages: {
            required: "Name is required"
        },
        submitHandler: function(form) {
        	saveAccess();
        }
	});
</script>