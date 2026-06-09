import { useState } from 'react'

const BASE = '/authservice'

const STATUS = {
  idle: 'idle',
  loading: 'loading',
  ok: 'ok',
  error: 'error',
}

function tag(status) {
  const map = {
    idle: { label: 'WAITING', bg: '#e5e7eb', color: '#6b7280' },
    loading: { label: 'CALLING…', bg: '#dbeafe', color: '#2563eb' },
    ok: { label: '200 OK', bg: '#dcfce7', color: '#16a34a' },
    error: { label: 'FAILED', bg: '#fee2e2', color: '#dc2626' },
  }
  const t = map[status] || map.idle
  return (
    <span style={{
      display: 'inline-block', padding: '2px 10px', borderRadius: 12,
      fontSize: 11, fontWeight: 700, letterSpacing: 0.8,
      background: t.bg, color: t.color,
    }}>{t.label}</span>
  )
}

function JsonBox({ data }) {
  if (!data) return null
  const isError = data?.__error
  return (
    <pre style={{
      background: isError ? '#fff1f2' : '#0f172a',
      color: isError ? '#b91c1c' : '#94d6a0',
      borderRadius: 8, padding: '14px 16px', fontSize: 12.5,
      lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-all',
      marginTop: 12, border: isError ? '1px solid #fca5a5' : 'none',
      maxHeight: 320, overflowY: 'auto',
    }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  )
}

function Section({ title, method, endpoint, status, response, children }) {
  return (
    <div style={{
      background: 'white', borderRadius: 12, padding: 24,
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 1,
            color: method === 'POST' ? '#7c3aed' : '#0369a1',
            background: method === 'POST' ? '#ede9fe' : '#e0f2fe',
            padding: '2px 8px', borderRadius: 6, marginRight: 8,
          }}>{method}</span>
          <code style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>
            {BASE}{endpoint}
          </code>
        </div>
        {tag(status)}
      </div>

      <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 700, color: '#111827' }}>
        {title}
      </h3>

      {children}
      <JsonBox data={response} />
    </div>
  )
}

