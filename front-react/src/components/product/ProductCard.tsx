import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import { Heart, Star } from 'lucide-react';
import { type Product } from "./data";
import { useEffect, useState } from "react";
import { getWishlist, updateWishlist } from "../../lib/api";

const ProductCard: React.FC<{ product: Product, onAddToCart: (product: Product) => void }> = ({ product, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await getWishlist();
        const wishlistItems: Product[] = res.data;
        setWishlist(wishlistItems);
        setIsLiked(wishlistItems.some((item) => item.id === product.id));
      } catch (error) {
        console.error("Error fetching wishlist", error);
      }
    };

    fetchWishlist();
  }, [product.id]);

  const onWishlistClick = async () => {
    try {
      let updatedWishlist;
      if (isLiked) {
        updatedWishlist = wishlist.filter((item) => item.id !== product.id);
      } else {
        updatedWishlist = [...wishlist, product];
      }

      await updateWishlist(updatedWishlist);
      setWishlist(updatedWishlist);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating wishlist", error);
    }
  }

  const getStatusConfig = (status: Product['inventoryStatus']) => {
    switch (status) {
      case 'INSTOCK':
        return { label: 'En Stock', className: 'bg-green-100 text-green-800' };
      case 'LOWSTOCK':
        return { label: 'Stock Faible', className: 'bg-orange-100 text-orange-800' };
      case 'OUTOFSTOCK':
        return { label: 'Rupture', className: 'bg-red-100 text-red-800' };
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const statusConfig = getStatusConfig(product.inventoryStatus);
  const isOutOfStock = product.inventoryStatus === 'OUTOFSTOCK';

  return (
    <Card className="w-full max-w-sm pt-0 relative">
      <CardHeader className="p-0 overflow-hidden h-55">
        <img alt="productImage" src={"/product2.jpg"} className="object-cover w-full h-full" />
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex flex-col overflow-hidden">
          <button
            onClick={onWishlistClick}
            className="absolute top-3 left-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.className}`}>
              {statusConfig.label}
            </span>
          </div>
          <div className="p-2">
            <div className="mb-2">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-800 text-lg leading-tight">
                  {product.name}
                </h3>
              </div>
              <p className="text-blue-500 text-sm font-medium flex items-start justify-between">{product.category}</p>
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="flex items-center gap-2 pl-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-gray-500 text-sm">({product.rating})</span>
            {product.quantity > 0 && (
              <span className="text-gray-400 text-xs ml-auto">
                {product.quantity} en stock
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-gray-600">
            {product.price} €
          </span>
          <span className="text-xs text-gray-500">
            Réf: {product.internalReference}
          </span>
        </div>
        <div className="flex justify-end w-full">
          <Button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
              }`}
          >
            Ajouter au panier
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductCard;
