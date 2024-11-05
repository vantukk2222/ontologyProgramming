import React, { createContext, useState } from "react";

interface PageProviderProps {
  children: React.ReactNode;
}
interface PageContextType {
  page: {
    totalPages: number;
    pageSize: number;
    pageNumber: number;
  };
  setPage: React.Dispatch<React.SetStateAction<{
    totalPages: number;
    pageSize: number;
    pageNumber: number;
  }>>;
}
const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const [page, setPage] = useState({
    totalPages: 1,
    pageSize: 100,
    pageNumber: 1,
  });
  const contextData = {
    page,
    setPage,
  };

  return <PageContext.Provider value={contextData}>{children}</PageContext.Provider>;
};


export default PageContext;
