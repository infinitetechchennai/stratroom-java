<div  class="modal custom-modal fade sub_initative_edit_popup" data-bs-backdrop="static" data-bs-keyboard="false"
   tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
   <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title subInitiativeHeaderText" id="myLargeModalLabel_1" >
           Edit Sub Initiative Description
         </h5>
         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div class="modal-body">
		<form id="sub_initative_Form">
         <div class="card custom-card border-0">
           <div class="card-body">

             <div class="grid gap-3">

             <div class="form-row">
						<div class="form-group col-md-12" id="sub_Initiative_id_wrapper"
							style="display: none">
							<label for="sub_Initiative_id" data-i18n="ID" data-translate="ID">ID</label> <input type="text"
								class="form-control browser-default" name="sub_Initiative_id"
								id="sub_Initiative_id" placeholder="">
								<input type="hidden" name="initiativeID" id="initiativeID" />
								<input type="hidden" name="subinitiativeID" id="subinitiativeID" />
						</div>
					</div>

               <div class="g-col-12">
                 <div class="form-group">
                   <label for="sub_initative_desc" class="form-label" data-translate="Name">Name</label>
                   <textarea class="form-control" autocomplete="off" name="subinitiative_desc" id="subinitiative_desc"
                     cols="" rows="3" placeholder="Name"></textarea>
                 </div>
               </div>
               <div class="g-col-12 g-col-md-3">
                 <div class="form-group">
                   <label for="sub_initative_progress" class="form-label" data-translate="Progress (%)">Progress (%)</label>
                   <input type="text" class="form-control" name="sub_initative_progress" id="sub_initative_progress"
                     placeholder="Progress" />
                 </div>
               </div>
               <div class="g-col-12 g-col-md-3">
                 <div class="form-group">
                   <label for="sub_initative_contribution" class="form-label" data-translate="Contribution (%)">Contribution (%)</label>
                   <input type="number" class="form-control" name="sub_initative_contribution"
                     id="sub_initative_contribution" placeholder="Contribution %">

                 </div>
               </div>
               <div class="g-col-12 g-col-md-6">
                 <div class="form-group">
                   <label for="sub_initative_start_end" class="form-label" data-translate="Start / End Date">Start / End Date</label>
                   <input type="text" class="form-control browser-default datepicker-here" autocomplete="off"
                        name="activitierange" data-range="true" data-multiple-dates-separator=" - " data-language="en"
                        id="sub_initative_start_end"
                     placeholder="Start / End Date" />
                 </div>
               </div>
			    <div class="g-col-12">
                 <div class="form-group">
                   <label for="sub_initative_desc" class="form-label" data-translate="Implementation Remarks">Implementation Remarks</label>
                   <textarea class="form-control" autocomplete="off" name="sub_initative_impremark" id="sub_initative_impremark"
                     cols="" rows="2" placeholder="Name"></textarea>
                 </div>
               </div>
			    <div class="g-col-12">
                 <div class="form-group">
                   <label for="sub_initative_desc" class="form-label" data-translate="Performance Analysis Observations / Recommendation">Performance Analysis Observations / Recommendation</label>
                   <textarea class="form-control" autocomplete="off" name="sub_initative_performance" id="sub_initative_performance"
                     cols="" rows="2" placeholder="Name"></textarea>
                 </div>
               </div>
             </div>
           </div>
		     <div class="modal-footer">
         <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close" data-translate="Cancel">
           Cancel
         </button>
         <button class="btn btn-primary" value="Save" data-translate="Save">Save</button>
         
       </div>
		   <input type="hidden" name="Sub_Initiative_owner" id="Sub_Initiative_owner"/>
							<input type="hidden" name="subinitiative_name" id="subinitiative_name"/>
							<input type="hidden" name="action" value="" />
               <input type="hidden" name="sub_initative_multipleowners" id="sub_initative_multipleowners"/>
						<input type="hidden" name="subCreatedById" id="subCreatedById" value="" />
         </div>
       </form>
	</div>
      
     </div>
   </div>
 </div>

<script>
	jQuery.validator.setDefaults({
		  debug: false,
		  success: "valid"
		});
		$( "#sub_initative_Form" ).validate({
		  rules: {
			  subinitiative_name: {
		      required: true
		    },
		    subinitiative_desc: {
		      required: true
		    },
		    sub_initative_progress: {
		      required: true,
		      digits: true,
		      min: 0,
		      max: 100
		    },
		    sub_Initiative_date: {
			      required: true
			}
		  },
		   messages: {
	            required: "Name is required"
	        },
	        submitHandler: function(form) {
	        	handleSubInitiativeSave();
	        }
		});
</script>
