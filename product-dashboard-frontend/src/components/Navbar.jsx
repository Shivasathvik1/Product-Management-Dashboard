import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          <i className="bi bi-bag-check me-2"></i>
          ShopBoard
        </NavLink>

        <div className="ms-auto d-flex gap-2">
          <NavLink className="btn btn-outline-light btn-sm" to="/">
            Products
          </NavLink>
          <NavLink className="btn btn-warning btn-sm fw-semibold" to="/products/new">
            <i className="bi bi-plus-lg me-1"></i>
            Add Product
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
