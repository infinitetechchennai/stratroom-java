import { useState, useEffect, useRef, useCallback } from 'react'

// ─── constants ────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'customperiod'
const MONTHS_FULL  = ['January','February','March','April','May','June','July','August','September','October','November','December']
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DOWS         = ['Su','Mo','Tu','We','Th','Fr','Sa']

// ─── helpers ──────────────────────────────────────────────────────────────────
const dk = d => d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
const sameDay = (a, b) => a && b && dk(a) === dk(b)

const fmtShort = d => {
  if (!d) return ''
  return MONTHS_SHORT[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()
}

const fmtTrigger = (s, e) => {
  if (!s) return 'Select period'
  const eDate = e || s
  if (sameDay(s, eDate)) {
    const DOW_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    return DOW_SHORT[s.getDay()] + ', ' + s.getDate() + ' ' + MONTHS_SHORT[s.getMonth()] + ' ' + s.getFullYear()
  }
  const sm = MONTHS_SHORT[s.getMonth()] + ', ' + s.getFullYear()
  const em = MONTHS_SHORT[eDate.getMonth()] + ', ' + eDate.getFullYear()
  return sm === em ? sm : sm + ' – ' + em
}

const addMonths = (y, m, delta) => {
  const d = new Date(y, m + delta, 1)
  return { y: d.getFullYear(), m: d.getMonth() }
}

const getWeekBounds = d => {
  const dow = d.getDay()
  const sun = new Date(d.getFullYear(), d.getMonth(), d.getDate() - dow)
  const sat = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (6 - dow))
  return { sun, sat }
}

