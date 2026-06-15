import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../../api/axiosClient'
import styles from './Userrolemanagement.module.css'

export default function Userrolemanagement() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const fetchUsers = useCallback(async () => {
    if (!user?.empId) return
    setLoading(true)
    try {
      const res = await axiosClient.get(`/stratroom/userRoleList/${user.empId}`)
      setUsers(Array.isArray(res.data) ? res.data : [])
    } catch {
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [user?.empId])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const filteredUsers = searchTerm
    ? users.filter((u) =>
        (u.firstName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.lastName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.emailAddress || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.userRoleName || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users

  const handleExport = async () => {
    try {
      window.open('/stratroom/downloadUserRole', '_blank')
    } catch {
      // best-effort
    }
  }

  const handleImport = () => {
    // Will be connected to file upload modal
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h4 className={styles.title}>
            <span className={styles.icon}>
              <UserRoleIcon />
            </span>
            Users & Permissions
          </h4>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.actionBtn} onClick={() => setShowAddModal(true)} title="Add User">
            <PlusIcon />
          </button>
          <button className={styles.actionBtn} onClick={handleExport} title="Import Template">
            <ImportIcon />
          </button>
          <button className={styles.actionBtn} onClick={handleImport} title="Export">
            <ExportIcon />
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderLeft}>
            <h5 className={styles.cardTitle}>User List</h5>
          </div>
          <div className={styles.searchBox}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.cardBody}>
          {loading ? (
            <div className={styles.loader}>
              <div className={styles.spinner} />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className={styles.empty}>
              <h3>No users found</h3>
              <p>{searchTerm ? 'Try adjusting your search.' : 'Add users to manage roles and permissions.'}</p>
            </div>
          ) : (
            <div className={styles.tableResponsive}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.thLeft}>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, i) => (
                    <tr key={u.empId || u.id || i}>
                      <td className={styles.tdLeft}>
                        <div className={styles.userCell}>
                          <div className={styles.userAvatar}>
                            {((u.firstName || '?')[0] + (u.lastName || '')[0]).toUpperCase()}
                          </div>
                          <span>{`${u.firstName || ''} ${u.lastName || ''}`.trim() || '—'}</span>
                        </div>
                      </td>
                      <td className={styles.tdCenter}>{u.emailAddress || '—'}</td>
                      <td className={styles.tdCenter}>
                        <span className={styles.roleBadge}>{u.userRoleName || u.roleName || '—'}</span>
                      </td>
                      <td className={styles.tdCenter}>{u.departmentName || u.deptName || '—'}</td>
                      <td className={styles.tdCenter}>
                        <span className={`${styles.statusBadge} ${u.active !== false ? styles.statusActive : styles.statusInactive}`}>
                          {u.active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className={styles.tdCenter}>
                        <button className={styles.editBtn} title="Edit">
                          <EditIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showAddModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowAddModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h4>Add User</h4>
              <button className={styles.modalClose} onClick={() => setShowAddModal(false)}>&times;</button>
            </div>
            <div className={styles.modalBody}>
              <p style={{ textAlign: 'center', color: '#9ca3af', padding: '20px' }}>
                User creation form will be implemented here.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function UserRoleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function ImportIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
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

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}
