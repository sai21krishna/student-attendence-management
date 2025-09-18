import { useState } from 'react'
import api from '../api/api'
import { QRCodeCanvas } from 'qrcode.react'

export default function GenerateQrPage() {
  const [params, setParams] = useState({ eventId: '', validFrom: '', validUntil: '' })
  const [qr, setQr] = useState(null)

  const onChange = (e) => setParams((p) => ({ ...p, [e.target.name]: e.target.value }))

  const generate = async () => {
    const { data } = await api.post('/api/qr/generate', params)
    setQr(data)
  }

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Generate QR</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm mb-1">Event ID</label>
          <input name="eventId" value={params.eventId} onChange={onChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Valid From</label>
          <input type="datetime-local" name="validFrom" value={params.validFrom} onChange={onChange} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm mb-1">Valid Until</label>
          <input type="datetime-local" name="validUntil" value={params.validUntil} onChange={onChange} className="w-full border rounded px-3 py-2" />
        </div>
      </div>
      <button onClick={generate} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Generate</button>

      {qr?.codeData && (
        <div className="pt-4">
          <QRCodeCanvas value={qr.codeData} size={200} includeMargin />
        </div>
      )}
    </div>
  )
}
