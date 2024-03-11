import { useEffect, useState } from "react";

const Authetication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(token ? !!token : false);
  }, []); // Empty dependency array to run the effect only once on mount

  return { isAuthenticated };
};
export default Authetication;
