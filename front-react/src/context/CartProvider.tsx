import { useReducer } from "react";
import CartContext from "./CartContext";
import type { Product } from "../components/product/data";
import cartReducer from "./CartReducer";


const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const getTotalItems = () => {
    return state.items.reduce((accumulator: number, item: Product) => accumulator + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((accumulator: number, item: Product) => accumulator + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ state, dispatch, getTotalItems, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;