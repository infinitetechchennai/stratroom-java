import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../../api/axiosClient'
import styles from './Userrolemanagement.module.css'

const TABS = ['User', 'Permission']

const USER_TYPE_OPTIONS = {
  internal: [{ value: 'employees', text: 'Employees' }],
  external: [
    { value: 'vendor', text: 'Vendor' },
    { value: 'independent_director', text: 'Independent Director' },
    { value: 'non_executive_director', text: 'Non Executive Director' },
    { value: 'external_auditor', text: 'External Auditor' },
  ],
}

async function fetchRoleGroups(empId) {
  const [defaultRes, customRes] = await Promise.all([
    axiosClient.get(`/api/roleList/${empId}?type=DEFAULT`),
    axiosClient.get(`/api/roleList/${empId}?type=CUSTOM`),
  ])
  return {
    defaultRoles: Array.isArray(defaultRes.data) ? defaultRes.data : [],
    customRoles: Array.isArray(customRes.data) ? customRes.data : [],
  }
}

async function fetchAllRoles(empId) {
  const { defaultRoles, customRoles } = await fetchRoleGroups(empId)
  const seen = new Set()
  return [...defaultRoles, ...customRoles].filter(r => {
    if (!r?.roleId || seen.has(r.roleId)) return false
    seen.add(r.roleId)
    return true
  })
}

