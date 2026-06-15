import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PermissionsProvider } from './context/PermissionsContext'
import { I18nProvider } from './context/I18nContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <AuthProvider>
          <PermissionsProvider>
            <AppRoutes />
          </PermissionsProvider>
        </AuthProvider>
      </I18nProvider>
    </BrowserRouter>
  )
}
