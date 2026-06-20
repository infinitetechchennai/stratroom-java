// Filter values match PageService.findAllByDept in stratroom-backend.
export const LANDING_PAGE_TYPE_OPTIONS = [
  { value: 'STRATEGYMAP', label: 'Strategy Map' },
  { value: 'INITIATIVEMAP', label: 'Initiative Map' },
  { value: 'RADAR', label: 'Risk Radar' },
  { value: 'SCORECARDDASHBOARD', label: 'Scorecard Dashboard' },
  { value: 'RISKDASHBOARD', label: 'Risk Dashboard' },
  { value: 'INITIATIVEDASHBOARD', label: 'Initiative Dashboard' },
  { value: 'COMPLIANCEDASHBOARD', label: 'Compliance Dashboard' },
  { value: 'AUDITDASHBOARD', label: 'Audit Dashboard' }
]

export const PINNED_PAGE_TYPES = {
  MEETINGS: 'Meetings',
  TASK: 'Task',
  INITIATIVES: 'Initiatives & Projects',
  RISK: 'Risk',
  STANDARD_VIEW: 'Standard_View'
}
