import React, { useMemo, useState } from 'react'
import { ShieldAlert } from 'lucide-react'
import { useRiskDashboardData } from '../../hooks/useRiskDashboardData'
import { HEAT_COLS, HEAT_ROWS, HEAT_SEVERITY } from './riskDashboardUtils'
import './riskDashboard.css'

const SEVERITY_COLORS = ['#3aa15c', '#8bc34a', '#e8c23a', '#e08a2e', '#cc4b3c']
const LEVEL_TAG = {
  Critical: 'tag-critical',
  High: 'tag-high',
  Medium: 'tag-medium',
  Low: 'tag-low'
}
const STATUS_TAG = {
  Mitigated: 'tag-green-soft',
  'In Treatment': 'tag-blue-soft',
  Monitoring: 'tag-amber-soft',
  Escalated: 'tag-red-soft'
}
const TREND_ARROW = { up: '↑', down: '↓', flat: '→' }
const TREND_COLOR = { up: '#c1473b', down: '#2f9e5e', flat: '#9aa3b5' }
const EXPOSURE_COLOR = { HIGH: '#c1473b', MEDIUM: '#d98a2b', LOW: '#2f9e5e' }

function Bar({ pct, color }) {
  return (
    <div className="bar-track">
      <div className="bar-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}

function DonutChart({ data, size = 170 }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const r = size / 2 - 14
  const c = size / 2
  let acc = 0
  const circumference = 2 * Math.PI * r
  if (!total) {
    return (
      <div className="rd-empty-chart">No category data</div>
    )
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${c},${c}) rotate(-90)`}>
        {data.map((d) => {
          const frac = d.value / total
          const dash = frac * circumference
          const offset = -acc * circumference
          acc += frac
          return (
            <circle
              key={d.label}
              r={r}
              cx={0}
              cy={0}
              fill="none"
              stroke={d.color}
              strokeWidth={22}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={offset}
            />
          )
        })}
      </g>
      <text x={c} y={c - 4} textAnchor="middle" fontSize="26" fontWeight="800" fill="#1c2434">
        {total}
      </text>
      <text x={c} y={c + 16} textAnchor="middle" fontSize="11" fill="#75809a">
        Total
      </text>
    </svg>
  )
}

function BarChart({ data, width = 360, height = 220 }) {
  if (!data.length || data.every((d) => !d.value)) {
    return <div className="rd-empty-chart">No level data</div>
  }
  const max = Math.max(...data.map((d) => d.value), 1) * 1.15
  const padL = 34
  const padB = 26
  const padT = 10
  const innerW = width - padL - 10
  const innerH = height - padB - padT
  const bw = innerW / data.length - 18
  const ticks = 4
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      {[...Array(ticks + 1)].map((_, i) => {
        const y = padT + (innerH / ticks) * i
        const val = Math.round(max - (max / ticks) * i)
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={width - 4} y2={y} stroke="#eef0f4" />
            <text x={padL - 6} y={y + 3} fontSize="10" fill="#75809a" textAnchor="end">{val}</text>
          </g>
        )
      })}
      {data.map((d, i) => {
        const h = (d.value / max) * innerH
        const x = padL + i * (innerW / data.length) + 9
        const y = padT + innerH - h
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={bw} height={h} rx="3" fill={d.color} />
            <text x={x + bw / 2} y={padT + innerH + 16} fontSize="11" fill="#4b5a73" textAnchor="middle">{d.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

function HeatMap({ heatMatrix }) {
  return (
    <div className="heatmap-wrap">
      <div className="heatmap-grid" style={{ gridTemplateColumns: `90px repeat(${HEAT_COLS.length}, 1fr)` }}>
        <div />
        {HEAT_COLS.map((c) => <div key={c} className="heat-col-label">{c}</div>)}
        {HEAT_ROWS.map((row, ri) => (
          <React.Fragment key={row}>
            <div className="heat-row-label">{row}</div>
            {heatMatrix[ri].map((val, ci) => (
              <div
                key={ci}
                className="heat-cell"
                style={{ background: SEVERITY_COLORS[HEAT_SEVERITY[ri][ci]] }}
                title={`${row} × ${HEAT_COLS[ci]}: ${val} risks`}
              >
                {val || ''}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="heat-axis-x">IMPACT →</div>
      <div className="heat-legend">
        {['Low', 'Low-Med', 'Medium', 'High', 'Critical'].map((l, i) => (
          <span key={l}><span className="dot" style={{ background: SEVERITY_COLORS[i] }} />{l}</span>
        ))}
      </div>
    </div>
  )
}

export default function RiskDashboard() {
  const { loading, error, departments, selectedDeptId, dashboard, onDeptChange } = useRiskDashboardData()

  const [filter, setFilter] = useState('All')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState(1)

  const {
    summary,
    heatMatrix,
    statusBreakdown,
    treatmentMix,
    riskByCategory,
    riskLevelDistribution,
    riskRegister,
    treatmentPlans,
    categories
  } = dashboard

  const rows = useMemo(() => {
    let r = [...riskRegister]
    if (filter !== 'All') {
      r = r.filter((x) => x.category === filter)
    }
    if (sortKey) {
      r.sort((a, b) => {
        const av = a[sortKey]
        const bv = b[sortKey]
        if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * sortDir
        return String(av).localeCompare(String(bv)) * sortDir
      })
    }
    return r
  }, [riskRegister, filter, sortKey, sortDir])

  function toggleSort(key) {
    if (sortKey === key) setSortDir((d) => -d)
    else { setSortKey(key); setSortDir(1) }
  }

  return (
    <div className="rd-root">
      <div className="rd-content">
        <div className="rd-titlebar">
          <div className="titleleft">
            <span className="title-icon"><ShieldAlert size={20} /></span>
            <h1>Risk Management Dashboard</h1>
          </div>
          <div className="rd-titlebar-right">
            <select
              className="rd-dept-select"
              value={selectedDeptId}
              onChange={(e) => onDeptChange(e.target.value)}
              disabled={loading || !departments.length}
            >
              {!departments.length && <option value="">No departments</option>}
              {departments.map((d) => (
                <option key={d.id} value={String(d.id)}>{d.name}</option>
              ))}
            </select>
            <div className="exposure-card">
              <div>
                <div className="exposure-label">Risk Exposure</div>
                <div className="exposure-sub">{summary.totalRisks} total risks identified</div>
              </div>
              <div
                className="exposure-value"
                style={{ color: EXPOSURE_COLOR[summary.exposureLevel] || EXPOSURE_COLOR.LOW }}
              >
                {summary.exposureLevel}
              </div>
            </div>
          </div>
        </div>

        {error && <div className="rd-alert">{error}</div>}
        {loading && <div className="rd-loading">Loading risk dashboard…</div>}

        <div className={`tiles tiles-five ${loading ? 'rd-muted' : ''}`}>
          {summary.tiles.map((t) => (
            <div key={t.label} className={`tile tile-${t.color}`}>
              <div className="tile-label">{t.label}</div>
              <div className="tile-value">{t.value}</div>
              <div className="tile-note">{t.note}</div>
            </div>
          ))}
        </div>

        <div className={`row two ${loading ? 'rd-muted' : ''}`}>
          <div className="card">
            <div className="card-title">Risk Heat Map — Likelihood × Impact</div>
            <HeatMap heatMatrix={heatMatrix} />
          </div>
          <div className="stackcol">
            <div className="card">
              <div className="card-title">Risk Status Breakdown</div>
              {statusBreakdown.map((s) => (
                <div className="bar-row" key={s.label}>
                  <span className="bar-label" style={{ color: s.color }}>{s.label}</span>
                  <Bar pct={s.total ? (s.value / s.total) * 100 : 0} color={s.color} />
                  <span className="bar-count">{s.value}/{s.total}</span>
                </div>
              ))}
            </div>
            <div className="card">
              <div className="card-title">Treatment Strategy Mix</div>
              {treatmentMix.length === 0 && <div className="rd-empty-inline">No treatment strategies recorded</div>}
              {treatmentMix.map((s) => (
                <div className="bar-row" key={s.label}>
                  <span className="bar-label">{s.label}</span>
                  <Bar pct={s.total ? (s.value / s.total) * 100 : 0} color={s.color} />
                  <span className="bar-count">{s.value}/{s.total}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`row three ${loading ? 'rd-muted' : ''}`}>
          <div className="card center">
            <div className="card-title self">Risk by Category</div>
            <DonutChart data={riskByCategory} />
            <div className="donut-legend">
              {riskByCategory.map((d) => (
                <span key={d.label}><span className="dot" style={{ background: d.color }} />{d.label} {d.value}</span>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-title self">Risk Level Distribution</div>
            <BarChart data={riskLevelDistribution} />
          </div>
          <div className="card">
            <div className="card-title self">Summary</div>
            <div className="rd-summary-list">
              <div><span>Mitigated plans</span><strong>{dashboard.statusBreakdown?.[0]?.value ?? 0}</strong></div>
              <div><span>In treatment</span><strong>{dashboard.statusBreakdown?.[1]?.value ?? 0}</strong></div>
              <div><span>Monitoring</span><strong>{dashboard.statusBreakdown?.[2]?.value ?? 0}</strong></div>
              <div><span>Categories</span><strong>{riskByCategory.length}</strong></div>
            </div>
          </div>
        </div>

        <div className={`card ${loading ? 'rd-muted' : ''}`}>
          <div className="register-head">
            <div className="card-title self">Risk Register</div>
            <div className="filter-chips">
              {categories.map((f) => (
                <button key={f} type="button" className={`chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
          </div>
          <div className="rtable-wrap">
            <table className="rtable">
              <thead>
                <tr>
                  {[
                    ['id', 'Risk ID'], ['desc', 'Description'], ['category', 'Category'],
                    ['score', 'Score'], ['level', 'Level'], ['status', 'Status'],
                    ['treatment', 'Treatment'], ['trend', 'Trend'], ['owner', 'Owner'], ['review', 'Review Date']
                  ].map(([key, label]) => (
                    <th key={key} onClick={() => toggleSort(key)}>
                      {label} <span className="sortarrow">{sortKey === key ? (sortDir === 1 ? '▲' : '▼') : '⇕'}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={10} className="rd-empty-row">No risks found for this department</td>
                  </tr>
                )}
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="mono">{r.id}</td>
                    <td>{r.desc}</td>
                    <td><span className="tag tag-neutral">{r.category}</span></td>
                    <td><span className={`scorebox ${LEVEL_TAG[r.level]}`}>{r.score}</span></td>
                    <td><span className={`tag ${LEVEL_TAG[r.level]}`}>{r.level}</span></td>
                    <td><span className={`tag ${STATUS_TAG[r.status] || 'tag-neutral'}`}>{r.status}</span></td>
                    <td><span className="tag tag-neutral-blue">{r.treatment}</span></td>
                    <td style={{ color: TREND_COLOR[r.trend], fontWeight: 700, textAlign: 'center' }}>{TREND_ARROW[r.trend]}</td>
                    <td>{r.owner}</td>
                    <td>{r.review}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${loading ? 'rd-muted' : ''}`}>
          <div className="card-title page-title">Top Risk Treatment Plans</div>
          {treatmentPlans.length === 0 ? (
            <div className="rd-empty-inline">No treatment plans found for this department</div>
          ) : (
            <div className="plans-grid">
              {treatmentPlans.map((p) => (
                <div className="plan-card" key={p.id}>
                  <div className="plan-head">
                    <span className="mono muted">{p.id}</span>
                    <span className={`tag ${LEVEL_TAG[p.level]}`}>{p.level}</span>
                  </div>
                  <div className="plan-title">{p.title}</div>
                  <div className="plan-sub">Strategy: {p.strategy} · Owner: {p.owner}</div>
                  <div className="plan-progress-row">
                    <span>Treatment Progress</span><span>{p.progress}%</span>
                  </div>
                  <Bar pct={p.progress} color={p.level === 'Critical' ? '#c1473b' : '#3b6fe0'} />
                  <ul className="plan-items">
                    {p.items.map((it) => (
                      <li key={it.text} className={it.done ? 'done' : ''}>
                        <span className="check">{it.done ? '✓' : '○'}</span>{it.text}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
