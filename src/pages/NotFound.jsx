import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page container">
      <div className="empty-state">
        <h1>404</h1>
        <h3>Page not found</h3>
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/" className="btn btn-primary">
          Back home
        </Link>
      </div>
    </div>
  )
}