const fmt = d => {
  const pad = n => String(n).padStart(2, '0')
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`
}

// ─── sub-components ───────────────────────────────────────────────────────────

/** Single month calendar grid */
function MonthPane({ year, month, isLeft, pendStart, pendEnd, hoverDate, slot, onDayClick, onDayHover, onNav }) {
  const firstDow    = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today       = new Date()
  const todayY = today.getFullYear(), todayM = today.getMonth(), todayD = today.getDate()

  const sk = pendStart ? dk(pendStart) : null
  const ek = pendEnd   ? dk(pendEnd)   : null
  const hk = hoverDate ? dk(hoverDate) : null
  const rangeEk = ek != null ? ek : (sk != null && slot === 'end' ? hk : null)

  const days = []
  for (let i = 0; i < firstDow; i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)

  return (
    <div style={{ flex: 1, padding: '10px 12px' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        {isLeft
          ? <button className="cal-nav-btn" onClick={() => onNav(-1)}>‹</button>
          : <span style={{ display: 'inline-block', width: 26 }} />
        }
        <span style={{ fontSize: 12, fontWeight: 700, color: '#0B1437' }}>
          {MONTHS_FULL[month]} {year}
        </span>
        {!isLeft
          ? <button className="cal-nav-btn" onClick={() => onNav(1)}>›</button>
          : <span style={{ display: 'inline-block', width: 26 }} />
        }
      </div>

      {/* day-of-week row */}
      <div className="cal-grid-hdr">
        {DOWS.map(d => <div key={d} className="cal-dow-lbl">{d}</div>)}
      </div>

      {/* day grid */}
      <div className="cal-grid">
        {days.map((d, i) => {
          if (d === null) return <button key={`e-${i}`} className="cal-day-cell cal-empty" tabIndex={-1} />
          const dkey    = year * 10000 + (month + 1) * 100 + d
          const isToday = (year === todayY && month === todayM && d === todayD)
          const isStart = (sk != null && dkey === sk)
          const isEnd   = (ek != null && dkey === ek)
          let inRange   = false
          if (sk != null && rangeEk != null) {
            const lo = Math.min(sk, rangeEk), hi = Math.max(sk, rangeEk)
            if (dkey > lo && dkey < hi) inRange = true
          }
          let cls = 'cal-day-cell'
          if (isToday) cls += ' cal-today'
          if (isStart) cls += ' cal-range-start'
          if (isEnd)   cls += ' cal-range-end'
          if (inRange) cls += ' cal-in-range'
          return (
            <button
              key={d}
              className={cls}
              onMouseEnter={() => onDayHover(year, month, d)}
              onMouseDown={() => onDayClick(year, month, d)}
            >
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** Quarter grid */
function QuarterPane({ qYear, pendStart, pendEnd, onShift, onSelect }) {
  const qs = ['Q1  Jan–Mar', 'Q2  Apr–Jun', 'Q3  Jul–Sep', 'Q4  Oct–Dec']
  const startQKey = pendStart ? pendStart.getFullYear() * 10 + Math.floor(pendStart.getMonth() / 3) : null
  const endQKey   = pendEnd   ? pendEnd.getFullYear()   * 10 + Math.floor(pendEnd.getMonth()   / 3) : null

  return (
    <div style={{ padding: '12px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button className="cal-nav-btn" onClick={() => onShift(-1)}>‹</button>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0B1437' }}>{qYear}</span>
        <button className="cal-nav-btn" onClick={() => onShift(1)}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
        {qs.map((lbl, i) => {
          const qkey = qYear * 10 + i
          const isStart = startQKey != null && qkey === startQKey
          const isEnd   = endQKey   != null && qkey === endQKey
          const inRange = startQKey != null && endQKey != null
            && qkey > Math.min(startQKey, endQKey) && qkey < Math.max(startQKey, endQKey)
          let cls = 'cal-q-btn'
          if (isStart || isEnd) cls += ' cal-active'
          if (inRange) cls += ' cal-yr-inrange'
          return <button key={i} className={cls} onClick={() => onSelect(i)}>{lbl}</button>
        })}
      </div>
      <p style={{ margin: '10px 0 0', fontSize: 10.5, color: '#8A97B0', textAlign: 'center' }}>
        Click start quarter, then end quarter
      </p>
    </div>
  )
}

/** Half-Year grid */
function HalfYearPane({ hyYear, pendStart, pendEnd, onShift, onSelect }) {
  const halves = [
    { lbl: 'H1  Jan – Jun', startM: 0, endM: 5 },
    { lbl: 'H2  Jul – Dec', startM: 6, endM: 11 },
  ]
  const startHKey = pendStart ? pendStart.getFullYear() * 10 + (pendStart.getMonth() < 6 ? 1 : 2) : null
  const endHKey   = pendEnd   ? pendEnd.getFullYear()   * 10 + (pendEnd.getMonth()   < 6 ? 1 : 2) : null

  return (
    <div style={{ padding: '12px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button className="cal-nav-btn" onClick={() => onShift(-1)}>‹</button>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0B1437' }}>{hyYear}</span>
        <button className="cal-nav-btn" onClick={() => onShift(1)}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
        {halves.map((h, i) => {
          const hkey = hyYear * 10 + (i + 1)
          const isStart = startHKey != null && hkey === startHKey
          const isEnd   = endHKey   != null && hkey === endHKey
          const inRange = startHKey != null && endHKey != null
            && hkey > Math.min(startHKey, endHKey) && hkey < Math.max(startHKey, endHKey)
          let cls = 'cal-q-btn'
          if (isStart || isEnd) cls += ' cal-active'
          if (inRange) cls += ' cal-yr-inrange'
          return <button key={i} className={cls} onClick={() => onSelect(i)}>{h.lbl}</button>
        })}
      </div>
      <p style={{ margin: '10px 0 0', fontSize: 10.5, color: '#8A97B0', textAlign: 'center' }}>
        Click start half, then end half (cross-year supported)
      </p>
    </div>
  )
}

/** Year grid (12 years) */
function YearPane({ yrBase, yrPickA, yrPickB, onShift, onSelect }) {
  const years = Array.from({ length: 12 }, (_, i) => yrBase + i)
  return (
    <div style={{ padding: '12px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <button className="cal-nav-btn" onClick={() => onShift(-1)}>‹</button>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0B1437' }}>{yrBase} – {yrBase + 11}</span>
        <button className="cal-nav-btn" onClick={() => onShift(1)}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
        {years.map(y => {
          const isSel = y === yrPickA || y === yrPickB
          let inRng = false
          if (yrPickA != null && yrPickB != null) {
            const lo = Math.min(yrPickA, yrPickB), hi = Math.max(yrPickA, yrPickB)
            if (y > lo && y < hi) inRng = true
          }
          let cls = 'cal-yr-btn'
          if (isSel) cls += ' cal-active'
          if (inRng) cls += ' cal-yr-inrange'
          return <button key={y} className={cls} onClick={() => onSelect(y)}>{y}</button>
        })}
      </div>
      <p style={{ margin: '10px 0 0', fontSize: 10.5, color: '#8A97B0', textAlign: 'center' }}>
        Click one year for start, click another for end
      </p>
    </div>
  )
}

/** Daily single-month grid */
function DailyPane({ year, month, pendStart, pendEnd, hoverDate, slot, onDayClick, onDayHover, onNav }) {
  const firstDow    = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today       = new Date()
  const todayY = today.getFullYear(), todayM = today.getMonth(), todayD = today.getDate()

  const sk = pendStart ? dk(pendStart) : null
  const ek = pendEnd   ? dk(pendEnd)   : null
  const hk = hoverDate ? dk(hoverDate) : null
  const rangeEk = ek != null ? ek : (sk != null && slot === 'end' ? hk : null)

  const days = []
  for (let i = 0; i < firstDow; i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)

  return (
    <div style={{ padding: '10px 12px', maxWidth: 260 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <button className="cal-nav-btn" onClick={() => onNav(-1)}>‹</button>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#0B1437' }}>{MONTHS_FULL[month]} {year}</span>
        <button className="cal-nav-btn" onClick={() => onNav(1)}>›</button>
      </div>
      <div className="cal-grid-hdr">
        {DOWS.map(d => <div key={d} className="cal-dow-lbl">{d}</div>)}
      </div>
      <div className="cal-grid">
        {days.map((d, i) => {
          if (d === null) return <button key={`e-${i}`} className="cal-day-cell cal-empty" tabIndex={-1} />
          const dkey    = year * 10000 + (month + 1) * 100 + d
          const isToday = (year === todayY && month === todayM && d === todayD)
          const isStart = (sk != null && dkey === sk)
          const isEnd   = (ek != null && dkey === ek)
          let inRange   = false
          if (sk != null && rangeEk != null) {
            const lo = Math.min(sk, rangeEk), hi = Math.max(sk, rangeEk)
            if (dkey > lo && dkey < hi) inRange = true
          }
          let cls = 'cal-day-cell'
          if (isToday) cls += ' cal-today'
          if (isStart) cls += ' cal-range-start'
          if (isEnd)   cls += ' cal-range-end'
          if (inRange) cls += ' cal-in-range'
          return (
            <button key={d} className={cls}
              onMouseEnter={() => onDayHover(year, month, d)}
              onMouseDown={() => onDayClick(year, month, d)}
            >{d}</button>
          )
        })}
      </div>
    </div>
  )
}

/** Weekly single-month grid */
function WeeklyPane({ year, month, pendStart, pendEnd, weekSlotA, hoverDate, onDayClick, onDayHover, onDayHoverLeave, onNav }) {
  const firstDow    = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today       = new Date()
  const todayY = today.getFullYear(), todayM = today.getMonth(), todayD = today.getDate()

  const selSun = pendStart ? dk(getWeekBounds(pendStart).sun) : null
  const selSat = pendEnd   ? dk(getWeekBounds(pendEnd).sat)   : null

  let previewSun = null, previewSat = null
  if (weekSlotA && !pendEnd && hoverDate) {
    const hWB = getWeekBounds(hoverDate)
    const wA  = dk(weekSlotA)
    const wH  = dk(hWB.sun)
    if (wH < wA) {
      previewSun = wH
      previewSat = dk(getWeekBounds(new Date(weekSlotA.getFullYear(), weekSlotA.getMonth(), weekSlotA.getDate() + 6)).sat)
    } else {
      previewSun = wA
      previewSat = dk(hWB.sat)
    }
  }

  const days = []
  for (let i = 0; i < firstDow; i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)

  const hint = weekSlotA && !pendEnd
    ? 'Start week set — click end week'
    : (pendStart && pendEnd ? '✓ Week range selected' : '👆 Click a week to set start')

  return (
    <div style={{ padding: '10px 12px', maxWidth: 260 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <button className="cal-nav-btn" onClick={() => onNav(-1)}>‹</button>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#0B1437' }}>{MONTHS_FULL[month]} {year}</span>
        <button className="cal-nav-btn" onClick={() => onNav(1)}>›</button>
      </div>
      <div className="cal-grid-hdr">
        {DOWS.map(d => <div key={d} className="cal-dow-lbl">{d}</div>)}
      </div>
      <div className="cal-grid">
        {days.map((d, i) => {
          if (d === null) return <button key={`e-${i}`} className="cal-day-cell cal-empty" tabIndex={-1} />
          const dkey = year * 10000 + (month + 1) * 100 + d
          const isToday = (year === todayY && month === todayM && d === todayD)
          const isAppliedStart = selSun != null && dkey === selSun
          const isAppliedEnd   = selSat != null && dkey === selSat
          const inApplied      = selSun != null && selSat != null && dkey > selSun && dkey < selSat
          const isPreStart = previewSun != null && dkey === previewSun
          const isPreEnd   = previewSat != null && dkey === previewSat
          const inPre      = previewSun != null && previewSat != null && dkey > previewSun && dkey < previewSat
          const isStart = isPreStart || (!previewSun && isAppliedStart)
          const isEnd   = isPreEnd   || (!previewSun && isAppliedEnd)
          const inRange = inPre      || (!previewSun && inApplied)
          let cls = 'cal-day-cell'
          if (isToday) cls += ' cal-today'
          if (isStart) cls += ' cal-range-start'
          if (isEnd)   cls += ' cal-range-end'
          if (inRange) cls += ' cal-in-range'
          return (
            <button key={d} className={cls}
              onMouseEnter={() => onDayHover(year, month, d)}
              onMouseLeave={onDayHoverLeave}
              onMouseDown={() => onDayClick(year, month, d)}
            >{d}</button>
          )
        })}
      </div>
      <p style={{ margin: '6px 0 2px', fontSize: 10.5, color: '#009999', textAlign: 'center', fontWeight: 600 }}>
        {hint}
      </p>
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────────────────
export default function DatePeriodPicker() {
  const today  = new Date()
  const todayY = today.getFullYear()
  const todayM = today.getMonth()
  const todayD = today.getDate()

  // Trigger label state (persisted)
  const [appliedStart, setAppliedStart] = useState(() => {
    const val = localStorage.getItem(STORAGE_KEY)
    if (val && val.includes('-')) return new Date(val.split('-')[0])
    return new Date(todayY, 0, 1)
  })
  const [appliedEnd, setAppliedEnd] = useState(() => {
    const val = localStorage.getItem(STORAGE_KEY)
    if (val && val.includes('-')) return new Date(val.split('-')[1])
    return new Date(todayY, 11, 31)
  })

  const [isOpen, setIsOpen] = useState(false)

  // Active view tab
  const [activeView, setActiveView] = useState('month')

  // Pending selection (inside picker, before Apply)
  const [pendStart, setPendStart] = useState(null)
  const [pendEnd,   setPendEnd]   = useState(null)
  const [slot,      setSlot]      = useState('start')  // 'start' | 'end'

  // Month view: two-pane navigation
  const [leftY,  setLeftY]  = useState(todayY)
  const [leftM,  setLeftM]  = useState(todayM === 0 ? 11 : todayM - 1)
  const [rightY, setRightY] = useState(todayY)
  const [rightM, setRightM] = useState(todayM)

  // Hover preview
  const [hoverDate, setHoverDate] = useState(null)

  // Daily view
  const [dailyY, setDailyY] = useState(todayY)
  const [dailyM, setDailyM] = useState(todayM)

  // Weekly view
  const [weeklyY,   setWeeklyY]   = useState(todayY)
  const [weeklyM,   setWeeklyM]   = useState(todayM)
  const [weekSlotA, setWeekSlotA] = useState(null)
  const [weekHover, setWeekHover] = useState(null)

  // Quarter view
  const [qYear, setQYear] = useState(todayY)

  // Half-Year view
  const [hyYear, setHyYear] = useState(todayY)

  // Year view
  const [yrBase,  setYrBase]  = useState(todayY - 4)
  const [yrPickA, setYrPickA] = useState(null)
  const [yrPickB, setYrPickB] = useState(null)

  // Text inputs in footer
  const [startInput, setStartInput] = useState('')
  const [endInput,   setEndInput]   = useState('')

  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const close = e => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [isOpen])

  // Sync footer inputs when pending selection changes
  useEffect(() => {
    setStartInput(fmtShort(pendStart))
    setEndInput(fmtShort(pendEnd))
  }, [pendStart, pendEnd])

  // ─── open ──────────────────────────────────────────────────────────────────
  const open = () => {
    setPendStart(null); setPendEnd(null)
    setHoverDate(null); setSlot('start')
    setYrPickA(null);   setYrPickB(null)
    setWeekSlotA(null); setWeekHover(null)

    const startRef = appliedStart
    setLeftY(startRef.getFullYear())
    setLeftM(startRef.getMonth())
    const nr = addMonths(startRef.getFullYear(), startRef.getMonth(), 1)
    setRightY(nr.y); setRightM(nr.m)
    setDailyY(startRef.getFullYear()); setDailyM(startRef.getMonth())
    setWeeklyY(startRef.getFullYear()); setWeeklyM(startRef.getMonth())
    setHyYear(startRef.getFullYear())
    setActiveView('month')
    setIsOpen(true)
  }

  // ─── apply ─────────────────────────────────────────────────────────────────
  const apply = () => {
    if (!pendStart) return
    const s = pendStart
    const e = pendEnd || new Date(pendStart)
    setAppliedStart(s)
    setAppliedEnd(e)
    localStorage.setItem(STORAGE_KEY, `${fmt(s)}-${fmt(e)}`)
    setIsOpen(false)
    window.location.reload()
  }

  // ─── cancel ────────────────────────────────────────────────────────────────
  const cancel = () => {
    setHoverDate(null); setWeekSlotA(null); setWeekHover(null)
    setSlot('start')
    setIsOpen(false)
  }

  // ─── month nav ─────────────────────────────────────────────────────────────
  const navMonth = dir => {
    const nl = addMonths(leftY, leftM, dir)
    setLeftY(nl.y); setLeftM(nl.m)
    const nr = addMonths(nl.y, nl.m, 1)
    setRightY(nr.y); setRightM(nr.m)
  }

  // ─── day click (month/daily modes share logic) ─────────────────────────────
  const dayClick = (y, m, d) => {
    const clicked = new Date(y, m, d)
    if (slot === 'start') {
      setPendStart(clicked); setPendEnd(null); setHoverDate(null); setSlot('end')
    } else {
      if (pendStart && dk(clicked) < dk(pendStart)) {
        setPendEnd(new Date(pendStart)); setPendStart(clicked)
      } else {
        setPendEnd(clicked)
      }
      setHoverDate(null); setSlot('start')
    }
  }

  // ─── weekly click ──────────────────────────────────────────────────────────
  const weeklyDayClick = (y, m, d) => {
    const wb = getWeekBounds(new Date(y, m, d))
    setWeekHover(null)
    if (slot === 'start' || !weekSlotA) {
      setWeekSlotA(wb.sun); setPendStart(wb.sun); setPendEnd(null); setSlot('end')
    } else {
      const firstSun = weekSlotA
      if (dk(wb.sun) < dk(firstSun)) {
        setPendStart(wb.sun); setPendEnd(getWeekBounds(firstSun).sat)
      } else {
        setPendStart(firstSun); setPendEnd(wb.sat)
      }
      setWeekSlotA(null); setSlot('start')
    }
  }

  // ─── quarter select ────────────────────────────────────────────────────────
  const selectQ = qi => {
    if (slot === 'start' || !pendStart) {
      setPendStart(new Date(qYear, qi * 3, 1)); setPendEnd(null); setSlot('end')
    } else {
      const startQ    = Math.floor(pendStart.getMonth() / 3)
      const startQKey = pendStart.getFullYear() * 10 + startQ
      const thisQKey  = qYear * 10 + qi
      if (thisQKey < startQKey) {
        const oldStart = new Date(pendStart)
        setPendStart(new Date(qYear, qi * 3, 1))
        setPendEnd(new Date(oldStart.getFullYear(), startQ * 3 + 3, 0))
      } else {
        setPendEnd(new Date(qYear, qi * 3 + 3, 0))
      }
      setSlot('start')
    }
  }

  // ─── half-year select ──────────────────────────────────────────────────────
  const selectHY = hi => {
    const startM = hi === 0 ? 0 : 6
    const endM   = hi === 0 ? 5 : 11
    if (slot === 'start' || !pendStart) {
      setPendStart(new Date(hyYear, startM, 1)); setPendEnd(null); setSlot('end')
    } else {
      const startHKey = pendStart.getFullYear() * 10 + (pendStart.getMonth() < 6 ? 1 : 2)
      const thisHKey  = hyYear * 10 + (hi + 1)
      if (thisHKey < startHKey) {
        const oldStart = new Date(pendStart)
        setPendStart(new Date(hyYear, startM, 1))
        const oHalf = oldStart.getMonth() < 6 ? 5 : 11
        setPendEnd(new Date(oldStart.getFullYear(), oHalf + 1, 0))
      } else {
        setPendEnd(new Date(hyYear, endM + 1, 0))
      }
      setSlot('start')
    }
  }

  // ─── year select ───────────────────────────────────────────────────────────
  const selectYear = y => {
    if (yrPickA === null || (yrPickA !== null && yrPickB !== null)) {
      setYrPickA(y); setYrPickB(null)
      setPendStart(new Date(y, 0, 1)); setPendEnd(null); setSlot('end')
    } else {
      setYrPickB(y)
      const lo = Math.min(yrPickA, y), hi = Math.max(yrPickA, y)
      setPendStart(new Date(lo, 0, 1)); setPendEnd(new Date(hi, 11, 31)); setSlot('start')
    }
  }

  // ─── preset ────────────────────────────────────────────────────────────────
  const applyPreset = key => {
    const y = todayY, m = todayM, d = todayD
    const qm = Math.floor(m / 3) * 3
    const todayDow = today.getDay()
    const map = {
      today:     [new Date(y,m,d),          new Date(y,m,d)],
      yesterday: [new Date(y,m,d-1),        new Date(y,m,d-1)],
      '7d':      [new Date(y,m,d-6),        new Date(y,m,d)],
      '30d':     [new Date(y,m,d-29),       new Date(y,m,d)],
      '90d':     [new Date(y,m,d-89),       new Date(y,m,d)],
      thisWeek:  [new Date(y,m,d-todayDow), new Date(y,m,d-todayDow+6)],
      lastWeek:  [new Date(y,m,d-todayDow-7),new Date(y,m,d-todayDow-1)],
      thisMonth: [new Date(y,m,1),          new Date(y,m+1,0)],
      thisQ:     [new Date(y,qm,1),         new Date(y,qm+3,0)],
      thisYear:  [new Date(y,0,1),          new Date(y,11,31)],
      lastMonth: [new Date(y,m-1,1),        new Date(y,m,0)],
      lastQ:     qm > 0 ? [new Date(y,qm-3,1), new Date(y,qm,0)] : [new Date(y-1,9,1), new Date(y,0,0)],
      lastYear:  [new Date(y-1,0,1),        new Date(y-1,11,31)],
    }
    const pair = map[key] || [null, null]
    setPendStart(pair[0]); setPendEnd(pair[1]); setSlot('start')
    setYrPickA(null); setYrPickB(null)
    setWeekSlotA(null); setWeekHover(null); setHoverDate(null)

    if (pair[0]) {
      const s = pair[0]
      setLeftY(s.getFullYear()); setLeftM(s.getMonth())
      const nr = addMonths(s.getFullYear(), s.getMonth(), 1)
      setRightY(nr.y); setRightM(nr.m)
      setDailyY(s.getFullYear()); setDailyM(s.getMonth())
      setWeeklyY(s.getFullYear()); setWeeklyM(s.getMonth())
      setHyYear(s.getFullYear())
    }

    let targetView = 'month'
    if (key === 'today' || key === 'yesterday') targetView = 'daily'
    else if (key === 'thisWeek' || key === 'lastWeek') targetView = 'weekly'
    setActiveView(targetView)
  }

  // ─── footer hint ───────────────────────────────────────────────────────────
  const hint = pendStart && pendEnd
    ? '✓ Range selected — press Apply or adjust'
    : slot === 'end'
      ? '👆 Now click a day to set the end date'
      : pendStart
        ? '✓ Start set — click END pill or pick end date on calendar'
        : '👆 Click a day to set the start date'

  // ─── panel position ────────────────────────────────────────────────────────
  const panelStyle = {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    zIndex: 99999,
    background: '#fff',
    borderRadius: 14,
    border: '1px solid #E4EAF4',
    boxShadow: '0 8px 40px rgba(11,20,55,.18),0 2px 10px rgba(11,20,55,.08)',
    overflow: 'hidden',
    fontFamily: "'Trebuchet MS',Trebuchet,sans-serif",
    width: 680,
    maxWidth: 'calc(100vw - 20px)',
  }

  const PRESETS = [
    { group: 'DAILY',       items: [{ key: 'today', lbl: 'Today' }, { key: 'yesterday', lbl: 'Yesterday' }] },
    { group: 'WEEKLY',      items: [{ key: 'thisWeek', lbl: 'This week' }, { key: 'lastWeek', lbl: 'Last week' }] },
    { group: 'RANGE',       items: [{ key: '7d', lbl: 'Last 7 days' }, { key: '30d', lbl: 'Last 30 days' }, { key: '90d', lbl: 'Last 90 days' }] },
    { group: 'THIS PERIOD', items: [{ key: 'thisMonth', lbl: 'This month' }, { key: 'thisQ', lbl: 'This quarter' }, { key: 'thisYear', lbl: 'This year' }] },
    { group: 'PREVIOUS',    items: [{ key: 'lastMonth', lbl: 'Last month' }, { key: 'lastQ', lbl: 'Last quarter' }, { key: 'lastYear', lbl: 'Last year' }] },
  ]

  const views = ['daily','weekly','month','quarter','hy','year']
  const viewLabels = { daily:'Daily', weekly:'Weekly', month:'Month', quarter:'Quarter', hy:'Half-Year', year:'Year' }

  return (
    <div ref={triggerRef} style={{ position: 'relative' }}>
      {/* ── Trigger button ── */}
      <button
        onClick={isOpen ? cancel : open}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '4px 10px', borderRadius: 7,
          border: '1px solid rgba(0,0,0,.13)', background: 'transparent',
          cursor: 'pointer', fontFamily: 'inherit', fontSize: 10.5, fontWeight: 600,
          color: '#5B6B8A', transition: 'background .13s', whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,.05)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <span>{fmtTrigger(appliedStart, appliedEnd)}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* ── Picker panel ── */}
      {isOpen && (
        <div ref={panelRef} style={panelStyle}>
          <div style={{ display: 'flex' }}>

            {/* ── Sidebar presets ── */}
            <div style={{ width: 156, flexShrink: 0, borderRight: '1px solid #F0F3FA', padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto', maxHeight: 460 }}>
              {PRESETS.map(({ group, items }) => (
                <div key={group}>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: '#8A97B0', letterSpacing: '.08em', padding: '4px 8px 2px' }}>{group}</div>
                  {items.map(({ key, lbl }) => (
                    <button key={key} className="cal-preset-btn" onClick={() => applyPreset(key)}>{lbl}</button>
                  ))}
                  <div style={{ height: 1, background: '#F0F3FA', margin: '5px 4px' }} />
                </div>
              ))}
            </div>

            {/* ── Main area ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

              {/* View tabs */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 14px 0' }}>
                {views.map(v => (
                  <button key={v}
                    className={`cal-type-tab${activeView === v ? ' active' : ''}`}
                    onClick={() => setActiveView(v)}
                  >
                    {viewLabels[v]}
                  </button>
                ))}
              </div>

              {/* Daily view */}
              {activeView === 'daily' && (
                <div>
                  <DailyPane
                    year={dailyY} month={dailyM}
                    pendStart={pendStart} pendEnd={pendEnd}
                    hoverDate={hoverDate} slot={slot}
                    onDayClick={(y, m, d) => { const c = new Date(y,m,d); setHoverDate(null); if (slot==='start'){setPendStart(c);setPendEnd(null);setSlot('end')} else { if(pendStart&&dk(c)<dk(pendStart)){setPendEnd(new Date(pendStart));setPendStart(c)}else{setPendEnd(c)} setSlot('start') }}}
                    onDayHover={(y, m, d) => { if (pendStart && !pendEnd && slot==='end') setHoverDate(new Date(y,m,d)) }}
                    onNav={dir => { const nl=addMonths(dailyY,dailyM,dir); setDailyY(nl.y); setDailyM(nl.m) }}
                  />
                  <p style={{ margin: '0 0 8px', fontSize: 10.5, color: '#8A97B0', textAlign: 'center', padding: '0 12px' }}>Click a day to select it</p>
                </div>
              )}

              {/* Weekly view */}
              {activeView === 'weekly' && (
                <div>
                  <WeeklyPane
                    year={weeklyY} month={weeklyM}
                    pendStart={pendStart} pendEnd={pendEnd}
                    weekSlotA={weekSlotA} hoverDate={weekHover}
                    onDayClick={weeklyDayClick}
                    onDayHover={(y, m, d) => setWeekHover(new Date(y,m,d))}
                    onDayHoverLeave={() => setWeekHover(null)}
                    onNav={dir => { const nl=addMonths(weeklyY,weeklyM,dir); setWeeklyY(nl.y); setWeeklyM(nl.m) }}
                  />
                </div>
              )}

              {/* Month view – two panes */}
              {activeView === 'month' && (
                <div style={{ display: 'flex' }}>
                  <MonthPane
                    year={leftY} month={leftM} isLeft={true}
                    pendStart={pendStart} pendEnd={pendEnd}
                    hoverDate={hoverDate} slot={slot}
                    onDayClick={dayClick}
                    onDayHover={(y, m, d) => { if (pendStart && !pendEnd && slot==='end') setHoverDate(new Date(y,m,d)) }}
                    onNav={navMonth}
                  />
                  <div style={{ borderLeft: '1px solid #F0F3FA' }}>
                    <MonthPane
                      year={rightY} month={rightM} isLeft={false}
                      pendStart={pendStart} pendEnd={pendEnd}
                      hoverDate={hoverDate} slot={slot}
                      onDayClick={dayClick}
                      onDayHover={(y, m, d) => { if (pendStart && !pendEnd && slot==='end') setHoverDate(new Date(y,m,d)) }}
                      onNav={navMonth}
                    />
                  </div>
                </div>
              )}

              {/* Quarter view */}
              {activeView === 'quarter' && (
                <QuarterPane
                  qYear={qYear}
                  pendStart={pendStart} pendEnd={pendEnd}
                  onShift={dir => setQYear(y => y + dir)}
                  onSelect={selectQ}
                />
              )}

              {/* Half-Year view */}
              {activeView === 'hy' && (
                <HalfYearPane
                  hyYear={hyYear}
                  pendStart={pendStart} pendEnd={pendEnd}
                  onShift={dir => setHyYear(y => y + dir)}
                  onSelect={selectHY}
                />
              )}

              {/* Year view */}
              {activeView === 'year' && (
                <YearPane
                  yrBase={yrBase}
                  yrPickA={yrPickA} yrPickB={yrPickB}
                  onShift={dir => setYrBase(b => b + dir * 12)}
                  onSelect={selectYear}
                />
              )}

              {/* ── Footer ── */}
              <div style={{ borderTop: '1px solid #F0F3FA' }}>
                <div style={{ padding: '5px 14px 0', fontSize: 10.5, fontWeight: 600, color: '#009999', minHeight: 20 }}>
                  {hint}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 14px 10px', flexWrap: 'wrap', gap: 6 }}>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {/* START pill */}
                    <div
                      onClick={() => setSlot('start')}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5, borderRadius: 7,
                        padding: '4px 10px', cursor: 'pointer', minWidth: 160,
                        border: slot === 'start' ? '1.5px solid #009999' : '1px solid #E4EAF4',
                        background: slot === 'start' ? '#F0FFFE' : '#F7F9FC',
                        boxShadow: slot === 'start' ? '0 0 0 3px rgba(0,196,196,.15)' : 'none',
                        transition: 'all .13s',
                      }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8A97B0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span style={{ fontSize: 9.5, fontWeight: 700, color: '#8A97B0', letterSpacing: '.05em', flexShrink: 0 }}>START</span>
                      <input
                        type="text"
                        value={startInput}
                        placeholder="e.g. Jan 1, 2026"
                        onChange={e => setStartInput(e.target.value)}
                        onFocus={() => setSlot('start')}
                        onClick={e => e.stopPropagation()}
                        onBlur={() => {
                          const d = new Date(startInput)
                          if (!isNaN(d.getTime())) {
                            setPendStart(d)
                            const nl = addMonths(d.getFullYear(), d.getMonth(), 0)
                            setLeftY(nl.y); setLeftM(nl.m)
                            const nr = addMonths(nl.y, nl.m, 1)
                            setRightY(nr.y); setRightM(nr.m)
                          }
                        }}
                        onKeyDown={e => {
                          if (e.key !== 'Enter') return
                          e.preventDefault()
                          const d = new Date(startInput)
                          if (!isNaN(d.getTime())) {
                            setPendStart(d)
                            setActiveView('month')
                          }
                        }}
                        style={{ border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 11.5, fontWeight: 600, color: '#0B1437', outline: 'none', width: 98, caretColor: '#009999' }}
                      />
                    </div>

                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A97B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>

                    {/* END pill */}
                    <div
                      onClick={() => setSlot('end')}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 5, borderRadius: 7,
                        padding: '4px 10px', cursor: 'pointer', minWidth: 160,
                        border: slot === 'end' ? '1.5px solid #009999' : '1px solid #E4EAF4',
                        background: slot === 'end' ? '#F0FFFE' : '#F7F9FC',
                        boxShadow: slot === 'end' ? '0 0 0 3px rgba(0,196,196,.15)' : 'none',
                        transition: 'all .13s',
                      }}
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8A97B0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <span style={{ fontSize: 9.5, fontWeight: 700, color: '#8A97B0', letterSpacing: '.05em', flexShrink: 0 }}>END</span>
                      <input
                        type="text"
                        value={endInput}
                        placeholder="e.g. Aug 31, 2026"
                        onChange={e => setEndInput(e.target.value)}
                        onFocus={() => setSlot('end')}
                        onClick={e => e.stopPropagation()}
                        onBlur={() => {
                          const d = new Date(endInput)
                          if (!isNaN(d.getTime())) setPendEnd(d)
                        }}
                        onKeyDown={e => {
                          if (e.key !== 'Enter') return
                          e.preventDefault()
                          const d = new Date(endInput)
                          if (!isNaN(d.getTime())) { setPendEnd(d); setSlot('start') }
                        }}
                        style={{ border: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 11.5, fontWeight: 600, color: '#0B1437', outline: 'none', width: 98, caretColor: '#009999' }}
                      />
                    </div>
                  </div>

                  {/* Apply / Cancel */}
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      onClick={cancel}
                      style={{ padding: '5px 12px', borderRadius: 7, fontSize: 11.5, fontWeight: 600, border: '1px solid #E4EAF4', background: '#fff', color: '#5B6B8A', cursor: 'pointer', fontFamily: 'inherit' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F7F9FC'}
                      onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                    >Cancel</button>
                    <button
                      onClick={apply}
                      style={{ padding: '5px 16px', borderRadius: 7, fontSize: 11.5, fontWeight: 700, border: 'none', background: '#009999', color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}
                      onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.filter = 'none'}
                    >Apply</button>
                  </div>
                </div>
              </div>
              {/* /footer */}

            </div>
            {/* /main area */}

          </div>
        </div>
      )}
    </div>
  )
}
