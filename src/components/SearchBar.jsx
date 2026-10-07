export default function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="search-field">
      <label htmlFor="product-search" className="category-label">
        Search
      </label>
      <div className="search-bar">
        <input
          id="product-search"
          type="search"
          className="input"
          placeholder="Search products by name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            type="button"
            className="search-clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            &times;
          </button>
        )}
        {typeof resultCount === 'number' && (
          <span className="search-count">
            {resultCount} {resultCount === 1 ? 'result' : 'results'}
          </span>
        )}
      </div>
    </div>
  )
}
