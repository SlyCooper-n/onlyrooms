import { auth, FirebaseSignInService } from "@core/services";
import { AuthProviderProps, UserType } from "@core/types";
import { SignInUseCase } from "@core/use-cases";
import { GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AuthContext {
  user: UserType | undefined;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType | undefined>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(undefined);
        return;
      }

      const { uid, displayName, photoURL } = user;

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
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
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
