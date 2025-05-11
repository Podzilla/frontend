import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { 
  Truck, MapPin, CheckCircle, Clock, AlertTriangle, 
  Package, Users, ArrowUpRight, Search, Filter
} from 'lucide-react';

// Mock data for deliveries
const deliveries = [
  { 
    id: 'DEL-001', 
    customer: 'John Smith', 
    address: '123 Main St, Anytown, CA 94105', 
    items: [{ name: 'Premium Headphones', quantity: 1 }, { name: 'Wireless Mouse', quantity: 1 }],
    status: 'in-transit',
    driver: 'Michael Johnson',
    time: '12:30 PM',
    coordinates: [37.7749, -122.4194],
  },
  { 
    id: 'DEL-002', 
    customer: 'Sarah Johnson', 
    address: '456 Oak Ave, Oakville, CA 90210', 
    items: [{ name: '27" Monitor', quantity: 1 }],
    status: 'pending',
    driver: 'Thomas Wilson',
    time: '2:45 PM',
    coordinates: [37.8044, -122.2712],
  },
  { 
    id: 'DEL-003', 
    customer: 'Michael Brown', 
    address: '789 Pine Rd, Pineville, CA 95630', 
    items: [{ name: 'Ergonomic Keyboard', quantity: 1 }, { name: 'Laptop Stand', quantity: 1 }],
    status: 'delivered',
    driver: 'Emma Davis',
    time: '10:15 AM',
    coordinates: [38.5816, -121.4944],
  },
  { 
    id: 'DEL-004', 
    customer: 'Emily Wilson', 
    address: '234 Elm St, Elmtown, CA 93401', 
    items: [{ name: 'Wireless Charger', quantity: 1 }],
    status: 'problem',
    driver: 'Michael Johnson',
    time: '11:50 AM',
    coordinates: [35.2828, -120.6596],
  },
  { 
    id: 'DEL-005', 
    customer: 'David Lee', 
    address: '567 Birch Ave, Birchwood, CA 92037', 
    items: [{ name: 'USB-C Hub', quantity: 1 }, { name: 'Wireless Mouse', quantity: 1 }],
    status: 'pending',
    driver: 'Emma Davis',
    time: '3:30 PM',
    coordinates: [32.8328, -117.2713],
  },
];

// Demo drivers
const drivers = [
  { id: 1, name: 'Michael Johnson', deliveries: 2, status: 'active' },
  { id: 2, name: 'Emma Davis', deliveries: 2, status: 'active' },
  { id: 3, name: 'Thomas Wilson', deliveries: 1, status: 'active' },
  { id: 4, name: 'Lisa Brown', deliveries: 0, status: 'offline' },
];

const CourierDashboard = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter deliveries by status and search term
  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
    const matchesSearch = 
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Counting deliveries by status
  const counts = {
    total: deliveries.length,
    pending: deliveries.filter(d => d.status === 'pending').length,
    inTransit: deliveries.filter(d => d.status === 'in-transit').length,
    delivered: deliveries.filter(d => d.status === 'delivered').length,
    problem: deliveries.filter(d => d.status === 'problem').length,
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courier Dashboard</h1>
          <p className="text-gray-600">Manage deliveries and track shipments</p>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/courier/tracking"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Truck size={16} className="mr-2" /> Live Tracking
          </Link>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Deliveries</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{counts.total}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package size={20} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-blue-500" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Transit</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{counts.inTransit}</p>
            </div>
            <div className="p-2 bg-amber-100 rounded-lg">
              <Truck size={20} className="text-amber-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-amber-500" style={{ width: `${(counts.inTransit / counts.total) * 100}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered Today</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{counts.delivered}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle size={20} className="text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-green-500" style={{ width: `${(counts.delivered / counts.total) * 100}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Issues</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{counts.problem}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="bg-red-500" style={{ width: `${(counts.problem / counts.total) * 100}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Map View */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Delivery Map</h2>
          </div>
          <div className="bg-gray-100 h-80 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* This would be replaced with an actual map component */}
              <div className="text-center">
                <MapPin size={48} className="mx-auto text-blue-500 mb-2" />
                <p className="text-gray-600">Interactive map showing delivery locations</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Driver Status */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Driver Status</h2>
          </div>
          <div className="divide-y divide-gray-200 max-h-80 overflow-auto">
            {drivers.map((driver) => (
              <div key={driver.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${driver.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{driver.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {driver.status === 'active' 
                          ? `${driver.deliveries} deliveries assigned` 
                          : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Link 
                      to={`/courier/driver/${driver.id}`}
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      Details <ArrowUpRight size={12} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Deliveries */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <h2 className="text-lg font-medium text-gray-900">Recent Deliveries</h2>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search deliveries..."
                  className="block w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-400" />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full py-1.5 pl-3 pr-10 border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="in-transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="problem">Problem</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredDeliveries.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No deliveries found matching your criteria.</div>
          ) : (
            filteredDeliveries.map((delivery) => (
              <div key={delivery.id} className="p-4 hover:bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                  <div className="flex items-start">
                    <div className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 ${
                      delivery.status === 'delivered' 
                        ? 'bg-green-100' 
                        : delivery.status === 'in-transit'
                        ? 'bg-amber-100'
                        : delivery.status === 'problem'
                        ? 'bg-red-100'
                        : 'bg-blue-100'
                    }`}>
                      {delivery.status === 'delivered' ? (
                        <CheckCircle size={20} className="text-green-600" />
                      ) : delivery.status === 'in-transit' ? (
                        <Truck size={20} className="text-amber-600" />
                      ) : delivery.status === 'problem' ? (
                        <AlertTriangle size={20} className="text-red-600" />
                      ) : (
                        <Clock size={20} className="text-blue-600" />
                      )}
                    </div>
                    
                    <div className="ml-3">
                      <div className="flex items-center">
                        <h3 className="text-sm font-medium text-gray-900">{delivery.id}</h3>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          delivery.status === 'delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : delivery.status === 'in-transit'
                            ? 'bg-amber-100 text-amber-800'
                            : delivery.status === 'problem'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {delivery.status === 'in-transit' ? 'In Transit' : 
                           delivery.status === 'pending' ? 'Pending' :
                           delivery.status === 'problem' ? 'Problem' : 'Delivered'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{delivery.customer}</p>
                      <p className="text-xs text-gray-500 mt-1">{delivery.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <div className="flex items-center mr-6">
                      <Users size={16} className="text-gray-500 mr-1" />
                      <span className="text-gray-700">{delivery.driver}</span>
                    </div>
                    <div className="flex items-center mr-6">
                      <Clock size={16} className="text-gray-500 mr-1" />
                      <span className="text-gray-700">{delivery.time}</span>
                    </div>
                    <Link
                      to={`/courier/tracking/${delivery.id}`}
                      className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
                    >
                      <MapPin size={12} className="mr-1" /> Track
                    </Link>
                  </div>
                </div>
                
                <div className="mt-3 ml-13 sm:ml-14">
                  <p className="text-xs text-gray-500">Items:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {delivery.items.map((item, index) => (
                      <div key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-800">
                        <Package size={12} className="mr-1 text-gray-500" />
                        {item.name} × {item.quantity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CourierDashboard;