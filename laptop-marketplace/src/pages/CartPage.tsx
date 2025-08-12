import React from 'react';

const CartPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your cart items will be displayed here.
          </p>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-500">Coming Soon - Shopping cart with add/remove functionality</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;