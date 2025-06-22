import { type Product } from "../../types/product";
import ProductCard from "./ProductCard";
import useCart from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import useCartAPI from "../../hooks/useCartAPI";

const ProductList = () => {
  const { products, loading } = useProducts();
  const { dispatch } = useCart();
  const { cart, syncCart, updateQuantity } = useCartAPI();


  const handleOnAddToChart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", product });
    const existingItem = cart.find((item: Product) => item.id === product.id);

    if (existingItem) {
      updateQuantity(product.id, product.quantity + 1);
    }
    else {
      const updatedCart = [...cart, product];
      syncCart(updatedCart);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 animate-pulse text-lg">Chargement des produits...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} onAddToCart={handleOnAddToChart} />
      ))}
    </div>
  )
}

export default ProductList;