import { useState, useEffect, useRef, useMemo } from 'react'

// Global reporting-period picker (fiscal Apr–Mar). Stores the selected range in
// localStorage('customperiod') as "MM/DD/YYYY-MM/DD/YYYY", which axiosClient sends
// as the DATE_PERIOD header. Styled like the legacy daterangepicker: Start / End
// month grids + Month / Quarter / Half Year / Year modes, two date boxes, Apply/Cancel.
const STORAGE_KEY = 'customperiod'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const FISCAL = [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2] // Apr→Mar (calendar month indexes)
const NAVY = '#2c2f6b'

const pad = (n) => String(n).padStart(2, '0')
const lastDay = (year, monthIdx) => new Date(year, monthIdx + 1, 0).getDate()
const fmt = (d) => `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`
const parse = (s) => {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec((s || '').trim())
  return m ? new Date(+m[3], +m[1] - 1, +m[2]) : null
}
const fiscalStartYear = (d) => (d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1)

function resolveCell(idx, fyStartYear) {
  const month = FISCAL[idx]
  const year = idx <= 8 ? fyStartYear : fyStartYear + 1
  return { month, year }
}

function cellsFor(mode) {
  switch (mode) {
    case 'Quarter':
      return [
        { label: 'Q1', from: 0, to: 2 }, { label: 'Q2', from: 3, to: 5 },
        { label: 'Q3', from: 6, to: 8 }, { label: 'Q4', from: 9, to: 11 },
      ]
    case 'Half Year':
      return [{ label: 'H1', from: 0, to: 5 }, { label: 'H2', from: 6, to: 11 }]
    case 'Year':
      return [{ label: 'Full Year', from: 0, to: 11 }]
    case 'Month':
    default:
      return FISCAL.map((m, i) => ({ label: MONTHS[m], from: i, to: i }))
  }
}

