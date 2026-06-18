import { getKpiStoryCard } from '../api/kpiApi'
import { generateScorecardKpiPDF } from './pdfGenerator'

// Builds the per-KPI report from the V2 story-card endpoint and downloads the PDF
// (cover + KPI details + Data Table + Success Criteria), matching the KPI Report format.

function periodLabel() {
  const y = new Date().getFullYear()
  return (localStorage.getItem('customperiod') || `01/01/${y}-12/31/${y}`).split('-').join(' - ')
}

function userName() {
  try {
    const p = JSON.parse(localStorage.getItem('profile') || '{}')
    return p.firstName || p.name || p.displayName || p.userName || ''
  } catch {
    return ''
  }
}

const isPct = (dt) => String(dt || '').toUpperCase() === 'PERCENTAGE'

function fmt(v, dt) {
  if (v == null || v === '') return ''
  const n = Number(v)
  if (!Number.isFinite(n)) return String(v)
  return isPct(dt) ? `${n}%` : String(n)
}

export async function downloadKpiReport(kpiId) {
  if (!kpiId) { alert('This row has no linked KPI id.'); return }
  let data
  try {
    data = await getKpiStoryCard(kpiId)
  } catch (err) {
    alert('Could not load KPI data: ' + (err?.message || err))
    return
  }
  const kpi = data?.kpi
  if (!kpi) { alert('KPI not found.'); return }

  const v = kpi.kpiValue || {}
  const dt = v.dataType
  const series = Array.isArray(data.series) ? data.series : []

  const reported = series.filter((s) => s.actual != null && s.actual !== '')
  const last = reported[reported.length - 1]
  const prev = reported[reported.length - 2]
  const currentActual = last ? fmt(last.actual, dt) : ''
  let trend = ''
  if (last && prev) {
    const a = Number(last.actual), b = Number(prev.actual)
    trend = a > b ? 'up' : a < b ? 'down' : 'stable'
  }

  const reportData = [{
    pageTitle: 'KPI',                 // cover/header/footer title → "KPI REPORT"
    title: kpi.kpiName || 'KPI',      // cover subtitle (wraps) + used for the file name
    period: periodLabel(),
    userName: userName(),
    kpiDetails: {
      kpiName: kpi.kpiName || '',
      alignedPerspective: v.alignedPerspective || '',
      alignmentObjectives: v.alignmentObjectives || '',
      owner: v.owner || '',
      currentActual,
      target: v.target || '',
      trend,
    },
    configuration: {
      reportingFrequency: v.kpi_measurement || '',
      measurementFrequency: v.kpi_measurement || '',
      kpiType: v.dataType || '',
      polarity: v.polarity || '',
      performance: v.performance || '',
      contribution: v.contribution || '',
      weightPercent: v.weight || '',
      subWeight: '',
    },
    dataTable: series.map((s) => ({
      period: s.period,
      actual: fmt(s.actual, dt),
      target: fmt(s.target, dt),
      gap: fmt(s.gap, dt),
      ytd: s.ytd != null ? String(s.ytd) : '',
    })),
    successCriteria: {
      description: v.description || 'N/A',
      risks: 'N/A',
      supportNeeded: '',
      remarks: '',
    },
    strategicInitiatives: [],
  }]

  await generateScorecardKpiPDF(reportData)
}
