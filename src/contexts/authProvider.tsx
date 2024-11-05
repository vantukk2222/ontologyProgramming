import React, { createContext, useState, ReactNode } from "react";
import { AuthContextType } from "../utils/interface";



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
