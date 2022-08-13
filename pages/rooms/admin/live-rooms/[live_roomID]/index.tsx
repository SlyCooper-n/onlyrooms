import { PageContainer } from "@components/layouts";
import { RoomHeader, RoomInfo, RoomQuestions } from "@components/modules";
import { useAuth, useRoom } from "@core/hooks";
import { liveRoomsRef } from "@core/services";
import { FirebaseError } from "firebase/app";
import { update } from "firebase/database";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { CircleNotch } from "phosphor-react";
import toast from "react-hot-toast";

const AdminLiveQuestions: NextPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { live_roomID } = router.query;
  const { roomTitle, questions, isLoading, createdBy } = useRoom(
    live_roomID as string
  );

  // useEffect(() => {
  //   console.log(user?.id, createdBy);

  // if (user?.id !== createdBy) router.push("/");
  // }, [user, createdBy]);

  async function handleCloseRoom() {
    try {
      await update(liveRoomsRef(live_roomID as string, "room"), {
        isClosed: true,
      });

      router.push("/rooms");
    } catch (error) {
      const err = error as FirebaseError;
      toast.error(err.message);
    }
  }

  return (
    <PageContainer headTitle={`OnlyRooms | ${roomTitle}`}>
      <RoomHeader
        roomID={live_roomID as string}
        isAdmin
        closeRoom={handleCloseRoom}
      />

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
  );
};

export default AdminLiveQuestions;
