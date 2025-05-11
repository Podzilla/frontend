import React, { createContext, useContext, useState } from 'react';

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  stockQuantity: number;
  reorderPoint: number;
  costPrice: number;
  sellingPrice: number;
  location: string;
  supplier: string;
  lastRestocked: string;
  image: string;
}

interface InventoryContextType {
  inventory: InventoryItem[];
  addInventoryItem: (item: InventoryItem) => void;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  removeInventoryItem: (id: string) => void;
  decreaseStock: (id: string, quantity: number) => void;
  increaseStock: (id: string, quantity: number) => void;
  getLowStockItems: () => InventoryItem[];
}

// Mock inventory data with product images
const initialInventory: InventoryItem[] = [
  {
    id: '1',
    sku: 'PROD-001',
    name: 'Premium Headphones',
    category: 'Electronics',
    stockQuantity: 45,
    reorderPoint: 10,
    costPrice: 85,
    sellingPrice: 129.99,
    location: 'A1-S3',
    supplier: 'Tech Suppliers Inc.',
    lastRestocked: '2025-03-15',
    image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg'
  },
  {
    id: '2',
    sku: 'PROD-002',
    name: 'Ergonomic Keyboard',
    category: 'Computer Accessories',
    stockQuantity: 32,
    reorderPoint: 8,
    costPrice: 45,
    sellingPrice: 79.99,
    location: 'B2-S1',
    supplier: 'Tech Suppliers Inc.',
    lastRestocked: '2025-03-10',
    image: 'https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg'
  },
  {
    id: '3',
    sku: 'PROD-003',
    name: 'Wireless Mouse',
    category: 'Computer Accessories',
    stockQuantity: 56,
    reorderPoint: 15,
    costPrice: 18,
    sellingPrice: 34.99,
    location: 'B2-S2',
    supplier: 'Tech Suppliers Inc.',
    lastRestocked: '2025-03-05',
    image: 'https://images.pexels.com/photos/5082576/pexels-photo-5082576.jpeg'
  },
  {
    id: '4',
    sku: 'PROD-004',
    name: '27" Monitor',
    category: 'Electronics',
    stockQuantity: 12,
    reorderPoint: 5,
    costPrice: 180,
    sellingPrice: 249.99,
    location: 'A2-S1',
    supplier: 'Display Solutions Co.',
    lastRestocked: '2025-03-18',
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg'
  },
  {
    id: '5',
    sku: 'PROD-005',
    name: 'Laptop Stand',
    category: 'Computer Accessories',
    stockQuantity: 78,
    reorderPoint: 20,
    costPrice: 15,
    sellingPrice: 29.99,
    location: 'C1-S4',
    supplier: 'Office Gear Ltd.',
    lastRestocked: '2025-02-28',
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg'
  },
  {
    id: '6',
    sku: 'PROD-006',
    name: 'USB-C Hub',
    category: 'Computer Accessories',
    stockQuantity: 3,
    reorderPoint: 10,
    costPrice: 25,
    sellingPrice: 49.99,
    location: 'C1-S2',
    supplier: 'Tech Suppliers Inc.',
    lastRestocked: '2025-02-20',
    image: 'https://images.pexels.com/photos/4792731/pexels-photo-4792731.jpeg'
  },
  {
    id: '7',
    sku: 'PROD-007',
    name: 'Wireless Charger',
    category: 'Electronics',
    stockQuantity: 28,
    reorderPoint: 10,
    costPrice: 20,
    sellingPrice: 39.99,
    location: 'A1-S5',
    supplier: 'Mobile Accessories Co.',
    lastRestocked: '2025-03-12',
    image: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg'
  },
];

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  
  const addInventoryItem = (item: InventoryItem) => {
    setInventory(prevInventory => [...prevInventory, item]);
  };
  
  const updateInventoryItem = (id: string, updates: Partial<InventoryItem>) => {
    setInventory(prevInventory => 
      prevInventory.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };
  
  const removeInventoryItem = (id: string) => {
    setInventory(prevInventory => 
      prevInventory.filter(item => item.id !== id)
    );
  };
  
  const decreaseStock = (id: string, quantity: number) => {
    setInventory(prevInventory => 
      prevInventory.map(item => 
        item.id === id 
          ? { 
              ...item, 
              stockQuantity: Math.max(0, item.stockQuantity - quantity) 
            } 
          : item
      )
    );
  };
  
  const increaseStock = (id: string, quantity: number) => {
    setInventory(prevInventory => 
      prevInventory.map(item => 
        item.id === id 
          ? { ...item, stockQuantity: item.stockQuantity + quantity } 
          : item
      )
    );
  };
  
  const getLowStockItems = () => {
    return inventory.filter(item => item.stockQuantity <= item.reorderPoint);
  };
  
  return (
    <InventoryContext.Provider 
      value={{ 
        inventory, 
        addInventoryItem, 
        updateInventoryItem, 
        removeInventoryItem, 
        decreaseStock, 
        increaseStock, 
        getLowStockItems 
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = (): InventoryContextType => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};