import React, { useEffect, useState } from 'react';
import { useScorecardContext } from '../../../context/ScorecardContext';
import { getReporteeList, updateScorecardV2 } from '../../../services/scorecardApi';
import { getAllDepartmentList } from '../../../api/scorecardApi';
import { getOrgId, saveCustomPerformance } from '../../../api/controlPanelApi';
import { useScorecardSettings } from '../../../hooks/useScorecardSettings';

export const ScorecardSettingsModal = ({ scorecardData }) => {
    const { reload } = useScorecardContext();
    const { settings, refreshSettings } = useScorecardSettings();
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
        // V2 scorecard fields (sc_scorecards): description + performance formula.
        setDescription(rawCard.description || '');
        setPerformance(rawCard.formula || '');

        // Date parsing (backend format might vary, just trying to convert to YYYY-MM-DD or display)
        const formatDt = (dt) => dt ? new Date(dt).toISOString().split('T')[0] : '';
        setStartDate(formatDt(rawCard.startDate));
        setEndDate(formatDt(rawCard.endDate));

        if (rawCard.scoreCardDetailsValue) {
            const vals = rawCard.scoreCardDetailsValue;
            if (vals.description) setDescription(vals.description);
            setStatus(vals.status || '');
            if (vals.performance) setPerformance(vals.performance);
        }

        // Initialize checkboxes from the Global Scorecard Settings context
        const s = settings || {};
        setFields({
            Actual: s.scorecardactual !== 'false',
            Target: s.scorecardtarget !== 'false',
            Budget: s.scorecardstrech === 'true', // Strech
            Forecast: s.scorecardstable === 'true', // Stable
            Baseline: s.scorecardbaseline === 'true',
            Index: s.scorecardindex !== 'false',
            Trend: s.scorecardtrend !== 'false',
            Risk: s.scorecardrisk !== 'false',
            Decline: s.scorecardshrink === 'true', // Shrink
            Type: s.type === 'true',
        });
    }, [rawCard, settings]);

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
        
        // The scorecard lives in the V2 sc_scorecards table; its primary key is
        // exposed as scoreCardDetailsId by the transform. Save name/description/formula
        // through the V2 endpoint (the same one the header + button uses).
        const id = scorecardData?.scoreCardDetailsId ?? rawCard.id;
        if (!id) {
            alert('Could not determine the scorecard id to save.');
            setSaving(false);
            return;
        }

        try {
            await updateScorecardV2(id, {
                name,
                description,
                formula: performance || null,
                aggregationMethod: performance ? 'FORMULA' : 'WEIGHTED',
            });
            
            const orgId = getOrgId();
            if (orgId) {
                const dto = {
                    orgId,
                    generalSettingValue: {
                        ...(settings || {}),
                        audittrailtype: 'customPerformance',
                        scorecardactual: fields.Actual ? "true" : "false",
                        scorecardtarget: fields.Target ? "true" : "false",
                        scorecardstrech: fields.Budget ? "true" : "false",
                        scorecardstable: fields.Forecast ? "true" : "false",
                        scorecardbaseline: fields.Baseline ? "true" : "false",
                        scorecardindex: fields.Index ? "true" : "false",
                        scorecardtrend: fields.Trend ? "true" : "false",
                        scorecardrisk: fields.Risk ? "true" : "false",
                        scorecardshrink: fields.Decline ? "true" : "false",
                        type: fields.Type ? "true" : "false",
                    }
                };
                await saveCustomPerformance(dto);
                if (refreshSettings) await refreshSettings();
            }
            
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
