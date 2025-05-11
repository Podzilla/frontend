import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppLayout from './layouts/AppLayout';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { InventoryProvider } from './contexts/InventoryContext';
import HomePage from './pages/HomePage';
import ShopPage from './pages/shop/ShopPage';
import ProductPage from './pages/shop/ProductPage';
import CartPage from './pages/shop/CartPage';
import CheckoutPage from './pages/shop/CheckoutPage';
import WarehouseDashboard from './pages/warehouse/WarehouseDashboard';
import InventoryPage from './pages/warehouse/InventoryPage';
import CourierDashboard from './pages/courier/CourierDashboard';
import DeliveryTracking from './pages/courier/DeliveryTracking';
import AnalyticsDashboard from './pages/analytics/AnalyticsDashboard';
import LoginPage from './pages/auth/LoginPage';

function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <CartProvider>
          <BrowserRouter>
            <Toaster position="top-right" />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="shop/product/:id" element={<ProductPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="warehouse" element={<WarehouseDashboard />} />
                <Route path="warehouse/inventory" element={<InventoryPage />} />
                <Route path="courier" element={<CourierDashboard />} />
                <Route path="courier/tracking" element={<DeliveryTracking />} />
                <Route path="analytics" element={<AnalyticsDashboard />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </InventoryProvider>
    </AuthProvider>
  );
}

export default App;