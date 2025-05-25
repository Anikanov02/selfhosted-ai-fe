import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  username: string | null;
  password: string | null;
  userId: string | null;
  setCredentials: (username: string, password: string, userId: string) => void;
  clearCredentials: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const setCredentials = (user: string, pass: string, userId: string) => {
    setUsername(user);
    setPassword(pass);
    setUserId(userId);
  };

  const clearCredentials = () => {
    setUsername(null);
    setPassword(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ username, password, userId, setCredentials, clearCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};