<div  class="modal custom-modal fade add_subActivities_popup" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="myLargeModalLabel_1">Add Sub Activities Description</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
           <form id="subActivitiesForm">
      <div class="card custom-card border-0">
        <div class="modal-body">
          <div class="grid gap-3">
            <!-- <div class="g-col-12 g-col-md-4">

              <div class="form-group">
                <label for="sub_Initiative_id" class="form-label">ID</label>
                <input type="text" class="form-control" name="sub_Initiative_id" id="sub_Initiative_id" disabled
                  placeholder="ID">
              </div>
            </div> -->
            <div class="g-col-12 g-col-md-12">
              <div class="form-group">
                <label for="subactivities_desc" class="form-label">Name</label>
                <textarea class="form-control" autocomplete="off" name="subactivities_desc" id="subactivities_desc" cols=""
                  rows="3" placeholder="Name"></textarea>
              </div>
               <input type="hidden" name="activitiesID" id="activitiesID" />
            </div>
            <div class="g-col-12 g-col-md-6">
              <div class="form-group">
                <label for="subactivities_progress" class="form-label">Progress (%)</label>
                <input type="text" class="form-control" name="subactivities_progress" id="subactivities_progress"
                  placeholder="Progress (%)" />
              </div>
            </div>
            <div class="g-col-12 g-col-md-6">
              <div class="form-group">
                <label for="subactivities_start_end" class="form-label">Start / End Date</label>
                <input type="text" class="form-control" placeholder="Start / End Date" name="subactivities_start_end"
                  data-language="en" autocomplete="off" id="subactivities_start_end">
              </div>
            </div>
            <div class="g-col-12 g-col-md-6">
              <div class="form-group">
                <label for="subactivities_budget" class="form-label">Budget</label>
                <input type="text" class="form-control" name="budget" id="subactivities_budget"
                  placeholder="Budget" />
              </div>
            </div>
            <div class="g-col-12 g-col-md-6">
              <div class="form-group">
                <label for="subactivities_Actual" class="form-label">Actual</label>
                <input type="text" class="form-control" name="subactivities_Actual" id="subactivities_Actual"
                  placeholder="Actual" />
              </div>
            </div>
             <input type="hidden" name="action" value="" />
                        <input type="hidden" name="subactivCreatedById" id="subactivCreatedById" value="" />
          </div>
        </div>
           <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">
        Cancel
      </button>
      <button class="btn btn-primary initative_save_btn" value="Save" onclick="handleSubActivitiesSave(event)">Save</button>

     
    </div>
      </div>
    </form>
</div>
 
  </div>
</div>
</div>


<div  class="modal custom-modal fade update_subActivities_popup" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="myLargeModalLabel_1">Edit Sub Activities Description</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
         <form id="editsubActivitiesForm">
      <div class="card custom-card border-0">
        <div class="modal-body">
          <div class="grid gap-3">
            <div class="g-col-12 g-col-md-4">
   <input type="hidden" name="editsubinitiativeID" id="editsubinitiativeID" />
                        <input type="hidden" name="editactivitiesID" id="editactivitiesID" />
              <div class="form-group" id="editsubactivities_id_wrapper">
                <label for="sub_Initiative_id" class="form-label">ID</label>
                <input type="text" class="form-control" name="editsubactivities_id" id="editsubactivities_id" disabled
                  placeholder="ID">
              </div>
              <input type="hidden" name="editsubactivities_hidden_id" id="editsubactivities_hidden_id">
            </div>
            <div class="g-col-12">
              <div class="form-group">
                <label for="editsubactivities_desc" class="form-label">Name</label>
                <textarea class="form-control" autocomplete="off" name="editsubactivities_desc" id="editsubactivities_desc" cols=""
                  rows="3" placeholder="Name"></textarea>
              </div>
            </div>
            <div class="g-col-12 g-col-md-6">
              <div class="form-group">
                <label for="editsubactivities_progress" class="form-label">Progress (%)</label>
                <input type="text" class="form-control" name="editsubactivities_progress" id="editsubactivities_progress"
                  placeholder="Progress (%)" />
              </div>
            </div>
            <div class="g-col-12 g-col-md-6">
              <div class="form-group">
                <label for="milestone_start_end" class="form-label">Start / End Date</label>
                <input type="text" class="form-control" placeholder="Start / End Date" name="milestone_enddate"
                  data-language="en" autocomplete="off" id="editsubactivities_start_end">
              </div>
            </div>
            <div class="g-col-12 g-col-md-6">
              <div class="form-group">
                <label for="editsubactivities_budget" class="form-label">Budget</label>
                <input type="text" class="form-control" name="editsubactivities_budget" id="editsubactivities_budget"
                  placeholder="Budget" />
              </div>
            </div>
            <div class="g-col-12 g-col-md-6">
              <div class="form-group">
                <label for="editsubactivities_Actual" class="form-label">Actual</label>
                <input type="text" class="form-control" name="editsubactivities_Actual" id="editsubactivities_Actual"
                  placeholder="Actual" />
              </div>
            </div>
          </div>
        </div>
          <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close">
        Cancel
      </button>
      <button class="btn btn-primary initative_save_btn"  onclick="editSubActivitiesSave(event)" value="Save">Save</button>

      <div class="modal-audit">

        <div class="audit-listing">
          <div class="audit-box">
            <div class="title">Created By :</div>
            <div class="text"><span id="editactivCreatedBy"></span>
            </div>
          </div>
          <div class="audit-box">
            <div class="title">Modified By :</div>
            <div class="text"><span id="editactivUpdatedBy"></span></div>
          </div>
          <div class="audit-box">
            <div class="title">Created Date :</div>
            <div class="text"><span id="editactivCreatedByDate"></span></div>
          </div>
          <div class="audit-box">
            <div class="title">Modified Date :</div>
            <div class="text"><span id="editactivUpdatedByDate"></span></div>
          </div>
        </div>
      </div>
    </div>
      </div>
   </form>
 </div>
  
  </div>
</div>
</div>

