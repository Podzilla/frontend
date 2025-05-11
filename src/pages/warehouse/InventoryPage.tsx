import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Plus, RefreshCw, Edit, Trash2, Download,
  SortAsc, SortDesc, Package, Check, X
} from 'lucide-react';
import { useInventory } from '../../contexts/InventoryContext';
import toast from 'react-hot-toast';

const InventoryPage = () => {
  const { inventory, updateInventoryItem, addInventoryItem, removeInventoryItem } = useInventory();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    id: '',
    sku: '',
    name: '',
    category: '',
    stockQuantity: 0,
    reorderPoint: 0,
    costPrice: 0,
    sellingPrice: 0,
    location: '',
    supplier: '',
    lastRestocked: new Date().toISOString().split('T')[0]
  });
  
  // Extract unique categories
  const categories = ['all', ...new Set(inventory.map(item => item.category))];
  
  // Filter and sort inventory
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const handleAddItem = () => {
    const id = Math.random().toString(36).substr(2, 9);
    
    if (!newItem.name || !newItem.sku || !newItem.category) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    addInventoryItem({
      ...newItem,
      id,
    });
    
    toast.success('Inventory item added successfully');
    setShowAddModal(false);
    setNewItem({
      id: '',
      sku: '',
      name: '',
      category: '',
      stockQuantity: 0,
      reorderPoint: 0,
      costPrice: 0,
      sellingPrice: 0,
      location: '',
      supplier: '',
      lastRestocked: new Date().toISOString().split('T')[0]
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Manage and track all your inventory items</p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Download size={16} className="mr-2" /> Export
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus size={16} className="mr-2" /> Add Item
          </button>
        </div>
      </div>
      
      {/* Filter and search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or SKU..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={18} className="text-gray-400" />
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block w-full py-2 pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <RefreshCw size={16} className="mr-2" /> Refresh
            </button>
          </div>
        </div>
      </div>
      
      {/* Inventory table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="group inline-flex items-center"
                    onClick={() => handleSort('name')}
                  >
                    Product
                    {sortField === 'name' ? (
                      sortDirection === 'asc' ? (
                        <SortAsc size={14} className="ml-1 text-gray-400" />
                      ) : (
                        <SortDesc size={14} className="ml-1 text-gray-400" />
                      )
                    ) : (
                      <SortAsc size={14} className="ml-1 text-gray-400 opacity-0 group-hover:opacity-100" />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="group inline-flex items-center"
                    onClick={() => handleSort('category')}
                  >
                    Category
                    {sortField === 'category' ? (
                      sortDirection === 'asc' ? (
                        <SortAsc size={14} className="ml-1 text-gray-400" />
                      ) : (
                        <SortDesc size={14} className="ml-1 text-gray-400" />
                      )
                    ) : (
                      <SortAsc size={14} className="ml-1 text-gray-400 opacity-0 group-hover:opacity-100" />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="group inline-flex items-center"
                    onClick={() => handleSort('stockQuantity')}
                  >
                    Stock
                    {sortField === 'stockQuantity' ? (
                      sortDirection === 'asc' ? (
                        <SortAsc size={14} className="ml-1 text-gray-400" />
                      ) : (
                        <SortDesc size={14} className="ml-1 text-gray-400" />
                      )
                    ) : (
                      <SortAsc size={14} className="ml-1 text-gray-400 opacity-0 group-hover:opacity-100" />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="group inline-flex items-center"
                    onClick={() => handleSort('sellingPrice')}
                  >
                    Price
                    {sortField === 'sellingPrice' ? (
                      sortDirection === 'asc' ? (
                        <SortAsc size={14} className="ml-1 text-gray-400" />
                      ) : (
                        <SortDesc size={14} className="ml-1 text-gray-400" />
                      )
                    ) : (
                      <SortAsc size={14} className="ml-1 text-gray-400 opacity-0 group-hover:opacity-100" />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center">
                        <Package size={18} className="text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.stockQuantity <= item.reorderPoint
                        ? 'bg-red-100 text-red-800'
                        : item.stockQuantity <= item.reorderPoint * 2
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.stockQuantity} units
                    </div>
                    {item.stockQuantity <= item.reorderPoint && (
                      <div className="text-xs text-red-600 mt-1">Reorder needed</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${item.sellingPrice.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">Cost: ${item.costPrice.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          removeInventoryItem(item.id);
                          toast.success('Item removed from inventory');
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredInventory.length === 0 && (
          <div className="p-6 text-center">
            <p className="text-gray-500">No inventory items match your search criteria.</p>
          </div>
        )}
      </div>
      
      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Inventory Item</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                          <input
                            type="text"
                            value={newItem.sku}
                            onChange={(e) => setNewItem({...newItem, sku: e.target.value})}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="PROD-XXX"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                          <input
                            type="text"
                            value={newItem.name}
                            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Product name"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                          <input
                            type="text"
                            value={newItem.category}
                            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Electronics, Office, etc."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <input
                            type="text"
                            value={newItem.location}
                            onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="A1-S1"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                          <input
                            type="number"
                            value={newItem.stockQuantity}
                            onChange={(e) => setNewItem({...newItem, stockQuantity: parseInt(e.target.value) || 0})}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Point</label>
                          <input
                            type="number"
                            value={newItem.reorderPoint}
                            onChange={(e) => setNewItem({...newItem, reorderPoint: parseInt(e.target.value) || 0})}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="0"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price</label>
                          <input
                            type="number"
                            value={newItem.costPrice}
                            onChange={(e) => setNewItem({...newItem, costPrice: parseFloat(e.target.value) || 0})}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
                          <input
                            type="number"
                            value={newItem.sellingPrice}
                            onChange={(e) => setNewItem({...newItem, sellingPrice: parseFloat(e.target.value) || 0})}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                        <input
                          type="text"
                          value={newItem.supplier}
                          onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Supplier name"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;