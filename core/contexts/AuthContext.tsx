import { auth, FirebaseSignInService } from "@core/services";
import { AuthProviderProps, UserType } from "@core/types";
import { SignInUseCase } from "@core/use-cases";
import {
  Auth,
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
  signInWithGoogle: () => Promise<void>;
  signOut: (auth: Auth) => Promise<void>;
}

// TODO: Add sign in with Apple and Github (refactor the use case)

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
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

  async function signInWithGoogle() {
    const signInUseCase = new SignInUseCase(
      new FirebaseSignInService(),
      new GoogleAuthProvider()
    );
    const user = await signInUseCase.run();

    if (!user) {
      toast.error("User not logged in");
      return;
    }

    setUser(user);
    toast.success(`Sign in complete. Welcome, ${user.name}!`);

    route.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
