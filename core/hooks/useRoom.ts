import { db } from "@core/services";
import { FirebaseSnapshotRoom, QuestionType } from "@core/types";
import { off, onValue, ref } from "firebase/database";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";

export const useRoom = (roomID: string) => {
  const { user } = useAuth();
  const [roomTitle, setRoomTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const roomRef = ref(db, `rooms/live-rooms/${roomID}`);

    try {
      onValue(roomRef, (snapshot) => {
        const roomData = snapshot.val() as FirebaseSnapshotRoom;
        const questions = roomData.questions || [];

        if (roomData.isClosed) {
          toast.error("This room is already closed");
          router.push("/");
        }

        const parsedQuestions: QuestionType[] = Object.entries(questions).map(
          ([key, value]) => {
            const { likes, ...rest } = value;

            if (!likes) {
              return {
                ...rest,
                id: key,
                likesCount: 0,
                likeId: null,
              };
            }

            return {
              ...rest,
              id: key,
              likesCount: Object.values(likes).length,
              likeId:
                Object.entries(likes).find(
                  ([, likeValue]) => likeValue.authorId === user?.id
                )?.[0] ?? null,
            };
          }
        );

        setRoomTitle(roomData.title);
        setCreatedBy(roomData.createdBy);
        setQuestions(parsedQuestions);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    return () => {
      off(roomRef, "value");
    };
  }, [roomID, router, user]);

  return { roomTitle, createdBy, questions, isLoading };
};
