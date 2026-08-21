import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'

export default function ProductCard({ product, onDelete }) {
  return (
    <div className="card h-100 product-card shadow-sm">
      <ProductImage
        product={product}
        className="card-img-top product-card-image"
      />

      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <div>
            <h5 className="card-title mb-1">{product.name}</h5>
            <div className="text-secondary small">{product.brand || 'No brand'}</div>
          </div>

          <span className={`badge ${product.available ? 'text-bg-success' : 'text-bg-secondary'}`}>
            {product.available ? 'Available' : 'Unavailable'}
          </span>
        </div>

        <p className="card-text text-secondary mt-3 product-description">
          {product.description || 'No description provided.'}
        </p>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-bold fs-5">
              ${Number(product.price || 0).toFixed(2)}
            </span>
            <span className="small text-secondary">
              Qty: {product.quantity ?? 0}
            </span>
          </div>

          <div className="d-grid gap-2">
            <Link className="btn btn-dark" to={`/products/${product.id}`}>
              View Details
            </Link>
            <div className="d-flex gap-2">
              <Link
                className="btn btn-outline-primary flex-fill"
                to={`/products/${product.id}/edit`}
              >
                Edit
              </Link>
              <button
                className="btn btn-outline-danger flex-fill"
                onClick={() => onDelete(product)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
