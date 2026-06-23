import { useState, useEffect, useMemo } from 'react'
import { usePermissions } from '../../../context/PermissionsContext'
import { useAuth } from '../../../context/AuthContext'
import { getModulePermissions } from '../../../api/controlPanelApi'
import { TAB_PERMISSIONS } from './constants'

function isTrueFlag(value) {
  return value === 'TRUE' || value === true
}

export function useControlPanelPermissions() {
  const { hasPermission, permissions } = usePermissions()
  const { user } = useAuth()
  const empId = user?.empId ?? user?.id
  const [submodules, setSubmodules] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!empId) {
      setSubmodules(null)
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    getModulePermissions(empId, 'Control Panel')
      .then((data) => {
        if (!cancelled) setSubmodules(data?.['Control Panel'] || data || {})
      })
      .catch(() => {
        if (!cancelled) setSubmodules({})
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [empId])

  const canAccessPage = useMemo(() => {
    const cp = permissions['Control Panel']
    if (Array.isArray(cp) && cp.some((p) => ['View', 'Create', 'Update', 'Delete'].includes(p))) return true
    if (!submodules || typeof submodules !== 'object') return hasPermission('Control Panel', 'View')
    return Object.values(submodules).some((mod) => mod && isTrueFlag(mod.privilegeView))
  }, [permissions, submodules, hasPermission])

  const canViewTab = (tabKey) => {
    const cfg = TAB_PERMISSIONS[tabKey]
    if (!cfg) return canAccessPage
    const mod = submodules?.[cfg.submodule]
    if (mod && isTrueFlag(mod.privilegeView)) return true
    return canAccessPage && hasPermission('Control Panel', 'View')
  }

  const canEditTab = (tabKey) => {
    const cpUpdate = hasPermission('Control Panel', 'Update') || hasPermission('Control Panel', 'Create')
    const cfg = TAB_PERMISSIONS[tabKey]
    if (!cfg) return cpUpdate
    const mod = submodules?.[cfg.submodule]
    if (cfg.editKey && mod && isTrueFlag(mod[cfg.editKey])) return true
    if (!cfg.editKey && tabKey === 'scheduler') return cpUpdate
    if (!cfg.editKey) return false
    return cpUpdate
  }

  return { loading, canAccessPage, canViewTab, canEditTab, submodules }
}
