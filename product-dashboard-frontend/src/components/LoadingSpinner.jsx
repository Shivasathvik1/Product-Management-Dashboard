export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="text-center py-5">
      <div className="spinner-border" role="status" aria-hidden="true"></div>
      <div className="mt-3 text-secondary">{text}</div>
    </div>
  )
}
