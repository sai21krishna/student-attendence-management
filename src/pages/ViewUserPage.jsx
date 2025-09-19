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
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Users</h2>
      <div className="overflow-x-auto">
        <table className="table text-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => navigate(`/update-user/${u.id}`)} className="btn-primary">Edit</button>
                    <button onClick={() => setSelected(u)} className="btn-danger">Delete</button>
                  </div>
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
