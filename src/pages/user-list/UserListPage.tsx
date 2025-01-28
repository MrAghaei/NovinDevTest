import { useUser } from "@/repositories/hooks/useUser.ts";
import { useEffect } from "react";
import UserListCard from "@/components/UserListCard.tsx";
import { UserModel } from "@/models/user.model.ts";
import { useNavigate, useSearchParams } from "react-router";
import { Pagination } from "@/components/ui/pagination";
import { DEFAULT_PAGE_SIZE } from "@/configs/pageable.config.ts";

function UserListPage() {
  //region hooks
  const { fetchUsersData, usersData, isAllUsersFetchLoading } = useUser();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(
    searchParams.get("size") || DEFAULT_PAGE_SIZE.toString(),
  );

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsersData({ page: currentPage, per_page: pageSize });
    };
    fetchData().then();
  }, [currentPage]);
  //endregion

  //region functions
  function handleCardClick(id: number): void {
    navigate(`/user/detail/${id}`);
  }
  function handlePageChange(newPage: number): void {
    setSearchParams({ page: newPage.toString(), size: pageSize.toString() });
  }
  //endregion

  if (isAllUsersFetchLoading) {
    return <div className={"flex justify-center"}>Loading...</div>;
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {usersData?.data.map((userData: UserModel) => (
          <UserListCard
            key={userData.id}
            data={userData}
            onCardClick={() => handleCardClick(userData.id)}
          />
        )) || <p>No users found.</p>}
      </div>
      {usersData && (
        <Pagination
          className="justify-center"
          currentPage={currentPage}
          totalPages={usersData.total_pages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default UserListPage;
