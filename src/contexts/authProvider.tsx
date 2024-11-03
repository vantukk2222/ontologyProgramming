import React, { createContext, useState } from "react";
const AuthContext = createContext({});
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  const contextData = {
    isAuth,
    setIsAuth,
    user,
    setUser,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export default AuthContext;
