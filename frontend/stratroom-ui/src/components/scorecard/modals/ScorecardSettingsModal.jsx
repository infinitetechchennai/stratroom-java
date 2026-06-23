import React, { useEffect, useState } from 'react';
import { useScorecardContext } from '../../../context/ScorecardContext';
import { getReporteeList, updateScorecardDetails } from '../../../services/scorecardApi';
import { getAllDepartmentList } from '../../../api/scorecardApi';

export const ScorecardSettingsModal = ({ scorecardData }) => {
    const { reload } = useScorecardContext();
    const rawCard = scorecardData?.rawCard || {};
    const [saving, setSaving] = useState(false);

    // Dropdown options
    const [owners, setOwners] = useState([]);
    const [departments, setDepartments] = useState([]);

    // Form states
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [department, setDepartment] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [performance, setPerformance] = useState('');

    // Checkboxes
    const [fields, setFields] = useState({
        Actual: false,
        Target: false,
        Budget: false, // Strech
        Forecast: false, // Stable
        Baseline: false,
        Index: false, // Score
        Trend: false,
        Risk: false,
        Decline: false, // Shrink
        Type: false,
    });

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [repRes, deptRes] = await Promise.all([
                    getReporteeList().catch(() => []),
                    getAllDepartmentList().catch(() => ({ data: [] }))
                ]);
                setOwners(Array.isArray(repRes) ? repRes : []);
                setDepartments(Array.isArray(deptRes?.data) ? deptRes.data : []);
            } catch (err) {
                console.error("Failed to load options", err);
            }
        };
        fetchOptions();
    }, []);



    useEffect(() => {
        if (!rawCard) return;

        setName(rawCard.scorecardName || '');
        setOwner(rawCard.owner?.toString() || '');
        setDepartment(rawCard.departmentId?.toString() || '');
        
        // Date parsing (backend format might vary, just trying to convert to YYYY-MM-DD or display)
        const formatDt = (dt) => dt ? new Date(dt).toISOString().split('T')[0] : '';
        setStartDate(formatDt(rawCard.startDate));
        setEndDate(formatDt(rawCard.endDate));

        if (rawCard.scoreCardDetailsValue) {
            const vals = rawCard.scoreCardDetailsValue;
            setDescription(vals.description || '');
            setStatus(vals.status || '');
            setPerformance(vals.performance || '');

            const checkedFields = vals.scorecardFields || [];
            setFields({
                Actual: checkedFields.includes('Actual'),
                Target: checkedFields.includes('Target'),
                Budget: checkedFields.includes('Budget') || checkedFields.includes('Strech'),
                Forecast: checkedFields.includes('Forecast') || checkedFields.includes('Stable'),
                Baseline: checkedFields.includes('Baseline'),
                Index: checkedFields.includes('Index') || checkedFields.includes('Score'),
                Trend: checkedFields.includes('Trend'),
                Risk: checkedFields.includes('Risk'),
                Decline: checkedFields.includes('Decline') || checkedFields.includes('Shrink'),
                Type: checkedFields.includes('Type'),
            });
        }
    }, [rawCard]);

    const handleCheckbox = (key) => {
        setFields(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        
        // Prepare selected fields
        const selectedFields = Object.keys(fields).filter(k => fields[k]);
        
        const saveStartDate = startDate;
        const saveEndDate = endDate;
        
        const payload = {
            id: rawCard.id,
            active: rawCard.active || 1,
            owner: parseInt(owner, 10) || rawCard.owner,
            createdBy: rawCard.createdBy,
            updatedBy: rawCard.updatedBy,
            pageId: rawCard.pageId,
            scorecardName: name,
            startDate: saveStartDate,
            endDate: saveEndDate,
            departmentId: parseInt(department, 10) || null,
            scoreCardDetailsValue: {
                ...(rawCard.scoreCardDetailsValue || {}),
                description,
                status,
                performance,
                scorecardFields: selectedFields
            }
        };

        try {
            await updateScorecardDetails(payload);
            const modalEl = document.getElementById('add-settings-modal');
            if (modalEl && window.bootstrap) {
                const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
                if (modalInstance) modalInstance.hide();
            }
            if (reload) await reload();
        } catch (err) {
            console.error('Failed to update settings:', err);
            alert('Failed to update settings: ' + (err.message || 'Unknown error'));
        } finally {
            setSaving(false);
        }
    };

    return (
        <div
            className="modal custom-modal fade kpi_setting scorecard_description_popup"
            id="add-settings-modal"
            tabIndex="-1"
            role="dialog"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Settings</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={handleSave}>
                            <div className="card custom-card border-0">
                                <div className="card-body">
                                    <div className="grid gap-3">
                                        <div className="g-col-12">
                                            <div className="form-group">
                                                <label className="form-label">Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control browser-default"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="g-col-12">
                                            <div className="form-group">
                                                <label className="form-label">Description</label>
                                                <textarea
                                                    className="form-control browser-default"
                                                    rows="6"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="g-col-12 g-col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Owner</label>
                                                <select
                                                    className="form-control browser-default"
                                                    value={owner}
                                                    onChange={(e) => setOwner(e.target.value)}
                                                    style={{ display: 'block' }}
                                                >
                                                    <option value="">Choose...</option>
                                                    {owners.map(o => (
                                                        <option key={o.id} value={o.id}>{o.name || o.firstName}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="g-col-12 g-col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Department</label>
                                                <select
                                                    className="form-control select2"
                                                    value={department}
                                                    onChange={(e) => setDepartment(e.target.value)}
                                                >
                                                    <option value="">Choose...</option>
                                                    {departments.map(d => (
                                                        <option key={d.id} value={d.id}>{d.name || d.departmentName}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="g-col-12 g-col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Start/End Date</label>
                                                <div className="d-flex gap-2">
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={startDate && startDate.split('/').length === 3 ? `${startDate.split('/')[2]}-${startDate.split('/')[0].padStart(2, '0')}-${startDate.split('/')[1].padStart(2, '0')}` : ''}
                                                        onChange={e => {
                                                            const d = e.target.value;
                                                            if (!d) return setStartDate('');
                                                            const [y, m, day] = d.split('-');
                                                            setStartDate(`${m}/${day}/${y}`);
                                                        }}
                                                    />
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={endDate && endDate.split('/').length === 3 ? `${endDate.split('/')[2]}-${endDate.split('/')[0].padStart(2, '0')}-${endDate.split('/')[1].padStart(2, '0')}` : ''}
                                                        onChange={e => {
                                                            const d = e.target.value;
                                                            if (!d) return setEndDate('');
                                                            const [y, m, day] = d.split('-');
                                                            setEndDate(`${m}/${day}/${y}`);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="g-col-12 g-col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Status</label>
                                                <select
                                                    className="form-control browser-default"
                                                    value={status}
                                                    onChange={(e) => setStatus(e.target.value)}
                                                >
                                                    <option value="">Choose</option>
                                                    <option value="Manual">Manual</option>
                                                    <option value="Weighted">Weighted</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="g-col-12">
                                            <div className="form-group">
                                                <label className="form-label">Performance</label>
                                                <input
                                                    type="text"
                                                    id="scorecardSettingsPerformance"
                                                    className="form-control browser-default"
                                                    style={{ cursor: 'pointer' }}
                                                    placeholder="Click to build formula"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#kpi-calculator-modal"
                                                    value={performance}
                                                    onChange={(e) => setPerformance(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="g-col-12 mt-3">
                                <div className="form-group">
                                    <label className="form-label">Scorecard Fields</label>
                                    <div className="d-grid grid-template gap-2">
                                        {Object.keys(fields).map((key) => {
                                            const displayLabel = key === 'Budget' ? 'Strech' 
                                                : key === 'Forecast' ? 'Stable' 
                                                : key === 'Decline' ? 'Shrink'
                                                : key;
                                            return (
                                                <div className="form-check" key={key}>
                                                    <input
                                                        className="form-check-input scorecardviewsettingchange"
                                                        type="checkbox"
                                                        id={`sc-field-${key}`}
                                                        checked={fields[key]}
                                                        onChange={() => handleCheckbox(key)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`sc-field-${key}`}>
                                                        {displayLabel}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary initative_save_btn" disabled={saving}>
                                    {saving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
