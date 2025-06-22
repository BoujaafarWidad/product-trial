// src/lib/api.ts
import axios from 'axios';

const API_BASE = 'http://localhost:3000'; // adjust if needed

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Auth
export const login = (email: string, password: string) =>
  api.post('/token', { email, password });

// Products
export const getProducts = () => api.get('/products');

// Cart
export const getCart = () => api.get('/user/cart');
export const updateCart = (cart: any[]) => api.post('/user/cart', cart);
export const clearCart = () => api.delete('/user/cart');

// Wishlist
export const getWishlist = () => api.get('/user/wishlist');
export const updateWishlist = (wishlist: any[]) => api.post('/user/wishlist', wishlist);
