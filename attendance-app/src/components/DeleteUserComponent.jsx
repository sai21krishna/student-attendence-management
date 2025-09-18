import api from '../api/api'

export default function DeleteUserComponent({ user, onClose, onDeleted }) {
  const onConfirm = async () => {
    await api.delete(`/api/users/${user.id}`)
    onClose()
    onDeleted?.()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded shadow p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-2">Delete User</h3>
        <p className="mb-4 text-sm">Are you sure you want to delete <b>{user.username}</b>?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 rounded bg-gray-200">Cancel</button>
          <button onClick={onConfirm} className="px-3 py-2 rounded bg-red-600 text-white">Delete</button>
        </div>
      </div>
    </div>
  )
}
