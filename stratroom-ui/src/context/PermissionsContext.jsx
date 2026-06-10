import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'
import axiosClient from '../api/axiosClient'
import { getPageList } from '../api/pageApi'

const PermissionsContext = createContext(null)

export function PermissionsProvider({ children }) {
  const { user, isAuthenticated } = useAuth()
  const [permissions, setPermissions] = useState({})
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(false)

  const loadPermissionsAndPages = useCallback(async () => {
    const empId = user?.empId ?? user?.id
    if (!empId) return

    const storedPerms = localStorage.getItem('userPermissions')
    if (storedPerms) {
      try {
        setPermissions(JSON.parse(storedPerms))
      } catch {
        /* ignore malformed cache */
      }
    }

    setLoading(true)
    try {
      const [permsRes, pagesRes] = await Promise.all([
        axiosClient.get(`/api/user/permissions/${empId}`),
        getPageList(empId)
      ])
      setPermissions(permsRes.data || {})
      setPages(pagesRes || [])
    } catch (err) {
      console.error('Failed to load permissions/pages', err)
    } finally {
      setLoading(false)
    }
  }, [user?.empId, user?.id])

  useEffect(() => {
    const empId = user?.empId ?? user?.id
    if (isAuthenticated && empId) {
      loadPermissionsAndPages()
    } else {
      setPermissions({})
      setPages([])
    }
  }, [isAuthenticated, user?.empId, user?.id, loadPermissionsAndPages])

  const hasPermission = (moduleName, privilege = 'View') => {
    const perms = permissions[moduleName]
    return Array.isArray(perms) && perms.includes(privilege)
  }

  const isModuleVisible = (moduleKey) => {
    switch (moduleKey) {
      case 'Plan':
      case 'Measure':
      case 'Execute':
        return true
      case 'Govern':
        return !!permissions['Data Sources']
      case 'Reports':
      case 'Meet':
        return !!(permissions['Templates'] || permissions['Template'])
      default:
        return false
    }
  }

  return (
    <PermissionsContext.Provider value={{ permissions, pages, loading, hasPermission, isModuleVisible, reload: loadPermissionsAndPages }}>
      {children}
    </PermissionsContext.Provider>
  )
}

export function usePermissions() {
  const ctx = useContext(PermissionsContext)
  if (!ctx) throw new Error('usePermissions must be used within PermissionsProvider')
  return ctx
}
