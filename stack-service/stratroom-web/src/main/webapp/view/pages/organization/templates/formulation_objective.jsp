<script id="objective-template" type="x-tmpl-mustache">
	<div class="row card-full-div">
                    <div class="col-auto pr-0 pt-3">
                      <div class="form-check">
                        <label class="form-check-label">
                          <input
                            class="form-check-input objectivelist" id="objectivelistid_{{id}}"
                            type="checkbox"
                            value="{{id}}" {{objectivechecked}}
                          />
                          <span class="form-check-sign">
                            <span class="check"></span>
                          </span>
                        </label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="card {{highlight}} objectiveitem" onclick="openObjectiveAdd({{id}},'edit')" id="objectivehigh_{{id}}">
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

<!-- <script id="objective-template" type="x-tmpl-mustache">
  <li class="nested-item non-draggable">
      <div class="caret"></div>
      <div class="card strategy-box parent" onclick="openObjectiveAdd({{id}},'edit')" id="objectivehigh_{{id}}">
          <div class="strategy-section">
              <div class="strategy-content">
                  <div class="icon">
                      <img src="assets/images/icons/target-i.svg" width="16" height="16">
                  </div>
                  <div class="content">
                      <p class="strategy-label">
                          <strong>
                              <input class="form-check-input objectivelist" id="objectivelistid_{{id}}"
                                  type="checkbox" value="{{id}}" {{objectivechecked}} />
                              <span>{{name}}</span>
                          </strong>
                      </p>
                  </div>
              </div>
              <div class="strategy-action">
                <ul class="list-unstyled action-list">
                    
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