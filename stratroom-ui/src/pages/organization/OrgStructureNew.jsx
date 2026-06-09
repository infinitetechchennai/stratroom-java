import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../../api/axiosClient'
import styles from './OrgStructureNew.module.css'

export default function OrgStructureNew() {
  const { user } = useAuth()
  const [viewMode, setViewMode] = useState('tree')
  const [orgData, setOrgData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedNodes, setExpandedNodes] = useState(new Set())

  const fetchOrgData = useCallback(async () => {
    if (!user?.empId) return
    setLoading(true)
    try {
      const res = await axiosClient.get(`/stratroom/orgStructureList/${user.empId}`)
      setOrgData(Array.isArray(res.data) ? res.data : [])
    } catch {
      setOrgData([])
    } finally {
      setLoading(false)
    }
  }, [user?.empId])

  useEffect(() => { fetchOrgData() }, [fetchOrgData])

  const toggleNode = (nodeId) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev)
      if (next.has(nodeId)) next.delete(nodeId)
      else next.add(nodeId)
      return next
    })
  }

  const filteredData = searchTerm
    ? orgData.filter((n) =>
        (n.groupName || n.name || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    : orgData

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h4 className={styles.title}>
            <span className={styles.icon}>
              <OrgIcon />
            </span>
            Organisation Structure
          </h4>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.searchBox}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search organisation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${viewMode === 'tree' ? styles.viewBtnActive : ''}`}
              onClick={() => setViewMode('tree')}
              title="Tree View"
            >
              <TreeIcon />
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <GridIcon />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {loading ? (
          <div className={styles.loader}>
            <div className={styles.spinner} />
          </div>
        ) : filteredData.length === 0 ? (
          <div className={styles.empty}>
            <h3>No organisation data available</h3>
            <p>Organisation structure will appear here once configured.</p>
          </div>
        ) : viewMode === 'tree' ? (
          <div className={styles.treeContainer}>
            <OrgTree
              nodes={filteredData}
              expandedNodes={expandedNodes}
              onToggle={toggleNode}
            />
          </div>
        ) : (
          <div className={styles.gridContainer}>
            {filteredData.map((node) => (
              <OrgCard key={node.id || node.groupId} node={node} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function OrgTree({ nodes, expandedNodes, onToggle, level = 0 }) {
  if (!nodes || nodes.length === 0) return null

  return (
    <ul className={`${styles.nestedArea} ${level > 0 ? styles.nested : ''}`}>
      {nodes.map((node) => {
        const nodeId = node.id || node.groupId
        const hasChildren = node.children && node.children.length > 0
        const isExpanded = expandedNodes.has(nodeId)

        return (
          <li key={nodeId} className={styles.nestedItem}>
            <div className={styles.orgBox}>
              {hasChildren && (
                <button
                  className={`${styles.caret} ${isExpanded ? styles.caretDown : ''}`}
                  onClick={() => onToggle(nodeId)}
                />
              )}
              <div className={styles.orgSection}>
                <div className={styles.orgContent}>
                  <div className={styles.orgAvatar}>
                    {(node.groupName || node.name || '?')[0].toUpperCase()}
                  </div>
                  <div className={styles.orgInfo}>
                    <p className={styles.orgLabel}>{node.groupName || node.name}</p>
                    {node.description && (
                      <small className={styles.orgDesc}>{node.description}</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {hasChildren && isExpanded && (
              <OrgTree
                nodes={node.children}
                expandedNodes={expandedNodes}
                onToggle={onToggle}
                level={level + 1}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

function OrgCard({ node }) {
  return (
    <div className={styles.orgGridCard}>
      <div className={styles.orgGridAvatar}>
        {(node.groupName || node.name || '?')[0].toUpperCase()}
      </div>
      <div className={styles.orgGridInfo}>
        <h5>{node.groupName || node.name}</h5>
        {node.description && <p>{node.description}</p>}
      </div>
    </div>
  )
}

function OrgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function TreeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}
