import * as likeButton from "@/lottie/like-button.json";
import { useAuth } from "@core/hooks";
import { db } from "@core/services";
import { QuestionType } from "@core/types";
import { FirebaseError } from "firebase/app";
import { push, ref, remove } from "firebase/database";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { Lottie } from "../Lottie";
import { UserInfo } from "../UserInfo";

interface QuestionProps {
  data: QuestionType;
}

export const Question = ({ data }: QuestionProps) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(data.likeId !== null ? true : false);
  const { live_roomID } = useRouter().query;

  async function handleLike(likeId: string | null) {
    if (!user) {
      toast.error("You must be logged in to like a question");
      return;
    }

    try {
      if (isLiked && likeId !== null) {
        const likeIdRef = ref(
          db,
          `rooms/live-rooms/${live_roomID}/questions/${data.id}/likes/${likeId}`
        );

        await remove(likeIdRef);
        return;
      }

      const likeRef = ref(
        db,
        `rooms/live-rooms/${live_roomID}/questions/${data.id}/likes`
      );

      await push(likeRef, {
        authorId: user.id,
      });
    } catch (error) {
      const err = error as FirebaseError;
      toast.error(err.message);
    }
  }

  return (
    <div className="card card-compact sm:min-h-[8rem] my-2 bg-base-200">
      <div className="card-body">
        <p className="sm:text-lg">{data.content}</p>

        <div className="flex justify-between items-center">
          <UserInfo />

          <button
            type="button"
            className="ml-auto"
            onClick={() => handleLike(data.likeId)}
          >
            <Lottie
              animationData={likeButton}
              segments={[0, 34]}
              speed={1.75}
              clicked={isLiked}
              toggleClicked={() => setIsLiked(!isLiked)}
              className="w-16 h-16"
            />
          </button>

          <span>{data.likesCount}</span>
        </div>
      </div>
    </div>
  );
};
