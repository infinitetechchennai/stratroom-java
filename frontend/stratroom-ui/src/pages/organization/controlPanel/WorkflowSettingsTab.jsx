import { useState, useEffect, useCallback } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import {
  getEmpId, getWorkflows, saveWorkflow, updateWorkflow, deleteWorkflow,
} from '../../../api/controlPanelApi'
import { SettingsCard, Field, fieldStyle } from './shared'
import { NAVY } from './constants'

const EMPTY = {
  id: 0, name: '', type: '', department: 0, conditions: '', description: '', approverNames: '',
}

export function WorkflowSettingsTab({ canEdit }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getWorkflows()
      setRows(Array.isArray(data) ? data : [])
    } catch {
      setMessage({ ok: false, text: 'Could not load workflows.' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const openCreate = () => {
    setForm(EMPTY)
    setModal('create')
  }

  const openEdit = (row) => {
    const approvers = (row.approverList || []).map((a) => a.userName).filter(Boolean).join(', ')
    setForm({
      id: row.id,
      name: row.name || '',
      type: row.type || '',
      department: row.department || 0,
      conditions: row.conditions || '',
      description: row.description || '',
      approverNames: approvers,
    })
    setModal('edit')
  }

  const buildDto = () => {
    const empId = Number(getEmpId()) || 0
    const approverList = form.approverNames
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((userName, i) => ({
        userName,
        approverOrder: i + 1,
        status: 'Active',
        aprovalRoleId: 0,
      }))
    return {
      id: form.id || undefined,
      name: form.name,
      type: form.type,
      department: Number(form.department) || 0,
      conditions: form.conditions,
      description: form.description,
      createdBy: empId,
      updatedBy: empId,
      owner: empId,
      approverList,
    }
  }

  const submit = async () => {
    if (!canEdit) return
    setSaving(true)
    setMessage(null)
    try {
      const dto = buildDto()
      if (modal === 'edit' && form.id) await updateWorkflow(dto)
      else await saveWorkflow(dto)
      setModal(null)
      setMessage({ ok: true, text: 'Workflow saved.' })
      load()
    } catch {
      setMessage({ ok: false, text: 'Save failed.' })
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id) => {
    if (!canEdit || !window.confirm('Delete this workflow?')) return
    try {
      await deleteWorkflow(id)
      load()
    } catch {
      setMessage({ ok: false, text: 'Delete failed.' })
    }
  }

  if (loading) {
    return <SettingsCard title="Workflow Setting"><p style={{ color: '#94a3b8', fontSize: 13 }}>Loading…</p></SettingsCard>
  }

  return (
    <SettingsCard title="Workflow Setting" readOnly={!canEdit}>
      {message && <p style={{ fontSize: 13, color: message.ok ? '#16a34a' : '#dc2626', marginTop: 0 }}>{message.text}</p>}
      {canEdit && (
        <button type="button" onClick={openCreate} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
          padding: '8px 16px', borderRadius: 6, border: 'none', background: NAVY, color: '#fff', fontWeight: 600, cursor: 'pointer',
        }}>
          <Plus size={16} /> Add workflow
        </button>
      )}
      {rows.length === 0 ? (
        <p style={{ color: '#94a3b8', fontSize: 13 }}>No workflows configured.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
                {['Name', 'Type', 'Department', 'Conditions', 'Description', 'Approvers', ''].map((h) => (
                  <th key={h} style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{row.name}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{row.type}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{row.departmentName || row.department}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{row.conditions}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{row.description}</td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                    {(row.approverList || []).map((a) => a.userName).filter(Boolean).join(', ') || '—'}
                  </td>
                  <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                    {canEdit && (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button type="button" onClick={() => openEdit(row)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} title="Edit"><Pencil size={16} /></button>
                        <button type="button" onClick={() => remove(row.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#dc2626' }} title="Delete"><Trash2 size={16} /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
        }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: 24, width: 'min(520px, 92vw)', maxHeight: '90vh', overflow: 'auto' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 16 }}>{modal === 'edit' ? 'Edit workflow' : 'New workflow'}</h3>
            <Field label="Workflow name"><input style={fieldStyle} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} /></Field>
            <Field label="Type"><input style={fieldStyle} value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} /></Field>
            <Field label="Department ID"><input style={fieldStyle} type="number" value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} /></Field>
            <Field label="Conditions"><input style={fieldStyle} value={form.conditions} onChange={(e) => setForm((f) => ({ ...f, conditions: e.target.value }))} /></Field>
            <Field label="Description"><textarea style={{ ...fieldStyle, minHeight: 72 }} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} /></Field>
            <Field label="Approvers (comma-separated emails or names)">
              <input style={fieldStyle} value={form.approverNames} onChange={(e) => setForm((f) => ({ ...f, approverNames: e.target.value }))} />
            </Field>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
              <button type="button" onClick={() => setModal(null)} style={{ padding: '8px 18px', borderRadius: 6, border: '1px solid #d9dde7', background: '#fff', cursor: 'pointer' }}>Cancel</button>
              <button type="button" onClick={submit} disabled={saving} style={{ padding: '8px 18px', borderRadius: 6, border: 'none', background: NAVY, color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </SettingsCard>
  )
}
