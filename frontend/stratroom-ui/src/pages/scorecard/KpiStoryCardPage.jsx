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

// ── palette ──────────────────────────────────────────────────────────────────
const PURPLE = "#9b59b6";
const PURPLE_LIGHT = "#d8b4f0";
const PURPLE_DARK = "#6c3483";

const MONTH_PALETTE = [
  "#b39ddb", "#e91e8c", "#80cbc4", "#26a69a", "#ff8c42", "#e53935",
  "#00897b", "#f06292", "#fdd835", "#f4511e", "#7e57c2", "#29b6f6",
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
    setState({
      loading: false,
      error: storyR.status === "rejected" ? "Failed to load KPI details from server." : null,
      kpi: story.kpi || null,
      series: Array.isArray(story.series) ? story.series : [],
      initiatives: val(initR, []),
      risks: val(riskR, []),
      comments: val(commentR, []),
      files: val(fileR, []),
    });
  }, [kpiId, dateRange]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load, reloadComments: loadComments };
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
function ThreeDot() {
  return <button style={S.dotBtn} aria-label="more options">⋮</button>;
}

function Avatar({ initials, bg, size = 34 }) {
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

function Panel({ children, style }) {
  return <div style={{ ...S.panel, ...style }}>{children}</div>;
}

function PanelHeader({ title, extra }) {
  return (
    <div style={S.panelHeader}>
      <span style={S.panelTitle}>{title}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {extra}
        <ThreeDot />
      </div>
    </div>
  );
}

function EmptyRow({ children = "No data available", pad = "16px 14px" }) {
  return <div style={{ padding: pad, fontSize: 12, color: "#aaa", textAlign: "center" }}>{children}</div>;
}

// ── styles ────────────────────────────────────────────────────────────────────
const S = {
  page: { fontFamily: "system-ui,sans-serif", background: "#f3e9fa", minHeight: "100vh", paddingBottom: 40 },
  panel: { background: "#fff", border: "0.5px solid #dde0e8", borderRadius: 10, overflow: "hidden" },
  panelHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "10px 14px", borderBottom: "0.5px solid #eee"
  },
  panelTitle: { fontSize: 14, fontWeight: 500, color: "#222" },
  dotBtn: {
    background: "none", border: "none", cursor: "pointer",
    fontSize: 18, color: "#aaa", padding: "2px 4px", borderRadius: 4, lineHeight: 1
  },
  th: (bg = PURPLE_LIGHT, color = PURPLE_DARK) => ({
    padding: "6px 10px", fontSize: 11, fontWeight: 500,
    background: bg, color, border: "0.5px solid #ddd", textAlign: "center", whiteSpace: "nowrap",
  }),
  td: { padding: "7px 10px", border: "0.5px solid #eee", fontSize: 12, textAlign: "center", color: "#333" },
  tdNeg: { padding: "7px 10px", border: "0.5px solid #eee", fontSize: 12, textAlign: "center", color: "#c0392b" },
  monthTh: (color) => ({
    background: color, color: "#fff", fontWeight: 500, fontSize: 12,
    textAlign: "center", padding: "5px 0", border: "0.5px solid rgba(255,255,255,.25)",
    whiteSpace: "nowrap",
  }),
};

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
    <Panel>
      <PanelHeader title="My Initiative" />
      {items.length === 0 && <EmptyRow>No initiatives linked</EmptyRow>}
      {items.map((item, i) => {
        const color = progressColor(item.pct);
        return (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px 4px" }}>
              <span style={{ fontSize: 13, color: "#333", maxWidth: 110, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</span>
              <div style={{ flex: 1, height: 7, background: "#eee", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${item.pct}%`, background: color, borderRadius: 4 }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color, minWidth: 38, textAlign: "right" }}>{item.pct}%</span>
              <ThreeDot />
            </div>
            {item.date && <div style={{ fontSize: 10, color: "#aaa", padding: "0 14px 10px" }}>{item.date}</div>}
          </div>
        );
      })}
    </Panel>
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
    <Panel>
      <PanelHeader title="Risks" />
      {items.length === 0 && <EmptyRow>No risks linked</EmptyRow>}
      {items.map((r, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 14px",
          borderBottom: i < items.length - 1 ? "0.5px solid #eee" : "none",
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#222" }}>{r.name}</div>
            {r.status && <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{r.status}</div>}
            {r.date && <div style={{ fontSize: 11, color: "#aaa" }}>{r.date}</div>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%", background: "#e8e8f0",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 500, color: "#555",
            }}>{r.score !== "" ? r.score : "-"}</div>
            <ThreeDot />
          </div>
        </div>
      ))}
    </Panel>
  );
}

// ── COMMENTS ──────────────────────────────────────────────────────────────────
function CommentItem({ c }) {
  const v = c.commentsValue || {};
  const author = v.createdByName || (c.createdBy ? `Employee #${c.createdBy}` : "Unknown");
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <Avatar initials={initialsFrom(author)} bg="#7b5ea7" size={34} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#222" }}>{author}</span>
          <span style={{ fontSize: 11, color: "#aaa" }}>{fmtTime(c.createdTime)}</span>
        </div>
        <p style={{ fontSize: 12, color: "#333", margin: "4px 0 6px", lineHeight: 1.55 }}>{v.desc}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: "#aaa" }}>Like · {c.likeCount || 0} · Reply</span>
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
    <Panel style={{ display: "flex", flexDirection: "column" }}>
      <PanelHeader title="Comments" />
      <div ref={listRef} style={{ flex: 1, overflowY: "auto", padding: "12px 14px", maxHeight: 300 }}>
        {(!comments || comments.length === 0) && <EmptyRow>No comments yet</EmptyRow>}
        {(comments || []).map((c, i) => (
          <div key={c.id ?? i}>
            {i > 0 && <hr style={{ border: "none", borderTop: "0.5px solid #eee", margin: "10px 0" }} />}
            <CommentItem c={c} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderTop: "0.5px solid #eee" }}>
        <input
          style={{
            flex: 1, border: "0.5px solid #ddd", borderRadius: 20,
            padding: "7px 14px", fontSize: 13, outline: "none", color: "#333",
          }}
          placeholder="Type a comment..."
          value={text}
          disabled={busy}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <button onClick={submit} disabled={busy} style={{
          width: 34, height: 34, borderRadius: "50%",
          background: PURPLE, border: "none", cursor: busy ? "default" : "pointer",
          color: "#fff", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          opacity: busy ? 0.6 : 1,
        }}>→</button>
      </div>
    </Panel>
  );
}

// ── DATA TABLE ──────────────────────────────────────────────────────────────
function DataTable({ rows, currency }) {
  const [page, setPage] = useState(1);
  const perPage = 7;
  const pageCount = Math.max(1, Math.ceil(rows.length / perPage));
  const safePage = Math.min(page, pageCount);
  const slice = rows.slice((safePage - 1) * perPage, safePage * perPage);

  return (
    <div style={{ borderRight: "0.5px solid #eee" }}>
      <div style={{ ...S.panelHeader, background: "#fafafa" }}>
        <span style={S.panelTitle}>Data Table</span>
        <ThreeDot />
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
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
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdfbff" }}>
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, padding: "10px 14px" }}>
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
      width: 28, height: 28, borderRadius: "50%", border: "0.5px solid #ddd", cursor: "pointer",
      background: active ? PURPLE : "none", color: active ? "#fff" : "#999",
      fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center",
    }}>{label}</button>
  );
}

// ── ACTUAL V/S TARGET CHART ─────────────────────────────────────────────────
function ActualVsTarget({ rows, currency }) {
  const canvasRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width || 480;
        drawChart(width, 200);
      }
    });
    resizeObserver.observe(canvas.parentElement || canvas);

    function drawChart(displayWidth, displayHeight) {
      const ctx = canvas.getContext("2d");
      const dpi = window.devicePixelRatio || 1;
      canvas.width = displayWidth * dpi;
      canvas.height = displayHeight * dpi;
      ctx.setTransform(dpi, 0, 0, dpi, 0, 0);

      const W = displayWidth, H = displayHeight;
      const pad = { l: 48, r: 16, t: 16, b: 36 };
      const cW = W - pad.l - pad.r, cH = H - pad.t - pad.b;
      ctx.clearRect(0, 0, W, H);

      const actuals = rows.map((r) => r.actual);
      const targets = rows.map((r) => r.target);
      const all = actuals.concat(targets).filter((n) => Number.isFinite(n));
      const yMax = all.length ? Math.max(...all) * 1.1 || 1 : 1;

      // Y axis labels + gridlines
      const ySteps = 5;
      ctx.textAlign = "right";
      for (let i = 0; i <= ySteps; i++) {
        const y = pad.t + (cH / ySteps) * i;
        ctx.strokeStyle = "#f0f0f0";
        ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(W - pad.r, y); ctx.stroke();
        ctx.fillStyle = "#aaa"; ctx.font = "10px sans-serif";
        const labelValue = yMax - (yMax / ySteps) * i;
        let labelText;
        if (yMax >= 1000000) {
          labelText = (labelValue / 1000000).toFixed(1) + "M";
        } else if (yMax >= 1000) {
          labelText = (labelValue / 1000).toFixed(1) + "K";
        } else if (yMax < 10) {
          labelText = Number.isInteger(labelValue) ? labelValue.toString() : labelValue.toFixed(2);
        } else {
          labelText = labelValue.toFixed(0);
        }
        ctx.fillText(labelText, pad.l - 6, y + 3);
      }

      if (rows.length === 0) {
        ctx.fillStyle = "#bbb"; ctx.font = "12px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("No data for this period", pad.l + cW / 2, pad.t + cH / 2);
        return;
      }

      const xStep = rows.length > 1 ? cW / (rows.length - 1) : 0;
      const xAt = (i) => pad.l + (rows.length > 1 ? i * xStep : cW / 2);
      const yAt = (v) => pad.t + cH * (1 - (Number.isFinite(v) ? v : 0) / yMax);

      // X labels (period)
      ctx.fillStyle = "#aaa"; ctx.font = "9px sans-serif"; ctx.textAlign = "center";
      rows.forEach((r, i) => {
        const label = String(r.period).replace(/\s*\d{4}$/, "");
        ctx.fillText(label, xAt(i), H - 22);
      });
      ctx.fillStyle = "#666"; ctx.font = "bold 11px sans-serif";
      ctx.fillText("Period", pad.l + cW / 2, H - 4);

      ctx.save();
      ctx.translate(14, pad.t + cH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = "#666"; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
      ctx.fillText(currency ? `Value (${currency})` : "Value", 0, 0);
      ctx.restore();

      const drawSeries = (vals, color) => {
        ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2;
        ctx.beginPath();
        vals.forEach((v, i) => { const x = xAt(i), y = yAt(v); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
        ctx.stroke();
        vals.forEach((v, i) => { ctx.beginPath(); ctx.arc(xAt(i), yAt(v), 3, 0, Math.PI * 2); ctx.fill(); });
      };
      drawSeries(targets, "#e67e22");
      drawSeries(actuals, "#3498db");
    }

    return () => resizeObserver.disconnect();
  }, [rows, currency]);

  const handleMouseMove = (e) => {
    if (!rows || rows.length === 0) {
      setTooltip(null);
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const pad = { l: 48, r: 16 };
    const W = rect.width;
    const cW = W - pad.l - pad.r;

    let index = 0;
    if (rows.length > 1) {
      const xStep = cW / (rows.length - 1);
      index = Math.round((offsetX - pad.l) / xStep);
      index = Math.max(0, Math.min(rows.length - 1, index));
    }

    const xAt = pad.l + (rows.length > 1 ? index * (cW / (rows.length - 1)) : cW / 2);
    
    if (Math.abs(offsetX - xAt) < 30) {
      setTooltip({
        x: offsetX,
        y: offsetY,
        data: rows[index],
        alignLeft: offsetX > W / 2
      });
    } else {
      setTooltip(null);
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ ...S.panelHeader, background: "#fafafa" }}>
        <span style={S.panelTitle}>Actual v/s Target</span>
        <ThreeDot />
      </div>
      <div style={{ padding: "10px 16px 4px", position: "relative" }}>
        <canvas 
          ref={canvasRef} 
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ width: "100%", height: "200px", display: "block", cursor: tooltip ? "crosshair" : "default" }} 
        />
        {tooltip && (
          <div style={{
            position: 'absolute',
            left: tooltip.alignLeft ? 'auto' : tooltip.x + 16 + 10,
            right: tooltip.alignLeft ? (canvasRef.current?.getBoundingClientRect().width - tooltip.x) - 16 + 10 : 'auto',
            top: tooltip.y + 10,
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 10,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', borderBottom: '1px solid #555', paddingBottom: '4px' }}>
              {tooltip.data.period}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3498db', display: 'inline-block' }} />
              Actual: {fmtMoney(tooltip.data.actual, currency)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#e67e22', display: 'inline-block' }} />
              Target: {fmtMoney(tooltip.data.target, currency)}
            </div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", padding: "6px 0 10px" }}>
        {[["#3498db", "Actual"], ["#e67e22", "Target"]].map(([color, label]) => (
          <span key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, display: "inline-block" }} />
            <span style={{ fontSize: 11, color: "#888" }}>{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── DATA DRILL ────────────────────────────────────────────────────────────────
// Pivots the raw series by measure (rows) × period (columns).
function DataDrillPanel({ series }) {
  const periods = [];
  const seenPeriods = new Set();
  const byMeasure = new Map();
  (series || []).forEach((row) => {
    const period = row.period || row.financialMonth || "—";
    if (!seenPeriods.has(period)) { seenPeriods.add(period); periods.push({ period, order: row.financialMonth ?? row.realDateFrom ?? period }); }
    const measure = row.measureName || row.nodeKey || "Measure";
    const m = byMeasure.get(measure) || {};
    m[period] = { actual: toNum(row.actual), target: toNum(row.target) };
    byMeasure.set(measure, m);
  });
  periods.sort((a, b) => (parseDate(a.order)?.getTime() ?? 0) - (parseDate(b.order)?.getTime() ?? 0));
  const measures = Array.from(byMeasure.entries());
  const colorFor = (i) => MONTH_PALETTE[i % MONTH_PALETTE.length];

  return (
    <Panel>
      <PanelHeader title="Data Drill" />
      {measures.length === 0 ? (
        <EmptyRow>No drill-down data for this period</EmptyRow>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ ...S.th("#f5f5f5", "#888"), whiteSpace: "nowrap", paddingLeft: 10 }}>NAME / PERIOD</th>
                {periods.map((p, i) => (
                  <th key={p.period} colSpan={3} style={S.monthTh(colorFor(i))}>{p.period}</th>
                ))}
              </tr>
              <tr>
                <th style={S.th()}></th>
                {periods.flatMap((p) =>
                  ["ACTUAL", "TARGET", "GAP"].map((c) => (
                    <th key={`${p.period}-${c}`} style={S.th()}>{c}</th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {measures.map(([measure, data], mi) => (
                <tr key={mi}>
                  <td style={{ ...S.td, whiteSpace: "nowrap", textAlign: "left" }}>{measure}</td>
                  {periods.flatMap((p) => {
                    const cell = data[p.period] || {};
                    const a = cell.actual, t = cell.target;
                    const gap = a != null && t != null ? a - t : null;
                    return [
                      <td key={`${p.period}-a`} style={S.td}>{a == null ? "-" : fmtNum(a)}</td>,
                      <td key={`${p.period}-t`} style={S.td}>{t == null ? "-" : fmtNum(t)}</td>,
                      <td key={`${p.period}-g`} style={gap != null && gap < 0 ? S.tdNeg : S.td}>{gap == null ? "-" : fmtNum(gap)}</td>,
                    ];
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}

// ── FILES ─────────────────────────────────────────────────────────────────────
function FilesPanel({ files }) {
  const items = (files || []).map((f) => ({
    name: f.name || "Attachment",
    file: [f.file || f.uniqueFileReference, f.size].filter(Boolean).join(" "),
    date: fmtDate(f.createdTime),
  }));
  return (
    <div style={{ maxWidth: 420 }}>
      <Panel>
        <PanelHeader title="Files" />
        {items.length === 0 && <EmptyRow>No files attached</EmptyRow>}
        {items.map((f, i) => (
          <div key={i} style={{
            padding: "10px 14px",
            borderBottom: i < items.length - 1 ? "0.5px solid #eee" : "none",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#222" }}>{f.name}</div>
              {f.file && <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{f.file}</div>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {f.date && <span style={{ fontSize: 11, color: "#aaa" }}>{f.date}</span>}
              <ThreeDot />
            </div>
          </div>
        ))}
      </Panel>
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
  const [showDescModal, setShowDescModal] = useState(false);
  // Period is controlled by the global header picker (stored in localStorage);
  // the global picker reloads on Apply, so reading it on mount is sufficient.
  const [dateRange] = useState(() => {
    const y = new Date().getFullYear();
    return localStorage.getItem("customperiod") || `01/01/${y}-12/31/${y}`;
  });

  const { loading, error, kpi, series, initiatives, risks, comments, files, reloadComments } = useKpiStoryCard(kpiId, dateRange);

  const kpiName = kpi?.kpiName || "KPI";
  const kpiVal = kpi?.kpiValue || {};
  const { rows: periodRows, currency } = aggregateByPeriod(series);

  async function handleAddComment(desc) {
    await addKpiComment({ kpiId: Number(kpiId), desc, createdBy: loggedInEmpId() });
    await reloadComments();
  }

  return (
    <div style={S.page}>
      <SidebarIcons />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 20px 0" }}>

        {/* Page Header */}
        <div style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "center" }}>
          <button onClick={() => navigate(-1)} style={{
            width: 36, height: 36, borderRadius: 8, border: "0.5px solid #ddd",
            background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
          }} title="Back to Scorecard">
            <span style={{ fontSize: 18, color: "#555" }}>←</span>
          </button>

          <Panel style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px" }}>
              <Avatar initials={initialsFrom(kpiVal.ownerName || kpiName)} bg="#7b5ea7" size={30} />
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#222" }}>
                {loading ? "Loading KPI…" : kpiName}
              </span>
              <div style={{ display: "flex", gap: 12, color: "#555", fontSize: 16, alignItems: "center" }}>
                <span style={{ cursor: "pointer" }} onClick={() => setShowDescModal(true)} title="View Details">👁</span>
                <ThreeDot />
              </div>
            </div>
          </Panel>
        </div>

        {error && (
          <div style={{ background: "#fdecea", color: "#b03a2e", border: "0.5px solid #f5c6c0", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13 }}>
            {error}
          </div>
        )}

        {/* ROW 1 — Data table + Actual v/s Target chart */}
        <Panel style={{ marginBottom: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <DataTable rows={periodRows} currency={currency} />
            <ActualVsTarget rows={periodRows} currency={currency} />
          </div>
        </Panel>

        {/* ROW 2 — My Initiative · Risks · Comments */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
          <InitiativePanel initiatives={initiatives} />
          <RisksPanel risks={risks} />
          <CommentsPanel comments={comments} onAdd={handleAddComment} />
        </div>

        {/* ROW 3 — Data Drill */}
        <div style={{ marginBottom: 14 }}>
          <DataDrillPanel series={series} />
        </div>

        {/* ROW 4 — Files */}
        <div style={{ marginBottom: 30 }}>
          <FilesPanel files={files} />
        </div>
      </div>

      {/* View/Description Modal — real KPI attributes */}
      {showDescModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center" style={{ background: "#7b5ea7", color: "#fff", padding: "12px 20px" }}>
                <h6 className="modal-title mb-0" style={{ fontSize: 14, fontWeight: 600 }}>KPI Details</h6>
                <button type="button" className="btn-close btn-close-white border-0 bg-transparent" onClick={() => setShowDescModal(false)} style={{ color: "#fff", fontSize: 18, cursor: "pointer" }}>×</button>
              </div>
              <div className="modal-body" style={{ padding: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
                  <DetailTable rows={[["Department", kpiVal.department], ["KPI ID", kpi?.kpiId], ["Threshold", kpiVal.thresholdType || kpiVal.threshold]]} />
                  <DetailTable rows={[["Frequency", kpiVal.kpi_measurement], ["Status", kpiVal.statusLight], ["Trend", kpiVal.trend]]} />
                  <DetailTable rows={[["Actual", kpiVal.actual], ["Target", kpiVal.target], ["Risk", kpiVal.riskStatusLight]]} />
                </div>
              </div>
              <div className="modal-footer" style={{ padding: "12px 20px", borderTop: "1px solid #eee", display: "flex", justifyContent: "flex-end" }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setShowDescModal(false)} style={{ padding: "6px 14px", fontSize: 12, borderRadius: 6, border: "1px solid #ccc", background: "#fff", cursor: "pointer" }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer style={{ textAlign: "center", fontSize: 12, color: "#aaa", padding: "16px 0" }}>
        Copyright © 2026 <strong style={{ fontWeight: 600, color: "#555" }}>StratRoom</strong>
      </footer>
    </div>
  );
}

function DetailTable({ rows }) {
  return (
    <table className="table table-bordered table-sm mb-0" style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
      <tbody>
        {rows.map(([label, value], i) => (
          <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
            <th style={{ textAlign: "left", padding: "8px", background: "#f9f9f9", fontWeight: 500 }}>{label}</th>
            <td style={{ padding: "8px" }}>{value == null || value === "" ? "-" : String(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
