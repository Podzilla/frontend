import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useInventory } from '../../contexts/InventoryContext';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { inventory, decreaseStock } = useInventory();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      // Update inventory
      cartItems.forEach(item => {
        decreaseStock(item.id, item.quantity);
      });
      
      navigate('/checkout');
      setIsProcessing(false);
    }, 1500);
  };
  
  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    const item = inventory.find(product => product.id === id);
    
    if (item && newQuantity > item.stockQuantity) {
      toast.error(`Sorry, only ${item.stockQuantity} left in stock`);
      return;
    }
    
    updateQuantity(id, newQuantity);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Shopping Cart</h1>
        <Link to="/shop" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-1" /> Continue Shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag size={28} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <ul>
                {cartItems.map((item, index) => (
                  <li 
                    key={item.id} 
                    className={`p-6 ${
                      index < cartItems.length - 1 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-24 sm:h-24 flex-shrink-0 mb-4 sm:mb-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full rounded-md object-center object-cover"
                        />
                      </div>
                      <div className="sm:ml-6 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center">
                              <Tag size={14} className="text-blue-500 mr-1" />
                              <span className="text-xs font-medium text-blue-500">{
                                inventory.find(product => product.id === item.id)?.category || 'Product'
                              }</span>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                          <div className="flex items-center">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-10 text-center py-1">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="text-right font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={clearCart}
                  className="inline-flex items-center text-sm text-gray-500 hover:text-red-600"
                >
                  <Trash2 size={16} className="mr-1" />
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(cartTotal * 0.07).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between text-lg font-semibold mb-6">
                <span>Total</span>
                <span>${(cartTotal * 1.07).toFixed(2)}</span>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isProcessing || cartItems.length === 0}
                className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  isProcessing || cartItems.length === 0 ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              
              <div className="mt-4 text-center text-sm text-gray-500">
                Secure checkout powered by BusinessOS
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;