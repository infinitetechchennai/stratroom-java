const CATEGORY_COLORS = ['#c1473b', '#d98a2b', '#3b6fe0', '#2f9e5e', '#8b3fc9', '#1c8c8c', '#6b7280']
const TREATMENT_COLORS = {
  mitigate: '#2f9e5e',
  transfer: '#3b6fe0',
  accept: '#e0b73a',
  avoid: '#c1473b',
  reduce: '#8b3fc9',
  share: '#1c8c8c',
  unknown: '#9aa3b5'
}

export const HEAT_ROWS = ['Almost Certain', 'Likely', 'Possible', 'Unlikely', 'Rare']
export const HEAT_COLS = ['Insignificant', 'Minor', 'Moderate', 'Major', 'Catastrophic']
export const HEAT_SEVERITY = [
  [1, 1, 4, 3, 4],
  [0, 2, 3, 4, 4],
  [0, 1, 2, 3, 4],
  [0, 0, 1, 2, 3],
  [0, 0, 0, 1, 2]
]

function heatCellId(rowIndex, colIndex) {
  const col = String.fromCharCode(65 + colIndex)
  const row = 5 - rowIndex
  return `${col}${row}`
}

export function buildHeatMatrix(likelihoodCount = {}) {
  return HEAT_ROWS.map((_, ri) =>
    HEAT_COLS.map((__, ci) => likelihoodCount[heatCellId(ri, ci)] || 0)
  )
}

function normalizeKey(value) {
  return String(value || '').trim().toLowerCase()
}

export function mapRiskLevel(status) {
  const s = normalizeKey(status)
  if (s === 'very high' || s === 'critical') return 'Critical'
  if (s === 'high') return 'High'
  if (s === 'tolerable' || s === 'medium') return 'Medium'
  if (s === 'low' || s === 'very low') return 'Low'
  return 'Medium'
}

export function computeExposureLevel(statusCount = {}, total = 0) {
  if (!total) return 'LOW'
  const critical = (statusCount['Very High'] || 0) + (statusCount.Critical || 0)
  const high = statusCount.High || 0
  if (critical > 0) return 'HIGH'
  if (high / total >= 0.25) return 'MEDIUM'
  return 'LOW'
}

function colorForCategory(label, index) {
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length]
}

function colorForTreatment(label) {
  return TREATMENT_COLORS[normalizeKey(label)] || TREATMENT_COLORS.unknown
}

function planValue(plan) {
  return plan?.riskPlanValue || plan?.riskTreatmentValue || plan?.riskMonitoringValue || {}
}

function extractTreatment(risk) {
  const plans = risk?.riskPlanList?.length
    ? risk.riskPlanList
    : risk?.riskTreatmentList?.length
      ? risk.riskTreatmentList
      : []
  if (!plans.length) return 'Review'
  const action = planValue(plans[0]).action
  if (!action || action === 'Choose') return 'Review'
  return action.charAt(0).toUpperCase() + action.slice(1).toLowerCase()
}

function extractTrend(status) {
  const s = String(status || '').toUpperCase()
  if (s === 'HIGH' || s === 'VERY HIGH' || s === 'CRITICAL') return 'up'
  if (s === 'LOW' || s === 'VERY LOW') return 'down'
  return 'flat'
}

function formatReviewDate(risk, rv) {
  const raw = rv?.nextAssessment || risk?.updatedTime
  if (!raw) return ''
  const str = String(raw)
  return str.includes('T') ? str.split('T')[0] : str
}

export function mapRiskRegisterRow(risk) {
  const rv = risk?.riskValue || {}
  const status = rv.riskStatus || ''
  return {
    id: risk?.riskUniqueId || `R-${risk?.id}`,
    desc: rv.name || rv.desc || '',
    category: rv.riskcategory || 'Unknown',
    score: rv.score ?? '',
    level: mapRiskLevel(status),
    status: status || 'Unknown',
    treatment: extractTreatment(risk),
    trend: extractTrend(status),
    owner: rv.ownerName || '',
    review: formatReviewDate(risk, rv)
  }
}

