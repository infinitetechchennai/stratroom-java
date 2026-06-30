import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../risk/RiskRegisterPage.css'

export default function ComplianceRegisterPage() {
  const [searchParams] = useSearchParams()
  const pageId = searchParams.get('pageId')

  const src = useMemo(() => {
    const qs = new URLSearchParams({ embedded: '1' })
    if (pageId) qs.set('pageId', pageId)
    return `/risk-register/compliance_new.html?${qs.toString()}`
  }, [pageId])

  return (
    <div className="risk-register-page">
      <iframe
        title="Compliance Register"
        src={src}
        className="risk-register-frame"
      />
    </div>
  )
}
