import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { fetchOrgStructure, fetchAllKpiDetails } from '../../api/orgStructureApi'
import styles from './OrgStructureKpiEdit.module.css'

export default function OrgStructureKpiEdit() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [orgData, setOrgData] = useState([])
  const [kpiMap, setKpiMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedNodes, setExpandedNodes] = useState(new Set())
  const [selectedNode, setSelectedNode] = useState(null)
  const [editValues, setEditValues] = useState({})

  const loadOrg = useCallback(async () => {
    const empId = user?.empId
    if (!empId) { setLoading(false); return }
    setLoading(true)
    setError(null)
    try {
      const orgId = user?.orgDetails?.orgId ?? user?.orgId
      const [orgResult, kpiDetails] = await Promise.all([
        fetchOrgStructure(empId, orgId),
        fetchAllKpiDetails().catch(() => [])
      ])
      const data = orgResult.nodes
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

  const handleSelectNode = (node) => {
    const id = node.id ?? node.groupId
    setSelectedNode(node)
    const name = node.groupName ?? node.name ?? ''
    const kpi = kpiMap[id] ?? {}
    setEditValues({
      name,
      description: node.description ?? '',
      actual: node.actual ?? kpi.actual ?? '',
      target: node.target ?? kpi.target ?? '',
      gap: node.gap ?? kpi.gap ?? '',
    })
  }

  const handleEditChange = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleApply = () => {
    if (!selectedNode) return
    const id = selectedNode.id ?? selectedNode.groupId
    setOrgData((prev) => applyEdit(prev, id, editValues))
    setSelectedNode(null)
  }

  const handleCancel = () => {
    setSelectedNode(null)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          <KpiIcon />
          Organisation Structure — KPI Edit
        </h4>
        <button className={styles.viewBtn} onClick={() => navigate('/org-structure-kpi')}>
          <EyeIcon />
          View Mode
        </button>
      </div>

      {selectedNode && (
        <div className={styles.editPanel}>
          <div className={styles.editPanelHeader}>
            <span className={styles.editPanelTitle}>Edit Node</span>
            <button className={styles.iconBtn} onClick={handleCancel}><CloseIcon /></button>
          </div>
          <div className={styles.editFields}>
            <label className={styles.fieldLabel}>Name
              <input className={styles.fieldInput} value={editValues.name} onChange={(e) => handleEditChange('name', e.target.value)} />
            </label>
            <label className={styles.fieldLabel}>Description
              <input className={styles.fieldInput} value={editValues.description} onChange={(e) => handleEditChange('description', e.target.value)} />
            </label>
            <label className={styles.fieldLabel}>Actual
              <input className={styles.fieldInput} value={editValues.actual} onChange={(e) => handleEditChange('actual', e.target.value)} placeholder="e.g. 12,000" />
            </label>
            <label className={styles.fieldLabel}>Target
              <input className={styles.fieldInput} value={editValues.target} onChange={(e) => handleEditChange('target', e.target.value)} placeholder="e.g. 15,000" />
            </label>
            <label className={styles.fieldLabel}>Gap
              <input className={styles.fieldInput} value={editValues.gap} onChange={(e) => handleEditChange('gap', e.target.value)} placeholder="e.g. 3,000" />
            </label>
          </div>
          <div className={styles.editActions}>
            <button className={styles.btnSecondary} onClick={handleCancel}>Cancel</button>
            <button className={styles.btnPrimary} onClick={handleApply}>Apply</button>
          </div>
        </div>
      )}

      <div className={styles.content}>
        {loading || authLoading ? (
          <div className={styles.loader}><div className={styles.spinner} /></div>
        ) : error ? (
          <div className={styles.empty}><h3>Could not load data</h3><p>{error}</p></div>
        ) : orgData.length === 0 ? (
          <div className={styles.empty}><h3>No organisation data</h3></div>
        ) : (
          <div className={styles.treeWrap}>
            <p className={styles.hint}>Click a card to edit its KPI values.</p>
            <KpiEditTree
              nodes={orgData}
              expandedNodes={expandedNodes}
              onToggle={toggleNode}
              selectedId={selectedNode ? (selectedNode.id ?? selectedNode.groupId) : null}
              onSelect={handleSelectNode}
              kpiMap={kpiMap}
            />
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

function applyEdit(nodes, targetId, values) {
  return nodes.map((node) => {
    const id = node.id ?? node.groupId
    if (id === targetId) {
      return {
        ...node,
        groupName: values.name,
        name: values.name,
        description: values.description,
        actual: values.actual,
        target: values.target,
        gap: values.gap,
      }
    }
    if (node.children?.length) {
      return { ...node, children: applyEdit(node.children, targetId, values) }
    }
    return node
  })
}

function KpiEditTree({ nodes, expandedNodes, onToggle, selectedId, onSelect, kpiMap, level = 0 }) {
  if (!nodes?.length) return null
  return (
    <ul className={`${styles.tree} ${level > 0 ? styles.treeNested : ''}`}>
      {nodes.map((node) => {
        const id = node.id ?? node.groupId
        const hasChildren = node.children?.length > 0
        const isExpanded = expandedNodes.has(id)
        const isSelected = selectedId === id
        return (
          <li key={id} className={styles.treeItem}>
            <div className={styles.nodeWrap}>
              {hasChildren ? (
                <button
                  className={`${styles.caret} ${isExpanded ? styles.caretDown : ''}`}
                  onClick={() => onToggle(id)}
                />
              ) : (
                <span className={styles.caretPlaceholder} />
              )}
              <KpiEditCard node={node} isSelected={isSelected} onSelect={onSelect} kpiMap={kpiMap} />
            </div>
            {hasChildren && isExpanded && (
              <KpiEditTree
                nodes={node.children}
                expandedNodes={expandedNodes}
                onToggle={onToggle}
                selectedId={selectedId}
                onSelect={onSelect}
                kpiMap={kpiMap}
                level={level + 1}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

function KpiEditCard({ node, isSelected, onSelect, kpiMap }) {
  const name = node.groupName ?? node.name ?? '?'
  const desc = node.description ?? ''
  const nodeId = node.id ?? node.groupId
  const kpi = kpiMap?.[nodeId] ?? {}
  const actual = node.actual || kpi.actual || '—'
  const target = node.target || kpi.target || '—'
  const gap = node.gap || kpi.gap || '—'

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
      onClick={() => onSelect(node)}
      title="Click to edit KPI values"
    >
      <div className={styles.cardTop}>
        <div className={styles.avatar}>{name[0].toUpperCase()}</div>
        <div className={styles.cardInfo}>
          <p className={styles.cardName}>{name}</p>
          {desc && <small className={styles.cardDesc}>{desc}</small>}
        </div>
        <span className={styles.editBadge}><PencilIcon /></span>
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

function EyeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function PencilIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
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
