import React, { useState, useEffect } from 'react';
import { saveKpi } from '../../../api/kpiApi';

export const KpiDescriptionModal = ({ isViewOnly, kpi, onSaveSuccess }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Manual');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (kpi) {
            setName(kpi.kpiName || '');
            setDescription(kpi.kpiDesc || '');
            setStatus(kpi.kpiType || 'Manual');
        }
    }, [kpi]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = {
                ...kpi,
                kpiName: name,
                kpiDesc: description,
                kpiType: status
            };
            await saveKpi(payload);
            if (onSaveSuccess) onSaveSuccess(payload);
            document.querySelector('#kpi-des-modal .btn-close')?.click();
        } catch (e) {
            console.error("Failed to save KPI", e);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div id="kpi-des-modal" className="modal custom-modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down modal-lg modal-lg-600">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">KPI Description</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card custom-card border-0">
                            <form className="card-body">
                                <div className="grid gap-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1rem' }}>
                                    <div style={{ gridColumn: 'span 3' }}>
                                        <div className="form-group">
                                            <label htmlFor="kpiDesId" className="form-label">ID</label>
                                            <input type="text" className="form-control" name="kpiDesId" id="kpiDesId" placeholder="ID" defaultValue={kpi?.kpiCode || ''} readOnly={isViewOnly} />
                                        </div>
                                    </div>
                                    <div style={{ gridColumn: 'span 9' }}>
                                        <div className="form-group">
                                            <label htmlFor="kpiDesName" className="form-label">Name</label>
                                            <input type="text" className="form-control" name="kpiDesName" id="kpiDesName" placeholder="Name" value={name} onChange={e => setName(e.target.value)} readOnly={isViewOnly} />
                                        </div>
                                    </div>
                                    <div style={{ gridColumn: 'span 12' }}>
                                        <div className="form-group">
                                            <label htmlFor="kpiDesDescription" className="form-label">Description</label>
                                            <textarea className="form-control" id="kpiDesDescription" placeholder="Description" rows="3" value={description} onChange={e => setDescription(e.target.value)} readOnly={isViewOnly}></textarea>
                                        </div>
                                    </div>
                                    <div style={{ gridColumn: 'span 6' }}>
                                        <div className="form-group">
                                            <label htmlFor="kpiDesOwner" className="form-label">Owner</label>
                                            <select id="kpiDesOwner" name="kpiDesOwner" className="form-select" disabled={isViewOnly} defaultValue={kpi?.empName || ''}>
                                                <option value="" disabled hidden>Select Owner</option>
                                                <option value={kpi?.empName || ''}>{kpi?.empName || 'Select Owner'}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ gridColumn: 'span 6' }}>
                                        <div className="form-group">
                                            <label htmlFor="kpiDesStatus" className="form-label">Status</label>
                                            <select id="kpiDesStatus" name="kpiDesStatus" className="form-select" disabled={isViewOnly} value={status} onChange={e => setStatus(e.target.value)}>
                                                <option value="" disabled hidden>Select Status</option>
                                                <option value="Manual">Manual</option>
                                                <option value="Weighted">Weighted</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '20px', padding: '10px 0', borderTop: '1px solid #eee' }}>
                                    <div>
                                        <strong>Created By:</strong> {kpi?.createdBy || 'System'}<br/>
                                        <strong>Created Date:</strong> {kpi?.createdDate || 'N/A'}
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <strong>Modified By:</strong> {kpi?.modifiedBy || 'System'}<br/>
                                        <strong>Modified Date:</strong> {kpi?.modifiedDate || 'N/A'}
                                    </div>
                                </div>
                                {!isViewOnly && (
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                                        <button type="button" className="btn btn-sm btn-label-secondary rounded-pill" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-sm btn-primary rounded-pill" onClick={handleSave} disabled={saving}>
                                            {saving ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
