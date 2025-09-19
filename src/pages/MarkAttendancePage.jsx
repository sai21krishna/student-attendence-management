import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/browser'
import api from '../api/api'

export default function MarkAttendancePage() {
  const videoRef = useRef(null)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [marking, setMarking] = useState(false)
  const lastProcessed = useRef('')

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader()
    let stop = false

    async function start() {
      setError('')
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        if (videoRef.current) {
          // Set attributes to satisfy mobile autoplay policies
          videoRef.current.playsInline = true
          videoRef.current.muted = true
          // Attach stream; do not call play() manually to avoid AbortError
          if (videoRef.current.srcObject !== stream) {
            videoRef.current.srcObject = stream
          }
        }
        const controls = await codeReader.decodeFromVideoDevice(null, videoRef.current, (res, err) => {
          if (res && !stop) {
            const text = res.getText()
            // Avoid spamming state with the same result repeatedly
            setResult((prev) => (prev === text ? prev : text))
          }
        })
        return () => controls.stop()
      } catch (e) {
        // Ignore AbortError noise from autoplay race conditions
        if (e && e.name === 'AbortError') {
          console.warn('Video play aborted (benign):', e)
        } else {
          setError(e.message || 'Camera error')
        }
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
    if (!result) {
      setMessage('Please scan a QR')
      return
    }
    if (marking) return
    try {
      setMarking(true)
      const { data } = await api.post('/api/attendance/mark-qr', { qrData: result })
      setMessage(`Marked ${data.status} at ${data.checkInTime}`)
      lastProcessed.current = result
    } catch (e) {
      setMessage(e?.response?.data?.message || 'Failed to mark attendance')
    } finally {
      setMarking(false)
    }
  }

  // Auto-mark when a new scan arrives and a user ID is present
  useEffect(() => {
    if (!result) return
    if (lastProcessed.current === result) return
    // Trigger auto mark
    void mark()
  }, [result])

  return (
    <div className="card space-y-4">
      <h2 className="text-xl font-semibold">Mark Attendance (Scan QR)</h2>
      {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 p-2 rounded">{error}</div>}
      <video ref={videoRef} className="w-full max-w-md rounded border" />
      <div className="flex items-center gap-2">
        <button onClick={mark} disabled={marking || !result} className={`btn-primary ${marking ? 'opacity-80 cursor-not-allowed' : ''}`}>{marking ? 'Marking...' : 'Mark Now'}</button>
        <span className="text-sm text-gray-600">Scanned QR will auto-mark.</span>
      </div>
      <div className="text-sm text-gray-700">Scanned: {result || '—'}</div>
      {message && <div className="text-sm text-blue-700 bg-blue-50 border border-blue-200 p-2 rounded">{message}</div>}
    </div>
  )
}
