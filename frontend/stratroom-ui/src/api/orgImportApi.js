import { postMultipart } from './multipartFetch'

/** Parents before children so backend can resolve Parent ID → dept row. */
export function sortDepartmentsForImport(depts) {
  if (!depts?.length) return []
  const byId = new Map(depts.map(d => [d.deptID, d]))
  const sorted = []
  const visited = new Set()
  const visiting = new Set()

  function visit(dept) {
    if (!dept?.deptID || visited.has(dept.deptID)) return
    if (visiting.has(dept.deptID)) return
    visiting.add(dept.deptID)
    const parentId = (dept.parentDeptID || '').trim()
    if (parentId && byId.has(parentId)) visit(byId.get(parentId))
    visiting.delete(dept.deptID)
    visited.add(dept.deptID)
    sorted.push(dept)
  }

  depts.forEach(visit)
  return sorted
}

export function mapRiskValidationErrors(parsingError) {
  if (!Array.isArray(parsingError)) return []
  return parsingError.map(err => ({
    sheet: err.Excel_SheetName || err.sheetName || '—',
    row: err.rowNo || '—',
    cell: '—',
    reason: err.error || err.message || 'Validation failed',
  }))
}

async function uploadRiskFile(file, type) {
  const form = new FormData()
  form.append('riskData', file, file.name || 'risk-import.csv')
  const { ok, data } = await postMultipart(`/api/saveBulkRiskDetails?type=${encodeURIComponent(type)}`, form)
  if (!ok && data?.result !== 'success' && data?.result !== 'Success') {
    throw new Error(data?.message || 'Risk upload failed')
  }
  return data
}

export async function validateBulkRiskImport(file) {
  return uploadRiskFile(file, 'validation')
}

export async function saveBulkRiskImport(file) {
  return uploadRiskFile(file, 'save')
}
