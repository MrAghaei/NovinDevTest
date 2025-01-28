import { baseRepoAPI } from "@/classes/base.repo-api.ts";
import { User } from "@/repositories/dtos/responses/User.ts";
import { PageModel } from "@/models/page.model.ts";
import { PageableModel } from "@/models/pageable.model.ts";

class UserRepoApi {
  public async getAllUsers(pageable: PageableModel): Promise<PageModel<User>> {
    return await baseRepoAPI.get("/users", pageable);
  }
  public async getUserById(id: number): Promise<User> {
    return await baseRepoAPI.get(`/users${id}`);
  }
}

export const userRepoApi = new UserRepoApi();
