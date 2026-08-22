import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import AlertMessage from '../components/AlertMessage'
import { deleteProduct, explainApiError, getAllProducts } from '../services/api'

export default function SearchResults(){
  const location=useLocation(); const query=new URLSearchParams(location.search).get('q')?.trim()||''
  const [products,setProducts]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState('')
  useEffect(()=>{(async()=>{try{const {data}=await getAllProducts();setProducts(Array.isArray(data)?data:[])}catch(e){setError(explainApiError(e))}finally{setLoading(false)}})()},[])
  const results=useMemo(()=>{const q=query.toLowerCase();return q?products.filter(p=>[p.name,p.brand,p.category,p.description].filter(Boolean).some(v=>String(v).toLowerCase().includes(q))):[]},[products,query])
  const handleDelete=async(product)=>{if(!window.confirm(`Delete "${product.name}"?`))return;try{await deleteProduct(product.id);setProducts(p=>p.filter(x=>x.id!==product.id))}catch(e){setError(explainApiError(e))}}
  return <><div className="mb-4"><span className="eyebrow">SEARCH</span><h1 className="h2">Results for “{query}”</h1><p className="text-secondary">{results.length} matching products</p></div><AlertMessage message={error}/>{loading?<LoadingSpinner text="Searching products..."/>:results.length===0?<div className="empty-state"><i className="bi bi-search fs-1"></i><h3 className="h5 mt-3">No matching products</h3><p className="text-secondary">Try another product name, brand, or category.</p></div>:<div className="row g-4">{results.map(product=><div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}><ProductCard product={product} onDelete={handleDelete}/></div>)}</div>}</>
}
