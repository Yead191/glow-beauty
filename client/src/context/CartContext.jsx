import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import * as cartService from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart([]);
      return;
    }
    try {
      setLoading(true);
      const data = await cartService.getCart();
      setCart(data || []);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    if (!user) return false;
    try {
      const updated = await cartService.addToCart(productId, quantity);
      setCart(updated);
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const updated = await cartService.updateCartQuantity(cartItemId, quantity);
      setCart(updated);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const updated = await cartService.removeFromCart(cartItemId);
      setCart(updated);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const itemPrice = item.productId?.price || 0;
    return sum + itemPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
