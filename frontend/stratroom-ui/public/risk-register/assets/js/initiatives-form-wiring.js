/**
 * Initiatives register wiring — export, audit cleanup, expand-row detail load.
 */
(function (global) {
  if (!global.InitiativesApiBridge || !global.InitiativesApiBridge.enabled) return;

  var bridge = global.InitiativesApiBridge;

  function exportInitiativesRegister() {
    var rows = global.__initiativesRows || [];
    if (!rows.length) {
      alert('No initiatives to export.');
      return;
    }
    var header = ['Id', 'Name', 'Department', 'Progress', 'Start', 'End', 'Perspective', 'Objective'];
    var lines = [header.join(',')];
    rows.forEach(function (row) {
      lines.push([
        csv(row.id),
        csv(row.title),
        csv(row.department),
        csv(row.progress && row.progress.value),
        csv(row.startDate),
        csv(row.endDate),
        csv(row.perspective),
        csv(row.objective)
      ].join(','));
    });
    var blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'initiatives-register.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function csv(value) {
    var text = value == null ? '' : String(value);
    if (text.indexOf('"') >= 0 || text.indexOf(',') >= 0 || text.indexOf('\n') >= 0) {
      return '"' + text.replace(/"/g, '""') + '"';
    }
    return text;
  }

  global.exportInitiativesRegister = exportInitiativesRegister;

  function init() {
    document.querySelectorAll('.modal-audit .audit-box .text').forEach(function (el) {
      if (el.textContent === 'Arun' || el.textContent === 'Karthik' || el.textContent === 'Oct 02, 2019') {
        el.textContent = '-';
      }
    });

    var exportBtn = document.getElementById('initiatives-export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', function (e) {
        e.preventDefault();
        exportInitiativesRegister();
      });
    }

    if (global.jQuery) {
      global.jQuery(document).on('click', '.chevron-btn[data-bs-target^="#panel-"]', function () {
        var target = global.jQuery(this).attr('data-bs-target') || '';
        var id = target.replace('#panel-', '');
        if (!id) return;
        var row = (global.__initiativesRows || []).find(function (r) { return String(r.id) === String(id); });
        if (!row || row._detailLoaded) return;
        bridge.loadInitiativeDetail(id).then(function (detail) {
          Object.assign(row, detail);
          row._detailLoaded = true;
          var panel = document.querySelector(target + ' .panel-inner');
          if (panel && typeof global.renderTablePanel === 'function') {
            panel.innerHTML = global.renderTablePanel(row);
            if (global.lucide) global.lucide.createIcons();
          }
        }).catch(function () { /* optional */ });
      });
    }
  }

  if (global.jQuery) global.jQuery(init);
  else document.addEventListener('DOMContentLoaded', init);
})(window);
