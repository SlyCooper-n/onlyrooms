import { AuthContext } from "@core/contexts";

export interface SignInListProps {
  providers: { signInWithGoogle: AuthContext["signInWithGoogle"] };
}
