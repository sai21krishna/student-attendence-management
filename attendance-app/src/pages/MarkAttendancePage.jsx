import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'
import api from '../api/api'

export default function MarkAttendancePage() {
  const videoRef = useRef(null)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [userId, setUserId] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader()
    let stop = false

    async function start() {
      setError('')
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }
        const controls = await codeReader.decodeFromVideoDevice(null, videoRef.current, (res, err) => {
          if (res && !stop) {
            setResult(res.getText())
          }
        })
        return () => controls.stop()
      } catch (e) {
        setError(e.message || 'Camera error')
      }
    }

    const cleanup = start()

    return () => {
      stop = true
      if (typeof cleanup === 'function') cleanup()
      const stream = videoRef.current?.srcObject
      if (stream) {
        stream.getTracks().forEach((t) => t.stop())
      }
    }
  }, [])

  const mark = async () => {
    setMessage('')
    if (!userId || !result) {
      setMessage('Please enter User ID and scan a QR')
      return
    }
    try {
      const { data } = await api.post('/api/attendance/mark', { userId: Number(userId), qrData: result })
      setMessage(`Marked ${data.status} at ${data.checkInTime}`)
    } catch (e) {
      setMessage(e?.response?.data?.message || 'Failed to mark attendance')
    }
  }

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold">Mark Attendance (Scan QR)</h2>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <video ref={videoRef} className="w-full max-w-md rounded border" />
      <div className="flex items-center gap-2">
        <input
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border rounded px-3 py-2 w-40"
        />
        <button onClick={mark} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Mark Attendance</button>
      </div>
      <div className="text-sm text-gray-700">Scanned: {result || '—'}</div>
      {message && <div className="text-sm text-blue-700 bg-blue-50 p-2 rounded">{message}</div>}
    </div>
  )
}
