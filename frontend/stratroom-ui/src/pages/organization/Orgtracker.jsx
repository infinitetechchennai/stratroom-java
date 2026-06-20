import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  fetchDepartmentList,
  fetchDesignationList,
  fetchOrgTrackList,
  clearOrgTrack,
  getControlPanelSettings,
} from '../../api/orgStructureApi'
import styles from './Orgtracker.module.css'

export default function Orgtracker() {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedId, setExpandedId] = useState(null)
  const [detailMap, setDetailMap] = useState({})
  const [detailLoading, setDetailLoading] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [isDeptMode, setIsDeptMode] = useState(false)
  const [deleteModal, setDeleteModal] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const searchRef = useRef(null)

  const isSuperUser = user?.userRoleName === 'Super User' || user?.roleName === 'Super User'
  const empId = user?.empId
  const orgId = user?.orgDetails?.orgId ?? user?.orgId
  const datePeriod = localStorage.getItem('customperiod') || ''

  const loadList = useCallback(async (name = '') => {
    if (!empId) return
    setLoading(true)
    setError(null)
    try {
      let data
      if (isDeptMode) {
        data = await fetchDepartmentList(empId, datePeriod, name)
      } else {
        data = await fetchDesignationList(datePeriod, name)
      }
      setItems(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err?.message || 'Failed to load organisation tracker')
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [empId, isDeptMode, datePeriod])

  useEffect(() => {
    if (!empId) return
    const init = async () => {
      if (orgId) {
        try {
          const settings = await getControlPanelSettings(orgId)
          setIsDeptMode(settings?.implementationType === 'Department')
        } catch {
          setIsDeptMode(false)
        }
      }
    }
    init()
  }, [empId, orgId])

  useEffect(() => {
    loadList()
  }, [loadList])

  const handleToggle = async (item) => {
    const id = item.id
    const name = item.name || item.deptName || ''
    const deptId = item.deptID || item.deptId || ''

    if (expandedId === id) {
      setExpandedId(null)
      return
    }
    setExpandedId(id)
    if (detailMap[id]) return

    setDetailLoading(id)
    try {
      const data = await fetchOrgTrackList(name, datePeriod, isDeptMode ? String(deptId) : '')
      setDetailMap((prev) => ({ ...prev, [id]: Array.isArray(data) ? data : [] }))
    } catch {
      setDetailMap((prev) => ({ ...prev, [id]: [] }))
    } finally {
      setDetailLoading(null)
    }
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    // Reset expanded state and detail cache on search
    setExpandedId(null)
    setDetailMap({})
    loadList(value.trim())
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setShowSearch(false)
    setExpandedId(null)
    setDetailMap({})
    loadList('')
  }

  const handleDeleteClick = (item) => {
    setDeleteModal(item)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteModal) return
    setDeleting(true)
    try {
      await clearOrgTrack(deleteModal.id)
      setDeleteModal(null)
      setExpandedId(null)
      setDetailMap({})
      loadList(searchTerm.trim())
    } catch {
      // keep modal open on error
    } finally {
      setDeleting(false)
    }
  }

  const typeLabel = isDeptMode ? 'Department' : 'Designation'

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          <TrackerIcon />
          Organisation Tracker
        </h4>
        <div className={styles.actions}>
          {showSearch ? (
            <div className={styles.searchBox}>
              <SearchIcon />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                autoFocus
                onChange={(e) => handleSearch(e.target.value)}
              />
              <button className={styles.iconBtn} onClick={handleClearSearch} title="Clear search">
                <CloseIcon />
              </button>
            </div>
          ) : (
            <button className={styles.iconBtn} title="Search" onClick={() => setShowSearch(true)}>
              <SearchIcon />
            </button>
          )}
        </div>
      </div>

      <div className={styles.content}>
        {loading ? (
          <div className={styles.loader}><div className={styles.spinner} /></div>
        ) : error ? (
          <div className={styles.empty}><h3>Could not load tracker</h3><p>{error}</p></div>
        ) : items.length === 0 ? (
          <div className={styles.empty}><h3>No records found</h3></div>
        ) : (
          <div className={styles.list}>
            {items.map((item) => {
              const id = item.id
              const name = item.name || item.deptName || '—'
              const isActive = (item.status || '').toLowerCase() === 'active'
              const isExpanded = expandedId === id
              const details = detailMap[id] || []
              const loadingDetail = detailLoading === id

              return (
                <div
                  key={id}
                  className={`${styles.card} ${!isActive ? styles.cardInactive : ''}`}
                >
                  <div className={styles.cardHeader}>
                    <button
                      className={styles.cardToggle}
                      onClick={() => handleToggle(item)}
                      style={{ color: isActive ? undefined : '#999' }}
                    >
                      <ChevronIcon className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`} />
                      <span>{name}</span>
                    </button>
                    {!isActive && isSuperUser && (
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteClick(item)}
                        title="Delete"
                      >
                        <TrashIcon />
                      </button>
                    )}
                  </div>

                  {isExpanded && (
                    <div className={styles.cardBody}>
                      {loadingDetail ? (
                        <div className={styles.rowLoader}><div className={styles.spinnerSm} /></div>
                      ) : (
                        <DetailTable rows={details} typeLabel={typeLabel} />
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {deleteModal && (
        <div className={styles.modalOverlay} onClick={() => setDeleteModal(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h5>Delete</h5>
              <button className={styles.iconBtn} onClick={() => setDeleteModal(null)}><CloseIcon /></button>
            </div>
            <div className={styles.modalBody}>
              <p>Do you really want to delete <strong>{deleteModal.name || deleteModal.deptName}</strong>?</p>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.btnSecondary} onClick={() => setDeleteModal(null)}>Cancel</button>
              <button className={styles.btnDanger} onClick={handleDeleteConfirm} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DetailTable({ rows, typeLabel }) {
  if (!rows.length) {
    return <p className={styles.noDetail}>No records found</p>
  }
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Parent</th>
            <th>Owner</th>
            <th>{typeLabel}</th>
            <th>Email</th>
            <th>Pages</th>
            <th>From Date</th>
            <th>To Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>{row.parentName || '—'}</td>
              <td>{row.ownerName || '—'}</td>
              <td>{row.designation || row.deptOrDesignationName || '—'}</td>
              <td>{row.email || '—'}</td>
              <td>{row.pages || '—'}</td>
              <td>{row.fromDate || '—'}</td>
              <td>{row.toDate || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TrackerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h18v18H3z" /><path d="M3 9h18M9 21V9" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function ChevronIcon({ className }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
  )
}
