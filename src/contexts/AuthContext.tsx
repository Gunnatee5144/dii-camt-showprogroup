import React, { createContext, useContext, useState, useCallback } from 'react';
import { UserRole } from '@/types';
import { mockStudent, mockTeacher, mockStaff, mockCompany } from '@/lib/mockData';

interface AuthUser {
  id: string;
  email: string;
  name: string;
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

    let mockUser: AuthUser;
    switch (role) {
      case 'student':
        mockUser = {
          id: mockStudent.id,
          email: mockStudent.email,
          name: mockStudent.name,
          role: 'student',
        };
        break;
      case 'teacher':
        mockUser = {
          id: mockTeacher.id,
          email: mockTeacher.email,
          name: mockTeacher.name,
          role: 'teacher',
        };
        break;
      case 'staff':
        mockUser = {
          id: mockStaff.id,
          email: mockStaff.email,
          name: mockStaff.name,
          role: 'staff',
        };
        break;
      case 'company':
        mockUser = {
          id: mockCompany.id,
          email: mockCompany.email,
          name: mockCompany.companyName,
          role: 'company',
        };
        break;
    }

    setUser(mockUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    if (user) {
      // For demo purposes, allow role switching
      login(user.email, '', role);
    }
  }, [user, login]);

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
