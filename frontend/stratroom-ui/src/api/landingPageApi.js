import axiosClient from './axiosClient'
import { getPageList } from './pageApi'
import { getScorecardV2 } from '../services/scorecardV2Api'
import { PINNED_PAGE_TYPES } from '../pages/organization/landingPageConfig'
import { extractKpis, extractKpisFromV2 } from '../pages/organization/landingPageUtils'

const LANDING_PAGE_TYPES = [
  PINNED_PAGE_TYPES.MEETINGS,
  PINNED_PAGE_TYPES.TASK,
  PINNED_PAGE_TYPES.INITIATIVES,
  PINNED_PAGE_TYPES.RISK,
  PINNED_PAGE_TYPES.STANDARD_VIEW
]

export const getUserRole = async (empId) => {
  const response = await axiosClient.get(`/api/userRole/${empId}`)
  return response.data
}

export const getDepartmentReportees = async () => {
  const response = await axiosClient.get('/api/departmentReportees')
  return response.data
}

export const getDepartmentsByOrgId = async (orgId) => {
  if (!orgId) return []
  const response = await axiosClient.get(`/api/departmentListByOrgId?orgId=${orgId}`)
  return response.data
}

export const getPagesByDeptPageType = async (deptId, pageType) => {
  const response = await axiosClient.get(
    `/api/pageListByDeptPageType/${deptId}?pageType=${encodeURIComponent(pageType)}`
  )
  return response.data
}

export const getPinnedPages = async (deptId) => {
  const response = await axiosClient.get(`/api/pageByPinnedList?deptId=${deptId}`)
  return response.data
}

export const getDefaultPage = async (pageType) => {
  const response = await axiosClient.get(
    `/api/getDefaultPage?pageType=${encodeURIComponent(pageType)}`
  )
  return response.data
}

async function resolveDefaultPages() {
  const pages = await Promise.all(
    LANDING_PAGE_TYPES.map(async (pageType) => {
      try {
        const page = await getDefaultPage(pageType)
        return page?.id ? page : null
      } catch {
        return null
      }
    })
  )
  return pages.filter(Boolean)
}

function pickDeptPages(allPages, deptId) {
  const deptPages = allPages.filter(
    (page) => String(page.deptId) === String(deptId)
  )
  const source = deptPages.length > 0 ? deptPages : allPages
  const picked = []

  for (const pageType of LANDING_PAGE_TYPES) {
    const page = source.find((item) => item.pageType === pageType)
    if (page) picked.push(page)
  }

  if (!picked.some((p) => p.pageType === PINNED_PAGE_TYPES.STANDARD_VIEW)) {
    const scorecard = source.find(
      (p) => p.pageType === PINNED_PAGE_TYPES.STANDARD_VIEW || p.groupType === 'Measure'
    )
    if (scorecard) picked.push(scorecard)
  }

  return picked
}

function pickAnyPages(allPages) {
  const picked = []
  for (const pageType of LANDING_PAGE_TYPES) {
    const page = allPages.find((item) => item.pageType === pageType)
    if (page) picked.push(page)
  }
  if (!picked.some((p) => p.pageType === PINNED_PAGE_TYPES.STANDARD_VIEW)) {
    const scorecard = allPages.find(
      (p) => p.pageType === PINNED_PAGE_TYPES.STANDARD_VIEW || p.groupType === 'Measure'
    )
    if (scorecard) picked.push(scorecard)
  }
  return picked
}

/** Pinned pages first (JSP behaviour), then user defaults, then dept pages. */
export async function resolveLandingPages(deptId, empId) {
  const pinned = await getPinnedPages(deptId)
  if (Array.isArray(pinned) && pinned.length > 0) {
    return pinned
  }

  const defaults = await resolveDefaultPages()
  if (defaults.length > 0) {
    return defaults
  }

  if (!empId) return []

  try {
    const allPages = await getPageList(empId)
    const pages = Array.isArray(allPages) ? allPages : []
    const byDept = pickDeptPages(pages, deptId)
    if (byDept.length > 0) return byDept
    return pickAnyPages(pages)
  } catch {
    return []
  }
}

