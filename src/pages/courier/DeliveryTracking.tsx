import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown, Package, Clock, User, Home, Phone, Truck, Search } from 'lucide-react';

// Mock deliveries data
const deliveries = [
  {
    id: 'DEL-001',
    customer: 'John Smith',
    address: '123 Main St, Anytown, CA 94105',
    phone: '(555) 123-4567',
    status: 'in-transit',
    driver: 'Michael Johnson',
    estimatedDelivery: '12:30 PM',
    currentLocation: 'En route to destination',
    items: [
      { name: 'Premium Headphones', quantity: 1 }, 
      { name: 'Wireless Mouse', quantity: 1 }
    ],
    timeline: [
      { time: '08:15 AM', status: 'Order processed', completed: true },
      { time: '09:20 AM', status: 'Picked up from warehouse', completed: true },
      { time: '10:45 AM', status: 'In transit', completed: true },
      { time: '12:30 PM', status: 'Delivery at destination', completed: false },
    ],
    coordinates: [37.7749, -122.4194],
  },
  {
    id: 'DEL-002',
    customer: 'Sarah Johnson',
    address: '456 Oak Ave, Oakville, CA 90210',
    phone: '(555) 234-5678',
    status: 'pending',
    driver: 'Thomas Wilson',
    estimatedDelivery: '2:45 PM',
    currentLocation: 'Preparing at warehouse',
    items: [
      { name: '27" Monitor', quantity: 1 }
    ],
    timeline: [
      { time: '10:30 AM', status: 'Order processed', completed: true },
      { time: '01:45 PM', status: 'Picked up from warehouse', completed: false },
      { time: '02:15 PM', status: 'In transit', completed: false },
      { time: '02:45 PM', status: 'Delivery at destination', completed: false },
    ],
    coordinates: [37.8044, -122.2712],
  },
];

const DeliveryTracking = () => {
  const [selectedDelivery, setSelectedDelivery] = useState(deliveries[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFullMap, setShowFullMap] = useState(false);
  
  const filteredDeliveries = deliveries.filter(delivery =>
    delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Fake animation for the delivery progress
  const [progress, setProgress] = useState(50);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        return newProgress > 100 ? 50 : newProgress;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Delivery Tracking</h1>
        <button
          onClick={() => setShowFullMap(!showFullMap)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          {showFullMap ? 'Hide Full Map' : 'Show Full Map'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Delivery List */}
        <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${showFullMap ? 'lg:col-span-12' : 'lg:col-span-4'}`}>
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by ID or customer name..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {showFullMap ? (
            <div className="p-4">
              <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="mx-auto text-blue-500 mb-2" />
                  <p className="text-gray-600">Interactive map showing all active deliveries</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 max-h-screen overflow-auto">
              {filteredDeliveries.length === 0 ? (
                <div className="p-6 text-center text-gray-500">No deliveries found matching your search.</div>
              ) : (
                filteredDeliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    onClick={() => setSelectedDelivery(delivery)}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      selectedDelivery.id === delivery.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            delivery.status === 'delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : delivery.status === 'in-transit'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {delivery.status === 'in-transit' ? 'In Transit' : 
                             delivery.status === 'pending' ? 'Pending' : 'Delivered'}
                          </span>
                          <span className="ml-2 text-sm font-medium text-gray-900">{delivery.id}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{delivery.customer}</p>
                        <div className="flex items-center mt-1">
                          <Clock size={14} className="text-gray-400 mr-1" />
                          <p className="text-xs text-gray-500">{delivery.estimatedDelivery}</p>
                        </div>
                      </div>
                      <ChevronDown 
                        size={16} 
                        className={`text-gray-400 transform transition-transform ${
                          selectedDelivery.id === delivery.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        
        {/* Delivery Details */}
        {!showFullMap && (
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-blue-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Tracking #{selectedDelivery.id}</h2>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedDelivery.status === 'delivered' 
                      ? 'bg-green-500 text-white' 
                      : selectedDelivery.status === 'in-transit'
                      ? 'bg-amber-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {selectedDelivery.status === 'in-transit' ? 'In Transit' : 
                     selectedDelivery.status === 'pending' ? 'Pending' : 'Delivered'}
                  </div>
                </div>
                <p className="text-blue-100 mt-1">Estimated Delivery: {selectedDelivery.estimatedDelivery}</p>
              </div>
              
              <div className="p-6">
                {/* Progress Visualization */}
                <div className="mb-8">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Current Location: {selectedDelivery.currentLocation}
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-blue-600">
                          {progress}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                      <div
                        style={{ width: `${progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
                      ></div>
                    </div>
                  </div>
                  
                  {/* Map placeholder */}
                  <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center mt-4">
                    <div className="text-center">
                      <MapPin size={32} className="mx-auto text-blue-500 mb-2" />
                      <p className="text-gray-600">Interactive delivery map</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Customer Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start mb-3">
                        <User size={16} className="flex-shrink-0 text-gray-500 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{selectedDelivery.customer}</p>
                        </div>
                      </div>
                      <div className="flex items-start mb-3">
                        <Home size={16} className="flex-shrink-0 text-gray-500 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm text-gray-700">{selectedDelivery.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone size={16} className="flex-shrink-0 text-gray-500 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm text-gray-700">{selectedDelivery.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Delivery Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Delivery Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start mb-3">
                        <Truck size={16} className="flex-shrink-0 text-gray-500 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Driver</p>
                          <p className="text-sm text-gray-900">{selectedDelivery.driver}</p>
                        </div>
                      </div>
                      <div className="flex items-start mb-3">
                        <Clock size={16} className="flex-shrink-0 text-gray-500 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Estimated Delivery</p>
                          <p className="text-sm text-gray-900">{selectedDelivery.estimatedDelivery}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Package size={16} className="flex-shrink-0 text-gray-500 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Items</p>
                          <div className="mt-1">
                            {selectedDelivery.items.map((item, index) => (
                              <div key={index} className="text-sm text-gray-900">
                                {item.quantity}× {item.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Timeline</h3>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute top-0 left-3.5 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    {selectedDelivery.timeline.map((event, index) => (
                      <div key={index} className="relative pb-8">
                        <div className="flex items-start">
                          <div className={`absolute mt-1 rounded-full h-7 w-7 flex items-center justify-center ${
                            event.completed ? 'bg-blue-500' : 'bg-gray-200'
                          }`}>
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className="ml-12">
                            <div className={`text-sm ${
                              event.completed ? 'text-gray-900 font-medium' : 'text-gray-500'
                            }`}>
                              {event.status}
                            </div>
                            <div className="text-xs text-gray-500">{event.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryTracking;