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
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Attendance Dashboard</h1>
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onLogout}
              className="px-3 py-2 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
