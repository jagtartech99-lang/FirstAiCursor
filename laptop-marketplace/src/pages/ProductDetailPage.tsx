import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Details</h1>
          <p className="text-xl text-gray-600 mb-8">
            Product ID: {id}
          </p>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-500">Coming Soon - Detailed product page with images, specs, and reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;