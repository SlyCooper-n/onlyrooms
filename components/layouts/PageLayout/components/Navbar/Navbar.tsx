import { AvatarPopover, Logo } from "@components/widgets";
import { useAuth } from "@core/hooks";
import Link from "next/link";
import { CircleNotch } from "phosphor-react";

export const Navbar = () => {
  const { user, loading } = useAuth();

  return (
    <nav className="container navbar justify-between">
      <h1 className="text-3xl font-bold">
        <Logo />
      </h1>

      {loading ? (
        <CircleNotch size={32} className="animate-spin" />
      ) : user ? (
        <AvatarPopover user={user} />
      ) : (
        <strong>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </strong>
      )}
    </nav>
  );
};
