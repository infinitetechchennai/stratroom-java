import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { fetchOrgStructure } from '../../api/orgStructureApi'
import styles from './OrgStructureNew.module.css'

const COLORS = [
  '#00C4C4', '#7C3AED', '#E91E8C', '#F59E0B',
  '#10B981', '#3B82F6', '#F43F5E', '#D4A017',
  '#6366F1', '#059669', '#DC2626', '#0891B2',
]

let nextId = 10000

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
      designation: node.description ?? '',
      department: '',
      deptId: '',
      location: '',
      email: '',
      members: '',
      photo: null,
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

function removeNode(nodes, id) {
  let found = null
  const next = nodes.filter(n => {
    if (n.id === id) { found = n; return false }
    return true
  }).map(n => {
    const [nc, f] = removeNode(n.children, id)
    if (f) found = f
    return { ...n, children: nc }
  })
  return [next, found]
}

function addChild(nodes, parentId, newNode) {
  return nodes.map(n => {
    if (n.id === parentId) return { ...n, children: [...n.children, newNode] }
    return { ...n, children: addChild(n.children, parentId, newNode) }
  })
}

function updateNode(nodes, id, data) {
  return nodes.map(n => {
    if (n.id === id) return { ...n, ...data }
    return { ...n, children: updateNode(n.children, id, data) }
  })
}

