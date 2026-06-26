/**
 * Compliance register UI wiring — tabs, audit, export, save.
 */
(function (global) {
  if (!global.ComplianceApiBridge || !global.ComplianceApiBridge.enabled) return;

  var bridge = global.ComplianceApiBridge;

  function currentUserName() {
    try {
      var profile = JSON.parse(localStorage.getItem('profile') || 'null');
      if (!profile) return '-';
      var parts = [profile.firstName, profile.lastName].filter(Boolean);
      return parts.length ? parts.join(' ') : (profile.name || profile.email || '-');
    } catch (e) {
      return '-';
    }
  }

  function formatToday() {
    return new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  }

  function setAuditFooter(modalEl, data) {
    if (!modalEl) return;
    var audit = modalEl.querySelector('.modal-audit');
    if (!audit) return;
    audit.querySelectorAll('.audit-box').forEach(function (box) {
      var label = (box.querySelector('.title') || {}).textContent || '';
      var textEl = box.querySelector('.text');
      if (!textEl) return;
      if (label.indexOf('Created By') >= 0) textEl.textContent = data.createdBy || '-';
      if (label.indexOf('Modified By') >= 0) textEl.textContent = data.modifiedBy || '-';
      if (label.indexOf('Created Date') >= 0) textEl.textContent = data.createdDate || '-';
      if (label.indexOf('Modified Date') >= 0) textEl.textContent = data.modifiedDate || '-';
    });
  }

  function buildTabs(areas) {
    var $header = global.jQuery ? global.jQuery('#complianceTabsHeader') : null;
    if (!$header || !$header.length) return;

    $header.empty();
    var list = (areas || []).filter(function (a) { return a && a.name; });
    if (!list.length) {
      $header.append('<li class="nav-item"><button class="nav-link active" data-area="All">All</button></li>');
      global.jQuery('#complianceCardTitle').text('Compliance');
      return;
    }

    list.forEach(function (area, idx) {
      var active = idx === 0 ? ' active' : '';
      var name = area.name;
      $header.append(
        '<li class="nav-item"><button class="nav-link' + active + '" data-area="' + name + '">' + name + '</button></li>'
      );
    });
    global.jQuery('#complianceCardTitle').text(list[0].name);

    if (global.jQuery.fn.DataTable && global.jQuery.fn.DataTable.isDataTable('#table-compliance')) {
      var dt = global.jQuery('#table-compliance').DataTable();
      dt.column(3).search('^' + list[0].name + '$', true, false).draw();
    }
  }

  function exportComplianceRegister() {
    var rows = global.__complianceRows || [];
    if (!rows.length && global.jQuery && global.jQuery.fn.DataTable && global.jQuery.fn.DataTable.isDataTable('#table-compliance')) {
      rows = global.jQuery('#table-compliance').DataTable().rows({ search: 'applied' }).data().toArray();
    }
    if (!rows.length) {
      alert('No compliance records to export.');
      return;
    }

    var header = ['Control ID', 'Description', 'Area', 'Regulation', 'Risk Level', 'Status', 'Last Assessment', 'Next Review'];
    var lines = [header.join(',')];
    rows.forEach(function (row) {
      if (row.isPlaceholder) return;
      lines.push([
        csv(row.controllerDataId),
        csv(row.control_description),
        csv(row.compliance_area),
        csv(row.regulation),
        csv(row.risk_level),
        csv(row.status),
        csv(row.last_assessment_date),
        csv(row.next_review_date)
      ].join(','));
    });

    var blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'compliance-register.csv';
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

  function activeAreaId() {
    var active = global.jQuery ? global.jQuery('#complianceTabsHeader .nav-link.active') : null;
    var areaName = active && active.length ? active.data('area') : null;
    var areas = global.__complianceAreas || [];
    var match = areas.find(function (a) { return a.name === areaName; });
    return match ? match.id : (areas[0] && areas[0].id);
  }

  function saveCompliance() {
    var empId = bridge.getEmpId();
    if (!empId) {
      alert('Please log in to save compliance records.');
      return;
    }

    var regEl = document.getElementById('applicableRegulation-add');
    var regulations = regEl
      ? Array.prototype.map.call(regEl.selectedOptions, function (o) { return o.value || o.textContent; }).join(', ')
      : '';

    var payload = {
      createdBy: empId,
      owner: empId,
      complainAreaId: activeAreaId(),
      pageId: bridge.getPageId() ? Number(bridge.getPageId()) : 0,
      complainValue: {
        desc: (document.getElementById('controlDescription-add') || {}).value || '',
        controlId: (document.getElementById('controlID-add') || {}).value || '',
        controlDescription: (document.getElementById('controlDescription-add') || {}).value || '',
        complianceArea: (document.getElementById('complianceArea-add') || {}).value || '',
        applicableRegulations: regulations,
        riskLevel: (document.getElementById('riskLevel-add') || {}).value || '',
        status: (document.getElementById('taskStatus-add') || {}).value || '',
        controlType: (document.getElementById('controlType-add') || {}).value || '',
        implementationStatus: (document.getElementById('implementationStatus-add') || {}).value || '',
        lastAssessmentDate: (document.getElementById('lastAssessmentDate-add') || {}).value || '',
        nextReviewDate: (document.getElementById('nextReviewDate-add') || {}).value || '',
        actionDueDate: (document.getElementById('actionDueDate-add') || {}).value || '',
        lastAuditDate: (document.getElementById('lastAuditDate-add') || {}).value || '',
        auditRequired: (document.getElementById('auditRequired-add') || {}).value || '',
        auditFindings: (document.getElementById('auditFindings-add') || {}).value || '',
        correctiveActions: (document.getElementById('correctiveActions-add') || {}).value || '',
        evidenceFileReference: (document.getElementById('evidenceFileReference-add') || {}).value || '',
        notes: (document.getElementById('notes-add') || {}).value || ''
      }
    };

    if (!payload.complainValue.desc) {
      alert('Control name or description is required.');
      return;
    }

    bridge.apiFetch('/compliance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function () {
      var modalEl = document.getElementById('task-add-modal');
      if (modalEl && global.bootstrap) {
        global.bootstrap.Modal.getOrCreateInstance(modalEl).hide();
      }
      if (global.jQuery && global.jQuery.fn.DataTable && global.jQuery.fn.DataTable.isDataTable('#table-compliance')) {
        global.jQuery('#table-compliance').DataTable().ajax.reload();
      }
    }).catch(function (err) {
      alert('Failed to save compliance: ' + (err.message || err));
    });
  }

  function reloadTable() {
    if (global.jQuery && global.jQuery.fn.DataTable && global.jQuery.fn.DataTable.isDataTable('#table-compliance')) {
      global.jQuery('#table-compliance').DataTable().ajax.reload(null, false);
    }
  }

  global.exportComplianceRegister = exportComplianceRegister;
  global.reloadComplianceTable = reloadTable;

  function populateAreaSelect(areas) {
    var select = document.getElementById('complianceArea-add');
    if (!select) return;
    var current = select.value;
    select.innerHTML = '<option value="" selected disabled>Select Compliance Area</option>';
    (areas || []).forEach(function (area) {
      if (!area || !area.name) return;
      var opt = document.createElement('option');
      opt.value = area.name;
      opt.textContent = area.name;
      opt.dataset.areaId = area.id;
      select.appendChild(opt);
    });
    if (current) select.value = current;
  }

  function init() {
    document.querySelectorAll('.modal-audit .audit-box .text').forEach(function (el) {
      if (el.textContent === 'Arun' || el.textContent === 'Karthik' || el.textContent === 'Oct 02, 2019') {
        el.textContent = '-';
      }
    });

    var addModal = document.getElementById('task-add-modal');
    if (addModal) {
      addModal.addEventListener('show.bs.modal', function () {
        setAuditFooter(addModal, {
          createdBy: currentUserName(),
          modifiedBy: '-',
          createdDate: formatToday(),
          modifiedDate: '-'
        });
      });
      var saveBtn = addModal.querySelector('.modal-footer .btn-primary');
      if (saveBtn) {
        saveBtn.addEventListener('click', function (e) {
          e.preventDefault();
          saveCompliance();
        });
      }
    }

    var exportBtn = document.getElementById('compliance-export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', function (e) {
        e.preventDefault();
        exportComplianceRegister();
      });
    }

    if (global.jQuery) {
      global.jQuery(document).on('compliance:data-loaded', function (_e, areas) {
        buildTabs(areas || []);
        populateAreaSelect(areas || []);
      });
    }
  }

  if (global.jQuery) {
    global.jQuery(init);
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})(window);
