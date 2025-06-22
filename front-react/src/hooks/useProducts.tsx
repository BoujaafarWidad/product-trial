// src/hooks/useProducts.ts
import { useEffect, useState } from 'react';
import { getProducts } from '../lib/api';
import { type Product } from '../types/product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch products:', err))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
};
