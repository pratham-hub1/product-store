// Formats a number as Indian Rupees, e.g. 55000 -> "₹55,000".
const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export const formatPrice = (value) => inr.format(value)
