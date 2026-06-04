<script id="perspectivechild-template" type="x-tmpl-mustache">
	<div class="row card-full-div">
                    <div class="col-auto pr-0 pt-3">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input
                            class="form-check-input perspectivelist"
                            type="checkbox" name="perspectivelist" id="perspectivelistid_{{id}}"
                            value="{{id}}" {{perspectivechecked}}
                          />
                          <span class="form-check-sign">
                            <span class="check"></span>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card perspectiveitem {{highlight}}" id="scorecardhight_{{id}}" onclick="openPerspectiveAdd({{id}},'edit')">
                        <div class="row">
                          <div class="col-12">
                            <div class="line-shortner name pull-left">
                              <span>{{name}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
</script>

<!-- <script id="perspectivechild-template" type="x-tmpl-mustache">
   <li class="nested-item non-draggable">
       <div class="caret"></div>
       <div class="card strategy-box parent" id="scorecardhight_{{id}}">
           <div class="strategy-section">
               <div class="strategy-content">
                   <div class="icon">
                       
                       <img src="images/dollar-i.svg" width="16" height="16">
                   </div>
                   <div class="content">
                       <p class="strategy-label d-flex flex-column gap-1">
                           <strong>{{name}}</strong>
                           <span class="text-muted">{{description}}</span>
                       </p>
                   </div>
               </div>
               <div class="strategy-action">
                   <ul class="list-unstyled action-list">
                       <li>
                           <div class="form-check">
                               <label class="form-check-label">
                                   <input class="form-check-input perspectivelist" type="checkbox"
                                          name="perspectivelist" id="perspectivelistid_{{id}}"
                                          value="{{id}}" {{perspectivechecked}} />
                                   <span class="form-check-sign">
                                       <span class="check"></span>
                                   </span>
                               </label>
                           </div>
                       </li>
                       <li>
                           <a href="#add-objective" data-bs-toggle="modal" onclick="openPerspectiveAdd({{id}},'add')">
                               <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Add Objective">
                                   <i class="fas fa-plus title_edit_icon"></i>
                               </span>
                           </a>
                       </li>
                       <li>
                           <a href="#edit-objective" data-bs-toggle="modal" onclick="openPerspectiveAdd({{id}},'edit')">
                               <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Edit Objective">
                                   <img src="images/edit-i.svg" width="8" height="8" />
                               </span>
                           </a>
                       </li>
                       <li>
                           <a href="#delete-modal" data-bs-toggle="modal" onclick="setDeleteId({{id}})">
                               <span class="icon" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Delete">
                                   <img src="images/delete-i.svg" width="12" height="12" />
                               </span>
                           </a>
                       </li>
                   </ul>
               </div>
           </div>
       </div>
   </li>


   
</script> -->

<script>
 
//   document.addEventListener('DOMContentLoaded', function() {
//       const toggler = document.getElementsByClassName("caret");
//       for (let i = 0; i < toggler.length; i++) {
//           toggler[i].addEventListener("click", function () {
//               this.parentElement.querySelector(".nested").classList.toggle("active");
//               this.classList.toggle("caret-down");
//           });
//       }
//   });
  </script>
