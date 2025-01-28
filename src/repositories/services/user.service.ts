import { userRepoApi } from "@/repositories/apis/user.repo-api.ts";
import { PageModel } from "@/models/page.model.ts";
import { UserModel } from "@/models/user.model.ts";
import { User } from "@/repositories/dtos/responses/User.ts";
import { PageableModel } from "@/models/pageable.model.ts";

class UserService {
  // region Request methods
  public async getAllUsers(
    pageable: PageableModel,
  ): Promise<PageModel<UserModel>> {
    const response = await userRepoApi.getAllUsers(pageable);
    const convertedUserData = response.data.map(this._convertUserToUserModel);
    return {
      ...response,
      data: convertedUserData,
    };
  }

  public async getUserById(id: number): Promise<UserModel> {
    const response = await userRepoApi.getUserById(id);
    return this._convertUserToUserModel(response);
  }
  // endregion

  // region Adapter methods
  private _convertUserToUserModel(response: User): UserModel {
    return {
      avatar: response.avatar,
      email: response.email,
      id: response.id,
      first_name: response.first_name,
      last_name: response.last_name,
    };
  }
  // endregion
}

export const userService = new UserService();
