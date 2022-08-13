import { auth, FirebaseSignInService } from "@core/services";
import { AuthProviderProps, UserType } from "@core/types";
import { SignInUseCase } from "@core/use-cases";
import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface AuthContext {
  user: UserType | undefined;
  loading: boolean;
  signIn: (provider: Provider) => Promise<void>;
  signOutFromApp: () => Promise<void>;
}

export type Provider = "google" | "github";

// TODO: Add sign in with Apple and Github (refactor the use case)

export const AuthContext = createContext({} as AuthContext);

export const UserAuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | undefined>();
  const [loading, setLoading] = useState(true);
  const route = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(undefined);
        setLoading(false);
        return;
      }

      const { uid, displayName, photoURL } = user;

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signIn(provider: Provider) {
    let authProvider: AuthProvider;

    switch (provider) {
      case "google":
        authProvider = new GoogleAuthProvider();
        break;

      case "github":
        authProvider = new GithubAuthProvider();
        break;
    }

    const signInUseCase = new SignInUseCase(
      new FirebaseSignInService(),
      authProvider
    );
    const user = await signInUseCase.run();

    if (!user) {
      toast.error("User not logged in");
      return;
    }

    setUser(user);
    toast.success(`Welcome, ${user.name}!`);

    route.push("/");
  }

  async function signOutFromApp() {
    return await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOutFromApp }}>
      {children}
    </AuthContext.Provider>
  );
};
