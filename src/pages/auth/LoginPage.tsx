import React, { useState, FormEvent } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, AlertCircle, Box, Hexagon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { role: 'Admin', email: 'admin@podzilla.com', password: 'admin123' },
    { role: 'Warehouse Manager', email: 'warehouse@podzilla.com', password: 'warehouse123' },
    { role: 'Courier', email: 'courier@podzilla.com', password: 'courier123' },
    { role: 'Customer', email: 'customer@example.com', password: 'customer123' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left side - Form */}
        <div className="p-8 lg:p-12">
          <div className="flex items-center mb-8">
            <div className="flex items-center text-3xl font-bold text-purple-600">
              <Hexagon size={40} className="mr-2 fill-current" />
              Podzilla
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your Podzilla dashboard</p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-lg flex items-center">
              <AlertCircle size={18} className="mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="••••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo accounts</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.role}
                  onClick={() => {
                    setEmail(account.email);
                    setPassword(account.password);
                  }}
                  className="w-full text-left px-4 py-3 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{account.role}</span>
                  <span className="ml-2 text-gray-500">({account.email})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Features */}
        <div className="hidden lg:block relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-800 flex flex-col justify-between p-12 text-white">
            <div>
              <div className="flex items-center text-3xl font-bold mb-4">
                <Box size={32} className="mr-2" />
                Podzilla
              </div>
              <p className="text-purple-100">Complete business management solution</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-medium mb-2">Why Choose Podzilla?</h3>
                <ul className="space-y-3 text-sm text-purple-100">
                  <li className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                      <Box size={18} />
                    </div>
                    Streamlined inventory management
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                      <Box size={18} />
                    </div>
                    Real-time delivery tracking
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                      <Box size={18} />
                    </div>
                    Advanced analytics dashboard
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                      <Box size={18} />
                    </div>
                    Secure user authentication
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <Box size={24} />
                  </div>
                  <div>
                    <h4 className="font-medium">Getting Started</h4>
                    <p className="text-sm text-purple-200">Quick and easy setup process</p>
                  </div>
                </div>
                <p className="text-sm text-purple-100">
                  Log in to access your dashboard and start managing your business operations efficiently.
                </p>
              </div>
            </div>

            <div className="text-sm text-purple-200">
              © 2025 Podzilla. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;