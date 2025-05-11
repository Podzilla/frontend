import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Store, Warehouse, Truck, BarChart3, ShoppingCart, Menu, X, User, LogOut, Bell, Hexagon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  
  const navigation = [
    { name: 'Shop', href: '/shop', icon: Store, module: 'customer' },
    { name: 'Warehouse', href: '/warehouse', icon: Warehouse, module: 'warehouse' },
    { name: 'Delivery', href: '/courier', icon: Truck, module: 'courier' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, module: 'erp' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setSidebarOpen(false)}
      />
      
      <div className={`fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center text-xl font-bold text-purple-600">
            <Hexagon size={28} className="mr-2" />
            Podzilla
          </div>
          <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                location.pathname.startsWith(item.href)
                  ? 'bg-purple-50 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="px-2 py-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 md:hidden"
                >
                  <Menu size={24} />
                </button>
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="flex items-center text-xl font-bold text-purple-600">
                    <Hexagon size={28} className="mr-2" />
                    Podzilla
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">3</span>
                  </button>
                </div>
                
                <Link to="/cart" className="relative p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
                  <ShoppingCart size={20} />
                  {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-purple-600 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                
                <div className="border-l border-gray-200 h-6 mx-2"></div>
                
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                      <User size={16} />
                    </div>
                    <span className="hidden md:inline-block">
                      {user?.name || 'Guest User'}
                    </span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                    <button 
                      onClick={logout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut size={16} className="mr-2" /> Sign out
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Desktop sidebar */}
        <div className="flex-1 flex">
          <div className="hidden md:flex md:flex-shrink-0">
            <div className="flex flex-col w-64">
              <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                  <nav className="mt-5 flex-1 px-3 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                          location.pathname.startsWith(item.href)
                            ? 'bg-purple-50 text-purple-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon className={`mr-3 h-5 w-5 ${
                          location.pathname.startsWith(item.href)
                            ? 'text-purple-700'
                            : 'text-gray-400 group-hover:text-gray-500'
                        }`} />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;