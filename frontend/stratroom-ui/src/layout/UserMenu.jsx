import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usePermissions } from '../context/PermissionsContext'
import { useI18n } from '../context/I18nContext'
import { getDisplayName, getInitials } from '../pages/organization/landingPageUtils'
import axiosClient from '../api/axiosClient'
import './UserMenu.css'

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

  return (
    <div className="d-flex align-items-center gap-1 user-menu-cluster">
      {/* Notifications */}
      <div ref={notifRef} className="user-menu-wrap">
        <button type="button" className="user-menu-btn" title={t('common.notifications')} onClick={() => setNotifOpen(o => !o)}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {notifications.length > 0 && <span className="user-menu-notif-badge" />}
        </button>
        {notifOpen && (
          <div className="user-menu-dropdown user-menu-dropdown--scroll">
            <p className="user-menu-section-title">{t('common.notifications')}</p>
            {notifications.length === 0 ? (
              <p className="user-menu-empty">{t('common.noNotifications')}</p>
            ) : (
              notifications.map((n, i) => (
                <div key={n.id ?? i} className="user-menu-notif-item">
                  {n.notificationValue?.message || n.notificationValue?.name || n.notificationValue?.title || n.notificationType || 'Notification'}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Settings */}
      {settingsItems.length > 0 && (
        <div ref={settingsRef} className="user-menu-wrap">
          <button type="button" className="user-menu-btn" title={t('common.settings')} onClick={() => setSettingsOpen(o => !o)}>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
          {settingsOpen && (
            <div className="user-menu-dropdown">
              {settingsItems.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  className="user-menu-item"
                  onClick={() => { setSettingsOpen(false); navigate(item.path) }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Profile */}
      <div ref={profileRef} className="user-menu-wrap">
        <button
          type="button"
          className="user-menu-btn user-menu-btn--avatar"
          onClick={() => setProfileOpen(o => !o)}
          title={displayName}
        >
          <span className="rounded-circle d-inline-flex align-items-center justify-content-center user-menu-avatar-btn">
            {initials}
          </span>
        </button>
        {profileOpen && (
          <div className="user-menu-dropdown user-menu-dropdown--profile">
            <div className="user-menu-profile-header">
              <div className="user-menu-avatar-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <p className="user-menu-greeting">Hi {displayName}</p>
                <p className="user-menu-subtitle">
                  Welcome to your Multi-<br />Governance Portal
                </p>
              </div>
            </div>

            <div>
              <button type="button" className="user-menu-item user-menu-item--lg" onClick={() => { setProfileOpen(false); navigate('/profile') }}>
                My Profile
              </button>
              <button type="button" className="user-menu-item user-menu-item--lg" onClick={() => { setProfileOpen(false); navigate('/my-forms') }}>
                My Forms
              </button>
              <button type="button" className="user-menu-item user-menu-item--lg" onClick={() => { setProfileOpen(false); navigate('/performance-contract') }}>
                Performance Contract
              </button>
              <button type="button" className="user-menu-item user-menu-item--lg" onClick={() => { setProfileOpen(false); navigate('/performance-improvement-plan') }}>
                Performance Improvement Plan
              </button>
              <button type="button" className="user-menu-item user-menu-item--lg" onClick={() => { setProfileOpen(false); navigate('/audit-trail') }}>
                Audit Trail
              </button>
              <button type="button" className="user-menu-item user-menu-item--lg" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
