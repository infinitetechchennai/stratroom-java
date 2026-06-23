import { useState, useEffect, useCallback, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getDisplayName, getInitials } from '../organization/landingPageUtils'
import {
  getDepartmentReportees,
  getScorecardsByDept,
  getPerformanceFormData,
  savePerformanceContract,
  getEmpId,
} from '../../api/profileMenuApi'
import './performanceForm.css'

const RATING_LABELS = {
  1: 'Below Expectations',
  2: 'Meets Expectations',
  3: 'Exceeds Expectations',
}

function ratingSummary(entries) {
  if (!entries.length) return { self: 0, manager: 0, consensual: 0, band: 0, bandText: '—' }
  let self = 0
  let manager = 0
  let consensual = 0
  entries.forEach((e) => {
    self += Number(e.selfRating) || 0
    manager += Number(e.managerRating) || 0
    consensual += Number(e.consensualRating) || 0
  })
  const avg = (consensual / (entries.length * 3)) * 100
  let band = 0
  if (avg <= 60) band = 1
  else if (avg <= 85) band = 2
  else band = 3
  return {
    self,
    manager,
    consensual,
    band,
    bandText: RATING_LABELS[band] || '—',
  }
}

export default function PerformanceFormPage({ title, variant = 'contract' }) {
  const { user } = useAuth()
  const empId = getEmpId() || user?.empId
  const displayName = getDisplayName(user)
  const initials = getInitials(displayName)

  const [departments, setDepartments] = useState([])
  const [scorecards, setScorecards] = useState([])
  const [deptId, setDeptId] = useState('')
  const [scorecardId, setScorecardId] = useState('')
  const [rows, setRows] = useState([])
  const [contractMeta, setContractMeta] = useState(null)
  const [comments, setComments] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    getDepartmentReportees()
      .then((data) => setDepartments(Array.isArray(data) ? data : []))
      .catch(() => setDepartments([]))
  }, [])

  useEffect(() => {
    if (!deptId) {
      setScorecards([])
      setScorecardId('')
      return
    }
    getScorecardsByDept(deptId)
      .then((data) => setScorecards(Array.isArray(data) ? data : []))
      .catch(() => setScorecards([]))
  }, [deptId])

  const loadForm = useCallback(async (scId) => {
    if (!scId) return
    setLoading(true)
    setMessage(null)
    try {
      const data = await getPerformanceFormData(scId)
      const list = data?.subkpidtoList || []
      const mapped = list.map((item, idx) => {
        const entry = item.subKPIEntrysDTO || {}
        return {
          key: item.id || idx,
          subkpiId: item.id,
          subkpiName: item.subKpiName || item.subKpiValue?.subMeasureName || `Measure ${idx + 1}`,
          entryId: entry.id || null,
          preferenceId: entry.preferenceId || data?.values?.performanceContract?.id || null,
          selfRating: entry.selfRating || 0,
          managerRating: entry.managerRating || 0,
          consensualRating: entry.consensualRating || 0,
        }
      })
      setRows(mapped)
      const pc = data?.values?.performanceContract || {}
      setContractMeta(pc)
      setComments(pc?.performanceValue?.comments || '')
    } catch {
      setRows([])
      setMessage({ ok: false, text: 'Could not load performance data for this scorecard.' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setRows([])
    setComments('')
    if (scorecardId) loadForm(scorecardId)
  }, [scorecardId, loadForm])

  const summary = useMemo(() => ratingSummary(rows), [rows])

  const setRating = (key, field, value) => {
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, [field]: Number(value) } : r)))
  }

  const handleSave = async () => {
    if (!scorecardId || !rows.length) {
      setMessage({ ok: false, text: 'Select a department and scorecard with measures first.' })
      return
    }
    setSaving(true)
    setMessage(null)
    const subKPIEntrysList = rows.map((r) => ({
      id: r.entryId || undefined,
      subkpiId: r.subkpiId,
      subkpiName: r.subkpiName,
      selfRating: r.selfRating || 0,
      managerRating: r.managerRating || 0,
      consensualRating: r.consensualRating || 0,
      preferenceId: r.preferenceId || contractMeta?.id || undefined,
    }))
    const payload = {
      id: contractMeta?.id || undefined,
      owner: contractMeta?.owner || empId,
      createdBy: contractMeta?.createdBy || empId,
      scorecardId: Number(scorecardId),
      deptId: deptId ? Number(deptId) : contractMeta?.deptId || 0,
      subKPIEntrysList,
      performanceValue: {
        comments,
        selfRatingTotal: String(summary.self),
        managerRating: String(summary.manager),
        consensualRating: String(summary.consensual),
        totalconsensualScoreRating: summary.band,
        formType: variant === 'pip' ? 'pip' : 'contract',
      },
    }
    try {
      await savePerformanceContract(payload)
      setMessage({ ok: true, text: `${title} saved successfully.` })
      await loadForm(scorecardId)
    } catch (err) {
      setMessage({
        ok: false,
        text: err?.response?.data?.exception || err?.response?.data?.message || 'Save failed.',
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="perf-form-page">
      <div className="perf-form-header">
        <h4 className="perf-form-title">{title}</h4>
        <select className="perf-form-select" value={deptId} onChange={(e) => setDeptId(e.target.value)}>
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>{d.name || d.deptName || `Dept ${d.id}`}</option>
          ))}
        </select>
      </div>

      <div className="perf-form-card">
        <div className="perf-form-card-head">
          <div className="perf-form-user">
            <span className="perf-form-avatar">{initials}</span>
            <div>
              <strong>{displayName}</strong>
              <div className="perf-form-muted">{title}</div>
            </div>
          </div>
          <select
            className="perf-form-select"
            value={scorecardId}
            onChange={(e) => setScorecardId(e.target.value)}
            disabled={!deptId}
          >
            <option value="">Select Scorecard</option>
            {scorecards.map((s) => (
              <option key={s.id} value={s.id}>{s.name || s.scorecardName || `Scorecard ${s.id}`}</option>
            ))}
          </select>
        </div>

        <div className="perf-form-summary">
          <div><span>Self total</span><strong>{summary.self}</strong></div>
          <div><span>Manager total</span><strong>{summary.manager}</strong></div>
          <div><span>Consensual total</span><strong>{summary.consensual}</strong></div>
          <div><span>Rating band</span><strong>{summary.bandText}</strong></div>
        </div>

        {loading ? (
          <p className="perf-form-muted" style={{ padding: 24 }}>Loading measures…</p>
        ) : (
          <div className="perf-form-table-wrap">
            <table className="perf-form-table">
              <thead>
                <tr>
                  <th>Measure</th>
                  <th>Self</th>
                  <th>Manager</th>
                  <th>Consensual</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="perf-form-empty">Select a scorecard to load measures.</td>
                  </tr>
                ) : rows.map((row, idx) => (
                  <tr key={row.key}>
                    <td>{String(idx + 1).padStart(2, '0')}. {row.subkpiName}</td>
                    {['selfRating', 'managerRating', 'consensualRating'].map((field) => (
                      <td key={field}>
                        <div className="perf-form-ratings">
                          {[1, 2, 3].map((v) => (
                            <label key={v} className="perf-form-radio">
                              <input
                                type="radio"
                                name={`${row.key}-${field}`}
                                checked={Number(row[field]) === v}
                                onChange={() => setRating(row.key, field, v)}
                              />
                              {v}
                            </label>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="perf-form-comments">
          <label>Comments</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={3}
            placeholder="Add comments…"
          />
        </div>

        <div className="perf-form-footer">
          {message && (
            <span className={message.ok ? 'perf-form-msg-ok' : 'perf-form-msg-err'}>{message.text}</span>
          )}
          <button type="button" className="perf-form-save" onClick={handleSave} disabled={saving || loading}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
