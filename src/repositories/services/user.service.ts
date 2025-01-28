import { userRepoApi } from "@/repositories/apis/user.repo-api.ts";
import { PageModel } from "@/models/page.model.ts";
import { UserModel } from "@/models/user.model.ts";
import { User } from "@/repositories/dtos/responses/User.ts";
import { PageableModel } from "@/models/pageable.model.ts";
import { UserRequestDto } from "@/repositories/dtos/requests/UserRequestDto.ts";

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
    return this._convertUserToUserModel(response.data);
  }

  public async deleteUserById(id: number): Promise<void> {
    await userRepoApi.deleteUserById(id);
  }
  public async updateUserById(id: number, data: UserModel): Promise<void> {
    const body = this._convertUserModelToUserRequestDto(data);
    await userRepoApi.updateUserById(id, body);
  }
  public async createUser(data: UserModel): Promise<void> {
    const body = this._convertUserModelToUserRequestDto(data);
    await userRepoApi.createUser(body);
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
  private _convertUserModelToUserRequestDto(data: UserModel): UserRequestDto {
    return {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
    };
  }
  // endregion
}

export const userService = new UserService();
