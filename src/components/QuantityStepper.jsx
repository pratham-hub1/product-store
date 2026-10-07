/**
 * QuantityStepper - a small reusable +/- control.
 * Used on the Cart page to increase or decrease a line's quantity.
 */
export default function QuantityStepper({ value, onIncrease, onDecrease, min = 1, max }) {
  return (
    <div className="stepper" role="group" aria-label="Quantity">
      <button
        type="button"
        className="stepper-btn"
        onClick={onDecrease}
        aria-label="Decrease quantity"
      >
        &minus;
      </button>
      <span className="stepper-value">{value}</span>
      <button
        type="button"
        className="stepper-btn"
        onClick={onIncrease}
        disabled={typeof max === 'number' && value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
