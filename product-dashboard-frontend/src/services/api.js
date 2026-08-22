import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000
})

// =========================
// GET ALL PRODUCTS
// =========================
export const getAllProducts = () => {
  return api.get('/products')
}

// =========================
// GET PRODUCT BY ID
// =========================
export const getProductById = (id) => {
  return api.get(`/products/${id}`)
}

// =========================
// CREATE PRODUCT
// Product + optional image
// =========================
export const createProduct = (product, imageFile) => {
  const formData = new FormData()

  formData.append(
    'product',
    new Blob(
      [JSON.stringify(product)],
      { type: 'application/json' }
    )
  )

  if (imageFile) {
    formData.append('imageFile', imageFile)
  }

  return api.post('/products', formData)
}

// =========================
// UPDATE PRODUCT
// =========================
export const updateProduct = (id, product, imageFile) => {
  if (imageFile) {
    const formData = new FormData()

    formData.append(
      'product',
      new Blob(
        [JSON.stringify(product)],
        { type: 'application/json' }
      )
    )

    formData.append('imageFile', imageFile)

    return api.put(`/products/${id}`, formData)
  }

  return api.put(`/products/${id}`, product, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// =========================
// DELETE PRODUCT
// =========================
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`)
}

// =========================
// FILTER BY CATEGORY
// =========================
export const getByCategory = (category) => {
  return api.get(
    `/products/category/${encodeURIComponent(category)}`
  )
}

// =========================
// FILTER BY BRAND + CATEGORY
// =========================
export const getByBrandAndCategory = (brand, category) => {
  return api.get(
    `/products/search/${encodeURIComponent(brand)}/${encodeURIComponent(category)}`
  )
}

// =========================
// PRODUCTS BELOW PRICE
// =========================
export const getByMaxPrice = (price) => {
  return api.get(`/products/price/${price}`)
}

// =========================
// PRODUCTS ABOVE QUANTITY
// =========================
export const getByMinQuantity = (quantity) => {
  return api.get(`/products/quantity/${quantity}`)
}

// =========================
// AVAILABLE PRODUCTS
// =========================
export const getAvailableProducts = () => {
  return api.get('/products/available')
}

// =========================
// PRODUCT IMAGE URL
// Handles both old seeded images
// and new uploaded images
// =========================
export const getProductImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return null
  }

  // Full external URL
  if (imageUrl.startsWith('http')) {
    return imageUrl
  }

  // New images uploaded through Spring Boot
  if (imageUrl.startsWith('/uploads/')) {
    return `http://localhost:8080${imageUrl}`
  }

  // First 100 seeded images
  // stored in React public/product-images
  if (imageUrl.startsWith('/product-images/')) {
    return `http://localhost:5173${imageUrl}`
  }

  return imageUrl
}

// =========================
// ERROR HANDLING
// =========================
export const explainApiError = (error) => {
  if (error?.response) {
    const status = error.response.status

    const backendMessage =
      error.response.data?.message ||
      error.response.data?.error ||
      (typeof error.response.data === 'string'
        ? error.response.data
        : '')

    if (status === 400) {
      return (
        backendMessage ||
        'Bad request. Please check the product data.'
      )
    }

    if (status === 404) {
      return (
        backendMessage ||
        'Product not found.'
      )
    }

    if (status >= 500) {
      return (
        backendMessage ||
        'Backend server error.'
      )
    }

    return (
      backendMessage ||
      `Request failed with status ${status}.`
    )
  }

  if (error?.request) {
    return 'Could not connect to the Spring Boot backend. Make sure it is running on port 8080.'
  }

  return (
    error?.message ||
    'Something went wrong.'
  )
}

export default api