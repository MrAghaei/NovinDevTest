import { Navigate } from "react-router";

const AuthRouter = ({ children }: { children: any }) => {
  const isAuthenticated = true;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default AuthRouter;
