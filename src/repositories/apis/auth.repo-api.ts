import { baseRepoAPI } from "@/classes/base.repo-api.ts";
import { AuthLoginResponseDto } from "@/repositories/dtos/responses/AuthLoginResponseDto.ts";
import { AuthLoginRequestDto } from "@/repositories/dtos/requests/AuthLoginRequestDto.ts";

class AuthRepoApi {
  public async login(body: AuthLoginRequestDto): Promise<AuthLoginResponseDto> {
    delete body.username;
    return await baseRepoAPI.post("/login", body);
  }
  public async logout(): Promise<void> {
    return await baseRepoAPI.post("/logout");
  }
}

export const authRepoApi = new AuthRepoApi();
