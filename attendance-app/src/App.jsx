import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './layouts/Dashboard'
import LoginPage from './pages/LoginPage'
import RegisterUserPage from './pages/RegisterUserPage'
import ViewUserPage from './pages/ViewUserPage'
import UpdateUserPage from './pages/UpdateUserPage'
import GenerateQrPage from './pages/GenerateQrPage'
import ViewQrsPage from './pages/ViewQrsPage'
import MarkAttendancePage from './pages/MarkAttendancePage'
import ViewAttendancePage from './pages/ViewAttendancePage'
import DeleteUserPage from './pages/DeleteUserPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested routes render in Dashboard's Outlet */}
          <Route index element={<Navigate to="view-user" replace />} />
          <Route path="register-user" element={<RegisterUserPage />} />
          <Route path="view-user" element={<ViewUserPage />} />
          <Route path="update-user/:id" element={<UpdateUserPage />} />
          <Route path="generate-qr" element={<GenerateQrPage />} />
          <Route path="view-qrs" element={<ViewQrsPage />} />
          <Route path="mark-attendance" element={<MarkAttendancePage />} />
          <Route path="view-attendance" element={<ViewAttendancePage />} />
          <Route path="delete-user" element={<DeleteUserPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
