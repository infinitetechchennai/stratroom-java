// ============================================================
// Scorecard V2 API
// Full CRUD + calculation surface for the new gold-standard engine.
// All paths go through the Vite proxy: /api -> http://localhost:8085/api
// Backend controller: com.estrat.backend.db.scv2.ScorecardV2Controller
// ============================================================

import axiosClient from '../api/axiosClient';

const V2 = '/api/scorecardV2';

const get = (url, params) => {
  return axiosClient.get(url, { params }).then(res => res.data);
};

const post = (url, body) => {
  return axiosClient.post(url, body).then(res => res.data);
};

const put = (url, body) => {
  return axiosClient.put(url, body).then(res => res.data);
};

const del = (url) => {
  return axiosClient.delete(url).then(res => res.data);
};

// ---------- calculation / load ----------
export const getScorecardV2 = (pageId, dateRange) =>
  get(`${V2}/${pageId}${dateRange ? `?dateRange=${encodeURIComponent(dateRange)}` : ''}`);

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

// Bulk Actual/Target import from an uploaded scorecard Excel (rows matched by KPI code).
export const importScorecardActuals = (pageId, dateRange, rows) =>
  post(`${V2}/import/actuals?pageId=${pageId}&dateRange=${encodeURIComponent(dateRange)}`, rows);

export const getKpiHistory = (id, dateRange) => get(`${V2}/kpi/${id}/history`, { dateRange });
export const getSubKpiHistory = (id, dateRange) => get(`${V2}/subkpi/${id}/history`, { dateRange });
export const recordKpiActualBatch = (data) => post(`${V2}/kpi/actuals/batch`, data);
export const recordSubKpiActualBatch = (data) => post(`${V2}/subkpi/actuals/batch`, data);

export const getSubMeasureHistory = (id, dateRange) => get(`${V2}/submeasure/${id}/history`, { dateRange });
export const recordSubMeasureActualBatch = (data) => post(`${V2}/submeasure/actuals/batch`, data);
