<div class="modal fade scorecard_description_popup" tabindex="-1" role="dialog" aria-labelledby="riskEventModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-light py-3 px-4">
        <h5 class="modal-title fw-bold text-primary" id="riskEventModalLabel">RISK EVENT DATABASE</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body p-4">
        <form id="riskeventform" data-is-new="true">
          <div class="row g-3">
            <!-- Risk Code -->
            <div class="col-md-6">
              <label for="riskcode" class="form-label fw-semibold">RISK CODE</label>
              <select id="riskcode" class="form-select">
                <option value="">Select</option>
                <!-- Options populated by JS -->
              </select>
            </div>

            <!-- Type of Event -->
            <div class="col-md-6">
              <label for="department-2" class="form-label fw-semibold">TYPE OF EVENT</label>
              <select class="form-select" id="department-2">
                <option value="" selected>Select</option>
                <option>Near Miss Event</option>
                <option>Loss Event</option>
              </select>
            </div>

            <!-- Risk Event -->
            <div class="col-12">
              <label for="incident" class="form-label fw-semibold">RISK EVENT</label>
              <textarea class="form-control" id="incident" rows="2"></textarea>
            </div>

            <!-- Date of Risk Event -->
            <div class="col-md-6">
              <label for="incidentdate" class="form-label fw-semibold">DATE OF RISK EVENT</label>
              <div class="input-group">
                <input type="text" class="form-control browser-default datepicker-here" id="incidentdate" placeholder="Select date" />
              </div>
            </div>
                     <!-- <div class="col-md-12">
                                <label for="kpi_fields" class="form-label">The Cause of the Incident</label>
                                <div class="inline-checbox-wrapper">
                                    <div class="inline-checbox-two-column">
                                        <div class="column">
                                            <label for="kpi_fields" class="form-label">Category</label>
                                        </div>
                                        <div class="column">
                                            <label for="kpi_fields" class="form-label">Description</label>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-two-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    People
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-two-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Tools
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-two-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Procedure
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-two-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    External
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-two-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Etc
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <label for="kpi_fields" class="form-label">The Cause of the Incident</label>
                                <div class="inline-checbox-wrapper">
                                    <div class="inline-checbox-three-column">
                                        <div class="column">
                                            <label for="kpi_fields" class="form-label">Category</label>
                                        </div>
                                        <div class="column">
                                            <label for="kpi_fields" class="form-label">Description</label>
                                        </div>
                                        <div class="column">
                                            <label for="kpi_fields" class="form-label">Impact Level</label>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-three-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Financial
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="column select">
                                            <div class="form-group">
                                                <select id="attachment" name="attachment"
                                                    class="form-control form-select">
                                                    <option>Select</option>
                                                    <option> Not significant</option>
                                                    <option>Minor</option>
                                                    <option>Moderate</option>
                                                    <option>Major</option>
                                                    <option>Catastrophic</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-three-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Service
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="column select">
                                            <div class="form-group">
                                                <select id="attachment" name="attachment"
                                                    class="form-control form-select">
                                                    <option>Select</option>
                                                    <option> Not significant</option>
                                                    <option>Minor</option>
                                                    <option>Moderate</option>
                                                    <option>Major</option>
                                                    <option>Catastrophic</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-three-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Reputation
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="column select">
                                            <div class="form-group">
                                                <select id="attachment" name="attachment"
                                                    class="form-control form-select">
                                                    <option>Select</option>
                                                    <option> Not significant</option>
                                                    <option>Minor</option>
                                                    <option>Moderate</option>
                                                    <option>Major</option>
                                                    <option>Catastrophic</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-three-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Strategic
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="column select">
                                            <div class="form-group">
                                                <select id="attachment" name="attachment"
                                                    class="form-control form-select">
                                                    <option>Select</option>
                                                    <option> Not significant</option>
                                                    <option>Minor</option>
                                                    <option>Moderate</option>
                                                    <option>Major</option>
                                                    <option>Catastrophic</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="inline-checbox-three-column">
                                        <div class="column ckeck">
                                            <div class="form-check">
                                                <label class="form-check-label">
                                                    <input class="form-check-input" type="checkbox" value />
                                                    Law
                                                </label>
                                            </div>
                                        </div>
                                        <div class="column Field">
                                            <div class="form-group">
                                                <input type="text" class="form-control">
                                            </div>
                                        </div>
                                        <div class="column select">
                                            <div class="form-group">
                                                <select id="attachment" name="attachment"
                                                    class="form-control form-select">
                                                    <option>Select</option>
                                                    <option> Not significant</option>
                                                    <option>Minor</option>
                                                    <option>Moderate</option>
                                                    <option>Major</option>
                                                    <option>Catastrophic</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
            <!-- Section Header: Cause & Impact -->
            <div class="col-12">
              <div class="d-flex justify-content-between align-items-end border-bottom pb-2 mb-3">
                <h6 class="fw-bold text-muted mb-0">THE CAUSE & IMPACT OF THE INCIDENT</h6>
              </div>
            </div>

            <!-- Dynamic Rows Container -->
            <div class="col-12" id="incident-and-impact-container">
              <div class="incident-and-impact-row row g-2 align-items-end mb-3">
                <div class="col-md-2">
                  <label class="form-label">Category</label>
                  <select class="form-select category-select">
                    <option value="">Select</option>
                    <option>People</option>
                    <option>Tools</option>
                    <option>Procedure</option>
                    <option>External</option>
                    <option>Etc</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <label class="form-label">Description</label>
                  <input type="text" class="form-control" placeholder="Describe cause" />
                </div>
                <div class="col-md-2">
                  <label class="form-label">Impact Category</label>
                  <select class="form-select impact-category-select">
                    <option value="">Select</option>
                    <option>Financial</option>
                    <option>Service</option>
                    <option>Reputation</option>
                    <option>Strategic</option>
                    <option>Law</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <label class="form-label">Impact Desc.</label>
                  <input type="text" class="form-control" placeholder="Describe impact" />
                </div>
                <div class="col-md-2">
                  <label class="form-label">Impact Level</label>
                  <select class="form-select impact-select">
                    <option value="">Choose</option>
                    <option>Tidak Signifikan</option>
                    <option>Ringan</option>
                    <option>Moderat</option>
                    <option>Berat</option>
                    <option>Fatal</option>
                  </select>
                </div>
                <div class="col-md-1 d-flex align-items-end">
                  <button type="button" class="btn btn-sm btn-outline-primary add-more-incident-impact">+</button>
                </div>
              </div>
            </div>

            <!-- Corrective Action -->
            <div class="col-12">
              <label for="correctiveaction" class="form-label fw-semibold">CORRECTIVE ACTION</label>
              <textarea class="form-control" id="correctiveaction" rows="2"></textarea>
            </div>

            <!-- Mitigation Plan -->
            <div class="col-12">
              <label for="mitigation" class="form-label fw-semibold">CORRECTIVE ACTION (MITIGATION PLAN)</label>
              <textarea class="form-control" id="mitigation" rows="2"></textarea>
            </div>

            <!-- Mitigation Status -->
            <div class="col-md-6">
              <label for="eventStatus" class="form-label fw-semibold">MITIGATION STATUS</label>
              <select class="form-select" id="eventStatus">
                <option value="" selected>Select</option>
                <option>Open</option>
                <option>Close</option>
              </select>
            </div>

            <!-- Inventor / Reporter -->
            <div class="col-md-6">
              <label for="department_select" class="form-label fw-semibold">INVENTOR / REPORTER</label>
              <select class="form-select int-status-multi-select" id="department_select" multiple>
                <!-- Populated by JS -->
              </select>
            </div>

            <!-- Hidden Fields -->
            <input id="pageId" type="hidden" name="pagenumber" value="${pagenumber}" />
            <input id="eventid" type="hidden" name="riskevent" />
            <input type="hidden" name="riskEventChangeId" id="riskEventChangeId" />
          </div>
        </form>
      </div>

    
         <div class="modal-footer">
                    <button type="button" class="btn btn-secondary secondary-btn" data-bs-dismiss="modal"
                        aria-label="Close">
                        Cancel
                    </button>
                    <button class="btn btn-primary  initative_save_btn" value="Save" id="riskeventsave" onclick="handleriskeventsave(event)">Save
                    </button>
                    <div class="modal-audit">
                        <h5 class="title">
                            Audit
                        </h5>
                        <div class="audit-listing">
                            <div class="audit-box">
                                <div class="title">Created By :</div>
                                <div  id="createdBy"></div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified By :</div>
                                <div id="modifiedBy"></div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Created Date :</div>
                                <div id="createdDate"></div>
                            </div>
                            <div class="audit-box">
                                <div class="title">Modified Date :</div>
                                <div id="modifiedDate"></div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  </div>
</div>