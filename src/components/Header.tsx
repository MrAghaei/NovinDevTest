import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router";

function Header() {
  //region hooks
  const navigate = useNavigate();
  //endregion

  //region functions
  function handleHeaderNavigation(): void {
    navigate("/");
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
      <Button className={"bg-red-600 hover:bg-red-800"}>Log out</Button>
    </header>
  );
}

export default Header;
