import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TopUtilityBar from './TopUtilityBar'
import MainNavigation from './MainNavigation'
import { resolveThemeMode, syncPrimaryColorFromStorage } from '../utils/stratroomTheme'
import './StratroomShell.css'

export default function StratroomShell() {
  const location = useLocation()
  const isLanding = location.pathname === '/landing'
  const [mode, setMode] = useState(() => resolveThemeMode(localStorage.getItem('theme') || 'light'))

  useEffect(() => {
    const sync = (event) => {
      setMode(event?.detail?.themeName || resolveThemeMode(localStorage.getItem('theme') || 'light'))
      syncPrimaryColorFromStorage()
    }
    sync()
    window.addEventListener('stratroom-theme-changed', sync)
    return () => window.removeEventListener('stratroom-theme-changed', sync)
  }, [])

  return (
    <div className={`stratroom-shell ${mode}`}>
      <TopUtilityBar />
      <header id="header" className="header shadow-sm">
        <MainNavigation />
      </header>
      <main className={isLanding ? 'stratroom-landing-outlet' : 'stratroom-page-outlet'}>
        <Outlet />
      </main>
    </div>
  )
}
