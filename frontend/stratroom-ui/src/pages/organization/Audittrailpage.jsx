import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getAuditTrailList, exportAuditTrail, getAuditTrailActions } from '../../api/profileMenuApi'
import styles from './Audittrailpage.module.css'

export default function Audittrailpage() {
  const { user } = useAuth()
  const [trails, setTrails] = useState([])
  const [actions, setActions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterAction, setFilterAction] = useState('')
  const pageSize = 20

  const pagedTrails = trails.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const totalPages = Math.max(1, Math.ceil(trails.length / pageSize))

  const fetchAuditTrail = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}
      if (filterAction) params.action = filterAction
      const data = await getAuditTrailList(params)
      setTrails(Array.isArray(data) ? data : [])
    } catch {
      setTrails([])
    } finally {
      setLoading(false)
    }
  }, [filterAction])

  useEffect(() => {
    getAuditTrailActions()
      .then((data) => setActions(Array.isArray(data) ? data : []))
      .catch(() => setActions([]))
  }, [])

  useEffect(() => {
    fetchAuditTrail()
    setCurrentPage(1)
  }, [fetchAuditTrail])

  const handleExport = async () => {
    try {
      const blob = await exportAuditTrail(filterAction ? { action: filterAction } : {})
      const url = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'audit-trail.csv')
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
          <select
            className={styles.filterSelect}
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            title="Filter by action"
          >
            <option value="">All actions</option>
            {actions.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <button className={styles.actionBtn} onClick={handleExport} title="Export">
            <ExportIcon />
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
                ) : pagedTrails.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={styles.emptyCell}>
                      No audit trail records found
                    </td>
                  </tr>
                ) : (
                  pagedTrails.map((trail, i) => (
                    <tr key={trail.id || i}>
                      <td className={styles.tdLeft}>{trail.userName || trail.performedBy || trail.userId || '—'}</td>
                      <td className={styles.tdCenter}>{trail.action || '—'}</td>
                      <td className={styles.tdCenter}>{trail.type || trail.additionalInfo || trail.description || '—'}</td>
                      <td className={styles.tdCenter}>{formatDate(trail.createdTime || trail.accessDate || trail.dateTime)}</td>
                      <td className={styles.tdCenter}>{trail.systemIp || trail.ipAddress || '—'}</td>
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
              {(() => {
                const windowSize = 5
                const half = Math.floor(windowSize / 2)
                let start = Math.max(1, currentPage - half)
                let end = start + windowSize - 1
                if (end > totalPages) {
                  end = totalPages
                  start = Math.max(1, end - windowSize + 1)
                }
                return Array.from({ length: end - start + 1 }, (_, i) => start + i).map((p) => (
                  <button
                    key={p}
                    className={`${styles.pageLink} ${p === currentPage ? styles.pageLinkActive : ''}`}
                    onClick={() => setCurrentPage(p)}
                  >
                    {p}
                  </button>
                ))
              })()}
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
    let d
    if (Array.isArray(dt)) {
      // Jackson serializes LocalDateTime as [year, month, day, hour, minute, second, nano]
      // JS months are 0-indexed
      d = new Date(dt[0], (dt[1] ?? 1) - 1, dt[2] ?? 1, dt[3] ?? 0, dt[4] ?? 0, dt[5] ?? 0)
    } else {
      d = new Date(dt)
    }
    if (isNaN(d.getTime())) return String(dt)
    return d.toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  } catch {
    return String(dt)
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
