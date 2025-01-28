import { useCallback, useState } from "react";
import { userService } from "@/repositories/services/user.service";
import { UserModel } from "@/models/user.model";
import { PageModel } from "@/models/page.model";

export function useUser() {
  const [isAllUsersFetchLoading, setIsAllUsersFetchLoading] = useState(false);
  const [isUserFetchLoading, setIsUserFetchLoading] = useState(false);
  const [usersData, setUsersData] = useState<PageModel<UserModel>>();
  const [userData, setUserData] = useState<UserModel>();

  const fetchUsersData = useCallback(async () => {
    setIsAllUsersFetchLoading(true);
    try {
      const data = await userService.getAllUsers();
      setUsersData(data);
    } finally {
      setIsAllUsersFetchLoading(false);
    }
  }, []);

  const fetchUserById = useCallback(async (id: number) => {
    setIsUserFetchLoading(true);
    try {
      const data = await userService.getUserById(id);
      setUserData(data);
    } finally {
      setIsUserFetchLoading(false);
    }
  }, []);
  return {
    isAllUsersFetchLoading,
    usersData,
    userData,
    fetchUsersData,
    fetchUserById,
    isUserFetchLoading,
  };
}
