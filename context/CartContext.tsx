import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CartItem = {
  id: string; // could be index or hash
  name: string;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(item: Omit<CartItem, 'quantity'>) {
    setCart(prev => {
      const existing = prev.find(it => it.id === item.id);
      if (existing) {
        return prev.map(it => it.id === item.id ? { ...it, quantity: it.quantity + 1 } : it);
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }
  function removeFromCart(id: string) {
    setCart(prev => prev.filter(item => item.id !== id));
  }
  function clearCart() {
    setCart([]);
  }
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

