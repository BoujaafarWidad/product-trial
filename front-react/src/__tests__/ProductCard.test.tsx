
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { type Product } from '../components/product/data';
import * as api from '../lib/api';
import ProductCard from '../components/product/ProductCard';
import '@testing-library/jest-dom';

jest.mock('../lib/api'); // mock the wishlist API

const product: Product = {
  id: 1,
  code: "IPHONE15PRO",
  name: "iPhone 15 Pro",
  description: "Smartphone dernière génération avec puce A17 Pro et système de caméras avancé",
  image: "",
  category: "Électronique",
  price: 1299,
  quantity: 1,
  internalReference: "APL-IP15P-256",
  shellId: 101,
  inventoryStatus: "INSTOCK",
  rating: 4.8,
  createdAt: Date.now() - 86400000,
  updatedAt: Date.now()
};

describe('ProductCard', () => {
  const mockAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product details correctly', async () => {
    render(<ProductCard product={product} onAddToCart={mockAddToCart} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(screen.getByText(`${product.price} €`)).toBeInTheDocument();
    expect(screen.getByText(`Réf: ${product.internalReference}`)).toBeInTheDocument();
    expect(screen.getByText(`(${product.rating})`)).toBeInTheDocument();
  });

  it('renders stock badge correctly', () => {
    render(<ProductCard product={{ ...product, inventoryStatus: 'LOWSTOCK' }} onAddToCart={mockAddToCart} />);
    expect(screen.getByText(/Stock Faible/i)).toBeInTheDocument();
  });

  it('disables "Add to Cart" if product is out of stock', () => {
    render(<ProductCard product={{ ...product, inventoryStatus: 'OUTOFSTOCK' }} onAddToCart={mockAddToCart} />);
    const button = screen.getByRole('button', { name: /ajouter au panier/i });
    expect(button).toBeDisabled();
  });

  it('calls onAddToCart when "Add to Cart" is clicked', () => {
    render(<ProductCard product={product} onAddToCart={mockAddToCart} />);
    const button = screen.getByRole('button', { name: /ajouter au panier/i });
    fireEvent.click(button);
    expect(mockAddToCart).toHaveBeenCalledWith(product);
  });

});
