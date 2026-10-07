import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import EmptyState from '../components/EmptyState'

const SORT_OPTIONS = [
  { value: 'default', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
]

export default function Products() {
  // The category can be pre-selected from a URL, e.g. /products?category=Furniture
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('default')

  const activeCategory = searchParams.get('category') || 'All'

  const setCategory = (category) => {
    const next = new URLSearchParams(searchParams)
    if (category === 'All') {
      next.delete('category')
    } else {
      next.set('category', category)
    }
    setSearchParams(next)
  }

  const resetFilters = () => {
    setQuery('')
    setSort('default')
    setCategory('All')
  }

  // Filtering + sorting is memoised so it only recomputes when an input changes,
  // not on every unrelated re-render.
  const visibleProducts = useMemo(() => {
    const term = query.trim().toLowerCase()

    const filtered = products.filter((product) => {
      const matchesSearch =
        term === '' ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)

      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory

      return matchesSearch && matchesCategory
    })

    switch (sort) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price)
      case 'name-asc':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      default:
        return filtered
    }
  }, [query, activeCategory, sort])

  return (
    <div className="page container">
      <header className="page-head">
        <h1>Products</h1>
        <p className="page-sub">
          Search, filter by category and sort through the inventory.
        </p>
      </header>

      <div className="toolbar">
        <SearchBar value={query} onChange={setQuery} resultCount={visibleProducts.length} />
        <CategoryFilter value={activeCategory} onChange={setCategory} />
        <div className="sort-control">
          <label htmlFor="sort-select" className="category-label">
            Sort by
          </label>
          <select
            id="sort-select"
            className="input select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Conditional rendering based on the filtered result. */}
      {visibleProducts.length === 0 ? (
        <EmptyState
          title="No products found"
          message="Try a different search term or clear the category filter."
          actionLabel="Reset filters"
          onAction={resetFilters}
        />
      ) : (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
