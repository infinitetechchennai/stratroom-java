export function getDateRange() {
  return localStorage.getItem('customperiod') || ''
}

export function getProgressClass(status) {
  switch (status) {
    case 'RED':
      return { wrap: 'red', bar: 'bg-danger' }
    case 'GREEN':
      return { wrap: 'green', bar: 'bg-success' }
    default:
      return { wrap: 'yellow', bar: 'bg-warning' }
  }
}

export function formatDueDate(initiativeValue = {}) {
  const actualRange = initiativeValue.actualdaterange
  const dateRange = initiativeValue.daterange
  const raw = actualRange?.includes('-')
    ? actualRange.split('-')[1]
    : dateRange?.includes('-')
      ? dateRange.split('-')[1]
      : ''
  if (!raw) return ''
  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) return raw
  return parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function parsePercent(value) {
  if (value == null || value === '') return null
  const num = parseFloat(String(value).replace('%', ''))
  return Number.isNaN(num) ? null : num
}

export function getKpiTrendColor(actual, target) {
  const actualNum = parsePercent(actual)
  const targetNum = parsePercent(target)
  if (actualNum == null || targetNum == null || targetNum === 0) return 'black'
  const ratio = (actualNum / targetNum) * 100
  if (ratio <= 60) return 'red'
  if (ratio <= 90) return '#FFBF00'
  if (ratio <= 100) return 'green'
  return 'green'
}

export function getTrendIconClass(trend) {
  if (!trend) return 'fas fa-minus'
  if (trend.includes('fa-arrow-up')) return 'fas fa-arrow-trend-up text-success'
  if (trend.includes('fa-arrow-down')) return 'fas fa-arrow-trend-down text-danger'
  return 'fas fa-minus'
}

export function getRiskBadgeClass(category) {
  const map = {
    'Strategic Risk': 'bg-success',
    'Operational Risk': 'bg-success',
    'Technology Risk': 'bg-warning text-dark',
    'Reputational Risk': 'bg-warning text-dark',
    'Human Capital Risk': 'bg-danger',
    'Financial Risk': 'bg-warning text-dark',
    'Market Risk': 'bg-warning text-dark'
  }
  return map[category] || 'bg-warning text-dark'
}

export function getRiskDotClass(status) {
  const map = {
    Low: 'text-success',
    'Very Low': 'text-success',
    Medium: 'text-warning',
    High: 'text-danger',
    Critical: 'text-danger'
  }
  return map[status] || 'text-warning'
}

export function hasValidKpiTarget(target) {
  return target !== 0 &&
    target !== '0' &&
    target != null &&
    target !== undefined &&
    target !== '' &&
    target !== 'undefined'
}

export function extractKpis(scoreCardDetails) {
  const kpis = []
  scoreCardDetails?.scoreCardDTOS?.forEach((scoreCard) => {
    scoreCard.objectiveList?.forEach((objective) => {
      objective.kpiList?.forEach((kpi) => {
        const target = kpi?.kpiValue?.target
        if (!hasValidKpiTarget(target)) return
        kpis.push({
          id: kpi.id,
          name: kpi.kpiName || kpi?.kpiValue?.name || 'Untitled KPI',
          actual: kpi?.kpiValue?.actual ?? '',
          target: kpi?.kpiValue?.target ?? '',
          trend: kpi?.kpiValue?.trend,
          objectiveName: objective.objectivesName || ''
        })
      })
    })
  })
  return kpis
}

export function getDisplayName(user) {
  if (user?.firstName) {
    return `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
  }
  return user?.emailAddress || user?.name || 'User'
}

export function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}
