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
