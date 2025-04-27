"use client";
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/services/auth';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  login: (response: any) => void;
  logout: () => void;
  loading: boolean;
  handleApiError: (error: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const storedUser = auth.getUser();
    const accessToken = auth.getAccessToken();

    if (storedUser && accessToken) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const handleApiError = useCallback(async (error: any) => {
    if (error.detail === 'token_expired') {
      auth.clearTokens();
      setUser(null);
      router.push('/login');
    }
    throw error;
  }, [router]);

  const login = (response: any) => {
    setLoading(true);
    auth.handleLoginSuccess(response);
    setUser(response.user);
    setLoading(false);
    router.push('/dashboard');
  };

  const logout = () => {
    setLoading(true);
    auth.clearAuth();
    setLoading(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
        handleApiError,
      }}
    >
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