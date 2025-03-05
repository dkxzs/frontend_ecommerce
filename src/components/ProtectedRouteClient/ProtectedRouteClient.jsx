// ProtectedRouteClient.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRouteClient = ({ children }) => {
  const isLogin = useSelector((state) => state.user.isAuth);
  if (!isLogin) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

export default ProtectedRouteClient;
