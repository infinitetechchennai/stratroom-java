import { useMemo } from 'react'
import '../risk/RiskRegisterPage.css'

export default function InitiativesDashboardPage() {
  const src = useMemo(() => {
    const qs = new URLSearchParams({ embedded: '1' })
    return `/risk-register/initiatives-dashboard.html?${qs.toString()}`
  }, [])

  return (
    <div className="risk-register-page">
      <iframe
        title="Initiatives Dashboard"
        src={src}
        className="risk-register-frame"
      />
    </div>
  )
}
