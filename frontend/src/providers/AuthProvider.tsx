import { ReactNode, createContext, useContext, useState } from "react";
import User from "../models/User";

interface AuthContextProps {
  token: string | null;
  setToken: (newToken: string | null) => void;
  loggedUser: User | null;
  setLoggedUser: (newLoggedUser: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken, loggedUser, setLoggedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be called within an AuthProvider");
  }

  return context;
};

export { 
  AuthProvider,
  useAuth
}