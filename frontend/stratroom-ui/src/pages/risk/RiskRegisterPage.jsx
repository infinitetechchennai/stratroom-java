import { useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './RiskRegisterPage.css'

export default function RiskRegisterPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    function onMessage(event) {
      if (event.origin !== window.location.origin) return
      if (event.data?.type === 'stratroom:session-expired') {
        navigate('/login', { replace: true })
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [navigate])
  const pageId = searchParams.get('pageId')
  const kpiId = searchParams.get('kpiId')

  const src = useMemo(() => {
    const qs = new URLSearchParams({ embedded: '1' })
    if (pageId) qs.set('pageId', pageId)
    if (kpiId) qs.set('kpiId', kpiId)
    return `/risk-register/risk_new.html?${qs.toString()}`
  }, [pageId, kpiId])

  return (
    <div className="risk-register-page">
      <iframe
        title="Risk Register"
        src={src}
        className="risk-register-frame"
      />
    </div>
  )
}
