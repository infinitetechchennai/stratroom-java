import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../../api/axiosClient'
import styles from './Audittrailpage.module.css'

export default function Audittrailpage() {
  const { user } = useAuth()
  const [trails, setTrails] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 20

  const fetchAuditTrail = useCallback(async (page) => {
    if (!user?.empId) return
    setLoading(true)
    try {
      const res = await axiosClient.get(`/stratroom/auditTrailList`, {
        params: { empId: user.empId, page, size: pageSize }
      })
      const data = res.data
      if (Array.isArray(data)) {
        setTrails(data)
        setTotalPages(Math.max(1, Math.ceil(data.length / pageSize)))
      } else if (data?.content) {
        setTrails(data.content)
        setTotalPages(data.totalPages || 1)
      } else {
        setTrails([])
      }
    } catch {
      setTrails([])
    } finally {
      setLoading(false)
    }
  }, [user?.empId])

  useEffect(() => { fetchAuditTrail(currentPage) }, [currentPage, fetchAuditTrail])

  const handleExport = async () => {
    try {
      const res = await axiosClient.get('/stratroom/auditTrailExport', {
        params: { empId: user?.empId },
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'audit-trail.xlsx')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch {
      // best-effort
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h4 className={styles.title}>
            <span className={styles.icon}>
              <AuditIcon />
            </span>
            Audit Trail
          </h4>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.actionBtn} onClick={handleExport} title="Export">
            <ExportIcon />
          </button>
          <button className={styles.actionBtn} title="Filter">
            <FilterIcon />
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h5 className={styles.cardTitle}>Audit Trail</h5>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thLeft}>Performed by</th>
                  <th>Action</th>
                  <th>Additional Information</th>
                  <th>Date / Time</th>
                  <th>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className={styles.loadingCell}>
                      <div className={styles.spinner} />
                    </td>
                  </tr>
                ) : trails.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={styles.emptyCell}>
                      No audit trail records found
                    </td>
                  </tr>
                ) : (
                  trails.map((trail, i) => (
                    <tr key={trail.id || i}>
                      <td className={styles.tdLeft}>{trail.performedBy || trail.userId || '—'}</td>
                      <td className={styles.tdCenter}>{trail.action || '—'}</td>
                      <td className={styles.tdCenter}>{trail.additionalInfo || trail.description || '—'}</td>
                      <td className={styles.tdCenter}>{formatDate(trail.createdDt || trail.dateTime)}</td>
                      <td className={styles.tdCenter}>{trail.ipAddress || trail.systemIp || '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <nav className={styles.pagination}>
              <button
                className={`${styles.pageLink} ${currentPage <= 1 ? styles.pageLinkDisabled : ''}`}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
              >
                <ArrowLeftIcon />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`${styles.pageLink} ${p === currentPage ? styles.pageLinkActive : ''}`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                className={`${styles.pageLink} ${currentPage >= totalPages ? styles.pageLinkDisabled : ''}`}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
              >
                <ArrowRightIcon />
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  )
}

function formatDate(dt) {
  if (!dt) return '—'
  try {
    return new Date(dt).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  } catch {
    return dt
  }
}

function AuditIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function ExportIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
