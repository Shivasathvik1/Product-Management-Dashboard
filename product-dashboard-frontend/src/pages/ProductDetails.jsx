import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ProductImage from '../components/ProductImage'
import LoadingSpinner from '../components/LoadingSpinner'
import AlertMessage from '../components/AlertMessage'
import {
  deleteProduct,
  explainApiError,
  getProductById
} from '../services/api'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getProductById(id)
        if (!data) {
          setError('Product not found.')
        } else {
          setProduct(data)
        }
      } catch (err) {
        setError(explainApiError(err))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const remove = async () => {
    if (!window.confirm(`Delete "${product.name}"?`)) return

    try {
      await deleteProduct(id)
      navigate('/')
    } catch (err) {
      setError(explainApiError(err))
    }
  }

  if (loading) return <LoadingSpinner text="Loading product..." />

  if (!product) {
    return (
      <div className="page-narrow">
        <AlertMessage message={error || 'Product not found.'} />
        <Link to="/" className="btn btn-dark">Back to products</Link>
      </div>
    )
  }

  return (
    <div>
      <AlertMessage message={error} />

      <div className="row g-4 align-items-start">
        <div className="col-lg-6">
          <ProductImage product={product} className="detail-image shadow-sm" />
        </div>

        <div className="col-lg-6">
          <span className="badge text-bg-light border mb-3">{product.category}</span>
          <h1 className="display-6 fw-bold">{product.name}</h1>
          <p className="text-secondary fs-5">{product.brand}</p>

          <div className="display-6 fw-bold mb-3">
            ${Number(product.price || 0).toFixed(2)}
          </div>

          <p className="text-secondary">{product.description || 'No description provided.'}</p>

          <div className="info-grid my-4">
            <div>
              <span>Product ID</span>
              <strong>{product.id}</strong>
            </div>
            <div>
              <span>Quantity</span>
              <strong>{product.quantity ?? 0}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{product.available ? 'Available' : 'Unavailable'}</strong>
            </div>
            <div>
              <span>Category</span>
              <strong>{product.category || '-'}</strong>
            </div>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            <Link className="btn btn-primary" to={`/products/${id}/edit`}>
              <i className="bi bi-pencil me-2"></i>
              Edit
            </Link>
            <button className="btn btn-outline-danger" onClick={remove}>
              <i className="bi bi-trash me-2"></i>
              Delete
            </button>
            <Link className="btn btn-outline-secondary" to="/">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
