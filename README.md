# ✅ ShopSphere - E-Commerce Frontend

🛍️ A modern, responsive e-commerce web application built with React, TypeScript, Material UI, and Context API. Browse products, manage your shopping cart, and complete purchases with an intuitive and beautiful interface!

## 📋 Table of Contents
- [✨ Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🏗️ Project Structure](#️-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🎨 UI/UX Design](#-uiux-design)
- [👥 Contributing](#-contributing)

## ✨ Features

### 🛒 Complete Shopping Experience
- Browse products with filtering, sorting, and search capabilities
- View detailed product information with images and specifications
- Add items to cart with quantity selection and real-time total calculation

### 👤 User Account Management
- Secure registration and login with JWT authentication
- Profile management with personal information updates
- Order history tracking and status monitoring

### 💳 Checkout & Payments
- Streamlined checkout process with address selection
- Secure payment integration with Stripe
- Order confirmation and email notifications

### 📊 Admin Dashboard
- Comprehensive product management (add, edit, delete)
- Order processing and status updates
- User management and analytics

### 📱 Responsive Design
- Fully optimized for all devices from mobile to desktop
- Adaptive layouts for different screen sizes
- Touch-friendly interface for mobile users

## 🛠️ Technologies Used

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react) — Component-based UI for fast, interactive experiences

![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?style=for-the-badge&logo=typescript) — Type safety and modern JS features

![Material UI](https://img.shields.io/badge/Material_UI-7.2-0081CB?style=for-the-badge&logo=mui) — Comprehensive UI component library

![React Router](https://img.shields.io/badge/React_Router-7.6-CA4245?style=for-the-badge&logo=react-router) — Declarative routing for React

![Axios](https://img.shields.io/badge/Axios-1.10-5A29E4?style=for-the-badge&logo=axios) — HTTP client for API integration

![Context API](https://img.shields.io/badge/Context_API-Built_in-61DAFB?style=for-the-badge&logo=react) — State management solution

![React Lazy Load](https://img.shields.io/badge/React_Lazy_Load-1.6-61DAFB?style=for-the-badge&logo=react) — Performance optimization

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and icons
│   ├── components/         # UI Components (Header, ProductCard, etc.)
│   ├── contexts/           # React Context providers
│   │   ├── AuthContext.tsx # Authentication state management
│   │   └── CartContext.tsx # Shopping cart state management
│   ├── pages/              # Application pages
│   │   ├── Home.tsx        # Landing page
│   │   ├── Products.tsx    # Product listings
│   │   ├── Cart.tsx        # Shopping cart
│   │   └── ...             # Other pages
│   ├── services/           # API services
│   ├── types/              # TypeScript definitions
│   ├── App.tsx             # Main app component with routing
│   └── index.tsx           # Application entry point
├── package.json            # Project metadata and dependencies
└── tsconfig.json           # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- ShopSphere Backend API running

### Clone the repository
```bash
git clone https://github.com/yourusername/shopsphere.git
cd shopsphere/frontend
```

### Install dependencies
```bash
npm install
```

### Configure environment
Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Run the development server
```bash
npm start
```

### Open in your browser
```
http://localhost:3000
```

## 🎨 UI/UX Design

The application features a custom Material UI theme inspired by the Italian flag colors:

- **Primary Color**: Green (#1B8A5A) — Represents growth and prosperity
- **Secondary Color**: Red (#D32F2F) — Adds vibrant accents for calls-to-action
- **Background**: Light teal (#B2DFDB) and white — Creates a clean, fresh shopping experience

Design elements include:
- Elevated card design with subtle hover effects
- Custom typography with Inter font family
- Consistent iconography and visual hierarchy
- Smooth animations and transitions

## 👥 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

Made with ❤️ by Pedro
