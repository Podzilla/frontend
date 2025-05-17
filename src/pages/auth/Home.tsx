import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Zap } from 'lucide-react';
import Button from '../../components/ui/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ShieldCheck className="h-10 w-10 text-purple-600" />,
      title: 'Secure by design',
      description:
        'State-of-the-art security practices to keep your data safe and sound at all times.',
    },
    {
      icon: <Users className="h-10 w-10 text-purple-600" />,
      title: 'User profiles',
      description:
        'Create and customize your profile to connect with others in our community.',
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-600" />,
      title: 'Lightning fast',
      description:
        'Optimized performance ensures a smooth experience no matter what device you use.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-purple-600 font-bold text-xl">Auth Demo</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-purple-600 text-white px-4 py-2 rounded-md font-medium hover:bg-purple-700 transition duration-150"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                Authentication made beautiful
              </h1>
              <p className="mt-6 text-xl text-indigo-100">
                A modern, secure, and user-friendly authentication system
                with all the features you need to manage your users.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/register')}
                >
                  Get started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white hover:bg-gray-50 text-purple-700 border-transparent"
                  onClick={() => navigate('/login')}
                >
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Everything you need
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                Our authentication system provides all the essential features while maintaining
                a clean and intuitive user experience.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300"
                  >
                    <div>{feature.icon}</div>
                    <h3 className="mt-5 text-lg font-medium text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="bg-purple-700 rounded-lg shadow-xl overflow-hidden">
              <div className="px-6 py-12 sm:px-12 lg:py-16 lg:pr-0 lg:pl-12 xl:pl-16">
                <div className="lg:flex lg:items-center lg:justify-between">
                  <div className="lg:w-0 lg:flex-1">
                    <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                      Ready to get started?
                    </h2>
                    <p className="mt-3 max-w-lg text-lg text-purple-100">
                      Create your account now and explore all the features our platform has to offer.
                    </p>
                  </div>
                  <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                    <div className="inline-flex rounded-md shadow">
                      <Button
                        size="lg"
                        className="bg-white hover:bg-gray-50 text-purple-700 border-transparent"
                        onClick={() => navigate('/register')}
                      >
                        Sign up for free
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-base text-gray-400">
            &copy; 2025 Auth Demo, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;