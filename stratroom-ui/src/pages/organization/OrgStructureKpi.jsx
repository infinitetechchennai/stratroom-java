import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { fetchOrgStructure, fetchAllKpiDetails } from '../../api/orgStructureApi'
import styles from './OrgStructureKpi.module.css'

export default function OrgStructureKpi() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [orgData, setOrgData] = useState([])
  const [kpiMap, setKpiMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedNodes, setExpandedNodes] = useState(new Set())

  const loadOrg = useCallback(async () => {
    const empId = user?.empId
    if (!empId) { setLoading(false); return }
    setLoading(true)
    setError(null)
    try {
      const orgId = user?.orgDetails?.orgId ?? user?.orgId
      const [data, kpiDetails] = await Promise.all([
        fetchOrgStructure(empId, orgId),
        fetchAllKpiDetails().catch(() => [])
      ])
      setOrgData(data)
      const ids = new Set()
      collectIds(data, ids)
      setExpandedNodes(ids)
      setKpiMap(buildKpiMap(kpiDetails))
    } catch (err) {
      setError(err?.message || 'Failed to load organisation data')
    } finally {
      setLoading(false)
    }
  }, [user?.empId, user?.orgId, user?.orgDetails?.orgId])

  useEffect(() => {
    if (!authLoading) loadOrg()
  }, [authLoading, loadOrg])

  const toggleNode = (id) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          <KpiIcon />
          Organisation Structure — KPI View
        </h4>
        <button className={styles.editBtn} onClick={() => navigate('/org-structure-kpi-edit')}>
          <EditIcon />
          Edit
        </button>
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}><span className={styles.dot} style={{ background: '#22c55e' }} />Actual</span>
        <span className={styles.legendItem}><span className={styles.dot} style={{ background: '#883b71' }} />Target</span>
        <span className={styles.legendItem}><span className={styles.dot} style={{ background: '#f59e0b' }} />Gap</span>
      </div>

      <div className={styles.content}>
        {loading || authLoading ? (
          <div className={styles.loader}><div className={styles.spinner} /></div>
        ) : error ? (
          <div className={styles.empty}><h3>Could not load data</h3><p>{error}</p></div>
        ) : orgData.length === 0 ? (
          <div className={styles.empty}><h3>No organisation data</h3></div>
        ) : (
          <div className={styles.treeWrap}>
            <KpiTree nodes={orgData} expandedNodes={expandedNodes} onToggle={toggleNode} kpiMap={kpiMap} />
          </div>
        )}
      </div>
    </div>
  )
}

function buildKpiMap(details) {
  const buckets = {}
  for (const d of (details ?? [])) {
    const ids = [d.empId, d.deptId].filter(Boolean)
    for (const id of ids) {
      if (!buckets[id]) buckets[id] = []
      buckets[id].push(d)
    }
  }
  const map = {}
  for (const [id, list] of Object.entries(buckets)) {
    let achievementSum = 0, validCount = 0
    for (const d of list) {
      const a = parseFloat(String(d.mtdActual ?? '').replace(/,/g, ''))
      const t = parseFloat(String(d.mtdTarget ?? '').replace(/,/g, ''))
      if (!isNaN(a) && !isNaN(t) && t !== 0) {
        achievementSum += (a / t) * 100
        validCount++
      }
    }
    if (validCount > 0) {
      const avg = achievementSum / validCount
      map[id] = {
        actual: `${avg.toFixed(0)}%`,
        target: '100%',
        gap: `${Math.max(0, 100 - avg).toFixed(0)}%`,
      }
    } else {
      map[id] = { actual: list.length, target: '—', gap: '—' }
    }
  }
  return map
}

function collectIds(nodes, set) {
  nodes?.forEach((n) => {
    const id = n.id ?? n.groupId
    if (id != null) set.add(id)
    if (n.children?.length) collectIds(n.children, set)
  })
}

function KpiTree({ nodes, expandedNodes, onToggle, kpiMap, level = 0 }) {
  if (!nodes?.length) return null
  return (
    <ul className={`${styles.tree} ${level > 0 ? styles.treeNested : ''}`}>
      {nodes.map((node) => {
        const id = node.id ?? node.groupId
        const hasChildren = node.children?.length > 0
        const isExpanded = expandedNodes.has(id)
        return (
          <li key={id} className={styles.treeItem}>
            <div className={styles.nodeWrap}>
              {hasChildren && (
                <button
                  className={`${styles.caret} ${isExpanded ? styles.caretDown : ''}`}
                  onClick={() => onToggle(id)}
                  title={isExpanded ? 'Collapse' : 'Expand'}
                />
              )}
              {!hasChildren && <span className={styles.caretPlaceholder} />}
              <KpiCard node={node} kpiMap={kpiMap} />
            </div>
            {hasChildren && isExpanded && (
              <KpiTree nodes={node.children} expandedNodes={expandedNodes} onToggle={onToggle} kpiMap={kpiMap} level={level + 1} />
            )}
          </li>
        )
      })}
    </ul>
  )
}

function KpiCard({ node, kpiMap }) {
  const name = node.groupName ?? node.name ?? '?'
  const desc = node.description ?? ''
  const nodeId = node.id ?? node.groupId
  const kpi = kpiMap?.[nodeId] ?? {}
  const actual = kpi.actual ?? '—'
  const target = kpi.target ?? '—'
  const gap = kpi.gap ?? '—'

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.avatar}>{name[0].toUpperCase()}</div>
        <div className={styles.cardInfo}>
          <p className={styles.cardName}>{name}</p>
          {desc && <small className={styles.cardDesc}>{desc}</small>}
        </div>
      </div>
      <div className={styles.kpiRow}>
        <div className={styles.kpiCell}>
          <span className={styles.kpiLabel}>Actual</span>
          <span className={`${styles.kpiValue} ${styles.kpiActual}`}>{actual}</span>
        </div>
        <div className={styles.kpiDivider} />
        <div className={styles.kpiCell}>
          <span className={styles.kpiLabel}>Target</span>
          <span className={`${styles.kpiValue} ${styles.kpiTarget}`}>{target}</span>
        </div>
        <div className={styles.kpiDivider} />
        <div className={styles.kpiCell}>
          <span className={styles.kpiLabel}>Gap</span>
          <span className={`${styles.kpiValue} ${styles.kpiGap}`}>{gap}</span>
        </div>
      </div>
    </div>
  )
}

function KpiIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}
