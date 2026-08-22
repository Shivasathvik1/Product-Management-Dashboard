import { useState } from 'react'

const categories = ['Electronics','Clothing','Home & Kitchen','Beauty','Sports','Books','Accessories']
const brands = ['Apple','Samsung','Google','Sony','Nike','Adidas','Lenovo','Dell','JBL','Anker','KitchenAid','Dyson']

export default function Filters({ onApply, onReset, busy }) {
  const [mode,setMode]=useState('all')
  const [category,setCategory]=useState('')
  const [brand,setBrand]=useState('')
  const [price,setPrice]=useState('')
  const [quantity,setQuantity]=useState('')

  const reset=()=>{setMode('all');setCategory('');setBrand('');setPrice('');setQuantity('');onReset()}

  return (
    <form className="card border-0 shadow-sm p-3 mb-4 filter-card" onSubmit={(e)=>{e.preventDefault();onApply({mode,category,brand,price,quantity})}}>
      <div className="row g-3 align-items-end">
        <div className="col-md-3">
          <label className="form-label fw-semibold">Filter type</label>
          <select className="form-select" value={mode} onChange={(e)=>setMode(e.target.value)}>
            <option value="all">All products</option><option value="category">Category</option><option value="brandCategory">Brand + category</option><option value="price">Price less than</option><option value="quantity">Quantity greater than</option><option value="available">Available only</option>
          </select>
        </div>
        {(mode==='category'||mode==='brandCategory') && <div className="col-md-3"><label className="form-label fw-semibold">Category</label><select className="form-select" value={category} onChange={(e)=>setCategory(e.target.value)} required><option value="">Choose category</option>{categories.map(x=><option key={x}>{x}</option>)}</select></div>}
        {mode==='brandCategory' && <div className="col-md-3"><label className="form-label fw-semibold">Brand</label><select className="form-select" value={brand} onChange={(e)=>setBrand(e.target.value)} required><option value="">Choose brand</option>{brands.map(x=><option key={x}>{x}</option>)}</select></div>}
        {mode==='price' && <div className="col-md-3"><label className="form-label fw-semibold">Maximum price</label><select className="form-select" value={price} onChange={(e)=>setPrice(e.target.value)} required><option value="">Choose price</option>{[25,50,100,250,500,1000,2000].map(x=><option key={x} value={x}>Under ${x}</option>)}</select></div>}
        {mode==='quantity' && <div className="col-md-3"><label className="form-label fw-semibold">Minimum quantity</label><select className="form-select" value={quantity} onChange={(e)=>setQuantity(e.target.value)} required><option value="">Choose quantity</option>{[0,5,10,25,50].map(x=><option key={x} value={x}>More than {x}</option>)}</select></div>}
        <div className="col-md-auto"><button className="btn btn-dark me-2" disabled={busy}><i className="bi bi-funnel me-1"></i>Apply</button><button type="button" className="btn btn-outline-secondary" onClick={reset}>Reset</button></div>
      </div>
    </form>
  )
}
