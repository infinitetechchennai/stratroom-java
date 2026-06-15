import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '../../context/AuthContext'
import { useI18n } from '../../context/I18nContext'
import { fetchOrgStructure, createEmployee, updateEmployee, deleteEmployee, addDepartmentMapping } from '../../api/orgStructureApi'
import axiosClient from '../../api/axiosClient'
import styles from './OrgStructureNew.module.css'

const COLORS = [
  '#00C4C4', '#7C3AED', '#E91E8C', '#F59E0B',
  '#10B981', '#3B82F6', '#F43F5E', '#D4A017',
  '#6366F1', '#059669', '#DC2626', '#0891B2',
]

function pickColor(id) {
  return COLORS[Math.abs(id ?? 0) % COLORS.length]
}

function enhanceTree(nodes) {
  return (nodes ?? []).map(node => {
    const id = node.id ?? node.groupId
    return {
      ...node,
      id,
      name: node.groupName ?? node.name ?? 'Unnamed',
      designation: node.designation ?? node.description ?? '',
      department: node.department ?? '',
      deptId: node.deptCode ?? '',
      location: node.location ?? '',
      email: node.email ?? '',
      members: node.members ?? '',
      photo: node.photo ?? null,
      color: node.color ?? pickColor(id),
      children: enhanceTree(node.children),
    }
  })
}

function flattenTree(nodes, out = []) {
  nodes.forEach(n => { out.push(n); flattenTree(n.children, out) })
  return out
}

function findNode(nodes, id) {
  for (const n of nodes) {
    if (n.id === id) return n
    const f = findNode(n.children, id)
    if (f) return f
  }
  return null
}

function filterTree(nodes, term) {
  if (!nodes?.length) return []
  return nodes.reduce((acc, node) => {
    const name = (node.name || '').toLowerCase()
    const desc = (node.designation || node.department || '').toLowerCase()
    const email = (node.email || '').toLowerCase()
    const childMatches = filterTree(node.children, term)
    if (name.includes(term) || desc.includes(term) || email.includes(term) || childMatches.length > 0) {
      acc.push({ ...node, children: childMatches.length ? childMatches : node.children })
    }
    return acc
  }, [])
}

