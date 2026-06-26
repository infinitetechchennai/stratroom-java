import { ThresholdSelector } from './ThresholdSelector';
import React, { useEffect, useRef, useState } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { getReporteeList } from '../../../services/scorecardApi';

// Single-box date range picker showing "MM/DD/YYYY - MM/DD/YYYY" (like the live app).
export const DateRangeInput = ({ id, disabled }) => {
    const ref = useRef(null);
    useEffect(() => {
        if (!ref.current) return undefined;
        const fp = flatpickr(ref.current, {
            mode: 'range',
            dateFormat: 'm/d/Y',
            conjunction: ' - ',
            clickOpens: !disabled,
        });
        return () => fp.destroy();
    }, [disabled]);
    return (
        <input ref={ref} type="text" id={id} className="form-control"
            placeholder="Start/End Date" readOnly={disabled} />
    );
};

// Logged-in user from the stored profile (name + employee id).
function currentUser() {
    try {
        const p = JSON.parse(localStorage.getItem('profile') || '{}');
        const name = [p.firstName, p.lastName].filter(Boolean).join(' ')
            || p.name || p.displayName || p.userName || p.emailAddress || p.email || '';
        const id = p.empId ?? p.id ?? '';
        return { id: String(id), name };
    } catch {
        return { id: '', name: '' };
    }
}

// Owner dropdown: defaults to the logged-in user, then lists their reportees.
// No hardcoded names.
export const OwnerSelect = ({ id, className }) => {
    const me = currentUser();
    const [owners, setOwners] = useState([]);
    useEffect(() => {
        let active = true;
        getReporteeList()
            .then((list) => { if (active && Array.isArray(list)) setOwners(list); })
            .catch(() => {});
        return () => { active = false; };
    }, []);
    const meValue = me.id || me.name;
    return (
        <select name={id} id={id} className={className} data-placeholder="Select Owner" defaultValue={meValue}>
            {me.name && <option value={meValue}>{me.name}</option>}
            {owners.map((o) => {
                const oid = String(o.empId ?? o.id ?? o.employeeId ?? '');
                const oname = [o.firstName, o.lastName].filter(Boolean).join(' ')
                    || o.name || o.fullName || o.employeeName || o.emailAddress || '';
                if (!oname || oid === me.id) return null;
                return <option key={oid || oname} value={oid || oname}>{oname}</option>;
            })}
        </select>
    );
};

