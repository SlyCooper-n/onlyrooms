import { Logo, RoomCode } from "@components/widgets";
import { RoomHeaderProps } from "@core/types";
import Link from "next/link";
import { ShareNetwork } from "phosphor-react";

// TODO: Add share functionality

export const RoomHeader = ({ roomID }: RoomHeaderProps) => {
  return (
    <header className="py-2 sm:py-4 flex bg-base-200">
      <div className="container flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-4">
        <Link href="/">
          <a className="btn btn-ghost">
            <h1 className="text-2xl sm:text-3xl font-bold text-center">
              <Logo />
            </h1>
          </a>
        </Link>

        <div className="flex flex-col gap-2 sm:items-center sm:flex-row">
          <RoomCode roomCode={roomID} />

          <button className="btn btn-ghost">
            <span className="mr-2 sm:hidden sm:mr-0">Share with friends!</span>{" "}
            <ShareNetwork size={24} weight="bold" />
          </button>
        </div>
      </div>
    </header>
  );
};
