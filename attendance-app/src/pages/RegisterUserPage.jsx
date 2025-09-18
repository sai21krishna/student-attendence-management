import { useState } from 'react'
import api from '../api/api'

export default function RegisterUserPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'EMPLOYEE' })
  const [msg, setMsg] = useState('')

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      await api.post('/api/users/register', form)
      setMsg('User registered successfully')
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register User</h2>
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
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" name="password" value={form.password} onChange={onChange} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select name="role" value={form.role} onChange={onChange} className="w-full border rounded px-3 py-2">
            <option value="ADMIN">ADMIN</option>
            <option value="EMPLOYEE">EMPLOYEE</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Register</button>
        </div>
      </form>
    </div>
  )
}
