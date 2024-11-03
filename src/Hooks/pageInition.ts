import { useContext } from "react";
import PageContext from "../contexts/pageIgnition";

const usePageIgnition = () => {
  const pages = useContext(PageContext);
  return pages;
};

export default usePageIgnition;
