'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { CartItem, CartPackSize } from '@/types/cart';
import { Product } from '@/types/catalog';

interface AddItemInput {
  product: Product;
  packSize: CartPackSize;
  quantity?: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (input: AddItemInput) => void;
  removeItem: (productId: string, packSize: CartPackSize) => void;
  updateQuantity: (productId: string, packSize: CartPackSize, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'next_farm_cart_items';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage', e);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [items, isMounted]);

  const addItem = useCallback(({ product, packSize, quantity = 1 }: AddItemInput) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.packSize === packSize
      );

      const unitPrice =
        packSize === '5L'
          ? product.pricing.can5L
          : packSize === '2L'
          ? product.pricing.pack2L || 2299
          : product.pricing.bottle1L;

      const formatLabel =
        packSize === '5L'
          ? product.format5L || '5L Canister'
          : packSize === '2L'
          ? product.format2L || '2L Twin Pack'
          : product.format1L || '1L Bottle';

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      const newItem: CartItem = {
        productId: product.id,
        slug: product.slug,
        packSize,
        quantity,
        unitPrice,
        title: product.name,
        image: product.packshotImage,
        formatLabel
      };

      return [...prev, newItem];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, packSize: CartPackSize) => {
    setItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.packSize === packSize))
    );
  }, []);

  const updateQuantity = useCallback((productId: string, packSize: CartPackSize, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, packSize);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.packSize === packSize) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      totalItems,
      totalAmount
    }),
    [items, isOpen, totalItems, totalAmount, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart, toggleCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
