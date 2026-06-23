import { useState, useEffect, useCallback } from 'react'
import {
  getOrgId, getGeneralSettings, createGeneralSetting, updateGeneralSetting, getCurrencyList,
} from '../../../api/controlPanelApi'
import {
  MONTHS, CURRENCY_VIEWS, DATA_PERIODS, IMPLEMENTATIONS, IMPLEMENTATION_TYPES, LANGUAGES, TIMEZONES,
} from './constants'
import { SettingsCard, Field, Select, fieldStyle } from './shared'

const EMPTY = {
  id: null, siteName: '', adminEmailId: '', currencyView: '', startMonth: '', timeZone: '',
  implementationType: '', siteLanguage: '', currencyType: '', defaultDatePeriod: '', endMonth: '', implementation: '',
}

export function GeneralSettingsTab({ canEdit }) {
  const orgId = getOrgId()
  const [form, setForm] = useState(EMPTY)
  const [currencies, setCurrencies] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [implLocked, setImplLocked] = useState(false)

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }))
  const langs = (form.siteLanguage || '').split(',').map((s) => s.trim()).filter(Boolean)
  const toggleLang = (lang) => {
    const next = langs.includes(lang) ? langs.filter((l) => l !== lang) : [...langs, lang]
    setForm((f) => ({ ...f, siteLanguage: next.join(',') }))
  }

  const load = useCallback(async () => {
    if (!orgId) { setLoading(false); return }
    setLoading(true)
    try {
      const [list, currencyRows] = await Promise.all([
        getGeneralSettings(orgId),
        getCurrencyList().catch(() => []),
      ])
      const names = Array.isArray(currencyRows)
        ? currencyRows.map((c) => c.currencyName || c.name || c.currency).filter(Boolean)
        : []
      if (names.length) setCurrencies(names)

      const dto = Array.isArray(list) ? list[0] : list
      if (dto) {
        setImplLocked(!!dto.implementationType)
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
    if (!canEdit) return
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

  const currencyOptions = currencies.length ? currencies : ['US dollars', 'Euro', 'Indian Rupee', 'UAE Dirham', 'Saudi Riyal', 'British Pound']
  const disabled = !canEdit

  if (loading) {
    return <SettingsCard title="General Settings"><p style={{ color: '#94a3b8', fontSize: 13 }}>Loading…</p></SettingsCard>
  }

  return (
    <SettingsCard title="General Settings" onSave={canEdit ? save : null} saving={saving} message={message} readOnly={!canEdit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 40 }}>
        <div>
          <Field label="Site Name">
            <input style={fieldStyle} value={form.siteName} onChange={(e) => set('siteName')(e.target.value)} disabled={disabled} />
          </Field>
          <Field label="Admin EMail ID">
            <input style={{ ...fieldStyle, background: '#eef0f4' }} value={form.adminEmailId} readOnly />
          </Field>
          <Field label="Currency View">
            <Select value={form.currencyView} onChange={set('currencyView')} options={CURRENCY_VIEWS} disabled={disabled} />
          </Field>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0b1437', margin: '4px 0 10px' }}>Financial Cycle</div>
          <Field label="Start Month">
            <Select value={form.startMonth} onChange={set('startMonth')} options={MONTHS} disabled={disabled} />
          </Field>
          <Field label="Time Zone">
            <Select value={form.timeZone} onChange={set('timeZone')} options={TIMEZONES} disabled={disabled} />
          </Field>
          <Field label="Implementation Type">
            <Select
              value={form.implementationType}
              onChange={set('implementationType')}
              options={IMPLEMENTATION_TYPES}
              disabled={disabled || implLocked}
            />
          </Field>
          {implLocked && (
            <p style={{ fontSize: 12, color: '#64748b', marginTop: -8 }}>Implementation type is locked after first save (legacy behaviour).</p>
          )}
        </div>
        <div>
          <Field label="Site Language">
            <div style={{ display: 'flex', gap: 24, paddingTop: 6 }}>
              {LANGUAGES.map((lang) => (
                <label key={lang} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: '#0b1437', cursor: disabled ? 'default' : 'pointer' }}>
                  <input type="checkbox" checked={langs.includes(lang)} onChange={() => toggleLang(lang)} disabled={disabled} />
                  {lang}
                </label>
              ))}
            </div>
          </Field>
          <Field label="Currency">
            <Select value={form.currencyType} onChange={set('currencyType')} options={currencyOptions} disabled={disabled} />
          </Field>
          <Field label="Default Data period">
            <Select value={form.defaultDatePeriod} onChange={set('defaultDatePeriod')} options={DATA_PERIODS} disabled={disabled} />
          </Field>
          <div style={{ height: 27 }} />
          <Field label="End Month">
            <Select value={form.endMonth} onChange={set('endMonth')} options={MONTHS} disabled={disabled} />
          </Field>
          <Field label="Implementation">
            <Select value={form.implementation} onChange={set('implementation')} options={IMPLEMENTATIONS} disabled={disabled} />
          </Field>
        </div>
      </div>
      {!orgId && <p style={{ color: '#dc2626', fontSize: 12.5, marginTop: 8 }}>No organization id found on your profile.</p>}
    </SettingsCard>
  )
}
