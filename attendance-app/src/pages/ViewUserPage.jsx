import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/api'
import DeleteUserComponent from '../components/DeleteUserComponent'

export default function ViewUserPage() {
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  const load = async () => {
    const { data } = await api.get('/api/users')
    setUsers(data)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Username</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Role</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="px-3 py-2">{u.id}</td>
                <td className="px-3 py-2">{u.username}</td>
                <td className="px-3 py-2">{u.email}</td>
                <td className="px-3 py-2">{u.role}</td>
                <td className="px-3 py-2 flex gap-2">
                  <button onClick={() => navigate(`/update-user/${u.id}`)} className="px-3 py-1 bg-amber-500 text-white rounded">Edit</button>
                  <button onClick={() => setSelected(u)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected && (
        <DeleteUserComponent user={selected} onClose={() => setSelected(null)} onDeleted={load} />
      )}
    </div>
  )
}
