import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { User, AuthResponse } from '../types';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (name: string, email: string, currentPassword?: string, newPassword?: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredUser = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        setUser(JSON.parse(storedUser));
      }
      
      setLoading(false);
    };

    loadStoredUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await api.post('/auth/register', { name, email, password });
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const updateProfile = async (name: string, email: string, currentPassword?: string, newPassword?: string) => {
    try {
      const updateData: any = { name, email };
      
      if (currentPassword && newPassword) {
        updateData.currentPassword = currentPassword;
        updateData.newPassword = newPassword;
      }
      
      const response = await api.put<{ user: User }>('/users/profile', updateData);
      const updatedUser = response.data.user;
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    api.defaults.headers.common['Authorization'] = '';
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        updateProfile,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
