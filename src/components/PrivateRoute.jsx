import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    axios.get("http://localhost:5000/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`, // if your backend checks JWT from header
      },
      withCredentials: true, // if you're using cookies instead
      timeout: 1000,
    })
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.warn("Auth check failed:", err.message);
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
      });
  }, [token]);

  if (isAuthenticated === null) return null;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
