import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getDisplayName, getInitials } from '../organization/landingPageUtils';
import {
    getPageListByType,
    getEmpId,
} from '../../services/scorecardApi';
import { getScorecardV2, recordKpiActual, recordSubKpiActual } from '../../services/scorecardV2Api';

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function getDateRange() {
    const y = new Date().getFullYear();
    return localStorage.getItem('customperiod') || `01/01/${y}-12/31/${y}`;
}

// Actuals/targets come back from the V2 calculation API already formatted for
// display (e.g. "0.6", "12%", "USD 1500"). Strip the formatting so the value can
// live in an editable numeric field and round-trip cleanly back to the API.
function toNumeric(v) {
    if (v === null || v === undefined || v === '') return '';
    return String(v).replace(/[^0-9.\-]/g, '');
}

// The V2 scorecard load returns a perspective → objective → kpi tree under
// cardDetailsDTO.scoreCardDTOS. Flatten it to the KPI list this form drives, using
// the real sc_kpis id (k.id) so saved actuals land on the right row.
function flattenV2Kpis(json, dateRange) {
    const perspectives = json?.cardDetailsDTO?.scoreCardDTOS || [];
    const out = [];
    perspectives.forEach(p => {
        (p.objectiveList || []).forEach(o => {
            (o.kpiList || []).forEach(k => {
                const v = k.kpiValue || {};
                out.push({
                    id: k.id,
                    name: v.name || k.kpiId || 'KPI',
                    actual: toNumeric(v.actual),
                    target: toNumeric(v.target),
                    measurement: v.kpi_measurement || '',
                    period: dateRange,
                    startEndDate: '',
                    validTill: '',
                    departmentName: '',
                    kpiType: '',
                    subKpiList: k.subKpiList || [],
                });
            });
        });
    });
    return out;
}

