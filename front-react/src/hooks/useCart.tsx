import { useContext } from "react";
import CartContext from "../context/CartContext";
import type { CartContextType } from "../context/types";

const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default useCart;