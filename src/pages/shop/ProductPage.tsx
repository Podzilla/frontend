import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus, Check, Star, Truck } from 'lucide-react';
import { useInventory } from '../../contexts/InventoryContext';
import { useCart } from '../../contexts/CartContext';
import toast from 'react-hot-toast';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { inventory } = useInventory();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  // Find the product from inventory
  const inventoryItem = inventory.find(item => item.id === id);
  
  if (!inventoryItem) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Product not found</h2>
        <Link to="/shop" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-2" /> Back to Shop
        </Link>
      </div>
    );
  }
  
  // Convert inventory item to product
  const product = {
    id: inventoryItem.id,
    name: inventoryItem.name,
    price: inventoryItem.sellingPrice,
    category: inventoryItem.category,
    image: `https://source.unsplash.com/800x600/?product,${inventoryItem.category.toLowerCase().replace(' ', '')}`,
    description: `High-quality ${inventoryItem.name.toLowerCase()} designed for optimal performance and user satisfaction. This product features premium materials, ergonomic design, and long-lasting durability to meet all your needs.`,
    stockQuantity: inventoryItem.stockQuantity,
  };
  
  const handleAddToCart = () => {
    if (quantity <= 0) return;
    
    addToCart({
      ...product,
      quantity,
    });
    
    toast.success(`${product.name} added to cart`);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(quantity + 1);
    } else {
      toast.error(`Sorry, only ${product.stockQuantity} available in stock`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <Link to="/shop" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-1" /> Back to Products
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative h-96 lg:h-full overflow-hidden bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {product.category}
              </span>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">4.0 (24 reviews)</span>
            </div>
            
            <p className="text-3xl font-bold text-gray-900 mb-6">
              ${product.price.toFixed(2)}
            </p>
            
            {/* Stock Status */}
            <div className="mb-6">
              {product.stockQuantity > 0 ? (
                <div className="flex items-center text-green-600">
                  <Check size={18} className="mr-2" />
                  <span>
                    {product.stockQuantity > 10 
                      ? 'In Stock' 
                      : `Only ${product.stockQuantity} left in stock`}
                  </span>
                </div>
              ) : (
                <div className="text-red-600">Out of Stock</div>
              )}
            </div>
            
            {/* Description preview */}
            <p className="text-gray-600 mb-6 line-clamp-3">
              {product.description}
            </p>
            
            {/* Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none"
                    disabled={quantity <= 1}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center py-1 text-gray-700">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none"
                    disabled={quantity >= product.stockQuantity}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  disabled={product.stockQuantity === 0}
                  className={`ml-4 flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    product.stockQuantity === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
            
            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Truck size={16} className="mr-2 text-blue-600" />
                Free delivery on orders over $50
              </div>
              <div className="text-sm text-gray-600">
                Estimated delivery: 2-4 business days
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="border-t border-gray-200">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 text-sm font-medium focus:outline-none ${
                activeTab === 'description'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`px-6 py-3 text-sm font-medium focus:outline-none ${
                activeTab === 'specifications'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 text-sm font-medium focus:outline-none ${
                activeTab === 'reviews'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews (24)
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p>
                  {product.description}
                </p>
                <p>
                  Our {product.name.toLowerCase()} offers exceptional quality and durability, making it a perfect addition to your setup. Designed with users in mind, it provides comfortable usage for extended periods while maintaining reliable performance.
                </p>
                <p>
                  Each product undergoes rigorous quality testing to ensure it meets our high standards before reaching our customers. We stand behind the quality of our products and offer a 1-year warranty to give you peace of mind with your purchase.
                </p>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Specifications</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-3 text-sm font-medium text-gray-900">Brand</td>
                        <td className="px-6 py-3 text-sm text-gray-500">BusinessOS Tech</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-sm font-medium text-gray-900">Model</td>
                        <td className="px-6 py-3 text-sm text-gray-500">BOS-{product.id}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-sm font-medium text-gray-900">Category</td>
                        <td className="px-6 py-3 text-sm text-gray-500">{product.category}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-sm font-medium text-gray-900">Warranty</td>
                        <td className="px-6 py-3 text-sm text-gray-500">1 Year Manufacturer Warranty</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-sm font-medium text-gray-900">Weight</td>
                        <td className="px-6 py-3 text-sm text-gray-500">0.5 kg</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-3 text-sm font-medium text-gray-900">Dimensions</td>
                        <td className="px-6 py-3 text-sm text-gray-500">15 × 10 × 5 cm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Reviews</h3>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <p className="ml-2 text-sm font-medium text-gray-900">4.0 out of 5</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Based on 24 reviews</p>
                </div>
                
                <div className="space-y-6">
                  {/* Sample review */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <p className="ml-2 text-sm font-medium text-gray-900">Emily Johnson</p>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Verified Purchase - March 15, 2025</p>
                    <p className="text-sm text-gray-600">
                      Absolutely love this product! The quality is exceptional and it has exceeded my expectations. Delivery was prompt and the packaging was secure.
                    </p>
                  </div>
                  
                  {/* Sample review */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <p className="ml-2 text-sm font-medium text-gray-900">Mark Wilson</p>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Verified Purchase - March 10, 2025</p>
                    <p className="text-sm text-gray-600">
                      Great product overall. Works as advertised and the build quality is solid. Lost one star because the shipping took a bit longer than expected.
                    </p>
                  </div>
                  
                  {/* Sample review */}
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < 3 ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <p className="ml-2 text-sm font-medium text-gray-900">Alex Chen</p>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Verified Purchase - March 5, 2025</p>
                    <p className="text-sm text-gray-600">
                      It's good but not great. Functionality is there but I expected better quality materials for the price point. Customer service was excellent though.
                    </p>
                  </div>
                </div>
                
                <button className="mt-6 text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Load more reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;