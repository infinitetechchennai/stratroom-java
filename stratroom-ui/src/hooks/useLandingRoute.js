import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getHomePreferences } from '../api/homePreferencesApi'
import { getPageDetails } from '../api/pageApi'

const WHITEBOARD_TYPES = ['Cockpit', 'Charts', 'StrategyMap', 'Report']

export default function useLandingRoute() {
  const { user, isAuthenticated } = useAuth()
  const [landingPath, setLandingPath] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated || !user?.empId) {
      setLoading(false)
      return
    }

    resolveLanding(user.empId)
  }, [isAuthenticated, user?.empId])

  async function resolveLanding(empId) {
    try {
      const prefs = await getHomePreferences(empId)

      if (!prefs || (!prefs.pageId && !prefs.pageName)) {
        setLandingPath('/landing')
        setLoading(false)
        return
      }

      if (prefs.pageId && prefs.pageId > 0) {
        try {
          const page = await getPageDetails(prefs.pageId)
          if (page && page.pageType) {
            if (WHITEBOARD_TYPES.includes(page.pageType)) {
              setLandingPath(`/whiteboard?pageId=${prefs.pageId}`)
            } else {
              setLandingPath(`/dashboard-page?pageId=${prefs.pageId}`)
            }
          } else {
            setLandingPath('/landing')
          }
        } catch {
          setLandingPath('/landing')
        }
        setLoading(false)
        return
      }

      switch (prefs.pageName) {
        case 'Organisation':
          setLandingPath('/org-structure')
          break
        case 'Control Panel':
          setLandingPath('/control-panel')
          break
        case 'Audit Trail':
          setLandingPath('/audit-trail')
          break
        case 'User Role':
          setLandingPath('/user-role-management')
          break
        default:
          setLandingPath('/landing')
      }
    } catch {
      setLandingPath('/landing')
    } finally {
      setLoading(false)
    }
  }

  return { landingPath, loading }
}
