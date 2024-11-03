import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  user: object;
  setUser: React.Dispatch<React.SetStateAction<object>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  const contextData: AuthContextType = {
    isAuth,
    setIsAuth,
    user,
    setUser,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
export default AuthContext;
