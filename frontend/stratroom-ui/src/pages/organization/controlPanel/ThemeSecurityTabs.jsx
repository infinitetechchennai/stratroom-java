import { useState, useEffect, useCallback } from 'react'
import {
  getOrgId, getThemeList, createTheme, updateTheme,
  getSecurityList, createSecurity, updateSecurity,
} from '../../../api/controlPanelApi'
import { THEME_MODES, NAVY } from './constants'
import { SettingsCard, Field, Select, Toggle, fieldStyle } from './shared'
import { applyStratroomTheme, normalizeThemeColor, themeRowExists } from '../../../utils/stratroomTheme'

export function ThemeSettingsTab({ canEdit }) {
  const orgId = getOrgId()
  const [form, setForm] = useState({ themeColor: NAVY, themeName: 'light', loginTheme: '', loginLogo: '' })
  const [hasRow, setHasRow] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const load = useCallback(async () => {
    if (!orgId) { setLoading(false); return }
    setLoading(true)
    try {
      const row = await getThemeList(orgId)
      if (themeRowExists(row)) {
        const loaded = {
          themeColor: normalizeThemeColor(row.themeColor || NAVY),
          themeName: row.themeName || 'light',
          loginTheme: row.loginTheme || '',
          loginLogo: row.loginLogo || '',
        }
        setHasRow(true)
        setForm(loaded)
        applyStratroomTheme(loaded)
      } else {
        setHasRow(false)
      }
    } catch (err) {
      setMessage({ ok: false, text: err?.response?.data?.exception || 'Could not load theme.' })
    } finally {
      setLoading(false)
    }
  }, [orgId])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!canEdit || !orgId) return
    setSaving(true)
    setMessage(null)
    const dto = {
      ...form,
      orgId: Number(orgId),
      themeColor: normalizeThemeColor(form.themeColor),
    }
    try {
      const resp = hasRow ? await updateTheme(dto) : await createTheme(dto)
      const saved = resp?.controlPanelThemeDTO || dto
      applyStratroomTheme(saved)
      setHasRow(true)
      setMessage({ ok: true, text: 'Theme saved and applied.' })
      await load()
    } catch (err) {
      setMessage({
        ok: false,
        text: err?.response?.data?.exception || err?.response?.data?.message || err?.message || 'Save failed.',
      })
    } finally {
      setSaving(false)
    }
  }

  const previewTheme = (patch) => {
    setForm((f) => {
      const next = { ...f, ...patch }
      applyStratroomTheme(next)
      return next
    })
  }

  const colorValue = normalizeThemeColor(form.themeColor)

  if (loading) return <SettingsCard title="Themes"><p style={{ color: '#94a3b8', fontSize: 13 }}>Loading…</p></SettingsCard>

  return (
    <SettingsCard title="Themes" onSave={canEdit ? save : null} saving={saving} message={message} readOnly={!canEdit}>
      <Field label="Primary colour">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input
            type="color"
            value={colorValue}
            disabled={!canEdit}
            onChange={(e) => previewTheme({ themeColor: e.target.value })}
            style={{ width: 48, height: 36, border: 'none', cursor: canEdit ? 'pointer' : 'default' }}
          />
          <input
            style={fieldStyle}
            value={form.themeColor}
            disabled={!canEdit}
            onChange={(e) => previewTheme({ themeColor: e.target.value })}
          />
        </div>
      </Field>
      <Field label="Theme mode">
        <Select
          value={form.themeName}
          onChange={(v) => previewTheme({ themeName: v })}
          options={THEME_MODES}
          disabled={!canEdit}
        />
      </Field>
      <p className="cp-hint" style={{ margin: '-8px 0 16px' }}>
        Light / Dark apply immediately. System follows your OS appearance and updates when it changes.
      </p>
      <Field label="Login banner URL / path">
        <input style={fieldStyle} value={form.loginTheme} disabled={!canEdit} onChange={(e) => setForm((f) => ({ ...f, loginTheme: e.target.value }))} placeholder="Image URL or uploaded path" />
      </Field>
      <Field label="Application logo URL / path">
        <input style={fieldStyle} value={form.loginLogo} disabled={!canEdit} onChange={(e) => setForm((f) => ({ ...f, loginLogo: e.target.value }))} />
      </Field>
      {form.loginTheme && (
        <div style={{ marginTop: 8 }}>
          <img src={form.loginTheme} alt="Login preview" style={{ maxHeight: 80, maxWidth: '100%', borderRadius: 6, border: '1px solid #e2e8f0' }} onError={(e) => { e.target.style.display = 'none' }} />
        </div>
      )}
      <p className="cp-hint" style={{ marginBottom: 0 }}>
        Save persists settings to the server. Primary colour and theme mode preview live before you save.
      </p>
    </SettingsCard>
  )
}

