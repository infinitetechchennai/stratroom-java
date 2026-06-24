import { useState, useEffect, useCallback } from 'react'
import {
  getUserRole,
  getDepartmentReportees,
  getAllDepartmentListByLoginUser,
  getPagesByDeptPageType,
  resolveLandingPages,
  getMeetingList,
  getTaskStatusCount,
  getInitiativesList,
  getRiskList,
  getScoreCardDetails
} from '../api/landingPageApi'
import { PINNED_PAGE_TYPES } from '../pages/organization/landingPageConfig'
import { extractKpis, getDateRange } from '../pages/organization/landingPageUtils'

const EMPTY_TASKS = { total: 0, completed: 0, inProgress: 0 }

async function loadPinnedDashboardData(pinnedPages, empId, dateRange) {
  const result = {
    meetings: 0,
    tasks: { ...EMPTY_TASKS },
    initiatives: [],
    risks: [],
    kpis: [],
    meetingPageUrl: null,
    taskPageUrl: null
  }

  if (!Array.isArray(pinnedPages) || pinnedPages.length === 0) {
    return result
  }

  for (const page of pinnedPages) {
    const pageId = page.id
    const createdBy = page.createdBy
    const pageType = page.pageType

    if (pageType === PINNED_PAGE_TYPES.MEETINGS) {
      try {
        const meetings = await getMeetingList(createdBy, pageId, dateRange)
        result.meetings = Array.isArray(meetings) ? meetings.length : 0
        result.meetingPageUrl = `/dashboard/${createdBy}?pageId=${pageId}`
      } catch {
        result.meetings = 0
      }
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
      } catch {
        result.tasks = { ...EMPTY_TASKS }
      }
    }

    if (pageType === PINNED_PAGE_TYPES.INITIATIVES) {
      try {
        const initiatives = await getInitiativesList(empId, pageId, true)
        result.initiatives = Array.isArray(initiatives) ? initiatives : []
        const taskCount = result.initiatives.reduce(
          (sum, item) => sum + (item.taskList?.length || 0),
          0
        )
        if (taskCount > 0) {
          result.tasks.total = taskCount
        }
      } catch {
        result.initiatives = []
      }
    }

    if (pageType === PINNED_PAGE_TYPES.RISK) {
      try {
        const risks = await getRiskList(empId, pageId, dateRange)
        result.risks = Array.isArray(risks) ? risks : []
      } catch {
        result.risks = []
      }
    }

    if (pageType === PINNED_PAGE_TYPES.STANDARD_VIEW) {
      try {
        const details = await getScoreCardDetails(empId, pageId, dateRange)
        result.kpis = extractKpis(details)
      } catch {
        result.kpis = []
      }
    }
  }

  return result
}

export function useLandingPageData(empId) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [departments, setDepartments] = useState([])
  const [selectedDeptId, setSelectedDeptId] = useState('')
  const [selectedPageType, setSelectedPageType] = useState('')
  const [filterPages, setFilterPages] = useState([])
  const [selectedPageId, setSelectedPageId] = useState('')
  const [dashboard, setDashboard] = useState({
    meetings: 0,
    tasks: { ...EMPTY_TASKS },
    initiatives: [],
    risks: [],
    kpis: [],
    meetingPageUrl: null,
    taskPageUrl: null
  })

  const loadDashboard = useCallback(async (deptId) => {
    if (!empId || !deptId) return
    const dateRange = getDateRange()
    try {
      const pinnedPages = await resolveLandingPages(deptId, empId)
      const data = await loadPinnedDashboardData(pinnedPages, empId, dateRange)
      setDashboard(data)
    } catch (err) {
      setError(err?.message || 'Failed to load landing page data')
      setDashboard({
        meetings: 0,
        tasks: { ...EMPTY_TASKS },
        initiatives: [],
        risks: [],
        kpis: [],
        meetingPageUrl: null,
        taskPageUrl: null
      })
    }
  }, [empId])

  const loadFilterPages = useCallback(async (deptId, pageType) => {
    if (!deptId || !pageType) {
      setFilterPages([])
      return
    }
    try {
      const pages = await getPagesByDeptPageType(deptId, pageType)
      setFilterPages(Array.isArray(pages) ? pages : [])
    } catch {
      setFilterPages([])
    }
  }, [])

  useEffect(() => {
    if (!empId) {
      setLoading(false)
      return
    }

    let cancelled = false

    async function init() {
      setLoading(true)
      setError(null)
      try {
        const [profile, deptList] = await Promise.all([
          getUserRole(empId),
          // Admin -> all org departments; user -> own dept + downline (server-decided).
          // Fall back to the reportee list if the endpoint is unavailable.
          getAllDepartmentListByLoginUser(empId)
            .catch(() => getDepartmentReportees())
            .catch(() => [])
        ])

        if (cancelled) return

        setUserProfile(profile)

        const profileDepts = Array.isArray(profile?.departmentList) ? profile.departmentList : []
        const reporteeDepts = Array.isArray(deptList) ? deptList : []
        const mergedDepts = reporteeDepts.length > 0 ? reporteeDepts : profileDepts
        setDepartments(mergedDepts)

        const defaultDeptId =
          profileDepts[0]?.id ||
          reporteeDepts[0]?.id ||
          ''

        if (defaultDeptId) {
          setSelectedDeptId(String(defaultDeptId))
          await loadDashboard(defaultDeptId)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Failed to load landing page')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    init()
    return () => { cancelled = true }
  }, [empId, loadDashboard])

  const onDeptChange = useCallback(async (deptId) => {
    setSelectedDeptId(deptId)
    setSelectedPageType('')
    setSelectedPageId('')
    setFilterPages([])
    if (deptId) {
      setLoading(true)
      await loadDashboard(deptId)
      setLoading(false)
    }
  }, [loadDashboard])

  const onPageTypeChange = useCallback(async (pageType) => {
    setSelectedPageType(pageType)
    setSelectedPageId('')
    if (selectedDeptId && pageType) {
      await loadFilterPages(selectedDeptId, pageType)
    } else {
      setFilterPages([])
    }
  }, [selectedDeptId, loadFilterPages])

  const refresh = useCallback(async () => {
    if (!selectedDeptId) return
    setLoading(true)
    await loadDashboard(selectedDeptId)
    setLoading(false)
  }, [selectedDeptId, loadDashboard])

  return {
    loading,
    error,
    userProfile,
    departments,
    selectedDeptId,
    selectedPageType,
    selectedPageId,
    filterPages,
    dashboard,
    setSelectedDeptId: onDeptChange,
    setSelectedPageType: onPageTypeChange,
    setSelectedPageId,
    refresh
  }
}
