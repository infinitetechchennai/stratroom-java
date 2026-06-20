import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePermissions } from '../context/PermissionsContext'
import { useI18n } from '../context/I18nContext'
import { getDisplayName, getInitials } from '../pages/organization/landingPageUtils'
import axiosClient from '../api/axiosClient'

// Notification bell + settings gear + profile avatar cluster.
// Lives in the main navbar (right of the module links) to match the app shell.
export default function UserMenu() {
  const { user, logout } = useAuth()
  const { hasPermission } = usePermissions()
  const { t } = useI18n()
  const navigate = useNavigate()
  const displayName = getDisplayName(user)
  const initials = getInitials(displayName)

  const [notifications, setNotifications] = useState([])
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)
  const settingsRef = useRef(null)

  // Per-item permission gating: show an item only if the user has 'View' on the
  // matching module. Each item lists candidate module names (the backend uses
  // "Control Panel"/"Audit Trail"; the user-role module name varies) and is shown
  // if the user has access to any of them.
  const settingsItems = [
    { label: t('common.controlPanel') || 'Control Panel', path: '/control-panel', modules: ['Control Panel'] },
    { label: t('common.auditTrail') || 'Audit Trail', path: '/audit-trail', modules: ['Audit Trail'] },
    { label: t('common.userRole') || 'User Role', path: '/user-role-management', modules: ['User Role', 'User Management', 'Role'] },
  ].filter((item) => item.modules.some((m) => hasPermission(m, 'View')))

  useEffect(() => {
    const empId = user?.empId
    if (!empId) return
    axiosClient.get(`/api/notificationList/${empId}`)
      .then(r => setNotifications(Array.isArray(r.data) ? r.data : []))
      .catch(() => setNotifications([]))
  }, [user?.empId])

  useEffect(() => {
    if (!notifOpen && !profileOpen && !settingsOpen) return
    const close = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setSettingsOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [notifOpen, profileOpen, settingsOpen])

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  const dropdownStyle = {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: 0,
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 10,
    boxShadow: '0 8px 24px rgba(11,20,55,.14)',
    minWidth: 230,
    zIndex: 9999,
    padding: '6px 0',
    textAlign: 'left'
  }

  const iconBtn = {
    border: 'none',
    background: 'transparent',
    color: '#475569',
    cursor: 'pointer',
    padding: 6,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    position: 'relative'
  }

  return (
    <div className="d-flex align-items-center gap-1" style={{ marginLeft: 8 }}>
      {/* Notifications */}
      <div ref={notifRef} style={{ position: 'relative' }}>
        <button type="button" style={iconBtn} title={t('common.notifications')} onClick={() => setNotifOpen(o => !o)}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {notifications.length > 0 && (
            <span style={{
              position: 'absolute', top: 4, right: 4,
              width: 9, height: 9, borderRadius: '50%',
              background: '#ec4899', border: '2px solid #fff'
            }} />
          )}
        </button>
        {notifOpen && (
          <div style={{ ...dropdownStyle, maxHeight: 340, overflowY: 'auto' }}>
            <p style={{ fontSize: 13, fontWeight: 700, margin: 0, padding: '8px 16px', color: '#0b1437' }}>
              {t('common.notifications')}
            </p>
            {notifications.length === 0 ? (
              <p style={{ fontSize: 12.5, color: '#a0aec0', margin: 0, padding: '12px 16px' }}>
                {t('common.noNotifications')}
              </p>
            ) : (
              notifications.map((n, i) => (
                <div key={n.id ?? i} style={{ padding: '9px 16px', fontSize: 12.5, color: '#334155', borderTop: '1px solid #f1f5f9' }}>
                  {n.notificationValue?.message || n.notificationValue?.name || n.notificationValue?.title || n.notificationType || 'Notification'}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Settings — only rendered if the user can see at least one admin item */}
      {settingsItems.length > 0 && (
      <div ref={settingsRef} style={{ position: 'relative' }}>
        <button type="button" style={iconBtn} title={t('common.settings')} onClick={() => setSettingsOpen(o => !o)}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
        {settingsOpen && (
          <div style={dropdownStyle}>
            {settingsItems.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => { setSettingsOpen(false); navigate(item.path) }}
                style={{ display: 'block', width: '100%', border: 'none', background: 'none', textAlign: 'start', padding: '10px 16px', fontSize: 13, color: '#334155', cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
      )}

      {/* Profile */}
      <div ref={profileRef} style={{ position: 'relative' }}>
        <button
          type="button"
          style={{ ...iconBtn, padding: 2 }}
          onClick={() => setProfileOpen(o => !o)}
          title={displayName}
        >
          <span
            className="rounded-circle d-inline-flex align-items-center justify-content-center"
            style={{
              width: 34,
              height: 34,
              background: '#00C4C4',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '.3px'
            }}
          >
            {initials}
          </span>
        </button>
        {profileOpen && (
          <div style={{ ...dropdownStyle, minWidth: 280, padding: 0, overflow: 'hidden' }}>
            
            {/* Header Area */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ 
                width: 44, height: 44, borderRadius: '50%', border: '1.5px solid #111827', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '15px', fontWeight: 600, margin: 0, color: '#111827' }}>Hi {displayName}</p>
                <p style={{ fontSize: '12px', color: '#4b5563', margin: '2px 0 0', lineHeight: 1.3 }}>
                  Welcome to your Multi-<br/>Governance Portal
                </p>
              </div>
            </div>

            {/* Menu Items */}
            <div style={{ padding: '0' }}>
                <button
                  type="button"
                  onClick={() => { setProfileOpen(false); navigate('/profile') }}
                  style={{ display: 'block', width: '100%', border: 'none', background: 'none', textAlign: 'start', padding: '12px 16px', fontSize: 14, color: '#111827', cursor: 'pointer', borderBottom: '1px solid #f1f5f9' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  My Profile
                </button>

                <button
                  type="button"
                  onClick={() => { setProfileOpen(false); navigate('/my-forms') }}
                  style={{ display: 'block', width: '100%', border: 'none', background: 'none', textAlign: 'start', padding: '12px 16px', fontSize: 14, color: '#111827', cursor: 'pointer', borderBottom: '1px solid #f1f5f9' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  My Forms
                </button>

                <button
                  type="button"
                  onClick={() => { setProfileOpen(false); navigate('/performance-contract') }}
                  style={{ display: 'block', width: '100%', border: 'none', background: 'none', textAlign: 'start', padding: '12px 16px', fontSize: 14, color: '#111827', cursor: 'pointer', borderBottom: '1px solid #f1f5f9' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  Performance Contract
                </button>

                <button
                  type="button"
                  onClick={() => { setProfileOpen(false); navigate('/performance-improvement-plan') }}
                  style={{ display: 'block', width: '100%', border: 'none', background: 'none', textAlign: 'start', padding: '12px 16px', fontSize: 14, color: '#111827', cursor: 'pointer', borderBottom: '1px solid #f1f5f9' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  Performance Improvement Plan
                </button>

                <button
                  type="button"
                  onClick={() => { setProfileOpen(false); navigate('/audit-trail') }}
                  style={{ display: 'block', width: '100%', border: 'none', background: 'none', textAlign: 'start', padding: '12px 16px', fontSize: 14, color: '#111827', cursor: 'pointer', borderBottom: '1px solid #f1f5f9' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  Audit Trail
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  style={{ display: 'block', width: '100%', border: 'none', background: 'none', textAlign: 'start', padding: '12px 16px', fontSize: 14, color: '#111827', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  Logout
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
