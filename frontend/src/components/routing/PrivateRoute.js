import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return !isAuthenticated && !loading ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;
