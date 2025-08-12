import React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
          <p className="text-xl text-gray-600 mb-8">
            Manage your account settings and personal information.
          </p>
          <div className="bg-white rounded-lg shadow-md p-8">
            <p className="text-gray-500">Coming Soon - User profile management</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;