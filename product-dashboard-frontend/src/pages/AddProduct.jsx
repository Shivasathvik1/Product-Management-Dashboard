import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import AlertMessage from '../components/AlertMessage'
import { createProduct, explainApiError } from '../services/api'

export default function AddProduct() {
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (product, imageFile) => {
    setBusy(true)
    setError('')

    try {
      const { data } = await createProduct(product, imageFile)
      const id = data?.id
      navigate(id ? `/products/${id}` : '/')
    } catch (err) {
      setError(explainApiError(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="page-narrow">
      <div className="mb-4">
        <span className="eyebrow">INVENTORY</span>
        <h1 className="h2">Add product</h1>
        <p className="text-secondary">
          Create a new product record and optionally upload an image.
        </p>
      </div>

      <AlertMessage message={error} />
      <ProductForm onSubmit={handleSubmit} submitLabel="Create Product" busy={busy} />
    </div>
  )
}
