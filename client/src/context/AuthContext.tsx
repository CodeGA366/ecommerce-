import React, { createContext, useState, useContext } from 'react';
import { loginUser, signupUser, logoutUser } from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const userData = await loginUser(email, password);
    setUser(userData);
    localStorage.setItem('token', userData.token); // Store the token in localStorage
  };

  const signup = async (username: string, email: string, password: string) => {
    const userData = await signupUser(username, email, password);
    setUser(userData);
    localStorage.setItem('token', userData.token); // Store the token in localStorage
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem('token'); // Remove the token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};