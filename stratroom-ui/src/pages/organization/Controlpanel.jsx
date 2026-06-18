import { useState, useEffect, useCallback } from 'react'
import {
  Settings, Palette, KeyRound, Bell, ShieldCheck, CalendarClock,
  MonitorSmartphone, DatabaseBackup, BarChart3, Target, AlertTriangle, Workflow,
} from 'lucide-react'
import {
  getOrgId, getGeneralSettings, createGeneralSetting, updateGeneralSetting,
  getCustomPerformanceDetails, saveCustomPerformance
} from '../../api/controlPanelApi'

const NAVY = '#2c2f6b'

const TABS = [
  { key: 'general', label: 'General', Icon: Settings },
  { key: 'themes', label: 'Themes', Icon: Palette },
  { key: 'license', label: 'License', Icon: KeyRound },
  { key: 'notification', label: 'Notification', Icon: Bell },
  { key: 'security', label: 'Security', Icon: ShieldCheck },
  { key: 'scheduler', label: 'Scheduler', Icon: CalendarClock },
  { key: 'device', label: 'Device', Icon: MonitorSmartphone },
  { key: 'backup', label: 'Backup & Restore', Icon: DatabaseBackup },
  { key: 'scorecard', label: 'Scorecard', Icon: BarChart3 },
  { key: 'okr', label: 'OKR', Icon: Target },
  { key: 'risk', label: 'Risk', Icon: AlertTriangle },
  { key: 'workflow', label: 'Workflow Setting', Icon: Workflow },
]

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const CURRENCY_VIEWS = ['Actuals', 'Thousands (K)', 'Milions (M)', 'Billions (B)']
const CURRENCIES = ['US dollars', 'Euro', 'Indian Rupee', 'UAE Dirham', 'Saudi Riyal', 'British Pound']
const DATA_PERIODS = ['Month', 'Quarter', 'Half Year', 'Year']
const IMPLEMENTATIONS = ['BSC', 'OKR', 'KPI']
const IMPLEMENTATION_TYPES = ['Department', 'Employee', 'Organization']
const LANGUAGES = ['English', 'Arabic', 'Amharic']
const TIMEZONES = [
  '(GMT-12:00) International Date Line West',
  '(GMT-08:00) Pacific Time (US & Canada)',
  '(GMT-05:00) Eastern Time (US & Canada)',
  '(GMT+00:00) UTC',
  '(GMT+01:00) Central European Time',
  '(GMT+03:00) Arabia Standard Time',
  '(GMT+03:00) East Africa Time',
  '(GMT+05:30) India Standard Time',
  '(GMT+08:00) China Standard Time',
]

export default function Controlpanel() {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <div style={{ padding: '18px 24px 40px', background: '#f4f5f9', minHeight: '100vh' }}>
      <h4 style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 700, color: '#0b1437', marginBottom: 16 }}>
        <Settings size={20} color={NAVY} /> CONTROL PANEL
      </h4>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 18, alignItems: 'start' }}>
        {/* Left tab grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {TABS.map(({ key, label, Icon }) => {
            const active = activeTab === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '22px 8px', borderRadius: 10, cursor: 'pointer', minHeight: 96,
                  border: active ? `1px solid ${NAVY}` : '1px solid #e2e8f0',
                  background: active ? NAVY : '#eef0f4',
                  color: active ? '#fff' : '#475569',
                }}
              >
                <Icon size={22} />
                <span style={{ fontSize: 13, fontWeight: 600 }}>{label}</span>
              </button>
            )
          })}
        </div>

        {/* Right content */}
        <div>
          {activeTab === 'general'
            ? <GeneralSettings />
            : activeTab === 'scorecard'
            ? <ScorecardSettingsUI />
            : <PlaceholderTab title={TABS.find(t => t.key === activeTab)?.label} />}
        </div>
      </div>
    </div>
  )
}

