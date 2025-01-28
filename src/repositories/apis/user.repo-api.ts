import { baseRepoAPI } from "@/classes/base.repo-api.ts";
import { User } from "@/repositories/dtos/responses/User.ts";
import { PageModel } from "@/models/page.model.ts";

class UserRepoApi {
  async getAllUsers(): Promise<PageModel<User>> {
    return await baseRepoAPI.get("/users");
  }
}

export const userRepoApi = new UserRepoApi();
