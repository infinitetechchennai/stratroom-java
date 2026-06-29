import axiosClient from './axiosClient'

// API layer for the Scorecard standard view, migrated from the legacy jQuery
// pages standard_view.js / standard_view_view.js. Calls target the consolidated
// backend (/api). Auth, session and date-period headers are added by axiosClient.

// ---- Scorecard / perspective ----

export const getScorecard = async (scorecardId) => {
  const response = await axiosClient.get(`/api/scorecard/${scorecardId}`)
  return response.data
}

export const saveScorecard = async (payload) => {
  const response = await axiosClient.post('/api/scorecard', payload)
  return response.data
}
export const getScorecardDetails = async (params = {}) => {
  const query = new URLSearchParams(params).toString()
  const response = await axiosClient.get(`/api/scorecardDetails${query ? `?${query}` : ''}`)
  return response.data
}

export const getScoreCardDetailListByEmpId = async (empId) => {
  const response = await axiosClient.get(`/api/scoreCardDetailListByEmpId/${empId}`)
  return response.data
}


export const saveScorecardDetails = async (payload) => {
  const response = await axiosClient.post('/api/scorecardDetails', payload)
  return response.data
}

// type: undefined | 'save' | 'validation' — mirrors the legacy save/validate flows.
export const saveScoreCardDetails = async (payload, type) => {
  const url = type ? `/api/saveScoreCardDetails?type=${encodeURIComponent(type)}` : '/api/saveScoreCardDetails'
  const response = await axiosClient.post(url, payload)
  return response.data
}

export const changePerspectiveName = async (scorecardId, name) => {
  const response = await axiosClient.put(
    `/api/changePerspectiveName?scorecardId=${encodeURIComponent(scorecardId)}&name=${encodeURIComponent(name)}`
  )
  return response.data
}

// ---- Objectives ----

export const getObjectives = async (objectiveId) => {
  const response = await axiosClient.get(`/api/objectives/${objectiveId}`)
  return response.data
}

export const saveObjectives = async (payload) => {
  const response = await axiosClient.post('/api/objectives', payload)
  return response.data
}

// ---- Tree / node keys ----

export const getNodeKeyList = async () => {
  const response = await axiosClient.get('/api/retrieveNodeKeyList')
  return response.data
}

// ---- Preferences / audit ----

export const getScorecardPreferences = async (pageId) => {
  const response = await axiosClient.get(
    `/api/getPreferences?pageName=SCORECARD&pageId=${encodeURIComponent(pageId)}`
  )
  return response.data
}

export const saveEmployeePreference = async (payload) => {
  const response = await axiosClient.post('/api/employeePreference', payload)
  return response.data
}

export const saveAuditTrail = async (payload) => {
  const response = await axiosClient.post('/api/auditTrail', payload)
  return response.data
}

// ---- Formulation ----

export const getStrategyFormulationList = async (status = 'Approved') => {
  const response = await axiosClient.get(
    `/api/strategyFormulationList?status=${encodeURIComponent(status)}`
  )
  return response.data
}

export const applyFormulation = async (formulationId) => {
  const response = await axiosClient.get(
    `/api/formulation/applyFormulation?formulationId=${encodeURIComponent(formulationId)}`
  )
  return response.data
}

export const validateFormula = async (payload) => {
  const response = await axiosClient.post('/api/validateFormula', payload)
  return response.data
}

export const getMeasureNames = async () => {
  const response = await axiosClient.get('/api/measureNames')
  return response.data
}

// ---- Page-support lookups used by the scorecard view (people / dept / role) ----
// These are cross-cutting endpoints the scorecard page consumes directly.

export const getReporteeList = async () => {
  const response = await axiosClient.get('/api/reporteeList')
  return response.data
}

export const getCompleteReporteeList = async () => {
  const response = await axiosClient.get('/api/completereporteeList')
  return response.data
}

export const getDepartmentReportees = async () => {
  const response = await axiosClient.get('/api/departmentReportees')
  return response.data
}

export const getAllDepartmentList = async () => {
  const response = await axiosClient.get('/api/allDepartmentList')
  return response.data
}

export const getUserRole = async (id) => {
  const response = await axiosClient.get(`/api/userRole/${id}`)
  return response.data
}

// Backend RoleController signature is /user/modulePermissions/{empId}?moduleName=...
export const getScorecardModulePermissions = async (empId, moduleName = 'Scorecard') => {
  const response = await axiosClient.get(
    `/api/user/modulePermissions/${empId}?moduleName=${encodeURIComponent(moduleName)}`
  )
  return response.data
}
