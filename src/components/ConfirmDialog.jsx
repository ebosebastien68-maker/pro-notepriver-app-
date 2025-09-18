export default function ConfirmDialog({ open, title, message, onCancel, onConfirm }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="card w-full max-w-md p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-neutral-300">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onCancel} className="btn btn-ghost">Annuler</button>
          <button onClick={onConfirm} className="btn btn-primary">Confirmer</button>
        </div>
      </div>
    </div>
  )
}
