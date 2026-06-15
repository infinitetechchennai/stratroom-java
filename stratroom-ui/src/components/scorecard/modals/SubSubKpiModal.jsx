import React from 'react';

export const SubSubKpiEditModal = () => {
    return (
        <div className="modal custom-modal fade kpi_setting" id="subsubkpi-edit-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="Edit Sub KPI" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Sub KPI Description</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3">
                                    <div className="g-col-12 g-col-md-8">
                                        <div className="form-group">
                                            <label htmlFor="esskpiName" className="form-label">Name</label>
                                            <input type="text" className="form-control" name="esskpiName" id="esskpiName" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="esskpiPolarity" className="form-label">Polarity</label>
                                            <select name="esskpiPolarity" id="esskpiPolarity" className="form-select select-dropdown-edit-subsubkpi" data-placeholder="Select Polarity" defaultValue="">
                                                <option value="" disabled>Select Polarity</option>
                                                <option value="1">Lead</option>
                                                <option value="2">Lag</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="esskpiDescription" className="form-label">Description</label>
                                            <textarea className="form-control" name="esskpiDescription" id="esskpiDescription" placeholder="Description" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="esskpiMeasurementFrequency" className="form-label">Measurement Frequency</label>
                                            <select name="esskpiMeasurementFrequency" id="esskpiMeasurementFrequency" className="form-select select-dropdown-edit-subsubkpi" data-placeholder="Select Measurement Frequency" defaultValue="">
                                                <option value="" disabled>Select Measurement Frequency</option>
                                                <option value="Monthly">Monthly</option>
                                                <option value="Quarterly">Quarterly</option>
                                                <option value="Half Yearly">Half Yearly</option>
                                                <option value="Annually">Annually</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="esskpiOwner" className="form-label">Owner</label>
                                            <select name="esskpiOwner" id="esskpiOwner" className="form-select select-dropdown-edit-subsubkpi" data-placeholder="Select Owner" defaultValue="">
                                                <option value="" disabled>Select Owner</option>
                                                <option value="David Miller">David Miller</option>
                                                <option value="Raman V">Raman V</option>
                                                <option value="Bryan Adams">Bryan Adams</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="esskpiDataSource" className="form-label">Data Source</label>
                                            <select name="esskpiDataSource" className="form-select select-dropdown-edit-subsubkpi" data-placeholder="Select Data Source" defaultValue="">
                                                <option value="" disabled>Select Data Source</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Source">Source</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="esskpiFields" className="form-label">KPI Fields</label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id="esskpifActual" />
                                                    <label className="form-check-label" htmlFor="esskpifActual">Actual</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id="esskpifTarget" />
                                                    <label className="form-check-label" htmlFor="esskpifTarget">Target</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id="esskpifBudget" />
                                                    <label className="form-check-label" htmlFor="esskpifBudget">Budget</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id="esskpifForecast" />
                                                    <label className="form-check-label" htmlFor="esskpifForecast">Forecast</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="esskpiActual" className="form-label">Actual</label>
                                            <input type="text" className="form-control" id="esskpiActual" placeholder="Actual" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="esskpiTarget" className="form-label">Target</label>
                                            <input type="text" className="form-control" name="esskpiTarget" placeholder="Target" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="esskpiPerformance" className="form-label">Performance</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="esskpiPerformance" placeholder="Performance" aria-label="" aria-describedby="button-addon2" />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#kpi-calculator-modal">
                                                    KPI Calculator
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="esskpiType" className="form-label">KPI Type</label>
                                            <select name="esskpiType" id="esskpiType" data-placeholder="Select KPI Type" className="form-select select-dropdown-edit-subsubkpi" defaultValue="">
                                                <option value="" disabled>Select KPI Type</option>
                                                <option value="Number">Number</option>
                                                <option value="Percentage">Percentage</option>
                                                <option value="Currency">Currency</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="esskpiThreshold" className="form-label">Threshold</label>
                                            <div className="grid gap-3">
                                                <div className="g-col-12">
                                                    <select name="esskpiThreshold" id="esskpiThreshold" className="form-select select-dropdown-edit-subsubkpi" data-placeholder="Select Threshold" defaultValue="">
                                                        <option value="" disabled>Select Threshold</option>
                                                        <option value="option_1">One Status</option>
                                                        <option value="option_2">Two Status</option>
                                                        <option value="option_3">Three Status</option>
                                                        <option value="option_4">Five Status</option>
                                                    </select>
                                                </div>
                                                <div className="g-col-12">
                                                    <div className="color-pickers">
                                                        <div className="scorecard-color-pickers">
                                                            <div className="input-group">
                                                                <input id="option1color1" type="text" className="form-control" />
                                                                <span className="input-group-text pickr" id="p-1" role="button" aria-label="threshold" style={{backgroundColor: '#ff0000'}}></span>
                                                            </div>
                                                            <div className="input-group">
                                                                <input id="option1color1" type="text" className="form-control" />
                                                                <span className="input-group-text pickr" id="p-2" role="button" aria-label="threshold" style={{backgroundColor: '#FF4B3E'}}></span>
                                                            </div>
                                                            <div className="input-group">
                                                                <input id="option1color1" type="text" className="form-control" />
                                                                <span className="input-group-text pickr" id="p-3" role="button" aria-label="toggle color picker dialog" style={{backgroundColor: '#FFC107'}}></span>
                                                            </div>
                                                            <div className="input-group">
                                                                <input id="option1color1" type="text" className="form-control" />
                                                                <span className="input-group-text pickr" id="p-4" role="button" aria-label="threshold" style={{backgroundColor: '#5FCD5F'}}></span>
                                                            </div>
                                                            <div className="input-group">
                                                                <input id="option1color1" type="text" className="form-control" />
                                                                <span className="input-group-text pickr" id="p-5" role="button" aria-label="threshold" style={{backgroundColor: '#027D02'}}></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="esskpiStartEndDate" className="form-label">Start/End Date</label>
                                            <input type="text" className="form-control" name="esskpiStartEndDate" placeholder="Start/End Date" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="esskpiContribution" className="form-label">Contribution(%)</label>
                                            <input type="text" className="form-control" id="esskpiContribution" placeholder="Contribution(%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="esskpiWeight" className="form-label">Weight (%)</label>
                                            <input type="text" className="form-control" id="esskpiWeight" placeholder="Weight (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="ekipSubWeight" className="form-label">Sub Weight (%)</label>
                                            <input type="text" className="form-control" id="ekipSubWeight" placeholder="Sub Weight (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="esskpiStatus" className="form-label">Status</label>
                                            <select name="esskpiStatus" id="esskpiStatus" data-placeholder="Select Status" className="form-select select-dropdown-edit-subsubkpi" defaultValue="">
                                                <option value="" disabled>Select Status</option>
                                                <option value="David Miller">David Miller</option>
                                                <option value="Raman V">Raman V</option>
                                                <option value="Bryan Adams">Bryan Adams</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                            Cancel
                        </button>
                        <button className="btn btn-primary" value="Save">Save
                        </button>
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

export const SubSubKpiViewModal = () => {
    return (
        <div className="modal custom-modal fade kpi_setting" id="subsubkpi-view-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="View Sub Sub KPI" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">View Sub KPI Description</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3">
                                    <div className="g-col-12 g-col-md-8">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiName" className="form-label">Name</label>
                                            <input type="text" className="form-control" name="vsskpiName" id="vsskpiName" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiPolarity" className="form-label">Polarity</label>
                                            <select name="vsskpiPolarity" id="vsskpiPolarity" className="form-select select-dropdown-view-subsubkpi" data-placeholder="Select Polarity" defaultValue="">
                                                <option value="" disabled>Select Polarity</option>
                                                <option value="1">Lead</option>
                                                <option value="2">Lag</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiDescription" className="form-label">Description</label>
                                            <textarea className="form-control" name="vsskpiDescription" id="vsskpiDescription" placeholder="Description" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiMeasurementFrequency" className="form-label">Measurement Frequency</label>
                                            <select name="vsskpiMeasurementFrequency" id="vsskpiMeasurementFrequency" className="form-select select-dropdown-view-subsubkpi" data-placeholder="Select Measurement Frequency" defaultValue="">
                                                <option value="" disabled>Select Measurement Frequency</option>
                                                <option value="Monthly">Monthly</option>
                                                <option value="Quarterly">Quarterly</option>
                                                <option value="Half Yearly">Half Yearly</option>
                                                <option value="Annually">Annually</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiOwner" className="form-label">Owner</label>
                                            <select name="vsskpiOwner" id="vsskpiOwner" className="form-select select-dropdown-view-subsubkpi" data-placeholder="Select Owner" defaultValue="">
                                                <option value="" disabled>Select Owner</option>
                                                <option value="David Miller">David Miller</option>
                                                <option value="Raman V">Raman V</option>
                                                <option value="Bryan Adams">Bryan Adams</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiDataSource" className="form-label">Data Source</label>
                                            <select name="vsskpiDataSource" className="form-select select-dropdown-view-subsubkpi" data-placeholder="Select Data Source" defaultValue="">
                                                <option value="" disabled>Select Data Source</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Source">Source</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiFields" className="form-label">KPI Fields</label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id="vsskpifActual" />
                                                    <label className="form-check-label" htmlFor="vsskpifActual">Actual</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id="vsskpifTarget" />
                                                    <label className="form-check-label" htmlFor="vsskpifTarget">Target</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id="vsskpifBudget" />
                                                    <label className="form-check-label" htmlFor="vsskpifBudget">Budget</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="checkbox" id="vsskpifForecast" />
                                                    <label className="form-check-label" htmlFor="vsskpifForecast">Forecast</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiActual" className="form-label">Actual</label>
                                            <input type="text" className="form-control" id="vsskpiActual" placeholder="Actual" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiTarget" className="form-label">Target</label>
                                            <input type="text" className="form-control" name="vsskpiTarget" placeholder="Target" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiPerformance" className="form-label">Performance</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="vsskpiPerformance" placeholder="Performance" aria-label="" aria-describedby="button-addon2" />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#kpi-calculator-modal">
                                                    KPI Calculator
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiType" className="form-label">KPI Type</label>
                                            <select name="vsskpiType" id="vsskpiType" data-placeholder="Select KPI Type" className="form-select select-dropdown-view-subsubkpi" defaultValue="">
                                                <option value="" disabled>Select KPI Type</option>
                                                <option value="Number">Number</option>
                                                <option value="Percentage">Percentage</option>
                                                <option value="Currency">Currency</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiThreshold" className="form-label">Threshold</label>
                                            <div className="grid gap-3">
                                                <div className="g-col-12">
                                                    <select name="vsskpiThreshold" id="vsskpiThreshold" className="form-select select-dropdown-view-subsubkpi" data-placeholder="Select Threshold" defaultValue="">
                                                        <option value="" disabled>Select Threshold</option>
                                                        <option value="option_1">One Status</option>
                                                        <option value="option_2">Two Status</option>
                                                        <option value="option_3">Three Status</option>
                                                        <option value="option_4">Five Status</option>
                                                    </select>
                                                </div>
                                                <div className="g-col-12">
                                                    <div className="color-pickers">
                                                        <div className="scorecard-color-pickers">
                                                            <div className="input-group">
                                                                <input id="option1color1" type="text" className="form-control" />
                                                                <span className="input-group-text pickr" id="p-1" role="button" aria-label="threshold" style={{backgroundColor: '#ff0000'}}></span>
                                                            </div>
                                                            <div className="input-group">
                                                                <input id="option1color1" type="text" className="form-control" />
                                                                <span className="input-group-text pickr" id="p-2" role="button" aria-label="threshold" style={{backgroundColor: '#FF4B3E'}}></span>
                                                            </div>
                                                            <div className="input-group">
                                                                <input id="option1color1" type="text" className="form-control" />
                                                                <span className="input-group-text pickr" id="p-3" role="button" aria-label="toggle color picker dialog" style={{backgroundColor: '#FFC107'}}></span>
                                                            </div>
                                                            <div className="input-group">
                                                                <input id="option1color1" type="text" className="form-control" />
                                                                <span className="input-group-text pickr" id="p-4" role="button" aria-label="threshold" style={{backgroundColor: '#5FCD5F'}}></span>
                                                            </div>
                                                            <div className="input-group">
                                                                <input id="option1color1" type="text" className="form-control" />
                                                                <span className="input-group-text pickr" id="p-5" role="button" aria-label="threshold" style={{backgroundColor: '#027D02'}}></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiStartEndDate" className="form-label">Start/End Date</label>
                                            <input type="text" className="form-control" name="vsskpiStartEndDate" placeholder="Start/End Date" />
                                        </div>
                                    </div>

                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiContributio" className="form-label">Contribution(%)</label>
                                            <input type="text" className="form-control" id="vsskpiContributio" placeholder="Contribution(%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiWeight" className="form-label">Weight (%)</label>
                                            <input type="text" className="form-control" id="vsskpiWeight" placeholder="Weight (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="vkipSubWeight" className="form-label">Sub Weight (%)</label>
                                            <input type="text" className="form-control" id="vkipSubWeight" placeholder="Sub Weight (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="vsskpiStatus" className="form-label">Status</label>
                                            <select name="vsskpiStatus" id="vsskpiStatus" data-placeholder="Select Status" className="form-select select-dropdown-view-subsubkpi" defaultValue="">
                                                <option value="" disabled>Select Status</option>
                                                <option value="David Miller">David Miller</option>
                                                <option value="Raman V">Raman V</option>
                                                <option value="Bryan Adams">Bryan Adams</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">
                            Cancel
                        </button>
                        <button className="btn btn-primary" value="Save">Save
                        </button>
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
