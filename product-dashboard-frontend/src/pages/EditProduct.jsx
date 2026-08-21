import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import LoadingSpinner from '../components/LoadingSpinner'
import AlertMessage from '../components/AlertMessage'
import {
  explainApiError,
  getProductById,
  updateProduct
} from '../services/api'

export default function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getProductById(id)
        setProduct(data)
      } catch (err) {
        setError(explainApiError(err))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleSubmit = async (updatedProduct, imageFile) => {
    setBusy(true)
    setError('')
    try {
      await updateProduct(id, updatedProduct, imageFile)
      navigate(`/products/${id}`)
    } catch (err) {
      setError(explainApiError(err))
    } finally {
      setBusy(false)
    }
  }

  if (loading) return <LoadingSpinner text="Loading product..." />

  if (!product) {
    return <AlertMessage message={error || 'Product not found.'} />
  }

  return (
    <div className="page-narrow">
      <div className="mb-4">
        <span className="eyebrow">INVENTORY</span>
        <h1 className="h2">Edit product</h1>
        <p className="text-secondary">Update product #{id}.</p>
      </div>

      <AlertMessage message={error} />
      <ProductForm
        initialValue={product}
        onSubmit={handleSubmit}
        submitLabel="Update Product"
        busy={busy}
      />
    </div>
  )
}
