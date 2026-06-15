import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ── palette ──────────────────────────────────────────────────────────────────
const PURPLE = "#9b59b6";
const PURPLE_LIGHT = "#d8b4f0";
const PURPLE_DARK = "#6c3483";
const PURPLE_BG = "#f3e9fa";

const MONTH_COLORS = {
  "JAN 2025": "#b39ddb",
  "FEB 2025": "#e91e8c",
  "MAR 2025": "#80cbc4",
  "APR 2025": "#26a69a",
  "MAY 2025": "#ff8c42",
  "JUN 2025": "#e53935",
  "JUL 2025": "#00897b",
  "AUG 2025": "#f06292",
  "SEP 2025": "#fdd835",
  "OCT 2025": "#f4511e",
  "NOV 2025": "#fdd835",
  "DEC 2025": "#29b6f6",
};

// ── shared tiny components ────────────────────────────────────────────────────
function ThreeDot() {
  return (
    <button style={S.dotBtn} aria-label="more options">⋮</button>
  );
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
  return (
    <div style={{ ...S.panel, ...style }}>{children}</div>
  );
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
  // table
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
const INITIATIVES = [
  { pct: 60, color: "#e5a800", date: "Oct 09, 2019 - Oct 11, 2019" },
  { pct: 40, color: "#e74c3c", date: "Oct 09, 2019 - Oct 11, 2019" },
  { pct: 80, color: "#27ae60", date: "Oct 09, 2019 - Oct 11, 2019" },
];

function InitiativePanel() {
  return (
    <Panel>
      <PanelHeader title="My Initiative" />
      {INITIATIVES.map((item, i) => (
        <div key={i}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px 4px" }}>
            <span style={{ fontSize: 13, minWidth: 32, color: "#333" }}>Title</span>
            <div style={{ flex: 1, height: 7, background: "#eee", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${item.pct}%`, background: item.color, borderRadius: 4 }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: item.color, minWidth: 38, textAlign: "right" }}>{item.pct}%</span>
            <ThreeDot />
          </div>
          <div style={{ fontSize: 10, color: "#aaa", padding: "0 14px 10px" }}>{item.date}</div>
        </div>
      ))}
    </Panel>
  );
}

// ── RISKS ─────────────────────────────────────────────────────────────────────
const RISKS = [
  { name: "Risk 1", status: "Tolerable", date: "30 Sep 2019", score: 4 },
  { name: "Risk 2", status: "Tolerable", date: "30 Sep 2019", score: 4 },
  { name: "Risk 3", status: "Tolerable", date: "30 Sep 2019", score: 4 },
];

function RisksPanel() {
  return (
    <Panel>
      <PanelHeader title="Risks" />
      {RISKS.map((r, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 14px",
          borderBottom: i < RISKS.length - 1 ? "0.5px solid #eee" : "none",
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#222" }}>{r.name}</div>
            <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{r.status}</div>
            <div style={{ fontSize: 11, color: "#aaa" }}>{r.date}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%", background: "#e8e8f0",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 500, color: "#555",
            }}>{r.score}</div>
            <ThreeDot />
          </div>
        </div>
      ))}
    </Panel>
  );
}

// ── COMMENTS ──────────────────────────────────────────────────────────────────
const INIT_COMMENTS = [
  {
    id: 1, author: "karthik Ramani, CEO", initials: "KR", bg: "#7b5ea7", time: "11:44 PM",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", likes: 0
  },
  {
    id: 2, author: "Saj Abraham", initials: "SA", bg: "#c0a0d0", time: "11:45 PM",
    text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.", likes: 0
  },
  {
    id: 3, author: "Saj Abraham", initials: "SA", bg: "#c0a0d0", time: "11:45 PM",
    text: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.", likes: 0
  },
  {
    id: 4, author: "karthik Ramani, CEO", initials: "KR", bg: "#7b5ea7", time: "11:44 PM",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.", likes: 0
  },
];

function CommentItem({ c, onLike }) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <Avatar initials={c.initials} bg={c.bg} size={34} />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#222" }}>{c.author}</span>
          <span style={{ fontSize: 11, color: "#aaa" }}>{c.time}</span>
        </div>
        <p style={{ fontSize: 12, color: "#333", margin: "4px 0 6px", lineHeight: 1.55 }}>{c.text}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Like", "·", c.likes, "·", "Reply", "·", "Edit", "·", "Delete"].map((a, i) => (
            <button key={i} onClick={() => a === "Like" && onLike(c.id)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#aaa", padding: 0 }}>
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CommentsPanel() {
  const [comments, setComments] = useState(INIT_COMMENTS);
  const [text, setText] = useState("");
  const listRef = useRef(null);

  function addComment() {
    if (!text.trim()) return;
    const now = new Date();
    const h = now.getHours(), m = now.getMinutes();
    const time = `${h % 12 || 12}:${m < 10 ? "0" : ""}${m} ${h < 12 ? "AM" : "PM"}`;
    setComments(prev => [...prev, {
      id: Date.now(), author: "You", initials: "U", bg: "#2980b9", time, text: text.trim(), likes: 0,
    }]);
    setText("");
    setTimeout(() => listRef.current?.scrollTo({ top: 9999, behavior: "smooth" }), 50);
  }

  function handleLike(id) {
    setComments(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
  }

  return (
    <Panel style={{ display: "flex", flexDirection: "column" }}>
      <PanelHeader title="Comments" />
      <div ref={listRef} style={{ flex: 1, overflowY: "auto", padding: "12px 14px", maxHeight: 300 }}>
        {comments.map((c, i) => (
          <div key={c.id}>
            {i > 0 && <hr style={{ border: "none", borderTop: "0.5px solid #eee", margin: "10px 0" }} />}
            <CommentItem c={c} onLike={handleLike} />
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
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addComment()}
        />
        <button onClick={addComment} style={{
          width: 34, height: 34, borderRadius: "50%",
          background: PURPLE, border: "none", cursor: "pointer",
          color: "#fff", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>→</button>
      </div>
    </Panel>
  );
}

// ── KBI DATA TABLE ────────────────────────────────────────────────────────────
const KBI_ROWS = [
  "JAN 2025", "FEB 2025", "MAR 2025", "APR 2025", "MAY 2025", "JUN 2025", "JUL 2025",
];
const KBI_ROWS_P2 = [
  "AUG 2025", "SEP 2025", "OCT 2025", "NOV 2025", "DEC 2025",
];

function DataTable() {
  const [page, setPage] = useState(1);
  const rows = page === 1 ? KBI_ROWS : KBI_ROWS_P2;

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
              {["PERIOD", "ACTUAL", "TARGET", "GAP", "YTD"].map(h => (
                <th key={h} style={S.th()}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fdfbff" }}>
                <td style={S.td}>{r}</td>
                <td style={S.td}>$0.00081 M</td>
                <td style={S.td}>$0.0016 M</td>
                <td style={S.tdNeg}>$-0.00083 M</td>
                <td style={S.td}>$0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* pagination */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6, padding: "10px 14px" }}>
        <PgBtn label="‹" active={false} onClick={() => setPage(p => Math.max(1, p - 1))} />
        {[1, 2].map(p => (
          <PgBtn key={p} label={p} active={page === p} onClick={() => setPage(p)} />
        ))}
        <PgBtn label="›" active={false} onClick={() => setPage(p => Math.min(2, p + 1))} />
      </div>
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

// ── ACTUAL V/S TARGET CHART (bubble) ─────────────────────────────────────────
function ActualVsTarget() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Use parent element size for dynamic layout scaling
        const width = entry.contentRect.width || 480;
        const height = 200; // Keep fixed display height
        drawChart(width, height);
      }
    });

    resizeObserver.observe(canvas.parentElement || canvas);

    function drawChart(displayWidth, displayHeight) {
      const ctx = canvas.getContext("2d");
      const dpi = window.devicePixelRatio || 1;

      // Adjust canvas resolution according to screen DPI
      canvas.width = displayWidth * dpi;
      canvas.height = displayHeight * dpi;
      ctx.scale(dpi, dpi);

      const W = displayWidth;
      const H = displayHeight;
      const pad = { l: 48, r: 16, t: 16, b: 36 };
      const cW = W - pad.l - pad.r, cH = H - pad.t - pad.b;

      ctx.clearRect(0, 0, W, H);

      // Y-axis labels (grid lines removed)
      const yMax = 70, ySteps = 7;
      for (let i = 0; i <= ySteps; i++) {
        const y = pad.t + (cH / ySteps) * i;
        ctx.fillStyle = "#aaa"; ctx.font = "10px sans-serif"; ctx.textAlign = "right";
        ctx.fillText(yMax - (yMax / ySteps) * i, pad.l - 6, y + 3);
      }

      // X-axis labels
      const xLabels = [20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 23];
      const xStep = cW / (xLabels.length - 1);
      ctx.fillStyle = "#aaa"; ctx.font = "10px sans-serif"; ctx.textAlign = "center";
      xLabels.forEach((l, i) => ctx.fillText(l, pad.l + i * xStep, H - 22));

      // "Period" label at bottom
      ctx.fillStyle = "#666"; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("Period", pad.l + cW / 2, H - 4);

      // Y-axis vertical label: "$ (thousand)"
      ctx.save();
      ctx.translate(14, pad.t + cH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = "#666"; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("$ (thousand)", 0, 0);
      ctx.restore();

      // Bubble1 - blue, centered exactly on the first tick (x = 20) on the y-axis line
      const bx = pad.l;
      const by = pad.t + cH * (1 - 55 / yMax);
      ctx.beginPath();
      ctx.arc(bx, by, 18, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(52, 152, 219, 0.85)";
      ctx.fill();
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div>
      <div style={{ ...S.panelHeader, background: "#fafafa" }}>
        <span style={S.panelTitle}>Actual v/s Target</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* toolbar icons */}
          {["＋", "－", "🔍", "⤢", "↺", "≡"].map((ic, i) => (
            <span key={i} style={{ fontSize: 13, color: "#aaa", cursor: "pointer" }}>{ic}</span>
          ))}
          <ThreeDot />
        </div>
      </div>
      <div style={{ padding: "10px 16px 4px" }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "200px", display: "block" }} />
      </div>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", padding: "6px 0 10px" }}>
        {[["#3498db", "Bubble1"], ["#27ae60", "Bubble2"], ["#e67e22", "Bubble3"]].map(([color, label]) => (
          <span key={label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: color, display: "inline-block" }} />
            <span style={{ fontSize: 11, color: "#888" }}>{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ── KBI SECTION ───────────────────────────────────────────────────────────────
function KBISection({ onEdit, onAttach, onView }) {
  return (
    <Panel style={{ marginBottom: 14 }}>
      {/* header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: "0.5px solid #eee" }}>
        <button style={{
          width: 26, height: 26, borderRadius: "50%", border: "0.5px solid #ddd",
          background: "none", cursor: "pointer", fontSize: 14, color: "#999",
        }}>−</button>
        <Avatar initials="KR" bg="#7b5ea7" size={30} />
        <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#222" }}>
          Key business process with completed quality review
        </span>
        <div style={{ display: "flex", gap: 12, color: "#bbb", fontSize: 15, alignItems: "center" }}>
          <span style={{ cursor: "pointer" }} onClick={onEdit} title="Edit KPI">✏️</span>
          <span style={{ cursor: "pointer" }} onClick={onAttach} title="Add Attachment">🔗</span>
          <span style={{ cursor: "pointer" }} onClick={onView} title="View Details">👁</span>
          <ThreeDot />
        </div>
      </div>
      {/* two-column body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <DataTable />
        <ActualVsTarget />
      </div>
    </Panel>
  );
}

// ── DATA DRILL ────────────────────────────────────────────────────────────────
// Full 12-month span: JAN → DEC 2025, each has ACTUAL/TARGET/GAP
const ALL_MONTHS = [
  "JAN 2025", "FEB 2025", "MAR 2025", "APR 2025",
  "MAY 2025", "JUN 2025", "JUL 2025", "AUG 2025",
  "SEP 2025", "OCT 2025", "NOV 2025", "DEC 2025",
];

function DataDrillPanel() {
  const scrollRef = useRef(null);

  return (
    <Panel>
      <PanelHeader title="Data Drill" />
      <div ref={scrollRef} style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            {/* row 1: sort + NAME/PERIOD + month spans */}
            <tr>
              <th style={{ ...S.th("#f5f5f5", "#888"), width: 34 }}>
                <span style={{ color: "#27ae60" }}>↑</span>
                <span style={{ color: "#e74c3c" }}>↓</span>
              </th>
              <th style={{ ...S.th("#f5f5f5", "#888"), whiteSpace: "nowrap", paddingLeft: 10 }}>NAME/PERIOD</th>
              {ALL_MONTHS.map(m => (
                <th key={m} colSpan={3} style={S.monthTh(MONTH_COLORS[m])}>{m}</th>
              ))}
            </tr>
            {/* row 2: sub-columns */}
            <tr>
              <th style={S.th()}></th>
              <th style={S.th()}></th>
              {ALL_MONTHS.flatMap(m =>
                ["ACTUAL", "TARGET", "GAP"].map(c => (
                  <th key={`${m}-${c}`} style={S.th()}>{c}</th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={S.td}>
                <button style={{
                  width: 20, height: 20, borderRadius: "50%", border: "0.5px solid #ddd",
                  background: "none", cursor: "pointer", fontSize: 13, color: "#999",
                }}>+</button>
              </td>
              <td style={{ ...S.td, whiteSpace: "nowrap", textAlign: "left" }}>Chairman Board of Directors</td>
              {ALL_MONTHS.flatMap(m => [
                <td key={`${m}-a`} style={S.td}>$ 0.00081 M</td>,
                <td key={`${m}-t`} style={S.td}>$ 0.0016 M</td>,
                <td key={`${m}-g`} style={S.tdNeg}>$ -0.00083 M</td>,
              ])}
            </tr>
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

// ── FILES ─────────────────────────────────────────────────────────────────────
const FILES = [
  { name: "Report 1", file: "report (47).pdf (2.79 MB)", date: "27 Mar 2025" },
  { name: "Report 2", file: "report (47).pdf (2.79 MB)", date: "27 Mar 2025" },
  { name: "Report 3", file: "report (47).pdf (2.79 MB)", date: "27 Mar 2025" },
];

function FilesPanel() {
  return (
    <div style={{ maxWidth: 420 }}>
      <Panel>
        <PanelHeader title="Files" />
        {FILES.map((f, i) => (
          <div key={i} style={{
            padding: "10px 14px",
            borderBottom: i < FILES.length - 1 ? "0.5px solid #eee" : "none",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#222" }}>{f.name}</div>
              <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{f.file}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 11, color: "#aaa" }}>{f.date}</span>
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
      {[
        { icon: "⌂", label: "Home" },
        { icon: "▦", label: "Grid" },
      ].map(({ icon, label }) => (
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [showDescModal, setShowDescModal] = useState(false);

  const navigate = useNavigate();

  return (
    <div style={S.page}>
      <SidebarIcons />

      {/* content wrapper */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 20px 0" }}>

        {/* Page Header */}
        <div style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "center" }}>
            <button onClick={() => navigate('/scorecard')} style={{
                width: 36, height: 36, borderRadius: 8, border: "0.5px solid #ddd",
                background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
            }} title="Back to Scorecard">
                <span style={{ fontSize: 18, color: "#555" }}>←</span> 
            </button>
            
            <Panel style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px" }}>
                    <Avatar initials="KR" bg="#7b5ea7" size={30} />
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: "#222" }}>
                        Key business process with completed quality review
                    </span>
                    <div style={{ display: "flex", gap: 12, color: "#555", fontSize: 16, alignItems: "center" }}>
                        <span style={{ cursor: "pointer" }} onClick={() => setShowEditModal(true)} title="Edit KPI">✏️</span>
                        <span style={{ cursor: "pointer" }} onClick={() => setShowAttachModal(true)} title="Add Attachment">🔗</span>
                        <span style={{ cursor: "pointer" }} onClick={() => setShowDescModal(true)} title="View Details">👁</span>
                        <ThreeDot />
                    </div>
                </div>
            </Panel>
        </div>

        {/* ROW 1 — KBI data table + Actual v/s Target chart */}
        <Panel style={{ marginBottom: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <DataTable />
                <ActualVsTarget />
            </div>
        </Panel>

        {/* ROW 2 — My Initiative · Risks · Comments */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 14 }}>
          <InitiativePanel />
          <RisksPanel />
          <CommentsPanel />
        </div>

        {/* ROW 3 — Data Drill */}
        <div style={{ marginBottom: 14 }}>
          <DataDrillPanel />
        </div>

        {/* ROW 4 — Files */}
        <div style={{ marginBottom: 30 }}>
          <FilesPanel />
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header d-flex justify-content-between align-items-center" style={{ background: '#7b5ea7', color: '#fff', padding: '12px 20px' }}>
                  <h6 className="modal-title mb-0" style={{ fontSize: 14, fontWeight: 600 }}>Edit KPI</h6>
                  <button type="button" className="btn-close btn-close-white border-0 bg-transparent" onClick={() => setShowEditModal(false)} style={{ color: '#fff', fontSize: 18, cursor: 'pointer' }}>×</button>
                </div>
                <div className="modal-body" style={{ padding: '20px' }}>
                  <div className="form-group mb-3">
                    <label className="form-label" style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>KPI Name</label>
                    <input type="text" className="form-control" defaultValue="Key business process with completed quality review" style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, outline: 'none' }} />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label" style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Description</label>
                    <textarea className="form-control" rows="3" style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, outline: 'none', resize: 'vertical' }}></textarea>
                  </div>
                </div>
                <div className="modal-footer" style={{ padding: '12px 20px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setShowEditModal(false)} style={{ padding: '6px 14px', fontSize: 12, borderRadius: 6, border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>Cancel</button>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowEditModal(false)} style={{ padding: '6px 14px', fontSize: 12, borderRadius: 6, border: 'none', background: '#7b5ea7', color: '#fff', cursor: 'pointer' }}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Attachment Modal */}
      {showAttachModal && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header d-flex justify-content-between align-items-center" style={{ background: '#7b5ea7', color: '#fff', padding: '12px 20px' }}>
                  <h6 className="modal-title mb-0" style={{ fontSize: 14, fontWeight: 600 }}>Upload Attachment</h6>
                  <button type="button" className="btn-close btn-close-white border-0 bg-transparent" onClick={() => setShowAttachModal(false)} style={{ color: '#fff', fontSize: 18, cursor: 'pointer' }}>×</button>
                </div>
                <div className="modal-body" style={{ padding: '20px' }}>
                  <div className="form-group mb-3">
                    <label className="form-label" style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>File Name</label>
                    <input type="text" className="form-control form-control-sm" placeholder="Enter file title" style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, outline: 'none' }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Choose File</label>
                    <input type="file" className="form-control form-control-sm" style={{ width: '100%', padding: '6px 10px', border: '1px solid #ddd', borderRadius: 6 }} />
                  </div>
                </div>
                <div className="modal-footer" style={{ padding: '12px 20px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setShowAttachModal(false)} style={{ padding: '6px 14px', fontSize: 12, borderRadius: 6, border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>Cancel</button>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowAttachModal(false)} style={{ padding: '6px 14px', fontSize: 12, borderRadius: 6, border: 'none', background: '#7b5ea7', color: '#fff', cursor: 'pointer' }}>Upload</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* View/Description Modal */}
      {showDescModal && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header d-flex justify-content-between align-items-center" style={{ background: '#7b5ea7', color: '#fff', padding: '12px 20px' }}>
                  <h6 className="modal-title mb-0" style={{ fontSize: 14, fontWeight: 600 }}>KPI Details</h6>
                  <button type="button" className="btn-close btn-close-white border-0 bg-transparent" onClick={() => setShowDescModal(false)} style={{ color: '#fff', fontSize: 18, cursor: 'pointer' }}>×</button>
                </div>
                <div className="modal-body" style={{ padding: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                    <div>
                      <table className="table table-bordered table-sm mb-0" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid #eee' }}><th style={{ textAlign: 'left', padding: '8px', background: '#f9f9f9', fontWeight: 500 }}>Department</th><td style={{ padding: '8px' }}>Operations</td></tr>
                          <tr style={{ borderBottom: '1px solid #eee' }}><th style={{ textAlign: 'left', padding: '8px', background: '#f9f9f9', fontWeight: 500 }}>KPI ID</th><td style={{ padding: '8px' }}>IP2.1</td></tr>
                          <tr style={{ borderBottom: '1px solid #eee' }}><th style={{ textAlign: 'left', padding: '8px', background: '#f9f9f9', fontWeight: 500 }}>Threshold</th><td style={{ padding: '8px' }}>3-Status</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <table className="table table-bordered table-sm mb-0" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid #eee' }}><th style={{ textAlign: 'left', padding: '8px', background: '#f9f9f9', fontWeight: 500 }}>Frequency</th><td style={{ padding: '8px' }}>Month</td></tr>
                          <tr style={{ borderBottom: '1px solid #eee' }}><th style={{ textAlign: 'left', padding: '8px', background: '#f9f9f9', fontWeight: 500 }}>Status</th><td style={{ padding: '8px' }}><span style={{ background: '#f1c40f', color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 500 }}>Yellow</span></td></tr>
                          <tr style={{ borderBottom: '1px solid #eee' }}><th style={{ textAlign: 'left', padding: '8px', background: '#f9f9f9', fontWeight: 500 }}>Trend</th><td style={{ padding: '8px', color: '#27ae60' }}>▲ Up</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <table className="table table-bordered table-sm mb-0" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                        <tbody>
                          <tr style={{ borderBottom: '1px solid #eee' }}><th style={{ textAlign: 'left', padding: '8px', background: '#f9f9f9', fontWeight: 500 }}>Actual</th><td style={{ padding: '8px' }}>57</td></tr>
                          <tr style={{ borderBottom: '1px solid #eee' }}><th style={{ textAlign: 'left', padding: '8px', background: '#f9f9f9', fontWeight: 500 }}>Target</th><td style={{ padding: '8px' }}>62</td></tr>
                          <tr style={{ borderBottom: '1px solid #eee' }}><th style={{ textAlign: 'left', padding: '8px', background: '#f9f9f9', fontWeight: 500 }}>Budget</th><td style={{ padding: '8px' }}>-</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="modal-footer" style={{ padding: '12px 20px', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setShowDescModal(false)} style={{ padding: '6px 14px', fontSize: 12, borderRadius: 6, border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <footer style={{ textAlign: "center", fontSize: 12, color: "#aaa", padding: "16px 0" }}>
        Copyright © 2026 <strong style={{ fontWeight: 600, color: "#555" }}>StratRoom</strong>
      </footer>
    </div>
  );
}
