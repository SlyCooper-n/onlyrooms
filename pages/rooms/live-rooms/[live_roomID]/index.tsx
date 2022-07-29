import { PageContainer } from "@components/layouts";
import { Logo, RoomCode } from "@components/widgets";
import { useRoom } from "@core/hooks";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const LiveRoom: NextPage = () => {
  const { live_roomID } = useRouter().query;
  const { roomTitle, questions } = useRoom(live_roomID as string);

  return (
    <PageContainer headTitle={`OnlyRooms | ${roomTitle}`}>
      <header className="py-2 bg-base-200">
        <div className="container flex flex-col gap-4">
          <Link href="/">
            <a className="btn btn-ghost">
              <h1 className="text-2xl font-bold text-center">
                <Logo />
              </h1>
            </a>
          </Link>

          <RoomCode roomCode={live_roomID as string} />
          {/* <ShareNetwork /> */}
        </div>
      </header>

      <h2 className="text-xl text-center">
        Room <span className="text-secondary">{roomTitle}</span>
      </h2>

      {/* <span>
        {questions.likesCount}
      </span> */}
    </PageContainer>
  );
};

export default LiveRoom;
