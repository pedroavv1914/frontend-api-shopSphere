export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'CLIENT';
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
  category?: Category;
  rating?: number;
}

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  product: Product;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELED';
  total: number;
  createdAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}
