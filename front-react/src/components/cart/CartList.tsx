import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import type { Product } from "../product/data";
import CartItem from "./CartItem";
import { ShoppingCart } from "lucide-react"
import useCartAPI from "../../hooks/useCartAPI";

const CartList = () => {
  const { state, dispatch, getTotalPrice } = useCart();
  const { loading, emptyCart } = useCartAPI();

  let navigate = useNavigate()
  const totalPrice = getTotalPrice();

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    emptyCart();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 animate-pulse text-lg">Chargement du panier...</p>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Mon Panier</h1>

        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">Votre panier est vide</h2>
          <p className="text-gray-500 mb-6">Ajoutez des produits pour commencer vos achats</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Voir nos produits
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-start">Mon Panier</h1>
      {state.items?.map((product: Product) => (
        <CartItem key={product.id} item={product} />
      ))}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-medium text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">{totalPrice.toFixed(2)} €</span>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={clearCart}
            className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors"
          >
            Vider le panier
          </button>
          <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">
            Procéder au paiement
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartList;