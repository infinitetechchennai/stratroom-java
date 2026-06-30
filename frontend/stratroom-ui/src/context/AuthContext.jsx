import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { loginApi, validateTokenApi, postPreAuditTrail } from '../api/authApi'
import { resetOrgChartSession } from '../utils/orgStructureSession'
import { loadAndApplyOrgTheme } from '../utils/stratroomTheme'

const AuthContext = createContext(null)

const SESSION_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_INFO: 'userInfo',
  PROFILE: 'profile',
  PERMISSIONS: 'userPermissions',
  EXPIRE_AT: 'expireAt'
}

const PRESERVE_KEYS = ['kpichartviewdata', 'empkpichartviewdata', 'saved_email', 'saved_remember', 'systemip']

function getSystemIp() {
  return localStorage.getItem('systemip') || ''
}

function captureSystemIp() {
  if (localStorage.getItem('systemip')) return
  try {
    const script = document.createElement('script')
    script.src = 'https://api.ipify.org?format=jsonp&callback=__stratroom_ip_cb'
    script.crossOrigin = 'anonymous'
    window.__stratroom_ip_cb = (res) => {
      localStorage.setItem('systemip', res.ip)
      delete window.__stratroom_ip_cb
    }
    document.head.appendChild(script)
  } catch (_) { /* best-effort */ }
}

/** Legacy JSP pages read useraccessid / rootuseraccessid from localStorage. */
function syncLegacyAccessIds(profile) {
  resetOrgChartSession(profile)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    captureSystemIp()
    bootstrapAuth()
  }, [])

  async function bootstrapAuth() {
    const token = localStorage.getItem(SESSION_KEYS.ACCESS_TOKEN)
    const profile = localStorage.getItem(SESSION_KEYS.PROFILE)
    const userInfo = localStorage.getItem(SESSION_KEYS.USER_INFO)

    if (token && profile) {
      try {
        const result = await validateTokenApi(token, userInfo)
        if (result.validationSuccess && !result.tokenExpired) {
          const parsed = JSON.parse(profile)
          if (!parsed.empId && parsed.id) parsed.empId = parsed.id
          syncLegacyAccessIds(parsed)
          setUser(parsed)
          loadAndApplyOrgTheme(parsed.orgDetails?.orgId ?? parsed.orgId)
        } else {
          clearSession()
        }
      } catch {
        clearSession()
      }
    }
    setLoading(false)
  }

  const clearSession = () => {
    Object.values(SESSION_KEYS).forEach((k) => localStorage.removeItem(k))
    localStorage.removeItem('useraccessid')
    localStorage.removeItem('rootuseraccessid')
    localStorage.removeItem('orguseraccessid')
    localStorage.removeItem('orglink')
    setUser(null)
  }

  const login = useCallback(async (userName, passWord) => {
    const data = await loginApi({ userName, passWord })

    if (!data.loginFlag) {
      if (!data.userFlag) {
        logFailedAttempt(userName)
        throw new Error('User not found. Please check your email address.')
      }
      logFailedAttempt(userName)
      throw new Error('Incorrect password. Please try again.')
    }

    const preserved = {}
    PRESERVE_KEYS.forEach((k) => {
      const v = localStorage.getItem(k)
      if (v != null) preserved[k] = v
    })
    
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && (k.startsWith('mock_') || k.startsWith('kpi_storycard_'))) {
        preserved[k] = localStorage.getItem(k)
      }
    }
    localStorage.clear()
    Object.entries(preserved).forEach(([k, v]) => localStorage.setItem(k, v))

    localStorage.setItem(SESSION_KEYS.ACCESS_TOKEN, data.accessToken)
    localStorage.setItem(SESSION_KEYS.REFRESH_TOKEN, data.refreshToken)
    localStorage.setItem(SESSION_KEYS.USER_INFO, data.userInfo || '')
    localStorage.setItem(SESSION_KEYS.PERMISSIONS, JSON.stringify(data.userPermissions || {}))
    localStorage.setItem(SESSION_KEYS.EXPIRE_AT, data.expireAt || '')
    localStorage.setItem('userloginid', userName)
    localStorage.setItem('sidebar_option', 'side-closed submenu-closed')

    const profile = data.profile || {}
    if (!profile.empId && profile.id) {
      profile.empId = profile.id
    }
    localStorage.setItem(SESSION_KEYS.PROFILE, JSON.stringify(profile))
    syncLegacyAccessIds(profile)
    setUser(profile)
    loadAndApplyOrgTheme(profile.orgDetails?.orgId ?? profile.orgId)

    return data
  }, [])

  const logout = useCallback(async () => {
    try {
      const profile = localStorage.getItem(SESSION_KEYS.PROFILE)
      const parsed = profile ? JSON.parse(profile) : {}
      const empId = parsed.empId || ''
      await postPreAuditTrail({
        userId: empId,
        createdBy: empId,
        action: 'User Logout',
        systemIp: getSystemIp()
      })
    } catch (_) { /* best-effort */ }
    clearSession()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

async function logFailedAttempt(email) {
  try {
    await postPreAuditTrail({
      action: 'Failed Login Attempts',
      emailAddress: email,
      systemIp: getSystemIp()
    })
  } catch (_) { /* best-effort */ }
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
