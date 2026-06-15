// ============================================================
// Scorecard V2 API
// Full CRUD + calculation surface for the new gold-standard engine.
// All paths go through the Vite proxy: /api -> http://localhost:8085/api
// Backend controller: com.estrat.backend.db.scv2.ScorecardV2Controller
// ============================================================

const V2 = '/api/scorecardV2';

function authHeaders() {
  const headers = { 'Content-Type': 'application/json' };
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
      if (empId != null && empId !== '') {
        headers.LOGGED_IN_EMPLOYEE_ID = String(empId);
        headers.SUPER_USER_ID = String(empId);
      }
      const orgId = p.orgDetails?.orgId ?? p.orgId;
      if (orgId != null && orgId !== '') headers.USER_ORG_ID = String(orgId);
    }
  } catch {
    // ignore malformed profile
  }
  return headers;
}

async function req(url, options = {}) {
  const res = await fetch(url, { headers: authHeaders(), ...options });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`[${res.status}] ${res.statusText}${text ? ': ' + text : ''}`);
  }
  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

const post = (url, body) => req(url, { method: 'POST', body: JSON.stringify(body) });
const put = (url, body) => req(url, { method: 'PUT', body: JSON.stringify(body) });
const del = (url) => req(url, { method: 'DELETE' });

// ---------- calculation / load ----------
export const getScorecardV2 = (pageId, dateRange) =>
  req(`${V2}/${pageId}${dateRange ? `?dateRange=${encodeURIComponent(dateRange)}` : ''}`);

// ---------- scorecard ----------
export const createScorecard = (data) => post(`${V2}/scorecard`, data);
export const updateScorecard = (id, data) => put(`${V2}/scorecard/${id}`, data);
export const deleteScorecard = (id) => del(`${V2}/scorecard/${id}`);

// ---------- perspective ----------
export const createPerspective = (data) => post(`${V2}/perspective`, data);
export const updatePerspective = (id, data) => put(`${V2}/perspective/${id}`, data);
export const deletePerspective = (id) => del(`${V2}/perspective/${id}`);

// ---------- objective ----------
export const createObjective = (data) => post(`${V2}/objective`, data);
export const updateObjective = (id, data) => put(`${V2}/objective/${id}`, data);
export const deleteObjective = (id) => del(`${V2}/objective/${id}`);

// ---------- KPI ----------
export const createKpi = (data) => post(`${V2}/kpi`, data);
export const updateKpi = (id, data) => put(`${V2}/kpi/${id}`, data);
export const deleteKpi = (id) => del(`${V2}/kpi/${id}`);

// ---------- sub-KPI ----------
export const createSubKpi = (data) => post(`${V2}/subkpi`, data);
export const updateSubKpi = (id, data) => put(`${V2}/subkpi/${id}`, data);
export const deleteSubKpi = (id) => del(`${V2}/subkpi/${id}`);

// ---------- actuals ----------
export const recordKpiActual = (data) => post(`${V2}/kpi/actual`, data);
export const recordSubKpiActual = (data) => post(`${V2}/subkpi/actual`, data);
