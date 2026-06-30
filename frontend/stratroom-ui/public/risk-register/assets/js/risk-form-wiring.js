/**
 * Replaces demo/hardcoded values in risk_new.html modals with Stratroom API data.
 */
(function (global) {
  if (!global.RiskApiBridge || !global.RiskApiBridge.enabled) return;

  var bridge = global.RiskApiBridge;
  var riskOptions = [];
  var customScores = [];
  var impactMap = new Map();
  var likelihoodMap = new Map();
  var riskMatrix = {};

  function profile() {
    try {
      var raw = localStorage.getItem('profile');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function currentUserName() {
    var p = profile();
    if (!p) return '-';
    var parts = [p.firstName, p.lastName].filter(Boolean);
    if (parts.length) return parts.join(' ');
    return p.name || p.email || '-';
  }

  function formatToday() {
    return new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  }

  function setAuditFooter(modalEl, data) {
    if (!modalEl) return;
    var audit = modalEl.querySelector('.modal-audit');
    if (!audit) return;
    var boxes = audit.querySelectorAll('.audit-box');
    boxes.forEach(function (box) {
      var label = (box.querySelector('.title') || {}).textContent || '';
      var textEl = box.querySelector('.text');
      if (!textEl) return;
      if (label.indexOf('Created By') >= 0) textEl.textContent = data.createdBy || '-';
      if (label.indexOf('Modified By') >= 0) textEl.textContent = data.modifiedBy || '-';
      if (label.indexOf('Created Date') >= 0) textEl.textContent = data.createdDate || '-';
      if (label.indexOf('Modified Date') >= 0) textEl.textContent = data.modifiedDate || '-';
    });
  }

  function clearSelectOptions(select, keepFirst) {
    if (!select) return;
    var opts = select.querySelectorAll('option');
    for (var i = opts.length - 1; i >= (keepFirst ? 1 : 0); i--) {
      opts[i].remove();
    }
  }

  function appendOption(select, value, text) {
    var opt = document.createElement('option');
    opt.value = value;
    opt.textContent = text;
    select.appendChild(opt);
  }

  function populateDepartments(selectIds) {
    return bridge.loadDepartments().then(function (depts) {
      selectIds.forEach(function (id) {
        var select = document.getElementById(id);
        if (!select) return;
        clearSelectOptions(select, true);
        (depts || []).forEach(function (d) {
          if (!d || d.name == null) return;
          appendOption(select, String(d.id), d.name);
        });
        if (global.jQuery && global.jQuery(select).hasClass('selectdrop-add-risk')) {
          global.jQuery(select).trigger('change.select2');
        }
      });
    });
  }

  function populateRelatedParties(selectId) {
    var empId = bridge.getEmpId();
    if (!empId) return Promise.resolve();
    return bridge.apiFetch('/reporteeList/' + empId).then(function (list) {
      var select = document.getElementById(selectId);
      if (!select || !Array.isArray(list)) return;
      clearSelectOptions(select, true);
      list.forEach(function (emp) {
        var name = [emp.firstName, emp.lastName].filter(Boolean).join(' ') || emp.email || ('Employee ' + emp.empId);
        appendOption(select, String(emp.empId), name);
      });
    }).catch(function () { /* optional */ });
  }

  function populateRiskOptions() {
    return bridge.apiFetch('/riskoptionlist').then(function (list) {
      riskOptions = Array.isArray(list) ? list : [];
      var categorySelects = ['riskadd-impactCategory', 'riskedit-impactCategory'];
      categorySelects.forEach(function (id) {
        var select = document.getElementById(id);
        if (!select) return;
        clearSelectOptions(select, false);
        riskOptions.filter(function (o) { return o.type === 'category'; }).forEach(function (o) {
          appendOption(select, o.value, o.option || o.value);
        });
      });
    });
  }

  function buildRiskMatrix() {
    riskMatrix = {};
    var impacts = customScores.filter(function (c) { return c.priority <= 5; }).map(function (c) { return c.score; });
    var likelihoods = customScores.filter(function (c) { return c.priority >= 6; }).map(function (c) { return c.score; });
    var levels = ['Very Low', 'Low', 'Tolerable', 'High', 'Very High'];
    impacts.forEach(function (impact, i) {
      riskMatrix[impact] = {};
      likelihoods.forEach(function (likelihood, j) {
        riskMatrix[impact][likelihood] = levels[Math.min(i + j, levels.length - 1)];
      });
    });
  }

  function populateCustomScores() {
    return bridge.apiFetch('/riskcustomscore').then(function (list) {
      customScores = Array.isArray(list) ? list : [];
      impactMap = new Map();
      likelihoodMap = new Map();
      customScores.forEach(function (c) {
        if (c.priority > 5) likelihoodMap.set(c.score, c.priority);
        else impactMap.set(c.score, c.priority);
      });
      buildRiskMatrix();

      [
        { id: 'riskadd-impact', type: 'impact' },
        { id: 'riskedit-impact', type: 'impact' },
        { id: 'riskadd-likelihood', type: 'likelihood' },
        { id: 'riskedit-likelihood', type: 'likelihood' }
      ].forEach(function (cfg) {
        var select = document.getElementById(cfg.id);
        if (!select) return;
        clearSelectOptions(select, true);
        customScores.filter(function (c) {
          return cfg.type === 'impact' ? c.priority <= 5 : c.priority >= 6;
        }).forEach(function (c) {
          appendOption(select, c.score, c.description || c.score);
        });
      });
    });
  }

  function recalculateScore(prefix) {
    var impact = (document.getElementById(prefix + '-impact') || {}).value;
    var likelihood = (document.getElementById(prefix + '-likelihood') || {}).value;
    var scoreEl = document.getElementById(prefix + '-riskScore');
    var statusEl = document.getElementById(prefix + '-status');
    if (!scoreEl || !impact || !likelihood) return;
    var level = (riskMatrix[impact] && riskMatrix[impact][likelihood]) || '';
    scoreEl.value = level;
    if (statusEl) statusEl.value = level;
  }

  function getSelectedCategories(selectId) {
    var select = document.getElementById(selectId);
    if (!select) return '';
    if (select.multiple) {
      return Array.prototype.map.call(select.selectedOptions, function (o) { return o.value; }).join(', ');
    }
    return select.value || '';
  }

  function buildRiskPayload(prefix, isEdit) {
    var empId = bridge.getEmpId();
    var deptSelect = document.getElementById(prefix + '-department');
    var deptId = deptSelect && deptSelect.value ? Number(deptSelect.value) : null;
    var params = new URLSearchParams(global.location.search);
    var pageId = params.get('pageId') || '';

    var payload = {
      createdBy: empId,
      owner: empId,
      departmentId: deptId,
      pageId: pageId,
      riskValue: {
        name: (document.querySelector('[name="' + prefix + '-name"]') || document.getElementById(prefix + '-name') || {}).value || '',
        desc: (document.getElementById(prefix + '-description') || {}).value || '',
        riskcategory: getSelectedCategories(prefix + '-impactCategory'),
        impact: (document.getElementById(prefix + '-impact') || {}).value || '',
        likeliHood: (document.getElementById(prefix + '-likelihood') || {}).value || '',
        score: (document.getElementById(prefix + '-riskScore') || {}).value || '',
        riskStatus: (document.getElementById(prefix + '-status') || {}).value || (document.getElementById(prefix + '-riskScore') || {}).value || '',
        relatedparties: (function () {
          var rp = document.getElementById(prefix + '-relatedParties');
          if (!rp || !rp.selectedOptions.length) return '';
          return rp.selectedOptions[0].textContent;
        })(),
        department: deptSelect && deptSelect.selectedOptions[0] ? deptSelect.selectedOptions[0].textContent : '',
        riskpos: (document.getElementById(prefix + '-pos') || {}).value || '',
        riskiso: (document.getElementById(prefix + '-iso') || {}).value || '',
        riskinformationasset: (document.getElementById(prefix + '-informationAsset') || {}).value || '',
        businessImpact: (document.getElementById(prefix + '-businessImpact') || {}).value || '',
        financialImpact: (document.getElementById(prefix + '-financialImpact') || {}).value || '',
        riskothers: (document.getElementById(prefix + '-others') || {}).value || '',
        dateRaised: (document.getElementById(prefix + '-dateRaised') || {}).value || '',
        dateCompleted: (document.getElementById(prefix + '-dateCompleted') || {}).value || '',
        nextAssessment: (document.getElementById(prefix + '-nextAssessment') || {}).value || '',
        riskkpicheck: !!(document.getElementById('riskaddKPI') && document.getElementById('riskaddKPI').checked),
        riskposcheck: !!(document.getElementById('riskaddPOS') && document.getElementById('riskaddPOS').checked),
        riskisocheck: !!(document.getElementById('riskaddISO') && document.getElementById('riskaddISO').checked),
        riskinformatiomassetcheck: !!(document.getElementById('riskaddInformationAsset') && document.getElementById('riskaddInformationAsset').checked),
        riskotherscheck: !!(document.getElementById('riskaddOthers') && document.getElementById('riskaddOthers').checked)
      }
    };

    if (isEdit) {
      payload.id = global.__editingRiskId;
      payload.updatedBy = empId;
    }

    return payload;
  }

  function saveRisk(prefix, isEdit) {
    var payload = buildRiskPayload(prefix, isEdit);
    if (!payload.riskValue.name) {
      alert('Name is required.');
      return;
    }
    bridge.apiFetch('/risk', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function () {
      var modalId = isEdit ? 'risk-edit-modal' : 'risk-add-modal';
      var modalEl = document.getElementById(modalId);
      if (modalEl && global.bootstrap) {
        global.bootstrap.Modal.getOrCreateInstance(modalEl).hide();
      }
      if (typeof global.loadRisks === 'function') global.loadRisks();
    }).catch(function (err) {
      alert('Failed to save risk: ' + (err.message || err));
    });
  }

  function initModalHandlers() {
    var addModal = document.getElementById('risk-add-modal');
    if (addModal) {
      addModal.addEventListener('show.bs.modal', function () {
        setAuditFooter(addModal, {
          createdBy: currentUserName(),
          modifiedBy: '-',
          createdDate: formatToday(),
          modifiedDate: '-'
        });
      });
      var addSave = addModal.querySelector('.modal-footer .btn-primary');
      if (addSave) {
        addSave.addEventListener('click', function (e) {
          e.preventDefault();
          saveRisk('riskadd', false);
        });
      }
    }

    var editModal = document.getElementById('risk-edit-modal');
    if (editModal) {
      editModal.addEventListener('show.bs.modal', function () {
        var risk = (global.DATA || []).find(function (r) { return String(r.id) === String(global.__editingRiskId); });
        var raw = risk && risk._raw;
        var rv = raw && raw.riskValue;
        setAuditFooter(editModal, {
          createdBy: (rv && rv.createdByName) || currentUserName(),
          modifiedBy: (rv && rv.updatedByName) || '-',
          createdDate: (raw && raw.createdTime) ? String(raw.createdTime).split('T')[0] : '-',
          modifiedDate: (raw && raw.updatedTime) ? String(raw.updatedTime).split('T')[0] : '-'
        });
      });
      var editSave = editModal.querySelector('.modal-footer .btn-primary');
      if (editSave) {
        editSave.addEventListener('click', function (e) {
          e.preventDefault();
          saveRisk('riskedit', true);
        });
      }
    }

    ['riskadd', 'riskedit'].forEach(function (prefix) {
      ['impact', 'likelihood'].forEach(function (field) {
        var el = document.getElementById(prefix + '-' + field);
        if (el) el.addEventListener('change', function () { recalculateScore(prefix); });
      });
    });
  }

  function setFieldValue(id, value) {
    var el = document.getElementById(id);
    if (el) el.value = value == null ? '' : value;
  }

  function populateEditForm(risk) {
    if (!risk) return;
    var raw = risk._raw || {};
    var rv = raw.riskValue || {};
    global.__editingRiskId = risk.id;
    setFieldValue('riskedit-code', raw.riskUniqueId || risk.id);
    setFieldValue('riskedit-name', risk.title || rv.name || '');
    setFieldValue('riskedit-description', rv.desc || risk.title || '');
    setFieldValue('riskedit-impact', rv.impact || risk.impact || '');
    setFieldValue('riskedit-likelihood', rv.likeliHood || risk.likelihood || '');
    setFieldValue('riskedit-riskScore', rv.score || risk.riskLevel || '');
    setFieldValue('riskedit-status', rv.riskStatus || risk.status || '');
    setFieldValue('riskedit-pos', rv.riskpos || risk.pos || '');
    setFieldValue('riskedit-iso', rv.riskiso || risk.iso || '');
    setFieldValue('riskedit-informationAsset', rv.riskinformationasset || risk.infoAsset || '');
    setFieldValue('riskedit-businessImpact', rv.businessImpact || risk.businessImpact || '');
    setFieldValue('riskedit-financialImpact', rv.financialImpact || risk.financialImpact || '');
    setFieldValue('riskedit-others', rv.riskothers || risk.others || '');
    setFieldValue('riskedit-dateRaised', rv.dateRaised || risk.dateRaised || '');
    setFieldValue('riskedit-dateCompleted', rv.dateCompleted || risk.dateCompleted || '');
    setFieldValue('riskedit-nextAssessment', rv.nextAssessment || risk.nextAssessment || '');

    var deptSelect = document.getElementById('riskedit-department');
    if (deptSelect && risk.department) {
      Array.prototype.forEach.call(deptSelect.options, function (opt) {
        if (opt.textContent === risk.department) deptSelect.value = opt.value;
      });
    }
  }

  global.openEditRisk = function (id) {
    var risk = (global.DATA || []).find(function (r) { return String(r.id) === String(id); });
    if (!risk) return;
    var finish = function () { populateEditForm(risk); };
    if (!risk._detailLoaded && bridge.loadRiskDetail) {
      bridge.loadRiskDetail(id).then(function (detail) {
        Object.assign(risk, detail);
        risk._detailLoaded = true;
        finish();
      }).catch(finish);
      return;
    }
    finish();
  };

  function bootstrapForms() {
    Promise.all([
      populateDepartments(['riskadd-department', 'riskedit-department']),
      populateRelatedParties('riskadd-relatedParties'),
      populateRelatedParties('riskedit-relatedParties'),
      populateRiskOptions(),
      populateCustomScores()
    ]).then(function () {
      document.querySelectorAll('.modal-audit .audit-box .text').forEach(function (el) {
        if (el.textContent === 'Arun' || el.textContent === 'Karthik' || el.textContent === 'Oct 02, 2019') {
          el.textContent = '-';
        }
      });
    });
  }

  if (global.jQuery) {
    global.jQuery(function () {
      bootstrapForms();
      initModalHandlers();
    });
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      bootstrapForms();
      initModalHandlers();
    });
  }
})(window);
