import { useContext } from "react";
import PageContext from "../contexts/pageIgnition";

const usePageIgnition = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageIgnition must be used within a PageProvider");
  }
  return context;
};

export default usePageIgnition;
