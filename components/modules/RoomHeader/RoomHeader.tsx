import { Logo, RoomCode } from "@components/widgets";
import { RoomHeaderProps } from "@core/types";
import Link from "next/link";
import { ShareNetwork } from "phosphor-react";

// TODO: Add share functionality

export const RoomHeader = ({
  roomID,
  isAdmin = false,
  closeRoom,
}: RoomHeaderProps) => {
  return (
    <header className="py-2 sm:py-4 flex bg-base-200">
      <div className="container flex flex-col items-center md:flex-row md:justify-between md:items-center gap-4">
        <Link href="/">
          <a className="btn btn-ghost">
            <h1 className="text-2xl sm:text-3xl font-bold text-center">
              <Logo />
            </h1>
          </a>
        </Link>

        <div className="flex flex-col gap-2 md:items-center md:flex-row">
          <div className="flex items-center">
            <RoomCode roomCode={roomID} />

            <button className="btn btn-ghost">
              <ShareNetwork size={24} weight="bold" />
            </button>
          </div>

          {isAdmin && (
            <button onClick={closeRoom} className="btn btn-outline btn-primary">
              Close room
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
