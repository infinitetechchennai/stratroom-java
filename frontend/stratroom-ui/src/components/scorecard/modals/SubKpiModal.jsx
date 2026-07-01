import { ThresholdSelector } from './ThresholdSelector';
import { OwnerSelect, DateRangeInput } from './KpiModal';
import React from 'react';

export const SubKpiAddModal = () => {
    return (
        <div className="modal custom-modal fade kpi_setting" id="subkpi-add-modal" data-bs-backdrop="static"
            data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="Add Sub Kpi" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add Sub Kpi</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3">
                                    <div className="g-col-12 g-col-md-8">
                                        <div className="form-group">
                                            <label htmlFor="askpiName" className="form-label">Name</label>
                                            <input type="text" className="form-control" name="askpiName" id="askpiName" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="askpiPolarity" className="form-label">Polarity</label>
                                            <select name="askpiPolarity" id="askpiPolarity" className="form-select select-dropdown-add-subkpi" data-placeholder="Select Polarity" defaultValue="">
                                                <option value="" disabled>Select Polarity</option>
                                                <option value="LEAD">Lead</option>
                                                <option value="LAG">Lag</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="askpiDescription" className="form-label">Description</label>
                                            <textarea className="form-control" name="askpiDescription" id="askpiDescription" placeholder="Description" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="askpiMeasurementFrequency" className="form-label">Measurement Frequency</label>
                                            <select name="askpiMeasurementFrequency" id="askpiMeasurementFrequency" className="form-select select-dropdown-add-subkpi" data-placeholder="Select Measurement Frequency" defaultValue="">
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
                                            <label htmlFor="askpiOwner" className="form-label">Owner</label>
                                            <OwnerSelect id="askpiOwner" className="form-select select-dropdown-add-subkpi" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="askpiDataSource" className="form-label">Data Source</label>
                                            <select name="askpiDataSource" className="form-select select-dropdown-add-subkpi" data-placeholder="Select Data Source" defaultValue="">
                                                <option value="" disabled>Select Data Source</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Source">Source</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="askpiPerformance" className="form-label">Performance</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="askpiPerformance" placeholder="Performance" aria-label="" aria-describedby="button-addon2" readOnly />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#kpi_formula_popup" onClick={() => { window._kpiCalcCallerModalId = 'subkpi-add-modal'; if (window.handleFormulaEvent) window.handleFormulaEvent('KPIPERFORMANCE'); }}>KPI Calculator</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="askpiType" className="form-label">KPI Type</label>
                                            <select name="askpiType" id="askpiType" data-placeholder="Select KPI Type" className="form-select select-dropdown-add-subkpi" defaultValue="">
                                                <option value="" disabled>Select KPI Type</option>
                                                <option value="Number">Number</option>
                                                <option value="Percentage">Percentage</option>
                                                <option value="Currency">Currency</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="askpiThreshold" className="form-label">Threshold</label>
                                            <ThresholdSelector idPrefix="askpi" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="askpiStartEndDate" className="form-label">Start/End Date</label>
                                            <DateRangeInput id="askpiStartEndDate" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="askpiContribution" className="form-label">Contribution (%)</label>
                                            <input type="text" className="form-control" id="askpiContribution" placeholder="Contribution (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="askpiWeight" className="form-label">Weight (%)</label>
                                            <input type="text" className="form-control" id="askpiWeight" placeholder="Weight (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="akipSubWeight" className="form-label">Sub Weight (%)</label>
                                            <input type="text" className="form-control" id="akipSubWeight" placeholder="Sub Weight (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="askpiStatus" className="form-label">Status</label>
                                            <select name="askpiStatus" id="askpiStatus" data-placeholder="Select Status" className="form-select select-dropdown-add-subkpi" defaultValue="">
                                                <option value="" disabled>Select Status</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Weighted">Weighted</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                        <button className="btn btn-primary" value="Save" data-translate="actions.save">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SubKpiEditModal = () => {
    return (
        <div className="modal custom-modal fade kpi_setting" id="subkpi-edit-modal" data-bs-backdrop="static"
            data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="Edit Sub KPI" aria-hidden="true">
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
                                            <label htmlFor="eskpiName" className="form-label">Name</label>
                                            <input type="text" className="form-control" name="eskpiName" id="eskpiName" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="eskpiPolarity" className="form-label">Polarity</label>
                                            <select name="eskpiPolarity" id="eskpiPolarity" className="form-select select-dropdown-edit-subkpi" data-placeholder="Select Polarity" defaultValue="">
                                                <option value="" disabled>Select Polarity</option>
                                                <option value="LEAD">Lead</option>
                                                <option value="LAG">Lag</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="eskpiDescription" className="form-label">Description</label>
                                            <textarea className="form-control" name="eskpiDescription" id="eskpiDescription" placeholder="Description" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="eskpiMeasurementFrequency" className="form-label">Measurement Frequency</label>
                                            <select name="eskpiMeasurementFrequency" id="eskpiMeasurementFrequency" className="form-select select-dropdown-edit-subkpi" data-placeholder="Select Measurement Frequency" defaultValue="">
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
                                            <label htmlFor="eskpiOwner" className="form-label">Owner</label>
                                            <OwnerSelect id="eskpiOwner" className="form-select select-dropdown-edit-subkpi" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="eskpiDataSource" className="form-label">Data Source</label>
                                            <select name="eskpiDataSource" className="form-select select-dropdown-edit-subkpi" data-placeholder="Select Data Source" defaultValue="">
                                                <option value="" disabled>Select Data Source</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Source">Source</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="eskpiActual" className="form-label">Actual</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="eskpiActual" placeholder="Performance" aria-label="" aria-describedby="button-addon2" readOnly />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#kpiActual-calculator-modal" onClick={() => { window._kpiCalcCallerModalId = 'subkpi-edit-modal'; if (window.handleFormulaEvent) window.handleFormulaEvent('KPI'); }}>KPI Calculator</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="eskpiPerformance" className="form-label">Performance</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="eskpiPerformance" placeholder="Performance" aria-label="" aria-describedby="button-addon2" readOnly />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#kpi_formula_popup" onClick={() => { window._kpiCalcCallerModalId = 'subkpi-edit-modal'; if (window.handleFormulaEvent) window.handleFormulaEvent('KPIPERFORMANCE'); }}>KPI Calculator</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="eskpiYtd" className="form-label">Year To Date (YTD)</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="eskpiYtd" placeholder="Year To Date (YTD)" aria-label="" aria-describedby="button-addon2" readOnly />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#ytd-calculator-modal" onClick={() => { window._kpiCalcCallerModalId = 'subkpi-edit-modal'; }}>YTD Calculator</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="eskpiType" className="form-label">KPI Type</label>
                                            <select name="eskpiType" id="eskpiType" data-placeholder="Select KPI Type" className="form-select select-dropdown-edit-subkpi" defaultValue="">
                                                <option value="" disabled>Select KPI Type</option>
                                                <option value="Number">Number</option>
                                                <option value="Percentage">Percentage</option>
                                                <option value="Currency">Currency</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="eskpiThreshold" className="form-label">Threshold</label>
                                            <ThresholdSelector idPrefix="eskpi" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="eskpiStartEndDate" className="form-label">Start/End Date</label>
                                            <DateRangeInput id="eskpiStartEndDate" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="eskpiContribution" className="form-label">Contribution(%)</label>
                                            <input type="text" className="form-control" id="eskpiContribution" placeholder="Contribution(%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="eskpiWeight" className="form-label">Weight (%)</label>
                                            <input type="text" className="form-control" id="eskpiWeight" placeholder="Weight (%)" />
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
                                            <label htmlFor="eskpiStatus" className="form-label">Status</label>
                                            <select name="eskpiStatus" id="eskpiStatus" data-placeholder="Select Status" className="form-select select-dropdown-edit-subkpi" defaultValue="">
                                                <option value="" disabled>Select Status</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Weighted">Weighted</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                        <button className="btn btn-primary" value="Save" data-translate="actions.save">Save</button>
                        <div className="modal-audit">
                            <div className="audit-listing">
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.createdBy">Created By</span> :</div>
                                    <div className="text" id="eskpiCreatedBy">-</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.lastModifiedBy">Modified By</span> :</div>
                                    <div className="text" id="eskpiModifiedBy">-</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.createdOn">Created Date</span> :</div>
                                    <div className="text" id="eskpiCreatedDate">-</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.lastModifiedOn">Modified Date</span> :</div>
                                    <div className="text" id="eskpiModifiedDate">-</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SubKpiViewModal = () => {
    return (
        <div className="modal custom-modal fade kpi_setting" id="subkpi-view-modal" data-bs-backdrop="static"
            data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="View KPI" aria-hidden="true">
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
                                            <label htmlFor="vskpiName" className="form-label">Name</label>
                                            <input type="text" className="form-control" name="vskpiName" id="vskpiName" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vskpiPolarity" className="form-label">Polarity</label>
                                            <select name="vskpiPolarity" id="vskpiPolarity" className="form-select select-dropdown-view-subkpi" data-placeholder="Select Polarity" defaultValue="">
                                                <option value="" disabled>Select Polarity</option>
                                                <option value="LEAD">Lead</option>
                                                <option value="LAG">Lag</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="vskpiDescription" className="form-label">Description</label>
                                            <textarea className="form-control" name="vskpiDescription" id="vskpiDescription" placeholder="Description" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vskpiMeasurementFrequency" className="form-label">Measurement Frequency</label>
                                            <select name="vskpiMeasurementFrequency" id="vskpiMeasurementFrequency" className="form-select select-dropdown-view-subkpi" data-placeholder="Select Measurement Frequency" defaultValue="">
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
                                            <label htmlFor="vskpiOwner" className="form-label">Owner</label>
                                            <input type="text" className="form-control" id="vskpiOwner" readOnly />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vskpiDataSource" className="form-label">Data Source</label>
                                            <input type="text" className="form-control" id="vskpiDataSource" readOnly />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vskpiActual" className="form-label">Actual</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="vskpiActual" placeholder="Performance" aria-label="" aria-describedby="button-addon2" readOnly />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#kpiActual-calculator-modal" onClick={() => { window._kpiCalcCallerModalId = 'subkpi-view-modal'; if (window.handleFormulaEvent) window.handleFormulaEvent('KPI'); }}>KPI Calculator</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vskpiPerformance" className="form-label">Performance</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="vskpiPerformance" placeholder="Performance" aria-label="" aria-describedby="button-addon2" readOnly />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#kpi_formula_popup" onClick={() => { window._kpiCalcCallerModalId = 'subkpi-view-modal'; if (window.handleFormulaEvent) window.handleFormulaEvent('KPIPERFORMANCE'); }}>KPI Calculator</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vskpiYtd" className="form-label">Year To Date (YTD)</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="vskpiYtd" placeholder="Year To Date (YTD)" aria-label="" aria-describedby="button-addon2" readOnly />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#ytd-calculator-modal" onClick={() => { window._kpiCalcCallerModalId = 'subkpi-view-modal'; }}>YTD Calculator</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vskpiType" className="form-label">KPI Type</label>
                                            <select name="vskpiType" id="vskpiType" data-placeholder="Select KPI Type" className="form-select select-dropdown-view-subkpi" defaultValue="">
                                                <option value="" disabled>Select KPI Type</option>
                                                <option value="Number">Number</option>
                                                <option value="Percentage">Percentage</option>
                                                <option value="Currency">Currency</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="vskpiThreshold" className="form-label">Threshold</label>
                                            <ThresholdSelector idPrefix="vskpi" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="vskpiStartEndDate" className="form-label">Start/End Date</label>
                                            <DateRangeInput id="vskpiStartEndDate" disabled />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="vskpiWeight" className="form-label">Weight (%)</label>
                                            <input type="text" className="form-control" id="vskpiWeight" placeholder="Weight (%)" />
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
                                            <label htmlFor="vskpiStatus" className="form-label">Status</label>
                                            <select name="vskpiStatus" id="vskpiStatus" data-placeholder="Select Status" className="form-select select-dropdown-view-subkpi" defaultValue="">
                                                <option value="" disabled>Select Status</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Weighted">Weighted</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                        <button className="btn btn-primary" value="Save" data-translate="actions.save">Save</button>
                        <div className="modal-audit">
                            <div className="audit-listing">
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.createdBy">Created By</span> :</div>
                                    <div className="text" id="vskpiCreatedBy">-</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.lastModifiedBy">Modified By</span> :</div>
                                    <div className="text" id="vskpiModifiedBy">-</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.createdOn">Created Date</span> :</div>
                                    <div className="text" id="vskpiCreatedDate">-</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.lastModifiedOn">Modified Date</span> :</div>
                                    <div className="text" id="vskpiModifiedDate">-</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
