import { useState, useEffect, useMemo } from 'react'
import { usePermissions } from '../../../context/PermissionsContext'
import { useAuth } from '../../../context/AuthContext'
import { getModulePermissions } from '../../../api/controlPanelApi'
import { TAB_PERMISSIONS } from './constants'

function isTrueFlag(value) {
  return value === 'TRUE' || value === true
}

// The backend serves these flags from a JDBC `queryForMap`, so Postgres returns the column names
// lowercased (`privilegeview`), while JPA-backed responses use camelCase (`privilegeView`). Read
// either form so the gating works regardless of which path produced the data.
function readFlag(mod, key) {
  if (!mod) return undefined
  const camel = mod[key]
  return camel !== undefined ? camel : mod[key.toLowerCase()]
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
    return Object.values(submodules).some((mod) => isTrueFlag(readFlag(mod, 'privilegeView')))
  }, [permissions, submodules, hasPermission])

  const canViewTab = (tabKey) => {
    const cfg = TAB_PERMISSIONS[tabKey]
    // okr / workflow have no submodule in the permission catalog — they are not individually
    // grantable, so they follow page-level access.
    if (!cfg) return canAccessPage
    // A tab backed by a submodule shows ONLY when that submodule grants View. Previously this
    // fell back to the module-level "Control Panel: View" privilege, which made every tab visible
    // as soon as any single submodule (e.g. Theme) was granted.
    const mod = submodules?.[cfg.submodule]
    return !!(mod && isTrueFlag(readFlag(mod, 'privilegeView')))
  }

  const canEditTab = (tabKey) => {
    const cpUpdate = hasPermission('Control Panel', 'Update') || hasPermission('Control Panel', 'Create')
    const cfg = TAB_PERMISSIONS[tabKey]
    if (!cfg) return cpUpdate
    const mod = submodules?.[cfg.submodule]
    if (cfg.editKey && mod && isTrueFlag(readFlag(mod, cfg.editKey))) return true
    if (!cfg.editKey && tabKey === 'scheduler') return cpUpdate
    if (!cfg.editKey) return false
    return cpUpdate
  }

  return { loading, canAccessPage, canViewTab, canEditTab, submodules }
}
