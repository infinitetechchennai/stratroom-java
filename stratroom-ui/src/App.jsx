import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PermissionsProvider } from './context/PermissionsContext'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PermissionsProvider>
          <AppRoutes />
        </PermissionsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
