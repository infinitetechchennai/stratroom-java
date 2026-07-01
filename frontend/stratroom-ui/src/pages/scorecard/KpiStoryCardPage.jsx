import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getKpiStoryCard,
  getKpiInitiativesList,
  getKpiRiskList,
  getKpiComments,
  addKpiComment,
  getKpiAttachments,
} from "../../api/kpiApi";
import { KpiDescriptionModal } from "../../components/scorecard/modals/KpiDescriptionModal";
import { FilesViewModal } from "../../components/scorecard/modals/FilesViewModal";
import { FileUploadModal } from "../../components/scorecard/modals/FileUploadModal";
import { DeleteModal } from "../../components/scorecard/modals/UtilityModals";
import KpiSidebar from '../../components/scorecard/sidebar/KpiSidebar';
import { downloadKpiReport } from "../../utils/kpiReport";
import ReactApexChart from "react-apexcharts";

// ── palette ──────────────────────────────────────────────────────────────────
const DARK_BLUE = "#883b71";
const GREY_BG = "#f5f6fa";
const TH_BG = "#dfc7d4";
const TH_COLOR = "#883b71";
const WHITE = "#ffffff";

const MONTH_PALETTE = [
  "#bda3c4", "#a3b2c4", "#b2c4a3", "#c4bca3", "#c4a3a3", "#a3c4bd"
];

