import { useState, useEffect, useCallback } from 'react'
import {
  getOrgId, loadGeneralSettingRow, patchGeneralSetting, getRestorePaths, runScriptRestore,
} from '../../../api/controlPanelApi'
import { SCHEDULER_TYPES, BACKUP_DURATIONS } from './constants'
import { SettingsCard, Field, Select, Toggle, fieldStyle } from './shared'

export function NotificationSettingsTab({ canEdit }) {
  const orgId = getOrgId()
  const [enabled, setEnabled] = useState(false)
  const [baseDto, setBaseDto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const load = useCallback(async () => {
    if (!orgId) { setLoading(false); return }
    setLoading(true)
    try {
      const dto = await loadGeneralSettingRow(orgId)
      setBaseDto(dto)
      setEnabled(!!dto.generalSettingValue?.notification)
    } catch {
      setMessage({ ok: false, text: 'Could not load notification settings.' })
    } finally {
      setLoading(false)
    }
  }, [orgId])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!canEdit || !orgId) return
    setSaving(true)
    setMessage(null)
    try {
      await patchGeneralSetting(orgId, { notification: enabled, audittrailtype: 'notification' }, baseDto)
      setMessage({ ok: true, text: 'Notification setting saved.' })
      load()
    } catch {
      setMessage({ ok: false, text: 'Save failed. Ensure General settings exist first.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <SettingsCard title="Notification"><p style={{ color: '#94a3b8', fontSize: 13 }}>Loading…</p></SettingsCard>

  return (
    <SettingsCard title="Notification" onSave={canEdit ? save : null} saving={saving} message={message} readOnly={!canEdit}>
      <Toggle label="Enable notifications" checked={enabled} disabled={!canEdit} onChange={setEnabled} />
      <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Global notification switch stored in organisation general settings.</p>
    </SettingsCard>
  )
}

export function SchedulerSettingsTab({ canEdit }) {
  const orgId = getOrgId()
  const [schedulertype, setSchedulertype] = useState('Monthly')
  const [baseDto, setBaseDto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const load = useCallback(async () => {
    if (!orgId) { setLoading(false); return }
    setLoading(true)
    try {
      const dto = await loadGeneralSettingRow(orgId)
      setBaseDto(dto)
      if (dto.generalSettingValue?.schedulertype) setSchedulertype(dto.generalSettingValue.schedulertype)
    } catch {
      setMessage({ ok: false, text: 'Could not load scheduler.' })
    } finally {
      setLoading(false)
    }
  }, [orgId])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!canEdit || !orgId) return
    setSaving(true)
    setMessage(null)
    try {
      await patchGeneralSetting(orgId, { schedulertype, audittrailtype: 'scheduler' }, baseDto)
      setMessage({ ok: true, text: 'Scheduler saved.' })
      load()
    } catch {
      setMessage({ ok: false, text: 'Save failed.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <SettingsCard title="Scheduler"><p style={{ color: '#94a3b8', fontSize: 13 }}>Loading…</p></SettingsCard>

  return (
    <SettingsCard title="Scheduler (Data archive)" onSave={canEdit ? save : null} saving={saving} message={message} readOnly={!canEdit}>
      <Field label="Archive interval">
        <Select value={schedulertype} onChange={setSchedulertype} options={SCHEDULER_TYPES} disabled={!canEdit} />
      </Field>
      <p style={{ fontSize: 13, color: '#64748b' }}>Selecting &quot;Now&quot; triggers archive on save (legacy behaviour).</p>
    </SettingsCard>
  )
}

export function BackupSettingsTab({ canEdit }) {
  const orgId = getOrgId()
  const [backupduration, setBackupduration] = useState('Daily')
  const [backupPath, setBackupPath] = useState('')
  const [restorePath, setRestorePath] = useState('')
  const [restoreOptions, setRestoreOptions] = useState([])
  const [selectedRestore, setSelectedRestore] = useState('')
  const [baseDto, setBaseDto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [restoring, setRestoring] = useState(false)
  const [message, setMessage] = useState(null)

  const load = useCallback(async () => {
    if (!orgId) { setLoading(false); return }
    setLoading(true)
    try {
      const [dto, paths] = await Promise.all([
        loadGeneralSettingRow(orgId),
        getRestorePaths(orgId).catch(() => []),
      ])
      setBaseDto(dto)
      const gsv = dto.generalSettingValue || {}
      if (gsv.backupduration) setBackupduration(gsv.backupduration)
      if (gsv.backupPath) setBackupPath(gsv.backupPath)
      if (gsv.restorePath) setRestorePath(gsv.restorePath)
      const list = Array.isArray(paths) ? paths : paths?.restorePathList || []
      setRestoreOptions(list)
    } catch {
      setMessage({ ok: false, text: 'Could not load backup settings.' })
    } finally {
      setLoading(false)
    }
  }, [orgId])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!canEdit || !orgId) return
    setSaving(true)
    setMessage(null)
    try {
      await patchGeneralSetting(orgId, {
        backupduration,
        path: backupPath,
        backupPath,
        audittrailtype: 'backup',
      }, baseDto)
      setMessage({ ok: true, text: 'Backup settings saved.' })
      load()
    } catch {
      setMessage({ ok: false, text: 'Save failed.' })
    } finally {
      setSaving(false)
    }
  }

  const restore = async () => {
    if (!canEdit || !selectedRestore) return
    setRestoring(true)
    setMessage(null)
    try {
      await runScriptRestore(selectedRestore, orgId)
      setMessage({ ok: true, text: 'Restore initiated.' })
    } catch {
      setMessage({ ok: false, text: 'Restore failed.' })
    } finally {
      setRestoring(false)
    }
  }

  if (loading) return <SettingsCard title="Backup & Restore"><p style={{ color: '#94a3b8', fontSize: 13 }}>Loading…</p></SettingsCard>

  return (
    <SettingsCard title="Backup & Restore" onSave={canEdit ? save : null} saving={saving} message={message} readOnly={!canEdit}>
      <Field label="Backup duration">
        <Select value={backupduration} onChange={setBackupduration} options={BACKUP_DURATIONS} disabled={!canEdit} />
      </Field>
      <Field label="Backup path">
        <input style={fieldStyle} value={backupPath} disabled={!canEdit} onChange={(e) => setBackupPath(e.target.value)} placeholder="Server backup directory" />
      </Field>
      {restorePath && <p style={{ fontSize: 12.5, color: '#64748b' }}>Last restore path: {restorePath}</p>}
      {restoreOptions.length > 0 && (
        <>
          <Field label="Restore from">
            <select style={fieldStyle} value={selectedRestore} disabled={!canEdit} onChange={(e) => setSelectedRestore(e.target.value)}>
              <option value="">Select backup…</option>
              {restoreOptions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          {canEdit && (
            <button type="button" disabled={!selectedRestore || restoring} onClick={restore} style={{
              marginTop: 8, padding: '8px 20px', borderRadius: 6, border: '1px solid #d9dde7', background: '#fff', cursor: 'pointer', fontWeight: 600,
            }}>{restoring ? 'Restoring…' : 'Run restore'}</button>
          )}
        </>
      )}
    </SettingsCard>
  )
}
