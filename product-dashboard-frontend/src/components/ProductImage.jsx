import { useEffect, useState } from 'react'
import { getProductImageUrl } from '../services/api'

export default function ProductImage({ product, className = '', alt }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [product?.id, product?.imageUrl])

  const src = getProductImageUrl(product?.imageUrl)

  if (!src || failed) {
    return (
      <div className={`product-image-placeholder ${className}`}>
        <i className="bi bi-image fs-1"></i>
        <span>No image</span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt || product?.name || 'Product'}
      onError={() => setFailed(true)}
    />
  )
}
