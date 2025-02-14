# Vendora
A mock e-commerce site built for hands-on learning with Django and React. The project aims to provide a fully functional e-commerce experience, from browsing products to completing purchases, while exploring different technologies and development practices.

**Note:** 
- *The products shown on this site are not for sale.*
- *I will be using this youtube video tutorial for guidance: [video](https://www.youtube.com/watch?v=aPdgotL6Wuc&list=PL_KegS2ON4s6DqLCavZ3b8zUKP8j9T-zM&index=5)*


## Table of Contents
- [Tech Stack](#tech-stack)
- [Project Goals](#project-goals)
- [Features](#features)
- [Project Structure](#project-structure)
- [Planning and SDLC](#planning-and-sdlc)
  - [1. Requirements Analysis](#1-requirements-analysis)
  - [2. System Design](#2-system-design)
  - [3. Implementation](#3-implementation)
  - [4. Testing](#4-testing)
  - [5. Deployment](#5-deployment)
  - [6. Maintenance](#6-maintenance)
- [Future Plans](#future-plans)
- [Getting Started](#getting-started)
- [Contributing](#contributing)

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Django, Django REST Framework (DRF)
- **Database:** PostgreSQL
- **Payments:** Stripe or PayPal (TBD)
- **Storage:** AWS S3 for static files and media (TBD)
- **Hosting:** 
  - **Backend:** AWS, Heroku, or Railway (TBD)
  - **Frontend:** Vercel or Netlify
- **Containerization:** Docker (TBD)
- **Version Control:** Git, GitHub

## Open APIs
- [Open Street Map](https://www.openstreetmap.org/copyright)

## Project Goals
- **Learn and apply** Django and React together to build a full-stack web application.
- **Explore best practices** for developing, testing, and deploying an e-commerce app.
- **Understand integration** of third-party services like payment gateways (Stripe/PayPal).
- **Get hands-on experience** with deployment and cloud services.

## Features
- **User Authentication:** Allow users to register, log in, and manage their accounts.
- **Product Management:** List, search, and filter products with details like name, description, price, and category.
- **Shopping Cart:** Add, update, or remove items, and calculate total costs.
- **Checkout:** Process payments using Stripe or PayPal.
- **Order History:** View past orders and payment statuses.
- **Admin Dashboard:** Manage products, orders, and users (potentially using Django Admin).

## Project Structure
- **Frontend:** Organized into components, pages, and state management (using Context API or Redux, TBD).
- **Backend:** Django project split into different apps (e.g., `products`, `users`, `orders`).
- **API:** Built using Django REST Framework to provide endpoints for frontend interaction.

## Planning and SDLC
### 1. Requirements Analysis
- **Primary Goal:** Build a full-stack e-commerce application to learn Django and React.
- **Core Requirements:**
  - User management (authentication, profile management)
  - Product catalog
  - Shopping cart and checkout process
  - Payment integration
  - Admin features for managing products and orders

### 2. System Design
- **Frontend Architecture:** Use React components and Vite for a fast development setup. Design responsive and accessible interfaces using Tailwind CSS.
- **Backend Architecture:** Use Django for robust backend support and Django REST Framework for building APIs.
- **Database Schema:** Plan out models for `User`, `Product`, `Order`, `OrderItem`, etc.
- **Third-Party Services:** Integrate Stripe/PayPal for payments and AWS S3 for storing static files.
- **Version Control Strategy:** Use Git for source control and create separate branches for different features.

### 3. Implementation
- **Frontend Development:** 
  - Set up Vite and configure the development environment.
  - Create reusable components for common UI elements (e.g., product cards, forms).
  - Set up React Router for navigation.
- **Backend Development:** 
  - Create Django apps for different functionalities (users, products, orders).
  - Set up Django REST Framework for API endpoints.
  - Integrate PostgreSQL as the database.
  - Implement user authentication using Django's built-in user model.
- **Payment Integration:** 
  - Implement payment processing using Stripe or PayPal.
  - Secure payment transactions and store relevant order details.

### 4. Testing
- **Unit Testing:** Write tests for individual components, functions, and API endpoints.
- **Integration Testing:** Ensure seamless interaction between frontend and backend.
- **Manual Testing:** Perform exploratory testing to ensure a good user experience.
- **Tools:** Use testing libraries like Jest (frontend) and Django's built-in test framework (backend).

### 5. Deployment
- **Frontend Deployment:** Use Vercel or Netlify for continuous deployment.
- **Backend Deployment:** Deploy on AWS, Heroku, or Railway. Configure a CI/CD pipeline.
- **Containerization (Optional):** Use Docker to package the application for deployment.

### 6. Maintenance
- **Bug Fixes:** Address any issues that arise during usage.
- **Feature Enhancements:** Gradually introduce new features based on user feedback.
- **Tech Updates:** Keep dependencies up-to-date for security and performance.

## Future Plans
- **User Reviews and Ratings:** Allow users to leave reviews on products.
- **Inventory Management:** Add stock tracking for products.
- **Search Engine Optimization (SEO):** Improve site visibility on search engines.
- **Promotions and Discounts:** Implement a system for applying coupon codes.
- **Analytics Dashboard:** Track sales data and user behavior.
- **Internationalization:** Support multiple languages and currencies.
- **Progressive Web App (PWA):** Make the app installable and usable offline.

## Getting Started
1. **Clone the repository:** 
   ```bash
   git clone https://github.com/yourusername/vendora.git
To be continued...
