# ShopBoard — React Product Dashboard

A GitHub-ready React + Vite + Bootstrap frontend for a Spring Boot Product Management REST API.

## Features

- Product dashboard
- Product cards with images
- Product details page
- Add product
- Edit product
- Delete product
- Loading and API error states
- 404 handling
- Filter by category
- Filter by brand + category
- Filter by maximum price
- Filter by minimum quantity
- Available-products filter
- Responsive Bootstrap UI
- Centralized Axios API service
- Optional image upload support

## Tech Stack

- React
- Vite
- Bootstrap
- Bootstrap Icons
- Axios
- React Router

## Backend API Expected

Base URL:

```text
http://localhost:8080/api
```

Endpoints used:

```text
GET     /products
GET     /products/{id}
POST    /products
PUT     /products/{id}
DELETE  /products/{id}

GET     /products/category/{category}
GET     /products/search/{brand}/{category}
GET     /products/price/{price}
GET     /products/quantity/{quantity}
GET     /products/available

GET     /products/{id}/image
```

## Product Shape

```json
{
  "id": 1,
  "name": "iPhone 17",
  "brand": "Apple",
  "description": "Example description",
  "price": 999.99,
  "category": "Electronics",
  "quantity": 15,
  "available": true
}
```

## Important: Image Upload Backend Contract

Your current CRUD controller can work with JSON when no image is selected.

When an image is selected, this frontend sends `multipart/form-data` with:

```text
product   -> JSON Blob
imageFile -> uploaded image
```

That means your Spring Boot POST/PUT controller must support multipart requests, for example conceptually:

```java
@RequestPart("product") Product product
@RequestPart("imageFile") MultipartFile imageFile
```

The frontend also expects product images to be readable from:

```text
GET /api/products/{id}/image
```

If you choose a different image endpoint or field names, update `src/services/api.js`.

## CORS

If React runs on:

```text
http://localhost:5173
```

your Spring Boot backend must allow that origin.

One simple development option is:

```java
@CrossOrigin(origins = "http://localhost:5173")
```

on the controller.

For larger applications, prefer global CORS configuration.

## Run Locally

1. Install Node.js.
2. Open this frontend folder.
3. Run:

```bash
npm install
npm run dev
```

4. Start the Spring Boot backend on port `8080`.
5. Open the Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

## Environment Variable

Copy:

```text
.env.example
```

to:

```text
.env
```

Then configure:

```text
VITE_API_BASE_URL=http://localhost:8080/api
```

## Build for Production

```bash
npm run build
```

## GitHub

Suggested repository structure:

```text
springboot-react-product-management/
├── backend/
└── frontend/
```

You can put this generated folder inside `frontend/` and your Spring Boot project inside `backend/`.

## Next Improvements

Good portfolio upgrades after the base project works:

- Bean Validation with `@Valid`
- Global exception handling with `@ControllerAdvice`
- DTOs instead of exposing JPA entities directly
- MySQL/PostgreSQL instead of H2
- Search by product name
- Pagination and sorting
- Authentication with Spring Security + JWT
- Unit/integration tests
- Deployment


## Frontend v2 Features
- Light / dark theme toggle with saved preference
- Global search bar for name, brand, category and description
- Dropdown filter controls
- Navbar category dropdown
- Dedicated category pages
