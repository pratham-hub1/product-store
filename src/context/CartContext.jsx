import { createContext, useContext, useEffect, useMemo, useState } from 'react'

/**
 * CartContext
 * ------------
 * Holds the shopping-cart state for the whole app.
 *
 *  - Cart is persisted to localStorage, so it survives a page refresh.
 *  - All derived values (item count, line totals, grand total) are computed
 *    with useMemo so they are only recalculated when the cart actually changes.
 *
 * Each cart line is a small snapshot of the product plus the chosen quantity:
 *   { id, name, category, price, image, stock, qty }
 */

const CartContext = createContext(null)

const STORAGE_KEY = 'product-store-cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    // Corrupt or unreadable storage -> start with an empty cart.
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  // Persist whenever the cart changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  // --- Mutations -----------------------------------------------------------

  function addToCart(product, qty = 1) {
    setItems((prev) => {
      const existing = prev.find((line) => line.id === product.id)
      if (existing) {
        return prev.map((line) =>
          line.id === product.id
            ? { ...line, qty: Math.min(line.qty + qty, product.quantity) }
            : line,
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          stock: product.quantity,
          qty: Math.min(qty, product.quantity),
        },
      ]
    })
  }

  function increaseQty(id) {
    setItems((prev) =>
      prev.map((line) =>
        line.id === id ? { ...line, qty: Math.min(line.qty + 1, line.stock) } : line,
      ),
    )
  }

  function decreaseQty(id) {
    setItems((prev) =>
      prev.flatMap((line) => {
        if (line.id !== id) return [line]
        // Dropping below 1 removes the line entirely.
        return line.qty > 1 ? [{ ...line, qty: line.qty - 1 }] : []
      }),
    )
  }

  function removeFromCart(id) {
    setItems((prev) => prev.filter((line) => line.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  // --- Derived values (memoised) ------------------------------------------

  const cartCount = useMemo(
    () => items.reduce((sum, line) => sum + line.qty, 0),
    [items],
  )

  const cartTotal = useMemo(
    () => items.reduce((sum, line) => sum + line.price * line.qty, 0),
    [items],
  )

  const getQty = useMemo(() => {
    const map = new Map(items.map((line) => [line.id, line.qty]))
    return (id) => map.get(id) ?? 0
  }, [items])

  const value = {
    items,
    cartCount,
    cartTotal,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    getQty,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used inside a <CartProvider>')
  }
  return ctx
}
