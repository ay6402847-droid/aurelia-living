export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: 'Living Room' | 'Bedroom' | 'Home Office' | 'Lighting' | 'Decor & Accents';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  secondaryImage?: string;
  description: string;
  dimensions: string;
  materials: string;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  colorOptions?: { name: string; hex: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  itemCount: number;
  image: string;
  categoryFilter: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: string;
  content: string[];
}
