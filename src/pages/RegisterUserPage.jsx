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
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Register User</h2>
      {msg && <div className="mb-3 text-sm text-blue-700 bg-blue-50 border border-blue-200 p-2 rounded">{msg}</div>}
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-group">
          <label className="form-label">Username</label>
          <input name="username" value={form.username} onChange={onChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" name="email" value={form.email} onChange={onChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password" name="password" value={form.password} onChange={onChange} className="form-input" required />
        </div>
        <div className="form-group">
          <label className="form-label">Role</label>
          <select name="role" value={form.role} onChange={onChange} className="form-input">
            <option value="ADMIN">ADMIN</option>
            <option value="EMPLOYEE">EMPLOYEE</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <button className="btn-primary">Register</button>
        </div>
      </form>
    </div>
  )
}
