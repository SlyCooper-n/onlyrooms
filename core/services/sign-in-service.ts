import { UserType } from "@core/types";
import { AuthProvider } from "firebase/auth";

export interface SignInService {
  signIn: (provider: AuthProvider) => Promise<UserType | undefined>;
}
