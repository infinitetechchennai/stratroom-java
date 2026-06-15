import axiosClient from './axiosClient'
import { getPageList } from './pageApi'
import { PINNED_PAGE_TYPES } from '../pages/organization/landingPageConfig'

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
    return pickDeptPages(Array.isArray(allPages) ? allPages : [], deptId)
  } catch {
    return []
  }
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
