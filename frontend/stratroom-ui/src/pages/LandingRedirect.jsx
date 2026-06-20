import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useLandingRoute from '../hooks/useLandingRoute'

export default function LandingRedirect() {
  const { landingPath, loading } = useLandingRoute()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && landingPath) {
      navigate(landingPath, { replace: true })
    }
  }, [loading, landingPath, navigate])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh'
      }}>
        <div style={{
          width: 36,
          height: 36,
          border: '3px solid rgba(133,121,140,0.2)',
          borderTopColor: '#85798c',
          borderRadius: '50%',
          animation: 'spin 0.7s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return null
}
