import { useState, useEffect, useCallback } from 'react'
import { getOrgId, getCustomPerformanceDetails, saveCustomPerformance } from '../../../api/controlPanelApi'
import { DAYS_OF_MONTH } from './constants'
import { SettingsCard, Field, Select, Toggle, Checkbox, SECTION_TITLE, DIVIDER, parseJsonBlob, boolVal } from './shared'

export function ScorecardSettingsTab({ canEdit }) {
  const orgId = getOrgId()
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const load = useCallback(async () => {
    if (!orgId) { setLoading(false); return }
    setLoading(true)
    try {
      const resp = await getCustomPerformanceDetails()
      const data = parseJsonBlob(resp)
      setForm({
        actual: boolVal(data.scorecardactual, true),
        target: boolVal(data.scorecardtarget, true),
        strech: boolVal(data.scorecardstrech),
        stable: boolVal(data.scorecardstable),
        baseline: boolVal(data.scorecardbaseline),
        index: boolVal(data.scorecardindex, true),
        trend: boolVal(data.scorecardtrend, true),
        risk: boolVal(data.scorecardrisk, true),
        shrink: boolVal(data.scorecardshrink),
        ytd: boolVal(data.yearToDate),
        aggregation: boolVal(data.aggregation),
        status: boolVal(data.status, true),
        isIndex: boolVal(data.isIndex, true),
        customPerformance: boolVal(data.customPerformance),
        type: data.type || '',
        thresholdType: data.aggregationType || 'Five Status',
        t1: data.threshold1 || '40',
        t2: data.threshold2 || '80',
        t3: data.threshold3 || '90',
        t4: data.threshold4 || '60',
        t5: data.threshold5 || '75',
        tblActual: boolVal(data.datatableactual, true),
        tblTarget: boolVal(data.datatabletarget, true),
        tblGap: boolVal(data.datatablegap, true),
        tblBaseline: boolVal(data.datatablebaseline),
        tblYtd: boolVal(data.datatableytd, true),
        tblAnnualTarget: boolVal(data.datatableannualtarget),
        ddActual: boolVal(data.drilltableactual, true),
        ddTarget: boolVal(data.drilltabletarget, true),
        ddGap: boolVal(data.drilltablegap, true),
        ddBaseline: boolVal(data.drilltablebaseline),
        subMeasures: boolVal(data.subMeasures, true),
        openFormOn: data.openformon || '1',
        closeFormOn: data.closeformon || '1',
      })
    } catch {
      setMessage({ ok: false, text: 'Could not load settings.' })
      setForm({})
    } finally {
      setLoading(false)
    }
  }, [orgId])

  useEffect(() => { load() }, [load])

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))
  const toggle = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))
  const check = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.checked }))

  const save = async () => {
    if (!canEdit) return
    setSaving(true)
    setMessage(null)
    const dto = {
      orgId,
      generalSettingValue: {
        audittrailtype: 'customPerformance',
        scorecardactual: String(form.actual),
        scorecardtarget: String(form.target),
        scorecardstrech: String(form.strech),
        scorecardstable: String(form.stable),
        scorecardbaseline: String(form.baseline),
        scorecardindex: String(form.index),
        scorecardtrend: String(form.trend),
        scorecardrisk: String(form.risk),
        scorecardshrink: String(form.shrink),
        yearToDate: String(form.ytd),
        aggregation: String(form.aggregation),
        status: String(form.status),
        isIndex: String(form.isIndex),
        customPerformance: String(form.customPerformance),
        type: form.type,
        aggregationType: form.thresholdType,
        threshold1: form.t1, threshold2: form.t2, threshold3: form.t3, threshold4: form.t4, threshold5: form.t5,
        datatableactual: String(form.tblActual),
        datatabletarget: String(form.tblTarget),
        datatablegap: String(form.tblGap),
        datatablebaseline: String(form.tblBaseline),
        datatableytd: String(form.tblYtd),
        datatableannualtarget: String(form.tblAnnualTarget),
        drilltableactual: String(form.ddActual),
        drilltabletarget: String(form.ddTarget),
        drilltablegap: String(form.ddGap),
        drilltablebaseline: String(form.ddBaseline),
        subMeasures: String(form.subMeasures),
        openformon: form.openFormOn,
        closeformon: form.closeFormOn,
      },
    }
    try {
      await saveCustomPerformance(dto)
      setMessage({ ok: true, text: 'Saved successfully.' })
    } catch {
      setMessage({ ok: false, text: 'Save failed.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading || !form) {
    return <SettingsCard title="Scorecard"><p style={{ color: '#94a3b8', fontSize: 13 }}>Loading…</p></SettingsCard>
  }

  const dis = !canEdit

  return (
    <SettingsCard title="Scorecard" onSave={canEdit ? save : null} saving={saving} message={message} readOnly={!canEdit}>
      <div style={SECTION_TITLE}>Scorecard Fields</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {[
          ['actual', 'Actual'], ['target', 'Target'], ['strech', 'Stretch'], ['stable', 'Stable'],
          ['baseline', 'Baseline'], ['index', 'Index'], ['trend', 'Trend'], ['risk', 'Risk'], ['shrink', 'Shrink'],
        ].map(([k, label]) => (
          <Checkbox key={k} label={label} checked={form[k]} onChange={check(k)} disabled={dis} />
        ))}
      </div>
      <Toggle label="Year to Date (YTD)" checked={form.ytd} onChange={toggle('ytd')} disabled={dis} />
      <Toggle label="Aggregation" checked={form.aggregation} onChange={toggle('aggregation')} disabled={dis} />
      <Toggle label="Status" checked={form.status} onChange={toggle('status')} disabled={dis} />
      <Toggle label="Index scoring" checked={form.isIndex} onChange={toggle('isIndex')} disabled={dis} />
      <Toggle label="Custom Performance" checked={form.customPerformance} onChange={toggle('customPerformance')} disabled={dis} />
      {form.customPerformance && (
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16, marginTop: 8 }}>
          <Field label="Custom Threshold">
            <Select value={form.thresholdType} onChange={set('thresholdType')} options={['Five Status', 'Three Status']} disabled={dis} />
          </Field>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12 }}>
            {['t1', 't2', 't3', 't4', 't5'].map((k, i) => (
              <input key={k} type="text" disabled={dis} value={form[k]} onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                style={{ width: 56, padding: '6px 8px', border: '1px solid #d9dde7', borderRadius: 4, textAlign: 'center' }} />
            ))}
          </div>
        </div>
      )}
      <div style={DIVIDER} />
      <div style={{ fontSize: 15, fontWeight: 700, color: '#0b1437', marginBottom: 16 }}>KPI View Settings</div>
      <div style={SECTION_TITLE}>Data table fields</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
        {[
          ['tblActual', 'Actual'], ['tblTarget', 'Target'], ['tblGap', 'Gap'],
          ['tblBaseline', 'Baseline'], ['tblYtd', 'YTD'], ['tblAnnualTarget', 'Annual Target'],
        ].map(([k, label]) => (
          <Checkbox key={k} label={label} checked={form[k]} onChange={check(k)} disabled={dis} />
        ))}
      </div>
      <div style={SECTION_TITLE}>Drilldown fields</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}>
        {[
          ['ddActual', 'Actual'], ['ddTarget', 'Target'], ['ddGap', 'Gap'], ['ddBaseline', 'Baseline'],
        ].map(([k, label]) => (
          <Checkbox key={k} label={label} checked={form[k]} onChange={check(k)} disabled={dis} />
        ))}
      </div>
      <Toggle label="Are sub-measures required?" checked={form.subMeasures} onChange={toggle('subMeasures')} disabled={dis} />
      <div style={DIVIDER} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Field label="Open the form on (day of month)">
          <Select value={form.openFormOn} onChange={set('openFormOn')} options={DAYS_OF_MONTH} disabled={dis} />
        </Field>
        <Field label="Close the form on (day of month)">
          <Select value={form.closeFormOn} onChange={set('closeFormOn')} options={DAYS_OF_MONTH} disabled={dis} />
        </Field>
      </div>
    </SettingsCard>
  )
}

