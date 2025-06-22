import { useEffect } from 'react';
import './App.css'
import CartList from './components/cart/CartList';
import ContactForm from './components/contact/ContactForm';
import Header from './components/layout/header';
import ProductList from './components/product/ProductList';
import CartProvider from './context/CartProvider';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  useEffect(() => {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc1MDU4MjU2NTQ1NSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE3NTA2MjQ4NjcsImV4cCI6MTc1MDYzMjA2N30.oLnCxm_yRYpR5bhA0EbGj3tCF9XL8ygK_HtGuPWPdAg');
  }, []);

  return (
    <Router>
      <CartProvider>
        <div className="flex min-h-svh flex-col items-center justify-center">
          <Header />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cartlist" element={<CartList />} />
            <Route path="/contact" element={<ContactForm />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  )
}

export default App
