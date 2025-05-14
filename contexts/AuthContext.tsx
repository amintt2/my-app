"use client"

import * as React from "react";

interface User {
  name: string;
  email: string;
  // Add other user properties as needed
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void; // Simulate login
  logout: () => void; // Simulate logout
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);

  // Simulate login
  const login = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
    // In a real app, you'd set a token in localStorage or a cookie
    console.log("User logged in:", userData);
  };

  // Simulate logout
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // In a real app, you'd clear the token
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 