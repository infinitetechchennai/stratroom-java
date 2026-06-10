
            <!-- #Start Kpi Desc PopUp -->
 <div  class="modal custom-modal fade kpi_description_popup" data-bs-backdrop="static"
  data-bs-keyboard="false"  tabindex="-1" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">KPI Description</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <form id="kpiForm">
          <div class="card custom-card border-0">
            <div class="grid gap-3">
              <div class="g-col-12 g-col-md-3">
                <div class="form-group">
                  <label for="Kpi_show_id" class="form-label">ID</label>
                  <input type="text" class="form-control" name="Kpi_show_id"
                    id="Kpi_show_id" placeholder="ID" />
                </div>
              </div>
              <div class="g-col-12 g-col-md-9">
                <div class="form-group">
                  <label for="kpi_name" class="form-label">Name</label>
                  <input type="text" class="form-control" name="kpi_name"
                    id="kpi_name" placeholder="Name" />
                </div>
              </div>
               <input type="hidden" id="kpi_id" name="kpi_id">
               <input type="hidden" name="action" value="" />
              <div class="g-col-12">
                <div class="form-group">
                  <label for="kpi_description" class="form-label">Description</label>
                  <textarea class="form-control" id="kpi_description" placeholder="Description" rows="3"></textarea>
                </div>
              </div>
              <div class="g-col-12 g-col-md-6">
                <div class="form-group">
                  <label for="kpiDesOwner" class="form-label">Owner</label>
                  <select id="kpi_owner" name="kpi_owner" class="form-select select-dropdown-kpiDescription" data-placeholder="Select Owner">
                    <option value="" data-i18n="Choose">Choose</option>
                  </select>
                </div>
              </div>
              <div class="g-col-12 g-col-md-6">
                <div class="form-group">
                  <label for="kpi_status" class="form-label">Status</label>
                  <select id="kpi_status" name="kpi_status" class="form-select select-dropdown-kpiDescription" data-placeholder="Select Status">
                    <option value selected disabled hidden>Select Status</option>
                    <option>Manual</option>
                    <option>Weighted</option>
                  </select>
                </div>
              </div>  
                 <div class="g-col-12">
                  <div class="form-group"  style="float: right;">
                      <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-tranlate = "Cancel">
          Cancel
        </button>
        <button class="btn btn-primary initative_save_btn" value="Save" data-tranlate = "Save">
          Save
        </button>
                  </div>
                </div> 
            </div> 
          </div>
          </form>
        </div>
         <div class="modal-footer">
       
          <div class="modal-audit">
           
            <div class="audit-listing">
              <div class="audit-box">
                <div class="title">Created By :</div>
                <div class="text">Arun</div>
              </div>
              <div class="audit-box">
                <div class="title">Modified By :</div>
                <div class="text">Karthik</div>
              </div>
              <div class="audit-box">
                <div class="title">Created Date :</div>
                <div class="text">Oct 02, 2019</div>
              </div>
              <div class="audit-box">
                <div class="title">Modified Date :</div>
                <div class="text">Oct 02, 2019</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

            <!-- #END# kpi Desc PopUp -->
            <script>
	jQuery.validator.setDefaults({
		  debug: false,
		  success: "valid"
		});
		$( "#kpiForm" ).validate({
		  rules: {
			  kpi_name: {
		      required: true
		    },
		    kpi_description: {
		      required: true
		    },
		    kpi_owner: {
		      required: true
		    },
		    kpi_status:{
		    	required: true
		    },
		    kpi_id: {
			      required: true
			}
		  },
		   messages: {
	            required: "Name is required"
	        },
	        submitHandler: function(form) {
	        	handleKpiDescriptionSave();
	        }
		});
</script>