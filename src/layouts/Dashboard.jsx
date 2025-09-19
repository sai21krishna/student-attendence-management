import { Outlet, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()

  const navItems = [
    { label: 'Register User', path: '/dashboard/register-user' },
    { label: 'View User', path: '/dashboard/view-user' },
    { label: 'Delete User', path: '/dashboard/delete-user' },
    { label: 'Generate Qr', path: '/dashboard/generate-qr' },
    { label: 'View Qrs', path: '/dashboard/view-qrs' },
    { label: 'Mark Attendance', path: '/dashboard/mark-attendance' },
    { label: 'View Attendance', path: '/dashboard/view-attendance' },
  ]

  const onLogout = () => {
    localStorage.removeItem('jwt')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center text-white font-bold text-sm">
              AM
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Attendance Dashboard</h1>
          </div>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="nav-button-primary"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onLogout}
              className="nav-button-secondary"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
