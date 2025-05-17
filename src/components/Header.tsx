import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = React.useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const closeDropdown = () => setShowDropdown(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    closeDropdown();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-purple-600 font-bold text-xl">Auth Demo</span>
            </div>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <button
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                </button>
                
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                      id="user-menu-button"
                      aria-expanded={showDropdown}
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      {/* Replace 'avatarUrl' with an existing property, e.g., 'photoURL', or remove if not available */}
                      {/* If user has an avatar property, use it; otherwise, show initial */}
                      {user?.avatarUrl ? (
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={user.avatarUrl}
                          alt={user.name}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                          <span className="text-purple-700 font-medium">
                            {user?.name?.charAt(0)}
                          </span>
                        </div>
                      )}
                    </button>
                  </div>
                  
                  {showDropdown && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <div
                        className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100"
                      >
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-gray-500 text-xs">{user?.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          navigate('/profile');
                          closeDropdown();
                        }}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;