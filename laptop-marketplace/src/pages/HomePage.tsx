import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Shield,
  Truck,
  Star,
  ChevronRight,
  Laptop,
  Zap,
  Heart,
  Award,
} from 'lucide-react';

const HomePage: React.FC = () => {
  const featuredLaptops = [
    {
      id: '1',
      title: 'MacBook Pro 16" M3 Max',
      price: 3499,
      originalPrice: 3999,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 245,
      brand: 'Apple',
      condition: 'new' as const,
    },
    {
      id: '2',
      title: 'Dell XPS 13 Plus',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 189,
      brand: 'Dell',
      condition: 'like-new' as const,
    },
    {
      id: '3',
      title: 'ThinkPad X1 Carbon',
      price: 1899,
      originalPrice: 2299,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 156,
      brand: 'Lenovo',
      condition: 'good' as const,
    },
    {
      id: '4',
      title: 'Surface Laptop Studio',
      price: 2199,
      originalPrice: 2599,
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop',
      rating: 4.6,
      reviews: 98,
      brand: 'Microsoft',
      condition: 'new' as const,
    },
  ];

  const categories = [
    {
      name: 'Gaming Laptops',
      icon: Zap,
      count: 234,
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300&h=200&fit=crop',
    },
    {
      name: 'Business Laptops',
      icon: Award,
      count: 189,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop',
    },
    {
      name: 'Ultrabooks',
      icon: Laptop,
      count: 156,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop',
    },
    {
      name: 'Budget Laptops',
      icon: Heart,
      count: 298,
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=200&fit=crop',
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'All payments are encrypted and secure with buyer protection',
    },
    {
      icon: Truck,
      title: 'Fast Shipping',
      description: 'Free shipping on orders over $500 with 2-day delivery',
    },
    {
      icon: Star,
      title: 'Quality Guaranteed',
      description: 'Every laptop is verified and comes with warranty coverage',
    },
    {
      icon: Search,
      title: 'Easy Discovery',
      description: 'Find exactly what you need with advanced search and filters',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Find Your Perfect
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Laptop
                </span>
              </h1>
              <p className="text-xl mb-8 text-gray-200 leading-relaxed">
                Discover premium laptops from trusted sellers. Whether you're gaming, 
                working, or studying, we have the perfect device for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/browse"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
                >
                  Browse Laptops
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/register"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors text-center"
                >
                  Start Selling
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop"
                  alt="Modern laptop"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-gray-900 p-4 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold">2,500+</div>
                  <div className="text-sm">Happy Customers</div>
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9/5</span>
                </div>
                <div className="text-sm opacity-90">Average Rating</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Laptops</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hand-picked premium laptops with the best value for money
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredLaptops.map((laptop, index) => (
              <motion.div
                key={laptop.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 group cursor-pointer"
                onClick={() => window.location.href = `/product/${laptop.id}`}
              >
                <div className="relative mb-4">
                  <img
                    src={laptop.image}
                    alt={laptop.title}
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      laptop.condition === 'new'
                        ? 'bg-green-100 text-green-800'
                        : laptop.condition === 'like-new'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {laptop.condition.charAt(0).toUpperCase() + laptop.condition.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {laptop.title}
                  </h3>
                  <p className="text-sm text-gray-500">{laptop.brand}</p>
                  
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{laptop.rating}</span>
                    <span className="text-sm text-gray-500">({laptop.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-gray-900">
                        ${laptop.price.toLocaleString()}
                      </div>
                      {laptop.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ${laptop.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      {laptop.originalPrice && (
                        <div className="text-sm font-medium text-green-600">
                          Save ${(laptop.originalPrice - laptop.price).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/browse"
              className="btn-primary text-lg px-8 py-3 inline-flex items-center"
            >
              View All Laptops
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">
              Find laptops tailored to your specific needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative card p-6 text-center group cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 opacity-10">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative z-10">
                  <div className="bg-primary-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary-700 transition-colors">
                    <category.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">{category.count} laptops available</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose LaptopHub?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the best laptop shopping experience with unmatched service
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-primary-50 text-primary-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-primary-100">
              Join thousands of satisfied customers and find your perfect laptop today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/browse"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Shopping
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Become a Seller
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;