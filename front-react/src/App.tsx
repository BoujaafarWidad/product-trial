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
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc1MDUzNTA5Mjk5MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzUwNTg4OTk3LCJleHAiOjE3NTA1OTYxOTd9.RSOP9AfptpCHVcujCbnz7ZMXJb99KLXuafHzi5x4eM8');
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
