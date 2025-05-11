import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, AlertTriangle, BarChart, TrendingUp, TrendingDown, Truck,
  ShoppingBag, RefreshCw, Check, Search
} from 'lucide-react';
import { useInventory } from '../../contexts/InventoryContext';

// Progress component
const Progress = ({ value, max, color }: { value: number, max: number, color: string }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className={`h-2.5 rounded-full ${color}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

const WarehouseDashboard = () => {
  const { inventory, getLowStockItems } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  
  const lowStockItems = getLowStockItems();
  
  // Filter inventory based on search
  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate inventory stats
  const totalItems = inventory.reduce((sum, item) => sum + item.stockQuantity, 0);
  const totalProducts = inventory.length;
  const totalLowStock = lowStockItems.length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.costPrice * item.stockQuantity), 0);
  
  const recentActivity = [
    { id: 1, type: 'restock', product: 'Wireless Mouse', quantity: 25, date: '2025-04-02 09:15 AM' },
    { id: 2, type: 'outbound', product: 'Premium Headphones', quantity: 3, date: '2025-04-02 08:30 AM' },
    { id: 3, type: 'outbound', product: 'Ergonomic Keyboard', quantity: 1, date: '2025-04-01 04:45 PM' },
    { id: 4, type: 'restock', product: 'USB-C Hub', quantity: 15, date: '2025-04-01 01:20 PM' },
    { id: 5, type: 'outbound', product: '27" Monitor', quantity: 2, date: '2025-04-01 11:10 AM' },
  ];
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Warehouse Dashboard</h1>
        <p className="text-gray-600">Manage inventory and track warehouse operations</p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Inventory</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{totalItems} units</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package size={20} className="text-blue-600" />
            </div>
          </div>
          <Progress value={totalItems} max={1000} color="bg-blue-600" />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{totalProducts}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <ShoppingBag size={20} className="text-green-600" />
            </div>
          </div>
          <Progress value={totalProducts} max={100} color="bg-green-600" />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{totalLowStock}</p>
            </div>
            <div className="p-2 bg-amber-100 rounded-lg">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
          </div>
          <Progress value={totalLowStock} max={totalProducts} color="bg-amber-600" />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inventory Value</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">${totalValue.toFixed(2)}</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart size={20} className="text-purple-600" />
            </div>
          </div>
          <Progress value={totalValue} max={20000} color="bg-purple-600" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Low Stock Alert */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Low Stock Alerts</h2>
            <Link 
              to="/warehouse/inventory" 
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View All Inventory
            </Link>
          </div>
          
          <div className="divide-y divide-gray-200 max-h-96 overflow-auto">
            {lowStockItems.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No low stock items found</div>
            ) : (
              lowStockItems.map(item => (
                <div key={item.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex-shrink-0 bg-red-100 rounded-md flex items-center justify-center">
                        <AlertTriangle size={18} className="text-red-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500">SKU: {item.sku} • </span>
                          <span className="text-xs text-gray-500 ml-1">Location: {item.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {item.stockQuantity} / {item.reorderPoint}
                      </div>
                      <button className="mt-1 text-xs font-medium text-blue-600 hover:text-blue-800">
                        Reorder Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-200 max-h-96 overflow-auto">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center ${
                    activity.type === 'restock' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {activity.type === 'restock' ? (
                      <TrendingUp size={16} className="text-green-600" />
                    ) : (
                      <TrendingDown size={16} className="text-blue-600" />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.type === 'restock' ? 'Restocked' : 'Order shipped'}
                      </p>
                      <span className="text-xs text-gray-500">
                        {activity.date.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.product} × {activity.quantity}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.date.split(' ')[1]} {activity.date.split(' ')[2]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Inventory Search */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Inventory Search</h2>
        </div>
        <div className="p-6">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by product name, SKU, or category..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU / Category
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Restocked
                  </th>
                  <th scope="col" className="relative px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">${item.sellingPrice.toFixed(2)}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.sku}</div>
                      <div className="text-sm text-gray-500">{item.category}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.stockQuantity <= item.reorderPoint
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.stockQuantity} in stock
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {item.location}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {item.lastRestocked}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <RefreshCw size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Truck size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Recent Shipments */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Upcoming Shipments</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center">
                  <Truck size={20} className="text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Order #8294</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">3 items • Premium Headphones, Ergonomic Keyboard, Wireless Mouse</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center py-1 px-3 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors">
                <Check size={14} className="mr-1" /> Mark Ready
              </button>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-md flex items-center justify-center">
                  <Check size={20} className="text-green-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Order #8293</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">1 item • 27" Monitor</span>
                  </div>
                </div>
              </div>
              <span className="py-1 px-3 bg-green-100 text-green-800 text-xs rounded-md">
                Ready for Pickup
              </span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                  <Package size={20} className="text-gray-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Order #8292</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-gray-500">2 items • Laptop Stand, Wireless Charger</span>
                  </div>
                </div>
              </div>
              <span className="py-1 px-3 bg-gray-200 text-gray-800 text-xs rounded-md">
                Shipped
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDashboard;