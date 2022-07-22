import { PageContainer } from "@components/layouts";
import { Button, Logo } from "@components/widgets";
import { useAuth } from "@core/hooks";
import { NextPage } from "next";
import Link from "next/link";
import {
  AppleLogo,
  FacebookLogo,
  GithubLogo,
  GoogleLogo,
} from "phosphor-react";

const Login: NextPage = () => {
  const { user, signInWithGoogle } = useAuth();

  return (
    <PageContainer headTitle="OnlyRooms | Login" center>
      <h1 className="mb-12 text-3xl font-bold font-secondary">
        <Logo />
      </h1>

      <main className="text-center">
        {user && (
          <>
            <h2 className="my-8 text-2xl font-semibold uppercase">
              You are all set
            </h2>

            <Link href="/">
              <a className="link text-lg">Go to Home</a>
            </Link>
          </>
        )}

        {!user && (
          <div className="flex flex-col gap-4">
            <Button
              onClick={signInWithGoogle}
              ring
              className="bg-[#ea4435] text-white border-none hover:bg-[#ea4435] hover:brightness-90 focus:ring-[#ea4435]"
            >
              <GoogleLogo size={32} weight="bold" />
              Login with Google
            </Button>

            <div className="divider">Coming soon...</div>

            <Button disabled>
              <GithubLogo size={32} />
              Login with Github
            </Button>

            <Button disabled>
              <AppleLogo size={32} />
              Login with Apple
            </Button>

            <Button
              disabled
              className="bg-blue-500 text-white border-none hover:bg-blue-500 hover:brightness-90"
            >
              <FacebookLogo size={32} />
              Login with Facebook
            </Button>
          </div>
        )}
      </main>
    </PageContainer>
  );
};

export default Login;
