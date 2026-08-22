import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import AlertMessage from '../components/AlertMessage'
import { deleteProduct, explainApiError, getByCategory } from '../services/api'

export default function CategoryPage(){
  const {category}=useParams(); const decoded=decodeURIComponent(category)
  const [products,setProducts]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState('')
  useEffect(()=>{(async()=>{setLoading(true);try{const {data}=await getByCategory(decoded);setProducts(Array.isArray(data)?data:[])}catch(e){setError(explainApiError(e))}finally{setLoading(false)}})()},[decoded])
  const handleDelete=async(product)=>{if(!window.confirm(`Delete "${product.name}"?`))return;try{await deleteProduct(product.id);setProducts(p=>p.filter(x=>x.id!==product.id))}catch(e){setError(explainApiError(e))}}
  return <><div className="category-hero mb-4"><div><span className="eyebrow">CATEGORY</span><h1 className="display-6 fw-bold mb-2">{decoded}</h1><p className="text-secondary mb-0">Browse all products in {decoded}.</p></div><Link to="/" className="btn btn-outline-secondary">All Products</Link></div><AlertMessage message={error}/>{loading?<LoadingSpinner text={`Loading ${decoded}...`}/>:products.length===0?<div className="empty-state"><i className="bi bi-box-seam fs-1"></i><h3 className="h5 mt-3">No products in this category</h3></div>:<div className="row g-4">{products.map(product=><div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}><ProductCard product={product} onDelete={handleDelete}/></div>)}</div>}</>
}
