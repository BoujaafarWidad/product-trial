import type { Product } from "../components/product/data";
import type { CartAction, CartStateType } from "./types";

const cartReducer = (state: CartStateType, action: CartAction): CartStateType => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find((item: Product) => item.id === action.product.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item: Product) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.product, quantity: 1 }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item: Product) => item.id !== action.productId)
      };

    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item: Product) => item.id !== action.productId)
        };
      }
      return {
        ...state,
        items: state.items.map((item: Product) =>
          item.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
};

export default cartReducer