import { createContext } from "react";
import type { CartContextType } from "./types";

const CartContext = createContext<CartContextType | null>(null);

export default CartContext;