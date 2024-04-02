import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextProps {
  token: string | null,
  setToken: (newToken: string | null) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
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