import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getDisplayName, getInitials } from '../pages/organization/landingPageUtils'

export default function TopUtilityBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const displayName = getDisplayName(user)
  const initials = getInitials(displayName)

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="navbar-topbar">
      <div className="container-lg d-flex flex-wrap justify-content-between">
        <div className="menu-controls d-flex">
          <a
            className="control-link"
            href="/org-structure"
            onClick={(e) => { e.preventDefault(); navigate('/org-structure') }}
            title="Org Structure"
          >
            <span className="icon">
              <img src="/images/org-structure-i.svg" width="18" height="18" alt="Org Structure" />
            </span>
          </a>
          <a
            className="control-link"
            href="/org-tracker"
            onClick={(e) => { e.preventDefault(); navigate('/org-tracker') }}
            title="Org Tracker"
            style={{ fontSize: 11, fontWeight: 500 }}
          >
            Tracker
          </a>
          <a
            className="control-link"
            href="/org-structure-kpi"
            onClick={(e) => { e.preventDefault(); navigate('/org-structure-kpi') }}
            title="Org KPI"
            style={{ fontSize: 11, fontWeight: 500 }}
          >
            KPI
          </a>
          <div className="nav-item dropdown dropdown-top-header">
            <span className="control-link masterHeader">Masters</span>
          </div>
        </div>

        <div className="menu-controls global-control d-flex flex-wrap align-items-center gap-2">
          <div className="top-date-picker">
            <input
              className="top_datepicker form-control form-control-sm"
              readOnly
              placeholder="Date period"
              style={{ minWidth: 150, fontSize: 12 }}
            />
          </div>
          <span className="control-link" style={{ fontSize: 12 }}>EN</span>
          <button
            type="button"
            className="control-link border-0 bg-transparent d-flex align-items-center gap-1"
            onClick={handleLogout}
            title={displayName}
          >
            <span
              className="rounded-circle d-inline-flex align-items-center justify-content-center"
              style={{
                width: 28,
                height: 28,
                background: '#85798c',
                color: '#fff',
                fontSize: 11,
                fontWeight: 600
              }}
            >
              {initials}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
