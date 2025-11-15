import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: string;
  type: string;
  stock: number;
  description: string;
  tags: string[];
}

type ProductContextType = {
  products: Product[];
  refreshProducts: () => Promise<void>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  const refreshProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    refreshProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, refreshProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
