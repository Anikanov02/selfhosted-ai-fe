import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  username: string | null;
  password: string | null;
  setCredentials: (username: string, password: string) => void;
  clearCredentials: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const setCredentials = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
  };

  const clearCredentials = () => {
    setUsername(null);
    setPassword(null);
  };

  return (
    <AuthContext.Provider value={{ username, password, setCredentials, clearCredentials }}>
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