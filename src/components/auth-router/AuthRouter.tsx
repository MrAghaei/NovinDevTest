import { Navigate } from "react-router";
import { TOKEN_KEY } from "@/configs/local-storage-key.config.ts";

const AuthRouter = ({ children }: { children: any }) => {
  const isAuthenticated = !!localStorage.getItem(TOKEN_KEY);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default AuthRouter;
