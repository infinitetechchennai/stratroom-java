import { useState, useEffect, useCallback } from 'react'
import {
  getUserRole,
  getDepartmentReportees,
  getDepartmentsByOrgId,
  getPagesByDeptPageType,
  resolveLandingPages,
  loadLandingDashboard
} from '../api/landingPageApi'
import { getDateRange } from '../pages/organization/landingPageUtils'

const EMPTY_TASKS = { total: 0, completed: 0, inProgress: 0 }

const EMPTY_DASHBOARD = {
  meetings: 0,
  tasks: { ...EMPTY_TASKS },
  initiatives: [],
  risks: [],
  kpis: [],
  meetingPageUrl: null,
  taskPageUrl: null
}

function mergeDepartments(profileDepts, reporteeDepts, orgDepts) {
  const merged = []
  const seen = new Set()
  for (const list of [reporteeDepts, profileDepts, orgDepts]) {
    if (!Array.isArray(list)) continue
    for (const dept of list) {
      const id = dept?.id ?? dept?.deptId
      if (id == null || seen.has(String(id))) continue
      seen.add(String(id))
      merged.push({ id, name: dept.name ?? dept.deptName ?? `Dept ${id}` })
    }
  }
  return merged
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
  const [dashboard, setDashboard] = useState({ ...EMPTY_DASHBOARD })

  const loadDashboard = useCallback(async (deptId) => {
    if (!empId || !deptId) return
    const dateRange = getDateRange()
    try {
      const pinnedPages = await resolveLandingPages(deptId, empId)
      const data = await loadLandingDashboard(pinnedPages, empId, dateRange)
      setDashboard(data)
      setError(null)
    } catch (err) {
      setError(err?.message || 'Failed to load landing page data')
      setDashboard({ ...EMPTY_DASHBOARD })
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
        const [profile, reporteeDepts] = await Promise.all([
          getUserRole(empId),
          getDepartmentReportees().catch(() => [])
        ])

        if (cancelled) return

        setUserProfile(profile)

        const profileDepts = Array.isArray(profile?.departmentList) ? profile.departmentList : []
        const orgId = profile?.orgId ?? profile?.orgDetails?.orgId
        let orgDepts = []
        if (profileDepts.length === 0 && reporteeDepts?.length === 0 && orgId) {
          orgDepts = await getDepartmentsByOrgId(orgId).catch(() => [])
        }

        const mergedDepts = mergeDepartments(profileDepts, reporteeDepts, orgDepts)
        setDepartments(mergedDepts)

        const defaultDeptId = String(
          profileDepts[0]?.id ??
          reporteeDepts?.[0]?.id ??
          orgDepts?.[0]?.id ??
          mergedDepts[0]?.id ??
          ''
        )

        if (defaultDeptId) {
          setSelectedDeptId(defaultDeptId)
          await loadDashboard(defaultDeptId)
        } else {
          setError('No departments found — import Organisation data or assign a department to your user.')
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
