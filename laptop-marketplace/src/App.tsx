import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';

// Components
import SplashScreen from './components/SplashScreen';
import Navbar from './components/layout/Navbar';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

// Pages (we'll create these next)
import HomePage from './pages/HomePage';
import BrowsePage from './pages/BrowsePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import SellerDashboard from './pages/SellerDashboard';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Minimum splash screen duration
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <AnimatePresence mode="wait">
              {showSplash ? (
                <SplashScreen key="splash" onComplete={handleSplashComplete} />
              ) : (
                <div key="main">
                  <Navbar />
                  <main>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<HomePage />} />
                      <Route path="/browse" element={<BrowsePage />} />
                      <Route path="/categories" element={<div className="p-8 text-center">Categories Page - Coming Soon</div>} />
                      <Route path="/deals" element={<div className="p-8 text-center">Deals Page - Coming Soon</div>} />
                      <Route path="/product/:id" element={<ProductDetailPage />} />
                      <Route path="/search" element={<BrowsePage />} />
                      
                      {/* Auth Routes */}
                      <Route path="/login" element={<AuthLayout><LoginForm /></AuthLayout>} />
                      <Route path="/register" element={<AuthLayout><RegisterForm /></AuthLayout>} />
                      <Route path="/forgot-password" element={<AuthLayout><div className="text-center">Forgot Password - Coming Soon</div></AuthLayout>} />
                      
                      {/* Protected Routes */}
                      <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                      <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
                      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                      <Route path="/orders" element={<ProtectedRoute><div className="p-8 text-center">Orders Page - Coming Soon</div></ProtectedRoute>} />
                      <Route path="/messages" element={<ProtectedRoute><div className="p-8 text-center">Messages Page - Coming Soon</div></ProtectedRoute>} />
                      <Route path="/settings" element={<ProtectedRoute><div className="p-8 text-center">Settings Page - Coming Soon</div></ProtectedRoute>} />
                      
                      {/* Seller Routes */}
                      <Route path="/seller/dashboard" element={<SellerRoute><SellerDashboard /></SellerRoute>} />
                      <Route path="/seller/listings" element={<SellerRoute><div className="p-8 text-center">Seller Listings - Coming Soon</div></SellerRoute>} />
                      
                      {/* Admin Routes */}
                      <Route path="/admin/*" element={<AdminRoute><div className="p-8 text-center">Admin Panel - Coming Soon</div></AdminRoute>} />
                      
                      {/* 404 Route */}
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </main>
                </div>
              )}
            </AnimatePresence>

            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

// Layout Components
interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 to-blue-50">
    <div className="max-w-md w-full space-y-8">
      {children}
    </div>
  </div>
);

// Route Protection Components
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute: React.FC<LayoutProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const SellerRoute: React.FC<LayoutProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'seller' && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AdminRoute: React.FC<LayoutProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// 404 Page
const NotFoundPage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <a href="/" className="btn-primary">
        Go back home
      </a>
    </div>
  </div>
);

export default App;
