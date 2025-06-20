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
