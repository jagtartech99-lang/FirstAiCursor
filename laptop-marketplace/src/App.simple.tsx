import React, { useState } from 'react';

const SimpleApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'splash' | 'home' | 'login'>('splash');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'buyer' | 'seller' | 'admin'>('buyer');

  // Splash Screen Component
  const SplashScreen = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center z-50">
      <div className="text-center text-white">
        <div className="mb-8">
          <div className="bg-white rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center mb-4">
            <span className="text-3xl">💻</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">LaptopHub</h1>
          <p className="text-xl text-blue-100">Your Premier Laptop Marketplace</p>
        </div>
        <div className="w-64 mx-auto">
          <div className="bg-white/20 rounded-full h-2 mb-4">
            <div className="bg-white rounded-full h-2 w-full transition-all duration-1000"></div>
          </div>
          <p className="text-blue-100 text-sm">Loading 100%</p>
        </div>
      </div>
    </div>
  );

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💻</span>
            <span className="text-xl font-bold text-gray-900">LaptopHub</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Browse</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Categories</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">Deals</a>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome back!</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{userRole}</span>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setCurrentView('login')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  // Login Component
  const LoginForm = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Demo Credentials:</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <div><strong>Admin:</strong> admin@laptophub.com</div>
            <div><strong>Seller:</strong> seller@example.com</div>
            <div><strong>Buyer:</strong> buyer@example.com</div>
          </div>
        </div>

        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input 
            type="password" 
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
          </div>

          <button 
            onClick={() => {
              setIsLoggedIn(true);
              setCurrentView('home');
            }}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Sign In
          </button>

          <div className="text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );

  // Homepage Component  
  const HomePage = () => (
    <div>
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Find Your Perfect <span className="text-yellow-400">Laptop</span>
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Discover premium laptops from trusted sellers. Whether you're gaming, working, or studying, 
            we have the perfect device for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100">
              Browse Laptops
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
              Start Selling
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Laptops</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'MacBook Pro 16"', price: '$3,499', image: '🍎', rating: '4.9', condition: 'New' },
              { name: 'Dell XPS 13 Plus', price: '$1,299', image: '💻', rating: '4.7', condition: 'Like New' },
              { name: 'ThinkPad X1 Carbon', price: '$1,899', image: '🖥️', rating: '4.8', condition: 'Good' },
              { name: 'Surface Laptop Studio', price: '$2,199', image: '📱', rating: '4.6', condition: 'New' }
            ].map((laptop, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">{laptop.image}</div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">{laptop.condition}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{laptop.name}</h3>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm ml-1">{laptop.rating}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{laptop.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose LaptopHub?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: '🔒', title: 'Secure Transactions', desc: 'All payments encrypted and secure' },
              { icon: '🚚', title: 'Fast Shipping', desc: 'Free shipping on orders over $500' },
              { icon: '⭐', title: 'Quality Guaranteed', desc: 'Every laptop verified and warranted' },
              { icon: '🔍', title: 'Easy Discovery', desc: 'Advanced search and filters' }
            ].map((feature, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // Main render logic
  React.useEffect(() => {
    if (currentView === 'splash') {
      const timer = setTimeout(() => {
        setCurrentView('home');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  if (currentView === 'splash') {
    return <SplashScreen />;
  }

  if (currentView === 'login') {
    return <LoginForm />;
  }

  return <HomePage />;
};

export default SimpleApp;