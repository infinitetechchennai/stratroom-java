import React, { useState, useEffect } from 'react';
import { useScorecardContext } from '../../../context/ScorecardContext';
import { getReporteeList } from '../../../services/scorecardApi';

const Pills = ({ value }) => {
    if (!value || value === 'N/A') return null;
    let items = [];
    if (Array.isArray(value)) {
        items = value;
    } else if (typeof value === 'string') {
        items = value.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
    } else {
        items = [String(value)];
    }

    if (items.length === 0) return null;

    return (
        <div className="d-flex flex-wrap gap-2">
            {items.map((item, idx) => (
                <span key={idx} className="badge rounded-pill label-bg-dark">
                    {item}
                </span>
            ))}
        </div>
    );
};

export const KpiStoryCardModal = () => {
    const { storyCardItem, setStoryCardItem } = useScorecardContext();
    const [owners, setOwners] = useState([]);
    const [supportNeeded, setSupportNeeded] = useState('');
    const [remarks, setRemarks] = useState('');

    const item = storyCardItem || {};

    useEffect(() => {
        if (item.id || item.kpiId) {
            const id = item.id || item.kpiId;
            setSupportNeeded(localStorage.getItem(`kpi_storycard_support_${id}`) || item.supportNeeded || item.support_needed || '');
            setRemarks(localStorage.getItem(`kpi_storycard_remarks_${id}`) || item.remarks || '');
        }
    }, [item.id, item.kpiId]);

    useEffect(() => {
        let active = true;
        getReporteeList()
            .then((list) => { if (active && Array.isArray(list)) setOwners(list); })
            .catch(() => { });
        return () => { active = false; };
    }, []);

    let owner = item.ownerName || item.ownerId || item.owner || 'N/A';
    if (owner !== 'N/A' && owners.length > 0) {
        const o = owners.find(emp => String(emp.empId ?? emp.id ?? emp.employeeId) === String(owner));
        if (o) {
            owner = [o.firstName, o.lastName].filter(Boolean).join(' ') || o.name || o.fullName || o.employeeName || owner;
        }
    }

    const name = item.name || 'N/A';
    const actual = item.actual || 'N/A';
    const target = item.target || 'N/A';
    const measure = item.measurement || item.kpi_measurement || item.measurementMethod || 'N/A';
    const frequency = item.period || item.frequency || item.reportingFrequency || 'N/A';
    const alignment = item.alignment || 'N/A';

    const handleSave = () => {
        const container = document.getElementById('scorecard-toast-container');
        if (container) {
            const id = `sc-toast-${Date.now()}`;
            const html = `
              <div id="${id}" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                  <div class="toast-body">Saved successfully.</div>
                  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
              </div>`;
            container.insertAdjacentHTML('beforeend', html);
            const el = document.getElementById(id);
            if (window.bootstrap?.Toast) {
                const t = new window.bootstrap.Toast(el, { delay: 3500 });
                t.show();
                el.addEventListener('hidden.bs.toast', () => el.remove());
            }
        }

        if (item.id || item.kpiId) {
            const id = item.id || item.kpiId;
            localStorage.setItem(`kpi_storycard_support_${id}`, supportNeeded);
            localStorage.setItem(`kpi_storycard_remarks_${id}`, remarks);
            if (setStoryCardItem) {
                setStoryCardItem(prev => ({ ...prev, supportNeeded, remarks }));
            }
        }

        const modalEl = document.getElementById('kpi-story-card-modal');
        if (modalEl && window.bootstrap?.Modal) {
            const inst = window.bootstrap.Modal.getOrCreateInstance(modalEl);
            if (inst) inst.hide();
        }
    };

    return (
        <div className="modal custom-modal fade" id="kpi-story-card-modal" data-bs-backdrop="static" data-bs-keyboard="false"
            tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel_1" aria-hidden="true" style={{ zIndex: 1060 }}>
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
                                                <img src="/assets/images/user/user7.jpg" width="72" height="72"
                                                    className="rounded-circle" alt="User avatar" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-md-3 col-form-label">KPI Name</label>
                                        <div className="col-md-9 col-form-text">
                                            <p><span style={{ fontWeight: 600 }}>{name}</span></p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-md-3 col-form-label">Alignment Objectives</label>
                                        <div className="col-md-9 col-form-text">
                                            <Pills value={alignment} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-md-3 col-form-label">Owner</label>
                                        <div className="col-md-9 col-form-text">
                                            <Pills value={owner} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-md-3 col-form-label">Target Audience</label>
                                        <div className="col-md-9 col-form-text">
                                            <Pills value={item.targetAudience} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-md-3 col-form-label">Current Actual</label>
                                        <div className="col-md-9 col-form-text">
                                            <Pills value={actual} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-md-3 col-form-label">Target</label>
                                        <div className="col-md-9 col-form-text">
                                            <Pills value={target} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-md-3 col-form-label">Measurement Method</label>
                                        <div className="col-md-9 col-form-text">
                                            <Pills value={measure} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-md-3 col-form-label">Strategic Initiatives</label>
                                        <div className="col-md-9 col-form-text">
                                            <Pills value={item.initiatives} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-md-3 col-form-label">Timelines</label>
                                        <div className="col-md-9 col-form-text">
                                            <Pills value={item.timelines} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-md-3 col-form-label">Reporting Frequency</label>
                                        <div className="col-md-9 col-form-text">
                                            <Pills value={frequency} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-md-3 col-form-label"></label>
                                        <div className="col-md-9 col-form-text">
                                            <Pills value={item.successCriteria} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-md-3 col-form-label">Risks</label>
                                        <div className="col-md-9 col-form-text">
                                            <Pills value={item.risks} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="supportNeeded" className="col-md-3 col-form-label">Support Needed</label>
                                        <div className="col-md-9 col-form-text">
                                            <textarea className="form-control" id="supportNeeded" rows="3" value={supportNeeded} onChange={(e) => setSupportNeeded(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="remarks" className="col-md-3 col-form-label">Remarks</label>
                                        <div className="col-md-9 col-form-text">
                                            <textarea className="form-control" id="remarks" rows="3" value={remarks} onChange={(e) => setRemarks(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-label-secondary" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