export function buildTreatmentPlans(risks = []) {
  return risks
    .filter((risk) => {
      const plans = risk?.riskPlanList?.length
        ? risk.riskPlanList
        : risk?.riskTreatmentList?.length
          ? risk.riskTreatmentList
          : risk?.riskMonitoringList?.length
            ? risk.riskMonitoringList
            : []
      return plans.length > 0
    })
    .slice(0, 6)
    .map((risk) => {
      const rv = risk.riskValue || {}
      const plans = risk.riskPlanList?.length
        ? risk.riskPlanList
        : risk.riskTreatmentList?.length
          ? risk.riskTreatmentList
          : risk.riskMonitoringList
      const first = planValue(plans[0])
      let strategy = 'Mitigate'
      if (first.action && first.action !== 'Choose') {
        strategy = first.action.charAt(0).toUpperCase() + first.action.slice(1).toLowerCase()
      } else if (first.mitigation) {
        strategy = 'Monitor'
      }
      const progress = Number.parseInt(first.progress, 10)
      const items = plans.slice(0, 4).map((plan) => {
        const p = planValue(plan)
        const text = p.reducingimpact || p.reducingpossibility || p.name || p.action || 'Treatment action'
        const done = normalizeKey(p.status) === 'completed' || Number.parseInt(p.progress, 10) >= 100
        return { text, done }
      })
      return {
        id: risk.riskUniqueId || `R-${risk.id}`,
        title: rv.name || `Risk ${risk.id}`,
        level: mapRiskLevel(rv.riskStatus),
        strategy,
        owner: rv.ownerName || '',
        progress: Number.isNaN(progress) ? 0 : Math.min(100, Math.max(0, progress)),
        items
      }
    })
}

export function transformRiskDashboard(apiData) {
  const statusCount = apiData?.statusCount || {}
  const categoryCount = apiData?.categoryCount || {}
  const treatmentMap = apiData?.treatmentSrategyCount || {}
  const totalRisk = apiData?.totalRisk || 0
  const totalTreatment = apiData?.totalTreatment || 0
  const totalMonitoring = apiData?.totalMonitoring || 0
  const totalPlan = apiData?.totalPlan || 0
  const risks = Array.isArray(apiData?.riskDTO) ? apiData.riskDTO : []

  const tiles = [
    {
      label: 'Critical Risk',
      value: (statusCount['Very High'] || 0) + (statusCount.Critical || 0),
      note: 'require immediate action',
      color: 'red'
    },
    {
      label: 'High Risk',
      value: statusCount.High || 0,
      note: 'active monitoring needed',
      color: 'orange'
    },
    {
      label: 'Medium Risk',
      value: statusCount.Tolerable || statusCount.Medium || 0,
      note: 'scheduled review',
      color: 'amber'
    },
    {
      label: 'Low Risk',
      value: statusCount.Low || 0,
      note: 'routine monitoring',
      color: 'green'
    },
    {
      label: 'Very Low Risk',
      value: statusCount['Very Low'] || 0,
      note: 'routine monitoring',
      color: 'teal'
    }
  ]

  const statusBreakdown = [
    { label: 'Mitigated', value: totalPlan, total: totalRisk, color: '#2f9e5e' },
    { label: 'In Treatment', value: totalTreatment, total: totalRisk, color: '#3b6fe0' },
    { label: 'Monitoring', value: totalMonitoring, total: totalRisk, color: '#d98a2b' }
  ]

  const treatmentMix = Object.entries(treatmentMap)
    .filter(([label]) => label && label !== 'UNKNOWN')
    .map(([label, value]) => ({
      label: label.charAt(0).toUpperCase() + label.slice(1).toLowerCase(),
      value,
      total: totalRisk || value,
      color: colorForTreatment(label)
    }))
    .sort((a, b) => b.value - a.value)

  const riskByCategory = Object.entries(categoryCount)
    .filter(([label]) => label && label !== 'UNKNOWN')
    .map(([label, value], index) => ({
      label,
      value,
      color: colorForCategory(label, index)
    }))
    .sort((a, b) => b.value - a.value)

  const riskLevelDistribution = [
    { label: 'Critical', value: tiles[0].value, color: '#c1473b' },
    { label: 'High', value: tiles[1].value, color: '#d98a2b' },
    { label: 'Medium', value: tiles[2].value, color: '#e0b73a' },
    { label: 'Low', value: tiles[3].value + tiles[4].value, color: '#2f9e5e' }
  ]

  const categories = ['All', ...riskByCategory.map((c) => c.label)]

  return {
    summary: {
      totalRisks: totalRisk,
      exposureLevel: computeExposureLevel(statusCount, totalRisk),
      tiles
    },
    heatMatrix: buildHeatMatrix(apiData?.likelihoodCount || {}),
    statusBreakdown,
    treatmentMix,
    riskByCategory,
    riskLevelDistribution,
    riskRegister: risks.map(mapRiskRegisterRow),
    treatmentPlans: buildTreatmentPlans(risks),
    categories
  }
}
