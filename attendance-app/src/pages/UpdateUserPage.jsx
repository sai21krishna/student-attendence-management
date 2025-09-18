import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/api'

export default function UpdateUserPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', role: 'EMPLOYEE' })
  const [msg, setMsg] = useState('')

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/api/users/${id}`)
      setForm({ username: data.username, email: data.email, role: data.role })
    })()
  }, [id])

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      await api.put(`/api/users/${id}`, form)
      setMsg('Updated successfully')
      setTimeout(() => navigate('/view-user'), 800)
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Update failed')
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Update User</h2>
      {msg && <div className="mb-3 text-sm text-blue-700 bg-blue-50 p-2 rounded">{msg}</div>}
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input name="username" value={form.username} onChange={onChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={onChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select name="role" value={form.role} onChange={onChange} className="w-full border rounded px-3 py-2">
            <option value="ADMIN">ADMIN</option>
            <option value="EMPLOYEE">EMPLOYEE</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Save</button>
        </div>
      </form>
    </div>
  )
}
