import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

const categories = ['Electronics','Clothing','Home & Kitchen','Beauty','Sports','Books','Accessories']

export default function Navbar() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const { theme, toggleTheme } = useTheme()

  const submitSearch = (e) => {
    e.preventDefault()
    const trimmed = query.trim()
    if (trimmed) navigate(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
      <div className="container-fluid px-lg-4">
        <NavLink className="navbar-brand fw-bold me-3" to="/">
          <i className="bi bi-bag-check me-2"></i>ShopBoard
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#shopboardNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="shopboardNav">
          <form className="d-flex flex-grow-1 mx-lg-3 my-3 my-lg-0" onSubmit={submitSearch}>
            <div className="input-group search-group">
              <span className="input-group-text bg-white border-end-0"><i className="bi bi-search"></i></span>
              <input className="form-control border-start-0" placeholder="Search products, brands, categories..." value={query} onChange={(e)=>setQuery(e.target.value)} />
              <button className="btn btn-warning fw-semibold">Search</button>
            </div>
          </form>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <div className="dropdown">
              <button className="btn btn-outline-light btn-sm dropdown-toggle" data-bs-toggle="dropdown">Categories</button>
              <ul className="dropdown-menu dropdown-menu-end">
                {categories.map((category)=>(
                  <li key={category}><NavLink className="dropdown-item" to={`/category/${encodeURIComponent(category)}`}>{category}</NavLink></li>
                ))}
              </ul>
            </div>
            <button className="btn btn-outline-light btn-sm" onClick={toggleTheme}>
              <i className={`bi ${theme === 'light' ? 'bi-moon-stars' : 'bi-sun'} me-1`}></i>{theme === 'light' ? 'Dark' : 'Light'}
            </button>
            <NavLink className="btn btn-warning btn-sm fw-semibold" to="/products/new"><i className="bi bi-plus-lg me-1"></i>Add Product</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}
