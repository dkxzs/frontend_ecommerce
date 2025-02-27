// src/components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const userRole = useSelector((state) => state.user.account.isAdmin);

  if (!isAuth) {
    return <Navigate to="/sign-in" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/not-found" />;
  }

  return children;
};

export default ProtectedRoute;
