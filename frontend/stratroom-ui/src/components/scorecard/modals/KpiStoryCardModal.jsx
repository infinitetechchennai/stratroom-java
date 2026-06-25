import React from 'react';
import { useScorecardContext } from '../../../context/ScorecardContext';

const Row = ({ label, value, isText, pillBg, pillColor, noBorder }) => {
    return (
        <div style={{ 
            display: 'flex', 
            padding: '16px 20px', 
            borderBottom: noBorder ? 'none' : '1px solid #f4f4f5',
            alignItems: 'center'
        }}>
            <div style={{ width: '30%', fontWeight: '600', fontSize: '13px', color: '#3f3f46' }}>
                {label}
            </div>
            <div style={{ width: '70%', fontSize: '13px', color: '#52525b' }}>
                {isText ? (
                    value
                ) : value ? (
                    <span style={{ 
                        background: pillBg, 
                        color: pillColor, 
                        padding: '4px 14px', 
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '500'
                    }}>
                        {value}
                    </span>
                ) : null}
            </div>
        </div>
    );
};

export const KpiStoryCardModal = () => {
    const { storyCardItem } = useScorecardContext();
    const item = storyCardItem || {};

    const name = item.name || 'N/A';
    const owner = item.ownerName || item.ownerId || item.owner || 'N/A';
    const initials = owner !== 'N/A' ? owner.substring(0, 2).toUpperCase() : 'NA';
    
    const actual = item.actual || 'N/A';
    const target = item.target || 'N/A';
    const measure = item.measurement || item.kpi_measurement || 'N/A';
    const frequency = item.period || item.frequency || 'N/A';
    const alignment = item.alignment || 'N/A';

    const handleSave = () => {
        const container = document.getElementById('scorecard-toast-container');
        if (container) {
            const id = `sc-toast-${Date.now()}`;
            const html = `
              <div id="${id}" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                  <div class="toast-body">Support Needed saved successfully.</div>
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

        const modalEl = document.getElementById('kpi-story-card-modal');
        if (modalEl && window.bootstrap?.Modal) {
            const inst = window.bootstrap.Modal.getOrCreateInstance(modalEl);
            if (inst) inst.hide();
        }
    };

    return (
        <div className="modal fade" id="kpi-story-card-modal" tabIndex="-1" role="dialog" aria-hidden="true" style={{ zIndex: 1060 }}>
            <div className="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
                <div className="modal-content shadow" style={{ borderRadius: '10px', border: 'none' }}>
                    
                    {/* Header */}
                    <div className="modal-header" style={{ padding: '16px 24px', borderBottom: '1px solid #f4f4f5' }}>
                        <h5 className="modal-title" style={{ fontSize: '15px', fontWeight: '600', color: '#18181b' }}>KPI Story Card</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{ fontSize: '12px' }}></button>
                    </div>
                    
                    {/* Body */}
                    <div className="modal-body" style={{ padding: '24px', background: '#fff' }}>
                        <div style={{ border: '1px solid #e4e4e7', borderRadius: '8px', overflow: 'hidden' }}>
                            
                            {/* Circle Avatar Row */}
                            <div style={{ padding: '20px', borderBottom: '1px solid #f4f4f5' }}>
                                <div style={{ 
                                    width: 52, height: 52, borderRadius: '50%', 
                                    border: '1px solid #d4d4d8', display: 'flex', 
                                    alignItems: 'center', justifyContent: 'center', 
                                    fontSize: 15, color: '#52525b', background: '#fff'
                                }}>
                                    {initials}
                                </div>
                            </div>

                            {/* Rows */}
                            <Row label="KPI Name" value={name} isText />
                            <Row label="Alignment Objectives" value={alignment} pillBg="#f1f5f9" pillColor="#475569" />
                            <Row label="Owner" value={owner} pillBg="#dcfce7" pillColor="#15803d" />
                            <Row label="Target Audience" value="N/A" pillBg="#ffe4e6" pillColor="#be123c" />
                            <Row label="Current Actual" value={actual} pillBg="#fef08a" pillColor="#a16207" />
                            <Row label="Target" value={target} pillBg="#dbeafe" pillColor="#1d4ed8" />
                            <Row label="Measurement Method" value={measure} pillBg="#ffedd5" pillColor="#c2410c" />
                            <Row label="Strategic Initiatives" />
                            <Row label="Timelines" value="N/A" pillBg="#f1f5f9" pillColor="#475569" />
                            <Row label="Reporting Frequency" value={frequency} pillBg="#dcfce7" pillColor="#15803d" />
                            <Row label="Success Criteria" value="N/A" pillBg="#ffedd5" pillColor="#c2410c" />
                            <Row label="Risks" />
                            
                            {/* Support Needed Row */}
                            <div style={{ display: 'flex', padding: '16px 20px', alignItems: 'flex-start' }}>
                                <div style={{ width: '30%', fontWeight: '600', fontSize: '13px', color: '#3f3f46', marginTop: '8px' }}>
                                    Support Needed
                                </div>
                                <div style={{ width: '70%' }}>
                                    <textarea 
                                        className="form-control" 
                                        rows="3" 
                                        style={{ 
                                            resize: 'vertical', 
                                            borderRadius: '6px', 
                                            border: '1px solid #e4e4e7', 
                                            fontSize: '13px',
                                            padding: '10px 12px',
                                            outline: 'none',
                                            boxShadow: 'none'
                                        }}
                                    ></textarea>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Footer */}
                    <div className="modal-footer" style={{ padding: '16px 24px', borderTop: 'none' }}>
                        <button type="button" className="btn btn-light btn-sm px-3 py-2" data-bs-dismiss="modal" style={{ background: '#f1f5f9', border: 'none', color: '#475569', fontWeight: 500, borderRadius: '6px' }}>Cancel</button>
                        <button type="button" onClick={handleSave} className="btn btn-primary btn-sm px-4 py-2"  style={{ background: '#1e293b', color: '#fff', fontWeight: 500, borderRadius: '6px' }}>Save</button>
                    </div>

                </div>
            </div>
        </div>
    );
};
