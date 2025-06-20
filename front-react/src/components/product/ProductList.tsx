import { productData, type Product } from "./data";
import ProductCard from "./ProductCard";
import useCart from "../../hooks/useCart";

const ProductList = () => {
  const { dispatch } = useCart();
  const handleOnAddToChart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", product });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
      {productData.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={handleOnAddToChart} />
      ))}
    </div>
  )
}

export default ProductList;