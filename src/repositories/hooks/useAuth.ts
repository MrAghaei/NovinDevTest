import { useCallback, useState } from "react";
import { authService } from "@/repositories/services/auth.service";
import { TOKEN_KEY } from "@/configs/local-storage-key.config.ts";

export function useAuth() {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const login = useCallback(
    async (username: string, email: string, password: string) => {
      setIsLoginLoading(true);
      try {
        const data = await authService.login(username, email, password);
        localStorage.setItem(TOKEN_KEY, data.token);
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
      localStorage.removeItem(TOKEN_KEY);
    } finally {
      setIsLogoutLoading(false);
    }
  }, []);

  return {
    login,
    isLoginLoading,
    isLogoutLoading,
    logout,
  };
}
