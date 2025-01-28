import { Navigate } from "react-router";
import { TOKEN_KEY } from "@/configs/local-storage-key.config.ts";

const LoginRouteGuard = ({ children }: { children: any }) => {
  const isAuthenticated = !!localStorage.getItem(TOKEN_KEY);
  return isAuthenticated ? <Navigate to="/" replace /> : <>{children}</>;
};

export default LoginRouteGuard;
