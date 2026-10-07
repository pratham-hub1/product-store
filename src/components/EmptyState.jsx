import { Link } from 'react-router-dom'

/**
 * EmptyState - a small reusable placeholder shown when a list has no items.
 * The action can either navigate (actionTo) or run a callback (onAction).
 */
export default function EmptyState({ title, message, actionLabel, actionTo, onAction }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && onAction && (
        <button type="button" className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
      {actionLabel && !onAction && actionTo && (
        <Link to={actionTo} className="btn btn-primary">
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
