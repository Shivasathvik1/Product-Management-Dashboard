\# Product Management Dashboard



A full-stack Product Management Dashboard built with \*\*Java, Spring Boot, React, REST API, H2, Docker, Vercel, and Render\*\*.



I built this project to practice Spring Boot and understand how a frontend and backend work together.



\## Live Demo



Frontend:  

https://product-management-dashboard-ashen.vercel.app/



Backend API:  

`https://product-management-dashboard-knao.onrender.com/api/products`



> The backend uses Render's free tier, so the first request may take some time after inactivity.



\## Features



\- View all products

\- Search products

\- Filter by category, brand, price, quantity, and availability

\- View product details

\- Add, update, and delete products

\- Product image support

\- Light/Dark theme



\## Tech Stack



\*\*Backend:\*\* Java, Spring Boot, Spring Data JPA, H2, Maven  

\*\*Frontend:\*\* React, Vite, Axios, React Router, Bootstrap  

\*\*Deployment:\*\* GitHub, Docker, Render, Vercel



\## Architecture



```text

React

&#x20; ↓

REST API

&#x20; ↓

Spring Boot

&#x20; ↓

Service

&#x20; ↓

Repository

&#x20; ↓

H2 Database

```



\## Main APIs



```text

GET    /api/products

GET    /api/products/{id}

POST   /api/products

PUT    /api/products/{id}

DELETE /api/products/{id}

```



\## How I Used AI



The project idea, backend, APIs, requirements, integration, debugging, and deployment were handled by me.



I used ChatGPT as a development assistant to help generate and improve parts of the React frontend based on my requirements.



\## What I Learned



\- Spring Boot layered architecture

\- REST API development

\- CRUD operations

\- Spring Data JPA

\- React and Axios integration

\- Search and filtering

\- Image handling

\- CORS

\- Git and GitHub

\- Docker

\- Vercel and Render deployment



\## Run Locally



Backend:



```bash

./mvnw spring-boot:run

```



Frontend:



```bash

cd product-dashboard-frontend

npm install

npm run dev

```



\## Note



This is a learning and portfolio project. It currently uses an H2 in-memory database and Render free-tier hosting.

