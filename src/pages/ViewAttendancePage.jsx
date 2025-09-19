import { useEffect, useState } from 'react'
import api from '../api/api'

export default function ViewAttendancePage() {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')

  const load = async () => {
    const { data } = await api.get('/api/attendance')
    setItems(data)
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = items.filter((i) => {
    const s = `${i.user?.username || ''} ${i.status || ''} ${i.qrCodeDataUsed || ''}`.toLowerCase()
    return s.includes(query.toLowerCase())
  })

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
      <div className="mb-3">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="form-input w-full md:w-80" />
      </div>
      <div className="overflow-x-auto">
        <table className="table text-sm">
          <thead>
            <tr>
              <th>User</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>QR Used</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id}>
                <td>{a.user?.username || a.userId}</td>
                <td>{a.date || a.checkInTime?.split('T')[0]}</td>
                <td>{a.time || a.checkInTime?.split('T')[1]?.slice(0,5)}</td>
                <td>{a.status}</td>
                <td className="truncate max-w-xs">{a.qrCodeDataUsed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
