import { PageContainer } from "@components/layouts";
import { RoomHeader } from "@components/modules";
import { Button, Question, UserInfo } from "@components/widgets";
import { useAuth, useRoom } from "@core/hooks";
import { liveRoomsQuestionsRef } from "@core/services";
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
  const { live_roomID } = useRouter().query;
  const { roomTitle, questions, isLoading } = useRoom(live_roomID as string);
  const [userAsk, setUserAsk] = useState("");

  async function handleSendAsk(e: FormEvent) {
    e.preventDefault();

    if (userAsk.trim() === "" || !user) return;

    try {
      await push(liveRoomsQuestionsRef(live_roomID as string), {
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
          <div className="flex flex-col justify-center items-center gap-4 sm:flex-row sm:justify-start">
            <h2 className="text-2xl sm:text-3xl text-center font-title">
              Room {roomTitle}
            </h2>

            {questions.length > 0 && (
              <span className="badge sm:badge-lg badge-secondary">
                {questions.length}{" "}
                {questions.length === 1 ? "question" : "questions"}
              </span>
            )}
          </div>

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

          <section>
            {questions.map((question) => (
              <Question key={question.id} data={question} />
            ))}
          </section>
        </main>
      )}
    </PageContainer>
  );
};

export default LiveRoom;
