# CartFlow | Full-Stack Shopping Cart System

A production-ready Full Stack Shopping Cart System built with **Laravel 11**, **Next.js 15**, **Redux Toolkit**, and **Firebase Authentication**.

## 🚀 Key Features & Implementation

This project was built to meet high-level engineering standards, focusing on performance, security, and state management.

### 1. Authentication (Firebase & Google)
- **Integration**: Uses Firebase SDK on the frontend for Google Sign-in.
- **Security**: Stateless authentication using Firebase ID Tokens.
- **Backend Sync**: A custom Laravel middleware (`FirebaseAuthMiddleware`) verifies tokens on every request using the Firebase Admin SDK.
- **Session**: Configured with `browserSessionPersistence` to ensure security (requires login for new browser sessions).

### 2. State Management (Redux Toolkit & RTK Query)
- **Instant UI**: All cart actions (Add, Increment, Decrement, Remove) update the Redux state **instantly**, providing a lag-free user experience.
- **API Communication**: Uses **RTK Query** for efficient data fetching, caching, and background synchronization.

### 3. API Optimization (Batch Sync)
- **Requirement Met**: The system does **NOT** call the API for every single quantity change.
- **Implementation**: A global `CartSyncManager` component uses a **debounced (2.5s)** synchronization strategy. It groups multiple rapid changes into a single `POST /api/cart/batch-update` request.
- **Efficiency**: Uses deep equality checks to prevent unnecessary network traffic.

### 4. Persistence (No LocalStorage)
- **Requirement Met**: `localStorage` is **NOT** used for cart persistence.
- **Implementation**: On application load, the cart state is retrieved directly from the Laravel API. This ensures data consistency across different devices and browsers.

---

## 🛠️ Technical Stack

- **Backend**: Laravel 11, PHP 8.2+, MySQL.
- **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS.
- **State**: Redux Toolkit (RTK), RTK Query.
- **Auth**: Firebase Authentication (Google Sign-in).

---

## ⚙️ Setup Instructions

### Backend Setup (Laravel)

1.  **Navigate & Install**:
    ```bash
    cd backend
    composer install
    ```
2.  **Environment**:
    ```bash
    cp .env.example .env
    # Configure DB_DATABASE, DB_USERNAME, DB_PASSWORD
    # Add FIREBASE_PROJECT_ID=your-project-id
    # Add FIREBASE_CREDENTIALS=storage/firebase/service-account.json
    ```
3.  **Firebase Credentials**: Place your Firebase Service Account JSON at `backend/storage/firebase/service-account.json`.
4.  **Initialize**:
    ```bash
    php artisan key:generate
    php artisan migrate --seed
    ```
5.  **Run**:
    ```bash
    php artisan serve --port=8070
    ```

### Frontend Setup (Next.js)

1.  **Navigate & Install**:
    ```bash
    cd frontend
    npm install
    ```
2.  **Environment**: Create `.env.local`:
    ```env
    NEXT_PUBLIC_API_URL=http://127.0.0.1:8070/api
    NEXT_PUBLIC_FIREBASE_API_KEY=your-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    NEXT_PUBLIC_FIREBASE_APP_ID=
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
    ```
3.  **Run**:
    ```bash
    npm run dev -- -p 3001
    ```

---

## 📡 API Endpoints & Postman

### Postman Collection
A complete Postman collection is included in the repository to help you test the API endpoints.
- **File**: `backend/CartFlow_API.postman_collection.json`
- **How to use**:
    1. Open Postman.
    2. Click **Import** and select the JSON file.
    3. Configure the `base_url` variable (defaults to `http://127.0.0.1:8070/api`).
    4. For protected routes, update the `firebase_token` variable with a valid ID token from the frontend.

### Authentication
- `POST /api/auth`: Verifies Firebase Token and syncs user data.

### Products
- `GET /api/products`: Retrieves all products.
- `GET /api/products/{id}`: Retrieves a specific product.

### Cart (Protected)
- `GET /api/cart`: Fetches the current user's cart.
- `POST /api/cart`: Add/update single item.
- `PATCH /api/cart/{id}`: Update item quantity.
- `DELETE /api/cart/{id}`: Remove item.
- `POST /api/cart/batch-update`: Synchronizes the entire frontend cart with the database in one call.

---

## 📂 Project Structure

```text
cart-system/
├── backend/            # Laravel API
│   ├── app/Http/       # Controllers & Middleware
│   ├── database/       # Migrations & Seeders
│   └── storage/        # Firebase Credentials
└── frontend/           # Next.js Application
    ├── src/components/ # UI & Logic (Sync Manager)
    ├── src/features/   # Redux Slices & RTK Query
    └── src/app/        # Pages & Layouts
```