// ── helpers ───────────────────────────────────────────────────────────────────
function initialsFrom(name) {
  if (!name) return "KP";
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "KP";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function toNum(v) {
  if (v == null) return null;
  if (typeof v === "number") return v;
  const n = parseFloat(String(v).replace(/[,%$]/g, "").trim());
  return Number.isFinite(n) ? n : null;
}

function fmtMoney(v, currency) {
  const n = toNum(v);
  if (n == null) return v == null || v === "" ? "-" : String(v);
  const cur = currency ? `${currency} ` : "";
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${cur}${(n / 1_000_000).toFixed(2)} M`;
  if (abs >= 1_000) return `${cur}${(n / 1_000).toFixed(2)} K`;
  return `${cur}${n.toLocaleString(undefined, { maximumFractionDigits: 5 })}`;
}

function fmtNum(v) {
  const n = toNum(v);
  return n == null ? (v == null ? "-" : String(v)) : n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

// Backend may emit LocalDateTime as [y,M,d,h,m,s], java.util.Date as epoch millis, or ISO string.
function parseDate(v) {
  if (v == null) return null;
  if (Array.isArray(v) && v.length >= 3) return new Date(v[0], v[1] - 1, v[2], v[3] || 0, v[4] || 0, v[5] || 0);
  if (typeof v === "number") return new Date(v);
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

function fmtDate(v) {
  const d = parseDate(v);
  if (!d) return typeof v === "string" ? v : "";
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

function fmtTime(v) {
  const d = parseDate(v);
  if (!d) return "";
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

function loggedInEmpId() {
  try {
    const raw = localStorage.getItem("profile");
    if (!raw) return 0;
    const p = JSON.parse(raw);
    return p?.empId ?? p?.id ?? 0;
  } catch {
    return 0;
  }
}

// progress → bar colour: red <40, amber <70, green otherwise
function progressColor(pct) {
  if (pct == null) return "#bbb";
  if (pct < 40) return "#e74c3c";
  if (pct < 70) return "#e5a800";
  return "#27ae60";
}

// ── data hook ─────────────────────────────────────────────────────────────────
function useKpiStoryCard(kpiId, dateRange) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    kpi: null,
    series: [],
    initiatives: [],
    risks: [],
    comments: [],
    files: [],
  });

  const loadComments = useCallback(async () => {
    if (!kpiId) return;
    try {
      const comments = await getKpiComments(kpiId);
      setState((s) => ({ ...s, comments: Array.isArray(comments) ? comments : [] }));
    } catch {
      /* keep existing comments on failure */
    }
  }, [kpiId]);

  const load = useCallback(async () => {
    if (!kpiId) {
      setState((s) => ({ ...s, loading: false, error: "No KPI selected." }));
      return;
    }
    setState((s) => ({ ...s, loading: true, error: null }));
    const [storyR, initR, riskR, commentR, fileR] = await Promise.allSettled([
      getKpiStoryCard(kpiId, dateRange),
      getKpiInitiativesList(kpiId),
      getKpiRiskList(kpiId),
      getKpiComments(kpiId),
      getKpiAttachments(kpiId),
    ]);
    const val = (r, d) => (r.status === "fulfilled" && r.value != null ? r.value : d);
    const story = storyR.status === "fulfilled" && storyR.value ? storyR.value : {};
    
    // Retrieve mock files from local storage
    let mockFiles = [];
    try {
        const kpiKey = `mock_files_kpi_${kpiId}`;
        const stored = localStorage.getItem(kpiKey);
        if (stored) {
            mockFiles = JSON.parse(stored);
        }
    } catch (e) {
        console.error("Failed to parse mock files from local storage", e);
    }
    
    setState({
      loading: false,
      error: storyR.status === "rejected" ? "Failed to load KPI details from server." : null,
      kpi: story.kpi || null,
      series: Array.isArray(story.series) ? story.series : [],
      initiatives: val(initR, []),
      risks: val(riskR, []),
      comments: val(commentR, []),
      files: (mockFiles.length > 0 ? mockFiles : val(fileR, [])).map((f, idx) => ({ ...f, id: f.id || `file_${Date.now()}_${idx}` })),
    });
  }, [kpiId, dateRange]);

  useEffect(() => {
    load();
  }, [load]);

  const setFiles = useCallback((updater) => {
    setState((s) => {
      const newFiles = typeof updater === "function" ? updater(s.files) : updater;
      if (kpiId) {
        localStorage.setItem(`mock_files_kpi_${kpiId}`, JSON.stringify(newFiles));
      }
      return { ...s, files: newFiles };
    });
  }, [kpiId]);

  return { ...state, reload: load, reloadComments: loadComments, setFiles };
}

// aggregate series rows → one point per period (summed across measures)
function aggregateByPeriod(series) {
  const map = new Map();
  let currency = "";
  (series || []).forEach((row) => {
    const period = row.period || row.financialMonth || "—";
    if (!currency && row.currency) currency = row.currency;
    const a = toNum(row.actual) || 0;
    const t = toNum(row.target) || 0;
    const y = toNum(row.ytd) || 0;
    const cur = map.get(period) || { period, actual: 0, target: 0, ytd: 0, _order: row.financialMonth ?? row.realDateFrom ?? period };
    cur.actual += a;
    cur.target += t;
    cur.ytd += y;
    map.set(period, cur);
  });
  const rows = Array.from(map.values()).map((r) => ({ ...r, gap: r.actual - r.target }));
  rows.sort((x, y) => (parseDate(x._order)?.getTime() ?? 0) - (parseDate(y._order)?.getTime() ?? 0));
  return { rows, currency };
}

// ── shared tiny components ────────────────────────────────────────────────────
function CardHeader({ title, extra, dropdownOptions = [{ label: "View" }] }) {
  return (
    <div className="card-header">
      <div className="c-header-left">
        <h5 className="card-title"><strong className="editableTxt1">{title}</strong></h5>
      </div>
      <div className="card-actions">
        {extra}
        <div className="dropdown">
          <button className="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img width="16" height="16" src="/images/menu-dot-vertical-i.svg" onError={(e) => { e.target.style.display='none' }} />
          </button>
          <ul className="dropdown-menu dropdown-menu-end border-0 shadow">
            {dropdownOptions.map((opt, i) => (
              <li key={i}>
                <a 
                  className="dropdown-item" 
                  href="#" 
                  data-bs-toggle={opt.dataToggle} 
                  data-bs-target={opt.dataTarget} 
                  onClick={(e) => { 
                    if (!opt.dataToggle) e.preventDefault(); 
                    if (opt.onClick) opt.onClick(e);
                  }}
                >
                  {opt.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Avatar({ initials, bg, size = 28 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bg, color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.38, fontWeight: 500, flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function EmptyRow({ children = "No data available" }) {
  return <div style={{ padding: "20px 14px", fontSize: 12, color: "#aaa", textAlign: "center" }}>{children}</div>;
}

// ── styles ────────────────────────────────────────────────────────────────────
const S = {
  page: { fontFamily: "system-ui,sans-serif", background: GREY_BG, minHeight: "100vh", paddingBottom: 40 },
  th: (bg = TH_BG, color = TH_COLOR) => ({
    padding: "6px 8px", fontSize: 11, fontWeight: 600, textTransform: "uppercase",
    background: bg, color, border: "1px solid #ddd", textAlign: "center", whiteSpace: "nowrap",
  }),
  td: { padding: "6px 8px", border: "1px solid #eee", fontSize: 12, textAlign: "center", color: "#333" },
  tdNeg: { padding: "6px 8px", border: "1px solid #eee", fontSize: 12, textAlign: "center", color: "#e74c3c" },
  monthTh: (color) => ({
    background: color, color: WHITE, fontWeight: 600, fontSize: 11,
    textAlign: "center", padding: "5px 0", border: "1px solid rgba(255,255,255,.25)",
    whiteSpace: "nowrap", textTransform: "uppercase"
  }),
};

// ── VIEW DATA DRILL MODAL ─────────────────────────────────────────────────────────────
function ViewDataDrillModal({ series }) {
  const [drillType, setDrillType] = useState("Monthly");
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    const modalEl = document.getElementById('viewdataDrillModal');
    if (!modalEl) return;

    const onShow = () => {
      window.history.pushState({ modal: 'dataDrill' }, '', '#dataDrill');
    };

    const onHide = () => {
      if (window.location.hash === '#dataDrill') {
        window.history.back();
      }
    };

    const handlePopState = () => {
      if (modalEl.classList.contains('show')) {
        const modal = window.bootstrap?.Modal?.getInstance(modalEl);
        if (modal) modal.hide();
      }
    };

    modalEl.addEventListener('show.bs.modal', onShow);
    modalEl.addEventListener('hide.bs.modal', onHide);
    window.addEventListener('popstate', handlePopState);

    return () => {
      modalEl.removeEventListener('show.bs.modal', onShow);
      modalEl.removeEventListener('hide.bs.modal', onHide);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const toggleRow = (measure) => {
    setExpandedRows(prev => ({ ...prev, [measure]: !prev[measure] }));
  };

  const periods = [];
  const seenPeriods = new Set();
  const byMeasure = new Map();
  const byParent = new Map();
  const rootMeasures = [];

  const getGroupedPeriod = (orderDate, type) => {
    if (!orderDate) return "—";
    const d = parseDate(orderDate);
    if (!d) return orderDate;
    
    const year = d.getFullYear();
    const month = d.getMonth(); // 0-11
    
    if (type === "Quarterly") {
      const q = Math.floor(month / 3) + 1;
      return `Q${q} ${year}`;
    } else if (type === "Half Yearly") {
      const h = month < 6 ? 1 : 2;
      return `H${h} ${year}`;
    } else if (type === "Annually") {
      return `${year}`;
    }
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return `${monthNames[month]} ${year}`;
  };

  (series || []).forEach((row) => {
    const orderDate = row.financialMonth ?? row.realDateFrom ?? row.period;
    let period = getGroupedPeriod(orderDate, drillType);
    if (period === "—" && row.period) period = row.period;
    
    if (!seenPeriods.has(period)) { 
      seenPeriods.add(period); 
      periods.push({ period, order: orderDate }); 
    } else {
      const existing = periods.find(p => p.period === period);
      if (existing && parseDate(orderDate) && parseDate(existing.order) && parseDate(orderDate) < parseDate(existing.order)) {
        existing.order = orderDate;
      }
    }
    
    const measure = row.measureName || row.nodeKey || "Measure";
    if (!byMeasure.has(measure)) {
      byMeasure.set(measure, { measure, data: {} });
    }
    const m = byMeasure.get(measure);
    
    if (!m.data[period]) {
      m.data[period] = { actual: 0, target: 0 };
    }
    m.data[period].actual += toNum(row.actual) || 0;
    m.data[period].target += toNum(row.target) || 0;
    
    if (row.parentId) {
       m.isChild = true;
       m.parentId = row.parentId;
    } else if (row.isChild) {
       m.isChild = true;
       m.parentId = row.parentId || "Unknown Parent";
    }
  });

  for (const [measure, m] of byMeasure.entries()) {
    if (m.isChild && m.parentId) {
       if (!byParent.has(m.parentId)) {
          byParent.set(m.parentId, []);
       }
       const siblings = byParent.get(m.parentId);
       if (!siblings.includes(measure)) {
          siblings.push(measure);
       }
    } else {
       rootMeasures.push(measure);
    }
  }

  periods.sort((a, b) => (parseDate(a.order)?.getTime() ?? 0) - (parseDate(b.order)?.getTime() ?? 0));
  const measures = Array.from(byMeasure.entries());
  const colorFor = (i) => MONTH_PALETTE[i % MONTH_PALETTE.length];

  const handleDownloadExcel = (e) => {
    if (e) e.preventDefault();
    if (measures.length === 0) return;

    let html = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    html += '<head><meta charset="UTF-8"></head><body>';
    html += '<table border="1">';
    
    // Header 1
    html += '<tr>';
    html += '<th style="background-color: #f5f5f5; color: #888; font-weight: bold; text-align: left;">NAME / PERIOD</th>';
    periods.forEach((p, i) => {
      const color = colorFor(i); 
      html += `<th colspan="3" style="background-color: ${color}; color: #ffffff; font-weight: bold; text-align: center;">${p.period}</th>`;
    });
    html += '</tr>';

    // Header 2
    html += '<tr>';
    html += '<th style="background-color: #f5f5f5;"></th>';
    periods.forEach((p, i) => {
      const color = colorFor(i); 
      html += `<th style="background-color: ${color}; color: #ffffff; font-weight: bold; text-align: center;">ACTUAL</th>`;
      html += `<th style="background-color: ${color}; color: #ffffff; font-weight: bold; text-align: center;">TARGET</th>`;
      html += `<th style="background-color: ${color}; color: #ffffff; font-weight: bold; text-align: center;">GAP</th>`;
    });
    html += '</tr>';

    // Data rows
    measures.forEach(([measure, data]) => {
      html += '<tr>';
      html += `<td style="text-align: left;">${measure}</td>`;
      periods.forEach(p => {
        const cell = data.data[p.period] || {};
        const a = cell.actual, t = cell.target;
        const gap = a != null && t != null ? a - t : null;
        html += `<td>${a == null ? "-" : fmtNum(a)}</td>`;
        html += `<td>${t == null ? "-" : fmtNum(t)}</td>`;
        html += `<td style="${gap != null && gap < 0 ? 'color: #dc3545;' : ''}">${gap == null ? "-" : fmtNum(gap)}</td>`;
      });
      html += '</tr>';
    });

    html += '</table></body></html>';

    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", `Data_Drill_${drillType.replace(" ", "")}.xls`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const renderRow = (measure, mData, depth = 0) => {
    const children = byParent.get(measure) || [];
    const hasChildren = children.length > 0;
    const isExpanded = !!expandedRows[measure];
    const showToggle = hasChildren || depth === 0;

    const rowUI = (
      <tr key={measure}>
        <td style={{ ...S.td, whiteSpace: "nowrap", textAlign: "left", paddingLeft: depth > 0 ? (depth * 20 + 8) + "px" : "8px" }}>
          {showToggle ? (
            <span 
              onClick={() => toggleRow(measure)} 
              style={{ cursor: "pointer", marginRight: "8px", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "16px", height: "16px", borderRadius: "50%", background: "#dfc7d4", color: "#883b71", fontSize: "14px", fontWeight: "bold", lineHeight: "16px", verticalAlign: "middle" }}
            >
              {isExpanded ? "-" : "+"}
            </span>
          ) : (
             <span style={{ marginRight: depth === 0 ? "24px" : "8px", display: "inline-block" }}></span>
          )}
          {measure}
        </td>
        {periods.flatMap((p) => {
          const cell = mData.data[p.period] || {};
          const a = cell.actual, t = cell.target;
          const gap = a != null && t != null ? a - t : null;
          return [
            <td key={`${p.period}-a`} style={S.td}>{a == null ? "-" : fmtNum(a)}</td>,
            <td key={`${p.period}-t`} style={S.td}>{t == null ? "-" : fmtNum(t)}</td>,
            <td key={`${p.period}-g`} style={gap != null && gap < 0 ? S.tdNeg : S.td}>{gap == null ? "-" : fmtNum(gap)}</td>,
          ];
        })}
      </tr>
    );

    if (isExpanded) {
      if (hasChildren) {
        return [rowUI, ...children.flatMap(childMeasure => renderRow(childMeasure, byMeasure.get(childMeasure), depth + 1))];
      } else {
        return [
          rowUI,
          <tr key={`${measure}-empty`}>
            <td colSpan={1 + periods.length * 3} style={{ ...S.td, textAlign: "center", color: "#888", fontStyle: "italic", padding: "12px" }}>
              No sub-items available
            </td>
          </tr>
        ];
      }
    }
    return rowUI;
  };

  return (
    <div className="modal custom-modal fade" id="viewdataDrillModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Data Drill</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="card border-0">
              <div className="card-body px-0 py-2">
                <div className="d-flex align-items-center mb-3 px-3">
                  <div className="form-group mb-0" style={{ width: 200 }}>
                    <select 
                      id="dataDrillType" 
                      className="form-select form-select-sm select-dropdown-file-upload"
                      value={drillType}
                      onChange={(e) => setDrillType(e.target.value)}
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Half Yearly">Half Yearly</option>
                      <option value="Annually">Annually</option>
                    </select>
                  </div>
                  <div className="ms-auto">
                    <button className="btn btn-sm btn-primary rounded-pill" onClick={handleDownloadExcel}>
                      <i className="fas fa-download me-1"></i> Download Excel
                    </button>
                  </div>
                </div>
                <div className="w-100" style={{ overflowX: "auto" }}>
                  <table className="table table-bordered w-100 mb-0" style={{ fontSize: 12 }}>
                    <thead>
                      <tr>
                        <th style={{ ...S.th("#f5f5f5", "#888"), whiteSpace: "nowrap", paddingLeft: 10, textAlign: "left" }}>
                          <span style={{ color: "#28a745", marginRight: 2, fontSize: 10 }}>↑</span>
                          <span style={{ color: "#dc3545", marginRight: 6, fontSize: 10 }}>↓</span>
                          NAME/PERIOD
                        </th>
                        {periods.map((p, i) => (
                          <th key={p.period} colSpan={3} style={S.monthTh(colorFor(i))}>{p.period}</th>
                        ))}
                      </tr>
                      <tr>
                        <th style={S.th()}></th>
                        {periods.flatMap((p, i) =>
                          ["ACTUAL", "TARGET", "GAP"].map((c) => (
                            <th key={`${p.period}-${c}`} style={{ ...S.th(colorFor(i), WHITE), opacity: 0.9 }}>{c}</th>
                          ))
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {rootMeasures.length === 0 ? (
                        <tr>
                          <td colSpan={1 + periods.length * 3} className="text-center text-muted py-4">No drill-down data</td>
                        </tr>
                      ) : rootMeasures.map(measure => renderRow(measure, byMeasure.get(measure)))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── VIEW DATA TABLE MODAL ───────────────────────────────────────────────────
function ViewDataTableModal({ rows, currency }) {
  const [page, setPage] = useState(1);
  const perPage = 7;
  const pageCount = Math.max(1, Math.ceil((rows || []).length / perPage));
  const safePage = Math.min(page, pageCount);
  const slice = (rows || []).slice((safePage - 1) * perPage, safePage * perPage);

  return (
    <div className="modal custom-modal fade" id="kpiDataTableModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Data Table</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body p-3">
            <div className="card custom-card table-card h-100 border-0 shadow-none mb-0">
              <div className="card-body employee_div_body_box activities-box" style={{ padding: 0 }}>
                <table className="table table-bordered w-100 mb-0">
                  <thead className="text-center">
                    <tr>
                      {["PERIOD", "ACTUAL", "TARGET", "GAP", "YTD"].map((h) => (
                        <th key={h} style={S.th()}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {slice.length === 0 && (
                      <tr><td colSpan={5} style={{ ...S.td, color: "#aaa", padding: "16px" }}>No data for this period</td></tr>
                    )}
                    {slice.map((r, i) => (
                      <tr key={i}>
                        <td style={S.td}>{r.period}</td>
                        <td style={S.td}>{fmtMoney(r.actual, currency)}</td>
                        <td style={S.td}>{fmtMoney(r.target, currency)}</td>
                        <td style={r.gap < 0 ? S.tdNeg : S.td}>{fmtMoney(r.gap, currency)}</td>
                        <td style={S.td}>{fmtMoney(r.ytd, currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {pageCount > 1 && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, padding: "8px 14px", marginTop: "1rem" }}>
                  <PgBtn label="‹" active={false} onClick={() => setPage((p) => Math.max(1, p - 1))} />
                  {Array.from({ length: pageCount }, (_, idx) => idx + 1).map((p) => (
                    <PgBtn key={p} label={p} active={safePage === p} onClick={() => setPage(p)} />
                  ))}
                  <PgBtn label="›" active={false} onClick={() => setPage((p) => Math.min(pageCount, p + 1))} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MY INITIATIVE ─────────────────────────────────────────────────────────────
function InitiativePanel({ initiatives }) {
  const items = (initiatives || []).map((it) => {
    const v = it.initiativeValue || {};
    const pct = toNum(v.progressval);
    return {
      title: v.name || it.initiativeId || `Initiative ${it.id}`,
      pct: pct == null ? 0 : Math.round(pct),
      date: v.daterange || [fmtDate(it.startDate), fmtDate(it.endDate)].filter(Boolean).join(" - "),
    };
  });
  return (
    <div className="card custom-card table-card h-100">
      <CardHeader title="My Initiative" dropdownOptions={[{ label: "View", dataToggle: "modal", dataTarget: "#view-initative-modal" }]} />
      <div className="card-body overflow-auto">
        <div className="card-body-box">
          {items.length === 0 && <EmptyRow>No initiatives linked</EmptyRow>}
          <div className="list-group initiatives-bar">
            {items.map((item, i) => {
              const bgClass = item.pct < 40 ? "bg-danger" : item.pct < 70 ? "bg-warning" : "bg-success";
              const wrapClass = item.pct < 40 ? "red" : item.pct < 70 ? "yellow" : "green";
              return (
                <div className="list-group-item" key={i}>
                  <div className="bar-chart">
                    <h4 className="title m-0">{item.title}</h4>
                    <div className={`progress-wrap ${wrapClass}`}>
                      <div className="progress flex-grow-1">
                        <div className={`progress-bar ${bgClass} progress-bar-striped rounded-pill`} role="progressbar"
                          style={{ width: `${item.pct}%` }} aria-valuenow={item.pct} aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <span className="badge">{item.pct}%</span>
                    </div>
                    {item.date && <div className="text-muted"><strong>{item.date}</strong></div>}
                  </div>
                  <div className="list-actions">
                    <div className="dropdown">
                      <a href="#" className="btn btn-sm btn-outline-icon" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img width="14" height="14" src="/images/menu-dot-vertical-i.svg" onError={(e) => { e.target.style.display='none' }} />
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end border-0 shadow">
                        <li><a href="#edit-initative-list-modal" className="dropdown-item" data-bs-toggle="modal">Edit</a></li>
                        <li><a href="#delete-modal" className="dropdown-item" data-bs-toggle="modal">Delete</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── RISKS ─────────────────────────────────────────────────────────────────────
function RisksPanel({ risks }) {
  const items = (risks || []).map((r) => {
    const v = r.riskValue || {};
    return {
      name: v.name || r.riskUniqueId || `Risk ${r.id}`,
      status: v.riskStatus || v.riskcategory || "",
      date: v.dateRaised || fmtDate(r.raisedDate),
      score: v.score != null ? v.score : "",
    };
  });
  return (
    <div className="card custom-card table-card h-100">
      <CardHeader title="Risks" dropdownOptions={[{ label: "View", dataToggle: "modal", dataTarget: "#risks-view_popup" }]} />
      <div className="card-body overflow-auto">
        <div className="card-body-box">
          {items.length === 0 && <EmptyRow>No risks linked</EmptyRow>}
          <div className="list-group initiatives-bar">
            {items.map((r, i) => (
              <div className="list-group-item" key={i}>
                <div className="bar-chart">
                  <div className="d-flex gap-2">
                    <h4 className="title mb-0">{r.name}</h4> 
                    <span className="badge label-bg-dark rounded-pill ms-auto">{r.score !== "" ? r.score : "-"}</span>
                  </div>
                  <div className="numbers">
                    {r.status && <div className="text-muted left">{r.status}</div>}
                    {r.date && <div className="text-muted right">{r.date}</div>}
                  </div>
                </div>
                <div className="list-actions">
                  <div className="dropdown">
                    <a href="#" className="btn btn-sm btn-outline-icon" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img width="14" height="14" src="/images/menu-dot-vertical-i.svg" onError={(e) => { e.target.style.display='none' }} />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end border-0 shadow">
                      <li><a href="#edit_risk" className="dropdown-item" data-bs-toggle="modal">Edit</a></li>
                      <li><a href="#delete-modal" className="dropdown-item" data-bs-toggle="modal">Delete</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── COMMENTS ──────────────────────────────────────────────────────────────────
function CommentItem({ c }) {
  const v = c.commentsValue || {};
  const author = v.createdByName || (c.createdBy ? `Employee #${c.createdBy}` : "Unknown");
  return (
    <div className="comment">
      <div className="comment-content">
        <div className="comment-card">
          <Avatar initials={initialsFrom(author)} bg={DARK_BLUE} size={28} />
          <div className="comment-cr">
            <div className="comment-highlight">
              <div className="comment-head">
                <h6 className="user-name">{author}</h6>
                <span className="comment-time">{fmtTime(c.createdTime)}</span>
              </div>
              <div className="comment-text">{v.desc}</div>
            </div>
            <div className="comment-actions">
              <span className="like-btn">Like</span> ·
              <span className="like-count">{c.likeCount || 0}</span> ·
              <span className="reply-btn">Reply</span> ·
              <span className="edit-btn">Edit</span> ·
              <span className="delete-btn">Delete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentsPanel({ comments, onAdd }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef(null);

  async function submit() {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setBusy(true);
    try {
      await onAdd(trimmed);
      setText("");
      setTimeout(() => listRef.current?.scrollTo({ top: 9999, behavior: "smooth" }), 80);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card custom-card table-card h-100" style={{ display: "flex", flexDirection: "column" }}>
      <CardHeader title="Comments" dropdownOptions={[{ label: "View", dataToggle: "modal", dataTarget: "#comments_view_popup" }]} />
      <div ref={listRef} className="card-body overflow-auto comment-history comments-list" style={{ flex: 1, maxHeight: 262 }}>
        {(!comments || comments.length === 0) && <EmptyRow>No comments yet</EmptyRow>}
        {(comments || []).map((c, i) => (
          <div key={c.id ?? i}>
            <CommentItem c={c} />
          </div>
        ))}
      </div>
      <div className="card-footer comment_send">
        <div className="input-group">
          <input
            type="text"
            className="form-control comment-input"
            placeholder="Type a comment..."
            value={text}
            disabled={busy}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
          <button className="btn label-bg-primary post-comment" type="button" onClick={submit} disabled={busy}>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── DATA TABLE ──────────────────────────────────────────────────────────────
function DataTable({ rows, currency }) {
  const [page, setPage] = useState(1);
  const perPage = 7;
  const pageCount = Math.max(1, Math.ceil(rows.length / perPage));
  const safePage = Math.min(page, pageCount);
  const slice = rows.slice((safePage - 1) * perPage, safePage * perPage);

  const handleDownloadCSV = (e) => {
    if (e) e.preventDefault();
    const headers = ["PERIOD", "ACTUAL", "TARGET", "GAP", "YTD"];
    const csvRows = [
      headers.join(","),
      ...rows.map(r => [
        `"${r.period}"`,
        `"${fmtMoney(r.actual, currency)}"`,
        `"${fmtMoney(r.target, currency)}"`,
        `"${fmtMoney(r.gap, currency)}"`,
        `"${fmtMoney(r.ytd, currency)}"`
      ].join(","))
    ];
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", "Data_Table.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="card custom-card table-card h-100">
      <CardHeader title="Data Table" dropdownOptions={[
        { label: 'View', dataToggle: 'modal', dataTarget: '#kpiDataTableModal' }, 
        { label: 'Download CSV', onClick: handleDownloadCSV }
      ]} />
      <div className="card-body employee_div_body_box activities-box">
        <table className="table table-bordered w-100 mb-0">
          <thead className="text-center">
            <tr>
              {["PERIOD", "ACTUAL", "TARGET", "GAP", "YTD"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 && (
              <tr><td colSpan={5} className="text-muted p-3">No data for this period</td></tr>
            )}
            {slice.map((r, i) => (
              <tr key={i}>
                <td>{r.period}</td>
                <td>{fmtMoney(r.actual, currency)}</td>
                <td>{fmtMoney(r.target, currency)}</td>
                <td className={r.gap < 0 ? "text-danger" : ""}>{fmtMoney(r.gap, currency)}</td>
                <td>{fmtMoney(r.ytd, currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pageCount > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 14px" }}>
          <PgBtn label="‹" active={false} onClick={() => setPage((p) => Math.max(1, p - 1))} />
          {Array.from({ length: pageCount }, (_, idx) => idx + 1).map((p) => (
            <PgBtn key={p} label={p} active={safePage === p} onClick={() => setPage(p)} />
          ))}
          <PgBtn label="›" active={false} onClick={() => setPage((p) => Math.min(pageCount, p + 1))} />
        </div>
      )}
    </div>
  );
}

function PgBtn({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 24, height: 24, borderRadius: "50%", border: "0.5px solid #ddd", cursor: "pointer",
      background: active ? DARK_BLUE : "none", color: active ? "#fff" : "#999",
      fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center",
    }}>{label}</button>
  );
}

// ── ACTUAL V/S TARGET CHART ─────────────────────────────────────────────────
function ActualVsTarget({ rows, currency, hideHeader = false }) {
  const [chartType, setChartType] = useState('line');
  const [showChartDropdown, setShowChartDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.custom-chart-dropdown')) {
        setShowChartDropdown(false);
      }
    };
    if (showChartDropdown) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showChartDropdown]);

  const categories = rows.map(r => String(r.period).replace(/\s*\d{4}$/, ""));
  const actuals = rows.map(r => r.actual == null ? 0 : r.actual);
  const targets = rows.map(r => r.target == null ? 0 : r.target);

  const series = chartType === 'bubble' 
    ? [
        { name: 'Actual', data: actuals.map((a, i) => ({ x: i + 1, y: a, z: Math.max(10, Math.abs(a) * 0.5) || 15 })) },
        { name: 'Target', data: targets.map((t, i) => ({ x: i + 1, y: t, z: Math.max(10, Math.abs(t) * 0.5) || 15 })) }
      ]
    : [
        { name: 'Actual', data: actuals },
        { name: 'Target', data: targets }
      ];

  const options = {
    chart: { 
      type: chartType, 
      fontFamily: 'inherit',
      toolbar: { 
        show: true,
        tools: { zoom: true, zoomin: true, zoomout: true, pan: true, reset: true, download: true }
      },
      zoom: { enabled: true, type: 'x' }
    },
    colors: ['#3498db', '#e67e22'],
    stroke: { 
      curve: 'smooth', 
      width: chartType === 'bar' ? 0 : 3 
    },
    fill: {
      type: chartType === 'area' ? 'gradient' : 'solid',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100]
      }
    },
    dataLabels: { 
      enabled: chartType === 'bar' || chartType === 'line',
      formatter: (val) => val >= 1000 ? (val/1000).toFixed(1) + 'k' : Number(val).toFixed(0),
      style: { fontSize: '10px' },
      background: { enabled: true, foreColor: '#333', borderRadius: 2, padding: 4 }
    },
    xaxis: { 
      type: chartType === 'bubble' ? 'numeric' : 'category',
      categories: chartType === 'bubble' ? undefined : categories,
      title: { text: 'Period', style: { color: '#666', fontWeight: 600, fontSize: '11px' } },
      labels: {
        formatter: chartType === 'bubble' 
          ? (val) => Number.isInteger(val) && categories[val - 1] ? categories[val - 1] : ''
          : undefined
      },
      tickAmount: chartType === 'bubble' ? categories.length : undefined,
      min: chartType === 'bubble' ? 0.5 : undefined,
      max: chartType === 'bubble' ? categories.length + 0.5 : undefined
    },
    yaxis: {
      title: { text: currency ? `Value (${currency})` : 'Value', style: { color: '#666', fontWeight: 600, fontSize: '11px' } },
      labels: {
        formatter: (val) => val >= 1000000 ? (val/1000000).toFixed(1) + 'M' : val >= 1000 ? (val/1000).toFixed(1) + 'K' : Number.isInteger(val) ? val.toString() : val.toFixed(2)
      }
    },
    markers: { 
      size: chartType === 'line' || chartType === 'area' ? 4 : 0,
      strokeWidth: 0,
      hover: { size: 6 }
    },
    legend: { position: 'bottom', markers: { radius: 12 } },
    tooltip: {
      shared: chartType !== 'bubble',
      intersect: chartType === 'bubble',
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        const data = w.config.series[seriesIndex].data[dataPointIndex];
        const period = categories[dataPointIndex];
        const val = typeof data === 'object' ? data.y : data;
        return `<div class="p-2" style="font-size: 12px; font-family: 'Inter', sans-serif;">
          <div style="font-weight: 600; margin-bottom: 4px; padding-bottom: 4px; border-bottom: 1px solid #eee;">
            ${period}
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background-color:${w.config.colors[seriesIndex]};"></span>
            <span>${w.config.series[seriesIndex].name}: <strong>${fmtMoney(val, currency)}</strong></span>
          </div>
        </div>`;
      }
    }
  };

  const icons = {
    bubble: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{pointerEvents: 'none'}}><circle cx="12" cy="12" r="10"></circle><circle cx="6" cy="12" r="2"></circle><circle cx="16" cy="12" r="4"></circle></svg>,
    bar: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{pointerEvents: 'none'}}><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
    line: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{pointerEvents: 'none'}}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
    area: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{pointerEvents: 'none'}}><path d="M22 20H2v-6l4-4 4 4 4-8 8 8v6z"></path></svg>
  };

  return (
    <div className={hideHeader ? "h-100 position-relative" : "card custom-card table-card h-100"}>
      {!hideHeader && <CardHeader 
        title="Actual v/s Target" 
        dropdownOptions={[{ label: 'View', dataToggle: 'modal', dataTarget: '#viewActualVsTargetModal' }]}
        extra={
        <div className="dropdown me-2 custom-chart-dropdown" style={{ position: 'relative' }}>
          <button className="btn btn-sm btn-icon" type="button" onClick={() => setShowChartDropdown(!showChartDropdown)} title="Change Chart Type">
            {icons[chartType]}
          </button>
          {showChartDropdown && (
            <ul className="dropdown-menu dropdown-menu-end border-0 p-2 shadow show" id="control-view" style={{ minWidth: 'auto', position: 'absolute', top: '100%', right: 0 }}>
              <li className="d-flex">
                {['bubble', 'bar', 'line', 'area'].map(type => (
                  <button key={type} type="button" className={`dropdown-item drawChart ${chartType === type ? 'active' : ''}`} 
                    data-bs-toggle="tooltip" title={type}
                    onClick={() => { setChartType(type); setShowChartDropdown(false); }} 
                    style={{ cursor: "pointer", display: 'flex', border: 'none', background: 'transparent' }}>
                    {icons[type]}
                  </button>
                ))}
              </li>
            </ul>
          )}
        </div>
      } />}
      <div className="card-body" style={{ padding: "10px 16px 4px", position: "relative", height: hideHeader ? "calc(100% - 20px)" : "250px" }}>
        {rows.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#bbb', fontSize: 12 }}>
            No data for this period
          </div>
        ) : (
          <ReactApexChart options={options} series={series} type={chartType} height="100%" />
        )}
      </div>
    </div>
  );
}

