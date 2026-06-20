import * as XLSX from 'xlsx'

// Column headers matching the legacy "Board of Directors Scorecard" template,
// in the exact order/spelling so an exported file can be edited and re-imported.
export const SCORECARD_HEADERS = [
  'Department ID', 'ScoreCardName', 'Scorecard Description',
  'Perspective ID', 'Perspective Name', 'Perspective Description', 'Perspective Weight', 'Perspective Type',
  'ObJective ID', 'Objective Name', 'Objective Description', 'Objective Weight',
  'KPI ID', 'KPI  NAME', 'KPI Description', 'KPI Weight', 'KPI contribution', 'Owner',
  'Measurement Frequency', 'KPI Formula', 'Actual Field', 'Target Field', 'Budget Field', 'Forecast Field',
  'Data Source', 'Status', 'Red', 'Amber', 'Green', 'DataType', 'Currency', 'KPI Performance', 'YTD', 'KPIType',
  'SubKPI ID', 'SubKPI  NAME', 'SubKPI Description', 'SubKPI Weight', 'SubKPI contribution',
  'SubMeasurement Frequency', 'SubKPI Formula', 'SubDataType', 'Sub Currency', 'SubKPI Performance', 'SubKPIType',
  'Start/End Date', 'Objective Performance', 'Perspective Performance', 'Scorecard Performance',
  'DeleteSubkpi', 'DeleteKPI', 'DeleteObj',
]

const blankRow = () => Object.fromEntries(SCORECARD_HEADERS.map((h) => [h, '']))
const safe = (v) => (v == null ? '' : v)

// scorecardData: { tab:[...], scorecardName, overallScore } from cardDetailsToTabs.
export function exportScorecardToExcel(scorecardData, scorecardName = 'Scorecard') {
  const rows = []
  const tabs = scorecardData?.tab || []

  tabs.forEach((p) => {
    const objectives = p.tabledata || []
    objectives.forEach((obj) => {
      const kpis = obj.children || []
      kpis.forEach((kpi) => {
        const r = blankRow()
        r['ScoreCardName'] = safe(scorecardName)
        r['Perspective ID'] = safe(p.id)
        r['Perspective Name'] = safe(p.title)
        r['Perspective Type'] = safe(p.perspectiveType)
        r['Perspective Performance'] = safe(p.totalScore)
        r['ObJective ID'] = safe(obj.id)
        r['Objective Name'] = safe(obj.name)
        r['Objective Performance'] = safe(obj.score)
        r['KPI ID'] = safe(kpi.id)
        r['KPI  NAME'] = safe(kpi.name)
        r['Measurement Frequency'] = safe(kpi.period)
        r['Actual Field'] = safe(kpi.actual)
        r['Target Field'] = safe(kpi.target)
        r['KPI Performance'] = safe(kpi.score)
        r['Status'] = safe(kpi.flag?.[0]?.status)
        r['Scorecard Performance'] = safe(scorecardData?.overallScore)
        rows.push(r)

        const subs = kpi.children || []
        subs.forEach((sub) => {
          const sr = blankRow()
          sr['ScoreCardName'] = safe(scorecardName)
          sr['Perspective Name'] = safe(p.title)
          sr['Objective Name'] = safe(obj.name)
          sr['KPI ID'] = safe(kpi.id)
          sr['SubKPI ID'] = safe(sub.id)
          sr['SubKPI  NAME'] = safe(sub.name)
          sr['SubMeasurement Frequency'] = safe(sub.period)
          sr['SubKPI Performance'] = safe(sub.score)
          sr['Actual Field'] = safe(sub.actual)
          sr['Target Field'] = safe(sub.target)
          rows.push(sr)
        })
      })
    })
  })

  const ws = XLSX.utils.json_to_sheet(rows, { header: SCORECARD_HEADERS })
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Scorecard')
  const fname = (scorecardName || 'Scorecard').replace(/[^\w\s-]/g, '').trim() || 'Scorecard'
  XLSX.writeFile(wb, `${fname}.xlsx`)
}

// Parse an uploaded scorecard Excel into [{ kpiId, actual, target }] for import.
// Only rows with a KPI ID and at least one of Actual/Target changed are returned.
export async function parseScorecardExcel(file) {
  const buf = await file.arrayBuffer()
  const wb = XLSX.read(buf, { type: 'array' })
  const ws = wb.Sheets[wb.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' })
  return rows
    .filter((r) => String(r['KPI ID'] || '').trim() !== '')
    .map((r) => ({
      kpiId: String(r['KPI ID']).trim(),
      actual: r['Actual Field'],
      target: r['Target Field'],
    }))
    .filter((r) => r.actual !== '' || r.target !== '')
}