// ── Card scaffold (navy header + body + footer) ───────────────────────────────
function SettingsCard({ title, children, onSave, saving, message }) {
  return (
    <div style={{ background: '#fff', borderRadius: 10, border: '1px solid #e7e9f0', overflow: 'hidden' }}>
      <div style={{ background: NAVY, color: '#fff', padding: '12px 18px', fontSize: 15, fontWeight: 600 }}>{title}</div>
      <div style={{ padding: 22 }}>{children}</div>
      {onSave && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12, padding: '0 22px 18px' }}>
          {message && <span style={{ fontSize: 12.5, color: message.ok ? '#16a34a' : '#dc2626' }}>{message.text}</span>}
          <button type="button" onClick={onSave} disabled={saving} style={{
            background: NAVY, color: '#fff', border: 'none', borderRadius: 6,
            padding: '9px 26px', fontSize: 13.5, fontWeight: 600, cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.6 : 1,
          }}>{saving ? 'Saving…' : 'Save'}</button>
        </div>
      )}
    </div>
  )
}

const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6 }
const fieldStyle = { width: '100%', padding: '9px 12px', border: '1px solid #d9dde7', borderRadius: 6, fontSize: 13.5, color: '#0b1437', background: '#fff', outline: 'none' }
const fieldWrap = { marginBottom: 18 }

