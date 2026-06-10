import { Outlet, useLocation } from 'react-router-dom'
import TopUtilityBar from './TopUtilityBar'
import MainNavigation from './MainNavigation'
import './StratroomShell.css'

export default function StratroomShell() {
  const location = useLocation()
  const isLanding = location.pathname === '/landing'

  return (
    <div className="stratroom-shell light">
      <TopUtilityBar />
      <header id="header" className="header shadow-sm">
        <MainNavigation />
      </header>
      <div className={isLanding ? 'stratroom-landing-outlet' : 'stratroom-page-outlet'}>
        <Outlet />
      </div>
    </div>
  )
}
