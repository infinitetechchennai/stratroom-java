import { useState, useEffect, useRef } from 'react'

// Reporting-period picker. Stores the selected range in localStorage('customperiod')
// in the backend's expected MM/DD/YYYY-MM/DD/YYYY format, which axiosClient sends as
// the DATE_PERIOD header (KPI / initiative / risk data filter by it).
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const STORAGE_KEY = 'customperiod'

const pad = (n) => String(n).padStart(2, '0')
const lastDay = (year, monthIdx) => new Date(year, monthIdx + 1, 0).getDate()

// "01/01/2024-12/31/2024" → { fromM, fromY, toM, toY }
function parseStored(value) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})-(\d{2})\/(\d{2})\/(\d{4})$/.exec(value || '')
  if (!m) {
    const y = new Date().getFullYear()
    return { fromM: 0, fromY: y, toM: 11, toY: y }
  }
  return { fromM: +m[1] - 1, fromY: +m[3], toM: +m[4] - 1, toY: +m[6] }
}

function formatLabel({ fromM, fromY, toM, toY }) {
  return `${MONTHS[fromM]} ${fromY} - ${MONTHS[toM]} ${toY}`
}

export default function DatePeriodPicker() {
  const [open, setOpen] = useState(false)
  const [sel, setSel] = useState(() => parseStored(localStorage.getItem(STORAGE_KEY)))
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const thisYear = new Date().getFullYear()
  const years = Array.from({ length: 7 }, (_, i) => thisYear - 5 + i)

  const apply = (next) => {
    const from = `${pad(next.fromM + 1)}/01/${next.fromY}`
    const to = `${pad(next.toM + 1)}/${pad(lastDay(next.toY, next.toM))}/${next.toY}`
    localStorage.setItem(STORAGE_KEY, `${from}-${to}`)
    setSel(next)
    setOpen(false)
    // Reload so in-flight pages refetch with the new DATE_PERIOD header.
    window.location.reload()
  }

  const preset = (year) => apply({ fromM: 0, fromY: year, toM: 11, toY: year })

  const selectStyle = {
    border: '1px solid #e2e8f0', borderRadius: 6, padding: '5px 8px',
    fontSize: 12.5, color: '#0b1437', background: '#fff', cursor: 'pointer', minWidth: 70,
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        className="top_datepicker form-control form-control-sm d-inline-flex align-items-center justify-content-between gap-2"
        onClick={() => setOpen(o => !o)}
        style={{ minWidth: 170, fontSize: 12, cursor: 'pointer', textAlign: 'start' }}
      >
        <span>{formatLabel(sel)}</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', insetInlineEnd: 0,
          background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10,
          boxShadow: '0 8px 24px rgba(11,20,55,.16)', zIndex: 9999, padding: 14, minWidth: 280,
        }}>
          <PeriodEditor sel={sel} years={years} months={MONTHS} selectStyle={selectStyle} onApply={apply} />

          <div style={{ borderTop: '1px solid #f1f5f9', marginTop: 12, paddingTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <span style={{ fontSize: 11, color: '#94a3b8', alignSelf: 'center', marginInlineEnd: 4 }}>Quick:</span>
            <button type="button" onClick={() => preset(thisYear)} style={presetBtn}>This Year</button>
            <button type="button" onClick={() => preset(thisYear - 1)} style={presetBtn}>Last Year</button>
          </div>
        </div>
      )}
    </div>
  )
}

const presetBtn = {
  border: '1px solid #e2e8f0', borderRadius: 999, padding: '4px 12px',
  fontSize: 11.5, color: '#334155', background: '#fff', cursor: 'pointer',
}

function PeriodEditor({ sel, years, months, selectStyle, onApply }) {
  const [draft, setDraft] = useState(sel)
  useEffect(() => { setDraft(sel) }, [sel])

  const upd = (k) => (e) => setDraft(d => ({ ...d, [k]: Number(e.target.value) }))

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 4 }}>FROM</label>
          <div style={{ display: 'flex', gap: 6 }}>
            <select value={draft.fromM} onChange={upd('fromM')} style={selectStyle}>
              {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
            </select>
            <select value={draft.fromY} onChange={upd('fromY')} style={selectStyle}>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: '#64748b', display: 'block', marginBottom: 4 }}>TO</label>
          <div style={{ display: 'flex', gap: 6 }}>
            <select value={draft.toM} onChange={upd('toM')} style={selectStyle}>
              {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
            </select>
            <select value={draft.toY} onChange={upd('toY')} style={selectStyle}>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onApply(draft)}
        style={{
          marginTop: 12, width: '100%', border: 'none', borderRadius: 7,
          background: '#00C4C4', color: '#fff', fontWeight: 700, fontSize: 12.5,
          padding: '8px 0', cursor: 'pointer',
        }}
      >
        Apply
      </button>
    </>
  )
}