function Field({ label, children }) {
  return (
    <div style={fieldWrap}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

function Select({ value, onChange, options, disabled }) {
  return (
    <select value={value ?? ''} onChange={(e) => onChange(e.target.value)} disabled={disabled} style={fieldStyle}>
      <option value="" disabled>Select…</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

// ── General Settings (fully wired to /generalSetting) ─────────────────────────
const EMPTY = {
  id: null, siteName: '', adminEmailId: '', currencyView: '', startMonth: '', timeZone: '',
  implementationType: '', siteLanguage: '', currencyType: '', defaultDatePeriod: '', endMonth: '', implementation: '',
}

function GeneralSettings() {
  const orgId = getOrgId()
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))
  const langs = (form.siteLanguage || '').split(',').map(s => s.trim()).filter(Boolean)
  const toggleLang = (lang) => {
    const next = langs.includes(lang) ? langs.filter(l => l !== lang) : [...langs, lang]
    setForm((f) => ({ ...f, siteLanguage: next.join(',') }))
  }

  const load = useCallback(async () => {
    if (!orgId) { setLoading(false); return }
    setLoading(true)
    try {
      const list = await getGeneralSettings(orgId)
      const dto = Array.isArray(list) ? list[0] : list
      if (dto) {
        setForm({
          id: dto.id ?? null,
          siteName: dto.siteName ?? '',
          adminEmailId: dto.adminEmailId ?? '',
          currencyView: dto.currencyView ?? '',
          startMonth: dto.startMonth ?? '',
          timeZone: dto.timeZone ?? '',
          implementationType: dto.implementationType ?? '',
          siteLanguage: dto.siteLanguage ?? '',
          currencyType: dto.currencyType ?? '',
          defaultDatePeriod: dto.defaultDatePeriod ?? '',
          endMonth: dto.endMonth ?? '',
          implementation: dto.implementation ?? '',
        })
      }
    } catch {
      setMessage({ ok: false, text: 'Could not load settings.' })
    } finally {
      setLoading(false)
    }
  }, [orgId])

  useEffect(() => { load() }, [load])

  const save = async () => {
    setSaving(true)
    setMessage(null)
    const dto = { ...form, orgId }
    try {
      if (form.id) await updateGeneralSetting(dto)
      else await createGeneralSetting(dto)
      setMessage({ ok: true, text: 'Saved successfully.' })
      load()
    } catch {
      setMessage({ ok: false, text: 'Save failed.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <SettingsCard title="General Settings"><p style={{ color: '#94a3b8', fontSize: 13 }}>Loading…</p></SettingsCard>
  }

  return (
    <SettingsCard title="General Settings" onSave={save} saving={saving} message={message}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 40 }}>
        {/* Left column */}
        <div>
          <Field label="Site Name">
            <input style={fieldStyle} value={form.siteName} onChange={(e) => set('siteName')(e.target.value)} />
          </Field>
          <Field label="Admin EMail ID">
            <input style={{ ...fieldStyle, background: '#eef0f4' }} value={form.adminEmailId} readOnly />
          </Field>
          <Field label="Currency View">
            <Select value={form.currencyView} onChange={set('currencyView')} options={CURRENCY_VIEWS} />
          </Field>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0b1437', margin: '4px 0 10px' }}>Financial Cycle</div>
          <Field label="Start Month">
            <Select value={form.startMonth} onChange={set('startMonth')} options={MONTHS} />
          </Field>
          <Field label="Time Zone">
            <Select value={form.timeZone} onChange={set('timeZone')} options={TIMEZONES} />
          </Field>
          <Field label="Implementation Type">
            <Select value={form.implementationType} onChange={set('implementationType')} options={IMPLEMENTATION_TYPES} />
          </Field>
        </div>

        {/* Right column */}
        <div>
          <Field label="Site Language">
            <div style={{ display: 'flex', gap: 24, paddingTop: 6 }}>
              {LANGUAGES.map((lang) => (
                <label key={lang} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: '#0b1437', cursor: 'pointer' }}>
                  <input type="checkbox" checked={langs.includes(lang)} onChange={() => toggleLang(lang)} />
                  {lang}
                </label>
              ))}
            </div>
          </Field>
          <Field label="Currency">
            <Select value={form.currencyType} onChange={set('currencyType')} options={CURRENCIES} />
          </Field>
          <Field label="Default Data period">
            <Select value={form.defaultDatePeriod} onChange={set('defaultDatePeriod')} options={DATA_PERIODS} />
          </Field>
          <div style={{ height: 27 }} />
          <Field label="End Month">
            <Select value={form.endMonth} onChange={set('endMonth')} options={MONTHS} />
          </Field>
          <Field label="Implementation">
            <Select value={form.implementation} onChange={set('implementation')} options={IMPLEMENTATIONS} />
          </Field>
        </div>
      </div>
      {!orgId && <p style={{ color: '#dc2626', fontSize: 12.5, marginTop: 8 }}>No organization id found on your profile — cannot load/save settings.</p>}
    </SettingsCard>
  )
}

function PlaceholderTab({ title }) {
  return (
    <SettingsCard title={title}>
      <p style={{ color: '#64748b', fontSize: 13.5, margin: 0 }}>
        The <strong>{title}</strong> settings form will be wired here next.
      </p>
    </SettingsCard>
  )
}

// ── Shared UI Helpers for Scorecard ───────────────────────────────────────────
function Toggle({ checked, onChange, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 16 }}>
      <div style={{
        position: 'relative', width: 44, height: 24, borderRadius: 12,
        background: checked ? NAVY : '#cbd5e1', transition: 'background 0.2s'
      }}>
        <div style={{
          position: 'absolute', top: 2, left: checked ? 22 : 2, width: 20, height: 20,
          background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
        }} />
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, color: '#0b1437' }}>{label}</span>
    </label>
  )
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: '#475569', cursor: 'pointer' }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ width: 16, height: 16, accentColor: NAVY }} />
      {label}
    </label>
  )
}

const SECTION_TITLE = { fontSize: 13, fontWeight: 700, color: '#0b1437', marginBottom: 12 }
const DIVIDER = { height: 1, background: '#e2e8f0', margin: '24px 0' }

