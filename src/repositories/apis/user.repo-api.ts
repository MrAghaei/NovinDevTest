import { baseRepoAPI } from "@/classes/base.repo-api.ts";
import { User } from "@/repositories/dtos/responses/User.ts";
import { PageModel } from "@/models/page.model.ts";
import { PageableModel } from "@/models/pageable.model.ts";
import { DataModel } from "@/models/data.model.ts";
import { UserRequestDto } from "@/repositories/dtos/requests/UserRequestDto.ts";

class UserRepoApi {
  public async getAllUsers(pageable: PageableModel): Promise<PageModel<User>> {
    return await baseRepoAPI.get("/users", pageable);
  }
  public async getUserById(id: number): Promise<DataModel<User>> {
    return await baseRepoAPI.get(`/users/${id}`);
  }
  public async deleteUserById(id: number): Promise<void> {
    return await baseRepoAPI.delete(`/users/${id}`);
  }
  public async updateUserById(id: number, body: UserRequestDto): Promise<void> {
    return await baseRepoAPI.patch(`/users/${id}`, body);
  }
  public async createUser(body: UserRequestDto): Promise<void> {
    return await baseRepoAPI.post("/users", body);
  }
}

export const userRepoApi = new UserRepoApi();
