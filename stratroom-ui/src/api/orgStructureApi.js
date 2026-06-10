import axiosClient from './axiosClient'

export const getControlPanelSettings = async (orgId) => {
  const response = await axiosClient.get(`/api/generalSettingList/${orgId}`)
  return response.data
}

export const getDepartmentChart = async (ownerId, year = '0') => {
  const response = await axiosClient.get(
    `/api/${ownerId}/departmentByEmployeeList?year=${encodeURIComponent(year)}`
  )
  return response.data
}

export const getEmployeeOrgChart = async (empId) => {
  const response = await axiosClient.get(`/api/${empId}/employeeList`)
  return response.data
}

function normalizeDeptNode(node) {
  if (!node) return null
  return {
    id: node.deptId,
    groupId: node.deptId,
    name: node.deptName || node.ownerName || 'Unnamed',
    groupName: node.deptName || node.ownerName || 'Unnamed',
    description: node.ownerName || node.designation || '',
    children: (node.children || []).map(normalizeDeptNode).filter(Boolean)
  }
}

function normalizeEmployeeNode(node) {
  if (!node) return null
  const name =
    [node.firstName, node.lastName].filter(Boolean).join(' ') ||
    node.name ||
    node.ownerName ||
    node.userName ||
    'Unnamed'
  const children = node.children || node.reporteeList || []
  return {
    id: node.empId,
    groupId: node.empId,
    name,
    groupName: name,
    description: node.department || node.deptName || node.title || node.designation || '',
    children: children.map(normalizeEmployeeNode).filter(Boolean)
  }
}

export async function fetchDepartmentList(empId, datePeriod = '', name = '') {
  const response = await axiosClient.get(
    `/api/allDepartmentListByLoginUser?empId=${empId}&datePeriod=${encodeURIComponent(datePeriod)}&name=${encodeURIComponent(name)}`
  )
  return response.data
}

export async function fetchDesignationList(datePeriod = '', name = '') {
  const response = await axiosClient.get(
    `/api/designationList?datePeriod=${encodeURIComponent(datePeriod)}&name=${encodeURIComponent(name)}`
  )
  return response.data
}

export async function fetchOrgTrackList(flagType, datePeriod = '', id = '') {
  const params = new URLSearchParams({ flagType, datePeriod })
  if (id) params.set('id', id)
  const response = await axiosClient.get(`/api/orgTrackList?${params}`)
  return response.data
}

export async function clearOrgTrack(id) {
  const response = await axiosClient.delete(`/api/clearOrgTrack/${id}`)
  return response.data
}

export async function fetchAllKpiDetails() {
  const response = await axiosClient.get('/api/retrieveNodeKeyList')
  return response.data
}

export async function fetchOrgStructure(empId, orgId) {
  let useDepartmentChart = false

  if (orgId) {
    try {
      const settings = await getControlPanelSettings(orgId)
      useDepartmentChart = settings?.implementationType === 'Department'
    } catch {
      useDepartmentChart = false
    }
  }

  if (useDepartmentChart) {
    try {
      const root = await getDepartmentChart(empId, '0')
      const normalized = normalizeDeptNode(root)
      if (normalized) return [normalized]
    } catch {
      // fall through to employee chart
    }
  }

  const root = await getEmployeeOrgChart(empId)
  const normalized = normalizeEmployeeNode(root)
  return normalized ? [normalized] : []
}
