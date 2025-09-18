import { useState } from 'react'
import DeleteUserComponent from '../components/DeleteUserComponent'

export default function DeleteUserPage() {
  const [userId, setUserId] = useState('')
  const [user, setUser] = useState(null)

  const openModal = () => {
    const idNum = Number(userId)
    if (!idNum) return
    setUser({ id: idNum, username: `User #${idNum}` })
  }

  return (
    <div className="bg-white p-6 rounded shadow space-y-3">
      <h2 className="text-xl font-semibold">Delete User</h2>
      <p className="text-sm text-gray-600">Enter a user ID to delete or go to View User to delete from the table.</p>
      <div className="flex items-center gap-2">
        <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" className="border rounded px-3 py-2 w-40" />
        <button onClick={openModal} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Delete</button>
      </div>
      {user && (
        <DeleteUserComponent user={user} onClose={() => setUser(null)} onDeleted={() => setUser(null)} />
      )}
    </div>
  )
}
