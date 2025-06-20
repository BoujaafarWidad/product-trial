import type { Product } from "../components/product/data";

interface CartItem extends Product {
  quantity: number;
}

export interface CartStateType {
  items: CartItem[];
}

export type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART' };

export interface CartContextType {
  state: CartStateType;
  dispatch: React.Dispatch<CartAction>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}