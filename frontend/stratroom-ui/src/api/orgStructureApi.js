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

// Historical snapshot: the hierarchy as it stood on `asOf` (YYYY-MM-DD).
export const getEmployeeOrgChartAsOf = async (empId, asOf) => {
  const response = await axiosClient.get(
    `/api/${empId}/employeeListAsOf?asOf=${encodeURIComponent(asOf)}`
  )
  return response.data
}

function normalizeDeptNode(node) {
  if (!node) return null
  // Department-mode chart: lead with the owner (person), show dept as a chip —
  // mirrors the employee-mode layout of "name + title/dept/location chips".
  const personName = node.ownerName || node.deptName || 'Unnamed'
  return {
    id: node.deptId,
    groupId: node.deptId,
    ownerId: node.owner ?? null,
    name: personName,
    groupName: personName,
    description: node.deptName || '',
    designation: node.designation || '',
    department: node.deptName || '',
    deptCode: node.deptUniqueId || '',
    location: '',
    email: node.emailAddress || '',
    photo: node.deptImage || null,
    canMaintain: node.canMaintain !== false,
    children: (node.children || []).map(normalizeDeptNode).filter(Boolean)
  }
}

// Dept-chart nodes don't carry location/title — those live on the owner's employee
// profile. Build an empId → employee map from the employee chart and join them in.
function flattenRawEmployees(node, out = {}) {
  if (!node) return out
  const id = node.empId ?? node.id
  if (id != null) out[id] = node
  const kids = node.children || node.reporteeList || []
  kids.forEach(k => flattenRawEmployees(k, out))
  return out
}

function enrichDeptTreeWithOwners(node, empMap) {
  if (!node) return
  const emp = node.ownerId != null ? empMap[node.ownerId] : null
  if (emp) {
    node.designation = node.designation || emp.title || ''
    node.location = emp.location || ''
    node.email = node.email || emp.email || emp.emailAddress || ''
    node.photo = node.photo || emp.image || emp.profileImage || null
  }
  node.children.forEach(c => enrichDeptTreeWithOwners(c, empMap))
}

function normalizeEmployeeNode(node) {
  if (!node) return null
  const name =
    [node.firstName || node.name, node.lastName].filter(Boolean).join(' ') ||
    node.ownerName ||
    node.userName ||
    'Unnamed'
  const children = node.children || node.reporteeList || []
  return {
    id: node.empId ?? node.id,
    groupId: node.empId ?? node.id,
    name,
    groupName: name,
    // Employee bean JSON: title=designation, dept=department name, plus location/email/image
    description: node.title || node.dept || node.department || node.deptName || node.designation || '',
    designation: node.title || '',
    department: node.dept || node.department || node.deptName || '',
    deptCode: node.deptUniqueId || node.deptDetails?.deptID || '',
    location: node.location || '',
    email: node.email || node.emailAddress || '',
    photo: node.image || node.profileImage || null,
    members: node.allRepoteeCount ?? '',
    canMaintain: node.canMaintain !== false,
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

export async function createEmployee(payload) {
  const response = await axiosClient.post('/api/createEmployee', payload)
  return response.data
}

export async function updateEmployee(payload) {
  const response = await axiosClient.post('/api/updateEmployee', payload)
  return response.data
}

export async function deleteEmployee(empId) {
  const response = await axiosClient.get(`/api/deleteEmployee/${empId}`)
  return response.data
}

// Deletes a department chart node (dept-mode). Removes the dept from the hierarchy;
// the owner employee record is kept intact.
export async function deleteDepartmentMapping(deptId) {
  const response = await axiosClient.get(`/api/deleteOrgDept/${deptId}`)
  return response.data
}

// Creates a department-chart node (department + owner + parent link) and assigns members.
// This is how subordinates are added in Department-mode orgs — a loose employee record
// alone is invisible because the hierarchy is driven by department_chart_details.
export async function addDepartmentMapping(payload) {
  const response = await axiosClient.post('/api/addDepartmentMapping', payload)
  return response.data
}

// Bulk department-hierarchy import (the "Org" file): each row is a department with a
// parent department, an owner (resolved by name on the backend), and members.
export async function createBulkDeptMapping(deptList) {
  const response = await axiosClient.post('/api/createBulkDeptMapping', deptList, { timeout: 300000 })
  return response.data
}

// Switches the org between 'Employee' and 'Department' implementation modes.
export async function setImplementationMode(orgId, type) {
  const response = await axiosClient.post(
    `/api/implementationType?orgId=${encodeURIComponent(orgId)}&type=${encodeURIComponent(type)}`
  )
  return response.data
}

// Returns { nodes, departmentMode } so callers know which add/edit flow applies.
// When `asOf` (YYYY-MM-DD) is supplied, the employee chart is rebuilt as it stood on
// that date (historical view); otherwise the current live tree is returned.
export async function fetchOrgStructure(empId, orgId, asOf = null) {
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
      if (root?.message === 'no OrgStructure Access') {
        return { nodes: [], departmentMode: true, accessDenied: true }
      }
      const normalized = normalizeDeptNode(root)
      if (normalized) {
        try {
          const empRoot = await getEmployeeOrgChart(empId)
          enrichDeptTreeWithOwners(normalized, flattenRawEmployees(empRoot))
        } catch {
          // enrichment is best-effort — dept tree still renders without it
        }
        return { nodes: [normalized], departmentMode: true }
      }
    } catch {
      // fall through to employee chart
    }
  }

  const root = asOf
    ? await getEmployeeOrgChartAsOf(empId, asOf)
    : await getEmployeeOrgChart(empId)
  if (root?.message === 'no OrgStructure Access') {
    return { nodes: [], departmentMode: false, accessDenied: true }
  }
  const normalized = normalizeEmployeeNode(root)
  return { nodes: normalized ? [normalized] : [], departmentMode: false }
}
