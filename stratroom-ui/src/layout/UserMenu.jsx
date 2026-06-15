import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { getDisplayName, getInitials } from '../pages/organization/landingPageUtils'
import axiosClient from '../api/axiosClient'

// Notification bell + settings gear + profile avatar cluster.
// Lives in the main navbar (right of the module links) to match the app shell.
export default function UserMenu() {
  const { user, logout } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()
  const displayName = getDisplayName(user)
  const initials = getInitials(displayName)

  const [notifications, setNotifications] = useState([])
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    const empId = user?.empId
    if (!empId) return
    axiosClient.get(`/api/notificationList/${empId}`)
      .then(r => setNotifications(Array.isArray(r.data) ? r.data : []))
      .catch(() => setNotifications([]))
  }, [user?.empId])

  useEffect(() => {
    if (!notifOpen && !profileOpen) return
    const close = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [notifOpen, profileOpen])

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
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
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

      {/* Settings */}
      <button type="button" style={iconBtn} title={t('common.settings')} onClick={() => navigate('/control-panel')}>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>

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
          <div style={dropdownStyle}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9' }}>
              <p style={{ fontSize: 13.5, fontWeight: 700, margin: 0, color: '#0b1437' }}>{displayName}</p>
              {(user?.email || user?.emailAddress) && (
                <p style={{ fontSize: 12, color: '#64748b', margin: '2px 0 0' }}>
                  {user.email || user.emailAddress}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => { setProfileOpen(false); navigate('/control-panel') }}
              style={{ display: 'block', width: '100%', border: 'none', background: 'none', textAlign: 'start', padding: '9px 16px', fontSize: 13, color: '#334155', cursor: 'pointer' }}
            >
              {t('common.settings')}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              style={{ display: 'block', width: '100%', border: 'none', background: 'none', textAlign: 'start', padding: '9px 16px', fontSize: 13, color: '#ef4444', cursor: 'pointer' }}
            >
              {t('common.logout')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
