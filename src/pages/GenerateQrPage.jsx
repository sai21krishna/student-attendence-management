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
    <div className="card space-y-4">
      <h2 className="text-xl font-semibold">Generate QR</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="form-group">
          <label className="form-label">Event ID</label>
          <input name="eventId" value={params.eventId} onChange={onChange} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Valid From</label>
          <input type="datetime-local" name="validFrom" value={params.validFrom} onChange={onChange} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Valid Until</label>
          <input type="datetime-local" name="validUntil" value={params.validUntil} onChange={onChange} className="form-input" />
        </div>
      </div>
      <button onClick={generate} className="btn-primary">Generate</button>

      {qr?.codeData && (
        <div className="pt-4">
          <QRCodeCanvas value={qr.codeData} size={200} includeMargin />
        </div>
      )}
    </div>
  )
}
