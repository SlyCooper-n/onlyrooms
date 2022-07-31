import { PageContainer } from "@components/layouts";
import { RoomHeader, RoomInfo, RoomQuestions } from "@components/modules";
import { useAuth, useRoom } from "@core/hooks";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { CircleNotch } from "phosphor-react";

const AdminLiveQuestions: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { live_roomID } = router.query;
  const { roomTitle, questions, isLoading, createdBy } = useRoom(
    live_roomID as string
  );

  return (
    // <AdminGuard
    //   userId={user?.id}
    //   roomCreatorId={createdBy}
    //   roomID={live_roomID as string}
    // >
    <PageContainer headTitle={`OnlyRooms | ${roomTitle}`}>
      <RoomHeader roomID={live_roomID as string} />

      {isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <CircleNotch size={64} className="text-primary animate-spin" />
        </div>
      ) : (
        <main className="flex-1 container lg:w-2/3 py-12">
          <RoomInfo title={roomTitle} questionsLength={questions.length} />

          <RoomQuestions questions={questions} variant="admin" />
        </main>
      )}
    </PageContainer>
    // </AdminGuard>
  );
};

export default AdminLiveQuestions;
