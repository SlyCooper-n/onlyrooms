import { SignInService } from "@core/services";
import { UserType } from "@core/types";
import { AuthProvider } from "firebase/auth";

export class SignInUseCase {
  constructor(
    private readonly service: SignInService,
    private readonly provider: AuthProvider
  ) {}

  async run(): Promise<UserType | undefined> {
    const result = await this.service.signIn(this.provider);

    return result;
  }
}
