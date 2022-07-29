import { db } from "@core/services";
import { FirebaseSnapshotRoom, QuestionType } from "@core/types";
import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useRoom = (roomID: string) => {
  const { user } = useAuth();
  const [roomTitle, setRoomTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const roomRef = ref(db, `rooms/live-rooms/${roomID}`);

    try {
      onValue(roomRef, (snapshot) => {
        const roomData = snapshot.val() as FirebaseSnapshotRoom;
        const questions = roomData.questions || [];

        const parsedQuestions: QuestionType[] = Object.entries(questions).map(
          ([key, value]) => {
            const { likes, ...rest } = value;

            if (!likes) {
              return {
                ...rest,
                id: key,
                likesCount: 0,
                likeId: undefined,
              };
            }

            return {
              ...rest,
              id: key,
              likesCount: Object.values(likes).length,
              likeId: Object.values(likes).find(
                (likeId) => likeId.authorId === user?.id
              )?.authorId,
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
  }, [roomID, user]);

  return { roomTitle, createdBy, questions, isLoading };
};
