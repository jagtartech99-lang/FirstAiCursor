export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'buyer' | 'seller' | 'admin';
  avatar?: string;
  phone?: string;
  address?: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Laptop {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  brand: string;
  model: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  specifications: LaptopSpecs;
  sellerId: string;
  seller: User;
  category: string;
  tags: string[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  reviews: Review[];
  averageRating: number;
  viewCount: number;
}

export interface LaptopSpecs {
  processor: string;
  ram: string;
  storage: string;
  display: string;
  graphics: string;
  operatingSystem: string;
  batteryLife?: string;
  weight?: string;
  warranty?: string;
}

export interface Review {
  id: string;
  userId: string;
  user: User;
  laptopId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface CartItem {
  id: string;
  laptop: Laptop;
  quantity: number;
  addedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  laptopId?: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Wishlist {
  id: string;
  userId: string;
  laptopId: string;
  laptop: Laptop;
  addedAt: Date;
}

export interface FilterOptions {
  brand?: string[];
  priceRange?: { min: number; max: number };
  condition?: string[];
  processor?: string[];
  ram?: string[];
  storage?: string[];
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'popular';
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'buyer' | 'seller';
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}