// ─────────────────────────────────────────────────────────────
// Label style
// ─────────────────────────────────────────────────────────────
const labelStyle = { display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#374151', marginBottom: '6px' };
const inputStyle = { fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '4px', padding: '8px 12px', height: '36px', width: '100%', outline: 'none', boxShadow: 'none' };
const selectStyle = { ...inputStyle, appearance: 'auto' };
const readonlyStyle = { ...inputStyle, background: '#e5e7eb', color: '#6b7280', cursor: 'not-allowed' };

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
export default function MyFormsPage() {
    const { user } = useAuth();
    const displayName = getDisplayName(user);
    const initials = getInitials(displayName) || 'DO';

    // ── State ──────────────────────────────────────────────
    const [pages, setPages] = useState([]);           // available scorecards (pages)
    const [kpis, setKpis] = useState([]);             // flat list of kpis for selected scorecard
    const [subKpis, setSubKpis] = useState([]);       // sub-kpis for selected kpi

    const [selectedPageId, setSelectedPageId] = useState('');
    const [selectedKpiId, setSelectedKpiId] = useState('');
    const [selectedSubKpiId, setSelectedSubKpiId] = useState('');

    // Auto-filled display fields
    const [fields, setFields] = useState({
        departmentName: '',
        measurementFrequency: '',
        kpiType: '',
        actual: '',
        target: '',
        startEndDate: '',
        period: '',
        validTill: '',
        comment: '',
    });

    const [file, setFile] = useState(null);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);
    const [loadingKpis, setLoadingKpis] = useState(false);

    // ── Load scorecard pages on mount ─────────────────────
    useEffect(() => {
        const empId = getEmpId();
        if (!empId) return;
        // Scorecards under the 'Measure' menu are the Standard_View pages; the
        // backend maps the "SCORECARD" key to those (pageType=Standard_View).
        getPageListByType(empId, 'SCORECARD')
            .then(data => {
                const list = Array.isArray(data) ? data : (data?.pageList || data?.data || []);
                setPages(list);
            })
            .catch(() => setPages([]));
    }, []);

    // ── Load the KPIs for a scorecard page from the V2 engine ──
    // The Scorecard dropdown carries the page id; the V2 endpoint keys on page_id
    // (the same store the live /scorecard page and the actual-save endpoint use), so
    // the KPI ids here match what recordKpiActual expects.
    const loadKpis = useCallback(async (pageId) => {
        if (!pageId) return;
        setLoadingKpis(true);
        const dateRange = getDateRange();
        try {
            const json = await getScorecardV2(pageId, dateRange);
            setKpis(flattenV2Kpis(json, dateRange));
        } catch {
            setKpis([]);
            showToast('Could not load KPIs for this scorecard.', 'error');
        } finally {
            setLoadingKpis(false);
        }
    }, []);

    // ── When a scorecard page is selected, load its KPIs ──
    useEffect(() => {
        setSelectedKpiId('');
        setSelectedSubKpiId('');
        resetFields();
        if (!selectedPageId) {
            setKpis([]);
            setSubKpis([]);
            return;
        }
        loadKpis(selectedPageId);
    }, [selectedPageId, loadKpis]);

    // ── When a KPI is selected, auto-fill all fields ──────
    useEffect(() => {
        if (!selectedKpiId) {
            resetFields();
            setSubKpis([]);
            return;
        }
        const kpi = kpis.find(k => String(k.id) === String(selectedKpiId));
        if (!kpi) return;
        setSubKpis(kpi.subKpiList || []);
        setSelectedSubKpiId('');
        const dateRange = getDateRange();
        const [start, end] = dateRange.split('-');
        setFields({
            departmentName: kpi.departmentName || '',
            measurementFrequency: kpi.measurement || '',
            kpiType: kpi.kpiType || '',
            actual: kpi.actual !== undefined ? String(kpi.actual) : '',
            target: kpi.target !== undefined ? String(kpi.target) : '',
            startEndDate: kpi.startEndDate || `${(start || '').trim()} - ${(end || '').trim()}`,
            period: kpi.period || dateRange,
            validTill: kpi.validTill || (end ? end.trim() : ''),
            comment: '',
        });
    }, [selectedKpiId, kpis]);

    // ── When a Sub-KPI is selected, override actual/target ─
    useEffect(() => {
        if (!selectedSubKpiId) return;
        const sub = subKpis.find(s => String(s.id) === String(selectedSubKpiId));
        if (!sub) return;
        setFields(prev => ({
            ...prev,
            actual: sub.subKpiValue?.actual ? toNumeric(sub.subKpiValue.actual) : prev.actual,
            target: sub.subKpiValue?.target ? toNumeric(sub.subKpiValue.target) : prev.target,
            measurementFrequency: sub.subKpiValue?.kpi_measurement || prev.measurementFrequency,
        }));
    }, [selectedSubKpiId, subKpis]);

    function resetFields() {
        setFields({ departmentName: '', measurementFrequency: '', kpiType: '', actual: '', target: '', startEndDate: '', period: '', validTill: '', comment: '' });
    }

    function showToast(msg, type = 'success') {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    }

    // ── Save: upsert the actual into sc_kpi_history (V2), then refresh ─────
    const handleSave = async () => {
        if (!selectedKpiId) return showToast('Please select a KPI first.', 'error');
        setSaving(true);
        try {
            const dateRange = getDateRange();
            const [start, end] = dateRange.split('-');
            const toIso = (s) => (s || '').trim().replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$1-$2');
            const payload = {
                periodStart: toIso(start),
                periodEnd: toIso(end),
                actualValue: fields.actual !== '' ? Number(fields.actual) : null,
            };
            // recordKpiActual/recordSubKpiActual throw on a non-2xx response, so a
            // failed save no longer reports success.
            if (selectedSubKpiId) {
                await recordSubKpiActual({ ...payload, subKpiId: Number(selectedSubKpiId) });
            } else {
                await recordKpiActual({ ...payload, kpiId: Number(selectedKpiId) });
            }
            showToast('Saved successfully!', 'success');
            // Re-fetch so the saved actual is reflected. The selection persists, so the
            // auto-fill effect repopulates the fields from the refreshed KPI list.
            await loadKpis(selectedPageId);
        } catch (err) {
            showToast(err.message || 'Save failed.', 'error');
        } finally {
            setSaving(false);
        }
    };

    // ── Render ─────────────────────────────────────────────
    return (
        <div style={{ background: '#ffffff', minHeight: 'calc(100vh - 60px)', paddingBottom: '60px' }}>
            {/* Header */}
            <div style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827', textTransform: 'uppercase' }}>DATA ENTRY FORM</span>
            </div>

            {/* Toast */}
            {toast && (
                <div style={{
                    position: 'fixed', top: 20, right: 20, zIndex: 9999,
                    background: toast.type === 'error' ? '#fef2f2' : '#f0fdf4',
                    border: `1px solid ${toast.type === 'error' ? '#fca5a5' : '#86efac'}`,
                    color: toast.type === 'error' ? '#991b1b' : '#166534',
                    padding: '10px 20px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    {toast.msg}
                </div>
            )}

            {/* Form */}
            <div style={{ maxWidth: '750px', margin: '30px auto', background: '#fff', borderRadius: '6px', border: '1px solid #e5e7eb', padding: '30px' }}>

                {/* Avatar */}
                <div style={{ width: 50, height: 50, borderRadius: '50%', border: '1px solid #9ca3af', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '24px' }}>
                    {initials}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* Scorecard */}
                    <div>
                        <label style={labelStyle}>Scorecard</label>
                        <select
                            style={selectStyle}
                            value={selectedPageId}
                            onChange={e => setSelectedPageId(e.target.value)}
                        >
                            <option value="">Select Scorecard</option>
                            {pages.map(p => (
                                <option key={p.id || p.pageId} value={p.id || p.pageId}>
                                    {p.name || p.pageName || `Page ${p.id || p.pageId}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* KPI */}
                    <div>
                        <label style={labelStyle}>KPI</label>
                        <select
                            style={selectStyle}
                            value={selectedKpiId}
                            onChange={e => setSelectedKpiId(e.target.value)}
                            disabled={!selectedPageId || loadingKpis}
                        >
                            <option value="">
                                {loadingKpis
                                    ? 'Loading…'
                                    : (selectedPageId && kpis.length === 0
                                        ? 'No record found'
                                        : 'Select KPI')}
                            </option>
                            {kpis.map(k => (
                                <option key={k.id} value={k.id}>{k.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Measures (Sub-KPI list) */}
                    <div>
                        <label style={labelStyle}>Measures</label>
                        <select
                            style={selectStyle}
                            value={selectedSubKpiId}
                            onChange={e => setSelectedSubKpiId(e.target.value)}
                            disabled={!selectedKpiId || subKpis.length === 0}
                        >
                            <option value="">Select Measures</option>
                            {subKpis.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.subKpiValue?.subMeasureName || s.name || `Sub-KPI ${s.id}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sub Measures */}
                    <div>
                        <label style={labelStyle}>Sub Measures</label>
                        <select style={selectStyle} disabled>
                            <option value="">Select Sub Measures</option>
                        </select>
                    </div>

                    {/* Department Name */}
                    <div>
                        <label style={labelStyle}>Department Name</label>
                        <input type="text" style={inputStyle} value={fields.departmentName}
                            onChange={e => setFields(prev => ({ ...prev, departmentName: e.target.value }))} />
                    </div>

                    {/* Measurement Frequency */}
                    <div>
                        <label style={labelStyle}>Measurement Frequency</label>
                        <input type="text" style={readonlyStyle} readOnly value={fields.measurementFrequency} />
                    </div>

                    {/* KPI Type */}
                    <div>
                        <label style={labelStyle}>KPI Type</label>
                        <input type="text" style={readonlyStyle} readOnly value={fields.kpiType} />
                    </div>

                    {/* Actual — editable */}
                    <div>
                        <label style={labelStyle}>Actual</label>
                        <input type="number" style={inputStyle} value={fields.actual}
                            onChange={e => setFields(prev => ({ ...prev, actual: e.target.value }))}
                            placeholder="Enter actual value" />
                    </div>

                    {/* Target — editable */}
                    <div>
                        <label style={labelStyle}>Target</label>
                        <input type="number" style={inputStyle} value={fields.target}
                            onChange={e => setFields(prev => ({ ...prev, target: e.target.value }))}
                            placeholder="Enter target value" />
                    </div>

                    {/* Start / End Date — readonly */}
                    <div>
                        <label style={labelStyle}>Start / End Date</label>
                        <input type="text" style={readonlyStyle} readOnly value={fields.startEndDate} />
                    </div>

                    {/* Period — readonly */}
                    <div>
                        <label style={labelStyle}>Period</label>
                        <input type="text" style={readonlyStyle} readOnly value={fields.period} />
                    </div>

                    {/* Valid Till — readonly */}
                    <div>
                        <label style={labelStyle}>Valid Till</label>
                        <input type="text" style={readonlyStyle} readOnly value={fields.validTill} />
                    </div>

                    {/* Comment */}
                    <div>
                        <label style={labelStyle}>Comment</label>
                        <textarea style={{ ...inputStyle, height: 'auto', resize: 'vertical' }} rows="3"
                            placeholder="Comment" value={fields.comment}
                            onChange={e => setFields(prev => ({ ...prev, comment: e.target.value }))} />
                    </div>

                    {/* Upload */}
                    <div>
                        <label style={labelStyle}>Upload</label>
                        <div style={{ display: 'flex', border: '1px solid #d1d5db', borderRadius: '4px', overflow: 'hidden', height: '36px' }}>
                            <label style={{ background: '#f9fafb', borderRight: '1px solid #d1d5db', padding: '0 16px', fontSize: '13px', fontWeight: '600', color: '#111827', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                Choose File
                                <input type="file" accept=".jpeg,.jpg,.pdf,.pptx,.xlsx,.docx" style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
                            </label>
                            <div style={{ padding: '0 16px', fontSize: '13px', color: '#111827', display: 'flex', alignItems: 'center' }}>
                                {file ? file.name : 'No file chosen'}
                            </div>
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#6b7280', marginTop: '6px' }}>Supported file type (jpeg, pdf, pptx, xlsx, docx)</div>
                    </div>

                    {/* Save Button */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px' }}>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving || !selectedKpiId}
                            style={{
                                background: saving || !selectedKpiId ? '#9ca3af' : '#1e293b',
                                color: '#fff', border: 'none', borderRadius: '6px',
                                padding: '10px 28px', fontSize: '13px', fontWeight: '600',
                                cursor: saving || !selectedKpiId ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {saving ? 'Saving…' : 'Save'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