export default function Userrolemanagement() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('User')
  const [users, setUsers] = useState([])
  const [defaultRoles, setDefaultRoles] = useState([])
  const [customRoles, setCustomRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [permissionSearch, setPermissionSearch] = useState('')
  const [editUser, setEditUser] = useState(null)
  const [viewUser, setViewUser] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const orgId = user?.orgDetails?.orgId ?? user?.orgId
  const empId = user?.empId

  const fetchUsers = useCallback(async () => {
    if (!orgId) return
    setLoading(true)
    try {
      const res = await axiosClient.get(`/api/userList/org/${orgId}`)
      setUsers(Array.isArray(res.data) ? res.data : [])
    } catch {
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [orgId])

  const fetchRoles = useCallback(async () => {
    if (!empId) return
    setLoading(true)
    try {
      const groups = await fetchRoleGroups(empId)
      setDefaultRoles(groups.defaultRoles)
      setCustomRoles(groups.customRoles)
    } catch {
      setDefaultRoles([])
      setCustomRoles([])
    } finally {
      setLoading(false)
    }
  }, [empId])

  useEffect(() => {
    if (activeTab === 'User') fetchUsers()
    else fetchRoles()
  }, [activeTab, fetchUsers, fetchRoles])

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Remove this user?')) return
    try {
      await axiosClient.delete(`/api/userRole/${userId}`)
      setUsers(prev => prev.filter(u => u.userId !== userId))
    } catch {
      alert('Failed to remove user.')
    }
  }

  const handleSaveUser = async (dto) => {
    try {
      if (dto.userId) {
        await axiosClient.put('/api/userRole', dto)
      } else {
        await axiosClient.post('/api/userRole', dto)
      }
      setShowAddModal(false)
      setEditUser(null)
      fetchUsers()
    } catch {
      alert('Failed to save user.')
    }
  }

  const handleExport = async () => {
    if (!orgId) return
    try {
      const res = await axiosClient.get(`/api/userList/export/org/${orgId}`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'users-export.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch {
      alert('Failed to export users.')
    }
  }

  const fileInputRef = useRef(null)
  const handleImport = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !orgId) return
    const formData = new FormData()
    formData.append('file', file)
    setLoading(true)
    try {
      await axiosClient.post(`/api/userList/import/org/${orgId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      alert('Users imported successfully!')
      fetchUsers()
    } catch {
      alert('Failed to import users. Please verify your CSV format.')
    } finally {
      setLoading(false)
      if (e.target) e.target.value = ''
    }
  }

  const filteredUsers = searchTerm
    ? users.filter(u =>
        (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.emailAddress || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.userRole || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.departmentList || []).some(d => (d.name || d.deptName || '').toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : users

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backBtn} onClick={() => window.history.back()}>
            <ChevronIcon /> <UserRoleIcon />
          </button>
          <h4 className={styles.title}>USERS &amp; PERMISSIONS</h4>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.iconBtn} onClick={() => { setEditUser(null); setShowAddModal(true) }} title="Add User"><PlusIcon /></button>
          <button className={styles.iconBtn} title="Export" onClick={handleExport}><DownloadIcon /></button>
          <button className={styles.iconBtn} title="Import" onClick={() => fileInputRef.current?.click()}><UploadIcon /></button>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".csv" onChange={handleImport} />
        </div>
      </div>

      <div className={styles.tabRow}>
        {TABS.map(t => (
          <button key={t}
            className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(t)}>
            {t}
          </button>
        ))}
        {activeTab === 'User' ? (
          <div className={styles.tabSearch}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search by name, email, role..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button className={styles.plusCircle} onClick={() => { setEditUser(null); setShowAddModal(true) }}>
              <PlusIcon />
            </button>
          </div>
        ) : (
          <div className={styles.tabSearch}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search by name, email, role..."
              value={permissionSearch}
              onChange={e => setPermissionSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      {activeTab === 'User' ? (
        <UserTable
          users={filteredUsers}
          loading={loading}
          onEdit={u => { setEditUser(u); setShowAddModal(true) }}
          onView={u => setViewUser(u)}
          onDelete={u => handleDeleteUser(u.userId)}
        />
      ) : (
        <PermissionTable
          defaultRoles={defaultRoles}
          customRoles={customRoles}
          loading={loading}
          searchTerm={permissionSearch}
        />
      )}

      {(showAddModal) && (
        <UserModal
          user={editUser}
          orgId={orgId}
          empId={empId}
          users={users}
          onSave={handleSaveUser}
          onClose={() => { setShowAddModal(false); setEditUser(null) }}
        />
      )}

      {viewUser && (
        <ViewModal user={viewUser} onClose={() => setViewUser(null)} />
      )}
    </div>
  )
}

// ── User Table ────────────────────────────────────────────────────────────────
function UserTable({ users, loading, onEdit, onView, onDelete }) {
  if (loading) return <div className={styles.loader}><div className={styles.spinner} /></div>

  if (users.length === 0) return (
    <div className={styles.empty}>
      <h3>No users found</h3>
      <p>Add users to manage roles and permissions.</p>
    </div>
  )

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>NAME</th>
            <th>ROLE</th>
            <th>DEPARTMENT</th>
            <th>USER CATEGORY</th>
            <th>USER TYPE</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => {
            const nameParts = (u.name || '').trim().split(/\s+/)
            const initials = nameParts.length >= 2
              ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
              : (u.name || '?')[0].toUpperCase()
            const deptName = u.departmentList?.length
              ? u.departmentList.map(d => d.name || d.deptName || '').filter(Boolean).join(', ')
              : (u.departments || '')
            const isActive = (u.status || '').toLowerCase() === 'active'

            return (
              <tr key={u.userId || i}>
                <td>
                  <div className={styles.userCell}>
                    <div className={styles.avatar} style={{ background: COLORS[i % COLORS.length] }}>
                      {initials}
                      <span className={`${styles.dot} ${isActive ? styles.dotActive : styles.dotInactive}`} />
                    </div>
                    <div>
                      <div className={styles.userName}>{u.name || '—'}</div>
                      <div className={styles.userEmail}>{u.emailAddress || ''}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`${styles.roleBadge} ${getRoleClass(u.userRole, styles)}`}>
                    {u.userRole || '—'}
                  </span>
                </td>
                <td>
                  {deptName ? <span className={styles.deptBadge}>{deptName}</span> : '—'}
                </td>
                <td>{u.userCategory || '—'}</td>
                <td>{u.userType || '—'}</td>
                <td>
                  <span className={`${styles.statusBadge} ${isActive ? styles.statusActive : styles.statusInactive}`}>
                    {isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionIcon} onClick={() => onEdit(u)} title="Edit"><EditIcon /></button>
                    <button className={styles.actionIcon} onClick={() => onView(u)} title="View"><ViewIcon /></button>
                    <button className={`${styles.actionIcon} ${styles.actionDanger}`} onClick={() => onDelete(u)} title="Delete"><TrashIcon /></button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ── Permission Table ──────────────────────────────────────────────────────────
function PermissionTable({ defaultRoles, customRoles, loading, searchTerm }) {
  const [selected, setSelected] = useState(null)
  const [moduleGroups, setModuleGroups] = useState([])
  const [loadingModules, setLoadingModules] = useState(false)
  const [openModules, setOpenModules] = useState({})
  const [saving, setSaving] = useState(false)
  // 'idle' | 'saving' | 'saved' | 'error' — drives the auto-save status pill so the user
  // gets feedback even though there is no explicit Save button.
  const [saveStatus, setSaveStatus] = useState('idle')

  useEffect(() => {
    if (saveStatus !== 'saved' && saveStatus !== 'error') return
    const id = setTimeout(() => setSaveStatus('idle'), 2500)
    return () => clearTimeout(id)
  }, [saveStatus])

  const loadModules = useCallback(async (roleId, cachedPrivilegeList) => {
    setSelected(roleId)
    setLoadingModules(true)
    try {
      let raw = cachedPrivilegeList
      if (!Array.isArray(raw) || raw.length === 0) {
        const res = await axiosClient.get(`/api/roleDetails/${roleId}`)
        raw = res.data?.modulePrivilegeList || res.data?.moduleList
      }
      const groups = normalizeModulePrivilegeList(raw)
      setModuleGroups(groups)
      setOpenModules(Object.fromEntries(groups.map(g => [g.moduleName, true])))
    } catch {
      setModuleGroups([])
      setOpenModules({})
    } finally {
      setLoadingModules(false)
    }
  }, [])

  useEffect(() => {
    const roles = [...defaultRoles, ...customRoles]
    if (!roles.length) {
      setSelected(null)
      setModuleGroups([])
      return
    }
    const preferred =
      defaultRoles.find(r => r.roleName === 'Super User') ||
      defaultRoles[0] ||
      roles[0]
    loadModules(preferred.roleId, preferred.modulePrivilegeList)
  }, [defaultRoles, customRoles, loadModules])

  const filteredGroups = filterModuleGroups(moduleGroups, searchTerm)

  const updateLocalPriv = (moduleName, tagName, field, value) => {
    setModuleGroups(prev => prev.map(mod => {
      if (mod.moduleName !== moduleName) return mod
      return {
        ...mod,
        tagNameList: mod.tagNameList.map(tag => {
          if (tag.tagName !== tagName) return tag
          return {
            ...tag,
            privileges: { ...tag.privileges, [field]: value ? 'TRUE' : 'FALSE' },
          }
        }),
      }
    }))
  }

  const togglePermission = async (moduleName, tagName, privKey, newChecked) => {
    if (!selected || saving) return
    const fieldMap = {
      view: 'privilegeView',
      add: 'privilegeCreate',
      edit: 'privilegeUpdate',
      delete: 'privilegeDelete',
    }
    const apiName = {
      view: 'View',
      add: 'Create',
      edit: 'Update',
      delete: 'Delete',
    }
    const field = fieldMap[privKey]
    const privilegeName = apiName[privKey]
    if (!field || !privilegeName) return

    const prevVal = moduleGroups
      .find(m => m.moduleName === moduleName)
      ?.tagNameList.find(t => t.tagName === tagName)
      ?.privileges?.[field]

    updateLocalPriv(moduleName, tagName, field, newChecked)
    if (newChecked && privKey !== 'view') {
      updateLocalPriv(moduleName, tagName, 'privilegeView', true)
    }

    setSaving(true)
    setSaveStatus('saving')
    try {
      const base = { roleId: selected, moduleName, tagName }
      if (newChecked) {
        await axiosClient.put('/api/updatePermissions', { ...base, privilegeName })
        if (privKey !== 'view') {
          await axiosClient.put('/api/updatePermissions', { ...base, privilegeName: 'View' })
        }
      } else {
        await axiosClient.put('/api/deletePermissions', { ...base, privilegeName })
      }
      setSaveStatus('saved')
    } catch {
      updateLocalPriv(moduleName, tagName, field, isPrivOn(prevVal))
      setSaveStatus('error')
    } finally {
      setSaving(false)
    }
  }

  const renderRoleList = (roles, label) => (
    <>
      <div className={styles.roleGroupHeader}>{label} ({roles.length})</div>
      {roles.length === 0 && (
        <div className={styles.roleGroupEmpty}>No roles</div>
      )}
      {roles.map(r => (
        <button
          key={r.roleId}
          type="button"
          className={`${styles.roleItem} ${selected === r.roleId ? styles.roleItemActive : ''}`}
          onClick={() => loadModules(r.roleId, r.modulePrivilegeList)}
        >
          {r.roleName}
        </button>
      ))}
    </>
  )

  if (loading) return <div className={styles.loader}><div className={styles.spinner} /></div>

  return (
    <div className={styles.permissionLayout}>
      <div className={styles.roleList}>
        {renderRoleList(defaultRoles, 'Default Roles')}
        <div className={styles.roleGroupDivider} />
        {renderRoleList(customRoles, 'Custom Roles')}
      </div>
      <div className={styles.modulePanel}>
        {saveStatus !== 'idle' && (
          <div
            role="status"
            aria-live="polite"
            style={{
              position: 'sticky', top: 8, zIndex: 5, marginLeft: 'auto', width: 'fit-content',
              display: 'flex', alignItems: 'center', gap: 7, padding: '6px 12px', borderRadius: 999,
              fontSize: 12.5, fontWeight: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              color: saveStatus === 'error' ? '#b91c1c' : saveStatus === 'saved' ? '#15803d' : '#475569',
              background: saveStatus === 'error' ? '#fef2f2' : saveStatus === 'saved' ? '#f0fdf4' : '#f8fafc',
              border: `1px solid ${saveStatus === 'error' ? '#fecaca' : saveStatus === 'saved' ? '#bbf7d0' : '#e2e8f0'}`,
            }}
          >
            {saveStatus === 'saving' && (
              <>
                <style>{'@keyframes urmSavePillSpin{to{transform:rotate(360deg)}}'}</style>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'urmSavePillSpin 0.7s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Saving…
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Saved
              </>
            )}
            {saveStatus === 'error' && (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Save failed — try again
              </>
            )}
          </div>
        )}
        {!selected && (
          <div className={styles.empty} style={{ height: '100%' }}>
            <p>Select a role to view permissions.</p>
          </div>
        )}
        {selected && loadingModules && (
          <div className={styles.loader}><div className={styles.spinner} /></div>
        )}
        {selected && !loadingModules && (
          <div className={styles.moduleAccordionWrap}>
            {filteredGroups.length === 0 ? (
              <p className={styles.moduleEmpty}>No modules configured for this role.</p>
            ) : (
              filteredGroups.map(mod => {
                const isOpen = openModules[mod.moduleName] !== false
                return (
                  <div key={mod.moduleName} className={styles.accordionItem}>
                    <button
                      type="button"
                      className={`${styles.accordionHeader} ${isOpen ? styles.accordionHeaderOpen : ''}`}
                      onClick={() => setOpenModules(prev => ({ ...prev, [mod.moduleName]: !isOpen }))}
                    >
                      <span className={styles.accordionIcon}><ModuleIcon /></span>
                      <span className={styles.accordionTitle}>{mod.moduleName}</span>
                      <span className={styles.accordionChevron}>{isOpen ? '▾' : '▸'}</span>
                    </button>
                    {isOpen && (
                      <div className={styles.accordionBody}>
                        <table className={styles.permTable}>
                          <thead>
                            <tr>
                              <th>Actions</th>
                              <th>View</th>
                              <th>Add</th>
                              <th>Edit</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mod.tagNameList.map(tag => (
                              <tr key={`${mod.moduleName}-${tag.tagName}`}>
                                <td>
                                  <label className={styles.permActionLabel}>
                                    <input type="checkbox" readOnly checked={tagHasAnyPriv(tag)} className={styles.permCheck} />
                                    {tag.tagName}
                                  </label>
                                </td>
                                {['view', 'add', 'edit', 'delete'].map(key => {
                                  const field = {
                                    view: 'privilegeView',
                                    add: 'privilegeCreate',
                                    edit: 'privilegeUpdate',
                                    delete: 'privilegeDelete',
                                  }[key]
                                  const val = tag.privileges?.[field]
                                  const disabled = isPrivNa(val)
                                  return (
                                    <td key={key} className={styles.permCell}>
                                      <input
                                        type="checkbox"
                                        className={styles.permCheck}
                                        checked={isPrivOn(val)}
                                        disabled={disabled || saving}
                                        onChange={e => togglePermission(mod.moduleName, tag.tagName, key, e.target.checked)}
                                      />
                                    </td>
                                  )
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Add / Edit User Modal ────────────────────────────────────────────────────
function UserModal({ user, orgId, empId, users = [], onSave, onClose }) {
  const initialDeptIds = (user?.departmentList || []).map(d => String(d.id)).filter(Boolean)
  const [form, setForm] = useState({
    userId: user?.userId || 0,
    name: user?.name || '',
    emailAddress: user?.emailAddress || '',
    userRole: user?.userRole || 'User',
    roleId: user?.roleId || 0,
    userCategory: (user?.userCategory || '').toLowerCase(),
    userType: user?.userType || '',
    status: user?.status || 'Active',
    orgId: orgId || 0,
    deptIds: initialDeptIds.join(','),
    parentEmpId: user?.parentEmpId || 0,
  })
  const [isExternal, setIsExternal] = useState(form.userCategory === 'external')
  const [roles, setRoles] = useState([])
  const [departments, setDepartments] = useState([])
  const [selectedDeptIds, setSelectedDeptIds] = useState(initialDeptIds)

  useEffect(() => {
    if (!empId) return
    fetchAllRoles(empId)
      .then(setRoles)
      .catch(() => setRoles([]))
  }, [empId])

  useEffect(() => {
    if (!orgId) return
    axiosClient.get(`/api/departmentListByOrgId?orgId=${orgId}`)
      .then(r => setDepartments(Array.isArray(r.data) ? r.data : []))
      .catch(() => setDepartments([]))
  }, [orgId])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!roles.length || form.roleId) return
    const match = roles.find(r => r.roleName === form.userRole) || roles.find(r => r.roleName === 'User') || roles[0]
    if (match) {
      setForm(f => ({ ...f, roleId: match.roleId, userRole: match.roleName }))
    }
  }, [roles, form.roleId, form.userRole])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const typeOptions = USER_TYPE_OPTIONS[form.userCategory] || []

  const toggleDept = (deptId) => {
    const id = String(deptId)
    setSelectedDeptIds(prev => {
      const next = prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
      setForm(f => ({ ...f, deptIds: next.join(',') }))
      return next
    })
  }

  const handleSave = () => {
    const payload = { ...form, deptIds: selectedDeptIds.join(',') }
    if (!isExternal) {
      payload.userCategory = 'internal'
      payload.userType = 'employees'
    }
    onSave(payload)
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h4>{user ? 'Edit User' : 'Add User'}</h4>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.formGrid}>
            <label>
              Full Name
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full name" />
            </label>
            <label>
              Email Address
              <input value={form.emailAddress} onChange={e => set('emailAddress', e.target.value)} placeholder="email@example.com" />
            </label>
            <label>
              Role
              <select
                value={form.roleId || ''}
                onChange={e => {
                  const role = roles.find(r => String(r.roleId) === e.target.value)
                  setForm(f => ({
                    ...f,
                    roleId: role?.roleId || 0,
                    userRole: role?.roleName || f.userRole,
                  }))
                }}>
                <option value="">Select role</option>
                {roles.map(r => (
                  <option key={r.roleId} value={r.roleId}>{r.roleName}</option>
                ))}
              </select>
            </label>
            <label>
              Reports To
              <select value={form.parentEmpId} onChange={e => set('parentEmpId', Number(e.target.value))}>
                <option value={0}>None</option>
                {users.filter(u => u.userId !== form.userId).map(u => (
                  <option key={u.userId} value={u.userId}>{u.name} {u.emailAddress ? `(${u.emailAddress})` : ''}</option>
                ))}
              </select>
            </label>
            
            {!!user && (
              <label>
                Status
                <select value={form.status} onChange={e => set('status', e.target.value)}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
            )}

            <label style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', cursor: 'pointer', textTransform: 'none', color: '#4b5563', fontSize: '14px', gridColumn: '1 / -1' }}>
              <input type="checkbox" checked={isExternal} onChange={e => setIsExternal(e.target.checked)} style={{ width: '16px', height: '16px' }} />
              This is an external user (Vendor, Auditor, etc.)
            </label>

            {isExternal && (
              <>
                <label>
                  User Category
                  <select
                    value={form.userCategory}
                    onChange={e => setForm(f => ({ ...f, userCategory: e.target.value, userType: '' }))}>
                    <option value="">Select category</option>
                    <option value="internal">Internal</option>
                    <option value="external">External</option>
                  </select>
                </label>
                <label>
                  User Type
                  <select
                    value={form.userType}
                    onChange={e => set('userType', e.target.value)}
                    disabled={!form.userCategory}>
                    <option value="">Select type</option>
                    {typeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.text}</option>
                    ))}
                  </select>
                </label>
              </>
            )}
            <div className={styles.fullWidth} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '.04em' }}>Department</span>
              <div className={styles.deptPicker}>
                {departments.length === 0 && <span className={styles.deptEmpty}>No departments available</span>}
                {departments.map(d => (
                  <label key={d.id} className={styles.deptOption}>
                    <input
                      type="checkbox"
                      checked={selectedDeptIds.includes(String(d.id))}
                      onChange={() => toggleDept(d.id)}
                    />
                    {d.name || d.deptName || `Dept ${d.id}`}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.saveBtn} onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  )
}

// ── View User Modal ──────────────────────────────────────────────────────────
function ViewModal({ user, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const deptName = user.departmentList?.length
    ? user.departmentList.map(d => d.name || d.deptName || '').filter(Boolean).join(', ')
    : (user.departments || '—')
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h4>User Details</h4>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.viewGrid}>
            <div><span>Name</span><p>{user.name || '—'}</p></div>
            <div><span>Email</span><p>{user.emailAddress || '—'}</p></div>
            <div><span>Role</span><p>{user.userRole || '—'}</p></div>
            <div><span>Department</span><p>{deptName}</p></div>
            <div><span>User Category</span><p>{user.userCategory || '—'}</p></div>
            <div><span>User Type</span><p>{user.userType || '—'}</p></div>
            <div><span>Status</span><p>{user.status || '—'}</p></div>
            <div><span>Designation</span><p>{user.designation || '—'}</p></div>
            <div><span>Location</span><p>{user.location || '—'}</p></div>
            <div><span>Phone</span><p>{user.phoneNumber || '—'}</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const COLORS = ['#6366f1','#14b8a6','#f59e0b','#ef4444','#8b5cf6','#10b981','#f97316','#06b6d4']

// The backend reads privileges via a native query (queryForMap) and Postgres folds the unquoted
// column labels to lowercase, so the API returns keys like "privilegeview". Read case-insensitively
// so the matrix reflects saved permissions instead of rendering everything as FALSE.
function readPriv(privObj, key) {
  if (!privObj || typeof privObj !== 'object') return 'FALSE'
  if (privObj[key] != null) return privObj[key]
  const lowerKey = key.toLowerCase()
  for (const k of Object.keys(privObj)) {
    if (k.toLowerCase() === lowerKey) return privObj[k]
  }
  return 'FALSE'
}

function normalizeModulePrivilegeList(modulePrivilegeList) {
  if (!Array.isArray(modulePrivilegeList)) return []
  return modulePrivilegeList
    .map(mod => ({
      moduleName: mod.moduleName,
      roleId: mod.roleId,
      tagNameList: (mod.tagNameList || []).map(tag => ({
        tagName: tag.tagName || '—',
        privileges: {
          privilegeView: readPriv(tag.privileges, 'privilegeView'),
          privilegeCreate: readPriv(tag.privileges, 'privilegeCreate'),
          privilegeUpdate: readPriv(tag.privileges, 'privilegeUpdate'),
          privilegeDelete: readPriv(tag.privileges, 'privilegeDelete'),
        },
      })),
    }))
    .filter(mod => mod.tagNameList.length > 0)
}

function filterModuleGroups(groups, searchTerm) {
  const q = (searchTerm || '').trim().toLowerCase()
  if (!q) return groups
  return groups
    .map(mod => ({
      ...mod,
      tagNameList: mod.tagNameList.filter(tag =>
        (mod.moduleName || '').toLowerCase().includes(q) ||
        (tag.tagName || '').toLowerCase().includes(q)
      ),
    }))
    .filter(mod => mod.tagNameList.length > 0)
}

function isPrivOn(val) {
  return val === true || val === 'TRUE' || val === 'true' || val === 1
}

function isPrivNa(val) {
  return typeof val === 'string' && val.toUpperCase() === 'NA'
}

function tagHasAnyPriv(tag) {
  const p = tag.privileges || {}
  return isPrivOn(p.privilegeView) || isPrivOn(p.privilegeCreate) ||
    isPrivOn(p.privilegeUpdate) || isPrivOn(p.privilegeDelete)
}

function getRoleClass(role, styles) {
  const r = (role || '').toLowerCase()
  if (r.includes('super')) return styles.roleSuper
  if (r.includes('admin')) return styles.roleAdmin
  return styles.roleUser
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function ModuleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function UserRoleIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}
function ChevronIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
}
function PlusIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
}
function DownloadIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
}
function UploadIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
}
function SearchIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
}
function EditIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
}
function ViewIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
}
function TrashIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
}
