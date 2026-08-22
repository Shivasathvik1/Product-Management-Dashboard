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
  if (!imageFile) {
    return api.post('/products', product, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const formData = new FormData()

  formData.append(
    'product',
    new Blob(
      [JSON.stringify(product)],
      { type: 'application/json' }
    )
  )

  formData.append('imageFile', imageFile)

  return api.post('/products', formData)
}

// =========================
// UPDATE PRODUCT
// =========================
export const updateProduct = (id, product, imageFile) => {
  if (!imageFile) {
    return api.put(`/products/${id}`, product, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

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
// Works locally + Vercel + Render
// =========================
export const getProductImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return null
  }

  // Already a complete URL
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }

  // Images uploaded to Spring Boot
  // Example: /uploads/12345_image.png
  if (imageUrl.startsWith('/uploads/')) {
    const backendUrl = API_BASE_URL.replace(/\/api\/?$/, '')
    return `${backendUrl}${imageUrl}`
  }

  // Seeded images stored in:
  // React -> public/product-images
  // Example: /product-images/001-iphone-17.png
  if (imageUrl.startsWith('/product-images/')) {
    return imageUrl
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
    return 'Could not connect to the backend server. Please try again.'
  }

  return (
    error?.message ||
    'Something went wrong.'
  )
}

export default api
