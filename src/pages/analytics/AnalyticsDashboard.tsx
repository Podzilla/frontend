import React, { useState } from 'react';
import { 
  BarChart2, TrendingUp, Users, CreditCard, Calendar, Download,
  ShoppingCart, Truck, Package, DollarSign, ArrowUp, ArrowDown
} from 'lucide-react';

// Simple donut chart component
const DonutChart = ({ data, colors }: { data: number[], colors: string[] }) => {
  const total = data.reduce((acc, val) => acc + val, 0);
  let startAngle = 0;
  
  return (
    <svg width="100%" height="100%" viewBox="0 0 42 42" className="donut">
      <circle cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
      
      {data.map((value, i) => {
        const percentage = value / total;
        const strokeDasharray = `${percentage * 100} ${100 - (percentage * 100)}`;
        const angle = startAngle;
        startAngle += percentage * 360;
        
        return (
          <circle 
            key={i}
            cx="21" 
            cy="21" 
            r="15.91549430918954" 
            fill="transparent"
            stroke={colors[i]} 
            strokeWidth="5"
            strokeDasharray={strokeDasharray}
            strokeDashoffset="25"
            style={{ 
              transform: `rotate(${angle}deg)`,
              transformOrigin: 'center',
              transition: 'all 0.3s ease'
            }}
          ></circle>
        );
      })}
      
      <g className="donut-text">
        <text x="50%" y="50%" textAnchor="middle" fill="#333" fontSize="0.6em" dy=".3em">{total}</text>
      </g>
    </svg>
  );
};

// Simple bar chart component
const BarChart = ({ data, labels, height = 120 }: { data: number[], labels: string[], height?: number }) => {
  const maxValue = Math.max(...data);
  
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <div className="flex h-full items-end space-x-2">
        {data.map((value, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-blue-500 rounded-t-sm transition-all duration-500 ease-in-out"
              style={{ 
                height: `${(value / maxValue) * 100}%`,
                minHeight: '4px',
                backgroundColor: i % 2 === 0 ? '#3b82f6' : '#60a5fa'
              }}
            ></div>
            <div className="text-xs text-gray-600 mt-1 truncate w-full text-center">
              {labels[i]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  
  // Mock data for analytics
  const salesData = {
    week: [12500, 15200, 10800, 14300, 13600, 16200, 18500],
    month: [45000, 48000, 52000, 49000],
    year: [150000, 180000, 210000, 195000, 220000, 240000]
  };
  
  const salesLabels = {
    week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    month: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    year: ['Jan-Feb', 'Mar-Apr', 'May-Jun', 'Jul-Aug', 'Sep-Oct', 'Nov-Dec']
  };
  
  const salesByCategory = [32, 25, 18, 15, 10];
  const salesByRegion = [40, 30, 20, 10];
  
  const inventoryStats = {
    total: 7,
    low: 2,
    outOfStock: 0
  };
  
  const courierStats = {
    active: 3,
    completed: 15,
    pending: 2
  };
  
  const currentSales = salesData[timeRange as keyof typeof salesData].reduce((acc, val) => acc + val, 0);
  const previousPeriodSales = currentSales * 0.85; // Just for demo
  const percentageChange = ((currentSales - previousPeriodSales) / previousPeriodSales) * 100;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Monitor business performance and trends</p>
          </div>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Calendar size={16} className="mr-2" /> 
              Select Date
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <Download size={16} className="mr-2" /> 
              Export Report
            </button>
          </div>
        </div>
        
        <div className="mt-4 bg-white rounded-xl shadow-sm p-4">
          <div className="flex space-x-3">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                timeRange === 'week'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                timeRange === 'month'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                timeRange === 'year'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Year
            </button>
          </div>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                ${currentSales.toLocaleString()}
              </p>
              
              <div className={`flex items-center mt-2 ${
                percentageChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {percentageChange >= 0 ? (
                  <ArrowUp size={16} className="mr-1" />
                ) : (
                  <ArrowDown size={16} className="mr-1" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(percentageChange).toFixed(1)}% from last period
                </span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CreditCard size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Customers</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">28</p>
              
              <div className="flex items-center mt-2 text-green-600">
                <ArrowUp size={16} className="mr-1" />
                <span className="text-sm font-medium">12.5% from last week</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users size={24} className="text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Order</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">$125.40</p>
              
              <div className="flex items-center mt-2 text-red-600">
                <ArrowDown size={16} className="mr-1" />
                <span className="text-sm font-medium">3.2% from last week</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <ShoppingCart size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivery Rate</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">94.8%</p>
              
              <div className="flex items-center mt-2 text-green-600">
                <ArrowUp size={16} className="mr-1" />
                <span className="text-sm font-medium">1.2% from last week</span>
              </div>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <Truck size={24} className="text-amber-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Sales Overview</h2>
            <div className="flex items-center text-sm text-gray-600">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
              <span>Total Revenue</span>
            </div>
          </div>
          
          <div className="h-64">
            <div className="flex flex-col justify-between h-full">
              <div className="flex-1">
                <BarChart 
                  data={salesData[timeRange as keyof typeof salesData]} 
                  labels={salesLabels[timeRange as keyof typeof salesLabels]}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Sales by Category</h2>
          
          <div className="relative h-48 mb-4">
            <DonutChart 
              data={salesByCategory} 
              colors={['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe']}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Electronics</span>
              </div>
              <span className="text-sm font-medium">32%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Computer Accessories</span>
              </div>
              <span className="text-sm font-medium">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Phones & Tablets</span>
              </div>
              <span className="text-sm font-medium">18%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-300 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Audio</span>
              </div>
              <span className="text-sm font-medium">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-200 rounded-full mr-2"></span>
                <span className="text-sm text-gray-600">Other</span>
              </div>
              <span className="text-sm font-medium">10%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Status */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600">
            <h2 className="text-lg font-medium text-white">Inventory Status</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">{inventoryStats.total}</p>
                <p className="text-xs text-gray-600 mt-1">Total Products</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-amber-600">{inventoryStats.low}</p>
                <p className="text-xs text-gray-600 mt-1">Low Stock</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-red-600">{inventoryStats.outOfStock}</p>
                <p className="text-xs text-gray-600 mt-1">Out of Stock</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Inventory Health</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="text-xs text-gray-600">85% of products have healthy stock levels</div>
            </div>
          </div>
        </div>
        
        {/* Courier Performance */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600">
            <h2 className="text-lg font-medium text-white">Delivery Performance</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-semibold text-blue-600">{courierStats.active}</p>
                <p className="text-xs text-gray-600 mt-1">Active</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-green-600">{courierStats.completed}</p>
                <p className="text-xs text-gray-600 mt-1">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-600">{courierStats.pending}</p>
                <p className="text-xs text-gray-600 mt-1">Pending</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">On-time Delivery</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '94%' }}></div>
              </div>
              <div className="text-xs text-gray-600">94% of deliveries arrived on time</div>
            </div>
          </div>
        </div>
        
        {/* Sales Performance */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600">
            <h2 className="text-lg font-medium text-white">Sales Performance</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">28</p>
                <p className="text-xs text-gray-600 mt-1">Orders</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">$125</p>
                <p className="text-xs text-gray-600 mt-1">Avg. Order</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-semibold text-gray-900">$3,511</p>
                <p className="text-xs text-gray-600 mt-1">Revenue</p>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Conversion Rate</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '23%' }}></div>
              </div>
              <div className="text-xs text-gray-600">23% of visitors converted to customers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;