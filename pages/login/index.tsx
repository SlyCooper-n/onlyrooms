import { PageContainer } from "@components/layouts";
import { Button, Logo } from "@components/widgets";
import { useAuth } from "@core/hooks";
import { IllustrationProps, SignInListProps } from "@core/types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AppleLogo,
  CircleNotch,
  FacebookLogo,
  GithubLogo,
  GoogleLogo,
} from "phosphor-react";

const Login: NextPage = () => {
  const { user, loading, signInWithGoogle } = useAuth();

  return (
    <PageContainer headTitle="OnlyRooms | Login">
      <section className="flex-1 flex items-center">
        <Illustration className="flex-1 h-screen hidden lg:flex" />

        <main className="flex-1">
          <h1 className="mb-12 text-center text-3xl font-bold font-secondary">
            <Logo />
          </h1>

          <div className="text-center">
            {loading ? (
              <CircleNotch size={32} className="mx-auto animate-spin" />
            ) : !user ? (
              <SignInList providers={{ signInWithGoogle }} />
            ) : (
              <LoginComplete />
            )}
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

const SignInList = ({ providers }: SignInListProps) => {
  const { signInWithGoogle } = providers;

  return (
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
