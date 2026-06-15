import React from 'react';

export const DeleteModal = () => {
    return (
        <div className="modal custom-modal custom-delete-modal fade" id="delete-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" style={{ "--stratroom-modal-width": "320px" }}>
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="card custom-card delete-card border-0">
                            <div className="card-body">
                                <div className="delete-box">
                                    <h4 className="title">Do you really want to delete?</h4>
                                    <div className="btn-wrap">
                                        <button type="button" className="btn btn-sm btn-label-secondary rounded-pill" data-bs-dismiss="modal" aria-label="Close">
                                            Cancel
                                        </button>
                                        <button className="btn btn-sm btn-danger rounded-pill" value="Yes">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ImportModal = () => {
    return (
        <div className="modal custom-modal fade" id="import-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">File Upload</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card-header-progress">
                            <ul className="form-progressbar w-100">
                                <li>Upload</li>
                                <li>Validation</li>
                                <li>Import</li>
                            </ul>
                        </div>

                        <div id="file-upload" className="card custom-card">
                            <div className="card-body grid gap-3">
                                <div className="g-col-12">
                                    <div className="form-group">
                                        <label htmlFor="importCategory" className="form-label">Import Category</label>
                                        <select className="form-select select-dropdown-file-upload w-100" name="importCategory" id="importCategory" data-placeholder="Select Import Category" defaultValue="">
                                            <option value="" disabled hidden>Select Import Category</option>
                                            <option value="Organisation Import">Organisation</option>
                                            <option value="ETLUpload">Data Upload</option>
                                            <option value="XLSUpload">Excel File Upload</option>
                                            <option value="Scorecard Import">Scorecard</option>
                                            <option value="InitiativeDataLoad">Initiatives Data Load</option>
                                            <option value="InitiativeBudgetLoad">Initiatives Budget Load</option>
                                            <option value="Initiative Import">Initiatives & Projects</option>
                                            <option value="Risk Import">Risk</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="g-col-12">
                                    <div className="form-group">
                                        <label htmlFor="" className="form-label">Upload File</label>
                                        <label htmlFor="login" className="upload-label upload-box">
                                            <div className="upload">Choose a file or drag it here.</div>
                                            <input type="file" id="login" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-between form-line">
                                    <button className="btn btn-primary initative_save_btn ms-auto" id="next-btn-1">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card custom-card" id="file-validate" style={{ display: 'none' }}>
                            <div className="card-body grid gap-3">
                                <div className="g-col-12 img-center">
                                    <img src="/stratroom/images/Not-Verified.png" alt="Not-Verified" />
                                    <div className="error-div">
                                        <table className="error-table">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '150px' }}>Row</th>
                                                    <th>Error</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td style={{ width: '150px' }}>1</td><td>Contain Special Character</td></tr>
                                                <tr><td style={{ width: '150px' }}>3</td><td>Contain Special Character</td></tr>
                                                <tr><td style={{ width: '150px' }}>5</td><td>Contain Special Character</td></tr>
                                                <tr><td style={{ width: '150px' }}>8</td><td>Contain Special Character</td></tr>
                                                <tr><td style={{ width: '150px' }}>10</td><td>Contain Special Character</td></tr>
                                                <tr><td style={{ width: '150px' }}>19</td><td>Contain Special Character</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="d-flex justify-content-between form-line">
                                    <button type="button" className="btn btn-label-secondary btn-default1" id="prev-btn1">Previous</button>
                                    <button className="btn btn-primary initative_save_btn" id="next-btn-2">Next</button>
                                </div>
                            </div>
                        </div>
                        <div className="card custom-card" id="file-save" style={{ display: 'none' }}>
                            <div className="card-body grid gap-3">
                                <div className="g-col-12">
                                    <div className="text-center">
                                        <img src="/stratroom/images/Success.png" alt="Verified" width="140" />
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <div className="d-flex justify-content-between form-line">
                                    <button type="button" className="btn btn-label-secondary" id="prev-btn2">Previous</button>
                                    <button className="btn btn-primary initative_save_btn" id="done-btn" data-dismiss="modal" aria-label="Close">Done</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const KpiStoryCardModal = () => {
    return (
        <div className="modal custom-modal fade" id="kpi-story-card-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">KPI Story Card</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card table-card">
                            <div className="card-body">
                                <div className="row-table">
                                    <div className="row">
                                        <div className="col-12 col-form-text">
                                            <div className="avatar m-auto">
                                                <img src="/stratroom/images/user/user7.jpg" width="72" height="72" className="rounded-circle" alt="User" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">KPI Name</label>
                                        <div className="col-md-9 col-form-text">
                                            <p><span>Net Revenue</span></p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Alignment Objectives</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">Increase net revenue by 15%</span>
                                                <span className="badge rounded-pill label-bg-dark">Increase net revenue by 15%</span>
                                                <span className="badge rounded-pill label-bg-dark">Increase net revenue by 15%</span>
                                                <span className="badge rounded-pill label-bg-dark">Increase net revenue by 15%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Owner</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">Karthik Ramani</span>
                                                <span className="badge rounded-pill label-bg-dark">StratRoom</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Target Audience</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">Existing customers</span>
                                                <span className="badge rounded-pill label-bg-dark">B2B clients looking for long-term partnerships</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Current Actual</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2"><span className="badge rounded-pill label-bg-dark">$2M</span></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Target</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">$2.3M</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Measurement Method</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">Monthly financial reports</span>
                                                <span className="badge rounded-pill label-bg-dark">Sales data tracking</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Strategic Initiatives</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">Sales Strategies: Campaigns to upsell and cross-sell to existing customers</span>
                                                <span className="badge rounded-pill label-bg-dark">Cost Optimization: Reduce operational expenses by 5</span>
                                                <span className="badge rounded-pill label-bg-dark">Customer Retention: Implement a customer loyalty program</span>
                                                <span className="badge rounded-pill label-bg-dark">Pricing Strategy: Review and adjust pricing strategy to better align with market trends</span>
                                                <span className="badge rounded-pill label-bg-dark">New Revenue Streams: Explore new revenue streams</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Timelines</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">Q1</span>
                                                <span className="badge rounded-pill label-bg-dark">Q2 </span>
                                                <span className="badge rounded-pill label-bg-dark">Q3 </span>
                                                <span className="badge rounded-pill label-bg-dark">Q4 </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Reporting Frequency</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">Monthly</span>
                                                <span className="badge rounded-pill label-bg-dark">Quarterly </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Success Criteria</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">Sales Strategies: Campaigns to upsell and cross-sell to existing customers</span>
                                                <span className="badge rounded-pill label-bg-dark">Cost Optimization: Reduce operational expenses by 5</span>
                                                <span className="badge rounded-pill label-bg-dark">Achieving a 15% increase in net revenue (from $2M to $2.3M).</span>
                                                <span className="badge rounded-pill label-bg-dark">Maintaining or improving profit margins despite potential cost increases.</span>
                                                <span className="badge rounded-pill label-bg-dark">Customer retention rate improves by 10% over the quarter.</span>
                                                <span className="badge rounded-pill label-bg-dark">Identifying and launching at least one new revenue stream with measurable impact.</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="staticEmail" className="col-md-3 col-form-label">Risks</label>
                                        <div className="col-md-9 col-form-text">
                                            <div className="d-flex flex-wrap gap-2">
                                                <span className="badge rounded-pill label-bg-dark">Uncertainty in market conditions affecting performance.</span>
                                                <span className="badge rounded-pill label-bg-dark">Difficulty in cutting costs without impacting the quality of service or product.</span>
                                                <span className="badge rounded-pill label-bg-dark">Customer resistance to new pricing strategies or upsell offers.</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label htmlFor="supportNeeded" className="col-md-3 col-form-label">Support Needed</label>
                                        <div className="col-md-9 col-form-text">
                                            <textarea className="form-control" id="supportNeeded" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="remarks" className="col-md-3 col-form-label">Remarks</label>
                                        <div className="col-md-9 col-form-text">
                                            <textarea className="form-control" id="remarks" rows="3"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                        <button className="btn btn-primary" value="Save">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CreateTemplateModal = () => {
    return (
        <div className="modal fade" id="create-template" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down ">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Templates</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <form id="menuForm">
                                    <div className="grid gap-3">
                                        <div className="g-col-12">
                                            <div className="form-group">
                                                <label htmlFor="menuName" className="form-label">Name</label>
                                                <input type="text" className="form-control" id="menuName" placeholder="Enter Name" required />
                                            </div>
                                        </div>
                                        <div className="g-col-12 g-col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="pageType" className="form-label">Page Type</label>
                                                <select id="pageType" className="form-select" required defaultValue="">
                                                    <option value="" disabled>Select Page Type</option>
                                                    <option value="Plan">Plan</option>
                                                    <option value="Measure">Measure</option>
                                                    <option value="Execute">Execute</option>
                                                    <option value="Govern">Govern</option>
                                                    <option value="Meet">Meet</option>
                                                    <option value="Report">Report</option>
                                                    <option value="Masters">Masters</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="g-col-12 g-col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="boardType" className="form-label">Board Type</label>
                                                <select id="boardType" className="form-select" required defaultValue="">
                                                    <option value="" disabled>Select Board Type</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                        <button className="btn btn-primary" id="saveMenuBtn">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const EditModal = () => {
    return (
        <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <form id="editForm" className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Menu Text</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type="text" id="editInput" className="form-control" required />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
