import React, { useState, useEffect, useRef, useMemo } from 'react';
import './DatePeriodPicker.css';

const STORAGE_KEY = 'customperiod';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const SHORT  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DOWS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const DOW_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const today = new Date();
const todayY = today.getFullYear();
const todayM = today.getMonth();
const todayD = today.getDate();

function dk(d) {
  if (!d) return null;
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function sameDay(a, b) {
  return a && b && dk(a) === dk(b);
}

function fmtShort(d) {
  if (!d) return '';
  return `${SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function fmtTrigger(s, e) {
  if (!s) return 'Select period';
  const eDate = e || s;
  const dayDiff = Math.round((eDate - s) / 86400000);
  
  if (sameDay(s, eDate)) {
    return `${DOW_SHORT[s.getDay()]}, ${s.getDate()} ${SHORT[s.getMonth()]} ${s.getFullYear()}`;
  }
  if (s.getDay() === 0 && dayDiff === 6) {
    return `${SHORT[s.getMonth()]} ${s.getDate()} \u2013 ${SHORT[eDate.getMonth()]} ${eDate.getDate()}, ${eDate.getFullYear()}`;
  }
  if (s.getDay() === 0 && eDate.getDay() === 6) {
    return `${SHORT[s.getMonth()]} ${s.getDate()} \u2013 ${SHORT[eDate.getMonth()]} ${eDate.getDate()}, ${eDate.getFullYear()}`;
  }
  const sm = `${SHORT[s.getMonth()]}, ${s.getFullYear()}`;
  const em = `${SHORT[eDate.getMonth()]}, ${eDate.getFullYear()}`;
  return sm === em ? sm : `${sm} \u2013 ${em}`;
}

function parseInput(str) {
  if (!str || !str.trim()) return null;
  const d = new Date(str.trim());
  return isNaN(d.getTime()) ? null : d;
}

function addMonths(y, m, delta) {
  const d = new Date(y, m + delta, 1);
  return { y: d.getFullYear(), m: d.getMonth() };
}

function getWeekBounds(d) {
  const dow = d.getDay();
  const sun = new Date(d.getFullYear(), d.getMonth(), d.getDate() - dow);
  const sat = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (6 - dow));
  return { sun, sat };
}

export default function DatePeriodPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const initial = useMemo(() => {
    const v = localStorage.getItem(STORAGE_KEY);
    const m = /^(\d{2})\/(\d{2})\/(\d{4})-(\d{2})\/(\d{2})\/(\d{4})$/.exec(v || '');
    if (m) {
      return { 
        start: new Date(+m[3], +m[1] - 1, +m[2]), 
        end: new Date(+m[6], +m[4] - 1, +m[5]) 
      };
    }
    return { start: new Date(todayY, 0, 1), end: new Date(todayY, 11, 31) };
  }, []);

  const [appliedStart, setAppliedStart] = useState(initial.start);
  const [appliedEnd, setAppliedEnd] = useState(initial.end);

  const [view, setView] = useState('month'); // daily, weekly, month, quarter, hy, year
  const [slot, setSlot] = useState('start');

  const [pendStart, setPendStart] = useState(null);
  const [pendEnd, setPendEnd] = useState(null);

  // Month panes
  const [leftY, setLeftY] = useState(todayY);
  const [leftM, setLeftM] = useState(todayM - 1);
  const [rightY, setRightY] = useState(todayY);
  const [rightM, setRightM] = useState(todayM);

  const [dailyY, setDailyY] = useState(todayY);
  const [dailyM, setDailyM] = useState(todayM);
  
  const [weeklyY, setWeeklyY] = useState(todayY);
  const [weeklyM, setWeeklyM] = useState(todayM);

  const [hoverDate, setHoverDate] = useState(null);
  const [dailyHover, setDailyHover] = useState(null);
  const [weekHoverD, setWeekHoverD] = useState(null);
  const [weekSlotA, setWeekSlotA] = useState(null);

  const [qYear, setQYear] = useState(todayY);
  const [hyYear, setHyYear] = useState(todayY);
  const [yrBase, setYrBase] = useState(todayY - 4);
  
  const [yrPickA, setYrPickA] = useState(null);
  const [yrPickB, setYrPickB] = useState(null);

  const [startInputVal, setStartInputVal] = useState('');
  const [endInputVal, setEndInputVal] = useState('');

  // Sync inputs when pendStart / pendEnd change
  useEffect(() => {
    setStartInputVal(fmtShort(pendStart));
    setEndInputVal(fmtShort(pendEnd));
  }, [pendStart, pendEnd]);

  useEffect(() => {
    if (!isOpen) return;
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [isOpen]);

  const openPicker = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    setPendStart(null);
    setPendEnd(null);
    setHoverDate(null);
    setSlot('start');
    setYrPickA(null);
    setYrPickB(null);
    setDailyHover(null);
    setWeekHoverD(null);
    setWeekSlotA(null);

    const ay = appliedStart.getFullYear();
    const am = appliedStart.getMonth();
    setHyYear(ay);
    setLeftY(ay);
    setLeftM(am);
    setDailyY(ay);
    setDailyM(am);
    setWeeklyY(ay);
    setWeeklyM(am);
    const nr = addMonths(ay, am, 1);
    setRightY(nr.y);
    setRightM(nr.m);
    setView('month');
    setIsOpen(true);
  };

  const apply = () => {
    if (!pendStart) return;
    const s = pendStart;
    const e = pendEnd || new Date(pendStart);
    setAppliedStart(s);
    setAppliedEnd(e);
    
    // Formatting MM/DD/YYYY
    const pad = (n) => String(n).padStart(2, '0');
    const fDate = (d) => `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`;
    localStorage.setItem(STORAGE_KEY, `${fDate(s)}-${fDate(e)}`);
    setIsOpen(false);
    window.location.reload();
  };

  const cancel = () => {
    setIsOpen(false);
  };

  const handleApplyPreset = (key) => {
    const y = todayY, m = todayM, d = todayD;
    const qm = Math.floor(m / 3) * 3;
    const dow = today.getDay();
    
    const map = {
      'today':     [new Date(y, m, d), new Date(y, m, d)],
      'yesterday': [new Date(y, m, d - 1), new Date(y, m, d - 1)],
      '7d':        [new Date(y, m, d - 6), new Date(y, m, d)],
      '30d':       [new Date(y, m, d - 29), new Date(y, m, d)],
      '90d':       [new Date(y, m, d - 89), new Date(y, m, d)],
      'thisWeek':  [new Date(y, m, d - dow), new Date(y, m, d - dow + 6)],
      'lastWeek':  [new Date(y, m, d - dow - 7), new Date(y, m, d - dow - 1)],
      'thisMonth': [new Date(y, m, 1), new Date(y, m + 1, 0)],
      'thisQ':     [new Date(y, qm, 1), new Date(y, qm + 3, 0)],
      'thisYear':  [new Date(y, 0, 1), new Date(y, 11, 31)],
      'lastMonth': [new Date(y, m - 1, 1), new Date(y, m, 0)],
      'lastQ':     qm > 0 ? [new Date(y, qm - 3, 1), new Date(y, qm, 0)] : [new Date(y - 1, 9, 1), new Date(y, 0, 0)],
      'lastYear':  [new Date(y - 1, 0, 1), new Date(y - 1, 11, 31)]
    };
    
    const pair = map[key] || [null, null];
    setPendStart(pair[0]);
    setPendEnd(pair[1]);
    setSlot('start');
    setYrPickA(null);
    setYrPickB(null);
    setWeekHoverD(null);
    setWeekSlotA(null);
    setDailyHover(null);
    
    if (pair[0]) {
      const sy = pair[0].getFullYear();
      const sm = pair[0].getMonth();
      setLeftY(sy); setLeftM(sm);
      const nr = addMonths(sy, sm, 1);
      setRightY(nr.y); setRightM(nr.m);
      setDailyY(sy); setDailyM(sm);
      setWeeklyY(sy); setWeeklyM(sm);
      setHyYear(sy);
    }
    
    let tv = 'month';
    if (key === 'today' || key === 'yesterday') tv = 'daily';
    else if (key === 'thisWeek' || key === 'lastWeek') tv = 'weekly';
    setView(tv);
  };

  // Navigations
  const navMonth = (dir) => {
    const nl = addMonths(leftY, leftM, dir);
    setLeftY(nl.y); setLeftM(nl.m);
    const nr = addMonths(nl.y, nl.m, 1);
    setRightY(nr.y); setRightM(nr.m);
  };
  
  const navDaily = (dir) => {
    const nl = addMonths(dailyY, dailyM, dir);
    setDailyY(nl.y); setDailyM(nl.m);
  };

  const navWeekly = (dir) => {
    const nl = addMonths(weeklyY, weeklyM, dir);
    setWeeklyY(nl.y); setWeeklyM(nl.m);
  };

  // Click Handlers
  const handleDayClick = (y, m, d) => {
    const clicked = new Date(y, m, d);
    if (slot === 'start') {
      setPendStart(clicked);
      setPendEnd(null);
      setHoverDate(null);
      setSlot('end');
    } else {
      if (pendStart && dk(clicked) < dk(pendStart)) {
        setPendEnd(new Date(pendStart));
        setPendStart(clicked);
      } else {
        setPendEnd(clicked);
      }
      setHoverDate(null);
      setSlot('start');
    }
  };

  const handleDailyClick = (y, m, d) => {
    const clicked = new Date(y, m, d);
    setDailyHover(null);
    if (slot === 'start') {
      setPendStart(clicked);
      setPendEnd(null);
      setSlot('end');
    } else {
      if (pendStart && dk(clicked) < dk(pendStart)) {
        setPendEnd(new Date(pendStart));
        setPendStart(clicked);
      } else {
        setPendEnd(clicked);
      }
      setSlot('start');
    }
  };

  const handleWeeklyClick = (y, m, d) => {
    const wb = getWeekBounds(new Date(y, m, d));
    setWeekHoverD(null);
    if (slot === 'start' || !weekSlotA) {
      setWeekSlotA(wb.sun);
      setPendStart(wb.sun);
      setPendEnd(null);
      setSlot('end');
    } else {
      const firstSun = weekSlotA;
      const secondSat = wb.sat;
      if (dk(wb.sun) < dk(firstSun)) {
        setPendStart(wb.sun);
        setPendEnd(getWeekBounds(firstSun).sat);
      } else {
        setPendStart(firstSun);
        setPendEnd(secondSat);
      }
      setWeekSlotA(null);
      setSlot('start');
    }
  };

  const handleQClick = (qi) => {
    if (slot === 'start' || !pendStart) {
      setPendStart(new Date(qYear, qi * 3, 1));
      setPendEnd(null);
      setSlot('end');
    } else {
      const startQ = Math.floor(pendStart.getMonth() / 3);
      const startQKey = pendStart.getFullYear() * 10 + startQ;
      const thisQKey = qYear * 10 + qi;
      if (thisQKey < startQKey) {
        const oldS = new Date(pendStart);
        setPendStart(new Date(qYear, qi * 3, 1));
        setPendEnd(new Date(oldS.getFullYear(), startQ * 3 + 3, 0));
      } else {
        setPendEnd(new Date(qYear, qi * 3 + 3, 0));
      }
      setSlot('start');
    }
  };

  const handleHYClick = (hi) => {
    const startM = hi === 0 ? 0 : 6;
    const endM = hi === 0 ? 5 : 11;
    if (slot === 'start' || !pendStart) {
      setPendStart(new Date(hyYear, startM, 1));
      setPendEnd(null);
      setSlot('end');
    } else {
      const startHKey = pendStart.getFullYear() * 10 + (pendStart.getMonth() < 6 ? 1 : 2);
      const thisHKey = hyYear * 10 + (hi + 1);
      if (thisHKey < startHKey) {
        const oldS = new Date(pendStart);
        setPendStart(new Date(hyYear, startM, 1));
        const oHalf = oldS.getMonth() < 6 ? 5 : 11;
        setPendEnd(new Date(oldS.getFullYear(), oHalf + 1, 0));
      } else {
        setPendEnd(new Date(hyYear, endM + 1, 0));
      }
      setSlot('start');
    }
  };

  const handleYearClick = (y) => {
    if (yrPickA === null || (yrPickA !== null && yrPickB !== null)) {
      setYrPickA(y);
      setYrPickB(null);
      setPendStart(new Date(y, 0, 1));
      setPendEnd(null);
      setSlot('end');
    } else {
      setYrPickB(y);
      const lo = Math.min(yrPickA, y);
      const hi = Math.max(yrPickA, y);
      setPendStart(new Date(lo, 0, 1));
      setPendEnd(new Date(hi, 11, 31));
      setSlot('start');
    }
  };

  // Render month grid helper
  const renderMonthGrid = (y, m, clickHandler, hoverHandler, hoverState, isWeekly = false) => {
    const firstDow = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    const sk = pendStart ? dk(pendStart) : null;
    const ek = pendEnd ? dk(pendEnd) : null;
    const hk = hoverState ? dk(hoverState) : null;
    const rangeEk = ek != null ? ek : (sk != null && slot === 'end' ? hk : null);

    let selSun = null, selSat = null, previewSun = null, previewSat = null;
    if (isWeekly) {
      const hWB = hoverState ? getWeekBounds(hoverState) : null;
      selSun = pendStart ? dk(getWeekBounds(pendStart).sun) : null;
      selSat = pendEnd ? dk(getWeekBounds(pendEnd).sat) : null;
      if (weekSlotA && !pendEnd && hWB) {
        const wA = dk(weekSlotA);
        const wH = dk(hWB.sun);
        if (wH < wA) {
          previewSun = wH;
          previewSat = dk(getWeekBounds(new Date(weekSlotA.getFullYear(), weekSlotA.getMonth(), weekSlotA.getDate() + 6)).sat);
        } else {
          previewSun = wA;
          previewSat = dk(hWB.sat);
        }
      }
    }

    const cells = [];
    for (let i = 0; i < firstDow; i++) {
      cells.push(<button key={`empty-${i}`} className="cal-day-cell cal-empty" tabIndex="-1" disabled></button>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dkey = y * 10000 + (m + 1) * 100 + d;
      const isTdy = (y === todayY && m === todayM && d === todayD);
      let isStart = false, isEnd = false, inRange = false;

      if (isWeekly) {
        const isAppliedStart = (selSun != null && dkey === selSun);
        const isAppliedEnd = (selSat != null && dkey === selSat);
        const inApplied = (selSun != null && selSat != null && dkey > selSun && dkey < selSat);
        
        const isPreStart = (previewSun != null && dkey === previewSun);
        const isPreEnd = (previewSat != null && dkey === previewSat);
        const inPre = (previewSun != null && previewSat != null && dkey > previewSun && dkey < previewSat);

        isStart = isPreStart || (!previewSun && isAppliedStart);
        isEnd = isPreEnd || (!previewSun && isAppliedEnd);
        inRange = inPre || (!previewSun && inApplied);
      } else {
        isStart = (sk != null && dkey === sk);
        isEnd = (ek != null && dkey === ek);
        if (sk != null && rangeEk != null) {
          const lo = Math.min(sk, rangeEk), hi = Math.max(sk, rangeEk);
          if (dkey > lo && dkey < hi) inRange = true;
        }
      }

      let cls = 'cal-day-cell';
      if (isTdy) cls += ' cal-today';
      if (isStart) cls += ' cal-range-start';
      if (isEnd) cls += ' cal-range-end';
      if (inRange) cls += ' cal-in-range';

      cells.push(
        <button
          key={d}
          className={cls}
          onMouseEnter={() => hoverHandler && hoverHandler(new Date(y, m, d))}
          onMouseLeave={() => hoverHandler && hoverHandler(null)}
          onMouseDown={() => clickHandler(y, m, d)}
        >
          {d}
        </button>
      );
    }

    return (
      <>
        <div className="cal-grid-hdr">
          {DOWS.map(d => <div key={d} className="cal-dow-lbl">{d}</div>)}
        </div>
        <div className="cal-grid">
          {cells}
        </div>
      </>
    );
  };

  const getHint = () => {
    if (pendStart && pendEnd) return '\u2713 Range selected \u2014 press Apply or adjust';
    if (slot === 'end') return '\uD83D\uDC46 Now click a day to set the end date';
    return pendStart 
      ? '\u2713 Start set \u2014 click END pill or pick end date on calendar'
      : '\uD83D\uDC46 Click a day to set the start date';
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        id="calTriggerBtn"
        className="top_datepicker form-control form-control-sm d-inline-flex align-items-center justify-content-between gap-2"
        onClick={openPicker}
        style={{ minWidth: 175, fontSize: 12, cursor: 'pointer', textAlign: 'start' }}
      >
        <span id="calTriggerLabel">{fmtTrigger(appliedStart, appliedEnd)}</span>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {isOpen && (
        <div id="calPickerPanel" style={{
          display: 'block', position: 'absolute', zIndex: 99999, top: 'calc(100% + 8px)', right: 0,
          width: Math.min(700, window.innerWidth - 20), background: '#fff', borderRadius: 14,
          border: '1px solid #E4EAF4', boxShadow: '0 8px 40px rgba(11,20,55,.18), 0 2px 10px rgba(11,20,55,.08)',
          overflow: 'hidden', fontFamily: "'Trebuchet MS', Trebuchet, sans-serif"
        }}>
          <div style={{ display: 'flex' }}>
            {/* Sidebar */}
            <div style={{ width: 156, flexShrink: 0, borderRight: '1px solid #F0F3FA', padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto', maxHeight: 460 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: '#8A97B0', letterSpacing: '.08em', padding: '4px 8px 2px' }}>DAILY</div>
              <button className="cal-preset-btn" onClick={() => handleApplyPreset('today')}>Today</button>
              <button className="cal-preset-btn" onClick={() => handleApplyPreset('yesterday')}>Yesterday</button>
              <div style={{ height: 1, background: '#F0F3FA', margin: '5px 4px' }}></div>
              
              <div style={{ fontSize: 9.5, fontWeight: 700, color: '#8A97B0', letterSpacing: '.08em', padding: '4px 8px 2px' }}>WEEKLY</div>
              <button className="cal-preset-btn" onClick={() => handleApplyPreset('thisWeek')}>This week</button>
              <button className="cal-preset-btn" onClick={() => handleApplyPreset('lastWeek')}>Last week</button>
              <div style={{ height: 1, background: '#F0F3FA', margin: '5px 4px' }}></div>
              
              <div style={{ fontSize: 9.5, fontWeight: 700, color: '#8A97B0', letterSpacing: '.08em', padding: '4px 8px 2px' }}>RANGE</div>
              <button className="cal-preset-btn" onClick={() => handleApplyPreset('7d')}>Last 7 days</button>
              <button className="cal-preset-btn" onClick={() => handleApplyPreset('30d')}>Last 30 days</button>
              <button className="cal-preset-btn" onClick={() => handleApplyPreset('90d')}>Last 90 days</button>
              <div style={{ height: 1, background: '#F0F3FA', margin: '5px 4px' }}></div>
              
              <div style={{ fontSize: 9.5, fontWeight: 700, color: '#8A97B0', letterSpacing: '.08em', padding: '4px 8px 2px' }}>THIS PERIOD</div>
              <button className="cal-preset-btn" onClick={() => handleApplyPreset('thisMonth')}>This month</button>
              <button className="cal-preset-btn" onClick={() => handleApplyPreset('thisQ')}>This quarter</button>
              <button className="cal-preset-btn" onClick={() => handleApplyPreset('thisYear')}>This year</button>
              <div style={{ height: 1, background: '#F0F3FA', margin: '5px 4px' }}></div>
              
              <div style={{ fontSize: 9.5, fontWeight: 700, color: '#8A97B0', letterSpacing: '.08em', padding: '4px 8px 2px' }}>PREVIOUS</div>
              <button className="cal-preset-btn" onClick={() => handleApplyPreset('lastMonth')}>Last month</button>
              <button className="cal-preset-btn" onClick={() => handleApplyPreset('lastQ')}>Last quarter</button>
              <button className="cal-preset-btn" onClick={() => handleApplyPreset('lastYear')}>Last year</button>
            </div>

            {/* Main Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              {/* Tabs */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 14px 0' }}>
                {['daily','weekly','month','quarter','hy','year'].map(v => (
                  <button key={v} className={`cal-type-tab ${view === v ? 'active' : ''}`} onClick={() => setView(v)}>
                    {v === 'daily' ? 'Daily' : v === 'weekly' ? 'Weekly' : v === 'month' ? 'Month' : v === 'quarter' ? 'Quarter' : v === 'hy' ? 'Half-Year' : 'Year'}
                  </button>
                ))}
              </div>

              {/* View Bodies */}
              {view === 'daily' && (
                <div style={{ display: 'block' }}>
                  <div style={{ padding: '10px 12px', maxWidth: 260 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <button className="cal-nav-btn" onClick={() => navDaily(-1)}>{'\u2039'}</button>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#0B1437' }}>{MONTHS[dailyM]} {dailyY}</span>
                      <button className="cal-nav-btn" onClick={() => navDaily(1)}>{'\u203a'}</button>
                    </div>
                    {renderMonthGrid(dailyY, dailyM, handleDailyClick, setDailyHover, dailyHover, false)}
                  </div>
                  <p style={{ margin: '0 0 8px', fontSize: 10.5, color: '#8A97B0', textAlign: 'center', padding: '0 12px' }}>Click a day to select it</p>
                </div>
              )}

              {view === 'weekly' && (
                <div style={{ display: 'block' }}>
                  <div style={{ padding: '10px 12px', maxWidth: 260 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <button className="cal-nav-btn" onClick={() => navWeekly(-1)}>{'\u2039'}</button>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#0B1437' }}>{MONTHS[weeklyM]} {weeklyY}</span>
                      <button className="cal-nav-btn" onClick={() => navWeekly(1)}>{'\u203a'}</button>
                    </div>
                    {renderMonthGrid(weeklyY, weeklyM, handleWeeklyClick, setWeekHoverD, weekHoverD, true)}
                  </div>
                  <p style={{ margin: '6px 0 2px', fontSize: 10.5, color: '#009999', textAlign: 'center', fontWeight: 600 }}>
                    {weekSlotA && !pendEnd ? 'Start week set \u2014 click end week' : (pendStart && pendEnd ? '\u2713 Week range selected' : '\uD83D\uDC46 Click a week to set start')}
                  </p>
                </div>
              )}

              {view === 'month' && (
                <div style={{ display: 'flex' }}>
                  <div style={{ flex: 1, padding: '10px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <button className="cal-nav-btn" onClick={() => navMonth(-1)}>{'\u2039'}</button>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#0B1437' }}>{MONTHS[leftM]} {leftY}</span>
                      <span style={{ display: 'inline-block', width: 26 }}></span>
                    </div>
                    {renderMonthGrid(leftY, leftM, handleDayClick, setHoverDate, hoverDate, false)}
                  </div>
                  <div style={{ flex: 1, padding: '10px 12px', borderLeft: '1px solid #F0F3FA' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ display: 'inline-block', width: 26 }}></span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#0B1437' }}>{MONTHS[rightM]} {rightY}</span>
                      <button className="cal-nav-btn" onClick={() => navMonth(1)}>{'\u203a'}</button>
                    </div>
                    {renderMonthGrid(rightY, rightM, handleDayClick, setHoverDate, hoverDate, false)}
                  </div>
                </div>
              )}

              {view === 'quarter' && (
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <button className="cal-nav-btn" onClick={() => setQYear(y => y - 1)}>{'\u2039'}</button>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0B1437' }}>{qYear}</span>
                    <button className="cal-nav-btn" onClick={() => setQYear(y => y + 1)}>{'\u203a'}</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
                    {['Q1\u2003Jan\u2013Mar', 'Q2\u2003Apr\u2013Jun', 'Q3\u2003Jul\u2013Sep', 'Q4\u2003Oct\u2013Dec'].map((lbl, i) => {
                      const qkey = qYear * 10 + i;
                      const startQKey = pendStart ? pendStart.getFullYear() * 10 + Math.floor(pendStart.getMonth() / 3) : null;
                      const endQKey = pendEnd ? pendEnd.getFullYear() * 10 + Math.floor(pendEnd.getMonth() / 3) : null;
                      const isStart = (startQKey != null && qkey === startQKey);
                      const isEnd = (endQKey != null && qkey === endQKey);
                      const inRange = (startQKey != null && endQKey != null && qkey > Math.min(startQKey, endQKey) && qkey < Math.max(startQKey, endQKey));
                      let cls = 'cal-q-btn';
                      if (isStart || isEnd) cls += ' cal-active';
                      if (inRange) cls += ' cal-yr-inrange';
                      return <button key={i} className={cls} onClick={() => handleQClick(i)}>{lbl}</button>;
                    })}
                  </div>
                  <p style={{ margin: '10px 0 0', fontSize: 10.5, color: '#8A97B0', textAlign: 'center' }}>Click start quarter, then end quarter</p>
                </div>
              )}

              {view === 'hy' && (
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <button className="cal-nav-btn" onClick={() => setHyYear(y => y - 1)}>{'\u2039'}</button>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0B1437' }}>{hyYear}</span>
                    <button className="cal-nav-btn" onClick={() => setHyYear(y => y + 1)}>{'\u203a'}</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8 }}>
                    {[{lbl: 'H1\u2003Jan \u2013 Jun'}, {lbl: 'H2\u2003Jul \u2013 Dec'}].map((h, i) => {
                      const hkey = hyYear * 10 + (i + 1);
                      const startHKey = pendStart ? pendStart.getFullYear() * 10 + (pendStart.getMonth() < 6 ? 1 : 2) : null;
                      const endHKey = pendEnd ? pendEnd.getFullYear() * 10 + (pendEnd.getMonth() < 6 ? 1 : 2) : null;
                      const isStart = (startHKey != null && hkey === startHKey);
                      const isEnd = (endHKey != null && hkey === endHKey);
                      const inRange = (startHKey != null && endHKey != null && hkey > Math.min(startHKey, endHKey) && hkey < Math.max(startHKey, endHKey));
                      let cls = 'cal-q-btn';
                      if (isStart || isEnd) cls += ' cal-active';
                      if (inRange) cls += ' cal-yr-inrange';
                      return <button key={i} className={cls} onClick={() => handleHYClick(i)}>{h.lbl}</button>;
                    })}
                  </div>
                  <p style={{ margin: '10px 0 0', fontSize: 10.5, color: '#8A97B0', textAlign: 'center' }}>Click start half, then end half</p>
                </div>
              )}

              {view === 'year' && (
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <button className="cal-nav-btn" onClick={() => setYrBase(y => y - 12)}>{'\u2039'}</button>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0B1437' }}>{yrBase} \u2013 {yrBase + 11}</span>
                    <button className="cal-nav-btn" onClick={() => setYrBase(y => y + 12)}>{'\u203a'}</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
                    {Array.from({length: 12}).map((_, i) => {
                      const y = yrBase + i;
                      const isSel = (yrPickA != null && y === yrPickA) || (yrPickB != null && y === yrPickB);
                      let inRng = false;
                      if (yrPickA != null && yrPickB != null) {
                        const lo = Math.min(yrPickA, yrPickB), hi = Math.max(yrPickA, yrPickB);
                        if (y > lo && y < hi) inRng = true;
                      }
                      let cls = 'cal-yr-btn';
                      if (isSel) cls += ' cal-active';
                      if (inRng) cls += ' cal-yr-inrange';
                      return <button key={y} className={cls} onClick={() => handleYearClick(y)}>{y}</button>;
                    })}
                  </div>
                  <p style={{ margin: '10px 0 0', fontSize: 10.5, color: '#8A97B0', textAlign: 'center' }}>Click one year for start, click another for end</p>
                </div>
              )}

              {/* Footer */}
              <div style={{ borderTop: '1px solid #F0F3FA' }}>
                <div style={{ padding: '5px 14px 0', fontSize: 10.5, fontWeight: 600, color: '#009999', minHeight: 20 }}>
                  {getHint()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 14px 10px', flexWrap: 'wrap', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div onClick={() => setSlot('start')} style={{
                      display: 'flex', alignItems: 'center', gap: 5, borderRadius: 7, padding: '4px 10px', cursor: 'pointer', minWidth: 160,
                      border: slot === 'start' ? '1.5px solid #009999' : '1px solid #E4EAF4',
                      background: slot === 'start' ? '#F0FFFE' : '#F7F9FC',
                      boxShadow: slot === 'start' ? '0 0 0 3px rgba(0,196,196,.15)' : 'none'
                    }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8A97B0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      <span style={{ fontSize: 9.5, fontWeight: 700, color: '#8A97B0', letterSpacing: '.05em', flexShrink: 0 }}>START</span>
                      <input type="text" value={startInputVal} onChange={(e) => setStartInputVal(e.target.value)}
                        onFocus={() => setSlot('start')} onBlur={() => { const d = parseInput(startInputVal); if (d) setPendStart(d); }}
                        placeholder="e.g. Jan 1, 2026"
                        style={{ border: 'none', background: 'transparent', fontFamily: "'Trebuchet MS',Trebuchet,sans-serif", fontSize: 11.5, fontWeight: 600, color: '#0B1437', outline: 'none', width: 98, caretColor: '#009999' }} />
                    </div>

                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A97B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>

                    <div onClick={() => setSlot('end')} style={{
                      display: 'flex', alignItems: 'center', gap: 5, borderRadius: 7, padding: '4px 10px', cursor: 'pointer', minWidth: 160,
                      border: slot === 'end' ? '1.5px solid #009999' : '1px solid #E4EAF4',
                      background: slot === 'end' ? '#F0FFFE' : '#F7F9FC',
                      boxShadow: slot === 'end' ? '0 0 0 3px rgba(0,196,196,.15)' : 'none'
                    }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8A97B0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      <span style={{ fontSize: 9.5, fontWeight: 700, color: '#8A97B0', letterSpacing: '.05em', flexShrink: 0 }}>END</span>
                      <input type="text" value={endInputVal} onChange={(e) => setEndInputVal(e.target.value)}
                        onFocus={() => setSlot('end')} onBlur={() => { const d = parseInput(endInputVal); if (d) setPendEnd(d); }}
                        placeholder="e.g. Aug 31, 2026"
                        style={{ border: 'none', background: 'transparent', fontFamily: "'Trebuchet MS',Trebuchet,sans-serif", fontSize: 11.5, fontWeight: 600, color: '#0B1437', outline: 'none', width: 98, caretColor: '#009999' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={cancel} style={{ padding: '5px 12px', borderRadius: 7, fontSize: 11.5, fontWeight: 600, border: '1px solid #E4EAF4', background: '#fff', color: '#5B6B8A', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={apply} style={{ padding: '5px 16px', borderRadius: 7, fontSize: 11.5, fontWeight: 700, border: 'none', background: '#009999', color: '#fff', cursor: 'pointer' }}>Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
