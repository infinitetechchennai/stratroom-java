/**
 * Connects initiatives.html UI to Stratroom backend (/api).
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

  function formatDate(value) {
    if (!value) return '-';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  }

  function progressMeta(value) {
    const n = Number(value) || 0;
    let colorClass = 'bg-success';
    let wrapClass = 'green';
    let status = 'green';
    if (n < 40) {
      colorClass = 'bg-danger';
      wrapClass = 'red';
      status = 'red';
    } else if (n < 70) {
      colorClass = 'bg-warning';
      wrapClass = 'yellow';
      status = 'yellow';
    }
    return { value: n, colorClass: colorClass, wrapClass: wrapClass, status: status };
  }

  function mapOwner(dto) {
    const iv = dto.initiativeValue || {};
    return {
      name: iv.ownerName || iv.createdByName || 'Owner',
      image: DEFAULT_AVATAR
    };
  }

  function mapSubInitiative(sub) {
    const sv = (sub && sub.subInitiativeValue) || {};
    return {
      id: String(sub.id),
      title: sv.name || sv.desc || 'Sub-Initiative',
      name: sv.name || sv.desc || 'Sub-Initiative',
      status: sv.status || 'In Progress',
      startDate: formatDate(sv.startDate || sub.startDate),
      endDate: formatDate(sv.endDate || sub.endDate),
      progress: { value: Number(sv.progress) || 0 },
      owners: [{ name: sv.ownerName || 'Owner', image: DEFAULT_AVATAR }]
    };
  }

  function mapTask(task) {
    const tv = (task && task.taskValue) || (task && task.initiativeTaskValue) || {};
    return {
      id: String(task.id),
      title: tv.name || tv.desc || 'Task',
      name: tv.name || tv.desc || 'Task',
      status: tv.status || 'Pending',
      endDate: formatDate(tv.endDate || tv.dueDate),
      due: formatDate(tv.endDate || tv.dueDate),
      owners: [{ name: tv.ownerName || 'Owner', image: DEFAULT_AVATAR }]
    };
  }

  function mapMilestone(m) {
    const mv = (m && m.milestonesValue) || (m && m.milestoneValue) || {};
    return {
      id: String(m.id),
      title: mv.name || mv.desc || 'Milestone',
      name: mv.name || mv.desc || 'Milestone',
      date: formatDate(mv.date || m.endDate),
      endDate: formatDate(mv.date || m.endDate),
      status: mv.status || 'Pending'
    };
  }

  function mapFile(f) {
    return {
      id: String(f.id),
      name: f.name || f.fileName || 'Attachment',
      title: f.name || f.fileName || 'Attachment'
    };
  }

  function mapComment(c) {
    const cv = (c && c.commentsValue) || (c && c.commentValue) || {};
    return {
      id: String(c.id),
      author: cv.createdByName || 'User',
      text: cv.desc || cv.comment || '',
      date: cv.formattedDateTime || ''
    };
  }

  function mapInitiativeDto(dto) {
    const iv = dto.initiativeValue || {};
    const progress = progressMeta(iv.progress || iv.completion || iv.percentComplete || 0);
    const budget = dto.initiativeBudget || {};
    const financials = {
      assetBudget: budget.assetBudget || iv.assetBudget || 0,
      assetRealization: budget.assetRealization || iv.assetRealization || 0,
      liabilitiesBudget: budget.liabilitiesBudget || iv.liabilitiesBudget || 0,
      liabilitiesRealization: budget.liabilitiesRealization || iv.liabilitiesRealization || 0,
      totalBudget: budget.totalBudget || iv.totalBudget || 0,
      totalBudgetRealization: budget.totalBudgetRealization || iv.totalBudgetRealization || 0,
      assetRealizationPercent: budget.assetRealizationPercent || 0,
      liabilitiesRealizationPercent: budget.liabilitiesRealizationPercent || 0,
      totalBudgetRealizationPercent: budget.totalBudgetRealizationPercent || 0
    };

    const impactKpis = [];
    if (iv.impactDesc) impactKpis.push(iv.impactDesc);
    if (iv.impactKPI) impactKpis.push(iv.impactKPI);
    if (Array.isArray(iv.impactKPIs)) impactKpis.push.apply(impactKpis, iv.impactKPIs);

    return {
      id: String(dto.id),
      title: iv.name || iv.desc || dto.initiativeId || ('Initiative ' + dto.id),
      owner: mapOwner(dto),
      category: iv.category || iv.initiativeCategory || '',
      department: iv.dept || iv.department || '',
      progress: progress,
      startDate: formatDate(dto.startDate || iv.startDate || iv.daterange),
      endDate: formatDate(dto.endDate || iv.endDate),
      remainingDays: iv.remainingDays || 0,
      status: progress.status,
      perspective: iv.perspective || iv.perspectiveName || '-',
      objective: iv.objective || iv.objectiveName || '-',
      impactKPIs: impactKpis.length ? impactKpis : ['-'],
      financials: financials,
      subInitiatives: (dto.subInitiativeList || []).map(mapSubInitiative),
      tasks: (dto.taskList || []).map(mapTask),
      milestones: (dto.mileStonesList || []).map(mapMilestone),
      files: (dto.attachmentList || []).map(mapFile),
      comments: (dto.commentsList || []).map(mapComment),
      _raw: dto
    };
  }

  function loadInitiatives(loadNested) {
    const empId = getEmpId();
    if (!empId) return Promise.reject(new Error('Not logged in'));

    const pageId = getPageId();
    const params = new URLSearchParams();
    params.set('loadFlag', loadNested ? 'true' : 'false');
    if (pageId) params.set('pageId', pageId);

    return apiFetch('/initiativesList/' + empId + '?' + params.toString()).then(function (list) {
      if (!Array.isArray(list)) return [];
      return list.map(mapInitiativeDto);
    });
  }

  function loadInitiativeDetail(id) {
    return apiFetch('/initiatives/' + id + '?loadFlag=true').then(mapInitiativeDto);
  }

  function mapDashboardInitiative(dto) {
    const iv = (dto && dto.initiativeValue) || {};
    const progress = Number(iv.progress || iv.completion || iv.percentComplete) || 0;
    const color = progress >= 70 ? '#27ae60' : progress >= 40 ? '#2980b9' : '#e74c3c';
    const subCount = dto.subInitiativeCount != null
      ? Number(dto.subInitiativeCount)
      : (dto.subInitiativeList || []).length;
    const actCount = dto.activityCount != null ? Number(dto.activityCount) : countActivities(dto);
    const msCount = dto.milestoneCount != null
      ? Number(dto.milestoneCount)
      : (dto.mileStonesList || []).length;

    const tree = [];
    (dto.subInitiativeList || []).forEach(function (sub) {
      const sv = (sub && sub.subInitiativeValue) || {};
      const subProg = Number(sv.progress) || 0;
      tree.push({
        type: 'S',
        name: sv.name || sv.desc || 'Sub-Initiative',
        desc: 'Sub · ' + (sv.ownerName || 'Owner'),
        prog: subProg,
        date: formatDate(sv.endDate || sub.endDate),
        status: statusFromProgress(subProg),
        color: subProg >= 70 ? '#27ae60' : subProg >= 40 ? '#2980b9' : '#e74c3c',
        indent: 20
      });
      (sub.activitiesList || []).slice(0, 2).forEach(function (act) {
        const av = (act && act.activitiesValue) || {};
        const actProg = Number(av.progress) || 0;
        tree.push({
          type: 'A',
          name: av.name || av.desc || 'Activity',
          desc: 'Activity',
          prog: actProg,
          date: formatDate(av.endDate),
          status: statusFromProgress(actProg),
          color: actProg >= 70 ? '#27ae60' : actProg >= 40 ? '#2980b9' : '#e74c3c',
          indent: 40
        });
      });
    });

    return {
      id: String(dto.initiativeId || dto.id),
      name: iv.name || iv.desc || ('Initiative ' + dto.id),
      owner: iv.ownerName || iv.createdByName || 'Owner',
      due: formatDate(dto.endDate || iv.endDate),
      status: statusFromProgress(progress),
      progress: progress,
      color: color,
      counts: { sub: subCount, act: actCount, ms: msCount },
      gantt: {
        left: '0%',
        width: Math.max(10, progress) + '%',
        label: iv.name || iv.desc || 'Initiative',
        milestone: progress >= 50 ? '50%' : null
      },
      tree: tree,
      _raw: dto
    };
  }

  function countActivities(dto) {
    let total = 0;
    (dto.subInitiativeList || []).forEach(function (sub) {
      total += (sub.activitiesList || []).length;
    });
    return total;
  }

  function statusFromProgress(progress) {
    const n = Number(progress) || 0;
    if (n >= 85) return 'On Track';
    if (n >= 60) return 'In Progress';
    if (n >= 40) return 'At Risk';
    return 'Critical';
  }

  function loadInitiativesRaw(loadNested) {
    const empId = getEmpId();
    if (!empId) return Promise.reject(new Error('Not logged in'));
    const pageId = getPageId();
    const params = new URLSearchParams();
    params.set('loadFlag', loadNested ? 'true' : 'false');
    if (pageId) params.set('pageId', pageId);
    return apiFetch('/initiativesList/' + empId + '?' + params.toString()).then(function (list) {
      return Array.isArray(list) ? list : [];
    });
  }

  function loadDashboardData() {
    const empId = getEmpId();
    const profile = readProfile();
    const deptId = profile && (profile.deptDetails?.id ?? profile.deptId);
    const params = new URLSearchParams();
    if (deptId) params.set('deptId', String(deptId));
    else if (empId) params.set('empId', String(empId));
    const qs = params.toString();
    return apiFetch('/initiativeDashBoardData' + (qs ? '?' + qs : ''));
  }

  global.InitiativesApiBridge = {
    enabled: true,
    loadInitiatives: loadInitiatives,
    loadInitiativesRaw: loadInitiativesRaw,
    loadDashboardData: loadDashboardData,
    loadInitiativeDetail: loadInitiativeDetail,
    mapInitiativeDto: mapInitiativeDto,
    mapDashboardInitiative: mapDashboardInitiative,
    apiFetch: apiFetch,
    getEmpId: getEmpId,
    buildHeaders: buildHeaders,
    getPageId: getPageId
  };
})(window);
