// ============================================================
// Scorecard API Service
// All CRUD calls go through Vite proxy:
//   /api                →  http://localhost:8085/api  (consolidated backend)
// ============================================================

const SC = '/api';

// ----------------------------------------------------------
// Auth headers (mirrors main axiosClient + legacy main.js)
// ----------------------------------------------------------
function authHeaders(isFormData = false) {
  const headers = {};
  if (!isFormData) headers['Content-Type'] = 'application/json';

  const token = localStorage.getItem('accessToken');
  if (token) headers.Authorization = `Bearer ${token}`;

  const userInfo = localStorage.getItem('userInfo');
  if (typeof userInfo === 'string' && userInfo.startsWith('ENC(')) {
    headers.USER_INFO = userInfo;
  }

  try {
    const raw = localStorage.getItem('profile');
    if (raw) {
      const p = JSON.parse(raw);
      const empId = p.empId ?? p.id;
      const orgId = p.orgDetails?.orgId ?? p.orgId;
      const deptId = p.deptDetails?.id ?? p.deptId;
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
  } catch {
    // ignore malformed profile
  }

  const y = new Date().getFullYear();
  headers.DATE_PERIOD =
    localStorage.getItem('customperiod') || `01/01/${y}-12/31/${y}`;

  return headers;
}

// ----------------------------------------------------------
// Helpers
// ----------------------------------------------------------
export function getEmpId() {
  try {
    const raw = localStorage.getItem('profile');
    if (raw) {
      const p = JSON.parse(raw);
      return String(p.empId ?? p.id ?? '');
    }
  } catch {
    // ignore
  }
  return '';
}

function getDeptId() {
  try {
    const raw = localStorage.getItem('profile');
    if (raw) {
      const p = JSON.parse(raw);
      return String(p.deptDetails?.id ?? p.deptId ?? '');
    }
  } catch {}
  return '';
}

function getDateRange() {
  const y = new Date().getFullYear();
  return localStorage.getItem('customperiod') || `01/01/${y}-12/31/${y}`;
}

async function request(url, options = {}) {
  const res = await fetch(url, { headers: authHeaders(), ...options });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`[${res.status}] ${res.statusText}${text ? ': ' + text : ''}`);
  }
  // Some endpoints return 200 with empty body on delete
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return res.json();
  return res.text();
}

// ============================================================
// SCORECARD DATA LOAD (main table — uses consolidated /api)
// ============================================================

/**
 * Primary load: date-aware scorecard detail list.
 * Returns { cardDetailsDTO } shape expected by scorecardTransform.js
 */
export const getScorecardDetails = async (pageId) => {
  const dateRange = getDateRange();
  
  try {
    const v2Json = await request(
      `/api/scorecardV2/${pageId}?dateRange=${encodeURIComponent(dateRange)}`
    );
    
    // Check if V2 returned actual perspective data
    if (v2Json?.cardDetailsDTO?.scoreCardDTOS?.length > 0) {
      return v2Json;
    }
  } catch (error) {
    console.warn("V2 endpoint failed, falling back to legacy schema", error);
  }

  // Fallback to legacy schema for scorecards not yet migrated to V2
  return request(`/api/scoreCardDetailsByPage/${pageId}`);
};

// ============================================================
// SUPPLEMENTARY LOAD (permissions / preferences / reportees)
// ============================================================

export const getModulePermissions = async () => {
  const empId = getEmpId();
  return request(`/api/user/modulePermissions/${empId}?moduleName=Scorecard`);
};

export const getPreferences = async (pageId) => {
  return request(`/api/getPreferences?pageName=SCORECARD&pageId=${pageId}`);
};

export const getReporteeList = async () => {
  const empId = getEmpId();
  return request(`/api/reporteeList/${empId}`);
};

// ============================================================
// PAGES
// ============================================================

export const getPageList = (empId) =>
  request(`${SC}/pageList/${empId ?? getEmpId()}`);

export const getPageById = (id) =>
  request(`${SC}/pages/${id}`);

export const getPageListByType = (empId, pageType) =>
  request(`${SC}/pageListByPageType/${empId ?? getEmpId()}?pageType=${encodeURIComponent(pageType)}`);

// ============================================================
// SCORECARD (PERSPECTIVE) CRUD
// ============================================================

export const getPerspectiveById = (id) =>
  request(`${SC}/scorecardV2/perspective/${id}`);

