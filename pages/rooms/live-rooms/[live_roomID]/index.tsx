import { PageContainer } from "@components/layouts";
import { RoomHeader, RoomInfo, RoomQuestions } from "@components/modules";
import { Button, UserInfo } from "@components/widgets";
import { useAuth, useRoom } from "@core/hooks";
import { liveRoomsRef } from "@core/services";
import { FirebaseError } from "firebase/app";
import { push } from "firebase/database";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { CircleNotch } from "phosphor-react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const LiveRoom: NextPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { live_roomID } = router.query;
  const { roomTitle, questions, isLoading, createdBy } = useRoom(
    live_roomID as string
  );
  const [userAsk, setUserAsk] = useState("");

  async function handleSendAsk(e: FormEvent) {
    e.preventDefault();

    if (userAsk.trim() === "" || !user) return;

    try {
      await push(liveRoomsRef(live_roomID as string, "question"), {
        authorId: user.id,
        content: userAsk,
      });

      setUserAsk("");
      toast.success("Ask sent!");
    } catch (error) {
      const err = error as FirebaseError;
      toast.error(err.message);
    }
  }

  return (
    <PageContainer headTitle={`OnlyRooms | ${roomTitle}`}>
      <RoomHeader roomID={live_roomID as string} />

      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <CircleNotch size={64} className="text-primary animate-spin" />
        </div>
      ) : (
        <main className="flex-1 container lg:w-2/3 py-12">
          <RoomInfo title={roomTitle} questionsLength={questions.length} />

          <form className="my-8" onSubmit={handleSendAsk}>
            <textarea
              placeholder="What do you want to ask?"
              aria-label="What do you want to ask?"
              value={userAsk}
              onChange={(e) => setUserAsk(e.target.value)}
              className="textarea textarea-bordered w-full min-h-[5rem] h-20 max-h-[20rem] sm:min-h-[8rem] sm:h-32 resize-y scrollbar-thin scrollbar-thumb-neutral shadow-sm focus:ring-2 focus:ring-primary-focus focus:ring-offset-2 focus:ring-offset-base-100"
            />

            <div className="flex justify-between">
              <UserInfo />

              {!loading && !user && (
                <span>
                  To send an ask,{" "}
                  <Link href="/">
                    <a className="text-secondary">login</a>
                  </Link>
                </span>
              )}

              <Button
                type="submit"
                ring
                disabled={!user || userAsk.trim() === ""}
                className="btn-primary first-letter:capitalize normal-case ring-primary"
              >
                Send ask
              </Button>
            </div>
          </form>

          <RoomQuestions questions={questions} />
        </main>
      )}
    </PageContainer>
  );
};

export default LiveRoom;
