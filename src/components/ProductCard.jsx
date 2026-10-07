import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'

/**
 * ProductCard - one product in the grid.
 * Demonstrates props, conditional rendering and a reusable component.
 */
export default function ProductCard({ product }) {
  const { addToCart, getQty } = useCart()
  const inCart = getQty(product.id)
  const outOfStock = product.quantity === 0

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        {outOfStock && <span className="badge badge-out">Out of stock</span>}
      </Link>

      <div className="product-card-body">
        <div className="product-card-top">
          <span className="badge badge-category">{product.category}</span>
          <span className="rating" title={`${product.rating} out of 5`}>
            &#9733; {product.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="product-card-name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        <p className="product-card-price">{formatPrice(product.price)}</p>

        {/* Conditional rendering: stock message changes with availability. */}
        <p className={outOfStock ? 'stock stock-out' : 'stock stock-in'}>
          {outOfStock ? 'Currently unavailable' : `${product.quantity} in stock`}
        </p>

        <div className="product-card-actions">
          <Link to={`/products/${product.id}`} className="btn btn-ghost">
            View Details
          </Link>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => addToCart(product)}
            disabled={outOfStock}
          >
            {inCart > 0 ? `In Cart (${inCart})` : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
