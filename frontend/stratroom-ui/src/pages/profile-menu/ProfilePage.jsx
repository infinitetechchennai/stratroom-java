import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getDisplayName, getInitials } from '../organization/landingPageUtils'
import { getProfileDetails, getUserRoleSummary, getEmpId } from '../../api/profileMenuApi'
import './profilePage.css'

export default function ProfilePage() {
  const { user } = useAuth()
  const empId = getEmpId() || user?.empId
  const [profile, setProfile] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const displayName = getDisplayName(user)
  const initials = getInitials(displayName)

  useEffect(() => {
    if (!empId) {
      setLoading(false)
      return
    }
    setLoading(true)
    Promise.all([
      getProfileDetails(empId).catch(() => null),
      getUserRoleSummary(empId).catch(() => null),
    ])
      .then(([p, r]) => {
        setProfile(p)
        setRole(r)
        setError(null)
      })
      .catch(() => setError('Could not load profile.'))
      .finally(() => setLoading(false))
  }, [empId])

  const name = profile?.firstName || profile?.name || role?.name || displayName
  const email = profile?.emailAddress || profile?.email || role?.emailAddress || user?.emailAddress || '—'
  const department = profile?.department || profile?.deptDetails?.name || role?.department || '—'
  const title = profile?.title || role?.title || '—'
  const roleName = profile?.userRoleName || role?.roleName || '—'
  const image = profile?.profileImage || role?.profileImage

  return (
    <div className="profile-page">
      <h4 className="profile-page-title">My Profile</h4>

      <div className="profile-card">
        {loading ? (
          <p className="profile-muted">Loading profile…</p>
        ) : error ? (
          <p className="profile-error">{error}</p>
        ) : (
          <>
            <div className="profile-hero">
              {image ? (
                <img src={image} alt={name} className="profile-photo" />
              ) : (
                <span className="profile-avatar">{initials}</span>
              )}
              <div>
                <h5 className="profile-name">Hi {name}</h5>
                <p className="profile-muted">Welcome to your Multi-Governance Portal</p>
              </div>
            </div>

            <dl className="profile-fields">
              <div><dt>Email</dt><dd>{email}</dd></div>
              <div><dt>Department</dt><dd>{department}</dd></div>
              <div><dt>Title</dt><dd>{title}</dd></div>
              <div><dt>Role</dt><dd>{roleName}</dd></div>
              <div><dt>Employee ID</dt><dd>{empId || '—'}</dd></div>
            </dl>
          </>
        )}
      </div>
    </div>
  )
}
