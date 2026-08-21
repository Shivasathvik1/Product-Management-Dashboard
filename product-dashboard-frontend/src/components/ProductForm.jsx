import { useEffect, useState } from 'react'

const EMPTY_PRODUCT = {
  name: '',
  brand: '',
  description: '',
  price: '',
  category: '',
  quantity: '',
  available: true
}

export default function ProductForm({
  initialValue = EMPTY_PRODUCT,
  onSubmit,
  submitLabel = 'Save Product',
  busy = false
}) {
  const [product, setProduct] = useState(EMPTY_PRODUCT)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    setProduct({
      ...EMPTY_PRODUCT,
      ...initialValue,
      price: initialValue?.price ?? '',
      quantity: initialValue?.quantity ?? ''
    })
  }, [initialValue])

  useEffect(() => {
    if (!imageFile) {
      setImagePreview('')
      return
    }

    const url = URL.createObjectURL(imageFile)
    setImagePreview(url)
    return () => URL.revokeObjectURL(url)
  }, [imageFile])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setProduct((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const normalized = {
      ...product,
      price: Number(product.price),
      quantity: Number(product.quantity)
    }

    onSubmit(normalized, imageFile)
  }

  return (
    <form className="card border-0 shadow-sm p-4" onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Product name</label>
          <input
            required
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="iPhone 17"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Brand</label>
          <input
            required
            className="form-control"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Apple"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Category</label>
          <input
            required
            className="form-control"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Electronics"
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Price</label>
          <input
            required
            min="0"
            step="0.01"
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Quantity</label>
          <input
            required
            min="0"
            type="number"
            className="form-control"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="4"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Describe the product..."
          />
        </div>

        <div className="col-md-8">
          <label className="form-label">Product image</label>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
          <div className="form-text">
            Optional. The frontend sends multipart form-data when an image is selected.
          </div>
        </div>

        <div className="col-md-4 d-flex align-items-end">
          <div className="form-check form-switch mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              name="available"
              checked={Boolean(product.available)}
              onChange={handleChange}
            />
            <label className="form-check-label">Available for sale</label>
          </div>
        </div>

        {imagePreview && (
          <div className="col-12">
            <div className="image-preview-wrap">
              <img src={imagePreview} alt="Selected preview" />
            </div>
          </div>
        )}

        <div className="col-12 pt-2">
          <button className="btn btn-dark px-4" disabled={busy}>
            {busy ? 'Saving...' : submitLabel}
          </button>
        </div>
      </div>
    </form>
  )
}
