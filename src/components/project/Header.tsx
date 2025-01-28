import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router";
import { useAuth } from "@/repositories/hooks/useAuth.ts";
import Spinner from "@/components/ui/Spinner.tsx";
import DarkModeToggle from "@/components/project/DarkModeToggle.tsx";
import { useEffect, useState } from "react";

function Header() {
  //region hooks
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve theme from localStorage or fallback to checking the DOM
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        document.documentElement.classList.contains("dark")
      );
    } else {
      return false;
    }
  });
  const navigate = useNavigate();
  const { logout, isLogoutLoading } = useAuth();
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  //endregion

  //region functions
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };
  function handleHeaderNavigation(): void {
    navigate("/");
  }
  async function handleLogout(): Promise<void> {
    await logout();
    navigate("/login");
  }
  //endregion
  return (
    <header
      className={
        "flex justify-between items-center border-b border-gray-300 h-20 bg-white dark:bg-gray-950 dark:text-white px-20"
      }
    >
      <h1
        onClick={handleHeaderNavigation}
        className={"font-bold text-2xl cursor-pointer"}
      >
        NovinDev Test
      </h1>
      <div className={"flex items-center gap-5"}>
        <DarkModeToggle
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
        />
        <Button
          onClick={handleLogout}
          className={
            "flex items-center justify-center gap-3 bg-red-600 hover:bg-red-800 dark:bg-red-900 dark:text-white dark:hover:bg-red-800"
          }
        >
          Log out
          {isLogoutLoading && <Spinner />}
        </Button>
      </div>
    </header>
  );
}

export default Header;
