export interface User {
  id: string;
  name: string;
  email: string;
  products: Product[];
  sales: Sale[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string; // Add imageUrl property
  sold: boolean; // Add sold property
  userId: string;
}

export interface Sale {
  id: string;
  productId: string;
  amount: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}