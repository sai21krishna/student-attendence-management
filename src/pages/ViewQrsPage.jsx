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
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Generated QRs</h2>
      <div className="overflow-x-auto">
        <table className="table text-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Valid From</th>
              <th>Valid Until</th>
              <th>Active</th>
              <th>Event</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((q) => (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td className="truncate max-w-xs">{q.codeData}</td>
                <td>{q.validFrom}</td>
                <td>{q.validUntil}</td>
                <td>{q.active ? 'Yes' : 'No'}</td>
                <td>{q.eventId || '-'}</td>
                <td>
                  <button onClick={() => remove(q.id)} className="btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