const RISK_FIELDS = [
  ['riskinherentscore', 'Inherent score'],
  ['riskresidualscore', 'Residual score'],
  ['riskrelatedparties', 'Related parties'],
  ['riskpos', 'POS'],
  ['riskiso', 'ISO'],
  ['riskinformationasset', 'Information asset'],
  ['riskpersonincharge', 'Person in charge'],
  ['cause_input', 'Cause (input)'],
  ['cousecategory', 'Cause category'],
  ['Consequence_input', 'Consequence (input)'],
  ['possibleeve', 'Possible event'],
  ['ImpactDescription', 'Impact description'],
]

export function RiskSettingsTab({ canEdit }) {
  const orgId = getOrgId()
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const load = useCallback(async () => {
    if (!orgId) { setLoading(false); return }
    setLoading(true)
    try {
      const resp = await getRiskSettingsDetails()
      const data = parseJsonBlob(resp)
      const initial = {}
      RISK_FIELDS.forEach(([k]) => { initial[k] = boolVal(data[k]) })
      setForm(initial)
    } catch {
      setForm({})
      setMessage({ ok: false, text: 'Could not load risk settings.' })
    } finally {
      setLoading(false)
    }
  }, [orgId])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!canEdit) return
    setSaving(true)
    setMessage(null)
    const risksetting = { audittrailtype: 'Risk Field Modified' }
    RISK_FIELDS.forEach(([k]) => { risksetting[k] = String(form[k]) })
    try {
      await saveRiskSettings({ orgId, risksetting })
      setMessage({ ok: true, text: 'Risk settings saved.' })
    } catch {
      setMessage({ ok: false, text: 'Save failed.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading || !form) {
    return <SettingsCard title="Risk"><p style={{ color: '#94a3b8', fontSize: 13 }}>Loading…</p></SettingsCard>
  }

  return (
    <SettingsCard title="Risk" onSave={canEdit ? save : null} saving={saving} message={message} readOnly={!canEdit}>
      <p style={{ fontSize: 13, color: '#64748b', marginTop: 0 }}>Toggle visibility of risk module fields (matches legacy Risk settings tab).</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {RISK_FIELDS.map(([k, label]) => (
          <Checkbox
            key={k}
            label={label}
            checked={!!form[k]}
            disabled={!canEdit}
            onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.checked }))}
          />
        ))}
      </div>
    </SettingsCard>
  )
}
