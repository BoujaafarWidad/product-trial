import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import CartItem from "../components/cart/CartItem";
import type { Product } from "../types/product";
import CartProvider from "../context/CartProvider";

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

describe("CartItem", () => {
  it("Item infos are visible to the user", () => {
    render(<CartProvider><CartItem item={product} /></CartProvider>);
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getAllByText(`${(product.price * product.quantity).toFixed(2)} €`).length).toBeGreaterThan(0);
    expect(screen.getByText(String(product.quantity))).toBeInTheDocument();
    // update and delete buttons
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  },);
});
