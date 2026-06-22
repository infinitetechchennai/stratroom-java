/**
 * Org chart context keys — mirrors legacy org_structure.js / admin.js localStorage flow.
 */

export function resolveChartEmpId(fallbackEmpId) {
  const orgUser = localStorage.getItem('orguseraccessid')
  if (orgUser) return Number(orgUser)

  const orglink = localStorage.getItem('orglink')
  if (orglink === 'subuser') {
    const user = localStorage.getItem('useraccessid')
    if (user) return Number(user)
  }

  // Default: always use the logged-in profile, not a stale rootuseraccessid from a prior session.
  if (fallbackEmpId != null && fallbackEmpId !== '') return Number(fallbackEmpId)
  const root = localStorage.getItem('rootuseraccessid')
  if (root) return Number(root)
  return null
}

/** Reset org-chart drill-down state whenever auth identity changes. */
export function resetOrgChartSession(profile) {
  const empId = profile?.empId ?? profile?.id
  if (empId == null || empId === '') return
  const id = String(empId)
  localStorage.setItem('useraccessid', id)
  localStorage.setItem('rootuseraccessid', id)
  localStorage.removeItem('orguseraccessid')
  localStorage.removeItem('orglink')
}

export function drillDownAsSubUser(empId) {
  if (empId == null || empId === '') return
  localStorage.setItem('useraccessid', String(empId))
  localStorage.removeItem('orguseraccessid')
  localStorage.setItem('orglink', 'subuser')
}

export function returnToOrgRoot() {
  const root = localStorage.getItem('rootuseraccessid')
  if (root) localStorage.setItem('useraccessid', root)
  localStorage.removeItem('orguseraccessid')
  localStorage.setItem('orglink', 'rootuser')
}

export function isDrilledDownFromRoot(fallbackEmpId) {
  const root = localStorage.getItem('rootuseraccessid')
  if (!root) return false
  const current = resolveChartEmpId(fallbackEmpId)
  return current != null && String(root) !== String(current)
}

/** Legacy orgstructurePermission flags (Organization module). */
export function getOrgStructurePermissions(hasPermission, isHistorical) {
  if (isHistorical) {
    return { canView: true, canCreate: false, canEdit: false, canDelete: false }
  }
  const canCreate = hasPermission('Organization', 'Create')
  const canEdit = hasPermission('Organization', 'Update')
  const canDelete = hasPermission('Organization', 'Delete')
  let canView = hasPermission('Organization', 'View')
  if (canCreate || canEdit || canDelete) canView = true
  return { canView, canCreate, canEdit, canDelete }
}

export function canShowOrgStructureNav(hasPermission) {
  return getOrgStructurePermissions(hasPermission, false).canView
}

export function canDrillDownOrgChart(roleName) {
  const r = (roleName || '').trim()
  return r === 'Super User' || r === 'Admin'
}

export function nodeActionFlags(node, permFlags) {
  const maintain = node?.canMaintain !== false
  return {
    add: permFlags.canCreate && maintain,
    edit: permFlags.canEdit && maintain,
    delete: permFlags.canDelete && maintain,
  }
}

/** Dept import payload kept until Users import runs (owner/member backfill). */
const PENDING_DEPT_IMPORT_KEY = 'pendingDeptImportBackfill'

export function savePendingDeptImport(orgId, depts) {
  if (!depts?.length) return
  try {
    sessionStorage.setItem(PENDING_DEPT_IMPORT_KEY, JSON.stringify({ orgId, depts }))
  } catch { /* sessionStorage full or unavailable */ }
}

export function getPendingDeptImport(orgId) {
  try {
    const raw = sessionStorage.getItem(PENDING_DEPT_IMPORT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (orgId != null && parsed.orgId != null && String(parsed.orgId) !== String(orgId)) return null
    return parsed.depts ?? null
  } catch {
    return null
  }
}

export function clearPendingDeptImport() {
  try {
    sessionStorage.removeItem(PENDING_DEPT_IMPORT_KEY)
  } catch { /* ignore */ }
}
