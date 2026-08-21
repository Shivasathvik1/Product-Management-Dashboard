import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'
import LoadingSpinner from '../components/LoadingSpinner'
import AlertMessage from '../components/AlertMessage'
import {
  deleteProduct,
  explainApiError,
  getAllProducts,
  getAvailableProducts,
  getByBrandAndCategory,
  getByCategory,
  getByMaxPrice,
  getByMinQuantity
} from '../services/api'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('All products')

  const loadAll = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await getAllProducts()
      setProducts(Array.isArray(data) ? data : [])
      setStatus('All products')
    } catch (err) {
      setError(explainApiError(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  const applyFilter = async ({ mode, category, brand, price, quantity }) => {
    setLoading(true)
    setError('')

    try {
      let response

      if (mode === 'category') {
        response = await getByCategory(category)
        setStatus(`Category: ${category}`)
      } else if (mode === 'brandCategory') {
        response = await getByBrandAndCategory(brand, category)
        setStatus(`${brand} · ${category}`)
      } else if (mode === 'price') {
        response = await getByMaxPrice(price)
        setStatus(`Price under $${price}`)
      } else if (mode === 'quantity') {
        response = await getByMinQuantity(quantity)
        setStatus(`Quantity above ${quantity}`)
      } else if (mode === 'available') {
        response = await getAvailableProducts()
        setStatus('Available products')
      } else {
        return loadAll()
      }

      setProducts(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      setProducts([])
      setError(explainApiError(err))
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (product) => {
    const ok = window.confirm(`Delete "${product.name}"?`)
    if (!ok) return

    try {
      await deleteProduct(product.id)
      setProducts((current) => current.filter((p) => p.id !== product.id))
    } catch (err) {
      setError(explainApiError(err))
    }
  }

  return (
    <>
      <section className="hero-panel mb-4">
        <div>
          <span className="eyebrow">SPRING BOOT + REACT</span>
          <h1 className="display-6 fw-bold mb-2">Product Management Dashboard</h1>
          <p className="text-secondary mb-0">
            Manage inventory, pricing, availability, categories, brands, and product images.
          </p>
        </div>
        <Link to="/products/new" className="btn btn-warning fw-semibold">
          <i className="bi bi-plus-circle me-2"></i>
          Add Product
        </Link>
      </section>

      <Filters onApply={applyFilter} onReset={loadAll} busy={loading} />

      <AlertMessage message={error} onClose={() => setError('')} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 mb-0">{status}</h2>
        <span className="badge rounded-pill text-bg-light border">
          {products.length} result{products.length === 1 ? '' : 's'}
        </span>
      </div>

      {loading ? (
        <LoadingSpinner text="Loading products..." />
      ) : products.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-box-seam fs-1"></i>
          <h3 className="h5 mt-3">No products found</h3>
          <p className="text-secondary">Try another filter or add your first product.</p>
        </div>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <ProductCard product={product} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}
