import { useCallback, useState } from "react";
import { authService } from "@/repositories/services/auth.service";
import { AuthModel } from "@/models/auth.model";

export function useAuth() {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [authData, setAuthData] = useState<AuthModel>();

  const login = useCallback(
    async (username: string, email: string, password: string) => {
      setIsLoginLoading(true);
      try {
        const data = await authService.login(username, email, password);
        setAuthData(data);
      } finally {
        setIsLoginLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    setIsLogoutLoading(true);
    try {
      await authService.logout();
    } finally {
      setIsLogoutLoading(false);
    }
  }, []);

  return {
    login,
    authData,
    isLoginLoading,
    isLogoutLoading,
    logout,
  };
}
