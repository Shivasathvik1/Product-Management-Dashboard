import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="empty-state">
      <div className="display-3 fw-bold">404</div>
      <h1 className="h4">Page not found</h1>
      <Link to="/" className="btn btn-dark mt-2">
        Back to dashboard
      </Link>
    </div>
  )
}
