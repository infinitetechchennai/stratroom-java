/**
 * Connects compliance_new.html to Stratroom backend (/api).
 */
(function (global) {
  const API_BASE = '/api';
  const DEFAULT_AVATAR = 'user7.jpg';
  const FRAMEWORK_COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#a855f7', '#ef4444', '#06b6d4', '#883b71', '#0ea5e9'];

  function readProfile() {
    try {
      const raw = localStorage.getItem('profile');
      if (!raw) return null;
      const profile = JSON.parse(raw);
      if (profile && !profile.empId && profile.id) profile.empId = profile.id;
      return profile;
    } catch {
      return null;
    }
  }

  function buildHeaders() {
    const headers = { Accept: 'application/json' };
    const token = localStorage.getItem('accessToken');
    if (token) headers.Authorization = 'Bearer ' + token;
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo && userInfo.indexOf('ENC(') === 0) headers.USER_INFO = userInfo;

    const profile = readProfile();
    if (profile) {
      const empId = profile.empId ?? profile.id;
      const orgId = profile.orgDetails?.orgId ?? profile.orgId;
      const deptId = profile.deptDetails?.id ?? profile.deptId;
      if (empId != null && empId !== '') {
        headers.LOGGED_IN_EMPLOYEE_ID = String(empId);
        headers.SUPER_USER_ID = String(empId);
      }
      if (orgId != null && orgId !== '') headers.USER_ORG_ID = String(orgId);
      if (deptId != null && deptId !== '') {
        headers.LOGGED_IN_DEPT_ID = String(deptId);
        headers.LOGGED_IN_DEPT_ID_FIELD = String(deptId);
      }
    }

    const y = new Date().getFullYear();
    headers.DATE_PERIOD = localStorage.getItem('customperiod') || ('01/01/' + y + '-12/31/' + y);
    return headers;
  }

  function apiFetch(path, options) {
    const opts = options || {};
    const isFormData = typeof FormData !== 'undefined' && opts.body instanceof FormData;
    opts.headers = Object.assign({}, buildHeaders(), opts.headers || {});
    if (isFormData) {
      delete opts.headers['Content-Type'];
      delete opts.headers['content-type'];
    }
    return fetch(API_BASE + path, opts).then(function (res) {
      if (res.status === 401 || res.status === 403) {
        global.location.href = '/login';
        throw new Error('Unauthorized');
      }
      if (!res.ok) {
        return res.text().then(function (t) {
          throw new Error(t || ('HTTP ' + res.status));
        });
      }
      const ct = res.headers.get('content-type') || '';
      if (ct.indexOf('application/json') >= 0) return res.json();
      return res.text();
    });
  }

  function getEmpId() {
    const profile = readProfile();
    return profile && (profile.empId ?? profile.id);
  }

  function getDateRange() {
    const y = new Date().getFullYear();
    return localStorage.getItem('customperiod') || ('01/01/' + y + '-12/31/' + y);
  }

  function getPageId() {
    return new URLSearchParams(global.location.search).get('pageId') || '';
  }

  function mapOwner(name) {
    if (!name) return [];
    return [{ name: name, image: DEFAULT_AVATAR }];
  }

  function normalizeStatus(status) {
    const s = String(status || '').toLowerCase();
    if (s.indexOf('effective') >= 0 || s.indexOf('complete') >= 0) return 'Effective';
    if (s.indexOf('ongoing') >= 0 || s.indexOf('progress') >= 0) return 'Ongoing';
    if (s.indexOf('pending') >= 0) return 'Pending';
    if (s.indexOf('not') >= 0) return 'Not Started';
    return status || 'Pending';
  }

  function normalizeRisk(risk) {
    const r = String(risk || '').toLowerCase();
    if (r.indexOf('critical') >= 0) return 'Critical';
    if (r.indexOf('high') >= 0) return 'High';
    if (r.indexOf('medium') >= 0) return 'Medium';
    if (r.indexOf('low') >= 0) return 'Low';
    return risk || 'Medium';
  }

  function transformAreas(response) {
    const transformed = [];
    const areas = Array.isArray(response) ? response : [];

    areas.forEach(function (parentItem) {
      const areaName = parentItem.name || 'Compliance';
      const details = parentItem.complainsDetailsList || [];

      if (!details.length) {
        transformed.push({
          control_id: '—',
          controllerDataId: '—',
          name: areaName,
          compliance_area: areaName,
          risk_level: '—',
          status: 'No Data',
          last_assessment_date: '—',
          next_review_date: '—',
          action_due_date: '—',
          last_audit_date: '—',
          control_description: '—',
          regulation: '—',
          owner: [],
          control_type: '—',
          implementation_status: '—',
          audit_required: '—',
          audit_findings: '—',
          corrective_actions: '—',
          responsible_person: [],
          evidence_file_reference: '—',
          notes: '—',
          complainAreaId: parentItem.id,
          isPlaceholder: true,
          _raw: null
        });
        return;
      }

      details.forEach(function (complain) {
        const cv = complain.complainValue || {};
        transformed.push({
          complianceAttachment: complain.complainceAttachment || null,
          control_id: complain.id,
          controllerDataId: cv.controlId || String(complain.id),
          name: areaName,
          compianceName: cv.name || '',
          compliance_area: areaName,
          risk_level: cv.riskLevel || complain.riskLevel || 'N/A',
          status: normalizeStatus(cv.status || complain.status),
          last_assessment_date: cv.lastAssessmentDate || complain.lastAssessmentDate || 'N/A',
          next_review_date: cv.nextReviewDate || complain.nextReviewDate || 'N/A',
          action_due_date: cv.actionDueDate || complain.actionDueDate || 'N/A',
          last_audit_date: cv.lastAuditDate || complain.lastAuditDate || 'N/A',
          control_description: cv.desc || cv.controlDescription || 'N/A',
          regulation: cv.applicableRegulations || cv.regulationORStandar || 'N/A',
          owner: mapOwner(cv.ownerName || cv.createdByName),
          responsible_person: mapOwner(cv.createdByName),
          control_type: cv.controlType || 'N/A',
          implementation_status: cv.implementationStatus || 'N/A',
          audit_required: cv.auditRequired || 'N/A',
          audit_findings: cv.auditFindings || 'N/A',
          corrective_actions: cv.correctiveActions || 'N/A',
          evidence_file_reference: cv.evidenceFileReference || 'N/A',
          notes: cv.notes || 'N/A',
          complainAreaId: parentItem.id,
          pageId: complain.pageId,
          isPlaceholder: false,
          _raw: complain
        });
      });
    });

    return { areas: areas, rows: transformed };
  }

  function loadCompliance() {
    const pageId = getPageId();
    const dateRange = getDateRange();
    let path = '/retrieveComplinValue?dateRange=' + encodeURIComponent(dateRange);
    if (pageId) path += '&pageId=' + encodeURIComponent(pageId);
    return apiFetch(path).then(transformAreas);
  }

  function loadComplianceTableRows() {
    return loadCompliance().then(function (payload) {
      global.__complianceAreas = payload.areas;
      global.__complianceRows = payload.rows;
      if (global.jQuery) {
        global.jQuery(document).trigger('compliance:data-loaded', [payload.areas]);
      }
      return payload.rows;
    });
  }

  function buildFrameworkStats(areas) {
    const palette = FRAMEWORK_COLORS;
    return (areas || []).map(function (area, idx) {
      const details = area.complainsDetailsList || [];
      const statuses = { Effective: 0, Ongoing: 0, Pending: 0, 'Not Started': 0 };
      const risk = { Critical: 0, High: 0, Medium: 0, Low: 0 };
      const impl = { Implemented: 0, 'In Progress': 0, Planned: 0 };

      details.forEach(function (item) {
        const cv = item.complainValue || {};
        const status = normalizeStatus(cv.status || item.status);
        statuses[status] = (statuses[status] || 0) + 1;

        const riskLevel = normalizeRisk(cv.riskLevel || item.riskLevel);
        risk[riskLevel] = (risk[riskLevel] || 0) + 1;

        const implStatus = String(cv.implementationStatus || '').toLowerCase();
        if (implStatus.indexOf('implement') >= 0) impl.Implemented += 1;
        else if (implStatus.indexOf('progress') >= 0) impl['In Progress'] += 1;
        else impl.Planned += 1;
      });

      const total = details.length;
      return {
        id: area.name || ('Area-' + area.id),
        name: area.name || ('Area ' + area.id),
        subtitle: 'Compliance Area',
        total: total,
        statuses: statuses,
        risk: risk,
        impl: impl,
        color: palette[idx % palette.length]
      };
    }).filter(function (f) { return f.total > 0; });
  }

  global.ComplianceApiBridge = {
    enabled: true,
    loadCompliance: loadCompliance,
    loadComplianceTableRows: loadComplianceTableRows,
    buildFrameworkStats: buildFrameworkStats,
    apiFetch: apiFetch,
    getEmpId: getEmpId,
    buildHeaders: buildHeaders,
    getPageId: getPageId,
    getDateRange: getDateRange
  };
})(window);
