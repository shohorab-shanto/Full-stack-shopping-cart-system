# Full Stack Shopping Cart System

A production-ready Full Stack Shopping Cart System built with Laravel, Next.js, Redux Toolkit, and Firebase Authentication.

## Features

- **Authentication**: Firebase Authentication with Google Sign-in.
- **Product Management**: API endpoints for retrieving products.
- **Cart Management**: Add, update, remove, and sync cart items.
- **Optimistic Updates**: Redux updates instantly for a smooth UI experience.
- **Debounced Synchronization**: Batch API requests for efficient cart syncing.
- **Persistence**: Cart persists across page reloads using the backend.

## Tech Stack

- **Backend**: Laravel 10+, MySQL, Eloquent ORM, RESTful API.
- **Frontend**: Next.js (App Router), Redux Toolkit, RTK Query, Lucide React.
- **Authentication**: Firebase Admin SDK (Backend), Firebase SDK (Frontend).

## Prerequisites

- PHP 8.1+
- Composer
- Node.js & npm
- MySQL
- Firebase Project

## Getting Started

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    composer install
    ```
3.  Copy `.env.example` to `.env` and configure your database and Firebase:
    ```bash
    copy .env.example .env
    ```
    - `DB_DATABASE=cart_system`
    - `DB_USERNAME=root`
    - `DB_PASSWORD=`
    - `FIREBASE_CREDENTIALS=path/to/your/firebase-service-account.json`
4.  Generate application key:
    ```bash
    php artisan key:generate
    ```
5.  Run migrations and seeders:
    ```bash
    php artisan migrate --seed
    ```
6.  Start the Laravel development server:
    ```bash
    php artisan serve
    ```

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Copy `.env.local.example` to `.env.local` and configure your Firebase settings:
    ```bash
    copy .env.local.example .env.local
    ```
    - `NEXT_PUBLIC_API_URL=http://127.0.0.1:8070/api`
4.  Start the Next.js development server:
    ```bash
    npm run dev
    ```

## API Documentation

### Auth

- **POST `/api/auth`**: Authenticate user and create/find in database.
  - Headers: `Authorization: Bearer <Firebase ID Token>`
  - Body: `{ name, email, avatar }`

### Products

- **GET `/api/products`**: Get paginated list of products.
- **GET `/api/products/{id}`**: Get a single product.

### Cart

- **GET `/api/cart`**: Get user's cart items.
- **POST `/api/cart`**: Add item to cart.
  - Body: `{ product_id, quantity }`
- **PATCH `/api/cart/{id}`**: Update item quantity.
  - Body: `{ quantity }`
- **DELETE `/api/cart/{id}`**: Remove item from cart.
- **POST `/api/cart/batch-update`**: Batch update cart items (Debounced Sync).
  - Body: `{ items: [{ product_id, quantity }, ...] }`

## Firebase Setup

1.  Create a project on the [Firebase Console](https://console.firebase.google.com/).
2.  Enable **Google Sign-in** in the Authentication section.
3.  Go to **Project Settings** > **Service accounts** and click **Generate new private key** to download the JSON file for the backend.
4.  Go to **Project Settings** > **General** and create a **Web app** to get the configuration for the frontend.

## License

MIT
