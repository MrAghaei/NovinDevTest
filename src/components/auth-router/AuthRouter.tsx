import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: any }) => {
  const isAuthenticated = false;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
