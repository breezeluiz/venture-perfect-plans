import { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock auth state - set loading to false immediately
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Mock authentication - simulate successful login
      const mockUser = {
        id: 'mock-user-id',
        email: email,
        user_metadata: {
          full_name: 'Mock User',
        },
        created_at: new Date().toISOString(),
      };
      
      setUser(mockUser as any);
      
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // Mock authentication - simulate successful signup
      const mockUser = {
        id: 'mock-user-id',
        email: email,
        user_metadata: {
          full_name: fullName,
        },
        created_at: new Date().toISOString(),
      };
      
      setUser(mockUser as any);
      
      toast({
        title: "Account created!",
        description: "Welcome to Venture! Your account has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      
      toast({
        title: "Signed out",
        description: "You've been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset sent",
        description: "Please check your email for password reset instructions.",
      });
    } catch (error) {
      const authError = error as AuthError;
      toast({
        title: "Password reset failed",
        description: authError.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};