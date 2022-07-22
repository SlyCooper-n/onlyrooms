import { AuthProvider, signInWithPopup } from "firebase/auth";
import { SignInService } from "../sign-in-service";
import { auth } from "./firebase-app";

export class FirebaseSignInService implements SignInService {
  async signIn(provider: AuthProvider) {
    const { user, operationType, providerId } = await signInWithPopup(
      auth,
      provider
    );

    if (!user) return undefined;

    return {
      id: user.uid,
      name: user.displayName,
      avatar: user.photoURL,
    };
  }
}
