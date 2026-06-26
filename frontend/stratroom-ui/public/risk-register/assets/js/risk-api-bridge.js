/**
 * Connects risk_new.html UI to Stratroom backend (/api on port 8085 via Vite proxy).
 * Reads session from localStorage (same keys as stratroom-ui AuthContext).
 */
(function (global) {
  const API_BASE = '/api';
  const DEFAULT_AVATAR = 'assets/images/user/user7.jpg';

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

  function isSessionReady() {
    return !!(localStorage.getItem('accessToken') && readProfile());
  }

  function redirectToLogin() {
    var params = new URLSearchParams(global.location.search);
    if (params.get('embedded') === '1' && global.parent && global.parent !== global) {
      try {
        global.parent.postMessage({ type: 'stratroom:session-expired' }, global.location.origin);
      } catch (e) { /* ignore */ }
      return;
    }
    global.location.href = '/login';
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
        redirectToLogin();
        throw new Error('Session expired. Please sign in again.');
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

  function badgeClassForStatus(status) {
    const s = String(status || '').toLowerCase();
    if (s.indexOf('very low') >= 0 || s.indexOf('low') >= 0) return 'status-bg-sky-blue';
    if (s.indexOf('high') >= 0 || s.indexOf('critical') >= 0) return 'status-bg-orange';
    if (s.indexOf('medium') >= 0 || s.indexOf('tolerable') >= 0) return 'status-bg-cyan';
    return 'status-bg-lime-green';
  }

  function mapConsequence(con) {
    const cv = (con && con.consequenceValue) || {};
    return {
      id: String(con.id || Math.random().toString(36).slice(2, 9)),
      title: cv.name || cv.desc || 'Consequence',
      badge: cv.riskRating || cv.score || '',
      badgeClass: badgeClassForStatus(cv.riskRating || cv.score),
      impactCategory: cv.impactCategory || cv.riskcategory || '',
      possibleEvent: cv.possibleEvent || '',
      likelihood: cv.likelihood || '',
      impact: cv.impact || '',
      riskScore: cv.score || cv.riskScore || '',
      description: cv.description || cv.desc || ''
    };
  }

  function mapCause(cause) {
    const cv = (cause && cause.causeAndConsequenceValue) || {};
    const consequences = (cause.consequenceList || []).map(mapConsequence);
    return {
      id: String(cause.id || Math.random().toString(36).slice(2, 9)),
      title: cv.name || cv.desc || 'Cause',
      badge: cv.riskRating || cv.score || '',
      badgeClass: badgeClassForStatus(cv.riskRating || cv.score),
      consequences: consequences,
      riskCategory: cv.riskcategory || cv.riskCategory || '',
      possibleEvent: cv.possibleEvent || '',
      likelihood: cv.likelihood || '',
      impact: cv.impact || '',
      riskScore: cv.score || cv.riskScore || '',
      description: cv.description || cv.desc || ''
    };
  }

  function planValue(plan) {
    return (plan && plan.riskPlanValue) || (plan && plan.riskTreatmentValue) || (plan && plan.riskMonitoringValue) || {};
  }

  function mapControl(plan) {
    const pv = planValue(plan);
    const activities = (plan.riskActivitiesDTOList || []).map(function (act) {
      const av = (act && act.riskActivitiesValue) || {};
      return {
        id: String(act.id || Math.random().toString(36).slice(2, 9)),
        title: av.name || 'Activity',
        status: av.status || 'Pending',
        progress: Number(av.progress) || 0
      };
    });
    return {
      id: String(plan.id || Math.random().toString(36).slice(2, 9)),
      title: pv.name || pv.action || 'Control',
      strategy: pv.action || '',
      date: pv.resolveDate || pv.targetTime || '-',
      progress: Number(pv.progress) || 0,
      items: activities
    };
  }

  function mapTreatment(plan) {
    const pv = planValue(plan);
    return {
      id: String(plan.id || Math.random().toString(36).slice(2, 9)),
      reducingImpact: pv.reducingimpact || pv.reducingImpact || '',
      reducingPossibility: pv.reducingpossibility || pv.reducingPossibility || '',
      strategy: pv.action || '',
      progress: Number(pv.progress) || 0,
      targetTime: pv.timeTarget || pv.targetTime || ''
    };
  }

  function mapMonitoring(mon) {
    const mv = (mon && mon.riskMonitoringValue) || planValue(mon);
    return {
      id: String(mon.id || Math.random().toString(36).slice(2, 9)),
      mitigation: mv.mitigation || mv.name || '',
      status: mv.status || '',
      progress: Number(mv.progress) || 0,
      targetTime: mv.targetTime || ''
    };
  }

  function mapRiskDto(risk) {
    const rv = risk.riskValue || {};
    const draftStatus = (risk.draft || risk.status || '').toUpperCase();
    const isDraft = draftStatus === 'DRAFT' || draftStatus === '' || draftStatus === 'DRAFT RISK';
    return {
      id: String(risk.id),
      title: rv.name || rv.desc || risk.riskUniqueId || ('Risk ' + risk.id),
      owner: {
        name: rv.ownerName || 'Unknown',
        image: DEFAULT_AVATAR
      },
      department: rv.department || '',
      riskCategory: rv.riskcategory || rv.riskCategory || '',
      riskLevel: rv.riskStatus || rv.score || '',
      status: rv.workflowStatus || rv.riskStatus || 'In Progress',
      dateRaised: risk.raisedDate || (risk.createdTime ? String(risk.createdTime).split('T')[0] : '-'),
      dateCompleted: risk.completedDate ? String(risk.completedDate).split('T')[0] : '-',
      inherentRiskScore: rv.inherentRiskScore || rv.inherentscore || rv.score || '',
      residualRiskScore: rv.residualRiskScore || rv.residualscore || '',
      impact: rv.impact || '-',
      likelihood: rv.likelihood || '-',
      pos: rv.pos || rv.riskpos || '-',
      iso: rv.iso || rv.riskiso || '-',
      infoAsset: rv.informationasset || rv.informationAsset || '-',
      businessImpact: rv.businessImpact || rv.impactDesc || '-',
      financialImpact: rv.financialImpact || '-',
      others: rv.others || '',
      nextAssessment: rv.nextAssessment || '-',
      versionStatus: isDraft ? 'Draft' : 'Approved',
      causesAndConsequences: (risk.riskCauseAndConsequenceList || []).map(mapCause),
      controls: (risk.riskPlanList || []).map(mapControl),
      riskTreatments: (risk.riskTreatmentList || []).map(mapTreatment),
      reviewMonitoring: (risk.riskMonitoringList || []).map(mapMonitoring),
      files: (risk.riskAttachmentList || []).map(function (f) {
        return { name: f.name || f.fileName || 'Attachment' };
      }),
      comments: (risk.riskCommentsList || []).map(function (c) {
        const cv = c.riskCommentsValue || {};
        return {
          author: cv.createdByName || 'User',
          text: cv.desc || '',
          date: cv.formattedDateTime || ''
        };
      }),
      _raw: risk
    };
  }

  function getEmpId() {
    const profile = readProfile();
    return profile && (profile.empId ?? profile.id);
  }

  function getDateRange() {
    const y = new Date().getFullYear();
    return localStorage.getItem('customperiod') || ('01/01/' + y + '-12/31/' + y);
  }

  function loadRisks() {
    const empId = getEmpId();
    if (!empId) return Promise.reject(new Error('Not logged in'));

    const params = new URLSearchParams(global.location.search);
    const pageId = params.get('pageId');
    const dateRange = getDateRange();
    let path = '/riskList/' + empId + '?dateRange=' + encodeURIComponent(dateRange);
    if (pageId) path += '&pageId=' + encodeURIComponent(pageId);

    return apiFetch(path).then(function (list) {
      if (!Array.isArray(list)) return [];
      return list.map(mapRiskDto);
    });
  }

  function loadRiskDetail(id) {
    return apiFetch('/risk/' + id + '?loadFlag=true').then(mapRiskDto);
  }

  function loadDepartments() {
    return apiFetch('/departmentReportees').then(function (list) {
      if (!Array.isArray(list)) return [];
      return list.map(function (d) {
        return { id: d.id ?? d.deptId, name: d.name ?? d.deptName };
      });
    });
  }

  function populateDepartmentFilter(departments) {
    const select = document.getElementById('deptFilter');
    if (!select || !departments) return;
    const current = select.value;
    select.innerHTML = '<option>All Departments</option>';
    departments.forEach(function (d) {
      if (!d || !d.name) return;
      const opt = document.createElement('option');
      opt.value = d.name;
      opt.textContent = d.name;
      opt.dataset.deptId = d.id;
      select.appendChild(opt);
    });
    if (current) select.value = current;
  }

  global.RiskApiBridge = {
    get enabled() {
      return isSessionReady();
    },
    isSessionReady: isSessionReady,
    loadRisks: loadRisks,
    loadRiskDetail: loadRiskDetail,
    loadDepartments: loadDepartments,
    populateDepartmentFilter: populateDepartmentFilter,
    mapRiskDto: mapRiskDto,
    apiFetch: apiFetch,
    getEmpId: getEmpId,
    buildHeaders: buildHeaders
  };
})(window);
