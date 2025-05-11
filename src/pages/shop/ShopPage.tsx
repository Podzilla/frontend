import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ShoppingCart, ChevronDown, Tag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useInventory } from '../../contexts/InventoryContext';
import toast from 'react-hot-toast';

const ShopPage = () => {
  const { inventory } = useInventory();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract unique categories from inventory
  const categories = ['all', ...new Set(inventory.map(item => item.category))];
  
  // Convert inventory items to products for display
  const products = inventory.map(item => ({
    id: item.id,
    name: item.name,
    price: item.sellingPrice,
    category: item.category,
    image: `https://source.unsplash.com/800x600/?product,${item.category.toLowerCase().replace(' ', '')}`,
    description: `High-quality ${item.name.toLowerCase()} for all your needs.`,
    stockQuantity: item.stockQuantity,
  }));
  
  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });
  
  const handleAddToCart = (product: any) => {
    addToCart({
      ...product,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart`);
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Filter size={16} className="mr-2" />
              Filters
              <ChevronDown 
                size={16} 
                className={`ml-2 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} 
              />
            </button>
            
            <div className="relative inline-block text-left">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <p className="text-sm font-medium text-gray-700 mr-2 pt-1">Categories:</p>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    selectedCategory === category
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative aspect-w-4 aspect-h-3 overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name} 
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.stockQuantity <= 5 && (
                  <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 m-2 rounded">
                    Low Stock: {product.stockQuantity}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <Tag size={14} className="text-blue-500 mr-1" />
                  <span className="text-xs font-medium text-blue-500">{product.category}</span>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
                
                <div className="mt-2 mb-3 text-xl font-semibold text-gray-900">${product.price.toFixed(2)}</div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    disabled={product.stockQuantity === 0}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={() => navigate(`/shop/product/${product.id}`)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;