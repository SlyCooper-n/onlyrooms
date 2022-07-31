import { AdminGuard } from "@components/guards";
import { PageContainer } from "@components/layouts";
import { RoomHeader, RoomInfo } from "@components/modules";
import { Question } from "@components/widgets";
import { useRoom } from "@core/hooks";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { CircleNotch } from "phosphor-react";

const AdminLiveQuestions: NextPage = () => {
  const router = useRouter();
  const { live_roomID } = router.query;
  const { roomTitle, questions, isLoading } = useRoom(live_roomID as string);

  return (
    <AdminGuard roomID={live_roomID as string}>
      <PageContainer headTitle={`OnlyRooms | ${roomTitle}`}>
        <RoomHeader roomID={live_roomID as string} />

        {isLoading ? (
          <div className="flex-1 flex justify-center items-center">
            <CircleNotch size={64} className="text-primary animate-spin" />
          </div>
        ) : (
          <main className="flex-1 container lg:w-2/3 py-12">
            <RoomInfo title={roomTitle} questionsLength={questions.length} />

            <section>
              {questions.map((question) => (
                <Question key={question.id} data={question} variant="admin" />
              ))}
            </section>
          </main>
        )}
      </PageContainer>
    </AdminGuard>
  );
};

export default AdminLiveQuestions;
