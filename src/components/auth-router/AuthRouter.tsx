import { Navigate } from "react-router";

const AuthRouter = ({ children }: { children: any }) => {
  const isAuthenticated = false;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default AuthRouter;
