import { PageProvider } from "./pageIgnition";
import { AuthProvider } from "./authProvider";
import React from "react";
interface ContextProviderProps {
  children: React.ReactNode | null;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  return (
    <AuthProvider>
      <PageProvider>{children}</PageProvider>
    </AuthProvider>
  );
};


export default ContextProvider;
