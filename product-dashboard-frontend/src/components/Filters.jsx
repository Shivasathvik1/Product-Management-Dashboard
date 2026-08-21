import { useState } from 'react'

export default function Filters({ onApply, onReset, busy }) {
  const [mode, setMode] = useState('all')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onApply({ mode, category, brand, price, quantity })
  }

  const reset = () => {
    setMode('all')
    setCategory('')
    setBrand('')
    setPrice('')
    setQuantity('')
    onReset()
  }

  return (
    <form className="card border-0 shadow-sm p-3 mb-4" onSubmit={submit}>
      <div className="row g-2 align-items-end">
        <div className="col-md-3">
          <label className="form-label">Filter type</label>
          <select
            className="form-select"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="all">All products</option>
            <option value="category">Category</option>
            <option value="brandCategory">Brand + category</option>
            <option value="price">Price less than</option>
            <option value="quantity">Quantity greater than</option>
            <option value="available">Available only</option>
          </select>
        </div>

        {(mode === 'category' || mode === 'brandCategory') && (
          <div className="col-md-3">
            <label className="form-label">Category</label>
            <input
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
        )}

        {mode === 'brandCategory' && (
          <div className="col-md-3">
            <label className="form-label">Brand</label>
            <input
              className="form-control"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>
        )}

        {mode === 'price' && (
          <div className="col-md-3">
            <label className="form-label">Maximum price</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        )}

        {mode === 'quantity' && (
          <div className="col-md-3">
            <label className="form-label">Minimum quantity</label>
            <input
              type="number"
              min="0"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
        )}

        <div className="col-md-auto">
          <button className="btn btn-dark me-2" disabled={busy}>
            Apply
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </form>
  )
}