// ── Scorecard Settings UI (UI Only Mockup) ──────────────────────────────────
function ScorecardSettingsUI() {
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
      // Backend returns stringified JSON in the response map or directly
      let data = {}
      if (resp && typeof resp === 'string') {
        try { data = JSON.parse(resp) } catch (e) {}
      } else if (resp && resp.customValue) {
        try { data = JSON.parse(resp.customValue) } catch (e) {}
      } else if (resp) {
        data = resp
      }

      setForm({
        // Missing backend expectations
        performance: String(data?.performance) === 'true',
        budget: String(data?.scorecardbudget) === 'true',
        forecast: String(data?.scorecardforecast) === 'true',
        score: String(data?.scorecardscore) === 'true',
        // Scorecard Fields
        actual: String(data?.scorecardactual) === 'true',
        target: String(data?.scorecardtarget) === 'true',
        strech: String(data?.scorecardstrech) === 'true',
        stable: String(data?.scorecardstable) === 'true',
        baseline: String(data?.scorecardbaseline) === 'true',
        index: String(data?.scorecardindex) !== 'false', // default true in mock
        trend: String(data?.scorecardtrend) !== 'false',
        risk: String(data?.scorecardrisk) !== 'false',
        shrink: String(data?.scorecardshrink) === 'true',
        // Toggles
        ytd: String(data?.yearToDate) === 'true',
        aggregation: String(data?.aggregation) === 'true',
        status: String(data?.status) !== 'false',
        isIndex: String(data?.isIndex) !== 'false',
        customPerformance: String(data?.customPerformance) === 'true',
        // Type
        type: data?.type || '',
        // Custom Threshold
        thresholdType: data?.aggregationType || 'Five Status',
        t1: data?.threshold1 || '40',
        t2: data?.threshold2 || '80',
        t3: data?.threshold3 || '90',
        t4: data?.threshold4 || '60',
        t5: data?.threshold5 || '75',
        // KPI View Settings - Tables
        tblActual: String(data?.datatableactual) !== 'false',
        tblTarget: String(data?.datatabletarget) !== 'false',
        tblGap: String(data?.datatablegap) !== 'false',
        tblBaseline: String(data?.datatablebaseline) === 'true',
        tblYtd: String(data?.datatableytd) !== 'false',
        tblAnnualTarget: String(data?.datatableannualtarget) === 'true',
        // KPI View Settings - Drilldown
        ddActual: String(data?.drilltableactual) !== 'false',
        ddTarget: String(data?.drilltabletarget) !== 'false',
        ddGap: String(data?.drilltablegap) !== 'false',
        ddBaseline: String(data?.drilltablebaseline) === 'true',
        // Sub measures
        subMeasures: String(data?.subMeasures) !== 'false',
        // Schedule
        openFormOn: data?.openformon || '1',
        closeFormOn: data?.closeformon || '1'
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
  const toggle = (k) => () => setForm((f) => ({ ...f, [k]: !f[k] }))
  const check = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.checked }))

  const save = async () => {
    setSaving(true)
    setMessage(null)
    const dto = {
      orgId,
      generalSettingValue: {
        audittrailtype: 'customPerformance',
        performance: String(form.performance),
        scorecardbudget: String(form.budget),
        scorecardforecast: String(form.forecast),
        scorecardscore: String(form.score),
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
        threshold1: form.t1,
        threshold2: form.t2,
        threshold3: form.t3,
        threshold4: form.t4,
        threshold5: form.t5,
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
        closeformon: form.closeFormOn
      }
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

  return (
    <SettingsCard title="Scorecard" onSave={save} saving={saving} message={message}>
      
      {/* Scorecard Fields */}
      <div style={SECTION_TITLE}>Scorecard Fields</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <Checkbox label="Actual" checked={form.actual} onChange={check('actual')} />
        <Checkbox label="Target" checked={form.target} onChange={check('target')} />
        <Checkbox label="Strech" checked={form.strech} onChange={check('strech')} />
        <Checkbox label="Stable" checked={form.stable} onChange={check('stable')} />
        <Checkbox label="Baseline" checked={form.baseline} onChange={check('baseline')} />
        <Checkbox label="Index" checked={form.index} onChange={check('index')} />
        <Checkbox label="Trend" checked={form.trend} onChange={check('trend')} />
        <Checkbox label="Risk" checked={form.risk} onChange={check('risk')} />
        <Checkbox label="Shrink" checked={form.shrink} onChange={check('shrink')} />
      </div>

      <Toggle label="Year to Date (YTD)" checked={form.ytd} onChange={toggle('ytd')} />
      <Toggle label="Aggregation" checked={form.aggregation} onChange={toggle('aggregation')} />

      <div style={{ maxWidth: 400, marginTop: 8 }}>
        <Field label="Type">
          <Select value={form.type} onChange={set('type')} options={['Type A', 'Type B', 'Type C']} />
        </Field>
      </div>

      <Toggle label="Status" checked={form.status} onChange={toggle('status')} />
      <Toggle label="Index" checked={form.isIndex} onChange={toggle('isIndex')} />
      <Toggle label="Custom Performance" checked={form.customPerformance} onChange={toggle('customPerformance')} />

      {form.customPerformance && (
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16, marginTop: -4 }}>
          <div style={{ maxWidth: 400 }}>
            <Field label="Custom Threshold">
              <Select value={form.thresholdType} onChange={set('thresholdType')} options={['Five Status', 'Three Status']} />
            </Field>
          </div>
          
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 16 }}>
            {[{ k: 't1', c: '#dc2626' }, { k: 't2', c: '#ef4444' }, { k: 't3', c: '#fbbf24' }, { k: 't4', c: '#4ade80' }, { k: 't5', c: '#16a34a' }].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input 
                  type="text" 
                  value={form[item.k]} 
                  onChange={(e) => setForm(f => ({ ...f, [item.k]: e.target.value }))}
                  style={{ width: 60, padding: '6px 12px', border: '1px solid #d9dde7', borderRadius: 4, textAlign: 'center', fontSize: 13 }}
                />
                <div style={{ width: 24, height: 24, borderRadius: 4, background: item.c }} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={DIVIDER} />

      {/* KPI View Settings */}
      <div style={{ fontSize: 15, fontWeight: 700, color: '#0b1437', marginBottom: 16 }}>Kpi View Settings</div>
      
      <div style={SECTION_TITLE}>Data tables Fields</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <Checkbox label="Actual" checked={form.tblActual} onChange={check('tblActual')} />
        <Checkbox label="Target" checked={form.tblTarget} onChange={check('tblTarget')} />
        <Checkbox label="Gap" checked={form.tblGap} onChange={check('tblGap')} />
        <Checkbox label="Baseline" checked={form.tblBaseline} onChange={check('tblBaseline')} />
        <Checkbox label="YTD" checked={form.tblYtd} onChange={check('tblYtd')} />
        <Checkbox label="Annual Target" checked={form.tblAnnualTarget} onChange={check('tblAnnualTarget')} />
      </div>

      <div style={SECTION_TITLE}>Data Drilldown Fields</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <Checkbox label="Actual" checked={form.ddActual} onChange={check('ddActual')} />
        <Checkbox label="Target" checked={form.ddTarget} onChange={check('ddTarget')} />
        <Checkbox label="Gap" checked={form.ddGap} onChange={check('ddGap')} />
        <Checkbox label="Baseline" checked={form.ddBaseline} onChange={check('ddBaseline')} />
      </div>

      <Toggle label="Are Sub Measures required?" checked={form.subMeasures} onChange={toggle('subMeasures')} />

      <div style={DIVIDER} />

      {/* KPI Form Schedule settings */}
      <div style={{ fontSize: 15, fontWeight: 700, color: '#0b1437', marginBottom: 16 }}>Kpi Form Schedule settings</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Field label="Open the form on">
          <Select value={form.openFormOn} onChange={set('openFormOn')} options={['1', '2', '3', '4', '5']} />
        </Field>
        <Field label="Close the form on">
          <Select value={form.closeFormOn} onChange={set('closeFormOn')} options={['1', '2', '3', '4', '5']} />
        </Field>
      </div>

    </SettingsCard>
  )
}
