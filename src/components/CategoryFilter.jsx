import { categories } from '../data/products'

export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="category-filter">
      <label htmlFor="category-select" className="category-label">
        Category
      </label>
      <select
        id="category-select"
        className="input select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}
