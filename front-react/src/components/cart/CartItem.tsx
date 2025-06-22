import useCart from "../../hooks/useCart";
import useCartAPI from "../../hooks/useCartAPI";
import type { Product } from "../product/data";
import { Package, Minus, Plus, Trash2 } from "lucide-react"

const CartItem = ({ item }: { item: Product }) => {
  const { dispatch } = useCart();
  const { removeFromCart, updateQuantity } = useCartAPI();

  const updateCartQuantity = (newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId: item.id, quantity: newQuantity });
    updateQuantity(item.id, newQuantity);
  };

  const removeItem = () => {
    dispatch({ type: 'REMOVE_FROM_CART', productId: item.id });
    removeFromCart(item.id);
  };
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
        {/* {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
        ) : ( */}
        <Package className="h-8 w-8 text-gray-400" />
        {/* )} */}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.price.toFixed(2)} €</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateCartQuantity(item.quantity - 1)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>

        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>

        <button
          onClick={() => updateCartQuantity(item.quantity + 1)}
          className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="text-sm font-medium text-gray-900">
        {(item.price * item.quantity).toFixed(2)} €
      </div>

      <button
        onClick={removeItem}
        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

export default CartItem