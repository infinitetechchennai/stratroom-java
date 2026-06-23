import './controlPanel.css'

export const SECTION_TITLE = { fontSize: 13, fontWeight: 700, color: 'var(--shell-text, #0b1437)', marginBottom: 12 }
export const DIVIDER = { height: 1, background: 'var(--shell-border, #e2e8f0)', margin: '24px 0' }

export function SettingsCard({ title, children, onSave, saving, message, readOnly }) {
  return (
    <div className="cp-settings-card">
      <div className="cp-settings-card-header">{title}</div>
      <div className="cp-settings-card-body">{children}</div>
      {onSave && !readOnly && (
        <div className="cp-settings-card-footer">
          {message && <span style={{ fontSize: 12.5, color: message.ok ? '#16a34a' : '#dc2626' }}>{message.text}</span>}
          <button type="button" className="cp-save-btn" onClick={onSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      )}
    </div>
  )
}

export function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label className="cp-field-label">{label}</label>
      {children}
    </div>
  )
}

export function Select({ value, onChange, options, disabled }) {
  return (
    <select
      className="cp-field-input"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      style={{ opacity: disabled ? 0.7 : 1 }}
    >
      <option value="" disabled>Select…</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

export function Toggle({ checked, onChange, label, disabled }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: disabled ? 'default' : 'pointer', marginBottom: 16, opacity: disabled ? 0.6 : 1 }}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        style={{
          position: 'relative', width: 44, height: 24, borderRadius: 12, border: 'none', padding: 0,
          background: checked ? 'var(--primary, #2c2f6b)' : '#cbd5e1', transition: 'background 0.2s', cursor: disabled ? 'default' : 'pointer',
        }}
      >
        <span style={{
          position: 'absolute', top: 2, left: checked ? 22 : 2, width: 20, height: 20,
          background: '#fff', borderRadius: '50%', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }} />
      </button>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--shell-text, #0b1437)' }}>{label}</span>
    </label>
  )
}

export function Checkbox({ checked, onChange, label, disabled }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--shell-muted, #475569)', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.6 : 1 }}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} style={{ width: 16, height: 16, accentColor: 'var(--primary, #2c2f6b)' }} />
      {label}
    </label>
  )
}

export const fieldStyle = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid var(--shell-border, #d9dde7)',
  borderRadius: 6,
  fontSize: 13.5,
  color: 'var(--shell-text, #0b1437)',
  background: 'var(--shell-input-bg, #fff)',
  outline: 'none',
}

export function formatLicenseDate(value) {
  if (!value) return '—'
  if (typeof value === 'string') return value
  try {
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(value))
  } catch {
    return String(value)
  }
}

export function parseJsonBlob(resp) {
  if (!resp) return {}
  if (typeof resp === 'string') {
    try { return JSON.parse(resp) } catch { return {} }
  }
  if (resp.customValue) {
    try { return JSON.parse(resp.customValue) } catch { return {} }
  }
  return resp
}

export function boolVal(v, defaultVal = false) {
  if (v === undefined || v === null) return defaultVal
  return String(v) === 'true' || v === true
}
