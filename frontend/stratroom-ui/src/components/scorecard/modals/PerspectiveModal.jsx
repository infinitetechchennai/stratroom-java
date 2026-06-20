import React from 'react';

export const PerspectiveAddModal = () => {
    return (
        <div className="modal custom-modal fade kpi_setting" id="prespective-add-modal" data-bs-backdrop="static"
            data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" data-translate="page.scorecard.addPerspective">Add Perspective</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3">
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="apName" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.name">Name</label>
                                            <input type="text" className="form-control" id="apName"
                                                data-translate="page.scorecard.scorecardItems.name" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="apDescription" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.description">Description</label>
                                            <textarea className="form-control" id="apDescription" placeholder="Description"
                                                data-translate="page.scorecard.scorecardItems.description"
                                                rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="apOwner" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.owner">Owner</label>
                                            <select name="apOwner" id="apOwner" data-placeholder="Select Owner"
                                                className="form-select select-dropdown-add-prespective" defaultValue="">
                                                <option value="" disabled hidden>Select Owner</option>
                                                <option value="1">Nizam Goolam</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="apStartEndDate" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.startEndDate">Start/End Date</label>
                                            <input type="text" id="apStartEndDate" className="form-control"
                                                placeholder="Start/End Date"
                                                data-translate="page.scorecard.scorecardItems.startEndDate" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="apPerformance" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.performance">Performance</label>
                                            <div className="input-group">
                                                <input type="text" id="apPerformance" className="form-control"
                                                    data-translate="page.scorecard.scorecardItems.performance"
                                                    placeholder="Performance" aria-label=""
                                                    aria-describedby="button-addon2" />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2"
                                                    data-bs-toggle="modal" data-bs-target="#prespective-calculator-modal"
                                                    data-translate="page.scorecard.scorecardItems.calculator">
                                                    Calculator
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="apWeight" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.weight">Weight (%)</label>
                                            <input type="text" className="form-control" id="apWeight" placeholder="Weight (%)"
                                                data-translate="page.scorecard.scorecardItems.weight" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="apSubWeight" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.subWeight">Sub Weight (%)</label>
                                            <input type="text" className="form-control" id="apSubWeight"
                                                placeholder="Sub Weight (%)"
                                                data-translate="page.scorecard.scorecardItems.subWeight" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="apStatus" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.status">Status</label>
                                            <select name="apStatus" id="apStatus" data-placeholder="Select Status"
                                                className="form-select select-dropdown-add-prespective" defaultValue="">
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

export const PerspectiveEditModal = () => {
    return (
        <div className="modal custom-modal fade kpi_setting" id="prespective-edit-modal" data-bs-backdrop="static"
            data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" data-translate="page.scorecard.editPerspective">Edit Prespective</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3">
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="epid" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.id">ID</label>
                                            <input type="text" className="form-control" id="epid"
                                                data-translate="page.scorecard.scorecardItems.id" placeholder="ID" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-8">
                                        <div className="form-group">
                                            <label htmlFor="epName" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.name">Name</label>
                                            <input type="text" className="form-control" id="epName"
                                                data-translate="page.scorecard.scorecardItems.name" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="epDescription" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.description">Description</label>
                                            <textarea className="form-control" id="epDescription" placeholder="Description" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="epOwner" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.owner">Owner</label>
                                            <select name="epOwner" id="epOwner" data-placeholder="Select Owner"
                                                className="form-select select-dropdown-edit-prespective" defaultValue="">
                                                <option value="" disabled hidden>Select Owner</option>
                                                <option value="1">Nizam Goolam</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="epStartEndDate" className="form-label">Start/End Date</label>
                                            <input type="text" id="epStartEndDate" className="form-control"
                                                data-translate="page.scorecard.scorecardItems.startEndDate"
                                                placeholder="Start/End Date" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="epPerformance" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.performance">Performance</label>
                                            <div className="input-group">
                                                <input type="text" id="epPerformance" className="form-control"
                                                    data-translate="page.scorecard.scorecardItems.performance"
                                                    placeholder="Performance" aria-label=""
                                                    aria-describedby="button-addon2" />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2"
                                                    data-bs-toggle="modal" data-bs-target="#prespective-calculator-modal"
                                                    data-translate="page.scorecard.scorecardItems.calculator">
                                                    Calculator
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="epWeight" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.weight">Weight (%)</label>
                                            <input type="text" className="form-control" id="epWeight"
                                                data-translate="page.scorecard.scorecardItems.weight"
                                                placeholder="Weight (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="epSubWeight" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.subWeight">Sub Weight (%)</label>
                                            <input type="text" className="form-control" id="epSubWeight"
                                                data-translate="page.scorecard.scorecardItems.subWeight"
                                                placeholder="Sub Weight (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="epStatus" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.status">Status</label>
                                            <select name="epStatus" id="epStatus" data-placeholder="Select Status"
                                                className="form-select select-dropdown-edit-prespective" defaultValue="">
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
                        <button className="btn btn-primary" data-translate="actions.save">Save</button>
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

export const PerspectiveViewModal = () => {
    return (
        <div className="modal custom-modal fade kpi_setting" id="prespective-view-modal" data-bs-backdrop="static"
            data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title" data-translate="page.scorecard.viewPerspective">View Perspective</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3">
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vpid" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.id">ID</label>
                                            <input type="text" className="form-control" id="vpid"
                                                data-translate="page.scorecard.scorecardItems.id" placeholder="ID" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-8">
                                        <div className="form-group">
                                            <label htmlFor="vpName" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.name">Name</label>
                                            <input type="text" className="form-control" id="vpName"
                                                data-translate="page.scorecard.scorecardItems.name" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="vpDescription" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.description">Description</label>
                                            <textarea className="form-control" id="vpDescription"
                                                data-translate="page.scorecard.scorecardItems.description"
                                                placeholder="Description" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vpOwner" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.owner">Owner</label>
                                            <select name="vpOwner" id="vpOwner" data-placeholder="Select Owner"
                                                className="form-select select-dropdown-view-prespective" defaultValue="">
                                                <option value="" disabled hidden>Select Owner</option>
                                                <option value="1">Nizam Goolam</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vpStartEndDate" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.startEndDate">Start/End Date</label>
                                            <input type="text" id="vpStartEndDate" className="form-control"
                                                data-translate="page.scorecard.scorecardItems.startEndDate"
                                                placeholder="Start/End Date" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="vpPerformance" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.performance">Performance</label>
                                            <div className="input-group">
                                                <input type="text" id="vpPerformance" className="form-control"
                                                    data-translate="page.scorecard.scorecardItems.performance"
                                                    placeholder="Performance" aria-label=""
                                                    aria-describedby="button-addon2" />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2"
                                                    data-bs-toggle="modal" data-bs-target="#prespective-calculator-modal"
                                                    data-translate="page.scorecard.scorecardItems.calculator">
                                                    Calculator
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vpWeight" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.weight">Weight (%)</label>
                                            <input type="text" className="form-control" id="vpWeight"
                                                data-translate="page.scorecard.scorecardItems.weight"
                                                placeholder="Weight (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vpSubWeight" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.subWeight">Sub Weight (%)</label>
                                            <input type="text" className="form-control" id="vpSubWeight"
                                                data-translate="page.scorecard.scorecardItems.subWeight"
                                                placeholder="Sub Weight (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vpStatus" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.status">Status</label>
                                            <select name="vpStatus" id="vpStatus" data-placeholder="Select Status"
                                                className="form-select select-dropdown-view-prespective" defaultValue="">
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
