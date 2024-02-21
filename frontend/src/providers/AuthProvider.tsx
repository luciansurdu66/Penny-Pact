import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextProps {
  token: string,
  setToken: (newToken: string) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState('');

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be called within an AuthProvider");
  }

  return context;
}