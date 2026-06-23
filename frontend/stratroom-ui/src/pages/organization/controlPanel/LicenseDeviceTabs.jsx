import { useState, useEffect } from 'react'
import { getLicenseDetails } from '../../../api/controlPanelApi'
import { SettingsCard, Field, fieldStyle, formatLicenseDate } from './shared'

export function LicenseSettingsTab() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const resp = await getLicenseDetails()
        if (!cancelled) setData(resp)
      } catch (err) {
        if (!cancelled) setError(err?.response?.data?.exception || err?.message || 'Could not load license details.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  if (loading) return <SettingsCard title="License"><p style={{ color: '#94a3b8', fontSize: 13 }}>Loading…</p></SettingsCard>
  if (error) return <SettingsCard title="License"><p style={{ color: '#dc2626', fontSize: 13.5, margin: 0 }}>{error}</p></SettingsCard>

  const modules = Array.isArray(data?.moduleList) ? data.moduleList : []
  const usersLabel = data?.totalAllowedUsers != null ? `${data.totalAllowedUsers} users` : '—'

  return (
    <SettingsCard title="License" readOnly>
      {!data?.validationSuccess && data?.validationMesssage && (
        <p style={{ color: '#dc2626', fontSize: 13, margin: '0 0 16px', padding: '10px 12px', background: '#fef2f2', borderRadius: 6 }}>
          {data.validationMesssage}
        </p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 40, marginBottom: 24 }}>
        <Field label="Organization">
          <input style={{ ...fieldStyle, background: '#eef0f4' }} value={data?.organization || '—'} readOnly />
        </Field>
        <Field label="Valid Users">
          <input style={{ ...fieldStyle, background: '#eef0f4' }} value={usersLabel} readOnly />
        </Field>
        <Field label="Valid Until">
          <input style={{ ...fieldStyle, background: '#eef0f4' }} value={formatLicenseDate(data?.expiryDate)} readOnly />
        </Field>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#0b1437', marginBottom: 12 }}>Licensed Modules</div>
      {modules.length === 0 ? (
        <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>No modules found.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px 24px' }}>
          {modules.map((mod) => (
            <label key={mod.moduleName} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: '#334155' }}>
              <input type="checkbox" checked={!!mod.enabled} disabled />
              {mod.moduleName}
            </label>
          ))}
        </div>
      )}
    </SettingsCard>
  )
}

export function DeviceSettingsTab() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLicenseDetails().then(setData).catch(() => setData(null)).finally(() => setLoading(false))
  }, [])

  const devices = data?.deviceList || []
  const hasWeb = devices.some((d) => String(d).toLowerCase().includes('web'))
  const hasMobile = devices.some((d) => String(d).toLowerCase().includes('mobile'))

  if (loading) return <SettingsCard title="Device"><p style={{ color: '#94a3b8', fontSize: 13 }}>Loading…</p></SettingsCard>

  return (
    <SettingsCard title="Device" readOnly>
      <p style={{ fontSize: 13, color: '#64748b', marginTop: 0 }}>Licensed devices from your organisation license file.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
          <input type="checkbox" checked={hasWeb} disabled /> Web Application
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
          <input type="checkbox" checked={hasMobile} disabled /> Mobile App
        </label>
      </div>
      {devices.length > 0 && (
        <p style={{ fontSize: 12.5, color: '#94a3b8', marginTop: 20 }}>License entries: {devices.join(', ')}</p>
      )}
    </SettingsCard>
  )
}

export function OkrInfoTab() {
  return (
    <SettingsCard title="OKR" readOnly>
      <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, margin: 0 }}>
        OKR mode is configured under <strong>General → Implementation</strong>. Select <strong>OKR</strong> there to
        switch the organisation from BSC to OKR. There is no separate OKR settings screen in the legacy app either.
      </p>
    </SettingsCard>
  )
}
