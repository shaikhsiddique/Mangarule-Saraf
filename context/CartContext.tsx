import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

export type CartItem = {
  id: string; // could be index or hash
  name: string;
  image: string;
  price: string;
  type: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  decrementQuantity: (id: string) => void;
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
  const { user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('ms_cart') : null;
      if (raw) {
        const parsed: CartItem[] = JSON.parse(raw);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch (e) {
      // ignore corrupted storage
    }
  }, []);

  // If user logs in and has server cart, replace local
  useEffect(() => {
    const syncFromServer = async () => {
      if (!user) return;
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.cart)) setCart(data.cart);
        }
      } catch {}
    };
    syncFromServer();
  }, [user]);

  // Persist cart on changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('ms_cart', JSON.stringify(cart));
      }
    } catch (e) {
      // storage may be unavailable; ignore
    }
  }, [cart]);

  function addToCart(item: Omit<CartItem, 'quantity'>) {
    setCart(prev => {
      const existing = prev.find(it => it.id === item.id);
      if (existing) {
        return prev.map(it => it.id === item.id ? { ...it, quantity: it.quantity + 1 } : it);
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
    // Persist to backend if logged in
    if (user) {
      try {
        fetch('/api/cart/upsert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...item, quantity: 1 })
        });
      } catch {}
    }
  }
  function decrementQuantity(id: string) {
    setCart(prev => {
      const existing = prev.find(it => it.id === id);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter(it => it.id !== id);
      }
      return prev.map(it => it.id === id ? { ...it, quantity: it.quantity - 1 } : it);
    });
  }
  function removeFromCart(id: string) {
    setCart(prev => prev.filter(item => item.id !== id));
  }
  function clearCart() {
    setCart([]);
  }
  return (
    <CartContext.Provider value={{ cart, addToCart, decrementQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