export default function ApiCheckPage() {
  // ── Login ──────────────────────────────────────────
  const [loginForm, setLoginForm] = useState({ userName: '', passWord: '' })
  const [loginStatus, setLoginStatus] = useState(STATUS.idle)
  const [loginRes, setLoginRes] = useState(null)
  const [token, setToken] = useState('')
  const [userInfo, setUserInfo] = useState('')

  // ── Validate Token ─────────────────────────────────
  const [validateStatus, setValidateStatus] = useState(STATUS.idle)
  const [validateRes, setValidateRes] = useState(null)

  // ── Generate Token (refresh) ───────────────────────
  const [refreshToken, setRefreshToken] = useState('')
  const [genStatus, setGenStatus] = useState(STATUS.idle)
  const [genRes, setGenRes] = useState(null)

  // ── Service Health ─────────────────────────────────
  const [healthMap, setHealthMap] = useState({})

  /* ─── Handlers ─────────────────────────────────── */
  const doLogin = async () => {
    setLoginStatus(STATUS.loading)
    setLoginRes(null)
    try {
      const res = await fetch(`${BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...loginForm, ssoLogin: false }),
      })
      const data = await res.json()
      setLoginRes(data)
      setLoginStatus(res.ok && data.loginFlag ? STATUS.ok : STATUS.error)
      if (data.accessToken) setToken(data.accessToken)
      if (data.refreshToken) setRefreshToken(data.refreshToken)
      if (data.userInfo) setUserInfo(data.userInfo)
    } catch (e) {
      setLoginRes({ __error: e.message })
      setLoginStatus(STATUS.error)
    }
  }

  const doValidate = async () => {
    setValidateStatus(STATUS.loading)
    setValidateRes(null)
    try {
      const res = await fetch(`${BASE}/validateToken`, {
        headers: {
          Authorization: `Bearer ${token}`,
          USER_INFO: userInfo,
        },
      })
      const data = await res.json()
      setValidateRes(data)
      setValidateStatus(res.ok ? STATUS.ok : STATUS.error)
    } catch (e) {
      setValidateRes({ __error: e.message })
      setValidateStatus(STATUS.error)
    }
  }

  const doGenerate = async () => {
    setGenStatus(STATUS.loading)
    setGenRes(null)
    try {
      const res = await fetch(`${BASE}/generateToken`, {
        headers: {
          REFRESH_TOKEN: refreshToken,
          USER_INFO: userInfo,
        },
      })
      const data = await res.json()
      setGenRes(data)
      setGenStatus(res.ok ? STATUS.ok : STATUS.error)
      if (data.token) setToken(data.token)
    } catch (e) {
      setGenRes({ __error: e.message })
      setGenStatus(STATUS.error)
    }
  }

  const services = [
    { label: 'Auth Service', url: '/authservice/login', method: 'POST', body: { userName: 'ping', passWord: 'ping', ssoLogin: false } },
    { label: 'DB Service', url: '/db-service/ping', method: 'GET' },
    { label: 'User Service', url: '/userservice/ping', method: 'GET' },
    { label: 'Scorecard Service', url: '/scorecard-service/ping', method: 'GET' },
    { label: 'ETL Service', url: '/etl-service/ping', method: 'GET' },
  ]

  const pingAll = async () => {
    const results = {}
    await Promise.all(services.map(async (svc) => {
      try {
        const opts = svc.method === 'POST'
          ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(svc.body) }
          : { method: 'GET' }
        const res = await fetch(svc.url, opts)
        results[svc.label] = res.status === 401 || res.ok ? 'ok' : 'error'
      } catch {
        results[svc.label] = 'error'
      }
    }))
    setHealthMap(results)
  }

  /* ─── Render ───────────────────────────────────── */
  return (
    <div style={{
      minHeight: '100vh', background: '#f1f5f9',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(90deg, #883b71 0%, #5b2d8e 100%)',
        padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: 'rgba(255,255,255,0.15)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontSize: 20,
        }}>🔬</div>
        <div>
          <h1 style={{ margin: 0, color: 'white', fontSize: 18, fontWeight: 700 }}>
            Backend API Checker
          </h1>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
            Spring Boot 3.3.6 · Java 21 · Migration Verification
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '28px 20px' }}>

        {/* ── Service Health ── */}
        <div style={{
          background: 'white', borderRadius: 12, padding: 24,
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#111827' }}>
              Service Health Check
            </h3>
            <button onClick={pingAll} style={btnStyle('#0ea5e9')}>Ping All Services</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {services.map((s) => {
              const h = healthMap[s.label]
              return (
                <div key={s.label} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500,
                  background: !h ? '#f9fafb' : h === 'ok' ? '#f0fdf4' : '#fef2f2',
                  border: !h ? '1px solid #e5e7eb' : h === 'ok' ? '1px solid #bbf7d0' : '1px solid #fecaca',
                  color: !h ? '#6b7280' : h === 'ok' ? '#15803d' : '#dc2626',
                }}>
                  <span style={{ fontSize: 9 }}>●</span>
                  {s.label}
                  {h && <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>
                    {h === 'ok' ? ' UP' : ' DOWN'}
                  </span>}
                </div>
              )
            })}
          </div>
          {Object.keys(healthMap).length === 0 && (
            <p style={{ margin: '12px 0 0', fontSize: 12, color: '#9ca3af', textAlign: 'center' }}>
              Click "Ping All Services" to check which backend services are running.
            </p>
          )}
        </div>

        {/* ── Login ── */}
        <Section title="Step 1 — Login" method="POST" endpoint="/login"
          status={loginStatus} response={loginRes}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              placeholder="Email / Username"
              value={loginForm.userName}
              onChange={(e) => setLoginForm((f) => ({ ...f, userName: e.target.value }))}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginForm.passWord}
              onChange={(e) => setLoginForm((f) => ({ ...f, passWord: e.target.value }))}
              style={inputStyle}
            />
            <button
              onClick={doLogin}
              disabled={loginStatus === STATUS.loading || !loginForm.userName || !loginForm.passWord}
              style={btnStyle('#883b71')}
            >
              {loginStatus === STATUS.loading ? '…' : 'Login'}
            </button>
          </div>
        </Section>

        {/* ── Validate Token ── */}
        <Section title="Step 2 — Validate Token" method="GET" endpoint="/validateToken"
          status={validateStatus} response={validateRes}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              placeholder="Access Token (auto-filled after login)"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={{ ...inputStyle, flex: 2 }}
            />
            <input
              placeholder="USER_INFO header (auto-filled)"
              value={userInfo}
              onChange={(e) => setUserInfo(e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              onClick={doValidate}
              disabled={validateStatus === STATUS.loading || !token}
              style={btnStyle('#0369a1')}
            >
              {validateStatus === STATUS.loading ? '…' : 'Validate'}
            </button>
          </div>
        </Section>

        {/* ── Generate / Refresh Token ── */}
        <Section title="Step 3 — Refresh Token" method="GET" endpoint="/generateToken"
          status={genStatus} response={genRes}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input
              placeholder="Refresh Token (auto-filled after login)"
              value={refreshToken}
              onChange={(e) => setRefreshToken(e.target.value)}
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              onClick={doGenerate}
              disabled={genStatus === STATUS.loading || !refreshToken}
              style={btnStyle('#7c3aed')}
            >
              {genStatus === STATUS.loading ? '…' : 'Refresh'}
            </button>
          </div>
        </Section>

        {/* Footer */}
        <p style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', marginTop: 8 }}>
          This page is for development verification only. Access it at{' '}
          <code style={{ background: '#f3f4f6', padding: '1px 6px', borderRadius: 4 }}>
            /check
          </code>
        </p>
      </div>
    </div>
  )
}

const inputStyle = {
  flex: 1, minWidth: 160, height: 40, padding: '0 12px',
  border: '1px solid #d1d5db', borderRadius: 8, fontSize: 13,
  outline: 'none', fontFamily: 'inherit',
}

function btnStyle(bg) {
  return {
    height: 40, padding: '0 20px', borderRadius: 8, border: 'none',
    background: bg, color: 'white', fontSize: 13, fontWeight: 600,
    cursor: 'pointer', whiteSpace: 'nowrap', opacity: 1,
  }
}
