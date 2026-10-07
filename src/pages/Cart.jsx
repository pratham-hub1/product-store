import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import QuantityStepper from '../components/QuantityStepper'
import EmptyState from '../components/EmptyState'

const FREE_DELIVERY_THRESHOLD = 5000
const DELIVERY_FEE = 99

export default function Cart() {
  const { items, cartCount, cartTotal, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useCart()
  const [placed, setPlaced] = useState(false)

  // Delivery + grand total are derived from the memoised cart total.
  const { delivery, grandTotal } = useMemo(() => {
    const fee = cartTotal === 0 || cartTotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
    return { delivery: fee, grandTotal: cartTotal + fee }
  }, [cartTotal])

  if (placed) {
    return (
      <div className="page container">
        <div className="order-success">
          <div className="order-success-icon" aria-hidden="true">
            &#10003;
          </div>
          <h1>Order placed</h1>
          <p>Thanks! This is a demo checkout &mdash; no payment was taken.</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="page container">
        <header className="page-head">
          <h1>Your Cart</h1>
        </header>
        <EmptyState
          title="Your cart is empty"
          message="Add a few products and they'll show up here."
          actionLabel="Browse products"
          actionTo="/products"
        />
      </div>
    )
  }

  return (
    <div className="page container">
      <header className="page-head page-head-row">
        <div>
          <h1>Your Cart</h1>
          <p className="page-sub">
            {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart.
          </p>
        </div>
        <button type="button" className="btn btn-ghost" onClick={clearCart}>
          Clear cart
        </button>
      </header>

      <div className="cart-layout">
        <ul className="cart-list">
          {items.map((line) => (
            <li key={line.id} className="cart-line">
              <Link to={`/products/${line.id}`} className="cart-line-media">
                <img src={line.image} alt={line.name} />
              </Link>

              <div className="cart-line-info">
                <span className="badge badge-category">{line.category}</span>
                <h3>
                  <Link to={`/products/${line.id}`}>{line.name}</Link>
                </h3>
                <p className="muted">{formatPrice(line.price)} each</p>
                <button
                  type="button"
                  className="link-danger"
                  onClick={() => removeFromCart(line.id)}
                >
                  Remove
                </button>
              </div>

              <div className="cart-line-controls">
                <QuantityStepper
                  value={line.qty}
                  max={line.stock}
                  onIncrease={() => increaseQty(line.id)}
                  onDecrease={() => decreaseQty(line.id)}
                />
                <p className="cart-line-total">{formatPrice(line.price * line.qty)}</p>
              </div>
            </li>
          ))}
        </ul>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>{delivery === 0 ? 'Free' : formatPrice(delivery)}</span>
          </div>
          {delivery > 0 && (
            <p className="summary-hint">
              Add {formatPrice(FREE_DELIVERY_THRESHOLD - cartTotal)} more for free delivery.
            </p>
          )}
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-block btn-lg"
            onClick={() => {
              setPlaced(true)
              clearCart()
            }}
          >
            Checkout
          </button>
          <Link to="/products" className="btn btn-ghost btn-block">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  )
}
