import { useUser } from "@/repositories/hooks/useUser.ts";
import { useEffect } from "react";
import UserListCard from "@/components/UserListCard.tsx";
import { UserModel } from "@/models/user.model.ts";
import { useNavigate } from "react-router";

function UserListPage() {
  //region hooks
  const { fetchUsersData, usersData } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsersData();
    };
    fetchData().then();
  }, []);
  //endregion

  //region functions
  function handleCardClick(id: number): void {
    navigate(`/user/detail/${id}`);
  }
  //endregion

  return (
    <div className={"grid grid-cols-3 gap-5"}>
      {usersData?.data.map((userData: UserModel) => (
        <UserListCard
          key={userData.id}
          data={userData}
          onCardClick={() => handleCardClick(userData.id)}
        />
      )) || <p>No users found.</p>}
    </div>
  );
}

export default UserListPage;
