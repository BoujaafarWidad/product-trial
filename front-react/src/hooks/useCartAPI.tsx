import { useEffect, useState } from "react";
import { getCart, updateCart, clearCart } from "../lib/api";
import { type Product } from "../types/product";
import useCart from "./useCart";

const useCartAPI = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();


  useEffect(() => {
    getCart()
      .then((res) => {
        setCart(res.data)
        dispatch({ type: 'SET_CART', items: res.data });
      })
      .catch((err) => console.error("Error loading cart", err))
      .finally(() => setLoading(false));
  }, []);

  const syncCart = async (updatedCart: Product[]) => {
    try {
      await updateCart(updatedCart);
      setCart(updatedCart);
    } catch (err) {
      console.error("Error syncing cart", err);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    await syncCart(updatedCart);
  };

  const removeFromCart = async (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    await syncCart(updatedCart);
  };

  const emptyCart = async () => {
    try {
      await clearCart();
      setCart([]);
    } catch (err) {
      console.error("Error clearing cart", err);
    }
  };

  return {
    cart,
    loading,
    syncCart,
    updateQuantity,
    removeFromCart,
    emptyCart,
  };
};

export default useCartAPI;
