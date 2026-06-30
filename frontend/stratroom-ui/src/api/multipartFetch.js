/**
 * Browser fetch for multipart uploads — avoids axios Content-Type issues.
 */

function readSessionProfile() {
  try {
    const raw = localStorage.getItem('profile')
    if (!raw) return null
    const profile = JSON.parse(raw)
    if (profile && !profile.empId && profile.id) profile.empId = profile.id
    return profile
  } catch {
    return null
  }
}

export function buildStratroomUploadHeaders() {
  const headers = { Accept: 'application/json' }
  const token = localStorage.getItem('accessToken')
  if (token) headers.Authorization = `Bearer ${token}`
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo && userInfo.startsWith('ENC(')) headers.USER_INFO = userInfo

  const profile = readSessionProfile()
  if (profile) {
    const empId = profile.empId ?? profile.id
    const orgId = profile.orgDetails?.orgId ?? profile.orgId
    const deptId = profile.deptDetails?.id ?? profile.deptId
    if (empId != null && empId !== '') {
      headers.LOGGED_IN_EMPLOYEE_ID = String(empId)
      headers.SUPER_USER_ID = String(empId)
    }
    if (orgId != null && orgId !== '') headers.USER_ORG_ID = String(orgId)
    if (deptId != null && deptId !== '') {
      headers.LOGGED_IN_DEPT_ID = String(deptId)
      headers.LOGGED_IN_DEPT_ID_FIELD = String(deptId)
    }
  }

  const y = new Date().getFullYear()
  headers.DATE_PERIOD = localStorage.getItem('customperiod') || `01/01/${y}-12/31/${y}`
  return headers
}

export async function postMultipart(path, formData, { timeout = 300000 } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(path, {
      method: 'POST',
      body: formData,
      headers: buildStratroomUploadHeaders(),
      signal: controller.signal,
    })
    let data = {}
    try {
      data = await res.json()
    } catch {
      data = {}
    }
    if (!res.ok && data?.message == null) {
      data.message = `Upload failed (${res.status})`
    }
    return { ok: res.ok, status: res.status, data }
  } finally {
    clearTimeout(timer)
  }
}
