import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-8xl font-extrabold text-purple-600">404</h1>
        <p className="mt-2 text-3xl font-bold text-gray-900">Page not found</p>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10">
          <Button
            onClick={() => navigate('/')}
          >
            Go back home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;