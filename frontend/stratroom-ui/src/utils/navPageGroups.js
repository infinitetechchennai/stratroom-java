/** Shared nav grouping — mirrors legacy left-navigation.jsp */

const norm = (v) => (v == null ? '' : String(v).trim())
const normLower = (v) => norm(v).toLowerCase()

const MEASURE_PAGE_TYPES = new Set([
  'standard_view',
  'scorecardview',
  'scorecard',
  'scorecard dashboard',
])

export function isMeasurePage(page) {
  if (!page) return false
  if (normLower(page.groupType) === 'measure') return true
  return MEASURE_PAGE_TYPES.has(normLower(page.pageType))
}

const isReportPage = (p) =>
  normLower(p.groupType) === 'report' ||
  ['Cockpit', 'Charts', 'My Performance', 'My Space'].includes(norm(p.pageType))

export const PAGE_TYPE_GROUPS = {
  Plan: (p) =>
    normLower(p.groupType) === 'plan' ||
    ['SWOT', 'PESTEL', 'Strategy Map', 'Strategy Formulation',
      'Project Formulation', 'Audit Management', 'AuditManagement'].includes(norm(p.pageType)),
  Measure: isMeasurePage,
  Execute: (p) =>
    normLower(p.groupType) === 'execute' ||
    ['Initiatives & Projects', 'Task', 'Budget', 'Approval Page'].includes(norm(p.pageType)),
  Govern: (p) =>
    normLower(p.groupType) === 'govern' ||
    ['Risk', 'Risk Formulation', 'Risk View', 'RiskEvent', 'Risk Radar',
      'Impact Assesment', 'Process Enabaler', 'Rpo', 'Compliance',
      'Audit Management'].includes(norm(p.pageType)),
  Meet: (p) =>
    normLower(p.groupType) === 'meet' || norm(p.pageType) === 'Meetings',
  Report: isReportPage,
  Reports: isReportPage,
}

export function pagesForNavModule(pages, moduleKey) {
  const pred = PAGE_TYPE_GROUPS[moduleKey]
  return (pages || []).filter((p) => pred?.(p) ?? false)
}

export function isScorecardPageType(pageType) {
  return MEASURE_PAGE_TYPES.has(normLower(pageType))
}