function filterTree(nodes, term) {
  if (!nodes?.length) return []
  return nodes.reduce((acc, node) => {
    const name = (node.name || '').toLowerCase()
    const desc = (node.designation || node.department || '').toLowerCase()
    const childMatches = filterTree(node.children, term)
    if (name.includes(term) || desc.includes(term) || childMatches.length > 0) {
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
  const fs = small ? '8.5px' : '9.5px'
  const sw = small ? 6 : 7
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
      {node.department && (
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
            Add
          </button>
          <button className={`${styles.actionPill} ${styles.apEdit}`} onClick={() => onEdit(node.id)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </button>
          <button className={`${styles.actionPill} ${styles.apDel}`} onClick={() => onDelete(node.id)}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            </svg>
            Delete
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
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionHeaderTitle}>Team Hierarchy</h2>
          <p className={styles.sectionHeaderSub}>Hover a row to edit or add subordinates</p>
        </div>
        <button className={`${styles.actionPill} ${styles.apAdd}`} onClick={() => onAdd(-1)}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Root
        </button>
      </div>
      <div className={styles.treeContainer}>
        {tree.length === 0 ? (
          <div className={styles.emptyState}>
            <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <p>No organisation data found.</p>
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
  const result = []; let x = sx
  for (const n of nodes) {
    const kids = n.children.length ? layoutChart(n.children, depth + 1, x) : []
    const sw = kids.length ? kids.reduce((s, k) => s + (k.sw || NW) + HG, 0) - HG : NW
    const cx = kids.length ? (kids[0].x + kids[kids.length - 1].x) / 2 : x + sw / 2 - NW / 2
    result.push({ ...n, x: cx, y: depth * (NH + VG), sw }); result.push(...kids); x += sw + HG
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
          <h2 className={styles.sectionHeaderTitle}>Org Chart</h2>
          <p className={styles.sectionHeaderSub}>Drag nodes to reposition · Drag background to pan</p>
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
  const all = flattenTree(tree)
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionHeaderTitle}>Team Directory</h2>
          <p className={styles.sectionHeaderSub}>{all.length} people</p>
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
                  Edit
                </button>
                <button className={`${styles.actionPill} ${styles.apDel}`} style={{ padding: '3px 6px', fontSize: 9 }} onClick={() => onDelete(node.id)}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  </svg>
                  Del
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
  const all = flattenTree(tree)
  const q = query.toLowerCase()
  const results = q ? all.filter(n =>
    (n.name || '').toLowerCase().includes(q) ||
    (n.designation || '').toLowerCase().includes(q) ||
    (n.department || '').toLowerCase().includes(q)
  ) : []
  return (
    <div className={`${styles.sectionCard} ${styles.searchView}`}>
      <p className={styles.searchCount}>{results.length} result{results.length !== 1 ? 's' : ''} for "{query}"</p>
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
          <p style={{ fontSize: 12, color: 'var(--text-ter)', margin: 0 }}>No results found.</p>
        )}
      </div>
    </div>
  )
}

// ── Add/Edit Modal ─────────────────────────────────────────────────────────────
const EMPTY_FORM = { name: '', department: '', deptId: '', email: '', members: '', designation: '', location: '' }

function OrgModal({ mode, node, onSave, onClose }) {
  const [form, setForm] = useState(mode === 'edit' && node ? {
    name: node.name || '', department: node.department || '', deptId: node.deptId || '',
    email: node.email || '', members: node.members || '', designation: node.designation || '',
    location: node.location || '',
  } : EMPTY_FORM)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = () => {
    if (!form.name) return
    onSave(form)
  }

  const title = mode === 'add' ? 'Add Person' : 'Edit Person'

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
            <h3 className={styles.modalTitle}>{title}</h3>
          </div>
          <button className={styles.modalClose} onClick={onClose}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalGrid2}>
            <div>
              <label className={styles.fieldLabel}>NAME *</label>
              <div className={styles.inputRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <input type="text" placeholder="Full name" value={form.name} onChange={set('name')} />
              </div>
            </div>
            <div>
              <label className={styles.fieldLabel}>DESIGNATION</label>
              <div className={styles.inputRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                </svg>
                <input type="text" placeholder="e.g. Director" value={form.designation} onChange={set('designation')} />
              </div>
            </div>
          </div>
          <div className={styles.modalGrid2}>
            <div>
              <label className={styles.fieldLabel}>DEPARTMENT</label>
              <div className={styles.inputRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <input type="text" placeholder="Department" value={form.department} onChange={set('department')} />
              </div>
            </div>
            <div>
              <label className={styles.fieldLabel}>DEPT ID</label>
              <div className={styles.inputRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <input type="text" placeholder="e.g. FIN-001" value={form.deptId} onChange={set('deptId')} />
              </div>
            </div>
          </div>
          <div className={styles.modalGrid2}>
            <div>
              <label className={styles.fieldLabel}>EMAIL</label>
              <div className={styles.inputRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <input type="email" placeholder="Email address" value={form.email} onChange={set('email')} />
              </div>
            </div>
            <div>
              <label className={styles.fieldLabel}>LOCATION</label>
              <div className={styles.inputRow}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <input type="text" placeholder="e.g. Harare" value={form.location} onChange={set('location')} />
              </div>
            </div>
          </div>
          <div>
            <label className={styles.fieldLabel}>MEMBERS</label>
            <div className={styles.inputRow}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 12, height: 12, flexShrink: 0 }}>
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <input type="text" placeholder="e.g. 8 members" value={form.members} onChange={set('members')} />
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.btnGhost} onClick={onClose}>Cancel</button>
          <button className={styles.btnPrimary} onClick={handleSubmit}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {mode === 'add' ? 'Add Person' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Delete Modal ───────────────────────────────────────────────────────────────
function DeleteModal({ node, onConfirm, onClose }) {
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
            <h3 className={styles.modalTitle}>Delete Person</h3>
          </div>
          <button className={styles.modalClose} onClick={onClose}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div style={{ padding: '20px 18px' }}>
          <p style={{ fontSize: 13, color: 'var(--text-sec)', margin: 0, lineHeight: 1.6 }}>
            Delete <strong style={{ color: 'var(--navy)' }}>{node?.name}</strong> and all their subordinates? This cannot be undone.
          </p>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.btnGhost} onClick={onClose}>Cancel</button>
          <button className={styles.btnDanger} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function OrgStructureNew() {
  const { user, loading: authLoading } = useAuth()
  const [tree, setTree] = useState([])
  const [apiLoading, setApiLoading] = useState(true)
  const [apiError, setApiError] = useState(null)
  const [view, setView] = useState('tree')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [delTarget, setDelTarget] = useState(null)

  const loadOrg = useCallback(async () => {
    const empId = user?.empId
    if (!empId) { setApiLoading(false); return }
    setApiLoading(true); setApiError(null)
    try {
      const orgId = user?.orgDetails?.orgId ?? user?.orgId
      const data = await fetchOrgStructure(empId, orgId)
      setTree(enhanceTree(data))
    } catch (err) {
      setApiError(err?.message || 'Failed to load organisation structure')
    } finally {
      setApiLoading(false)
    }
  }, [user?.empId, user?.orgId, user?.orgDetails?.orgId])

  useEffect(() => {
    if (!authLoading) loadOrg()
  }, [authLoading, loadOrg])

  const handleAdd = useCallback((parentId) => setModal({ mode: 'add', parentId }), [])
  const handleEdit = useCallback((nodeId) => setModal({ mode: 'edit', nodeId }), [])
  const handleDelete = useCallback((nodeId) => setDelTarget(nodeId), [])

  const handleSave = useCallback((formData) => {
    if (modal.mode === 'add') {
      const id = nextId++
      const newNode = { id, color: pickColor(id), children: [], photo: null, ...formData }
      setTree(t => {
        if (modal.parentId === -1) return [...t, newNode]
        return addChild(t, modal.parentId, newNode)
      })
    } else {
      setTree(t => updateNode(t, modal.nodeId, formData))
    }
    setModal(null)
  }, [modal])

  const handleConfirmDelete = useCallback(() => {
    setTree(t => { const [next] = removeNode(t, delTarget); return next })
    setDelTarget(null)
  }, [delTarget])

  const editNode = modal?.mode === 'edit' ? findNode(tree, modal.nodeId) : null
  const delNode = delTarget ? findNode(tree, delTarget) : null
  const showSearch = search.trim().length > 0
  const displayTree = showSearch ? filterTree(tree, search.toLowerCase()) : tree

  const viewIcons = [
    {
      id: 'add', title: 'Add Person', onClick: () => handleAdd(-1),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>,
    },
    {
      id: 'tree', title: 'Tree View', onClick: () => setView('tree'),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    },
    {
      id: 'chart', title: 'Chart View', onClick: () => setView('chart'),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="12" y2="14"/><line x1="12" y1="14" x2="5" y2="16"/><line x1="12" y1="14" x2="19" y2="16"/></svg>,
    },
    {
      id: 'grid', title: 'Grid View', onClick: () => setView('grid'),
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    },
  ]

  return (
    <div className={styles.root}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div className={styles.pageTitle}>
            <div className={styles.pageTitleIcon}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
                <rect x="2" y="2" width="6" height="6" rx="1"/><rect x="16" y="2" width="6" height="6" rx="1"/>
                <rect x="9" y="16" width="6" height="6" rx="1"/>
                <path d="M5 8v4c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V8"/>
                <line x1="12" y1="14" x2="12" y2="16"/>
              </svg>
            </div>
            <div>
              <h1 className={styles.pageTitleText}>Org Structure</h1>
              <p className={styles.pageTitleSub}>ORGANISATION HIERARCHY</p>
            </div>
          </div>

          <div className={styles.searchWrap}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input className={styles.searchInput} type="text" placeholder="Search people…"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>

          <div className={styles.pageIcons}>
            {viewIcons.map(vi => (
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
