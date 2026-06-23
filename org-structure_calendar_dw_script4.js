<script>
  (function () {
    /* ─── constants ─────────────────────────────── */
    var MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
    var SHORT  = ['Jan','Feb','Mar','Apr','May','Jun',
                  'Jul','Aug','Sep','Oct','Nov','Dec'];
    var DOWS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

    /* ─── state ──────────────────────────────────── */
    var today   = new Date();
    var todayY  = today.getFullYear();
    var todayM  = today.getMonth();
    var todayD  = today.getDate();

    // Applied range (shown on trigger label)
    var appliedStart = new Date(todayY, todayM - 1, 1);
    var appliedEnd   = new Date(todayY, todayM, todayD);

    // Pending range (inside the open picker, before Apply)
    var pendStart = null;
    var pendEnd   = null;

    // Which slot the next calendar-day click fills
    // 'start' → clicking sets start (and clears end)
    // 'end'   → clicking sets end
    var slot = 'start';

    // Month view: two panes
    var leftY  = todayY,  leftM  = todayM - 1;   // left pane year/month (0-based)
    var rightY = todayY,  rightM = todayM;        // right pane

    // Hover preview for range
    var hoverDate = null;

    // Quarter view
    var qYear = todayY;
    var qSel  = null;   // 0-3 or null

    // Year view
    var yrBase  = todayY - 4;   // first year shown in grid
    var yrPickA = null;         // first year clicked (number)
    var yrPickB = null;         // second year clicked (number)

    var isOpen = false;

    /* ─── tiny helpers ───────────────────────────── */
    function dk(d) {
      return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    }
    function sameDay(a, b) { return a && b && dk(a) === dk(b); }

    function fmtShort(d) {
      if (!d) return '';
      return SHORT[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    }
    function fmtTrigger(s, e) {
      if (!s) return 'Select period';
      var eDate = e || s;
      var dayDiff = Math.round((eDate - s) / 86400000);
      // Single day
      if (sameDay(s, eDate)) {
        var DOW_SHORT = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return DOW_SHORT[s.getDay()] + ', ' + s.getDate() + ' ' + SHORT[s.getMonth()] + ' ' + s.getFullYear();
      }
      // Week range (Sun to Sat, 6 days)
      if (s.getDay() === 0 && dayDiff === 6) {
        return SHORT[s.getMonth()] + ' ' + s.getDate() + ' \u2013 ' + SHORT[eDate.getMonth()] + ' ' + eDate.getDate() + ', ' + eDate.getFullYear();
      }
      // Multi-week span
      if (s.getDay() === 0 && eDate.getDay() === 6) {
        return SHORT[s.getMonth()] + ' ' + s.getDate() + ' \u2013 ' + SHORT[eDate.getMonth()] + ' ' + eDate.getDate() + ', ' + eDate.getFullYear();
      }
      // Same month
      var sm = SHORT[s.getMonth()] + ', ' + s.getFullYear();
      var em = SHORT[eDate.getMonth()] + ', ' + eDate.getFullYear();
      return sm === em ? sm : sm + ' \u2013 ' + em;
    }
    function parseInput(str) {
      if (!str || !str.trim()) return null;
      var d = new Date(str.trim());
      return isNaN(d.getTime()) ? null : d;
    }
    // Normalise month arithmetic (JS Date handles overflow correctly)
    function addMonths(y, m, delta) {
      var d = new Date(y, m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    }

    /* ─── sync footer inputs ─────────────────────── */
    function syncInputs() {
      var si = document.getElementById('calStartInput');
      var ei = document.getElementById('calEndInput');
      if (si) { si.value = fmtShort(pendStart); si.style.color = '#0B1437'; }
      if (ei) { ei.value = fmtShort(pendEnd);   ei.style.color = '#0B1437'; }
    }

    /* ─── footer pill highlight + hint ──────────── */
    function updateFooter() {
      var sp   = document.getElementById('calStartPill');
      var ep   = document.getElementById('calEndPill');
      var hint = document.getElementById('calStatusHint');
      if (!sp || !ep || !hint) return;

      var ON  = 'border:1.5px solid #009999;box-shadow:0 0 0 3px rgba(0,196,196,.15);background:#F0FFFE;';
      var OFF = 'border:1px solid #E4EAF4;box-shadow:none;background:#F7F9FC;';

      // Use data-base-style stored once so we never corrupt border-radius etc.
      function setStyle(el, extra) {
        if (!el.dataset.baseStyle) {
          el.dataset.baseStyle = el.getAttribute('style') || '';
        }
        el.setAttribute('style', el.dataset.baseStyle + ';' + extra);
      }

      setStyle(sp, slot === 'start' ? ON : OFF);
      setStyle(ep, slot === 'end'   ? ON : OFF);

      if (pendStart && pendEnd) {
        hint.textContent = '\u2713 Range selected \u2014 press Apply or adjust';
      } else if (slot === 'end') {
        hint.textContent = '\uD83D\uDC46 Now click a day to set the end date';
      } else {
        hint.textContent = pendStart
          ? '\u2713 Start set \u2014 click END pill or pick end date on calendar'
          : '\uD83D\uDC46 Click a day to set the start date';
      }
    }

    /* ─── MONTH VIEW renderer ────────────────────── */
    function buildPane(containerId, y, m, isLeft) {
      var firstDow    = new Date(y, m, 1).getDay();
      var daysInMonth = new Date(y, m + 1, 0).getDate();

      var sk = pendStart ? dk(pendStart) : null;
      var ek = pendEnd   ? dk(pendEnd)   : null;
      var hk = hoverDate ? dk(hoverDate) : null;
      // Range end for highlight: real end or hover preview
      var rangeEk = ek != null ? ek : (sk != null && slot === 'end' ? hk : null);

      var h = '';

      // ── pane header ──
      h += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">';
      if (isLeft) {
        h += '<button class="cal-nav-btn" onclick="CAL.navMonth(-1)">\u2039</button>';
      } else {
        h += '<span style="display:inline-block;width:26px;"></span>';
      }
      h += '<span style="font-size:12px;font-weight:700;color:#0B1437;">' + MONTHS[m] + ' ' + y + '</span>';
      if (!isLeft) {
        h += '<button class="cal-nav-btn" onclick="CAL.navMonth(1)">\u203a</button>';
      } else {
        h += '<span style="display:inline-block;width:26px;"></span>';
      }
      h += '</div>';

      // ── day-of-week row ──
      h += '<div class="cal-grid-hdr">';
      DOWS.forEach(function (d) { h += '<div class="cal-dow-lbl">' + d + '</div>'; });
      h += '</div>';

      // ── day grid ──
      h += '<div class="cal-grid">';
      for (var i = 0; i < firstDow; i++) {
        h += '<button class="cal-day-cell cal-empty" tabindex="-1"></button>';
      }
      for (var d = 1; d <= daysInMonth; d++) {
        var dkey = y * 10000 + (m + 1) * 100 + d;
        var isToday  = (y === todayY && m === todayM && d === todayD);
        var isStart  = (sk != null && dkey === sk);
        var isEnd    = (ek != null && dkey === ek);
        var inRange  = false;
        if (sk != null && rangeEk != null) {
          var lo = Math.min(sk, rangeEk), hi = Math.max(sk, rangeEk);
          if (dkey > lo && dkey < hi) inRange = true;
        }
        var cls = 'cal-day-cell';
        if (isToday) cls += ' cal-today';
        if (isStart) cls += ' cal-range-start';
        if (isEnd)   cls += ' cal-range-end';
        if (inRange) cls += ' cal-in-range';

        h += '<button class="' + cls + '"'
           + ' onmouseenter="CAL.hover(' + y + ',' + m + ',' + d + ')"'
           + ' onmousedown="CAL.dayClick(' + y + ',' + m + ',' + d + ')">'
           + d + '</button>';
      }
      h += '</div>';

      document.getElementById(containerId).innerHTML = h;
    }

    function renderMonth() {
      buildPane('calLeft',  leftY,  leftM,  true);
      buildPane('calRight', rightY, rightM, false);
      syncInputs();
      updateFooter();
    }

    /* ─── QUARTER VIEW renderer ──────────────────── */
    function renderQuarter() {
      document.getElementById('calQYearNum').textContent = qYear;
      var qs = ['Q1\u2003Jan\u2013Mar', 'Q2\u2003Apr\u2013Jun',
                'Q3\u2003Jul\u2013Sep', 'Q4\u2003Oct\u2013Dec'];

      // Determine which quarters are start/end/in-range
      var startQKey = pendStart ? pendStart.getFullYear() * 10 + Math.floor(pendStart.getMonth() / 3) : null;
      var endQKey   = pendEnd   ? pendEnd.getFullYear()   * 10 + Math.floor(pendEnd.getMonth()   / 3) : null;

      document.getElementById('calQGrid').innerHTML = qs.map(function (lbl, i) {
        var qkey = qYear * 10 + i;
        var isStart = (startQKey != null && qkey === startQKey);
        var isEnd   = (endQKey   != null && qkey === endQKey);
        var inRange = (startQKey != null && endQKey != null
                       && qkey > Math.min(startQKey, endQKey)
                       && qkey < Math.max(startQKey, endQKey));
        var cls = 'cal-q-btn'
          + (isStart || isEnd ? ' cal-active' : '')
          + (inRange ? ' cal-yr-inrange' : '');
        return '<button class="' + cls + '" onclick="CAL.selectQ(' + i + ')">' + lbl + '</button>';
      }).join('');
      syncInputs();
      updateFooter();
    }

    /* ─── HALF-YEAR VIEW ─────────────────────────── */
    var hyYear = todayY;

    function renderHY() {
      document.getElementById('calHYYearNum').textContent = hyYear;
      var halves = [
        { lbl: 'H1\u2003Jan \u2013 Jun', startM: 0, endM: 5 },
        { lbl: 'H2\u2003Jul \u2013 Dec', startM: 6, endM: 11 }
      ];

      var startHKey = pendStart ? pendStart.getFullYear() * 10 + (pendStart.getMonth() < 6 ? 1 : 2) : null;
      var endHKey   = pendEnd   ? pendEnd.getFullYear()   * 10 + (pendEnd.getMonth()   < 6 ? 1 : 2) : null;

      document.getElementById('calHYGrid').innerHTML = halves.map(function(h, i) {
        var hkey = hyYear * 10 + (i + 1);
        var isStart = (startHKey != null && hkey === startHKey);
        var isEnd   = (endHKey   != null && hkey === endHKey);
        var inRange = (startHKey != null && endHKey != null
                       && hkey > Math.min(startHKey, endHKey)
                       && hkey < Math.max(startHKey, endHKey));
        var cls = 'cal-q-btn'
          + (isStart || isEnd ? ' cal-active' : '')
          + (inRange ? ' cal-yr-inrange' : '');
        return '<button class="' + cls + '" onclick="CAL.selectHY(' + i + ')">' + h.lbl + '</button>';
      }).join('');
      syncInputs();
      updateFooter();
    }

    /* ─── YEAR VIEW renderer ─────────────────────── */
    function renderYears() {
      document.getElementById('calYearRangeLabel').textContent =
        yrBase + ' \u2013 ' + (yrBase + 11);
      var h = '';
      for (var y = yrBase; y < yrBase + 12; y++) {
        var isSel = (yrPickA != null && y === yrPickA) ||
                    (yrPickB != null && y === yrPickB);
        var inRng = false;
        if (yrPickA != null && yrPickB != null) {
          var lo = Math.min(yrPickA, yrPickB), hi = Math.max(yrPickA, yrPickB);
          if (y > lo && y < hi) inRng = true;
        }
        var cls = 'cal-yr-btn';
        if (isSel) cls += ' cal-active';
        if (inRng) cls += ' cal-yr-inrange';
        h += '<button class="' + cls + '" onclick="CAL.selectYear(' + y + ')">' + y + '</button>';
      }
      document.getElementById('calYearGrid').innerHTML = h;
      syncInputs();
      updateFooter();
    }

    /* ─── DAILY view state & renderer ───────────── */
    var dailyY = todayY, dailyM = todayM;   // pane month for daily view
    var dailyHover = null;                   // hover preview date

    function renderDaily() {
      var y = dailyY, m = dailyM;
      var firstDow    = new Date(y, m, 1).getDay();
      var daysInMonth = new Date(y, m + 1, 0).getDate();
      var sk = pendStart ? dk(pendStart) : null;
      var ek = pendEnd   ? dk(pendEnd)   : null;
      var hk = dailyHover ? dk(dailyHover) : null;
      var rangeEk = ek != null ? ek : (sk != null && slot === 'end' ? hk : null);

      var h = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">';
      h += '<button class="cal-nav-btn" onclick="CAL.navDailyMonth(-1)">\u2039</button>';
      h += '<span style="font-size:12px;font-weight:700;color:#0B1437;">' + MONTHS[m] + ' ' + y + '</span>';
      h += '<button class="cal-nav-btn" onclick="CAL.navDailyMonth(1)">\u203a</button>';
      h += '</div>';

      h += '<div class="cal-grid-hdr">';
      DOWS.forEach(function(d){ h += '<div class="cal-dow-lbl">' + d + '</div>'; });
      h += '</div>';

      h += '<div class="cal-grid">';
      for (var i = 0; i < firstDow; i++) h += '<button class="cal-day-cell cal-empty" tabindex="-1"></button>';
      for (var d = 1; d <= daysInMonth; d++) {
        var dkey = y * 10000 + (m + 1) * 100 + d;
        var isToday  = (y === todayY && m === todayM && d === todayD);
        var isStart  = (sk != null && dkey === sk);
        var isEnd    = (ek != null && dkey === ek);
        var inRange  = false;
        if (sk != null && rangeEk != null) {
          var lo = Math.min(sk, rangeEk), hi = Math.max(sk, rangeEk);
          if (dkey > lo && dkey < hi) inRange = true;
        }
        var cls = 'cal-day-cell'
          + (isToday  ? ' cal-today'       : '')
          + (isStart  ? ' cal-range-start' : '')
          + (isEnd    ? ' cal-range-end'   : '')
          + (inRange  ? ' cal-in-range'    : '');
        h += '<button class="' + cls + '"'
           + ' onmouseenter="CAL.hoverDaily(' + y + ',' + m + ',' + d + ')"'
           + ' onmousedown="CAL.dayClickDaily(' + y + ',' + m + ',' + d + ')">'
           + d + '</button>';
      }
      h += '</div>';

      document.getElementById('calDailyPane').innerHTML = h;
      syncInputs();
      updateFooter();
    }

    /* ─── WEEKLY view state & renderer ──────────── */
    var weeklyY = todayY, weeklyM = todayM;
    var weekHoverD = null;
    var weekSlotA  = null;   // first week clicked (Date = the Sunday of that week)

    function getWeekBounds(d) {
      var dow = d.getDay();
      var sun = new Date(d.getFullYear(), d.getMonth(), d.getDate() - dow);
      var sat = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (6 - dow));
      return { sun: sun, sat: sat };
    }

    function renderWeekly() {
      var y = weeklyY, m = weeklyM;
      var firstDow    = new Date(y, m, 1).getDay();
      var daysInMonth = new Date(y, m + 1, 0).getDate();

      // Determine highlighted range: pendStart..pendEnd OR hover preview
      var hWB  = weekHoverD ? getWeekBounds(weekHoverD) : null;
      var selSun = pendStart ? dk(getWeekBounds(pendStart).sun) : null;
      var selSat = pendEnd   ? dk(getWeekBounds(pendEnd).sat)   : null;
      // Hover preview: if first week selected (slot=end), preview range to hovered week
      var previewSun = null, previewSat = null;
      if (weekSlotA && !pendEnd && hWB) {
        var wA = dk(weekSlotA);
        var wH = dk(hWB.sun);
        previewSun = Math.min(wA, wH);
        previewSat = Math.max(dk(getWeekBounds(weekHoverD).sat),
                              dk(getWeekBounds(new Date(weekSlotA.getFullYear(), weekSlotA.getMonth(), weekSlotA.getDate() + 6)).sat));
        // simpler: just compare start/end suns
        if (wH < wA) {
          previewSun = wH;
          previewSat = dk(getWeekBounds(new Date(weekSlotA.getFullYear(), weekSlotA.getMonth(), weekSlotA.getDate() + 6)).sat);
        } else {
          previewSun = wA;
          previewSat = dk(hWB.sat);
        }
      }

      var h = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">';
      h += '<button class="cal-nav-btn" onclick="CAL.navWeeklyMonth(-1)">\u2039</button>';
      h += '<span style="font-size:12px;font-weight:700;color:#0B1437;">' + MONTHS[m] + ' ' + y + '</span>';
      h += '<button class="cal-nav-btn" onclick="CAL.navWeeklyMonth(1)">\u203a</button>';
      h += '</div>';

      h += '<div class="cal-grid-hdr">';
      DOWS.forEach(function(d){ h += '<div class="cal-dow-lbl">' + d + '</div>'; });
      h += '</div>';

      h += '<div class="cal-grid">';
      for (var i = 0; i < firstDow; i++) h += '<button class="cal-day-cell cal-empty" tabindex="-1"></button>';
      for (var d = 1; d <= daysInMonth; d++) {
        var dkey = y * 10000 + (m + 1) * 100 + d;
        var isToday = (y === todayY && m === todayM && d === todayD);

        // Applied range highlight
        var isAppliedStart = (selSun != null && dkey === selSun);
        var isAppliedEnd   = (selSat != null && dkey === selSat);
        var inApplied      = (selSun != null && selSat != null && dkey > selSun && dkey < selSat);

        // Hover preview highlight (overrides applied if hovering)
        var isPreStart = (previewSun != null && dkey === previewSun);
        var isPreEnd   = (previewSat != null && dkey === previewSat);
        var inPre      = (previewSun != null && previewSat != null && dkey > previewSun && dkey < previewSat);

        var isStart = isPreStart || (!previewSun && isAppliedStart);
        var isEnd   = isPreEnd   || (!previewSun && isAppliedEnd);
        var inRange = inPre      || (!previewSun && inApplied);

        var cls = 'cal-day-cell'
          + (isToday ? ' cal-today'       : '')
          + (isStart ? ' cal-range-start' : '')
          + (isEnd   ? ' cal-range-end'   : '')
          + (inRange ? ' cal-in-range'    : '');
        h += '<button class="' + cls + '"'
           + ' onmouseenter="CAL.hoverWeek(' + y + ',' + m + ',' + d + ')"'
           + ' onmouseleave="CAL.hoverWeekLeave()"'
           + ' onmousedown="CAL.dayClickWeekly(' + y + ',' + m + ',' + d + ')">'
           + d + '</button>';
      }
      h += '</div>';

      var hint = weekSlotA && !pendEnd
        ? 'Start week set \u2014 click end week'
        : (pendStart && pendEnd ? '\u2713 Week range selected' : '\uD83D\uDC46 Click a week to set start');
      h += '<p style="margin:6px 0 2px;font-size:10.5px;color:#009999;text-align:center;font-weight:600;">' + hint + '</p>';

      document.getElementById('calWeeklyPane').innerHTML = h;
      syncInputs();
      updateFooter();
    }

    /* ─── view switcher ──────────────────────────── */
    function switchView(v) {
      ['daily','weekly','month','quarter','hy','year'].forEach(function (name) {
        var tab = document.getElementById('calTab_' + name);
        if (tab) tab.className = 'cal-type-tab' + (name === v ? ' active' : '');
      });
      document.getElementById('calDailyView').style.display   = v === 'daily'   ? 'block' : 'none';
      document.getElementById('calWeeklyView').style.display  = v === 'weekly'  ? 'block' : 'none';
      document.getElementById('calMonthView').style.display   = v === 'month'   ? 'flex'  : 'none';
      document.getElementById('calQuarterView').style.display = v === 'quarter' ? 'block' : 'none';
      document.getElementById('calHYView').style.display      = v === 'hy'      ? 'block' : 'none';
      document.getElementById('calYearView').style.display    = v === 'year'    ? 'block' : 'none';
      if (v === 'daily')   renderDaily();
      if (v === 'weekly')  renderWeekly();
      if (v === 'month')   renderMonth();
      if (v === 'quarter') renderQuarter();
      if (v === 'hy')      renderHY();
      if (v === 'year')    renderYears();
    }

    /* ─── PUBLIC API (window.CAL) ────────────────── */
    window.CAL = {

      // Month pane navigation — right always follows left+1
      navMonth: function (dir) {
        var nl = addMonths(leftY, leftM, dir);
        leftY  = nl.y; leftM  = nl.m;
        var nr = addMonths(leftY, leftM, 1);
        rightY = nr.y; rightM = nr.m;
        renderMonth();
      },

      // Hover preview
      hover: function (y, m, d) {
        var newHover = new Date(y, m, d);
        if (hoverDate && dk(hoverDate) === dk(newHover)) return; // no change, skip re-render
        hoverDate = newHover;
        if (pendStart && !pendEnd && slot === 'end') renderMonth();
      },

      // Day click — two-click range selection
      dayClick: function (y, m, d) {
        var clicked = new Date(y, m, d);
        // Clear any active preset highlight
        document.querySelectorAll('.cal-preset-btn')
          .forEach(function (b) { b.classList.remove('cal-active'); });

        if (slot === 'start') {
          pendStart = clicked;
          pendEnd   = null;
          hoverDate = null;
          slot = 'end';
        } else {
          // slot === 'end'
          if (pendStart && dk(clicked) < dk(pendStart)) {
            // Clicked before start → swap
            pendEnd   = new Date(pendStart);
            pendStart = clicked;
          } else {
            pendEnd = clicked;
          }
          hoverDate = null;
          slot = 'start';
        }
        renderMonth();
      },

      // View tabs
      setView: function (v) { switchView(v); },

      // Daily pane nav
      navDailyMonth: function (dir) {
        var nl = addMonths(dailyY, dailyM, dir);
        dailyY = nl.y; dailyM = nl.m;
        renderDaily();
      },

      // Daily hover
      hoverDaily: function (y, m, d) {
        var newHover = new Date(y, m, d);
        if (dailyHover && dk(dailyHover) === dk(newHover)) return;
        dailyHover = newHover;
        if (pendStart && !pendEnd && slot === 'end') renderDaily();
      },

      // Daily 2-click: click 1 = start day, click 2 = end day
      dayClickDaily: function (y, m, d) {
        document.querySelectorAll('.cal-preset-btn')
          .forEach(function(b){ b.classList.remove('cal-active'); });
        var clicked = new Date(y, m, d);
        dailyHover = null;
        if (slot === 'start') {
          pendStart = clicked;
          pendEnd   = null;
          slot = 'end';
        } else {
          if (pendStart && dk(clicked) < dk(pendStart)) {
            pendEnd = new Date(pendStart); pendStart = clicked;
          } else {
            pendEnd = clicked;
          }
          slot = 'start';
        }
        renderDaily();
      },

      // Weekly pane nav
      navWeeklyMonth: function (dir) {
        var nl = addMonths(weeklyY, weeklyM, dir);
        weeklyY = nl.y; weeklyM = nl.m;
        renderWeekly();
      },

      // Weekly hover
      hoverWeek: function (y, m, d) {
        var newHover = new Date(y, m, d);
        if (weekHoverD && dk(weekHoverD) === dk(newHover)) return;
        weekHoverD = newHover;
        renderWeekly();
      },
      hoverWeekLeave: function () {
        weekHoverD = null;
        renderWeekly();
      },

      // Weekly 2-click: click 1 = start week (Sun), click 2 = end week (Sat)
      dayClickWeekly: function (y, m, d) {
        document.querySelectorAll('.cal-preset-btn')
          .forEach(function(b){ b.classList.remove('cal-active'); });
        var wb = getWeekBounds(new Date(y, m, d));
        weekHoverD = null;
        if (slot === 'start' || !weekSlotA) {
          weekSlotA = wb.sun;
          pendStart = wb.sun;
          pendEnd   = null;
          slot = 'end';
        } else {
          // Second click — determine order
          var firstSun = weekSlotA;
          var secondSat = wb.sat;
          if (dk(wb.sun) < dk(firstSun)) {
            pendStart = wb.sun;
            pendEnd   = getWeekBounds(firstSun).sat;
          } else {
            pendStart = firstSun;
            pendEnd   = secondSat;
          }
          weekSlotA = null;
          slot = 'start';
        }
        renderWeekly();
      },

      // Quarter 2-click: click 1 = start quarter, click 2 = end quarter
      shiftQYear: function (dir) { qYear += dir; renderQuarter(); },
      selectQ: function (qi) {
        if (slot === 'start' || !pendStart) {
          pendStart = new Date(qYear, qi * 3, 1);
          pendEnd   = null;
          qSel      = qi;
          slot      = 'end';
        } else {
          var startQ = Math.floor(pendStart.getMonth() / 3);
          var startQKey = pendStart.getFullYear() * 10 + startQ;
          var thisQKey  = qYear * 10 + qi;
          if (thisQKey < startQKey) {
            // clicked before start → swap
            var oldStart = new Date(pendStart);
            pendStart = new Date(qYear, qi * 3, 1);
            pendEnd   = new Date(oldStart.getFullYear(), startQ * 3 + 3, 0);
          } else {
            pendEnd = new Date(qYear, qi * 3 + 3, 0);
          }
          qSel = null;
          slot = 'start';
        }
        renderQuarter();
      },

      // HY nav / select
      shiftHYYear: function (dir) { hyYear += dir; renderHY(); },
      selectHY: function (hi) {
        var startM = hi === 0 ? 0 : 6;
        var endM   = hi === 0 ? 5 : 11;
        if (slot === 'start' || !pendStart) {
          pendStart = new Date(hyYear, startM, 1);
          pendEnd   = null;
          slot      = 'end';
        } else {
          var startHKey = pendStart.getFullYear() * 10 + (pendStart.getMonth() < 6 ? 1 : 2);
          var thisHKey  = hyYear * 10 + (hi + 1);
          if (thisHKey < startHKey) {
            var oldStart = new Date(pendStart);
            pendStart = new Date(hyYear, startM, 1);
            var oHalf = oldStart.getMonth() < 6 ? 5 : 11;
            pendEnd   = new Date(oldStart.getFullYear(), oHalf + 1, 0);
          } else {
            pendEnd = new Date(hyYear, endM + 1, 0);
          }
          slot = 'start';
        }
        renderHY();
      },

      // Year nav / select
      shiftYears: function (dir) { yrBase += dir * 12; renderYears(); },
      selectYear: function (y) {
        if (yrPickA === null || (yrPickA !== null && yrPickB !== null)) {
          // First pick
          yrPickA   = y;
          yrPickB   = null;
          pendStart = new Date(y, 0, 1);
          pendEnd   = null;
          slot      = 'end';
        } else {
          // Second pick
          yrPickB = y;
          var lo  = Math.min(yrPickA, yrPickB);
          var hi  = Math.max(yrPickA, yrPickB);
          pendStart = new Date(lo, 0, 1);
          pendEnd   = new Date(hi, 11, 31);
          slot      = 'start';
        }
        renderYears();
      },

      // Footer pill click
      focusSlot: function (s) {
        var active = document.activeElement && document.activeElement.id;
        if (active === 'calStartInput' || active === 'calEndInput') return;
        slot = s;
        updateFooter();
        setTimeout(function () {
          var el = document.getElementById(s === 'start' ? 'calStartInput' : 'calEndInput');
          if (el) el.focus();
        }, 0);
      },

      // Input field handlers
      inputFocus: function (s) { slot = s; updateFooter(); },

      commitStart: function () {
        var si = document.getElementById('calStartInput');
        if (!si || document.activeElement === si) return;
        var d = parseInput(si.value);
        if (d) {
          pendStart = d;
          // Navigate left pane to that month
          leftY = d.getFullYear(); leftM = d.getMonth();
          var nr = addMonths(leftY, leftM, 1);
          rightY = nr.y; rightM = nr.m;
          si.style.color = '#0B1437';
          renderMonth();
        } else if (si.value.trim()) {
          si.style.color = '#e53e3e';
        }
      },

      commitEnd: function () {
        var ei = document.getElementById('calEndInput');
        if (!ei || document.activeElement === ei) return;
        var d = parseInput(ei.value);
        if (d) {
          pendEnd = d;
          ei.style.color = '#0B1437';
          // If end date is outside visible range, navigate right pane to it
          var endKey = dk(d);
          var rightFirst = new Date(rightY, rightM, 1);
          var rightLast  = new Date(rightY, rightM + 1, 0);
          if (endKey < dk(new Date(leftY, leftM, 1)) || endKey > dk(rightLast)) {
            // Navigate so end month shows on right
            var nr = { y: d.getFullYear(), m: d.getMonth() };
            var nl = addMonths(nr.y, nr.m, -1);
            leftY = nl.y; leftM = nl.m;
            rightY = nr.y; rightM = nr.m;
          }
          renderMonth();
        } else if (ei.value.trim()) {
          ei.style.color = '#e53e3e';
        }
      },

      inputKey: function (e, s) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        var inputId = s === 'start' ? 'calStartInput' : 'calEndInput';
        var el = document.getElementById(inputId);
        var d  = parseInput(el ? el.value : '');
        if (d) {
          if (s === 'start') {
            pendStart = d;
            leftY = d.getFullYear(); leftM = d.getMonth();
            var nr = addMonths(leftY, leftM, 1);
            rightY = nr.y; rightM = nr.m;
            el.style.color = '#0B1437';
            renderMonth();
            var ei = document.getElementById('calEndInput');
            if (ei) ei.focus();
          } else {
            pendEnd = d;
            el.style.color = '#0B1437';
            // Navigate if needed
            var endKey2 = dk(d);
            var rightLast2 = new Date(rightY, rightM + 1, 0);
            if (endKey2 < dk(new Date(leftY, leftM, 1)) || endKey2 > dk(rightLast2)) {
              var nr2 = { y: d.getFullYear(), m: d.getMonth() };
              var nl2 = addMonths(nr2.y, nr2.m, -1);
              leftY = nl2.y; leftM = nl2.m;
              rightY = nr2.y; rightM = nr2.m;
            }
            renderMonth();
            el.blur();
          }
        } else if (el && el.value.trim()) {
          el.style.color = '#e53e3e';
        }
      },

      // Preset sidebar
      applyPreset: function (key, btn) {
        document.querySelectorAll('.cal-preset-btn')
          .forEach(function (b) { b.classList.remove('cal-active'); });
        if (btn) btn.classList.add('cal-active');

        var y = todayY, m = todayM, d = todayD;
        var qm = Math.floor(m / 3) * 3;
        var todayDow = today.getDay();
        var map = {
          'today':     [new Date(y,m,d),          new Date(y,m,d)],
          'yesterday': [new Date(y,m,d-1),         new Date(y,m,d-1)],
          '7d':        [new Date(y,m,d-6),         new Date(y,m,d)],
          '30d':       [new Date(y,m,d-29),        new Date(y,m,d)],
          '90d':       [new Date(y,m,d-89),        new Date(y,m,d)],
          'thisWeek':  [new Date(y,m,d-todayDow),  new Date(y,m,d-todayDow+6)],
          'lastWeek':  [new Date(y,m,d-todayDow-7),new Date(y,m,d-todayDow-1)],
          'thisMonth': [new Date(y,m,1),           new Date(y,m+1,0)],
          'thisQ':     [new Date(y,qm,1),          new Date(y,qm+3,0)],
          'thisYear':  [new Date(y,0,1),           new Date(y,11,31)],
          'lastMonth': [new Date(y,m-1,1),         new Date(y,m,0)],
          'lastQ':     qm > 0
                         ? [new Date(y,qm-3,1), new Date(y,qm,0)]
                         : [new Date(y-1,9,1),  new Date(y,0,0)],
          'lastYear':  [new Date(y-1,0,1),         new Date(y-1,11,31)]
        };
        var pair = map[key] || [null, null];
        pendStart = pair[0];
        pendEnd   = pair[1];
        slot      = 'start';
        qSel      = null;
        yrPickA   = null; yrPickB = null;
        weekHoverD = null; weekSlotA = null; dailyHover = null;

        if (pendStart) {
          leftY = pendStart.getFullYear(); leftM = pendStart.getMonth();
          var nr = addMonths(leftY, leftM, 1);
          rightY = nr.y; rightM = nr.m;
          dailyY  = pendStart.getFullYear(); dailyM  = pendStart.getMonth();
          weeklyY = pendStart.getFullYear(); weeklyM = pendStart.getMonth();
          hyYear  = pendStart.getFullYear();
        }

        // Auto-switch to the appropriate view
        var targetView = 'month';
        if (key === 'today' || key === 'yesterday') targetView = 'daily';
        else if (key === 'thisWeek' || key === 'lastWeek') targetView = 'weekly';
        switchView(targetView);
      },

      // Apply
      apply: function () {
        if (!pendStart) return;
        appliedStart = pendStart;
        appliedEnd   = pendEnd || new Date(pendStart);
        document.getElementById('calTriggerLabel').textContent =
          fmtTrigger(appliedStart, appliedEnd);
        CAL.close();
      },

      // Cancel
      cancel: function () {
        hoverDate  = null;
        weekHoverD = null;
        weekSlotA  = null;
        dailyHover = null;
        slot       = 'start';
        CAL.close();
      },

      // Open / close
      open: function () {
        var btn   = document.getElementById('calTriggerBtn');
        var panel = document.getElementById('calPickerPanel');
        var r     = btn.getBoundingClientRect();
        var pw    = Math.min(700, window.innerWidth - 20);
        var left  = r.right - pw;
        if (left < 10) left = 10;
        panel.style.cssText = 'display:block;position:fixed;z-index:99999;top:'
          + (r.bottom + 8) + 'px;left:' + left + 'px;width:' + pw + 'px;'
          + 'background:#fff;border-radius:14px;border:1px solid #E4EAF4;'
          + 'box-shadow:0 8px 40px rgba(11,20,55,.18),0 2px 10px rgba(11,20,55,.08);'
          + 'overflow:hidden;font-family:\'Trebuchet MS\',Trebuchet,sans-serif;';
        // Start fresh — don't pre-fill; user picks start then end
        pendStart = null;
        pendEnd   = null;
        hoverDate = null;
        slot      = 'start';
        qSel      = null;
        yrPickA   = null; yrPickB = null;
        dailyHover = null; weekHoverD = null; weekSlotA = null;
        hyYear = appliedStart.getFullYear();
        leftY  = appliedStart.getFullYear(); leftM  = appliedStart.getMonth();
        dailyY = appliedStart.getFullYear(); dailyM = appliedStart.getMonth();
        weeklyY = appliedStart.getFullYear(); weeklyM = appliedStart.getMonth();
        var nr = addMonths(leftY, leftM, 1);
        rightY = nr.y; rightM = nr.m;
        isOpen = true;
        switchView('month');
      },

      close: function () {
        isOpen = false;
        var panel = document.getElementById('calPickerPanel');
        if (panel) panel.style.display = 'none';
      },

      toggle: function (e) {
        e.stopPropagation();
        if (isOpen) { CAL.close(); } else { CAL.open(); }
      }
    };

    // Close on outside mousedown
    document.addEventListener('mousedown', function (e) {
      if (!isOpen) return;
      var panel = document.getElementById('calPickerPanel');
      var btn   = document.getElementById('calTriggerBtn');
      if (panel && !panel.contains(e.target) && btn && !btn.contains(e.target)) {
        CAL.close();
      }
    });

    // Init trigger label
    document.getElementById('calTriggerLabel').textContent =
      fmtTrigger(appliedStart, appliedEnd);

  }());
  </script>