export const savePerspective = (data) =>
  request(`${SC}/scorecardV2/perspective`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updatePerspective = (data) =>
  request(`${SC}/scorecardV2/perspective/${data.id || data.apId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deletePerspective = (id) =>
  request(`${SC}/scorecardV2/perspective/${id}`, { method: 'DELETE' });

export const changePerspectiveName = (scorecardId, name) =>
  request(
    `${SC}/changePerspectiveName?scorecardId=${scorecardId}&name=${encodeURIComponent(name)}`,
    { method: 'PUT' }
  );

// Scorecard detail (page-level container)
export const saveScorecardDetails = (data) =>
  request(`${SC}/scorecardDetails`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateScorecardDetails = (data) =>
  request(`${SC}/scorecardDetails`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

// Status counts for header badge
export const getKpiStatusCount = (scorecardDetailsId, period) => {
  const q = period ? `?period=${encodeURIComponent(period)}` : '';
  return request(`${SC}/kpistatuscount/${scorecardDetailsId}${q}`);
};

export const checkScoreCardData = (empId, pageId) =>
  request(`${SC}/checkScoreCardData/${empId ?? getEmpId()}?pageId=${pageId}`);

// ============================================================
// OBJECTIVES CRUD
// ============================================================

export const getObjectiveById = (id) =>
  request(`${SC}/scorecardV2/objective/${id}`);

export const saveObjective = (data) =>
  request(`${SC}/scorecardV2/objective`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateObjective = (data) =>
  request(`${SC}/scorecardV2/objective/${data.id || data.obId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteObjective = (id) =>
  request(`${SC}/scorecardV2/objective/${id}`, { method: 'DELETE' });

export const getObjectiveList = (scoreCardId, loadFlag = true) =>
  request(`${SC}/objectivesList/${scoreCardId}?loadFlag=${loadFlag}`);

export const getObjectiveListByDate = (scoreCardId, dateRange, loadFlag = true) =>
  request(
    `${SC}/objectivesListByDate/${scoreCardId}?loadFlag=${loadFlag}&dateRange=${encodeURIComponent(dateRange ?? getDateRange())}`
  );

// ============================================================
// KPI CRUD
// ============================================================

export const getKpiById = (id) =>
  request(`${SC}/scorecardV2/kpi/${id}`);

export const saveKpi = (data) =>
  request(`${SC}/scorecardV2/kpi`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateKpi = (data) =>
  request(`${SC}/scorecardV2/kpi/${data.id || data.kpiId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteKpi = (id) =>
  request(`${SC}/scorecardV2/kpi/${id}`, { method: 'DELETE' });

export const getKpiList = (empId, employeeView = false) =>
  request(`${SC}/kpiList/${empId ?? getEmpId()}?employeeView=${employeeView}`);

export const getKpiListByObjective = (objectiveId) =>
  request(`${SC}/v2/kpiList/${objectiveId}`);

export const getKpiListByDate = (objectiveId, dateRange) =>
  request(
    `${SC}/kpiListByDate/${objectiveId}?dateRange=${encodeURIComponent(dateRange ?? getDateRange())}`
  );

export const getKpiFormList = (scorecardId, dateRange) =>
  request(
    `${SC}/kpiFormKpiList/${scorecardId}?dateRange=${encodeURIComponent(dateRange ?? getDateRange())}`
  );

export const getKpiActualDetails = (kpiId, tableFrequency, flagtype) => {
  const q = new URLSearchParams();
  if (tableFrequency) q.set('tableFrequency', tableFrequency);
  if (flagtype) q.set('flagtype', flagtype);
  return request(`${SC}/kpiDetailList/${kpiId}?${q.toString()}`);
};

// Save actual KPI entry (from the KPI entry form)
export const saveOrgKpiDetails = (data) =>
  request(`${SC}/web/saveOrgKpiDetails`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

// Validate KPI formula
export const validateFormula = (formula, type) =>
  request(`${SC}/validateFormula`, {
    method: 'POST',
    body: JSON.stringify({ formula, type }),
  });

// Node keys (measures / sub-measures) used to build KPI formulas in the calculators
export const retrieveNodeKeyList = () =>
  request(`${SC}/retrieveNodeKeyList`);

// KPI attachments
export const getKpiAttachments = (kpiId) =>
  request(`${SC}/kpiAttachmentList/${kpiId}`);

// ============================================================
// SUB-KPI CRUD
// ============================================================

export const getSubKpiById = (id) =>
  request(`${SC}/scorecardV2/subkpi/${id}`);

export const saveSubKpi = (data) =>
  request(`${SC}/scorecardV2/subkpi`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateSubKpi = (data) =>
  request(`${SC}/scorecardV2/subkpi/${data.id || data.subKpiId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const deleteSubKpi = (id) =>
  request(`${SC}/scorecardV2/subkpi/${id}`, { method: 'DELETE' });

export const getSubKpiListByObjective = (objectiveId) =>
  request(`${SC}/v2/subkpiList/${objectiveId}`);

export const saveOrgSubKpiEntry = (data) =>
  request(`${SC}/web/saveSubkpiEntry`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

// ============================================================
// EXPORT / DOWNLOAD
// ============================================================

/**
 * Download PDF or Excel for a KPI — returns a Blob URL the caller can open.
 * Usage: window.open(await downloadKpiPdf(kpiId))
 */
export const downloadKpiPdf = async (kpiId) => {
  const res = await fetch(`${SC}/downloadPdf/${kpiId}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`PDF download failed: ${res.status}`);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
};

export const downloadKpiExcel = async (kpiId) => {
  const res = await fetch(`${SC}/downloadExcel/${kpiId}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Excel download failed: ${res.status}`);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
};

// ============================================================
// STRATEGY MAP
// ============================================================

export const getStrategyMapData = (scorecardId) =>
  request(`/api/strategyMap/${scorecardId}`);

// ============================================================
// MASTER DATA (for dropdowns inside modals)
// ============================================================

export const getMasterList = () =>
  request(`/api/getMaster/0`);

export const getMasterValues = (masterType) =>
  request(`/api/masterValue/${encodeURIComponent(masterType)}`);

// ============================================================
// ETL / IMPORT
// ============================================================

export const importKpiDetails = (detailsList) =>
  request(`${SC}/etl/saveKpiDetails`, {
    method: 'POST',
    body: JSON.stringify(detailsList),
  });
