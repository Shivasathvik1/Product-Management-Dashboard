export default function AlertMessage({ type = 'danger', message, onClose }) {
  if (!message) return null

  return (
    <div className={`alert alert-${type} d-flex justify-content-between align-items-center`}>
      <span>{message}</span>
      {onClose && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
        />
      )}
    </div>
  )
}
