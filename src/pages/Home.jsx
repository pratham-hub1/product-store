import { Link } from 'react-router-dom'
import { products, categories } from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import { formatPrice } from '../utils/format'

export default function Home() {
  const { cartCount, cartTotal } = useCart()
  const featured = products.slice(0, 4)
  const categoryList = categories.filter((c) => c !== 'All')

  return (
    <div className="page">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Product Inventory &amp; Shopping Cart</span>
            <h1>
              Everything you need,
              <br />
              in one clean store.
            </h1>
            <p className="hero-sub">
              Browse {products.length} products across {categoryList.length} categories,
              search and filter instantly, and manage your cart &mdash; built entirely
              with React.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">
                Browse Products
              </Link>
              <Link to="/cart" className="btn btn-ghost btn-lg">
                View Cart ({cartCount})
              </Link>
            </div>
          </div>

          <aside className="hero-card" aria-label="Cart summary">
            <h3>Your Cart</h3>
            <p className="hero-card-count">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </p>
            <p className="hero-card-total">{formatPrice(cartTotal)}</p>
            <Link to="/cart" className="btn btn-primary btn-block">
              Go to Cart
            </Link>
          </aside>
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">Shop by category</h2>
        <div className="category-chips">
          {categoryList.map((category) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="chip"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2 className="section-title">Featured products</h2>
          <Link to="/products" className="link-more">
            View all &rarr;
          </Link>
        </div>
        <div className="product-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}
