import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getPageDetails } from '../../api/pageApi'
import styles from './Whiteboard.module.css'

export default function Whiteboard() {
  const [searchParams] = useSearchParams()
  const pageId = searchParams.get('pageId')
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadPage = useCallback(async () => {
    if (!pageId) { setLoading(false); return }
    try {
      const data = await getPageDetails(pageId)
      setPageData(data)
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

  const pageType = pageData?.pageType || ''
  const pageName = pageData?.pageName || 'Whiteboard'

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h4 className={styles.title}>{pageName}</h4>
        {pageType && <span className={styles.badge}>{pageType}</span>}
      </div>

      <div className={styles.content}>
        {pageType === 'Cockpit' || pageType === 'Report' ? (
          <div className={styles.placeholder}>
            <CockpitIcon />
            <h3>Dashboard Preference</h3>
            <p>Cockpit/Report view for "{pageName}" will be rendered here. This corresponds to the dashboardPreference page in the JSP application.</p>
          </div>
        ) : pageType === 'Charts' ? (
          <div className={styles.placeholder}>
            <ChartIcon />
            <h3>Charts View</h3>
            <p>Charts for "{pageName}" will be rendered here. This corresponds to the charts page in the JSP application.</p>
          </div>
        ) : pageType === 'StrategyMap' ? (
          <div className={styles.placeholder}>
            <MapIcon />
            <h3>Strategy Map</h3>
            <p>Strategy Map for "{pageName}" will be rendered here.</p>
          </div>
        ) : pageType === 'PowerBI' ? (
          <div className={styles.placeholder}>
            <ChartIcon />
            <h3>Power BI</h3>
            <p>Power BI report for "{pageName}" will be rendered here.</p>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <CockpitIcon />
            <h3>{pageName}</h3>
            <p>Content for page type "{pageType}" will be rendered here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function CockpitIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#85798c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#85798c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

function MapIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#85798c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  )
}
