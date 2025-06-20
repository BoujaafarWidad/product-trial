import  product2 from "../../../public/product2.jpg"
export interface Product {
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
  inventoryStatus: "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK";
  rating: number;
  createdAt: number;
  updatedAt: number;
}

export const productData: Product[] = [
  {
    id: 1,
    code: "IPHONE15PRO",
    name: "iPhone 15 Pro",
    description: "Smartphone dernière génération avec puce A17 Pro et système de caméras avancé",
    image: product2,
    category: "Électronique",
    price: 1299,
    quantity: 15,
    internalReference: "APL-IP15P-256",
    shellId: 101,
    inventoryStatus: "INSTOCK",
    rating: 4.8,
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now()
  },
  {
    id: 2,
    code: "CHEMISE-BUS",
    name: "Chemise Business Premium",
    description: "Chemise élégante en coton premium, parfaite pour le bureau",
    image: product2,
    category: "Vêtements",
    price: 79,
    quantity: 3,
    internalReference: "CLO-SHI-BUS-M",
    shellId: 102,
    inventoryStatus: "LOWSTOCK",
    rating: 4.2,
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now()
  },
  {
    id: 3,
    code: "MACBOOK-PRO",
    name: "MacBook Pro M3",
    description: "Ordinateur portable haute performance avec puce M3 pour les créatifs",
    image: product2,
    category: "Électronique",
    price: 2299,
    quantity: 0,
    internalReference: "APL-MBP-M3-14",
    shellId: 103,
    inventoryStatus: "OUTOFSTOCK",
    rating: 4.9,
    createdAt: Date.now() - 259200000,
    updatedAt: Date.now()
  },
  {
    id: 4,
    code: "SNEAKERS-SP",
    name: "Sneakers Sport Elite",
    description: "Chaussures de sport haute performance avec technologie de amortissement",
    image: product2,
    category: "Chaussures",
    price: 159,
    quantity: 8,
    internalReference: "SPO-SNE-ELI-42",
    shellId: 104,
    inventoryStatus: "INSTOCK",
    rating: 4.5,
    createdAt: Date.now() - 345600000,
    updatedAt: Date.now()
  },
  {
    id: 5,
    code: "WATCH-SMART",
    name: "Montre Connectée Pro",
    description: "Montre intelligente avec GPS, suivi santé et autonomie 7 jours",
    image: product2,
    category: "Électronique",
    price: 349,
    quantity: 2,
    internalReference: "ELE-WAT-PRO-BLK",
    shellId: 105,
    inventoryStatus: "LOWSTOCK",
    rating: 4.3,
    createdAt: Date.now() - 432000000,
    updatedAt: Date.now()
  },
  {
    id: 6,
    code: "CASQUE-AUDIO",
    name: "Casque Audio Sans Fil",
    description: "Casque premium avec réduction de bruit active et son haute fidélité",
    image: product2,
    category: "Audio",
    price: 299,
    quantity: 12,
    internalReference: "AUD-HEA-WIR-BLK",
    shellId: 106,
    inventoryStatus: "INSTOCK",
    rating: 4.6,
    createdAt: Date.now() - 518400000,
    updatedAt: Date.now()
  }
];