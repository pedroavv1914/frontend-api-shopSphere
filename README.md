# ShopSphere Frontend

<div align="center">
  <img src="src/assets/logo.svg" alt="ShopSphere Logo" width="200" />
  <h3>Modern E-Commerce Experience</h3>
</div>

## 📋 Overview

ShopSphere Frontend is a modern, responsive React application that provides an intuitive and engaging user interface for the ShopSphere e-commerce platform. Built with TypeScript and Material UI, it offers a seamless shopping experience with features like product browsing, cart management, user authentication, and order processing.

## ✨ Features

- **Responsive Design**: Fully optimized for all devices from mobile to desktop
- **User Authentication**: Secure login, registration, and profile management
- **Product Catalog**: Browse products with filtering and search capabilities
- **Shopping Cart**: Add, remove, and update items with real-time total calculation
- **Checkout Process**: Streamlined payment flow with Stripe integration
- **Order Management**: View and track order history and status
- **Admin Dashboard**: Comprehensive tools for product and order management (admin users)
- **Theme Customization**: Italian flag-inspired color scheme with green, white, and red accents

## 🛠️ Tech Stack

- **Core**: React 19 with TypeScript
- **State Management**: React Context API
- **UI Framework**: Material UI v7
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Performance Optimization**: Code splitting, lazy loading, and image optimization
- **Build Tool**: Create React App

## 🏗️ Project Structure

```
src/
├── assets/          # Static assets like images and icons
├── components/      # Reusable UI components
├── contexts/        # React contexts for state management
├── pages/           # Application pages/routes
├── services/        # API services and external integrations
├── types/           # TypeScript type definitions
├── utils/           # Utility functions and helpers
├── App.tsx          # Main application component
└── index.tsx        # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- ShopSphere Backend API running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shopsphere.git
   cd shopsphere/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## 🧪 Testing

Run the test suite with:

```bash
npm test
# or
yarn test
```

## 📦 Building for Production

Create an optimized production build with:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `build/` directory.

## 🎨 UI/UX Design

The application features a custom Material UI theme with:

- Primary color: Green (#1B8A5A)
- Secondary color: Red (#D32F2F)
- Background: Light teal (#B2DFDB) and white
- Custom typography with Inter font family
- Elevated card design with subtle hover effects
- Responsive layout with optimized mobile experience

## 🔒 Authentication

The application uses JWT-based authentication with tokens stored in localStorage. Protected routes require authentication, and certain features are restricted based on user roles (customer vs admin).

## 🔄 State Management

State management is handled through React Context API with two main contexts:

- **AuthContext**: Manages user authentication state, login/logout, and profile updates
- **CartContext**: Manages shopping cart state, item addition/removal, and checkout

## 🌐 API Integration

The frontend communicates with the ShopSphere Backend API using Axios. API services are organized by resource type (products, categories, orders, etc.) with proper error handling and loading states.

## 📱 Responsive Design

The application is fully responsive with:

- Flexible grid system for layout
- Responsive navigation with mobile drawer menu
- Adaptive product cards and detail views
- Touch-friendly UI elements for mobile users

## 🛡️ Best Practices

- TypeScript for type safety
- Component-based architecture
- Lazy loading for improved performance
- Error boundaries for graceful error handling
- Consistent styling with Material UI theme
- Secure authentication flow

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
