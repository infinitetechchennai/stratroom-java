import axiosClient from './axiosClient'
import { getDepartmentReportees, getDepartmentsByOrgId } from './landingPageApi'

function readProfileOrgId() {
  try {
    const raw = localStorage.getItem('profile')
    if (!raw) return null
    const profile = JSON.parse(raw)
    const orgId = profile?.orgDetails?.orgId ?? profile?.orgId
    return orgId != null && orgId !== '' ? orgId : null
  } catch {
    return null
  }
}

/**
 * Legacy riskDashboard.jsp: primary source is /departmentReportees (childList).
 * Legacy childList also falls back to all org departments when USER_ORG_ID is set
 * and the user has no dept subtree — mirror that here when reportees is empty.
 */
export async function getRiskDashboardDepartments() {
  let list = await getDepartmentReportees()
  if (!Array.isArray(list)) list = []

  if (list.length === 0) {
    const orgId = readProfileOrgId()
    if (orgId) {
      try {
        const orgDepts = await getDepartmentsByOrgId(orgId)
        if (Array.isArray(orgDepts) && orgDepts.length > 0) {
          list = orgDepts
        }
      } catch {
        // keep empty
      }
    }
  }

  return list
    .map((dept) => ({
      id: dept?.id ?? dept?.deptId,
      name: dept?.name ?? dept?.deptName ?? (dept?.id != null ? `Dept ${dept.id}` : ''),
    }))
    .filter((dept) => dept.id != null && dept.name)
}

export async function getRiskDashboardData(deptId) {
  if (!deptId) {
    return {
      totalRisk: 0,
      totalTreatment: 0,
      totalMonitoring: 0,
      totalPlan: 0,
      riskDTO: [],
      categoryCount: {},
      statusCount: {},
      treatmentSrategyCount: {},
      likelihoodCount: {}
    }
  }
  const response = await axiosClient.get('/api/riskDashBoardData', { params: { deptId } })
  return response.data
}
