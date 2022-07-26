import { AvatarPopover, Logo } from "@components/widgets";
import { useAuth } from "@core/hooks";
import { navbarMenu, userOptions } from "@core/utils";
import Link from "next/link";
import { CircleNotch, List } from "phosphor-react";
import { useState } from "react";

export const Navbar = () => {
  const { user, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);

  return (
    <nav className="container navbar justify-between z-10">
      <Link href="/">
        <a className="btn btn-ghost mr-auto px-2">
          <h1 className="text-xl sm:text-3xl font-bold">
            <Logo />
          </h1>
        </a>
      </Link>

      <ul
        className={`absolute top-0 left-1/2 w-full h-screen mr-8 pt-24 -translate-x-1/2 ${
          isMobileMenuOpen
            ? "opacity-0 pointer-events-none z-20"
            : "opacity-100 pointer-events-auto"
        } flex-col gap-4 bg-base-300 sm:relative sm:left-0 sm:w-auto sm:h-auto sm:pt-0 sm:translate-x-0 sm:flex-row sm:bg-transparent sm:opacity-100 sm:pointer-events-auto transition-all`}
      >
        {navbarMenu.map((opt) => (
          <li
            key={opt.id}
            className={`${
              opt.isButton &&
              "btn btn-sm btn-primary first-letter:capitalize normal-case"
            } text-lg font-semibold hover:brightness-110`}
          >
            <Link href={opt.link}>
              <a>{opt.name}</a>
            </Link>
          </li>
        ))}

        {user ? (
          userOptions.map((userOpt) => (
            <li
              key={userOpt.id}
              className="sm:hidden text-lg font-semibold hover:brightness-110"
            >
              <Link href={userOpt.link}>
                <a>{userOpt.name}</a>
              </Link>
            </li>
          ))
        ) : (
          <>
            <div className="sm:hidden divider w-32 self-center" />

            <li className="sm:hidden text-lg font-semibold hover:brightness-110">
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          </>
        )}
      </ul>

      <div className="hidden sm:block">
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
      </div>

      <button
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        className="btn btn-ghost px-2 sm:hidden z-10"
      >
        <List size={24} />
      </button>
    </nav>
  );
};
