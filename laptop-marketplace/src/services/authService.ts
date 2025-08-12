import { User, RegisterData, LoginData } from '../types';

// Mock API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data storage
const USERS_STORAGE_KEY = 'laptop_marketplace_users';
const CURRENT_USER_STORAGE_KEY = 'laptop_marketplace_current_user';

// Generate mock user ID
const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

// Get users from localStorage
const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Create default admin user if none exists
const initializeDefaultUsers = () => {
  const users = getUsers();
  if (users.length === 0) {
    const defaultUsers: User[] = [
      {
        id: 'admin-1',
        email: 'admin@laptophub.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'seller-1',
        email: 'seller@example.com',
        firstName: 'John',
        lastName: 'Seller',
        role: 'seller',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'buyer-1',
        email: 'buyer@example.com',
        firstName: 'Jane',
        lastName: 'Buyer',
        role: 'buyer',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    saveUsers(defaultUsers);
  }
};

// Mock passwords (in real app, these would be hashed)
const mockPasswords: Record<string, string> = {
  'admin@laptophub.com': 'admin123',
  'seller@example.com': 'seller123',
  'buyer@example.com': 'buyer123',
};

export const authService = {
  async login(loginData: LoginData): Promise<{ user: User; token: string }> {
    await delay(1000); // Simulate API delay
    
    initializeDefaultUsers();
    const users = getUsers();
    const user = users.find(u => u.email === loginData.email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check mock password
    if (mockPasswords[loginData.email] !== loginData.password) {
      throw new Error('Invalid password');
    }
    
    const token = `mock-token-${user.id}-${Date.now()}`;
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
    
    return { user, token };
  },

  async register(registerData: RegisterData): Promise<{ user: User; token: string }> {
    await delay(1000);
    
    initializeDefaultUsers();
    const users = getUsers();
    
    // Check if user already exists
    if (users.some(u => u.email === registerData.email)) {
      throw new Error('User with this email already exists');
    }
    
    const newUser: User = {
      id: generateId(),
      email: registerData.email,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      role: registerData.role,
      avatar: `https://ui-avatars.com/api/?name=${registerData.firstName}+${registerData.lastName}&background=3b82f6&color=fff`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    users.push(newUser);
    saveUsers(users);
    
    // Store mock password
    mockPasswords[registerData.email] = registerData.password;
    
    const token = `mock-token-${newUser.id}-${Date.now()}`;
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(newUser));
    
    return { user: newUser, token };
  },

  async getCurrentUser(): Promise<User> {
    await delay(500);
    
    const currentUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    if (!currentUser) {
      throw new Error('No current user');
    }
    
    return JSON.parse(currentUser);
  },

  async resetPassword(email: string): Promise<void> {
    await delay(1000);
    
    const users = getUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // In a real app, this would send an email
    console.log(`Password reset email sent to ${email}`);
  },

  async updateProfile(userData: Partial<User>): Promise<User> {
    await delay(1000);
    
    const currentUserStr = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
    if (!currentUserStr) {
      throw new Error('No current user');
    }
    
    const currentUser = JSON.parse(currentUserStr);
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    const updatedUser = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date(),
    };
    
    users[userIndex] = updatedUser;
    saveUsers(users);
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(updatedUser));
    
    return updatedUser;
  },

  async socialLogin(provider: 'google' | 'facebook'): Promise<{ user: User; token: string }> {
    await delay(1500);
    
    // Mock social login
    const mockSocialUser: User = {
      id: generateId(),
      email: `${provider}user@example.com`,
      firstName: 'Social',
      lastName: 'User',
      role: 'buyer',
      avatar: `https://ui-avatars.com/api/?name=Social+User&background=3b82f6&color=fff`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const users = getUsers();
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === mockSocialUser.email);
    if (existingUser) {
      const token = `mock-token-${existingUser.id}-${Date.now()}`;
      localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(existingUser));
      return { user: existingUser, token };
    }
    
    users.push(mockSocialUser);
    saveUsers(users);
    
    const token = `mock-token-${mockSocialUser.id}-${Date.now()}`;
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(mockSocialUser));
    
    return { user: mockSocialUser, token };
  },
};