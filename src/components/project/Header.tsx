import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router";
import { useAuth } from "@/repositories/hooks/useAuth.ts";
import Spinner from "@/components/ui/Spinner.tsx";

function Header() {
  //region hooks
  const navigate = useNavigate();
  const { logout, isLogoutLoading } = useAuth();
  //endregion

  //region functions
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
        "flex justify-between items-center border-b border-gray-300 h-20 bg-white px-20"
      }
    >
      <h1
        onClick={handleHeaderNavigation}
        className={"font-bold text-2xl cursor-pointer"}
      >
        NovinDev Test
      </h1>
      <Button
        onClick={handleLogout}
        className={
          "flex items-center justify-center gap-3 bg-red-600 hover:bg-red-800"
        }
      >
        Log out
        {isLogoutLoading && <Spinner />}
      </Button>
    </header>
  );
}

export default Header;
