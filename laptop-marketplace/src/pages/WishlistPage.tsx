import React from 'react';

const WishlistPage: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Wishlist</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your favorite laptops will be saved here.
          </p>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-500">Coming Soon - Wishlist/favorites functionality</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;