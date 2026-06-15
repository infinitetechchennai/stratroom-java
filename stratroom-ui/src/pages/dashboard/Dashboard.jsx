import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getPageDetails } from '../../api/pageApi'
import axiosClient from '../../api/axiosClient'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const pageId = searchParams.get('pageId')
  const [pageData, setPageData] = useState(null)
  const [pageContent, setPageContent] = useState(null)
  const [loading, setLoading] = useState(!!pageId)

  const displayName = user?.firstName
    ? `${user.firstName} ${user.lastName || ''}`.trim()
    : user?.emailAddress || 'User'

  const loadPage = useCallback(async () => {
    if (!pageId) return
    setLoading(true)
    try {
      const data = await getPageDetails(pageId)
      setPageData(data)

      const templateUrl = getTemplateUrl(data.pageType)
      if (templateUrl) {
        try {
          const res = await axiosClient.get(templateUrl)
          setPageContent(res.data)
        } catch {
          setPageContent(null)
        }
      }
    } catch {
      setPageData(null)
    } finally {
      setLoading(false)
    }
  }, [pageId])

  useEffect(() => { loadPage() }, [loadPage])

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loader}>
          <div className={styles.spinner} />
        </div>
      </div>
    )
  }

  if (!pageId) {
    return (
      <div className={styles.page}>
        <div className={styles.welcomeBanner}>
          <div className={styles.welcomeText}>
            <h1>Welcome back, <span>{displayName}</span></h1>
            <p>Here is a summary of your organisation's performance today.</p>
          </div>
          <div className={styles.dateChip}>
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        <div className={styles.statGrid}>
          <StatCard label="Active Scorecards" value="—" icon={<ScorecardIcon />} color="#883B71" />
          <StatCard label="KPIs Tracked" value="—" icon={<KpiIcon />} color="#0ea5e9" />
          <StatCard label="Open Initiatives" value="—" icon={<InitIcon />} color="#f59e0b" />
          <StatCard label="Risk Items" value="—" icon={<RiskIcon />} color="#ef4444" />
        </div>

        <div className={styles.placeholderCard}>
          <h3>Dashboard content will appear here</h3>
          <p>This area will display charts, KPI summaries, scorecard views and other modules once the backend data services are connected.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h4 className={styles.pageTitle}>{pageData?.pageName || 'Dashboard'}</h4>
        <span className={styles.pageType}>{pageData?.pageType}</span>
      </div>

      <div className={styles.dynamicContent}>
        {pageContent ? (
          <div className={styles.placeholderCard}>
            <h3>{pageData?.pageName}</h3>
            <p>Page type: {pageData?.pageType}. Dynamic content loading is being migrated from JSP templates.</p>
          </div>
        ) : (
          <div className={styles.placeholderCard}>
            <h3>{pageData?.pageName || 'Page'}</h3>
            <p>Content for page type "{pageData?.pageType}" will be rendered here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function getTemplateUrl(pageType) {
  const map = {
    'Standard_View': '/stratroom/standardViewtemplate',
    'Scorecardview': '/stratroom/standardViewtemplateView',
    'Initiatives & Projects': '/stratroom/initiativestemplate',
    'InitiativeView': '/stratroom/initiativestemplateView',
    'SWOT': '/stratroom/dashboardSwotanalysis',
    'PESTEL': '/stratroom/dashboardPestelanalysis',
    'Meetings': '/stratroom/dashboardMeeting',
  }
  return map[pageType] || null
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon} style={{ background: `${color}18`, color }}>
        {icon}
      </div>
      <div>
        <div className={styles.statValue}>{value}</div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    </div>
  )
}

function ScorecardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
    </svg>
  )
}

function KpiIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" />
    </svg>
  )
}

function InitIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
