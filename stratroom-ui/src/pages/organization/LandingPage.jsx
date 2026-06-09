import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../../api/axiosClient'
import styles from './LandingPage.module.css'

export default function LandingPage() {
  const { user } = useAuth()
  const [departments, setDepartments] = useState([])
  const [selectedDept, setSelectedDept] = useState('')
  const [selectedPageType, setSelectedPageType] = useState('')
  const [stats, setStats] = useState({ meetings: 0, tasks: 0, completedTasks: 0, inProgressTasks: 0 })
  const [loading, setLoading] = useState(true)

  const displayName = user?.firstName
    ? `${user.firstName} ${user.lastName || ''}`.trim()
    : user?.emailAddress || 'User'

  const initials = displayName
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const fetchLandingData = useCallback(async () => {
    if (!user?.empId) return
    setLoading(true)
    try {
      const [deptRes, statsRes] = await Promise.allSettled([
        axiosClient.get(`/stratroom/departmentReportees/${user.empId}`),
        axiosClient.get(`/stratroom/landingPageStats/${user.empId}`)
      ])
      if (deptRes.status === 'fulfilled') {
        setDepartments(Array.isArray(deptRes.value.data) ? deptRes.value.data : [])
      }
      if (statsRes.status === 'fulfilled' && statsRes.value.data) {
        setStats(statsRes.value.data)
      }
    } catch {
      // best-effort
    } finally {
      setLoading(false)
    }
  }, [user?.empId])

  useEffect(() => { fetchLandingData() }, [fetchLandingData])

  const PAGE_TYPES = [
    { value: 'STRATEGYMAP', label: 'Strategy Map' },
    { value: 'INITIATIVEMAP', label: 'Initiative Map' },
    { value: 'RADAR', label: 'Risk Radar' },
    { value: 'SCORECARDDASHBOARD', label: 'Scorecard Dashboard' },
    { value: 'RISKDASHBOARD', label: 'Risk Dashboard' },
    { value: 'INITIATIVEDASHBOARD', label: 'Initiative Dashboard' },
    { value: 'COMPLIANCEDASHBOARD', label: 'Compliance Dashboard' },
    { value: 'AUDITDASHBOARD', label: 'Audit Dashboard' },
  ]

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.blurOverlay} />
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.heroCard}>
              <div className={styles.heroAvatar}>
                <div className={styles.initialsAvatar}>{initials}</div>
              </div>
              <div className={styles.heroText}>
                <h4>Hi {displayName}</h4>
                <small>welcome to your Multi-Governance Portal</small>
              </div>
            </div>
          </div>
          <div className={styles.heroRight}>
            <select
              className={styles.heroSelect}
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="">Choose department</option>
              {departments.map((d) => (
                <option key={d.id || d.deptId} value={d.id || d.deptId}>
                  {d.deptName || d.name}
                </option>
              ))}
            </select>
            <select
              className={styles.heroSelect}
              value={selectedPageType}
              onChange={(e) => setSelectedPageType(e.target.value)}
            >
              <option value="">Choose pageType</option>
              {PAGE_TYPES.map((pt) => (
                <option key={pt.value} value={pt.value}>{pt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Priority Cards */}
      <div className={styles.prioritiesSection}>
        <div className={styles.sectionHeader}>
          <h5>My Priorities</h5>
        </div>
        <div className={styles.cardGrid}>
          <PriorityCard
            icon={<TrophyIcon />}
            title="Meetings"
            value={stats.meetings}
            loading={loading}
          />
          <PriorityCard
            icon={<TaskIcon />}
            title="Total Task"
            value={stats.tasks}
            subtitle={stats.completedTasks > 0 ? `${stats.completedTasks} completed` : null}
            loading={loading}
          />
          <PriorityCard
            icon={<InitiativeIcon />}
            title="Initiatives"
            value={stats.initiatives || 0}
            loading={loading}
          />
          <PriorityCard
            icon={<RiskIcon />}
            title="Risks"
            value={stats.risks || 0}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

function PriorityCard({ icon, title, value, subtitle, loading }) {
  return (
    <div className={styles.priorityCard}>
      <div className={styles.priorityCardHeader}>
        <div className={styles.priorityIcon}>{icon}</div>
      </div>
      <div className={styles.priorityCardBody}>
        <h4 className={styles.priorityTitle}>{title}</h4>
        <h5 className={styles.priorityAmount}>
          {loading ? <span className={styles.smallSpinner} /> : value}
        </h5>
        {subtitle && <div className={styles.priorityTrend}>{subtitle}</div>}
      </div>
    </div>
  )
}

function TrophyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

function TaskIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  )
}

function InitiativeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M2 12h20" /><circle cx="12" cy="12" r="10" />
    </svg>
  )
}

function RiskIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}