// ── Avatar ─────────────────────────────────────────────────────────────────────
function Avatar({ node, size = 'md' }) {
  const cls = [styles.avatar, size === 'sm' ? styles.avatarSm : styles.avatarMd].join(' ')
  const initials = (node.name || '?').slice(0, 2).toUpperCase()
  if (node.photo) {
    return (
      <div className={cls} style={{ background: node.color }}>
        <img src={node.photo} alt={node.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
      </div>
    )
  }
  return <div className={cls} style={{ background: node.color }}>{initials}</div>
}

// ── NodeBadges ──────────────────────────────────────────────────────────────────
function NodeBadges({ node, small = false }) {
  const fs = small ? '10px' : '11.5px'
  const sw = small ? 8 : 9
  return (
    <>
      {node.designation && (
        <span className={`${styles.badge} ${styles.badgePurple}`} style={{ fontSize: fs }}>
          <svg width={sw} height={sw} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          </svg>
          {node.designation}
        </span>
      )}
      {node.department && node.department !== node.name && (
        <span className={`${styles.badge} ${styles.badgeCyan}`} style={{ fontSize: fs }}>
          <svg width={sw} height={sw} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
          {node.department}
        </span>
      )}
      {node.location && (
        <span className={`${styles.badge} ${styles.badgePink}`} style={{ fontSize: fs }}>
          <svg width={sw} height={sw} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {node.location}
        </span>
      )}
      {node.deptId && (
        <span className={`${styles.badge} ${styles.badgeMuted}`} style={{ fontSize: fs }}>#{node.deptId}</span>
      )}
    </>
  )
}

// ── TreeRow ────────────────────────────────────────────────────────────────────
function TreeRow({ node, onAdd, onEdit, onDelete }) {
  const { t } = useI18n()
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className={styles.treeRowWrap} data-id={node.id}>
      <div className={styles.treeRow}>
        <div className={styles.treeColorBar} style={{ background: node.color }} />
        <div className={styles.gripIcon}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="5" r="1.2" fill="currentColor"/>
            <circle cx="9" cy="12" r="1.2" fill="currentColor"/>
            <circle cx="9" cy="19" r="1.2" fill="currentColor"/>
            <circle cx="15" cy="5" r="1.2" fill="currentColor"/>
            <circle cx="15" cy="12" r="1.2" fill="currentColor"/>
            <circle cx="15" cy="19" r="1.2" fill="currentColor"/>
          </svg>
        </div>
        <div className={styles.treeAvatarWrap}><Avatar node={node} size="md" /></div>
        <div className={styles.treeInfo}>
          <div className={styles.treeNameRow}>
            <p className={styles.treeName}>{node.name}</p>
            <NodeBadges node={node} />
          </div>
        </div>
        <div className={styles.treeActions}>
          {node.children.length > 0 && (
            <button className={`${styles.actionPill} ${styles.apTog}`} onClick={() => setCollapsed(c => !c)}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(90deg)', transition: 'transform .2s' }}>
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          )}
          <button className={`${styles.actionPill} ${styles.apAdd}`} onClick={() => onAdd(node.id)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            {t('common.add')}
          </button>
          <button className={`${styles.actionPill} ${styles.apEdit}`} onClick={() => onEdit(node.id)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            {t('common.edit')}
          </button>
          <button className={`${styles.actionPill} ${styles.apDel}`} onClick={() => onDelete(node.id)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            </svg>
            {t('common.delete')}
          </button>
        </div>
      </div>
      {node.children.length > 0 && (
        <div className={`${styles.childrenWrap}${collapsed ? ' ' + styles.collapsed : ''}`}
          style={{ maxHeight: collapsed ? 0 : '9999px' }}>
          <div className={styles.childrenInner}>
            {node.children.map(child => (
              <TreeRow key={child.id} node={child} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ── TreeView ───────────────────────────────────────────────────────────────────
function TreeView({ tree, onAdd, onEdit, onDelete }) {
  const { t } = useI18n()
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionHeaderTitle}>{t('org.teamHierarchy')}</h2>
          <p className={styles.sectionHeaderSub}>{t('org.hierarchyHint')}</p>
        </div>
        <button className={`${styles.actionPill} ${styles.apAdd}`} onClick={() => onAdd(-1)}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          {t('org.addRoot')}
        </button>
      </div>
      <div className={styles.treeContainer}>
        {tree.length === 0 ? (
          <div className={styles.emptyState}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <p>{t('org.noData')}</p>
          </div>
        ) : (
          tree.map(n => (
            <TreeRow key={n.id} node={n} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  )
}

// ── ChartView ──────────────────────────────────────────────────────────────────
const NW = 204, NH = 96, HG = 36, VG = 64

function layoutChart(nodes, depth = 0, sx = 0) {
  const result = []
  let x = sx
  const levelY      = depth       * (NH + VG)
  const childLevelY = (depth + 1) * (NH + VG)

  for (const n of nodes) {
    const descendants = n.children.length ? layoutChart(n.children, depth + 1, x) : []
    // Only direct children (one level down) for width + centering
    const directKids  = descendants.filter(k => k.y === childLevelY)

    let sw, cx
    if (directKids.length === 0) {
      sw = NW
      cx = x
    } else {
      sw = directKids.reduce((s, k) => s + (k.sw || NW) + HG, 0) - HG
      cx = (directKids[0].x + directKids[directKids.length - 1].x) / 2
    }

    result.push({ ...n, x: cx, y: levelY, sw })
    result.push(...descendants)
    x += sw + HG
  }
  return result
}

function buildEdges(nodes, layoutMap) {
  const edges = []
  const visit = (ns) => ns.forEach(n => {
    const p = layoutMap.get(n.id)
    n.children.forEach(c => {
      const cl = layoutMap.get(c.id)
      if (p && cl) edges.push({ f: p, t: cl, color: n.color })
    })
    visit(n.children)
  })
  visit(nodes)
  return edges
}

function ChartView({ tree, onAdd, onEdit, onDelete }) {
  const { t } = useI18n()
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 40, y: 40 })
  const [offsets, setOffsets] = useState({})
  const [selected, setSelected] = useState(null)
  const panRef = useRef({ active: false, startX: 0, startY: 0, startPan: { x: 40, y: 40 } })
  const canvasRef = useRef(null)

  const laid = layoutChart(tree)
  const withOff = laid.map(n => ({
    ...n,
    x: n.x + (offsets[n.id]?.x || 0),
    y: n.y + (offsets[n.id]?.y || 0),
  }))
  const lm = new Map(withOff.map(n => [n.id, n]))
  const edges = buildEdges(tree, lm)
  const cw = Math.max(900, ...withOff.map(n => n.x + NW)) + 80
  const ch = Math.max(500, ...withOff.map(n => n.y + NH)) + 80

  // Auto-fit all nodes into view whenever tree changes
  useEffect(() => {
    if (laid.length === 0 || !canvasRef.current) return
    const maxX = Math.max(...laid.map(n => n.x + NW))
    const maxY = Math.max(...laid.map(n => n.y + NH))
    const vw = canvasRef.current.clientWidth  || 900
    const vh = canvasRef.current.clientHeight || 530
    const padding = 48
    const scaleX = (vw - padding * 2) / maxX
    const scaleY = (vh - padding * 2) / maxY
    const newZoom = Math.min(scaleX, scaleY, 1)
    const fitted = +newZoom.toFixed(2)
    const newPanX = (vw - maxX * fitted) / 2
    const newPanY = padding
    setZoom(fitted)
    setPan({ x: Math.max(padding, newPanX), y: newPanY })
    setOffsets({})
  }, [tree])

  const handleCanvasMouseDown = useCallback((e) => {
    if (e.target.closest(`.${styles.chartNode}`)) return
    panRef.current = { active: true, startX: e.clientX, startY: e.clientY, startPan: { ...pan } }
    canvasRef.current?.classList.add(styles.panning)
  }, [pan])

  useEffect(() => {
    const mv = e => {
      if (!panRef.current.active) return
      setPan({ x: panRef.current.startPan.x + e.clientX - panRef.current.startX, y: panRef.current.startPan.y + e.clientY - panRef.current.startY })
    }
    const up = () => { panRef.current.active = false; canvasRef.current?.classList.remove(styles.panning) }
    window.addEventListener('mousemove', mv); window.addEventListener('mouseup', up)
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up) }
  }, [])

  const hookNodeDrag = useCallback((e, id) => {
    e.preventDefault()
    let sx = e.clientX, sy = e.clientY
    const mv = ev => {
      const dx = (ev.clientX - sx) / zoom, dy = (ev.clientY - sy) / zoom
      setOffsets(o => ({ ...o, [id]: { x: (o[id]?.x || 0) + dx, y: (o[id]?.y || 0) + dy } }))
      sx = ev.clientX; sy = ev.clientY
    }
    const up = () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up) }
    window.addEventListener('mousemove', mv); window.addEventListener('mouseup', up)
  }, [zoom])

  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionHeaderTitle}>{t('org.orgChart')}</h2>
          <p className={styles.sectionHeaderSub}>{t('org.chartHint')}</p>
        </div>
        <div className={styles.chartControls}>
          <button className={styles.icBtn} onClick={() => setZoom(z => Math.min(2, +(z + 0.15).toFixed(2)))} title="Zoom in">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          <span className={styles.zoomLabel}>{Math.round(zoom * 100)}%</span>
          <button className={styles.icBtn} onClick={() => setZoom(z => Math.max(0.3, +(z - 0.15).toFixed(2)))} title="Zoom out">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          <button className={styles.icBtn} onClick={() => { setOffsets({}); setZoom(1); setPan({ x: 40, y: 40 }) }} title="Reset">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
            </svg>
          </button>
        </div>
      </div>

      <div ref={canvasRef} className={styles.canvasArea} onMouseDown={handleCanvasMouseDown}
        onClick={e => { if (!e.target.closest(`.${styles.chartNode}`)) setSelected(null) }}>
        <div className={styles.canvasInner}
          style={{ transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})` }}>
          <svg style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', overflow: 'visible', width: cw, height: ch }}>
            {edges.map((e, i) => {
              const x1 = e.f.x + NW / 2, y1 = e.f.y + NH, x2 = e.t.x + NW / 2, y2 = e.t.y, my = (y1 + y2) / 2
              return <path key={i} d={`M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`}
                fill="none" stroke={e.color || '#CBD5E1'} strokeWidth="1.5" opacity=".5" />
            })}
          </svg>
          <div style={{ position: 'relative', width: cw, height: ch }}>
            {withOff.map(lay => {
              const node = findNode(tree, lay.id); if (!node) return null
              const isSelected = selected === lay.id
              return (
                <div key={lay.id}
                  className={`${styles.chartNode}${isSelected ? ' ' + styles.selected : ''}`}
                  style={{ left: lay.x, top: lay.y }}
                  onClick={e => { e.stopPropagation(); setSelected(lay.id) }}
                  onMouseDown={e => { if (e.target.closest('button')) return; hookNodeDrag(e, lay.id) }}>
                  <div className={styles.cnBody} style={{ borderTop: `3px solid ${node.color}` }}>
                    <div className={styles.cnNodeBody}>
                      <div className={styles.cnNodeHeader}>
                        <Avatar node={node} size="sm" />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--navy)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{node.name}</p>
                          <p style={{ fontSize: 10, color: 'var(--text-sec)', margin: '1px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{node.designation || node.department || ''}</p>
                        </div>
                      </div>
                      <div className={styles.cnNodeMeta}>
                        <NodeBadges node={node} small />
                      </div>
                    </div>
                  </div>
                  <div className={styles.cnActions}>
                    <button className={`${styles.actionPill} ${styles.apAdd}`} style={{ padding: '3px 6px' }}
                      onClick={e => { e.stopPropagation(); onAdd(node.id) }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </button>
                    <button className={`${styles.actionPill} ${styles.apEdit}`} style={{ padding: '3px 6px' }}
                      onClick={e => { e.stopPropagation(); onEdit(node.id) }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button className={`${styles.actionPill} ${styles.apDel}`} style={{ padding: '3px 6px' }}
                      onClick={e => { e.stopPropagation(); onDelete(node.id) }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── GridView ───────────────────────────────────────────────────────────────────
function GridView({ tree, onEdit, onDelete }) {
  const { t } = useI18n()
  const all = flattenTree(tree)
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionHeaderTitle}>{t('org.teamDirectory')}</h2>
          <p className={styles.sectionHeaderSub}>{all.length} {t('org.people')}</p>
        </div>
      </div>
      <div className={styles.gridContainer}>
        {all.map(node => (
          <div key={node.id} className={styles.gridCard}>
            <div className={styles.gridColorStrip} style={{ background: node.color }} />
            <div className={styles.gridCardBody}>
              <Avatar node={node} size="sm" />
              <div className={styles.gridCardInfo}>
                <p className={styles.gridCardName}>{node.name}</p>
                <div className={styles.gridCardBadges}>
                  <NodeBadges node={node} small />
                </div>
              </div>
              <div className={styles.gridCardActions}>
                <button className={`${styles.actionPill} ${styles.apEdit}`} style={{ padding: '3px 6px', fontSize: 9 }} onClick={() => onEdit(node.id)}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  {t('common.edit')}
                </button>
                <button className={`${styles.actionPill} ${styles.apDel}`} style={{ padding: '3px 6px', fontSize: 9 }} onClick={() => onDelete(node.id)}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  </svg>
                  {t('common.delete')}
                </button>
              </div>
            </div>
            <div className={styles.gridCardFooter}>
              <span className={styles.gridCardDept}>{node.designation || node.department}</span>
              {node.members && <span className={styles.gridCardMembers}>{node.members}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── SearchView ─────────────────────────────────────────────────────────────────
function SearchView({ query, tree }) {
  const { t } = useI18n()
  const all = flattenTree(tree)
  const q = query.toLowerCase()
  const results = q ? all.filter(n =>
    (n.name || '').toLowerCase().includes(q) ||
    (n.designation || '').toLowerCase().includes(q) ||
    (n.department || '').toLowerCase().includes(q) ||
    (n.email || '').toLowerCase().includes(q)
  ) : []
  return (
    <div className={`${styles.sectionCard} ${styles.searchView}`}>
      <p className={styles.searchCount}>{results.length} {t('org.people')} · "{query}"</p>
      <div className={styles.searchList}>
        {results.map(node => (
          <div key={node.id} className={styles.treeRow} style={{ cursor: 'default', transform: 'none' }}>
            <div className={styles.treeColorBar} style={{ background: node.color }} />
            <div className={styles.treeAvatarWrap}><Avatar node={node} size="sm" /></div>
            <div className={styles.treeInfo}>
              <div className={styles.treeNameRow}>
                <p className={styles.treeName}>{node.name}</p>
                <NodeBadges node={node} />
              </div>
            </div>
          </div>
        ))}
        {results.length === 0 && (
          <p style={{ fontSize: 12, color: 'var(--text-ter)', margin: 0 }}>{t('common.noResults')}</p>
        )}
      </div>
    </div>
  )
}

// ── Add/Edit Modal ─────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  name: '', attachment: null,
  department: '', deptId: '', owner: '',
  email: '', members: '',
  designation: '', location: '',
  scorecard: '', initiative: '',
  kpi: '', risk: '',
}

function ModalDropdown({ value, onChange, options, placeholder }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [pos, setPos]   = useState({ top: 0, left: 0, width: 0 })
  const btnRef  = useRef(null)
  const listRef = useRef(null)

  const toggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect()
      const listH = Math.min(options.length * 34 + 8, 220)
      const top = (window.innerHeight - r.bottom) >= listH ? r.bottom + 2 : r.top - listH - 2
      setPos({ top, left: r.left, width: r.width })
    }
    setOpen(o => !o)
  }

  useEffect(() => {
    if (!open) return
    const close = e => {
      if (!btnRef.current?.contains(e.target) && !listRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const selected = options.find(o => String(o.value) === String(value))

  return (
    <>
      <button ref={btnRef} type="button" className={styles.ddBtn} onClick={toggle}>
        <span className={selected ? styles.ddBtnSelected : styles.ddBtnPlaceholder}>
          {selected ? selected.label : placeholder}
        </span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && createPortal(
        <div ref={listRef} className={styles.ddList} style={{ top: pos.top, left: pos.left, width: pos.width }}>
          {options.length === 0
            ? <div className={styles.ddEmpty}>{t('org.noOptions')}</div>
            : options.map(o => (
              <div key={o.value}
                className={`${styles.ddItem} ${String(o.value) === String(value) ? styles.ddItemActive : ''}`}
                onMouseDown={() => { onChange(o.value); setOpen(false) }}>
                {o.label}
              </div>
            ))
          }
        </div>,
        document.body
      )}
    </>
  )
}

function OrgModal({ mode, node, onSave, onClose }) {
  const { user } = useAuth()
  const { t } = useI18n()
  const empId = user?.empId

  const [form, setForm] = useState(mode === 'edit' && node ? {
    ...EMPTY_FORM,
    name: node.name || '',
    department: node.department || '',
    deptId: node.deptId || '',
    email: node.email || '',
    members: node.members || '',
    designation: node.designation || '',
    location: node.location || '',
  } : { ...EMPTY_FORM })

  const [employees, setEmployees]   = useState([])
  const [scorecards, setScorecards] = useState([])
  const [initiatives, setInitiatives] = useState([])
  const [kpis, setKpis]             = useState([])
  const [risks, setRisks]           = useState([])

  useEffect(() => {
    if (!empId) return

    // /{empId}/employeeList is the only employee endpoint backed by real DAO queries.
    // organization/employeeList goes through a stub DAO and returns empty.
    // Flatten the tree so all employees (not just root) appear in the dropdown.
    const flattenEmpTree = (node) => {
      if (!node) return []
      const result = [node]
      const kids = node.reporteeList || node.children || []
      kids.forEach(k => result.push(...flattenEmpTree(k)))
      return result
    }
    axiosClient.get(`/api/${empId}/employeeList`)
      .then(r => setEmployees(r.data ? flattenEmpTree(r.data) : []))
      .catch(err => console.error('OrgModal: employeeList failed', err))

    // db-layer ScoreCardController returns List<ScoreCardDTO> directly (plain array)
    axiosClient.get(`/api/scoreCardList/${empId}`)
      .then(r => setScorecards(Array.isArray(r.data) ? r.data : []))
      .catch(err => console.error('OrgModal: scoreCardList failed', err))

    // initiativesListByEmpId has no date-filter param — avoids 500 from null DATE_PERIOD
    axiosClient.get(`/api/initiativesListByEmpId/${empId}`)
      .then(r => setInitiatives(Array.isArray(r.data) ? r.data : []))
      .catch(err => console.error('OrgModal: initiativesListByEmpId failed', err))

    // retrieveNodeKeyList returns List<KPIDetailsDTO> — plain array, display field is measureName/nodeKey
    axiosClient.get('/api/retrieveNodeKeyList')
      .then(r => setKpis(Array.isArray(r.data) ? r.data : []))
      .catch(err => console.error('OrgModal: retrieveNodeKeyList failed', err))

    // riskListByEmpId has no date-filter param — avoids 500 from null dateRange
    axiosClient.get(`/api/riskListByEmpId/${empId}`)
      .then(r => setRisks(Array.isArray(r.data) ? r.data : []))
      .catch(err => console.error('OrgModal: riskListByEmpId failed', err))
  }, [empId])

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const handleFile = e => setForm(f => ({ ...f, attachment: e.target.files[0] || null }))

  const handleOwnerChange = val => {
    const emp = employees.find(em => String(em.id ?? em.empId) === String(val))
    const name = emp
      ? (emp.name || [emp.firstName, emp.lastName].filter(Boolean).join(' ') || val)
      : form.name
    setForm(f => ({ ...f, owner: String(val), name }))
  }

  const handleSubmit = () => {
    if (!form.name) return
    onSave(form)
  }

  const IconClose = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  )

  return (
    <div className={`${styles.overlay} ${styles.open}`} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <div className={styles.modalIcon}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2.2" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <h3 className={styles.modalTitle}>{mode === 'add' ? t('org.addSubordinate') : t('org.editMember')}</h3>
          </div>
          <button className={styles.modalClose} onClick={onClose}><IconClose /></button>
        </div>

        <div className={styles.modalBody}>
          {/* Row 1: Attachment | Department */}
          <div className={styles.modalGrid2}>
            <div>
              <label className={styles.fieldLabel}>{t('org.attachment').toUpperCase()}</label>
              <div className={styles.fileInputWrap}>
                <label className={styles.fileInputLabel}>
                  <input type="file" accept=".jpeg,.jpg,.pdf,.pptx,.xlsx,.docx"
                    onChange={handleFile} className={styles.fileInputHidden} />
                  <span className={styles.fileInputBtn}>{t('org.chooseFile')}</span>
                  <span className={styles.fileInputName}>
                    {form.attachment ? form.attachment.name : t('org.noFileChosen')}
                  </span>
                </label>
                <p className={styles.fileInputHint}>{t('org.supportedTypes')}</p>
              </div>
            </div>
            <div>
              <label className={styles.fieldLabel}>{t('org.department').toUpperCase()}</label>
              <div className={styles.inputRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                </svg>
                <input type="text" placeholder={t('org.department')} value={form.department} onChange={set('department')} />
              </div>
            </div>
          </div>

          {/* Row 2: Department ID | Owner */}
          <div className={styles.modalGrid2}>
            <div>
              <label className={styles.fieldLabel}>{t('org.departmentId').toUpperCase()}</label>
              <div className={styles.inputRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <input type="text" placeholder={t('org.departmentId')} value={form.deptId} onChange={set('deptId')} />
              </div>
            </div>
            <div>
              <label className={styles.fieldLabel}>{t('org.owner').toUpperCase()}</label>
              <div className={styles.selectRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <ModalDropdown
                  value={form.owner}
                  onChange={handleOwnerChange}
                  placeholder={t('org.selectOwner')}
                  options={employees.map(em => ({
                    value: String(em.id ?? em.empId),
                    label: em.name || [em.firstName, em.lastName].filter(Boolean).join(' ') || `Employee ${em.id ?? em.empId}`
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Row 3: Email | Members */}
          <div className={styles.modalGrid2}>
            <div>
              <label className={styles.fieldLabel}>{t('org.email').toUpperCase()}</label>
              <div className={styles.inputRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input type="email" placeholder={t('org.email')} value={form.email} onChange={set('email')} />
              </div>
            </div>
            <div>
              <label className={styles.fieldLabel}>{t('org.members').toUpperCase()}</label>
              <div className={styles.inputRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <input type="text" placeholder={t('org.members')} value={form.members} onChange={set('members')} />
              </div>
            </div>
          </div>

          {/* Row 4: Designation | Location */}
          <div className={styles.modalGrid2}>
            <div>
              <label className={styles.fieldLabel}>{t('org.designation').toUpperCase()}</label>
              <div className={styles.inputRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                </svg>
                <input type="text" placeholder={t('org.designation')} value={form.designation} onChange={set('designation')} />
              </div>
            </div>
            <div>
              <label className={styles.fieldLabel}>{t('org.location').toUpperCase()}</label>
              <div className={styles.inputRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <input type="text" placeholder={t('org.location')} value={form.location} onChange={set('location')} />
              </div>
            </div>
          </div>

          {/* Row 5: Scorecard | Initiative */}
          <div className={styles.modalGrid2}>
            <div>
              <label className={styles.fieldLabel}>{t('org.scorecard').toUpperCase()}</label>
              <div className={styles.selectRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <ModalDropdown
                  value={form.scorecard}
                  onChange={val => setForm(f => ({ ...f, scorecard: val }))}
                  placeholder={t('org.selectScorecard')}
                  options={scorecards.map(sc => ({ value: sc.id, label: sc.scorecardName || `Scorecard ${sc.id}` }))}
                />
              </div>
            </div>
            <div>
              <label className={styles.fieldLabel}>{t('org.initiative').toUpperCase()}</label>
              <div className={styles.selectRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                <ModalDropdown
                  value={form.initiative}
                  onChange={val => setForm(f => ({ ...f, initiative: val }))}
                  placeholder={t('org.selectInitiative')}
                  options={initiatives.map(ini => ({ value: ini.id, label: ini.initiativeValue?.name || `Initiative ${ini.id}` }))}
                />
              </div>
            </div>
          </div>

          {/* Row 6: KPI | Risk */}
          <div className={styles.modalGrid2}>
            <div>
              <label className={styles.fieldLabel}>{t('nav.kpi').toUpperCase()}</label>
              <div className={styles.selectRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
                <ModalDropdown
                  value={form.kpi}
                  onChange={val => setForm(f => ({ ...f, kpi: val }))}
                  placeholder={t('org.selectKpi')}
                  options={kpis.map(k => ({ value: k.orgKpiId || k.kpiId, label: k.measureName || k.nodeKey || k.metricCode || `KPI ${k.orgKpiId || k.kpiId}` }))}
                />
              </div>
            </div>
            <div>
              <label className={styles.fieldLabel}>{t('org.risk').toUpperCase()}</label>
              <div className={styles.selectRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <ModalDropdown
                  value={form.risk}
                  onChange={val => setForm(f => ({ ...f, risk: val }))}
                  placeholder={t('org.selectRisk')}
                  options={risks.map(r => ({ value: r.id, label: r.riskValue?.name || r.riskUniqueId || `Risk ${r.id}` }))}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.btnGhost} onClick={onClose}>{t('common.cancel')}</button>
          <button className={styles.btnPrimary} onClick={handleSubmit}>{t('common.save').toUpperCase()}</button>
        </div>
      </div>
    </div>
  )
}

// ── Delete Modal ───────────────────────────────────────────────────────────────
function DeleteModal({ node, onConfirm, onClose }) {
  const { t } = useI18n()
  return (
    <div className={`${styles.overlay} ${styles.open}`} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={`${styles.modal} ${styles.modalSm}`}>
        <div className={styles.modalHeader} style={{ background: '#ef4444' }}>
          <div className={styles.modalHeaderLeft}>
            <div className={styles.modalIcon} style={{ background: 'rgba(255,255,255,.18)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              </svg>
            </div>
            <h3 className={styles.modalTitle}>{t('org.deleteTitle')}</h3>
          </div>
          <button className={styles.modalClose} onClick={onClose}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div style={{ padding: '20px 18px' }}>
          <p style={{ fontSize: 13, color: 'var(--text-sec)', margin: 0, lineHeight: 1.6 }}>
            {t('org.deleteConfirm')} <strong style={{ color: 'var(--navy)' }}>{node?.name}</strong>? {t('org.deleteWarning')}
          </p>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.btnGhost} onClick={onClose}>{t('common.cancel')}</button>
          <button className={styles.btnDanger} onClick={onConfirm}>{t('common.delete')}</button>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function OrgStructureNew() {
  const { user, loading: authLoading } = useAuth()
  const { t } = useI18n()
  const [tree, setTree] = useState([])
  const [apiLoading, setApiLoading] = useState(true)
  const [apiError, setApiError] = useState(null)
  const [view, setView] = useState('tree')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [delTarget, setDelTarget] = useState(null)
  const [deptMode, setDeptMode] = useState(false)

  const loadOrg = useCallback(async () => {
    const empId = user?.empId
    if (!empId) { setApiLoading(false); return }
    setApiLoading(true); setApiError(null)
    try {
      const orgId = user?.orgDetails?.orgId ?? user?.orgId
      const { nodes, departmentMode } = await fetchOrgStructure(empId, orgId)
      setDeptMode(departmentMode)
      setTree(enhanceTree(nodes))
    } catch (err) {
      setApiError(err?.message || t('org.loadError'))
    } finally {
      setApiLoading(false)
    }
  }, [user?.empId, user?.orgId, user?.orgDetails?.orgId, t])

  useEffect(() => {
    if (!authLoading) loadOrg()
  }, [authLoading, loadOrg])

  const handleAdd = useCallback((parentId) => setModal({ mode: 'add', parentId }), [])
  const handleEdit = useCallback((nodeId) => setModal({ mode: 'edit', nodeId }), [])
  const handleDelete = useCallback((nodeId) => setDelTarget(nodeId), [])

  const buildEmployeePayload = useCallback((formData, parentId, orgName) => {
    // Employee.orgDetails is OrganizationDetails { orgId, name }. createEmployee service calls
    // getOrgDetails(name) then reads .getOrgId() — both name and orgId required to avoid NPE.
    const orgId = user?.orgDetails?.orgId ?? user?.orgDetails?.id ?? user?.orgId ?? 1
    const payload = {
      name:       formData.name,
      email:      formData.email,
      title:      formData.designation,
      dept:       formData.department,
      location:   formData.location,
      orgDetails: { orgId, name: orgName },
    }
    // Send dept name + deptUniqueId (NOT deptDetails.id — the form value is a user-typed code,
    // not a DB PK; a wrong PK makes the backend's getOne(deptId) throw EntityNotFoundException).
    // populateDepartmentFromRequest finds the dept by unique ID or creates it when missing.
    if (formData.deptId) payload.deptUniqueId = String(formData.deptId)
    if (parentId && parentId !== -1) payload.pid = parentId
    return payload
  }, [user])

  const handleSave = useCallback(async (formData) => {
    try {
      // Resolve org name — user.orgDetails.name can be null if the profile was saved without it.
      // Fall back to fetching from /api/org_details/{orgId} before building the payload.
      let orgName = user?.orgDetails?.name ?? user?.orgDetails?.orgName ?? null
      if (!orgName) {
        const orgId = user?.orgDetails?.orgId ?? user?.orgDetails?.id ?? user?.orgId
        if (orgId) {
          try {
            const r = await axiosClient.get(`/api/org_details/${orgId}`)
            orgName = r.data?.name ?? null
          } catch { /* non-critical — proceed with null */ }
        }
      }

      const orgId = user?.orgDetails?.orgId ?? user?.orgDetails?.id ?? user?.orgId ?? 1
      const meId = user?.empId

      if (modal.mode === 'add' && deptMode) {
        // Department-mode add: the person becomes the owner of a NEW child department,
        // wired under the clicked row's department. Two steps because the hierarchy
        // lives in department_chart_details, not in employee parent links.
        //   1) create the bare employee (NO dept fields → backend won't make an orphan node)
        //   2) addDepartmentMapping creates the dept + chart node (owner + parent) + assigns them
        const personPayload = {
          name:     formData.name,
          email:    formData.email,
          title:    formData.designation,
          location: formData.location,
          orgDetails: { orgId, name: orgName },
        }
        console.log('createEmployee (dept-mode) payload:', JSON.stringify(personPayload))
        const created = await createEmployee(personPayload)
        const newEmpId = created?.employeeId
        if (!newEmpId) throw new Error('Employee was not created (no id returned)')

        // Parent row id IS the parent department's id in dept mode. -1 = add a root dept.
        const deptParentId = modal.parentId === -1 ? 0 : modal.parentId
        const deptPayload = {
          deptName:      formData.department,
          deptUniqueId:  formData.deptId ? String(formData.deptId) : undefined,
          orgId,
          owner:         newEmpId,
          emailAddress:  formData.email,
          deptParentId,
          empIdList:     [newEmpId],
          createdBy:     meId,
          superCreatedBy: meId,
          active:        0,
        }
        console.log('addDepartmentMapping payload:', JSON.stringify(deptPayload))
        await addDepartmentMapping(deptPayload)
      } else if (modal.mode === 'add') {
        // Employee-mode add: plain subordinate under the parent employee.
        const payload = buildEmployeePayload(formData, modal.parentId, orgName)
        console.log('createEmployee payload:', JSON.stringify(payload))
        await createEmployee(payload)
      } else {
        // Edit: in dept mode the row id is a deptId, so update the owner's employee record.
        const node = findNode(tree, modal.nodeId)
        const targetId = node?.ownerId ?? modal.nodeId
        const payload = { ...buildEmployeePayload(formData, null, orgName), id: targetId }
        console.log('updateEmployee payload:', JSON.stringify(payload))
        await updateEmployee(payload)
      }
      setModal(null)
      await loadOrg()
    } catch (err) {
      const detail = err?.response?.data
      console.error('Save employee failed:', detail || err?.message || err)
      // Backend swallows the real cause and returns "responseDTO is null" — the most common
      // trigger is the duplicate-email guard, so surface an actionable message.
      const msg = String(detail?.exception || detail?.message || err?.message || '')
      alert(msg.includes('responseDTO')
        ? 'Save failed. An employee with this email may already exist — check the chart or use a different email.'
        : `Save failed: ${msg || 'unknown error'}`)
    }
  }, [modal, user, tree, deptMode, buildEmployeePayload, loadOrg])

  const handleConfirmDelete = useCallback(async () => {
    try {
      // Dept-mode rows carry the deptId; the delete endpoint needs the owner's empId.
      const node = findNode(tree, delTarget)
      await deleteEmployee(node?.ownerId ?? delTarget)
    } catch (err) {
      console.error('Delete employee failed:', err)
    }
    setDelTarget(null)
    await loadOrg()
  }, [delTarget, tree, loadOrg])

  const editNode = modal?.mode === 'edit' ? findNode(tree, modal.nodeId) : null
  const delNode = delTarget ? findNode(tree, delTarget) : null
  const showSearch = search.trim().length > 0
  const displayTree = showSearch ? filterTree(tree, search.toLowerCase()) : tree

  const VIEW_BTNS = [
    {
      id: 'tree', title: t('org.treeView'), onClick: () => setView('tree'),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    },
    {
      id: 'chart', title: t('org.chartView'), onClick: () => setView('chart'),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="12" y2="14"/><line x1="12" y1="14" x2="5" y2="16"/><line x1="12" y1="14" x2="19" y2="16"/></svg>,
    },
    {
      id: 'grid', title: t('org.gridView'), onClick: () => setView('grid'),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    },
    {
      id: 'add', title: t('org.addPerson'), onClick: () => handleAdd(-1),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>,
    },
  ]

  return (
    <div className={styles.root}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.pageTitle}>
            <div className={styles.pageTitleIcon}>
              <img src="/images/org-structure-i.svg" width="16" height="16" alt="" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <div>
              <h1 className={styles.pageTitleText}>{t('org.title')}</h1>
              <p className={styles.pageTitleSub}>{t('org.subtitle')}</p>
            </div>
          </div>

          <div className={styles.searchWrap}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input className={styles.searchInput} type="text" placeholder={t('org.searchPeople')}
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <select className={styles.headerSelect} defaultValue="current">
            <option value="current">{t('org.current')}</option>
            <option value="ytd">YTD</option>
            <option value="q1">Q1</option>
            <option value="q2">Q2</option>
            <option value="q3">Q3</option>
            <option value="q4">Q4</option>
          </select>

          <select className={styles.headerSelect} defaultValue="">
            <option value="">{t('org.allGroups')}</option>
          </select>

          <select className={styles.headerSelect} defaultValue="">
            <option value="">{t('org.allDepartments')}</option>
          </select>

          <div className={styles.pageIcons}>
            {VIEW_BTNS.map(vi => (
              <button key={vi.id}
                className={`${styles.pageIconBtn}${view === vi.id ? ' ' + styles.active : ''}`}
                title={vi.title} onClick={vi.onClick}>
                {vi.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className={styles.main}>
        {apiLoading || authLoading ? (
          <div className={styles.sectionCard}>
            <div className={styles.loaderWrap}>
              <div className={styles.spinner} />
            </div>
          </div>
        ) : apiError ? (
          <div className={styles.sectionCard}>
            <div className={styles.emptyState}>
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p>{apiError}</p>
            </div>
          </div>
        ) : showSearch ? (
          <SearchView query={search} tree={tree} />
        ) : view === 'tree' ? (
          <TreeView tree={displayTree} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
        ) : view === 'chart' ? (
          <ChartView tree={displayTree} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <GridView tree={displayTree} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </main>

      {modal && (
        <OrgModal mode={modal.mode} node={editNode} onSave={handleSave} onClose={() => setModal(null)} />
      )}
      {delTarget && (
        <DeleteModal node={delNode} onConfirm={handleConfirmDelete} onClose={() => setDelTarget(null)} />
      )}
    </div>
  )
}
