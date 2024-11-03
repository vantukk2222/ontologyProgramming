import React, { createContext, useState } from "react";
const PageContext = createContext({});

interface PageProviderProps {
  children: React.ReactNode;
}
export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const [page, setPage] = useState({
    totalPages: 1,
    pageSize: 30,
    pageNumber: 1,
  });
  const contextData = {
    page,
    setPage,
  };
  return <PageContext.Provider value={contextData}>{children}</PageContext.Provider>;
};


export default PageContext;
