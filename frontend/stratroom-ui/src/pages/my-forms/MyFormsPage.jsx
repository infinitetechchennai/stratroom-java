import React, { useState, useEffect, useCallback } from 'react';
import { parseDateRange, getMonthCount, generatePeriodBoundary } from '../../utils/dateUtils';
import { useAuth } from '../../context/AuthContext';
import { getDisplayName, getInitials } from '../organization/landingPageUtils';
import {
    getPageList,
    getEmpId,
} from '../../services/scorecardApi';
import { isMeasurePage } from '../../utils/navPageGroups';
import { getScorecardV2, getKpiHistory, getSubKpiHistory, getSubMeasureHistory, recordKpiActualBatch, recordSubKpiActualBatch, recordSubMeasureActualBatch } from '../../services/scorecardV2Api';

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
    const [subKpis, setSubKpis] = useState([]);

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

    const [perfPeriod, setPerfPeriod] = useState('M');
    const [dailyData, setDailyData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [quarterlyData, setQuarterlyData] = useState([]);
    const [halfYearlyData, setHalfYearlyData] = useState([]);
    const [annualData, setAnnualData] = useState([]);
    const [periodStart, setPeriodStart] = useState(new Date(new Date().getFullYear(), 0, 1));

    const handleDataChange = (period, index, field, value) => {
        if (period === 'D') {
            const newData = [...dailyData];
            newData[index] = { ...newData[index], [field]: value };
            setDailyData(newData);
        } else if (period === 'M') {
            const newData = [...monthlyData];
            newData[index] = { ...newData[index], [field]: value };
            setMonthlyData(newData);
        } else if (period === 'Q') {
            const newData = [...quarterlyData];
            newData[index] = { ...newData[index], [field]: value };
            setQuarterlyData(newData);
        } else if (period === 'HY') {
            const newData = [...halfYearlyData];
            newData[index] = { ...newData[index], [field]: value };
            setHalfYearlyData(newData);
        } else if (period === 'A') {
            const newData = [...annualData];
            newData[index] = { ...newData[index], [field]: value };
            setAnnualData(newData);
        }
    };

    // ── Load scorecard pages on mount ─────────────────────
    useEffect(() => {
        const empId = getEmpId();
        if (!empId) return;
        // Fetch all pages and filter by 'Measure' type to match the Navigation Menu
        getPageList(empId)
            .then(data => {
                const list = Array.isArray(data) ? data : (data?.pageList || data?.data || []);
                const measurePages = list.filter(isMeasurePage);
                setPages(measurePages);
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

    useEffect(() => {
        const mapping = { 'D': 'Daily', 'M': 'Monthly', 'Q': 'Quarterly', 'HY': 'Half Yearly', 'A': 'Annually' };
        const validKpis = kpis.filter(k => k.measurement === mapping[perfPeriod] || k.measurement === perfPeriod);
        if (selectedKpiId && !validKpis.find(k => String(k.id) === String(selectedKpiId))) {
            setSelectedKpiId('');
            setSelectedSubKpiId('');
            resetFields();
        }
    }, [perfPeriod, kpis, selectedKpiId]);

    function resetFields() {
        setFields({ departmentName: '', measurementFrequency: '', kpiType: '', actual: '', target: '', startEndDate: '', period: '', validTill: '', comment: '' });
    }


    const loadHistory = useCallback(async () => {
        if (!selectedKpiId) return;
        try {
            let hist = [];
            if (selectedSubKpiId) {
                hist = await getSubKpiHistory(selectedSubKpiId, getDateRange());
            } else {
                hist = await getKpiHistory(selectedKpiId, getDateRange());
            }

            const { start, end } = parseDateRange(fields.startEndDate);
            
            if (!start || !end) {
                showToast('Invalid or missing Date Range. Cannot generate performance grids.', 'error');
                return;
            }
            setPeriodStart(start);

            const mCount = getMonthCount(start, end);
            if (mCount <= 0) {
                showToast('Date range is zero or negative. Check KPI configuration.', 'error');
                return;
            }
            
            const mData = Array.from({ length: mCount }, () => ({ actual: '', target: '' }));
            const qData = Array.from({ length: Math.ceil(mCount / 3) }, () => ({ actual: '', target: '' }));
            const hyData = Array.from({ length: Math.ceil(mCount / 6) }, () => ({ actual: '', target: '' }));
            const aData = Array.from({ length: (end.getFullYear() - start.getFullYear() + 1) }, () => ({ actual: '', target: '' }));
            
            // Calculate total days for daily data
            const dCount = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
            const dData = Array.from({ length: Math.min(dCount, 366) }, () => ({ actual: '', target: '' })); // Cap at 1 year for daily to prevent browser crash

            hist.forEach(h => {
                const hStart = new Date(h.period_start);
                const actual = h.actual_value != null ? h.actual_value : '';
                const target = fields.target || '';
                
                const idxM = (hStart.getFullYear() - start.getFullYear()) * 12 + hStart.getMonth() - start.getMonth();
                if (idxM >= 0 && idxM < mData.length) mData[idxM] = { actual, target };
                
                const idxQ = Math.floor(idxM / 3);
                if (idxQ >= 0 && idxQ < qData.length) qData[idxQ] = { actual, target };
                
                const idxH = Math.floor(idxM / 6);
                if (idxH >= 0 && idxH < hyData.length) hyData[idxH] = { actual, target };
                
                const idxA = hStart.getFullYear() - start.getFullYear();
                if (idxA >= 0 && idxA < aData.length) aData[idxA] = { actual, target };
                
                const idxD = Math.floor((hStart - start) / (1000 * 60 * 60 * 24));
                if (idxD >= 0 && idxD < dData.length) dData[idxD] = { actual, target };
            });

            setMonthlyData(mData);
            setQuarterlyData(qData);
            setHalfYearlyData(hyData);
            setAnnualData(aData);
            setDailyData(dData);
        } catch (error) {
            console.error(error);
            showToast('Failed to load history.', 'error');
        }
    }, [selectedKpiId, selectedSubKpiId, fields.startEndDate, fields.target]);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    function showToast(msg, type = 'success') {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    }

    const mapping = { 'D': 'Daily', 'M': 'Monthly', 'Q': 'Quarterly', 'HY': 'Half Yearly', 'A': 'Annually' };
    const filteredKpis = kpis.filter(k => k.measurement === mapping[perfPeriod] || k.measurement === perfPeriod);

    // ── Save: upsert the actual into sc_kpi_history (V2), then refresh ─────
    const handleSave = async () => {
        if (!selectedKpiId) return showToast('Please select a KPI first.', 'error');
        setSaving(true);
        try {
            const pad = (n) => String(n).padStart(2, '0');
            const getLastDay = (y, m) => new Date(y, m + 1, 0).getDate();
            let actuals = [];

            if (perfPeriod === "D") {
                dailyData.forEach((data, index) => {
                    const d = new Date(periodStart);
                    d.setDate(d.getDate() + index);
                    actuals.push({
                        periodStart: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
                        periodEnd: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
                        actualValue: data.actual === '' ? null : Number(data.actual)
                    });
                });
            } else if (perfPeriod === "M") {
                monthlyData.forEach((data, index) => {
                    const d = generatePeriodBoundary(periodStart, index);
                    actuals.push({
                        periodStart: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-01`,
                        periodEnd: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(getLastDay(d.getFullYear(), d.getMonth()))}`,
                        actualValue: data.actual === '' ? null : Number(data.actual)
                    });
                });
            } else if (perfPeriod === "Q") {
                quarterlyData.forEach((data, index) => {
                    const d = generatePeriodBoundary(periodStart, index * 3);
                    actuals.push({
                        periodStart: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-01`,
                        periodEnd: `${d.getFullYear()}-${pad(d.getMonth() + 3)}-${pad(getLastDay(d.getFullYear(), d.getMonth() + 2))}`,
                        actualValue: data.actual === '' ? null : Number(data.actual)
                    });
                });
            } else if (perfPeriod === "HY") {
                halfYearlyData.forEach((data, index) => {
                    const d = generatePeriodBoundary(periodStart, index * 6);
                    actuals.push({
                        periodStart: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-01`,
                        periodEnd: `${d.getFullYear()}-${pad(d.getMonth() + 6)}-${pad(getLastDay(d.getFullYear(), d.getMonth() + 5))}`,
                        actualValue: data.actual === '' ? null : Number(data.actual)
                    });
                });
            } else if (perfPeriod === "A") {
                annualData.forEach((data, index) => {
                    const d = generatePeriodBoundary(periodStart, index * 12);
                    actuals.push({
                        periodStart: `${d.getFullYear()}-01-01`,
                        periodEnd: `${d.getFullYear()}-12-31`,
                        actualValue: data.actual === '' ? null : Number(data.actual)
                    });
                });
            }

            if (actuals.length === 0) {
                showToast('No actual values entered to save.', 'info');
                setSaving(false);
                return;
            }

            if (selectedSubKpiId) {
                await recordSubKpiActualBatch({ subKpiId: Number(selectedSubKpiId), actuals });
            } else {
                await recordKpiActualBatch({ kpiId: Number(selectedKpiId), actuals });
            }

            showToast('Saved successfully! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = '/scorecard?pageId=' + selectedPageId;
            }, 800);
        } catch (error) {
            console.error(error);
            showToast('Save failed.', 'error');
        } finally {
            setSaving(false);
        }
    };

    // ── Render ─────────────────────────────────────────────
    return (
        <>
            <main className="pt-2 pb-2">

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

                <div className="container-lg">
                    <div className="page-header grid gap-2 pb-1">
                        <div className="g-col-8 d-flex align-items-center">
                            <h4 className="title">
                                <span className="icon">
                                    <img src="/images/meetings-i.svg" alt="meetings" width="18" height="18" />
                                </span>
                                Data Entry Form
                            </h4>
                        </div>
                    </div>
                </div>

                <div className="container-lg py-2">
                    <form>
                        <div className="card mx-auto" style={{ maxWidth: "600px" }}>
                            <div className="card-body p-3">
                                <div className="grid gap-3">
                                    <div className="g-col-12 d-flex justify-content-between flex-wrap align-items-center gap-2">
                                        <div className="user-card ">
                                            <div className="user-image user-image-lg overflow-hidden">
                                                <span className="img-initial">{initials}</span>
                                            </div>
                                            <div className="user-text d-flex flex-column">
                                                <h6 className="text-heading text-truncate">{displayName}</h6>
                                                <small>Chairman Board of Directors</small>
                                            </div>
                                        </div>
                                        <div className="performance-period-selector">
                                            <div className="radio-segmented-group">
                                                <input type="radio" name="perf_period" id="periodD" value="D" checked={perfPeriod === "D"} onChange={(e) => setPerfPeriod(e.target.value)} />
                                                <label htmlFor="periodD">D</label>
                                                <input type="radio" name="perf_period" id="periodM" value="M" checked={perfPeriod === "M"} onChange={(e) => setPerfPeriod(e.target.value)} />
                                                <label htmlFor="periodM">M</label>
                                                <input type="radio" name="perf_period" id="periodQ" value="Q" checked={perfPeriod === "Q"} onChange={(e) => setPerfPeriod(e.target.value)} />
                                                <label htmlFor="periodQ">Q</label>
                                                <input type="radio" name="perf_period" id="periodHY" value="HY" checked={perfPeriod === "HY"} onChange={(e) => setPerfPeriod(e.target.value)} />
                                                <label htmlFor="periodHY">HY</label>
                                                <input type="radio" name="perf_period" id="periodA" value="A" checked={perfPeriod === "A"} onChange={(e) => setPerfPeriod(e.target.value)} />
                                                <label htmlFor="periodA">A</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label className="form-label">Scorecard</label>
                                            <select className="form-select select-dropdown" data-placeholder="Select Scorecard" value={selectedPageId} onChange={e => setSelectedPageId(e.target.value)}>
                                                <option value="" disabled hidden>Select Scorecard</option>
                                                {pages.map(p => (
                                                    <option key={p.id || p.pageId} value={p.id || p.pageId}>
                                                        {p.name || p.pageName || `Page ${p.id || p.pageId}`}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label className="form-label">Measures</label>
                                            <select className="form-select select-dropdown" data-placeholder="Select Measures" value={selectedKpiId} onChange={e => setSelectedKpiId(e.target.value)} disabled={!selectedPageId || loadingKpis}>
                                                <option value="" disabled hidden>Select Measures</option>
                                                {filteredKpis.map(k => (
                                                    <option key={k.id} value={k.id}>{k.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-lg-6">
                                        <div className="form-group">
                                            <label className="form-label">Sub Measures</label>
                                            <select className="form-select select-dropdown" data-placeholder="Select Sub Measures" value={selectedSubKpiId} onChange={e => setSelectedSubKpiId(e.target.value)} disabled={!selectedKpiId || subKpis.length === 0}>
                                                <option value="" disabled hidden>Select Sub Measures</option>
                                                {subKpis.map(s => (
                                                    <option key={s.id} value={s.id}>
                                                        {s.subKpiValue?.subMeasureName || s.name || `Sub Measure ${s.id}`}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-lg-6">
                                        <div className="form-group">
                                            <label className="form-label">KPI Type</label>
                                            <input type="text" className="form-control" placeholder="KPI Type" readOnly value={fields.kpiType} />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-lg-6">
                                        <div className="form-group">
                                            <label className="form-label">Department Name</label>
                                            <input type="text" className="form-control" placeholder="Department Name" readOnly value={fields.departmentName} />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-lg-6">
                                        <div className="form-group">
                                            <label className="form-label">Measurement Frequency</label>
                                            <input type="text" className="form-control" placeholder="Measurement Frequency" readOnly value={fields.measurementFrequency} />
                                        </div>
                                    </div>

                                    {((!selectedKpiId) || (subKpis.length > 0 && !selectedSubKpiId)) ? null : (
                                        <div className="g-col-12">
                                            {perfPeriod === 'D' && (
                                                <div id="perf-section-D" className="perf-period-section">
                                                    <div className="performance-head mb-3">
                                                        <h4 className="title text-muted">Daily Performance Data</h4>
                                                        <div className="performance-legend">
                                                            <div className="legend-item">
                                                                <div className="legend-box actual"></div>
                                                                <span>Actual</span>
                                                            </div>
                                                            <div className="legend-item">
                                                                <div className="legend-box target"></div>
                                                                <span>Target</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="performance-data-container">
                                                        <div className="perf-grid single-column">
                                                            <div className="perf-column">
                                                                <div className="perf-table-row perf-header">
                                                                    <div className="perf-cell">DAY</div>
                                                                    <div className="perf-cell" style={{ color: 'var(--stratroom-green)' }}>ACTUAL</div>
                                                                    <div className="perf-cell" style={{ color: 'var(--stratroom-red)' }}>TARGET</div>
                                                                </div>
                                                                {dailyData.map((data, index) => {
                                                                    const d = new Date(periodStart);
                                                                    d.setDate(d.getDate() + index);
                                                                    const label = `Day ${index + 1}`;
                                                                    return (
                                                                        <div className="perf-table-row" key={index}>
                                                                            <div className="perf-cell perf-month">{label}</div>
                                                                            <div className="perf-cell perf-input-cell">
                                                                                <input type="number" className="form-control perf-input-actual" value={data.actual} onChange={e => handleDataChange('D', index, 'actual', e.target.value)} />
                                                                            </div>
                                                                            <div className="perf-cell perf-input-cell">
                                                                                <input type="number" className="form-control perf-input-target" readOnly value={data.target || fields.target} />
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {perfPeriod === 'M' && (
                                                <div id="perf-section-M" className="perf-period-section">
                                                    <div className="performance-head mb-3">
                                                        <h4 className="title text-muted">Monthly Performance Data</h4>
                                                        <div className="performance-legend">
                                                            <div className="legend-item">
                                                                <div className="legend-box actual"></div>
                                                                <span>Actual</span>
                                                            </div>
                                                            <div className="legend-item">
                                                                <div className="legend-box target"></div>
                                                                <span>Target</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="performance-data-container">
                                                        <div className="perf-grid">
                                                            {(() => {
                                                                const mid = Math.ceil(monthlyData.length / 2);
                                                                const leftHalf = monthlyData.slice(0, mid);
                                                                const rightHalf = monthlyData.slice(mid);
                                                                return (
                                                                    <>
                                                                        <div className="perf-column perf-column-separator">
                                                                            <div className="perf-table-row perf-header">
                                                                                <div className="perf-cell">MONTH</div>
                                                                                <div className="perf-cell" style={{ color: 'var(--stratroom-green)' }}>ACTUAL</div>
                                                                                <div className="perf-cell" style={{ color: 'var(--stratroom-red)' }}>TARGET</div>
                                                                            </div>
                                                                            {leftHalf.map((data, idx) => {
                                                                                const d = generatePeriodBoundary(periodStart, idx);
                                                                                const label = d.toLocaleString('default', { month: 'short' });
                                                                                return (
                                                                                    <div className="perf-table-row" key={idx}>
                                                                                        <div className="perf-cell perf-month">{label}</div>
                                                                                        <div className="perf-cell perf-input-cell">
                                                                                            <input type="number" className="form-control perf-input-actual" value={data.actual} onChange={e => handleDataChange('M', idx, 'actual', e.target.value)} />
                                                                                        </div>
                                                                                        <div className="perf-cell perf-input-cell">
                                                                                            <input type="number" className="form-control perf-input-target" readOnly value={data.target || fields.target} />
                                                                                        </div>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                        {rightHalf.length > 0 && (
                                                                            <div className="perf-column">
                                                                                <div className="perf-table-row perf-header">
                                                                                    <div className="perf-cell">MONTH</div>
                                                                                    <div className="perf-cell" style={{ color: 'var(--stratroom-green)' }}>ACTUAL</div>
                                                                                    <div className="perf-cell" style={{ color: 'var(--stratroom-red)' }}>TARGET</div>
                                                                                </div>
                                                                                {rightHalf.map((data, idx) => {
                                                                                    const realIdx = idx + mid;
                                                                                    const d = generatePeriodBoundary(periodStart, realIdx);
                                                                                    const label = d.toLocaleString('default', { month: 'short' });
                                                                                    return (
                                                                                        <div className="perf-table-row" key={realIdx}>
                                                                                            <div className="perf-cell perf-month">{label}</div>
                                                                                            <div className="perf-cell perf-input-cell">
                                                                                                <input type="number" className="form-control perf-input-actual" value={data.actual} onChange={e => handleDataChange('M', realIdx, 'actual', e.target.value)} />
                                                                                            </div>
                                                                                            <div className="perf-cell perf-input-cell">
                                                                                                <input type="number" className="form-control perf-input-target" readOnly value={data.target || fields.target} />
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                );
                                                            })()}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {perfPeriod === 'Q' && (
                                                <div id="perf-section-Q" className="perf-period-section">
                                                    <div className="performance-head mb-3">
                                                        <h4 className="title text-muted">Quarterly Performance Data</h4>
                                                        <div className="performance-legend">
                                                            <div className="legend-item">
                                                                <div className="legend-box actual"></div>
                                                                <span>Actual</span>
                                                            </div>
                                                            <div className="legend-item">
                                                                <div className="legend-box target"></div>
                                                                <span>Target</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="performance-data-container">
                                                        <div className="perf-grid single-column">
                                                            <div className="perf-column">
                                                                <div className="perf-table-row perf-header">
                                                                    <div className="perf-cell">QUARTER</div>
                                                                    <div className="perf-cell" style={{ color: 'var(--stratroom-green)' }}>ACTUAL</div>
                                                                    <div className="perf-cell" style={{ color: 'var(--stratroom-red)' }}>TARGET</div>
                                                                </div>
                                                                {quarterlyData.map((data, index) => {
                                                                    const d = generatePeriodBoundary(periodStart, index * 3);
                                                                    const quarter = Math.floor(d.getMonth() / 3) + 1;
                                                                    const label = `Q${quarter}`;
                                                                    return (
                                                                        <div className="perf-table-row" key={index}>
                                                                            <div className="perf-cell perf-month">{label}</div>
                                                                            <div className="perf-cell perf-input-cell">
                                                                                <input type="number" className="form-control perf-input-actual" value={data.actual} onChange={e => handleDataChange('Q', index, 'actual', e.target.value)} />
                                                                            </div>
                                                                            <div className="perf-cell perf-input-cell">
                                                                                <input type="number" className="form-control perf-input-target" readOnly value={data.target || fields.target} />
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {perfPeriod === 'HY' && (
                                                <div id="perf-section-HY" className="perf-period-section">
                                                    <div className="performance-head mb-3">
                                                        <h4 className="title text-muted">Half-Yearly Performance Data</h4>
                                                        <div className="performance-legend">
                                                            <div className="legend-item">
                                                                <div className="legend-box actual"></div>
                                                                <span>Actual</span>
                                                            </div>
                                                            <div className="legend-item">
                                                                <div className="legend-box target"></div>
                                                                <span>Target</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="performance-data-container">
                                                        <div className="perf-grid single-column">
                                                            <div className="perf-column">
                                                                <div className="perf-table-row perf-header">
                                                                    <div className="perf-cell text-nowrap">HALF YEAR</div>
                                                                    <div className="perf-cell" style={{ color: 'var(--stratroom-green)' }}>ACTUAL</div>
                                                                    <div className="perf-cell" style={{ color: 'var(--stratroom-red)' }}>TARGET</div>
                                                                </div>
                                                                {halfYearlyData.map((data, index) => {
                                                                    const d = generatePeriodBoundary(periodStart, index * 6);
                                                                    const half = Math.floor(d.getMonth() / 6) + 1;
                                                                    const label = `H${half}`;
                                                                    return (
                                                                        <div className="perf-table-row" key={index}>
                                                                            <div className="perf-cell perf-month">{label}</div>
                                                                            <div className="perf-cell perf-input-cell">
                                                                                <input type="number" className="form-control perf-input-actual" value={data.actual} onChange={e => handleDataChange('HY', index, 'actual', e.target.value)} />
                                                                            </div>
                                                                            <div className="perf-cell perf-input-cell">
                                                                                <input type="number" className="form-control perf-input-target" readOnly value={data.target || fields.target} />
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {perfPeriod === 'A' && (
                                                <div id="perf-section-A" className="perf-period-section">
                                                    <div className="performance-head mb-3">
                                                        <h4 className="title text-muted">Annual Performance Data</h4>
                                                        <div className="performance-legend">
                                                            <div className="legend-item">
                                                                <div className="legend-box actual"></div>
                                                                <span>Actual</span>
                                                            </div>
                                                            <div className="legend-item">
                                                                <div className="legend-box target"></div>
                                                                <span>Target</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="performance-data-container">
                                                        <div className="perf-grid single-column">
                                                            <div className="perf-column">
                                                                <div className="perf-table-row perf-header">
                                                                    <div className="perf-cell">YEAR</div>
                                                                    <div className="perf-cell" style={{ color: 'var(--stratroom-green)' }}>ACTUAL</div>
                                                                    <div className="perf-cell" style={{ color: 'var(--stratroom-red)' }}>TARGET</div>
                                                                </div>
                                                                {annualData.map((data, index) => {
                                                                    const d = generatePeriodBoundary(periodStart, index * 12);
                                                                    const label = d.getFullYear().toString();
                                                                    return (
                                                                        <div className="perf-table-row" key={index}>
                                                                            <div className="perf-cell perf-month">{label}</div>
                                                                            <div className="perf-cell perf-input-cell">
                                                                                <input type="number" className="form-control perf-input-actual" value={data.actual} onChange={e => handleDataChange('A', index, 'actual', e.target.value)} />
                                                                            </div>
                                                                            <div className="perf-cell perf-input-cell">
                                                                                <input type="number" className="form-control perf-input-target" readOnly value={data.target || fields.target} />
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="g-col-12 g-col-lg-6">
                                        <div className="form-group">
                                            <label className="form-label">Start / End Date</label>
                                            <input type="text" id="dateRangePicker" className="form-control" placeholder="Select Date Range" readOnly value={fields.startEndDate} />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-lg-6">
                                        <div className="form-group">
                                            <label className="form-label">Period</label>
                                            <input type="text" className="form-control" placeholder="Period" readOnly value={fields.period} />
                                        </div>
                                    </div>
                                    <div className="g-col-12 g-col-lg-6">
                                        <div className="form-group">
                                            <label className="form-label">Valid Till</label>
                                            <input type="text" className="form-control" placeholder="Valid Till" readOnly value={fields.validTill} />
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label className="form-label">Comment</label>
                                            <textarea className="form-control browser-default" placeholder="Comment" rows="2" value={fields.comment} onChange={e => setFields(prev => ({ ...prev, comment: e.target.value }))}></textarea>
                                        </div>
                                    </div>
                                    <div className="g-col-12">
                                        <div className="form-group">
                                            <label className="form-label">Upload</label>
                                            <div className="attachment-upload">
                                                <div className="input-group mb-1">
                                                    <input type="file" className="form-control" id="inputGroupFile02" accept=".pdf,.ppt,.jpeg,.xlsx,.doc,.docx" onChange={e => setFile(e.target.files[0])} />
                                                </div>
                                                <div className="mb-3 form-text">Supported file type (jpeg,pdf,pptx,xlsx,docx)</div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="card-footer text-end">
                                <button type="button" className="btn btn-primary" onClick={handleSave} disabled={saving || !selectedKpiId}>
                                    {saving ? 'Saving…' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
