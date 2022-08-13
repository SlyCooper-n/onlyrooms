import { PageContainer } from "@components/layouts";
import { Button, Logo } from "@components/widgets";
import { useAuth } from "@core/hooks";
import { IllustrationProps } from "@core/types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { AppleLogo, CircleNotch, GithubLogo, GoogleLogo } from "phosphor-react";

// TODO: Add sign in with Apple and Github

const Login: NextPage = () => {
  const { user, loading } = useAuth();

  return (
    <PageContainer headTitle="OnlyRooms | Login">
      <section className="flex-1 flex items-center">
        <Illustration className="flex-1 h-screen hidden lg:flex" />

        <main className="flex-1">
          <h1 className="mb-12 text-center text-3xl font-bold font-secondary">
            <Logo />
          </h1>

          <div className="max-w-[250px] mx-auto text-center">
            {loading && (
              <CircleNotch size={32} className="mx-auto animate-spin" />
            )}

            {!user ? <SignInList /> : <LoginComplete />}
          </div>
        </main>
      </section>
    </PageContainer>
  );
};

export default Login;

const Illustration = ({ className }: IllustrationProps) => {
  return (
    <div
      className={
        "flex-col justify-center items-center bg-base-300 gap-12 " + className
      }
    >
      <Image
        src="/images/illustration.svg"
        alt="Illustration image"
        width={400}
        height={400}
      />

      <h2 className="text-3xl text-base-content font-semibold">
        Rooms for everybody.
      </h2>
    </div>
  );
};

const SignInList = () => {
  const { signIn } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => signIn("google")}
        ring
        className="bg-[#ea4435] text-white border-none hover:bg-[#ea4435] hover:brightness-90 focus:ring-[#ea4435]"
      >
        <GoogleLogo size={32} weight="bold" />
        Login with Google
      </Button>

      <Button onClick={() => signIn("github")}>
        <GithubLogo size={32} />
        Login with Github
      </Button>

      <div className="divider">Coming soon...</div>

      <Button disabled>
        <AppleLogo size={32} />
        Login with Apple
      </Button>
    </div>
  );
};

const LoginComplete = () => {
  return (
    <>
      <h2 className="my-8 text-2xl font-semibold uppercase">You are all set</h2>

      <Link href="/">
        <a className="link text-lg">Go to Home</a>
      </Link>
    </>
  );
};