export default function DatePeriodPicker() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const initial = useMemo(() => {
    const v = localStorage.getItem(STORAGE_KEY)
    const m = /^(\d{2})\/(\d{2})\/(\d{4})-(\d{2})\/(\d{2})\/(\d{4})$/.exec(v || '')
    const y = new Date().getFullYear()
    if (m) return { from: `${m[1]}/${m[2]}/${m[3]}`, to: `${m[4]}/${m[5]}/${m[6]}` }
    return { from: `01/01/${y}`, to: `12/31/${y}` }
  }, [])

  const [mode, setMode] = useState('Month')
  const [fyYear, setFyYear] = useState(() => fiscalStartYear(parse(initial.from) || new Date()))
  const [fromStr, setFromStr] = useState(initial.from)
  const [toStr, setToStr] = useState(initial.to)

  useEffect(() => {
    if (!open) return
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const cells = cellsFor(mode)

  const pickStart = (cell) => {
    const { month, year } = resolveCell(cell.from, fyYear)
    setFromStr(`${pad(month + 1)}/01/${year}`)
  }
  const pickEnd = (cell) => {
    const { month, year } = resolveCell(cell.to, fyYear)
    setToStr(`${pad(month + 1)}/${pad(lastDay(year, month))}/${year}`)
  }

  const activeIdx = (which) => {
    const d = parse(which === 'start' ? fromStr : toStr)
    if (!d) return -1
    return cells.findIndex((c) => {
      const r = resolveCell(which === 'start' ? c.from : c.to, fyYear)
      return r.month === d.getMonth() && r.year === d.getFullYear()
    })
  }
  const startActive = activeIdx('start')
  const endActive = activeIdx('end')

  const apply = () => {
    const a = parse(fromStr), b = parse(toStr)
    if (!a || !b) return
    localStorage.setItem(STORAGE_KEY, `${fmt(a)}-${fmt(b)}`)
    setOpen(false)
    // Reload so all in-flight pages refetch with the new DATE_PERIOD header.
    window.location.reload()
  }

  const Grid = ({ which, active }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {cells.map((c, i) => (
        <button
          key={c.label}
          type="button"
          onClick={() => (which === 'start' ? pickStart(c) : pickEnd(c))}
          style={{
            padding: '10px 0', fontSize: 13, borderRadius: 6, cursor: 'pointer',
            border: i === active ? `1px solid ${NAVY}` : '1px solid #e2e8f0',
            background: i === active ? NAVY : '#fff',
            color: i === active ? '#fff' : '#334155', fontWeight: i === active ? 600 : 400,
          }}
        >
          {c.label}
        </button>
      ))}
    </div>
  )

  const YearHeader = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
      <button type="button" onClick={() => setFyYear((y) => y - 1)} style={arrowBtn}>←</button>
      <select value={fyYear} onChange={(e) => setFyYear(Number(e.target.value))} style={ySelect}>
        {Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i).map((y) => (
          <option key={y} value={y}>{`${y} - ${y + 1}`}</option>
        ))}
      </select>
      <button type="button" onClick={() => setFyYear((y) => y + 1)} style={arrowBtn}>→</button>
    </div>
  )

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        className="top_datepicker form-control form-control-sm d-inline-flex align-items-center justify-content-between gap-2"
        onClick={() => setOpen((o) => !o)}
        style={{ minWidth: 175, fontSize: 12, cursor: 'pointer', textAlign: 'start' }}
      >
        <span>{`${fromStr} - ${toStr}`}</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', insetInlineEnd: 0, zIndex: 9999,
          background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10,
          boxShadow: '0 12px 30px rgba(11,20,55,.18)', display: 'flex', overflow: 'hidden',
        }}>
          <div style={{ padding: 14, borderRight: '1px solid #f1f5f9', width: 210 }}>
            <div style={headerBar}>Start</div>
            <YearHeader />
            <Grid which="start" active={startActive} />
          </div>
          <div style={{ padding: 14, borderRight: '1px solid #f1f5f9', width: 210 }}>
            <div style={headerBar}>End</div>
            <YearHeader />
            <Grid which="end" active={endActive} />
          </div>
          <div style={{ padding: 14, width: 230, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['Month', 'Quarter', 'Half Year', 'Year'].map((t) => (
                <button key={t} type="button" onClick={() => setMode(t)} style={{
                  flex: 1, fontSize: 11, padding: '6px 2px', borderRadius: 6, cursor: 'pointer',
                  border: 'none', whiteSpace: 'nowrap',
                  background: mode === t ? NAVY : 'transparent',
                  color: mode === t ? '#fff' : '#64748b', fontWeight: mode === t ? 600 : 400,
                }}>{t}</button>
              ))}
            </div>
            <div style={{ background: NAVY, color: '#fff', borderRadius: 6, padding: '8px 10px', fontSize: 12.5, fontWeight: 600 }}>
              FY Apr - Mar
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={fromStr} onChange={(e) => setFromStr(e.target.value)} style={dateBox} />
              <input value={toStr} onChange={(e) => setToStr(e.target.value)} style={dateBox} />
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              <button type="button" onClick={apply} style={{
                background: NAVY, color: '#fff', border: 'none', borderRadius: 6,
                padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>Apply</button>
              <button type="button" onClick={() => setOpen(false)} style={{
                background: '#f1f5f9', color: '#475569', border: 'none', borderRadius: 6,
                padding: '8px 18px', fontSize: 13, cursor: 'pointer',
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const headerBar = { background: '#f1f5f9', color: '#475569', textAlign: 'center', fontSize: 13, fontWeight: 500, padding: '6px 0', borderRadius: 6, marginBottom: 10 }
const arrowBtn = { border: '1px solid #e2e8f0', background: '#fff', borderRadius: 6, width: 28, height: 28, cursor: 'pointer', color: '#475569', fontSize: 14 }
const ySelect = { border: '1px solid #e2e8f0', borderRadius: 6, padding: '5px 8px', fontSize: 13, color: '#0b1437', background: '#fff', cursor: 'pointer', flex: 1 }
const dateBox = { width: '100%', border: '1px solid #e2e8f0', borderRadius: 6, padding: '7px 8px', fontSize: 12, color: '#0b1437', textAlign: 'center' }
