import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Package, Truck, BarChart2 } from 'lucide-react';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const modules = [
    {
      id: 'shop',
      name: 'Customer Shop',
      description: 'Browse products and manage your shopping cart',
      icon: ShoppingBag,
      color: 'bg-blue-500',
      path: '/shop',
      role: 'customer'
    },
    {
      id: 'warehouse',
      name: 'Warehouse Management',
      description: 'Track inventory and manage warehouse operations',
      icon: Package,
      color: 'bg-emerald-500',
      path: '/warehouse',
      role: 'warehouse'
    },
    {
      id: 'courier',
      name: 'Delivery Management',
      description: 'Organize deliveries and track shipments',
      icon: Truck,
      color: 'bg-amber-500',
      path: '/courier',
      role: 'courier'
    },
    {
      id: 'analytics',
      name: 'Business Analytics',
      description: 'View reports and track performance metrics',
      icon: BarChart2,
      color: 'bg-purple-500',
      path: '/analytics',
      role: 'admin'
    }
  ];

  // Filter modules based on user role if authenticated
  const availableModules = isAuthenticated
    ? modules.filter(module => user?.role === 'admin' || module.role === user?.role || module.role === 'customer')
    : modules;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome to BusinessOS
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          A comprehensive business management system with integrated modules for orders, inventory, delivery, and analytics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {availableModules.map((module) => (
          <div 
            key={module.id}
            className="relative group overflow-hidden bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className={`absolute top-0 left-0 w-full h-1 ${module.color}`} />
            <div className="p-6">
              <div className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center mb-4 text-white`}>
                <module.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.name}</h3>
              <p className="text-gray-600 mb-6">{module.description}</p>
              <button
                onClick={() => navigate(module.path)}
                className="mt-auto w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Access Module
              </button>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-500 ease-in-out"></div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-xl shadow-md mt-12 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">System Status</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Inventory Status</p>
                  <p className="text-xl font-semibold text-gray-900">Healthy</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Deliveries</p>
                  <p className="text-xl font-semibold text-gray-900">12</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Orders Today</p>
                  <p className="text-xl font-semibold text-gray-900">28</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;