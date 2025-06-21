export type InventoryStatus = "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK";

export class Product {
  id: number;
  code: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
  internalReference: string;
  shellId: number;
  inventoryStatus: InventoryStatus;
  rating: number;
  createdAt: number;
  updatedAt: number;

  constructor(data: {
    id: number;
    code: string;
    name: string;
    description: string;
    image: string;
    category: string;
    price: number;
    quantity: number;
    internalReference: string;
    shellId: number;
    inventoryStatus: InventoryStatus;
    rating: number;
    createdAt: number;
    updatedAt: number;
  }) {
    this.id = data.id;
    this.code = data.code;
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.category = data.category;
    this.price = data.price;
    this.quantity = data.quantity;
    this.internalReference = data.internalReference;
    this.shellId = data.shellId;
    this.inventoryStatus = data.inventoryStatus;
    this.rating = data.rating;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
