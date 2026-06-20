import axiosClient from './axiosClient'

// KPI + Sub-KPI API layer, migrated from the legacy scorecard standard view.
// Targets the consolidated backend (/api); headers added by axiosClient.

// ---- KPI ----

export const getKpi = async (kpiId) => {
  const response = await axiosClient.get(`/api/kpi/${kpiId}`)
  return response.data
}

export const saveKpi = async (payload) => {
  const response = await axiosClient.post('/api/kpi', payload)
  return response.data
}

export const getKpiInitiativesList = async (kpiId) => {
  const response = await axiosClient.get(`/api/kpi/initiativesList/${kpiId}`)
  return response.data
}

export const getKpiRiskList = async (kpiId) => {
  const response = await axiosClient.get(`/api/kpi/riskList/${kpiId}`)
  return response.data
}

// options: { period, flagType, tableFrequency, groupBy, tableType } — all optional.
export const getKpiDetailList = async (kpiId, options = {}) => {
  const params = new URLSearchParams()
  Object.entries(options).forEach(([k, v]) => {
    if (v != null && v !== '') params.set(k, v)
  })
  const query = params.toString()
  const response = await axiosClient.get(`/api/kpiDetailList/${kpiId}${query ? `?${query}` : ''}`)
  return response.data
}

// Monthly actual/target series for the KPI story-card (Data Table, chart, Data Drill).
// Returns rows: { period, financialMonth, actual, target, gap, ytd, budget, currency, measureName, nodeKey }
// Date range is taken from the DATE_PERIOD header injected by axiosClient.
export const getKpiActualSeries = async (kpiId) => {
  const response = await axiosClient.get(`/api/kpi/actualSeries/${kpiId}`)
  return response.data
}

// KPI story-card detail from the V2 (sc_) schema — the same source the Scorecard
// tab renders. Returns { kpi: { id, kpiId, kpiName, kpiValue }, series: [...] }.
// kpiId here is the numeric sc_kpis.id.
export const getKpiStoryCard = async (kpiId, dateRange) => {
  const y = new Date().getFullYear()
  const range = dateRange || localStorage.getItem('customperiod') || `01/01/${y}-12/31/${y}`
  const response = await axiosClient.get(
    `/api/scorecardV2/kpi/${kpiId}/storycard?dateRange=${encodeURIComponent(range)}`
  )
  return response.data
}

// ---- KPI attachments / files ----

export const getKpiAttachments = async (kpiId) => {
  const response = await axiosClient.get(`/api/kpiAttachmentList/${kpiId}`)
  return response.data
}

// ---- KPI comments ----

export const getKpiComments = async (kpiId) => {
  const response = await axiosClient.get(`/api/commentList/kpi/${kpiId}`)
  return response.data
}

// desc: comment text; createdBy: logged-in employee id (server resolves createdByName).
export const addKpiComment = async ({ kpiId, desc, createdBy }) => {
  const payload = {
    kpiId,
    fromPage: 'kpi',
    createdBy: createdBy || 0,
    commentsValue: { desc },
  }
  const response = await axiosClient.post('/api/comments', payload)
  return response.data
}

// ---- Sub-KPI ----

export const getSubKpi = async (subKpiId) => {
  const response = await axiosClient.get(`/api/subKpi/${subKpiId}`)
  return response.data
}

export const createSubKpi = async (payload) => {
  const response = await axiosClient.post('/api/subKpi', payload)
  return response.data
}

export const updateSubKpi = async (payload) => {
  const response = await axiosClient.put('/api/subKpi', payload)
  return response.data
}

export const deleteSubKpi = async (subKpiId) => {
  const response = await axiosClient.delete(`/api/subKpi/${subKpiId}`)
  return response.data
}