// ── VIEW ACTUAL V/S TARGET MODAL ──────────────────────────────────────────────
function ViewActualVsTargetModal({ rows, currency }) {
  return (
    <div className="modal custom-modal fade" id="viewActualVsTargetModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Actual v/s Target</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body p-3">
            <ActualVsTarget rows={rows} currency={currency} hideHeader={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── DATA DRILL ────────────────────────────────────────────────────────────────
const VIBRANT_MONTH_PALETTE = [
  "#9973B4", "#F16999", "#B1A3CD", "#2EBFB4", "#F4925D", "#E56B55", "#59B581", "#E19097", "#bda3c4", "#a3b2c4"
];

// Pivots the raw series by measure (rows) × period (columns).
function DataDrillPanel({ series }) {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (measure) => {
    setExpandedRows(prev => ({ ...prev, [measure]: !prev[measure] }));
  };

  const periods = [];
  const seenPeriods = new Set();
  const byMeasure = new Map();
  const byParent = new Map();

  (series || []).forEach((row) => {
    const period = row.period || row.financialMonth || "—";
    if (!seenPeriods.has(period)) { seenPeriods.add(period); periods.push({ period, order: row.financialMonth ?? row.realDateFrom ?? period }); }
    const measure = row.measureName || row.nodeKey || "Measure";
    const m = byMeasure.get(measure) || { data: {}, isChild: false, parentId: null };
    m.data[period] = { actual: toNum(row.actual), target: toNum(row.target) };
    
    if (row.parentId) {
       m.isChild = true;
       m.parentId = row.parentId;
    } else if (row.isChild) {
       m.isChild = true;
       m.parentId = row.parentId || "Unknown Parent";
    }

    byMeasure.set(measure, m);
  });
  
  byMeasure.forEach((m, measure) => {
    if (m.isChild && m.parentId) {
      if (!byParent.has(m.parentId)) byParent.set(m.parentId, []);
      const children = byParent.get(m.parentId);
      if (!children.includes(measure)) children.push(measure);
    }
  });

  periods.sort((a, b) => (parseDate(a.order)?.getTime() ?? 0) - (parseDate(b.order)?.getTime() ?? 0));
  const measures = Array.from(byMeasure.entries());
  const rootMeasures = measures.filter(([_, m]) => !m.isChild);
  const colorFor = (i) => VIBRANT_MONTH_PALETTE[i % VIBRANT_MONTH_PALETTE.length];

  const handleDownloadExcel = (e) => {
    if (e) e.preventDefault();
    if (measures.length === 0) return;

    let html = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
    html += '<head><meta charset="UTF-8"></head><body>';
    html += '<table border="1">';
    
    html += '<tr>';
    html += '<th style="background-color: #f5f5f5; color: #888; font-weight: bold; text-align: left;">NAME / PERIOD</th>';
    periods.forEach((p, i) => {
      const color = colorFor(i); 
      html += `<th colspan="3" style="background-color: ${color}; color: #ffffff; font-weight: bold; text-align: center;">${p.period}</th>`;
    });
    html += '</tr>';

    html += '<tr>';
    html += '<th style="background-color: #f5f5f5;"></th>';
    periods.forEach((p, i) => {
      const color = colorFor(i); 
      html += `<th style="background-color: ${color}; color: #ffffff; font-weight: bold; text-align: center;">ACTUAL</th>`;
      html += `<th style="background-color: ${color}; color: #ffffff; font-weight: bold; text-align: center;">TARGET</th>`;
      html += `<th style="background-color: ${color}; color: #ffffff; font-weight: bold; text-align: center;">GAP</th>`;
    });
    html += '</tr>';

    measures.forEach(([measure, data]) => {
      html += '<tr>';
      html += `<td style="text-align: left;">${measure}</td>`;
      periods.forEach(p => {
        const cell = data.data[p.period] || {};
        const a = cell.actual, t = cell.target;
        const gap = a != null && t != null ? a - t : null;
        html += `<td>${a == null ? "-" : fmtNum(a)}</td>`;
        html += `<td>${t == null ? "-" : fmtNum(t)}</td>`;
        html += `<td style="${gap != null && gap < 0 ? 'color: #dc3545;' : ''}">${gap == null ? "-" : fmtNum(gap)}</td>`;
      });
      html += '</tr>';
    });

    html += '</table></body></html>';

    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", "Data_Drill.xls");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const renderRow = (measure, mData, depth = 0) => {
    const children = byParent.get(measure) || [];
    const hasChildren = children.length > 0;
    const isExpanded = !!expandedRows[measure];
    const showToggle = hasChildren || depth === 0;

    const rowUI = (
      <tr key={measure}>
        <td style={{ ...S.td, whiteSpace: "nowrap", textAlign: "left", paddingLeft: depth > 0 ? (depth * 20 + 8) + "px" : "8px" }}>
          {showToggle ? (
            <span 
              onClick={() => toggleRow(measure)} 
              style={{ cursor: "pointer", marginRight: "8px", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "16px", height: "16px", borderRadius: "50%", background: "#dfc7d4", color: "#883b71", fontSize: "14px", fontWeight: "bold", lineHeight: "16px", verticalAlign: "middle" }}
            >
              {isExpanded ? "-" : "+"}
            </span>
          ) : (
             <span style={{ marginRight: depth === 0 ? "24px" : "8px", display: "inline-block" }}></span>
          )}
          {measure}
        </td>
        {periods.flatMap((p) => {
          const cell = mData.data[p.period] || {};
          const a = cell.actual, t = cell.target;
          const gap = a != null && t != null ? a - t : null;
          return [
            <td key={`${p.period}-a`} style={S.td}>{a == null ? "-" : fmtNum(a)}</td>,
            <td key={`${p.period}-t`} style={S.td}>{t == null ? "-" : fmtNum(t)}</td>,
            <td key={`${p.period}-g`} style={gap != null && gap < 0 ? S.tdNeg : S.td}>{gap == null ? "-" : fmtNum(gap)}</td>,
          ];
        })}
      </tr>
    );

    if (isExpanded) {
      if (hasChildren) {
        return [rowUI, ...children.flatMap(childMeasure => renderRow(childMeasure, byMeasure.get(childMeasure), depth + 1))];
      } else {
        return [
          rowUI,
          <tr key={`${measure}-empty`}>
            <td colSpan={1 + periods.length * 3} style={{ ...S.td, textAlign: "center", color: "#888", fontStyle: "italic", padding: "12px" }}>
              No sub-items available
            </td>
          </tr>
        ];
      }
    }
    return rowUI;
  };

  return (
    <div className="card custom-card table-card h-100">
      <div className="card-header">
        <div className="c-header-left">
          <h5 className="card-title">Data Drill</h5>
        </div>
        <div className="card-actions">
          <div className="dropdown">
            <button className="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
               <img width="16" height="16" src="/images/menu-dot-vertical-i.svg" onError={(e) => { e.target.style.display='none' }} />
            </button>
          <ul className="dropdown-menu dropdown-menu-end border-0 shadow">
            <li><a className="dropdown-item" href="#!" onClick={e => e.preventDefault()} data-bs-toggle="modal" data-bs-target="#viewdataDrillModal">View</a></li>
            <li><a className="dropdown-item" href="#" onClick={handleDownloadExcel}>Download Excel</a></li>
          </ul>
        </div>
        </div>
      </div>
      {measures.length === 0 ? (
        <div className="card-body"><EmptyRow>No drill-down data for this period</EmptyRow></div>
      ) : (
        <div className="card-body employee_div_body_box activities-box">
          <div style={{ overflowX: "auto" }}>
            <table className="table table-bordered w-100 mb-0" style={{ fontSize: 12 }}>
              <thead>
                <tr>
                  <th style={{ ...S.th("#f5f5f5", "#888"), whiteSpace: "nowrap", paddingLeft: 10, textAlign: "left" }}>
                    <span style={{ color: "#28a745", marginRight: 2, fontSize: 10 }}>↑</span>
                    <span style={{ color: "#dc3545", marginRight: 6, fontSize: 10 }}>↓</span>
                    NAME/PERIOD
                  </th>
                  {periods.map((p, i) => (
                    <th key={p.period} colSpan={3} style={S.monthTh(colorFor(i))}>{p.period}</th>
                  ))}
                </tr>
                <tr>
                  <th style={S.th()}></th>
                  {periods.flatMap((p, i) =>
                    ["ACTUAL", "TARGET", "GAP"].map((c) => (
                      <th key={`${p.period}-${c}`} style={{ ...S.th(colorFor(i), WHITE), opacity: 0.9 }}>{c}</th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody>
                {rootMeasures.flatMap(([measure, mData]) => renderRow(measure, mData, 0))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ── FILES ─────────────────────────────────────────────────────────────────────
function FilesPanel({ files, onEditFile }) {
  const items = (files || []).map((f) => ({
    ...f, // keep original f props for editing
    name: f.name || "Attachment",
    file: [f.file || f.uniqueFileReference, f.size].filter(Boolean).join(" "),
    date: fmtDate(f.createdTime),
  }));
  return (
    <div className="card custom-card table-card h-100">
      <CardHeader title="Files" dropdownOptions={[{ label: "View", dataToggle: "modal", dataTarget: "#files-view_popup" }]} />
      <div className="card-body overflow-auto">
        <div className="card-body-box">
          {items.length === 0 && <EmptyRow>No files attached</EmptyRow>}
          <div className="list-group initiatives-bar">
            {items.map((f, i) => (
              <div className="list-group-item" key={i}>
                <div className="bar-chart">
                  <div className="d-flex gap-2"><h4 className="title mb-0">{f.name}</h4></div>
                  <div className="numbers">
                    {f.file && <div className="text-muted left">{f.file}</div>}
                    {f.date && <div className="text-muted right">{f.date}</div>}
                  </div>
                </div>
                <div className="list-actions">
                  <div className="dropdown">
                    <a href="#" className="btn btn-sm btn-outline-icon" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img width="14" height="14" src="/images/menu-dot-vertical-i.svg" onError={(e) => { e.target.style.display='none' }} />
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end border-0 shadow">
                      <li><a href="#fileupload-modal" className="dropdown-item" data-bs-toggle="modal" onClick={() => onEditFile(f)}>Edit</a></li>
                      <li><a href="#delete-modal" className="dropdown-item" data-bs-toggle="modal" onClick={() => window._deleteTarget = { type: 'file', id: f.id }}>Delete</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── RIGHT SIDEBAR ICONS ───────────────────────────────────────────────────────
function SidebarIcons() {
  return (
    <div style={{
      position: "fixed", right: 0, top: "50%", transform: "translateY(-50%)",
      display: "flex", flexDirection: "column", gap: 2,
      background: "#fff", border: "0.5px solid #dde", borderRadius: "8px 0 0 8px",
      padding: "8px 4px", zIndex: 100,
    }}>
      {[{ icon: "⌂", label: "Home" }, { icon: "▦", label: "Grid" }].map(({ icon, label }) => (
        <button key={label} title={label} style={{
          width: 32, height: 32, background: "none", border: "none",
          cursor: "pointer", fontSize: 16, color: "#888", borderRadius: 6,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{icon}</button>
      ))}
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function KpiStoryCardPage() {
  const { kpiId } = useParams();
  const navigate = useNavigate();
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  
  useEffect(() => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    // Cleanup Bootstrap modal artifacts on unmount
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(b => b.remove());
    };
  }, []);

  // Period is controlled by the global header picker (stored in localStorage);
  // the global picker reloads on Apply, so reading it on mount is sufficient.
  const [dateRange] = useState(() => {
    const y = new Date().getFullYear();
    return localStorage.getItem("customperiod") || `01/01/${y}-12/31/${y}`;
  });

  const [viewFilters, setViewFilters] = useState({
    datatable: true,
    actualvtarget: true,
    datadrill: true,
    myinitiative: true,
    risks: true,
    comments: true,
    files: true,
  });

  const toggleFilter = (key) => setViewFilters((prev) => ({ ...prev, [key]: !prev[key] }));

  const { loading, error, kpi, series, initiatives, risks, comments, files, reload, reloadComments, setFiles } = useKpiStoryCard(kpiId, dateRange);

  const kpiName = kpi?.kpiName || "KPI";
  const kpiVal = kpi?.kpiValue || {};
  const { rows: periodRows, currency } = aggregateByPeriod(series);

  async function handleAddComment(desc) {
    await addKpiComment({ kpiId: Number(kpiId), desc, createdBy: loggedInEmpId() });
    await reloadComments();
  }

  useEffect(() => {
    const handleDeleteConfirm = (e) => {
      const btn = e.target.closest('#delete-modal .btn-danger');
      if (!btn) return;
      const target = window._deleteTarget || {};
      if (target.type === 'file' && target.id) {
        e.preventDefault();
        e.stopPropagation();
        setFiles(prev => prev.filter(f => f.id !== target.id));
        window._deleteTarget = null;
        const modalEl = document.getElementById('delete-modal');
        if (modalEl && window.bootstrap?.Modal) {
          window.bootstrap.Modal.getInstance(modalEl)?.hide();
        }
      }
    };
    document.addEventListener('click', handleDeleteConfirm);
    return () => document.removeEventListener('click', handleDeleteConfirm);
  }, [setFiles]);

  return (
    <div style={S.page}>
      <SidebarIcons />
      <KpiSidebar loggedInEmpId={loggedInEmpId()} />
      
      <style>{`
        .card-accordion .accordion-header .accordion-button::after {
          background: url('/images/carat-i.svg') no-repeat center center !important;
          background-size: 10px !important;
        }
      `}</style>

      <main className="pt-3 pb-3">
        <div className="container-lg">
          <div className="row g-2">

            {/* ── KPI HEADER (Accordion) ── */}
            <div className="col-12">
              <div className="accordion card-accordion" id="accordionExample">
                <div className="card custom-card kpi_page_details accordion-item">
                  <div className="card-header accordion-header flex-wrap">
                    <div className="c-header-left kpi_details-title-box flex-nowrap align-items-center">
                      <button 
                        className="btn btn-sm btn-icon me-2" 
                        onClick={() => navigate(-1)} 
                        title="Go Back" 
                        type="button"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', border: '1px solid #ddd', borderRadius: '4px', width: '32px', height: '32px' }}
                      >
                        <i className="fas fa-arrow-left" style={{ color: '#883b71' }}></i>
                      </button>
                      <div className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                      </div>
                      <div className="user-card">
                        <div className="user-image user-image-sm user-active">
                          <img src="/images/user/user7.jpg" alt="User" width="24" height="24"
                            onError={(e) => { e.target.style.display = 'none' }} />
                        </div>
                      </div>
                      <h5 className="card-title me-auto">
                        <strong className="editableTxt1">{loading ? "Loading KPI…" : kpiName}</strong>
                      </h5>
                    </div>
                    <div className="card-actions justify-content-end">
                      <span className="btn btn-sm btn-icon" onClick={() => setIsViewOnly(false)} data-bs-toggle="modal" data-bs-target="#kpi-des-modal">
                        <i className="fas fa-pencil-alt title_edit_icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Edit" />
                      </span>
                      <span className="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#fileupload-modal" onClick={() => setEditingFile(null)}>
                        <i className="fas fa-paperclip title_edit_icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="File Upload" />
                      </span>
                      
                      {/* View Options Dropdown (Eye icon) */}
                      <div className="dropdown d-inline-block">
                        <span className="btn btn-sm btn-icon" id="popoverFilter" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" style={{ cursor: 'pointer' }}>
                          <i className="fas fa-eye title_edit_icon" data-bs-toggle="tooltip" data-bs-placement="bottom" title="View" />
                        </span>
                        <div className="dropdown-menu dropdown-menu-end shadow p-3" style={{ minWidth: 200, border: 'none', borderRadius: 8 }}>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="mb-0 fw-bold">View</h6>
                            <button type="button" className="btn-close" style={{ fontSize: 10 }} onClick={() => document.body.click()}></button>
                          </div>
                          <div className="d-flex flex-column gap-2">
                            {[
                              { id: 'datatable', label: 'Data Table' },
                              { id: 'actualvtarget', label: 'Actual vs Target' },
                              { id: 'datadrill', label: 'Data Drill' },
                              { id: 'myinitiative', label: 'My Initiative' },
                              { id: 'risks', label: 'Risks' },
                              { id: 'comments', label: 'Comments' },
                              { id: 'files', label: 'Files' },
                            ].map(filter => (
                              <div className="form-check m-0 d-flex align-items-center gap-2" key={filter.id}>
                                <input className="form-check-input mt-0" type="checkbox" id={`filter-${filter.id}`} checked={viewFilters[filter.id]} onChange={() => toggleFilter(filter.id)} style={{ cursor: 'pointer' }} />
                                <label className="form-check-label mb-0" htmlFor={`filter-${filter.id}`} style={{ fontSize: 13, color: '#333', cursor: 'pointer' }}>{filter.label}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="dropdown">
                        <button className="btn btn-sm btn-icon" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fas fa-ellipsis-v" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end border-0 shadow">
                          <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); downloadKpiReport(kpiId); }}>Download</a></li>
                          <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); window.scorecardActions?.openDeleteModal('kpi', kpiId); }}>Delete</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <div className="grid gap-2">
                        <div className="g-col-12 g-col-md-4">
                          <div className="table-responsive h-100">
                            <table className="table table-sm table-lefth table-bordered text-center mb-0 align-middle h-100">
                              <tbody>
                                <tr>
                                  <th width="40%">Department</th>
                                  <td>{kpiVal?.department || '-'}</td>
                                </tr>
                                <tr>
                                  <th>KPI ID</th>
                                  <td>{kpi?.kpiCode || kpi?.kpiId || '-'}</td>
                                </tr>
                                <tr>
                                  <th>Threshold</th>
                                  <td>
                                    <div className="d-flex flex-wrap justify-content-center gap-2">
                                      <span><span style={{color: "red"}}>●</span> &lt;=</span>
                                      <span><span style={{color: "orange"}}>●</span> =</span>
                                      <span><span style={{color: "green"}}>●</span> &gt;=</span>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="g-col-12 g-col-md-4">
                          <div className="table-responsive h-100">
                            <table className="table table-sm table-lefth table-bordered text-center mb-0 align-middle h-100">
                              <tbody>
                                <tr>
                                  <th width="40%">Frequency</th>
                                  <td>{kpiVal?.kpi_measurement || '-'}</td>
                                </tr>
                                <tr>
                                  <th>Status</th>
                                  <td>
                                    {kpiVal?.statusLight === 'red' ? '🔴' : kpiVal?.statusLight === 'yellow' ? '🟡' : '🟢'}
                                  </td>
                                </tr>
                                <tr>
                                  <th>Trend</th>
                                  <td>{kpiVal?.trend === 'down' ? '↘️' : '↗️'}</td>
                                </tr>
                                <tr>
                                  <th>Risk</th>
                                  <td>
                                    {kpiVal?.riskStatusLight === 'green' ? '🟢' : kpiVal?.riskStatusLight === 'yellow' ? '🟡' : '🔴'}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="g-col-12 g-col-md-4">
                          <div className="table-responsive h-100">
                            <table className="table table-sm table-lefth table-bordered text-center mb-0 align-middle h-100">
                              <tbody>
                                <tr>
                                  <th width="40%">Actual</th>
                                  <td>{fmtMoney(kpiVal?.actual, currency)}</td>
                                </tr>
                                <tr>
                                  <th>Target</th>
                                  <td>{fmtMoney(kpiVal?.target, currency)}</td>
                                </tr>
                                <tr>
                                  <th>Budget</th>
                                  <td>{fmtMoney(kpiVal?.budget, currency)}</td>
                                </tr>
                                <tr>
                                  <th>Forecast</th>
                                  <td>{fmtMoney(kpiVal?.forecast, currency)}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="col-12">
                <div style={{ background: "#fdecea", color: "#b03a2e", border: "0.5px solid #f5c6c0", borderRadius: 4, padding: "10px 14px", fontSize: 13 }}>
                  {error}
                </div>
              </div>
            )}

            <div className="col-12">
              <div className="d-flex flex-column flex-md-row gap-2 align-items-stretch">
                {/* ── DATA TABLE ── */}
                {viewFilters.datatable && (
                  <div className="datatable" style={{ flex: viewFilters.actualvtarget ? 5 : 1, minWidth: 0 }}>
                    <DataTable rows={periodRows} currency={currency} />
                  </div>
                )}

                {/* ── ACTUAL V/S TARGET ── */}
                {viewFilters.actualvtarget && (
                  <div className="actualvtarget" style={{ flex: viewFilters.datatable ? 7 : 1, minWidth: 0 }}>
                    <ActualVsTarget rows={periodRows} currency={currency} />
                  </div>
                )}
              </div>
            </div>

            {/* ── DATA DRILL ── */}
            {viewFilters.datadrill && (
              <div className="col-lg-12 datadrill">
                <DataDrillPanel series={series} />
              </div>
            )}

            {/* ── BOTTOM PANELS ── */}
            {/* ── MY INITIATIVE ── */}
            {viewFilters.myinitiative && (
              <div className="col-lg-4 col-md-6 myinitiative">
                <InitiativePanel initiatives={initiatives} />
              </div>
            )}

                {/* ── RISKS ── */}
                {viewFilters.risks && (
                  <div className="col-lg-4 col-md-6 risks">
                    <RisksPanel risks={risks} />
                  </div>
                )}

                {/* ── COMMENTS ── */}
                {viewFilters.comments && (
                  <div className="col-lg-4 col-md-6 comments-show">
                    <CommentsPanel comments={comments} onAdd={handleAddComment} />
                  </div>
                )}

                {/* ── FILES ── */}
                {viewFilters.files && (
                  <div className="col-lg-4 col-md-6 files">
                    <FilesPanel files={files} onEditFile={setEditingFile} />
                  </div>
                )}

          </div>
        </div>
      </main>

      {/* MODALS */}
      <DeleteModal />
      <KpiDescriptionModal isViewOnly={isViewOnly} kpi={kpi} onSaveSuccess={reload} />
      <FilesViewModal files={files} />
      <FileUploadModal 
        file={editingFile} 
        onCancel={() => setEditingFile(null)}
        onSave={(updatedFile) => {
          setFiles(prev => {
            if (updatedFile.id) {
              return prev.map(f => {
                if (f.id === updatedFile.id) {
                  return {
                    ...f,
                    name: updatedFile.name,
                    file: updatedFile.newFile ? updatedFile.newFile.name : f.file,
                    size: updatedFile.newFile ? `${(updatedFile.newFile.size / 1024).toFixed(2)} KB` : f.size,
                    uniqueFileReference: updatedFile.newFile ? updatedFile.newFile.name : f.uniqueFileReference
                  };
                }
                return f;
              });
            } else {
              return [{
                id: Date.now(),
                name: updatedFile.name || (updatedFile.newFile ? updatedFile.newFile.name : "New File"),
                file: updatedFile.newFile ? updatedFile.newFile.name : "",
                size: updatedFile.newFile ? `${(updatedFile.newFile.size / 1024).toFixed(2)} KB` : "",
                uniqueFileReference: updatedFile.newFile ? updatedFile.newFile.name : "",
                createdTime: new Date().toISOString()
              }, ...prev];
            }
          });
          setEditingFile(null);
        }}
      />
      <ViewDataDrillModal series={series} />
      <ViewDataTableModal rows={periodRows} currency={currency} />
      <ViewActualVsTargetModal rows={periodRows} currency={currency} />

      <footer style={{ textAlign: "center", fontSize: 12, color: "#aaa", padding: "16px 0" }}>
        Copyright © 2026 <strong style={{ fontWeight: 600, color: "#555" }}>StratRoom</strong>
      </footer>
    </div>
  );
}