const EMPTY_SEC = {
  securityType: '', singleSignURL: '', audienceURL: '', defaultRelayState: '',
  applicationUsername: '', nameIDFormat: '', allowSSo: false, recipientUrl: false,
}

export function SecuritySettingsTab({ canEdit }) {
  const orgId = getOrgId()
  const [form, setForm] = useState(EMPTY_SEC)
  const [hasRow, setHasRow] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const load = useCallback(async () => {
    if (!orgId) { setLoading(false); return }
    setLoading(true)
    try {
      const list = await getSecurityList(orgId)
      const row = Array.isArray(list) ? list[0] : list
      if (row && Number(row.orgId) > 0) {
        setHasRow(true)
        setForm({
          securityType: row.securityType || '',
          singleSignURL: row.singleSignURL || '',
          audienceURL: row.audienceURL || '',
          defaultRelayState: row.defaultRelayState || '',
          applicationUsername: row.applicationUsername || '',
          nameIDFormat: row.nameIDFormat || '',
          allowSSo: !!row.allowSSo,
          recipientUrl: !!row.recipientUrl,
        })
      }
    } catch {
      setMessage({ ok: false, text: 'Could not load security settings.' })
    } finally {
      setLoading(false)
    }
  }, [orgId])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!canEdit) return
    setSaving(true)
    setMessage(null)
    const dto = { ...form, orgId: Number(orgId) }
    try {
      if (hasRow) await updateSecurity(dto)
      else await createSecurity(dto)
      setMessage({ ok: true, text: 'Security settings saved.' })
      setHasRow(true)
    } catch {
      setMessage({ ok: false, text: 'Save failed.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <SettingsCard title="Security"><p style={{ color: '#94a3b8', fontSize: 13 }}>Loading…</p></SettingsCard>

  return (
    <SettingsCard title="Security (Sign-on)" onSave={canEdit ? save : null} saving={saving} message={message} readOnly={!canEdit}>
      <Field label="Sign-on method">
        <select
          style={fieldStyle}
          value={form.securityType || 'Native'}
          disabled={!canEdit}
          onChange={(e) => setForm((f) => ({ ...f, securityType: e.target.value === 'Native' ? '' : e.target.value }))}
        >
          <option value="Native">Native (username / password)</option>
          <option value="SAML">SAML 2.0</option>
          <option value="OC">OpenID Connect</option>
        </select>
      </Field>
      {form.securityType === 'SAML' && (
        <>
          <Field label="Single sign-on URL"><input style={fieldStyle} disabled={!canEdit} value={form.singleSignURL} onChange={(e) => setForm((f) => ({ ...f, singleSignURL: e.target.value }))} /></Field>
          <Field label="Audience URL"><input style={fieldStyle} disabled={!canEdit} value={form.audienceURL} onChange={(e) => setForm((f) => ({ ...f, audienceURL: e.target.value }))} /></Field>
          <Field label="Default relay state"><input style={fieldStyle} disabled={!canEdit} value={form.defaultRelayState} onChange={(e) => setForm((f) => ({ ...f, defaultRelayState: e.target.value }))} /></Field>
          <Field label="Name ID format"><input style={fieldStyle} disabled={!canEdit} value={form.nameIDFormat} onChange={(e) => setForm((f) => ({ ...f, nameIDFormat: e.target.value }))} /></Field>
          <Field label="Application username attribute"><input style={fieldStyle} disabled={!canEdit} value={form.applicationUsername} onChange={(e) => setForm((f) => ({ ...f, applicationUsername: e.target.value }))} /></Field>
          <Toggle label="Allow SSO" checked={form.allowSSo} disabled={!canEdit} onChange={(v) => setForm((f) => ({ ...f, allowSSo: v }))} />
          <Toggle label="Recipient URL" checked={form.recipientUrl} disabled={!canEdit} onChange={(v) => setForm((f) => ({ ...f, recipientUrl: v }))} />
        </>
      )}
      {form.securityType === 'OC' && (
        <>
          <Field label="Application name"><input style={fieldStyle} disabled={!canEdit} value={form.applicationUsername} onChange={(e) => setForm((f) => ({ ...f, applicationUsername: e.target.value }))} /></Field>
          <Field label="Redirect URL"><input style={fieldStyle} disabled={!canEdit} value={form.singleSignURL} onChange={(e) => setForm((f) => ({ ...f, singleSignURL: e.target.value }))} /></Field>
          <Field label="Audience / client ID"><input style={fieldStyle} disabled={!canEdit} value={form.audienceURL} onChange={(e) => setForm((f) => ({ ...f, audienceURL: e.target.value }))} /></Field>
        </>
      )}
      {!form.securityType && (
        <p style={{ fontSize: 13, color: '#64748b' }}>Select SAML 2.0 or OpenID Connect (OC) to configure SSO.</p>
      )}
    </SettingsCard>
  )
}
