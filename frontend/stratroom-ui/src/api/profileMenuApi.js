import axiosClient from './axiosClient'

export function getEmpId() {
  try {
    const p = JSON.parse(localStorage.getItem('profile') || '{}')
    return p?.empId ?? p?.id ?? null
  } catch {
    return null
  }
}

export function getOrgId() {
  try {
    const p = JSON.parse(localStorage.getItem('profile') || '{}')
    return p?.orgDetails?.orgId ?? p?.orgId ?? null
  } catch {
    return null
  }
}

// ---- Audit trail ----

export async function getAuditTrailList(params = {}) {
  const res = await axiosClient.get('/api/auditTrailList', { params })
  return res.data
}

export async function getAuditTrailActions() {
  const res = await axiosClient.get('/api/auditTrailActionList')
  return res.data
}

export async function exportAuditTrail(params = {}) {
  const res = await axiosClient.get('/api/downloadAuditTrail', {
    params,
    responseType: 'blob',
  })
  return res.data
}

// ---- Profile ----

export async function getProfileDetails(empId) {
  const res = await axiosClient.get(`/api/getProfileDetails/${empId}`)
  return res.data
}

export async function getUserRoleSummary(empId) {
  const res = await axiosClient.get(`/api/userRole/${empId}`)
  return res.data
}

// ---- Performance contract / improvement plan ----

export async function getDepartmentReportees() {
  const res = await axiosClient.get('/api/departmentReportees')
  return res.data
}

export async function getScorecardsByDept(deptId) {
  const res = await axiosClient.get('/api/getscoreCardListByDeptIds', {
    params: { deptIds: String(deptId) },
  })
  return res.data
}

export async function getPerformanceFormData(scorecardId) {
  const res = await axiosClient.get(`/api/subkpiEntryList/${scorecardId}`, {
    params: { employeeView: true },
  })
  return res.data
}

export async function getPerformanceHistory(empId) {
  const res = await axiosClient.get(`/api/getPerformanceEntry/${empId}`)
  return res.data
}

export async function savePerformanceContract(dto) {
  const res = await axiosClient.post('/api/web/saveSubkpiEntry', dto)
  return res.data
}
