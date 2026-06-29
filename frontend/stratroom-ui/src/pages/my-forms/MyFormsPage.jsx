import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getDisplayName, getInitials } from '../organization/landingPageUtils';
import {
    getPageListByType,
    getEmpId,
} from '../../services/scorecardApi';
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
    const [dailyData, setDailyData] = useState(Array.from({length: 1}, () => ({ actual: '', target: '' })));
    const [monthlyData, setMonthlyData] = useState(Array.from({length: 12}, () => ({ actual: '', target: '' })));
    const [quarterlyData, setQuarterlyData] = useState(Array.from({length: 4}, () => ({ actual: '', target: '' })));
    const [halfYearlyData, setHalfYearlyData] = useState(Array.from({length: 2}, () => ({ actual: '', target: '' })));
    const [annualData, setAnnualData] = useState(Array.from({length: 1}, () => ({ actual: '', target: '' })));
    
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
            
            // Reset arrays
            const mData = Array.from({length: 12}, () => ({ actual: '', target: '' }));
            const qData = Array.from({length: 4}, () => ({ actual: '', target: '' }));
            const hyData = Array.from({length: 2}, () => ({ actual: '', target: '' }));
            let aData = { actual: '', target: '' };

            const year = new Date().getFullYear();
            
            hist.forEach(h => {
                const start = new Date(h.period_start);
                const end = new Date(h.period_end);
                const actual = h.actual_value != null ? h.actual_value : '';
                const target = fields.target || '';
                
                // Monthly mapping
                if (start.getDate() === 1 && end.getDate() >= 28 && end.getDate() <= 31 && start.getMonth() === end.getMonth()) {
                    mData[start.getMonth()] = { actual, target };
                }
                // Quarterly mapping
                else if (start.getDate() === 1 && (end.getMonth() - start.getMonth() === 2)) {
                    qData[Math.floor(start.getMonth() / 3)] = { actual, target };
                }
                // Half-yearly mapping
                else if (start.getDate() === 1 && (end.getMonth() - start.getMonth() === 5)) {
                    hyData[Math.floor(start.getMonth() / 6)] = { actual, target };
                }
                // Annual mapping
                else if (start.getDate() === 1 && start.getMonth() === 0 && end.getDate() === 31 && end.getMonth() === 11) {
                    aData = { actual, target };
                }
            });

            setMonthlyData(mData);
            setQuarterlyData(qData);
            setHalfYearlyData(hyData);
            setAnnualData([aData]);
        } catch (error) {
            console.error(error);
            showToast('Failed to load history.', 'error');
        }
    }, [selectedKpiId, selectedSubKpiId]);

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
            const year = new Date().getFullYear();
            const pad = (n) => String(n).padStart(2, '0');
            const getLastDay = (y, m) => new Date(y, m + 1, 0).getDate();
            
            let actuals = [];
            
            if (perfPeriod === "D") {
                dailyData.forEach((data, index) => {
                    const today = new Date();
                    actuals.push({
                        periodStart: `${year}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`,
                        periodEnd: `${year}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`,
                        actualValue: data.actual === '' ? null : Number(data.actual)
                    });
                });
            } else if (perfPeriod === "M") {
                monthlyData.forEach((data, index) => {
                    actuals.push({
                        periodStart: `${year}-${pad(index + 1)}-01`,
                        periodEnd: `${year}-${pad(index + 1)}-${pad(getLastDay(year, index))}`,
                        actualValue: data.actual === '' ? null : Number(data.actual)
                    });
                });
            } else if (perfPeriod === "Q") {
                quarterlyData.forEach((data, index) => {
                    const startMonth = index * 3;
                    const endMonth = startMonth + 2;
                    actuals.push({
                        periodStart: `${year}-${pad(startMonth + 1)}-01`,
                        periodEnd: `${year}-${pad(endMonth + 1)}-${pad(getLastDay(year, endMonth))}`,
                        actualValue: data.actual === '' ? null : Number(data.actual)
                    });
                });
            } else if (perfPeriod === "HY") {
                halfYearlyData.forEach((data, index) => {
                    const startMonth = index * 6;
                    const endMonth = startMonth + 5;
                    actuals.push({
                        periodStart: `${year}-${pad(startMonth + 1)}-01`,
                        periodEnd: `${year}-${pad(endMonth + 1)}-${pad(getLastDay(year, endMonth))}`,
                        actualValue: data.actual === '' ? null : Number(data.actual)
                    });
                });
            } else if (perfPeriod === "A") {
                actuals.push({
                    periodStart: `${year}-01-01`,
                    periodEnd: `${year}-12-31`,
                    actualValue: annualData.actual === '' ? null : Number(annualData.actual)
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
            
            // Mock File Upload saving
            if (file) {
                const kpiKey = selectedSubKpiId ? `mock_files_subkpi_${selectedSubKpiId}` : `mock_files_kpi_${selectedKpiId}`;
                const existingFilesStr = localStorage.getItem(kpiKey);
                let existingFiles = existingFilesStr ? JSON.parse(existingFilesStr) : [];
                
                let formattedSize = "0 Bytes";
                if (file.size > 0) {
                    const k = 1024;
                    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                    const i = Math.floor(Math.log(file.size) / Math.log(k));
                    formattedSize = parseFloat((file.size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
                }

                existingFiles.push({
                    name: file.name,
                    file: file.name, // The actual filename string
                    size: `(${formattedSize})`,
                    createdTime: new Date().toISOString()
                });
                
                localStorage.setItem(kpiKey, JSON.stringify(existingFiles));
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
                <div className="card mx-auto" style={{maxWidth: "600px"}}>
                    <div className="card-body p-3">
                        <div className="grid gap-3">
                            <div className="g-col-12 d-flex justify-content-between flex-wrap align-items-center gap-2">
                                <div className="user-card ">
                                    <div className="user-image user-image-lg overflow-hidden">
                                        {/* <img src="assets/images/user/user7.jpg" alt="George" width="48" height="48" /> */}
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
                                    <select className="form-select" value={selectedPageId} onChange={e => setSelectedPageId(e.target.value)}>
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
                                    <select className="form-select" value={selectedKpiId} onChange={e => setSelectedKpiId(e.target.value)} disabled={!selectedPageId || loadingKpis}>
                                        <option value="" disabled hidden>
                                            {loadingKpis ? 'Loading…' : (selectedPageId && filteredKpis.length === 0 ? 'No record found' : 'Select Measure')}
                                        </option>
                                        {filteredKpis.map(k => (
                                            <option key={k.id} value={k.id}>{k.code ? `${k.name} (${k.code})` : k.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>




                            <div className="g-col-12 g-col-lg-6">
                                <div className="form-group">
                                    <label className="form-label">Sub Measures</label>
                                    <select className="form-select" value={selectedSubKpiId} onChange={e => setSelectedSubKpiId(e.target.value)} disabled={!selectedKpiId || subKpis.length === 0}>
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
                            {/* Only show grid if lowest level is selected */}
                            {((!selectedKpiId) || (subKpis.length > 0 && !selectedSubKpiId)) ? null : (
                            <>
                            {/* Performance Data */}
                            <div className="g-col-12">
                                {/* <div className="performance-section-title">PERFORMANCE DATA — ACTUAL & TARGET</div> */}

                                {/* Daily Section */}
                                <div id="perf-section-D" className="perf-period-section" style={{display: perfPeriod === "D" ? "block" : "none"}}>
                                    <div className="performance-head mb-3">
                                        <h4 className="title text-muted">Daily Performance Data</h4>
                                        <div className="legend-container">
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
                                    <div className="performance-data-container" style={{display: 'flex', gap: '16px', alignItems: 'flex-start'}}>
                                        <div className="perf-grid single-column" style={{display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'stretch'}}>
                                            <div className="perf-column" style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                                                <div className="perf-table-row perf-header">
                                                    <div className="perf-cell">DAY</div>
                                                    <div className="perf-cell" style={{color: "var(--stratroom-green)"}}>ACTUAL</div>
                                                    <div className="perf-cell" style={{color: "var(--stratroom-red)"}}>TARGET</div>
                                                </div>
                                                {dailyData.map((data, index) => (
                                                    <div className="perf-table-row" key={index}>
                                                        <div className="perf-cell perf-month">Daily</div>
                                                        <div className="perf-cell perf-input-cell">
                                                            <input type="number" className="form-control perf-input-actual" value={data.actual} onChange={e => handleDataChange('D', index, 'actual', e.target.value)} />
                                                        </div>
                                                        <div className="perf-cell perf-input-cell">
                                                            <input type="number" className="form-control perf-input-target" readOnly value={data.target || fields.target} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Monthly Section */}
                                <div id="perf-section-M" className="perf-period-section" style={{display: perfPeriod === "M" ? "block" : "none"}}>
                                    <div className="performance-head mb-3">
                                        <h4 className="title">MONTHLY PERFORMANCE DATA</h4>
                                        <div className="legend-container">
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
                                    <div className="performance-data-container" style={{display: 'flex', gap: '16px', alignItems: 'flex-start'}}>
                                        <div className="perf-grid" style={{display: 'flex', gap: '12px', alignItems: 'flex-start'}}>
                                            <div className="perf-column" style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                                                <div className="perf-table-row perf-header">
                                                    <div className="perf-cell">MONTH</div>
                                                    <div className="perf-cell" style={{color: "var(--stratroom-green)"}}>ACTUAL</div>
                                                    <div className="perf-cell" style={{color: "var(--stratroom-red)"}}>TARGET</div>
                                                </div>
                                                {monthlyData.slice(0, 6).map((data, index) => (
                                                    <div className="perf-table-row" key={index}>
                                                        <div className="perf-cell perf-month">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}</div>
                                                        <div className="perf-cell perf-input-cell">
                                                            <input type="number" className="form-control perf-input-actual" value={data.actual} onChange={e => handleDataChange('M', index, 'actual', e.target.value)} />
                                                        </div>
                                                        <div className="perf-cell perf-input-cell">
                                                            <input type="number" className="form-control perf-input-target" readOnly value={data.target || fields.target} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="perf-column">
                                                <div className="perf-table-row perf-header">
                                                    <div className="perf-cell">MONTH</div>
                                                    <div className="perf-cell" style={{color: "var(--stratroom-green)"}}>ACTUAL</div>
                                                    <div className="perf-cell" style={{color: "var(--stratroom-red)"}}>TARGET</div>
                                                </div>
                                                {monthlyData.slice(6, 12).map((data, index) => (
                                                    <div className="perf-table-row" key={index + 6}>
                                                        <div className="perf-cell perf-month">{['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}</div>
                                                        <div className="perf-cell perf-input-cell">
                                                            <input type="number" className="form-control perf-input-actual" value={data.actual} onChange={e => handleDataChange('M', index + 6, 'actual', e.target.value)} />
                                                        </div>
                                                        <div className="perf-cell perf-input-cell">
                                                            <input type="number" className="form-control perf-input-target" readOnly value={data.target || fields.target} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="perf-section-Q" className="perf-period-section" style={{display: perfPeriod === "Q" ? "block" : "none"}}>
                                    <div className="performance-head mb-3">
                                        <h4 className="title">QUARTERLY PERFORMANCE DATA</h4>
                                        <div className="legend-container">
                                            <div className="legend-item"><div className="legend-box actual"></div><span>Actual</span></div>
                                            <div className="legend-item"><div className="legend-box target"></div><span>Target</span></div>
                                        </div>
                                    </div>
                                    <div className="performance-data-container" style={{display: 'flex', gap: '16px', alignItems: 'flex-start'}}>
                                        <div className="perf-grid single-column" style={{display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'stretch'}}>
                                            <div className="perf-column" style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                                                <div className="perf-table-row perf-header">
                                                    <div className="perf-cell">QUARTER</div>
                                                    <div className="perf-cell" style={{color: "var(--stratroom-green)"}}>ACTUAL</div>
                                                    <div className="perf-cell" style={{color: "var(--stratroom-red)"}}>TARGET</div>
                                                </div>
                                                {quarterlyData.map((data, index) => (
                                                    <div className="perf-table-row" key={index}>
                                                        <div className="perf-cell perf-month">{['Q1', 'Q2', 'Q3', 'Q4'][index]}</div>
                                                        <div className="perf-cell perf-input-cell">
                                                            <input type="number" className="form-control perf-input-actual" value={data.actual} onChange={e => handleDataChange('Q', index, 'actual', e.target.value)} />
                                                        </div>
                                                        <div className="perf-cell perf-input-cell">
                                                            <input type="number" className="form-control perf-input-target" readOnly value={data.target || fields.target} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="perf-section-HY" className="perf-period-section" style={{display: perfPeriod === "HY" ? "block" : "none"}}>
                                    <div className="performance-head mb-3">
                                        <h4 className="title">HALF-YEARLY PERFORMANCE DATA</h4>
                                        <div className="legend-container">
                                            <div className="legend-item"><div className="legend-box actual"></div><span>Actual</span></div>
                                            <div className="legend-item"><div className="legend-box target"></div><span>Target</span></div>
                                        </div>
                                    </div>
                                    <div className="performance-data-container" style={{display: 'flex', gap: '16px', alignItems: 'flex-start'}}>
                                        <div className="perf-grid single-column" style={{display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'stretch'}}>
                                            <div className="perf-column" style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                                                <div className="perf-table-row perf-header">
                                                    <div className="perf-cell">HALF-YEAR</div>
                                                    <div className="perf-cell" style={{color: "var(--stratroom-green)"}}>ACTUAL</div>
                                                    <div className="perf-cell" style={{color: "var(--stratroom-red)"}}>TARGET</div>
                                                </div>
                                                {halfYearlyData.map((data, index) => (
                                                    <div className="perf-table-row" key={index}>
                                                        <div className="perf-cell perf-month">{['H1', 'H2'][index]}</div>
                                                        <div className="perf-cell perf-input-cell">
                                                            <input type="number" className="form-control perf-input-actual" value={data.actual} onChange={e => handleDataChange('HY', index, 'actual', e.target.value)} />
                                                        </div>
                                                        <div className="perf-cell perf-input-cell">
                                                            <input type="number" className="form-control perf-input-target" readOnly value={data.target || fields.target} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="perf-section-A" className="perf-period-section" style={{display: perfPeriod === "A" ? "block" : "none"}}>
                                    <div className="performance-head mb-3">
                                        <h4 className="title">ANNUAL PERFORMANCE DATA</h4>
                                        <div className="legend-container">
                                            <div className="legend-item"><div className="legend-box actual"></div><span>Actual</span></div>
                                            <div className="legend-item"><div className="legend-box target"></div><span>Target</span></div>
                                        </div>
                                    </div>
                                    <div className="performance-data-container">
                                        <div className="perf-grid single-column">
                                            <div className="perf-column">
                                                <div className="perf-table-row perf-header">
                                                    <div className="perf-cell">YEAR</div>
                                                    <div className="perf-cell" style={{color: "var(--stratroom-green)"}}>ACTUAL</div>
                            </div>
                                                    <div className="perf-cell" style={{color: "var(--stratroom-red)"}}>TARGET</div>
                                                </div>
                                                {annualData.map((data, index) => (
                                                    <div className="perf-table-row" key={index}>
                                                        <div className="perf-cell perf-month">Annual</div>
                                                        <div className="perf-cell perf-input-cell">
                                                            <input type="number" className="form-control perf-input-actual" value={data.actual} onChange={e => handleDataChange('A', index, 'actual', e.target.value)} />
                                                        </div>
                                                        <div className="perf-cell perf-input-cell">
                                                            <input type="number" className="form-control perf-input-target" readOnly value={data.target || fields.target} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </>


                            )}


                            <div className="g-col-12 g-col-lg-6">
                                <div className="form-group">
                                    <label className="form-label">Start / End Date</label>
                                    <input type="text" id="dateRangePicker" className="form-control"
                                        placeholder="Select Date Range" readOnly value={fields.startEndDate} />
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
                                    <textarea className="form-control browser-default" placeholder="Comment"
                                        rows="2" value={fields.comment} onChange={e => setFields(prev => ({ ...prev, comment: e.target.value }))}></textarea>
                                </div>
                            </div>
                            <div className="g-col-12">
                                <div className="form-group">
                                    <label className="form-label">Upload</label>
                                    <div className="attachment-upload">
                                        <div className="input-group mb-1">
                                            <input type="file" className="form-control" id="inputGroupFile02"
                                                accept=".pdf,.ppt,.jpeg,.xlsx,.doc,.docx" onChange={e => setFile(e.target.files[0])} />
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
