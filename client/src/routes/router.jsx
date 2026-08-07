import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Layouts
import WebsiteLayout from '../layouts/WebsiteLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Guard Routes
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// Website Pages
import Home from '../pages/website/Home';
import Products from '../pages/website/Products';
import ProductDetails from '../pages/website/ProductDetails';
import Cart from '../pages/website/Cart';
import Checkout from '../pages/website/Checkout';
import Login from '../pages/website/Login';
import Register from '../pages/website/Register';
import Profile from '../pages/website/Profile';
import MyOrders from '../pages/website/MyOrders';

// Dashboard CRM Pages
import Dashboard from '../pages/dashboard/Dashboard';
import DashboardProducts from '../pages/dashboard/Products';
import Customers from '../pages/dashboard/Customers';
import Orders from '../pages/dashboard/Orders';
import Support from '../pages/dashboard/Support';
import Analytics from '../pages/dashboard/Analytics';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WebsiteLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'products/:id', element: <ProductDetails /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      
      // Private Customer Routes
      {
        element: <PrivateRoute />,
        children: [
          { path: 'cart', element: <Cart /> },
          { path: 'checkout', element: <Checkout /> },
          { path: 'profile', element: <Profile /> },
          { path: 'my-orders', element: <MyOrders /> },
        ],
      },
    ],
  },
  {
    path: 'dashboard',
    element: <AdminRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'products', element: <DashboardProducts /> },
          { path: 'customers', element: <Customers /> },
          { path: 'orders', element: <Orders /> },
          { path: 'support', element: <Support /> },
          { path: 'analytics', element: <Analytics /> },
        ],
      },
    ],
  },
]);
