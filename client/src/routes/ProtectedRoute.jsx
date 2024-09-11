/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../hooks/useUser"; // Import the context
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const ProtectedRoute = ({ children }) => {
  const { setUser } = useUser(); // Get setUser function from context
  const [authState, setAuthState] = useState({
    authenticated: false,
    loading: true,
  });

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/auth/status`, { withCredentials: true })
      .then((response) => {
        // console.log(
        //   `User: ${response.data.user.user_email} Authenticated: ${response.data.authenticated} isAdmin: ${response.data.user.is_admin}`
        // );
        setUser(response.data.user); // Set the user in the context
        setAuthState({
          authenticated: response.data.authenticated,
          loading: false,
        });
      })
      .catch((error) => {
        console.error("Status request error:", error);
        setAuthState({ authenticated: false, loading: false });
      });
  }, [setUser]);

  if (authState.loading) {
    return <div>Loading...</div>;
  }

  return authState.authenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
