import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000
})

export const getAllProducts = () => api.get('/products')
export const getProductById = (id) => api.get(`/products/${id}`)

export const createProduct = (product, imageFile) => {
  if (!imageFile) {
    return api.post('/products', product, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const formData = new FormData()
  formData.append(
    'product',
    new Blob([JSON.stringify(product)], { type: 'application/json' })
  )
  formData.append('imageFile', imageFile)

  return api.post('/products', formData)
}

export const updateProduct = (id, product, imageFile) => {
  if (!imageFile) {
    return api.put(`/products/${id}`, product, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const formData = new FormData()
  formData.append(
    'product',
    new Blob([JSON.stringify(product)], { type: 'application/json' })
  )
  formData.append('imageFile', imageFile)

  return api.put(`/products/${id}`, formData)
}

export const deleteProduct = (id) => api.delete(`/products/${id}`)

export const getByCategory = (category) =>
  api.get(`/products/category/${encodeURIComponent(category)}`)

export const getByBrandAndCategory = (brand, category) =>
  api.get(
    `/products/search/${encodeURIComponent(brand)}/${encodeURIComponent(category)}`
  )

export const getByMaxPrice = (price) => api.get(`/products/price/${price}`)

export const getByMinQuantity = (quantity) =>
  api.get(`/products/quantity/${quantity}`)

export const getAvailableProducts = () => api.get('/products/available')

export const getProductImageUrl = (id) =>
  `${API_BASE_URL}/products/${id}/image`

export const explainApiError = (error) => {
  if (error?.response) {
    const status = error.response.status
    const backendMessage =
      error.response.data?.message ||
      error.response.data?.error ||
      (typeof error.response.data === 'string' ? error.response.data : '')

    if (status === 400) return backendMessage || 'Bad request. Check the product data.'
    if (status === 404) return backendMessage || 'Product not found.'
    if (status >= 500) return backendMessage || 'Backend server error.'
    return backendMessage || `Request failed with status ${status}.`
  }

  if (error?.request) {
    return 'Could not reach the Spring Boot backend. Make sure it is running on port 8080.'
  }

  return error?.message || 'Something went wrong.'
}

export default api
