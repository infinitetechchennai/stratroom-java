import React from 'react';

export const ObjectiveAddModal = () => {
    return (
        <div className="modal custom-modal fade kpi_setting" id="objective-add-modal" data-bs-backdrop="static"
            data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" data-translate="page.scorecard.addObjective">Add Objective</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3">
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="abName" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.name">Name</label>
                                            <input type="text" className="form-control" id="abName"
                                                data-translate="page.scorecard.scorecardItems.name" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="abDescription" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.description">Description</label>
                                            <textarea className="form-control" id="abDescription"
                                                data-translate="page.scorecard.scorecardItems.description"
                                                placeholder="Description" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="abOwner" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.owner">Owner</label>
                                            <select name="abOwner" id="abOwner"
                                                className="form-select select-dropdown-add-objective"
                                                data-placeholder="Select Owner" defaultValue="">
                                                <option value="" disabled hidden>Select Owner</option>
                                                <option value="1">Nizam Goolam</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="abStartEndDate" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.startEndDate">Start/End Date</label>
                                            <input type="text" id="abStartEndDate" className="form-control"
                                                data-translate="page.scorecard.scorecardItems.startEndDate"
                                                placeholder="Start/End Date" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="abPerformance" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.performance">Performance</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="abPerformance"
                                                    data-translate="page.scorecard.scorecardItems.performance"
                                                    placeholder="Performance" aria-label=""
                                                    aria-describedby="button-addon2" readOnly style={{ cursor: 'not-allowed', backgroundColor: '#f8f9fa' }} />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2"
                                                    data-bs-toggle="modal" data-bs-target="#objective-calculator-modal"
                                                    data-translate="page.scorecard.scorecardItems.kpiCalculator">
                                                    Calculator
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="abWeight" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.weight">Weight (%)</label>
                                            <input type="text" id="abWeight"
                                                data-translate="page.scorecard.scorecardItems.weight"
                                                placeholder="Weight (%)" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="abSubWeight" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.subWeight">Sub Weight (%)</label>
                                            <input type="text" className="form-control" id="abSubWeight"
                                                data-translate="page.scorecard.scorecardItems.subWeight"
                                                placeholder="Sub Weight (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="abStatus" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.status">Status</label>
                                            <select name="abStatus" id="abStatus"
                                                className="form-select select-dropdown-add-objective"
                                                data-placeholder="Select Status" defaultValue="">
                                                <option value="" disabled>Select Status</option>
                                                <option value="manual">Manual</option>
                                                <option value="weighted">Weighted</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close"
                            data-translate="actions.cancel">
                            Cancel
                        </button>
                        <button className="btn btn-primary" value="Save" data-translate="actions.save">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ObjectiveEditModal = () => {
    return (
        <div className="modal custom-modal fade kpi_setting" id="objective-edit-modal" data-bs-backdrop="static"
            data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" data-translate="page.scorecard.editObjectiveDescription">Edit Objective Description</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3">
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="eodId" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.id">ID</label>
                                            <input type="text" id="eodId" className="form-control"
                                                data-translate="page.scorecard.scorecardItems.id" placeholder="ID" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-8">
                                        <div className="form-group">
                                            <label htmlFor="eodName" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.name">Name</label>
                                            <input type="text" id="eodName" className="form-control"
                                                data-translate="page.scorecard.scorecardItems.name" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="eodDescription" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.description">Description</label>
                                            <textarea className="form-control" id="eodDescription"
                                                data-translate="page.scorecard.scorecardItems.description"
                                                placeholder="Description" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="eodOwner" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.owner">Owner</label>
                                            <select name="eodOwner" id="eodOwner"
                                                className="form-select select-dropdown-edit-objective"
                                                data-placeholder="Select Owner" defaultValue="">
                                                <option value="" disabled hidden></option>
                                                <option value="1">Option 1</option>
                                                <option value="2">Option 2</option>
                                                <option value="3">Option 3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="eodStartEndDate" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.startEndDate">Start/End Date</label>
                                            <input type="text" id="eodStartEndDate"
                                                data-translate="page.scorecard.scorecardItems.startEndDate"
                                                placeholder="Start/End Date" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="eodPerformance" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.performance">Performance</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="eodPerformance"
                                                    data-translate="page.scorecard.scorecardItems.performance"
                                                    placeholder="Performance" aria-label=""
                                                    aria-describedby="button-addon2" readOnly style={{ cursor: 'not-allowed', backgroundColor: '#f8f9fa' }} />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2"
                                                    data-bs-toggle="modal" data-bs-target="#objective-calculator-modal"
                                                    data-translate="page.scorecard.scorecardItems.kpiCalculator">
                                                    KPI Calculator
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="eodWeight" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.weight">Weight (%)</label>
                                            <input type="text" className="form-control" id="eodWeight"
                                                data-translate="page.scorecard.scorecardItems.weight"
                                                placeholder="Weight (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="eodSubWeight" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.subWeight">Sub Weight (%)</label>
                                            <input type="text" className="form-control" id="eodSubWeight"
                                                data-translate="page.scorecard.scorecardItems.subWeight"
                                                placeholder="Sub Weight (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="eodStatus" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.status">Status</label>
                                            <select name="eodStatus" id="eodStatus"
                                                className="form-select select-dropdown-edit-objective"
                                                data-placeholder="Select Status" defaultValue="">
                                                <option value="" hidden disabled>Select Status</option>
                                                <option value="manual">Manual</option>
                                                <option value="weighted">Weighted</option>
                                                <option value="first">First</option>
                                                <option value="second">Second</option>
                                                <option value="third">Third</option>
                                                <option value="fourth">Fourth</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close"
                            data-translate="actions.cancel">
                            Cancel
                        </button>
                        <button className="btn btn-primary" value="Save">Save</button>
                        <div className="modal-audit">
                            <div className="audit-listing">
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.createdBy">Created By</span> :</div>
                                    <div className="text">Arun</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.lastModifiedBy">Modified By</span> :</div>
                                    <div className="text">Karthik</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.createdOn">Created Date</span> :</div>
                                    <div className="text">Oct 02, 2019</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.lastModifiedOn">Modified Date</span> :</div>
                                    <div className="text">Oct 02, 2019</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ObjectiveViewModal = () => {
    return (
        <div className="modal fade kpi_setting" id="objective-view-modal" data-bs-backdrop="static" data-bs-keyboard="false"
            tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" data-translate="page.scorecard.viewObjective">View Objective Description</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3">
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vodID" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.view.id">ID</label>
                                            <input type="text" id="vodID"
                                                data-translate="page.scorecard.scorecardItems.view.id" placeholder="ID"
                                                className="form-control" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-8">
                                        <div className="form-group">
                                            <label htmlFor="vodName" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.view.name">Name</label>
                                            <input type="text" id="vodName"
                                                data-translate="page.scorecard.scorecardItems.view.name" placeholder="Name"
                                                className="form-control" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="vodDescription" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.view.description">Description</label>
                                            <textarea className="form-control" id="vodDescription"
                                                data-translate="page.scorecard.scorecardItems.view.description"
                                                placeholder="Description" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vodOwner" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.owner">Owner</label>
                                            <select name="vodOwner" id="vodOwner" data-placeholder="Select Owner"
                                                className="form-select select-dropdown-view-objective" defaultValue="">
                                                <option value="" disabled hidden>Select Owner</option>
                                                <option value="1">Option 1</option>
                                                <option value="2">Option 2</option>
                                                <option value="3">Option 3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vodStartEndDate" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.startEndDate">Start/End Date</label>
                                            <input type="text" id="vodStartEndDate"
                                                data-translate="page.scorecard.scorecardItems.startEndDate"
                                                placeholder="Start/End Date" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="vodPerformance" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.performance">Performance</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="vodPerformance"
                                                    data-translate="page.scorecard.scorecardItems.performance"
                                                    placeholder="Performance" aria-label=""
                                                    aria-describedby="button-addon2" readOnly style={{ cursor: 'not-allowed', backgroundColor: '#f8f9fa' }} />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2"
                                                    data-bs-toggle="modal" data-bs-target="#kpi_formula_popup"
                                                    data-translate="page.scorecard.scorecardItems.kpiCalculator">
                                                    KPI Calculator
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vodWeight" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.weight">Weight (%)</label>
                                            <input type="text" id="vodWeight"
                                                data-translate="page.scorecard.scorecardItems.weight"
                                                placeholder="Weight (%)" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vodSubWeight" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.subWeight">Sub Weight (%)</label>
                                            <input type="text" id="vodSubWeight"
                                                data-translate="page.scorecard.scorecardItems.subWeight"
                                                placeholder="Sub Weight (%)" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vodStatus" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.status">Status</label>
                                            <select name="vodStatus" id="vodStatus" data-placeholder="Select Status"
                                                className="form-select select-dropdown-view-objective" defaultValue="">
                                                <option value="" disabled hidden>Select Status</option>
                                                <option value="manual">Manual</option>
                                                <option value="weighted">Weighted</option>
                                                <option value="first">First</option>
                                                <option value="second">Second</option>
                                                <option value="third">Third</option>
                                                <option value="fourth">Fourth</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close"
                            data-translate="actions.cancel">
                            Cancel
                        </button>
                        <button className="btn btn-primary" value="Save" data-translate="actions.save">Save</button>
                        <div className="modal-audit">
                            <div className="audit-listing">
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.createdBy">Created By</span> :</div>
                                    <div className="text">Arun</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.lastModifiedBy">Modified By</span> :</div>
                                    <div className="text">Karthik</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.createdOn">Created Date</span> :</div>
                                    <div className="text">Oct 02, 2019</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.lastModifiedOn">Modified Date</span> :</div>
                                    <div className="text">Oct 02, 2019</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
