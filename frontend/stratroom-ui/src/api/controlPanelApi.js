import axiosClient from './axiosClient'

export function getOrgId() {
  try {
    const p = JSON.parse(localStorage.getItem('profile') || '{}')
    return p?.orgDetails?.orgId ?? p?.orgId ?? null
  } catch {
    return null
  }
}

export function getEmpId() {
  try {
    const p = JSON.parse(localStorage.getItem('profile') || '{}')
    return p?.empId ?? p?.id ?? null
  } catch {
    return null
  }
}

// ---- Permissions ----

export const getModulePermissions = async (empId, moduleName) => {
  const res = await axiosClient.get(
    `/api/user/modulePermissions/${empId}?moduleName=${encodeURIComponent(moduleName)}`
  )
  return res.data
}

// ---- General Settings ----

export const getGeneralSettings = async (orgId) => {
  const res = await axiosClient.get(`/api/generalSettingList/${orgId}`)
  return res.data
}

export const createGeneralSetting = async (dto) => {
  const res = await axiosClient.post('/api/generalSetting', dto)
  return res.data
}

export const updateGeneralSetting = async (dto) => {
  const res = await axiosClient.put('/api/generalSetting', dto)
  return res.data
}

export async function loadGeneralSettingRow(orgId) {
  const list = await getGeneralSettings(orgId)
  const dto = Array.isArray(list) ? list[0] : list
  return dto ? { ...dto, orgId: dto.orgId ?? orgId } : { orgId, generalSettingValue: {} }
}

export async function patchGeneralSetting(orgId, patchGsv, baseDto = null) {
  const dto = baseDto || await loadGeneralSettingRow(orgId)
  const generalSettingValue = { ...(dto.generalSettingValue || {}), ...patchGsv }
  const payload = { ...dto, orgId, generalSettingValue }
  if (dto.id) return updateGeneralSetting(payload)
  return createGeneralSetting(payload)
}

export const getCurrencyList = async () => (await axiosClient.get('/api/currencyList')).data

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
export const getWorkflowById = async (id) => (await axiosClient.get(`/api/retriveWorkFlow/${id}`)).data
export const saveWorkflow = async (dto) => (await axiosClient.post('/api/saveWorkFlow', dto)).data
export const updateWorkflow = async (dto) => (await axiosClient.put('/api/updateWorkFlow', dto)).data
export const deleteWorkflow = async (id) => (await axiosClient.delete(`/api/deleteWorkFlow/${id}`)).data

// ---- Scorecard Settings (Custom Performance) ----

export const getCustomPerformanceDetails = async () => {
  const res = await axiosClient.get('/api/customPerformance/details')
  return res.data
}

export const saveCustomPerformance = async (dto) => {
  const res = await axiosClient.post('/api/customPerformance', dto)
  return res.data
}

// ---- Risk Settings ----

export const getRiskSettingsDetails = async () => {
  const res = await axiosClient.get('/api/customPerformance/riskdetails')
  return res.data
}

export const saveRiskSettings = async (dto) => {
  const res = await axiosClient.post('/api/customPerformance/risk', dto)
  return res.data
}

export const getRiskOptionList = async () => (await axiosClient.get('/api/riskoptionlist')).data

// ---- License / Backup ----

export const getLicenseDetails = async () => {
  const res = await axiosClient.get('/api/licenseDetails')
  return res.data
}

export const getRestorePaths = async (orgId) => {
  const res = await axiosClient.get('/api/restorePath', { params: { orgId: String(orgId) } })
  return res.data
}

export const runScriptRestore = async (path, orgId) => {
  const res = await axiosClient.get('/api/scriptrestore', { params: { path, orgId: String(orgId) } })
  return res.data
}
