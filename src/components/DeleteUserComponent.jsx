import api from '../api/api'

export default function DeleteUserComponent({ user, onClose, onDeleted }) {
  const onConfirm = async () => {
    await api.delete(`/api/users/${user.id}`)
    onClose()
    onDeleted?.()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="card w-full max-w-sm">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Delete User</h3>
        </div>
        <div className="card-body">
          <p className="text-sm">Are you sure you want to delete <b>{user.username}</b>?</p>
        </div>
        <div className="card-footer flex justify-end gap-2">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={onConfirm} className="btn-danger">Delete</button>
        </div>
      </div>
    </div>
  )
}
