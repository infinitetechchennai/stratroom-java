import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginPage from '../pages/auth/LoginPage'
import StratroomShell from '../layout/StratroomShell'
import LandingRedirect from '../pages/LandingRedirect'
import Dashboard from '../pages/dashboard/Dashboard'
import Whiteboard from '../pages/dashboard/Whiteboard'
import OrgStructureNew from '../pages/organization/OrgStructureNew'
import Orgtracker from '../pages/organization/Orgtracker'
import OrgStructureKpi from '../pages/organization/OrgStructureKpi'
import OrgStructureKpiEdit from '../pages/organization/OrgStructureKpiEdit'
import LandingPage from '../pages/organization/LandingPage'
import Controlpanel from '../pages/organization/Controlpanel'
import Audittrailpage from '../pages/organization/Audittrailpage'
import Userrolemanagement from '../pages/organization/Userrolemanagement'
import ApiCheckPage from '../pages/check/ApiCheckPage'
import ScorecardPage from '../pages/scorecard/ScorecardPage'
import KpiStoryCardPage from '../pages/scorecard/KpiStoryCardPage'

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <PageLoader />
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <PageLoader />
  return isAuthenticated ? <Navigate to="/landing" replace /> : children
}

function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100dvh',
      background: '#f3f4f6'
    }}>
      <div style={{
        width: 36,
        height: 36,
        border: '3px solid rgba(136,59,113,0.2)',
        borderTopColor: '#883b71',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Dev-only backend verification page — no auth required */}
      <Route path="/check" element={<ApiCheckPage />} />

      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

      <Route element={<PrivateRoute><StratroomShell /></PrivateRoute>}>
        {/* Post-login landing resolver — fetches homePagePreferences and redirects */}
        <Route path="/home" element={<LandingRedirect />} />

        {/* Landing pages matching MemberController.login() routing */}
        <Route path="/org-structure" element={<OrgStructureNew />} />
        <Route path="/org-tracker" element={<Orgtracker />} />
        <Route path="/org-structure-kpi" element={<OrgStructureKpi />} />
        <Route path="/org-structure-kpi-edit" element={<OrgStructureKpiEdit />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-page" element={<Dashboard />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
        <Route path="/control-panel" element={<Controlpanel />} />
        <Route path="/audit-trail" element={<Audittrailpage />} />
        <Route path="/user-role-management" element={<Userrolemanagement />} />
        <Route path="/scorecard" element={<ScorecardPage />} />
        <Route path="/kpi-story-card" element={<KpiStoryCardPage />} />

        <Route path="/" element={<Navigate to="/home" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}
