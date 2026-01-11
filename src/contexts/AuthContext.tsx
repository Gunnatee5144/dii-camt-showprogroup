import React, { createContext, useContext, useState, useCallback } from 'react';
import type { UserRole } from '@/types';
import { getMockUserByRole } from '@/lib/mockData';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  nameThai: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback(async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Mock authentication - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser = getMockUserByRole(role);
    
    const authUser: AuthUser = {
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name,
      nameThai: mockUser.nameThai,
      role: mockUser.role,
      avatar: mockUser.avatar,
    };

    setUser(authUser);
    localStorage.setItem('auth_user', JSON.stringify(authUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('auth_user');
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    // For demo purposes, allow role switching
    login('demo@cmu.ac.th', 'demo', role);
  }, [login]);

  // Restore user from localStorage on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to restore user session:', error);
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      switchRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