export async function loadLandingDashboard(pinnedPages, empId, dateRange) {
  const result = {
    meetings: 0,
    tasks: { total: 0, completed: 0, inProgress: 0 },
    initiatives: [],
    risks: [],
    kpis: [],
    meetingPageUrl: null,
    taskPageUrl: null
  }
  if (!Array.isArray(pinnedPages) || pinnedPages.length === 0) return result

  for (const page of pinnedPages) {
    const pageId = page.id
    const createdBy = page.createdBy
    const pageType = page.pageType

    if (pageType === PINNED_PAGE_TYPES.MEETINGS) {
      try {
        const meetings = await getMeetingList(createdBy, pageId, dateRange)
        result.meetings = Array.isArray(meetings) ? meetings.length : 0
        result.meetingPageUrl = `/dashboard/${createdBy}?pageId=${pageId}`
      } catch { /* optional module */ }
    }

    if (pageType === PINNED_PAGE_TYPES.TASK) {
      try {
        const stats = await getTaskStatusCount(empId, dateRange)
        result.tasks = {
          total: stats?.totalTask ?? 0,
          completed: stats?.totalComplete ?? 0,
          inProgress: stats?.totalInProgress ?? 0
        }
        result.taskPageUrl = `/task?pageId=${pageId}`
      } catch { /* optional module */ }
    }

    if (pageType === PINNED_PAGE_TYPES.INITIATIVES) {
      try {
        const initiatives = await getInitiativesList(empId, pageId, true)
        result.initiatives = Array.isArray(initiatives) ? initiatives : []
      } catch { /* optional module */ }
    }

    if (pageType === PINNED_PAGE_TYPES.RISK) {
      try {
        const risks = await getRiskList(empId, pageId, dateRange)
        result.risks = Array.isArray(risks) ? risks : []
      } catch { /* optional module */ }
    }

    if (pageType === PINNED_PAGE_TYPES.STANDARD_VIEW || page.groupType === 'Measure') {
      try {
        const v2 = await getScorecardV2(pageId, dateRange)
        const fromV2 = extractKpisFromV2(v2)
        if (fromV2.length > 0) {
          result.kpis = fromV2
          continue
        }
      } catch { /* fall through to legacy */ }
      try {
        const details = await getScoreCardDetails(empId, pageId, dateRange)
        result.kpis = extractKpis(details)
      } catch { /* optional module */ }
    }
  }

  return result
}

export const getMeetingList = async (empId, pageId, dateRange = '') => {
  const params = new URLSearchParams()
  if (pageId) params.set('pageId', String(pageId))
  if (dateRange) params.set('dateRange', dateRange)
  const qs = params.toString()
  const response = await axiosClient.get(
    `/api/meetingManagementList/${empId}${qs ? `?${qs}` : ''}`
  )
  return response.data
}

export const getTaskStatusCount = async (empId, dateRange = '') => {
  const params = dateRange ? `?dateRange=${encodeURIComponent(dateRange)}` : ''
  const response = await axiosClient.get(`/api/retrieveTaskStatusCount/${empId}${params}`)
  return response.data
}

export const getInitiativesList = async (empId, pageId, loadFlag = true) => {
  const params = new URLSearchParams()
  params.set('loadFlag', String(loadFlag))
  if (pageId) params.set('pageId', String(pageId))
  const response = await axiosClient.get(
    `/api/initiativesList/${empId}?${params.toString()}`
  )
  return response.data
}

export const getRiskList = async (empId, pageId, dateRange = '') => {
  const params = new URLSearchParams()
  if (pageId) params.set('pageId', String(pageId))
  if (dateRange) params.set('dateRange', dateRange)
  const qs = params.toString()
  const response = await axiosClient.get(`/api/riskList/${empId}${qs ? `?${qs}` : ''}`)
  return response.data
}

export const getScoreCardDetails = async (empId, pageId, dateRange = '') => {
  const params = new URLSearchParams()
  if (pageId) params.set('pageId', String(pageId))
  params.set('loadFlag', 'false')
  if (dateRange) params.set('dateRange', dateRange)

  const endpoint = dateRange
    ? `/api/scoreCardDetailsListByDate/${empId}`
    : `/api/scoreCardDetailList/${empId}`

  const response = await axiosClient.get(`${endpoint}?${params.toString()}`)
  return response.data
}

export const getPerformanceEntry = async (empId) => {
  const response = await axiosClient.get(`/api/getPerformanceEntry/${empId}`)
  return response.data
}
