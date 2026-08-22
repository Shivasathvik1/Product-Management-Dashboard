import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import ProductDetails from './pages/ProductDetails'
import CategoryPage from './pages/CategoryPage'
import SearchResults from './pages/SearchResults'
import NotFound from './pages/NotFound'

export default function App(){return <div className="app-shell"><Navbar/><main className="container-fluid px-lg-4 py-4"><Routes><Route path="/" element={<Home/>}/><Route path="/search" element={<SearchResults/>}/><Route path="/category/:category" element={<CategoryPage/>}/><Route path="/products/new" element={<AddProduct/>}/><Route path="/products/:id" element={<ProductDetails/>}/><Route path="/products/:id/edit" element={<EditProduct/>}/><Route path="*" element={<NotFound/>}/></Routes></main></div>}
