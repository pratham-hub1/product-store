import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProductById, products } from '../data/products'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import ProductCard from '../components/ProductCard'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)

  const { addToCart, getQty } = useCart()
  const [qty, setQty] = useState(1)

  // Conditional rendering: a product may not exist for the given id.
  if (!product) {
    return (
      <div className="page container">
        <div className="empty-state">
          <h3>Product not found</h3>
          <p>We couldn&apos;t find a product with id &ldquo;{id}&rdquo;.</p>
          <Link to="/products" className="btn btn-primary">
            Back to products
          </Link>
        </div>
      </div>
    )
  }

  const outOfStock = product.quantity === 0
  const inCart = getQty(product.id)

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (outOfStock) return
    addToCart(product, qty)
    setQty(1)
  }

  const step = (delta) => {
    setQty((current) => {
      const next = current + delta
      if (next < 1) return 1
      if (next > product.quantity) return product.quantity
      return next
    })
  }

  return (
    <div className="page container">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="details">
        <div className="details-media">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="details-info">
          <span className="badge badge-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="rating rating-lg">
            &#9733; {product.rating.toFixed(1)} <span className="muted">/ 5</span>
          </p>
          <p className="details-price">{formatPrice(product.price)}</p>

          <p className={outOfStock ? 'stock stock-out' : 'stock stock-in'}>
            {outOfStock ? 'Currently unavailable' : `${product.quantity} in stock`}
          </p>

          <p className="details-desc">{product.description}</p>

          {!outOfStock && (
            <form className="add-form" onSubmit={handleSubmit}>
              <div className="add-form-row">
                <label htmlFor="qty" className="category-label">
                  Quantity
                </label>
                <div className="stepper">
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => step(-1)}
                    aria-label="Decrease quantity"
                  >
                    &minus;
                  </button>
                  <input
                    id="qty"
                    className="stepper-input"
                    type="number"
                    min="1"
                    max={product.quantity}
                    value={qty}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      if (Number.isNaN(value)) return
                      setQty(Math.min(Math.max(value, 1), product.quantity))
                    }}
                  />
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => step(1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="add-form-actions">
                <button type="submit" className="btn btn-primary btn-lg">
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-lg"
                  onClick={() => {
                    addToCart(product, qty)
                    navigate('/cart')
                  }}
                >
                  Buy Now
                </button>
              </div>
            </form>
          )}

          {inCart > 0 && (
            <p className="in-cart-note">
              {inCart} in your cart &mdash;{' '}
              <Link to="/cart" className="link-more">
                go to cart
              </Link>
            </p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="section">
          <h2 className="section-title">More in {product.category}</h2>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
