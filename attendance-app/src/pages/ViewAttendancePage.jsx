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
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
      <div className="mb-3">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="border rounded px-3 py-2 w-full md:w-80" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-3 py-2">User</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Time</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">QR Used</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b">
                <td className="px-3 py-2">{a.user?.username || a.userId}</td>
                <td className="px-3 py-2">{a.date || a.checkInTime?.split('T')[0]}</td>
                <td className="px-3 py-2">{a.time || a.checkInTime?.split('T')[1]?.slice(0,5)}</td>
                <td className="px-3 py-2">{a.status}</td>
                <td className="px-3 py-2 truncate max-w-xs">{a.qrCodeDataUsed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