export const KpiAddModal = () => {
    return (
        <div className="modal custom-modal fade kpi_setting" id="kpi-add-modal" data-bs-backdrop="static"
            data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="Add KPI" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 data-translate="page.scorecard.addKPI" className="modal-title">Add KPI</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3">
                                    <div className="g-col-12 g-col-md-8">
                                        <div className="form-group">
                                            <label htmlFor="akpiName" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.name">Name</label>
                                            <input type="text" className="form-control" name="akpiName" id="akpiName"
                                                data-translate="page.scorecard.scorecardItems.name" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="akpiPolarity" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.polarity">Polarity</label>
                                            <select name="akpiPolarity" id="akpiPolarity"
                                                className="form-select select-dropdown-add-kpi"
                                                data-placeholder="Select Polarity" defaultValue="">
                                                <option value="" disabled>Select Polarity</option>
                                                <option value="LEAD">Lead</option>
                                                <option value="LAG">Lag</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="akpiDescription" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.description">Description</label>
                                            <textarea className="form-control" name="akpiDescription" id="akpiDescription"
                                                data-translate="page.scorecard.scorecardItems.description"
                                                placeholder="Description" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="akpiMeasurementFrequency" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.measurementFrequency">Measurement Frequency</label>
                                            <select name="akpiMeasurementFrequency" id="akpiMeasurementFrequency"
                                                className="form-select select-dropdown-add-kpi"
                                                data-placeholder="Select Measurement Frequency" defaultValue="">
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
                                            <label htmlFor="akpiOwner" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.owner">Owner</label>
                                            <OwnerSelect id="akpiOwner" className="form-select select-dropdown-add-kpi" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="akpiDataSource" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.dataSource">Data Source</label>
                                            <select name="akpiDataSource" id="akpiDataSource" className="form-select select-dropdown-add-kpi"
                                                data-placeholder="Select Data Source" defaultValue="">
                                                <option value="" disabled>Select Data Source</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Source">Source</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="akpiPerformance" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.performance">Performance</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="akpiPerformance"
                                                    data-translate="page.scorecard.scorecardItems.performance"
                                                    placeholder="Performance" aria-label=""
                                                    aria-describedby="button-addon2" />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2"
                                                    data-bs-toggle="modal" data-bs-target="#kpi_formula_popup" onClick={() => { window._kpiCalcCallerModalId = 'kpi-add-modal'; if (window.handleFormulaEvent) window.handleFormulaEvent('KPIPERFORMANCE'); }}
                                                    data-translate="page.scorecard.scorecardItems.kpiCalculator">
                                                    KPI Calculator
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="akpiType" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.kpiType">KPI Type</label>
                                            <select name="akpiType" id="akpiType" data-placeholder="Select KPI Type"
                                                className="form-select select-dropdown-add-kpi" defaultValue="">
                                                <option value="" disabled>Select KPI Type</option>
                                                <option value="Number">Number</option>
                                                <option value="Percentage">Percentage</option>
                                                <option value="Currency">Currency</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="akpiCurrency" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.kpiCurrency">KPI Currency</label>
                                            <input type="text" className="form-control" id="akpiCurrency"
                                                placeholder="KPI Currency" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="akpiThreshold" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.threshold">Threshold</label>
                                            <ThresholdSelector idPrefix="akpi" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label className="form-label"
                                                data-translate="page.scorecard.scorecardItems.startEndDate">Start/End Date</label>
                                            <DateRangeInput id="akpiStartEndDate" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="akpiContribution" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.contribution">Contribution(%)</label>
                                            <input type="text" className="form-control" name="akpiContribution"
                                                id="akpiContribution"
                                                data-translate="page.scorecard.scorecardItems.contribution"
                                                placeholder="Contribution(%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="akpiWeight" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.weight">Weight (%)</label>
                                            <input type="text" className="form-control" id="akpiWeight"
                                                data-translate="page.scorecard.scorecardItems.weight"
                                                placeholder="Weight (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="akipSubWeight" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.subWeight">Sub Weight (%)</label>
                                            <input type="text" className="form-control" id="akipSubWeight"
                                                data-translate="page.scorecard.scorecardItems.subWeight"
                                                placeholder="Sub Weight (%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="akpiStatus" className="form-label"
                                                data-translate="page.scorecard.scorecardItems.status">Status</label>
                                            <select name="akpiStatus" id="akpiStatus" data-placeholder="Select Status"
                                                className="form-select select-dropdown-add-kpi" defaultValue="">
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
                        <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close"
                            data-translate="actions.cancel">
                            Cancel
                        </button>
                        <button type="button" className="btn btn-primary" value="Save" data-translate="actions.save" data-bs-dismiss="modal" onClick={() => console.log('TODO: Implement Save KPI API call')}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const KpiEditModal = () => {
    return (
        <div className="modal custom-modal fade kpi_setting" id="kpi-edit-modal" data-bs-backdrop="static"
            data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="Edit KPI" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Edit KPI Description</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3">
                                    <div className="g-col-12 g-col-md-8">
                                        <div className="form-group">
                                            <label htmlFor="ekpiName" className="form-label">Name</label>
                                            <input type="text" className="form-control" name="ekpiName" id="ekpiName" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="ekpiPolarity" className="form-label">Polarity</label>
                                            <select name="ekpiPolarity" id="ekpiPolarity" className="form-select select-dropdown-edit-kpi" data-placeholder="Select Polarity" defaultValue="">
                                                <option value="" disabled>Select Polarity</option>
                                                <option value="LEAD">Lead</option>
                                                <option value="LAG">Lag</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="ekpiDescription" className="form-label">Description</label>
                                            <textarea className="form-control" name="ekpiDescription" id="ekpiDescription" placeholder="Description" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="ekpiMeasurementFrequency" className="form-label">Measurement Frequency</label>
                                            <select name="ekpiMeasurementFrequency" id="ekpiMeasurementFrequency" className="form-select select-dropdown-edit-kpi" data-placeholder="Select Measurement Frequency" defaultValue="">
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
                                            <label htmlFor="ekpiOwner" className="form-label">Owner</label>
                                            <OwnerSelect id="ekpiOwner" className="form-select select-dropdown-edit-kpi" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="ekpiDataSource" className="form-label">Data Source</label>
                                            <select name="ekpiDataSource" id="ekpiDataSource" className="form-select select-dropdown-edit-kpi" data-placeholder="Select Data Source" defaultValue="">
                                                <option value="" disabled>Select Data Source</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Source">Source</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="ekpiActual" className="form-label">Actual</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="ekpiActual" placeholder="Performance" aria-label="" aria-describedby="button-addon2" readOnly />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#kpiActual-calculator-modal" onClick={() => { window._kpiCalcCallerModalId = 'kpi-edit-modal'; if (window.handleFormulaEvent) window.handleFormulaEvent('KPI'); }}>KPI Calculator</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="ekpiPerformance" className="form-label">Performance</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="ekpiPerformance" placeholder="Performance" aria-label="" aria-describedby="button-addon2" readOnly />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#kpi_formula_popup" onClick={() => { window._kpiCalcCallerModalId = 'kpi-edit-modal'; if (window.handleFormulaEvent) window.handleFormulaEvent('KPIPERFORMANCE'); }}>KPI Calculator</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="ekpiYearToDate" className="form-label">Year To Date (YTD)</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="ekpiYearToDate" placeholder="Year To Date (YTD)" aria-label="" aria-describedby="button-addon2" readOnly />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#ytd-calculator-modal" onClick={() => { window._kpiCalcCallerModalId = 'kpi-edit-modal'; }}>YTD Calculator</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="ekpiType" className="form-label">KPI Type</label>
                                            <select name="ekpiType" id="ekpiType" data-placeholder="Select KPI Type" className="form-select select-dropdown-edit-kpi" defaultValue="">
                                                <option value="" disabled>Select KPI Type</option>
                                                <option value="Number">Number</option>
                                                <option value="Percentage">Percentage</option>
                                                <option value="Currency">Currency</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="ekpiCurrency" className="form-label">KPI Currency</label>
                                            <input type="text" className="form-control" id="ekpiCurrency" placeholder="KPI Currency" />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="ekpiThreshold" className="form-label">Threshold</label>
                                            <ThresholdSelector idPrefix="ekpi" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label className="form-label">Start/End Date</label>
                                            <DateRangeInput id="ekpiStartEndDate" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="ekpiContribution" className="form-label">Contribution(%)</label>
                                            <input type="text" className="form-control" id="ekpiContribution" placeholder="Contribution(%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="ekpiWeight" className="form-label">Weight (%)</label>
                                            <input type="text" className="form-control" id="ekpiWeight" placeholder="Weight (%)" />
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
                                            <label htmlFor="ekpiStatus" className="form-label">Status</label>
                                            <select name="ekpiStatus" id="ekpiStatus" data-placeholder="Select Status" className="form-select select-dropdown-edit-kpi" defaultValue="">
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
                        <button type="button" className="btn btn-primary" value="Save" data-translate="actions.save" data-bs-dismiss="modal" onClick={() => console.log('TODO: Implement Save KPI API call')}>Save</button>
                        <div className="modal-audit">
                            <div className="audit-listing">
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.createdBy">Created By</span> :</div>
                                    <div className="text" id="ekpiCreatedBy">-</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.lastModifiedBy">Modified By</span> :</div>
                                    <div className="text" id="ekpiModifiedBy">-</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.createdOn">Created Date</span> :</div>
                                    <div className="text" id="ekpiCreatedDate">-</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.lastModifiedOn">Modified Date</span> :</div>
                                    <div className="text" id="ekpiModifiedDate">-</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const KpiViewModal = () => {
    return (
        <div className="modal custom-modal fade kpi_setting" id="kpi-view-modal" data-bs-backdrop="static"
            data-bs-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="View KPI" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">View KPI Description</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <div className="card-body">
                                <div className="grid gap-3">
                                    <div className="g-col-12 g-col-md-8">
                                        <div className="form-group">
                                            <label htmlFor="vkpiName" className="form-label">Name</label>
                                            <input type="text" className="form-control" name="vkpiName" id="vkpiName" placeholder="Name" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vkpiPolarity" className="form-label">Polarity</label>
                                            <select name="vkpiPolarity" id="vkpiPolarity" className="form-select select-dropdown-view-kpi" data-placeholder="Select Polarity" defaultValue="">
                                                <option value="" disabled>Select Polarity</option>
                                                <option value="LEAD">Lead</option>
                                                <option value="LAG">Lag</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="vkpiDescription" className="form-label">Description</label>
                                            <textarea className="form-control" name="vkpiDescription" id="vkpiDescription" placeholder="Description" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vkpiMeasurementFrequency" className="form-label">Measurement Frequency</label>
                                            <select name="vkpiMeasurementFrequency" id="vkpiMeasurementFrequency" className="form-select select-dropdown-view-kpi" data-placeholder="Select Measurement Frequency" defaultValue="">
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
                                            <label htmlFor="vkpiOwner" className="form-label">Owner</label>
                                            <OwnerSelect id="vkpiOwner" className="form-select select-dropdown-view-kpi" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="vkpiDataSource" className="form-label">Data Source</label>
                                            <select name="vkpiDataSource" id="vkpiDataSource" className="form-select select-dropdown-view-kpi" data-placeholder="Select Data Source" defaultValue="">
                                                <option value="" disabled>Select Data Source</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Source">Source</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vkpiActual" className="form-label">Actual</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="vkpiActual" placeholder="Performance" aria-label="" aria-describedby="button-addon2" readOnly />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#kpiActual-calculator-modal" onClick={() => { window._kpiCalcCallerModalId = 'kpi-view-modal'; if (window.handleFormulaEvent) window.handleFormulaEvent('KPI'); }}>KPI Calculator</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vkpiPerformance" className="form-label">Performance</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="vkpiPerformance" placeholder="Performance" aria-label="" aria-describedby="button-addon2" readOnly />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#kpi_formula_popup" onClick={() => { window._kpiCalcCallerModalId = 'kpi-view-modal'; if (window.handleFormulaEvent) window.handleFormulaEvent('KPIPERFORMANCE'); }}>KPI Calculator</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vkpiYearToDate" className="form-label">Year To Date (YTD)</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" id="vkpiYearToDate" placeholder="Year To Date (YTD)" aria-label="" aria-describedby="button-addon2" readOnly />
                                                <button className="btn btn-label-secondary" type="button" id="button-addon2" data-bs-toggle="modal" data-bs-target="#ytd-calculator-modal" onClick={() => { window._kpiCalcCallerModalId = 'kpi-view-modal'; }}>YTD Calculator</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vkpiType" className="form-label">KPI Type</label>
                                            <select name="vkpiType" id="vkpiType" data-placeholder="Select KPI Type" className="form-select select-dropdown-view-kpi" defaultValue="">
                                                <option value="" disabled>Select KPI Type</option>
                                                <option value="Number">Number</option>
                                                <option value="Percentage">Percentage</option>
                                                <option value="Currency">Currency</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="vkpiCurrency" className="form-label">KPI Currency</label>
                                            <input type="text" className="form-control" id="vkpiCurrency" placeholder="KPI Currency" readOnly />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label htmlFor="vkpiThreshold" className="form-label">Threshold</label>
                                            <ThresholdSelector idPrefix="vkpi" disabled />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label className="form-label">Start/End Date</label>
                                            <DateRangeInput id="vkpiStartEndDate" disabled />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="vkpiContribution" className="form-label">Contribution(%)</label>
                                            <input type="text" className="form-control" id="vkpiContribution" placeholder="Contribution(%)" />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-md-6 g-col-lg-3">
                                        <div className="form-group">
                                            <label htmlFor="vkpiWeight" className="form-label">Weight (%)</label>
                                            <input type="text" className="form-control" id="vkpiWeight" placeholder="Weight (%)" />
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
                                            <label htmlFor="vkpiStatus" className="form-label">Status</label>
                                            <select name="vkpiStatus" id="vkpiStatus" data-placeholder="Select Status" className="form-select select-dropdown-view-kpi" defaultValue="">
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
                        <button type="button" className="btn btn-primary" value="Save" data-translate="actions.save" data-bs-dismiss="modal" onClick={() => console.log('TODO: Implement Save KPI API call')}>Save</button>
                        <div className="modal-audit">
                            <div className="audit-listing">
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.createdBy">Created By</span> :</div>
                                    <div className="text" id="vkpiCreatedBy">-</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.lastModifiedBy">Modified By</span> :</div>
                                    <div className="text" id="vkpiModifiedBy">-</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.createdOn">Created Date</span> :</div>
                                    <div className="text" id="vkpiCreatedDate">-</div>
                                </div>
                                <div className="audit-box">
                                    <div className="title"><span data-translate="page.scorecard.audit.lastModifiedOn">Modified Date</span> :</div>
                                    <div className="text" id="vkpiModifiedDate">-</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
