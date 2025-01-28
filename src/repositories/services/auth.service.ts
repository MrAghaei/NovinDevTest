import { AuthModel } from "@/models/auth.model.ts";
import { authRepoApi } from "@/repositories/apis/auth.repo-api.ts";
import { AuthLoginResponseDto } from "@/repositories/dtos/responses/AuthLoginResponseDto.ts";
import { AuthLoginRequestDto } from "@/repositories/dtos/requests/AuthLoginRequestDto.ts";

class AuthService {
  // region Request methods
  public async login(
    username: string,
    email: string,
    password: string,
  ): Promise<AuthModel> {
    const body = this._convertToAuthLoginRequestDto(username, email, password);
    const response = await authRepoApi.login(body);
    return this._convertAuthLoginResponseDtoToAuthModel(response);
  }

  public async logout(): Promise<void> {
    await authRepoApi.logout();
  }
  // endregion

  // region Adapter methods
  private _convertAuthLoginResponseDtoToAuthModel(
    response: AuthLoginResponseDto,
  ): AuthModel {
    return {
      token: response.token,
    };
  }
  private _convertToAuthLoginRequestDto(
    username: string,
    email: string,
    password: string,
  ): AuthLoginRequestDto {
    return { email: email, password: password, username: username };
  }
  // endregion
}

export const authService = new AuthService();
