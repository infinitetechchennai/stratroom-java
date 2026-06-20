import axiosClient from './axiosClient'

// Control Panel API layer (consolidated backend /api). Headers (USER_ORG_ID,
// LOGGED_IN_EMPLOYEE_ID …) are injected by axiosClient.

export function getOrgId() {
  try {
    const p = JSON.parse(localStorage.getItem('profile') || '{}')
    return p?.orgDetails?.orgId ?? p?.orgId ?? null
  } catch {
    return null
  }
}

// ---- General Settings ----

export const getGeneralSettings = async (orgId) => {
  const res = await axiosClient.get(`/api/generalSettingList/${orgId}`)
  return res.data // List<ControlPanelGeneralDTO>
}

export const createGeneralSetting = async (dto) => {
  const res = await axiosClient.post('/api/generalSetting', dto)
  return res.data
}

export const updateGeneralSetting = async (dto) => {
  const res = await axiosClient.put('/api/generalSetting', dto)
  return res.data
}

// ---- Theme ----

export const getThemeList = async (orgId) => {
  const res = await axiosClient.get(`/api/themeList/${orgId}`)
  return res.data
}
export const createTheme = async (dto) => (await axiosClient.post('/api/theme', dto)).data
export const updateTheme = async (dto) => (await axiosClient.put('/api/theme', dto)).data

// ---- Security ----

export const getSecurityList = async (orgId) => {
  const res = await axiosClient.get(`/api/controlPanelSecurityList/${orgId}`)
  return res.data
}
export const createSecurity = async (dto) => (await axiosClient.post('/api/controlPanelSecurity', dto)).data
export const updateSecurity = async (dto) => (await axiosClient.put('/api/controlPanelSecurity', dto)).data

// ---- Workflow ----

export const getWorkflows = async () => (await axiosClient.get('/api/retriveWorkFlow')).data
export const saveWorkflow = async (dto) => (await axiosClient.post('/api/saveWorkFlow', dto)).data
export const updateWorkflow = async (dto) => (await axiosClient.put('/api/updateWorkFlow', dto)).data

// ---- Scorecard Settings (Custom Performance) ----

export const getCustomPerformanceDetails = async () => {
  const res = await axiosClient.get('/api/customPerformance/details')
  return res.data
}

export const saveCustomPerformance = async (dto) => {
  const res = await axiosClient.post('/api/customPerformance', dto)
  return res.data
}

export const getRiskSettingsDetails = async () => {
  const res = await axiosClient.get('/api/customPerformance/riskdetails')
  return res.data
}

export const saveRiskSettings = async (dto) => {
  const res = await axiosClient.post('/api/customPerformance/risk', dto)
  return res.data
}
