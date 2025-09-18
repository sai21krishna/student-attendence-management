import { useEffect, useState } from 'react'
import api from '../api/api'

export default function ViewQrsPage() {
  const [items, setItems] = useState([])

  const load = async () => {
    const { data } = await api.get('/api/qr')
    setItems(data)
  }

  useEffect(() => {
    load()
  }, [])

  const remove = async (id) => {
    await api.delete(`/api/qr/${id}`)
    load()
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Generated QRs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Code</th>
              <th className="px-3 py-2">Valid From</th>
              <th className="px-3 py-2">Valid Until</th>
              <th className="px-3 py-2">Active</th>
              <th className="px-3 py-2">Event</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((q) => (
              <tr key={q.id} className="border-b">
                <td className="px-3 py-2">{q.id}</td>
                <td className="px-3 py-2 truncate max-w-xs">{q.codeData}</td>
                <td className="px-3 py-2">{q.validFrom}</td>
                <td className="px-3 py-2">{q.validUntil}</td>
                <td className="px-3 py-2">{q.active ? 'Yes' : 'No'}</td>
                <td className="px-3 py-2">{q.eventId || '-'}</td>
                <td className="px-3 py-2">
                  <button onClick={() => remove(q.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
