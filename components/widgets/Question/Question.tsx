import * as likeButton from "@/lottie/like-button.json";
import { AlertDialog } from "@components/modules";
import { useAuth } from "@core/hooks";
import { db } from "@core/services";
import { QuestionType } from "@core/types";
import { FirebaseError } from "firebase/app";
import { push, ref, remove, update } from "firebase/database";
import { useRouter } from "next/router";
import { Chat, Check, Trash } from "phosphor-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Lottie } from "../Lottie";
import { Tooltip } from "../Tooltip";
import { UserInfo } from "../UserInfo";

interface QuestionProps {
  data: QuestionType;
  variant?: "admin" | "user";
}

export const Question = ({ data, variant = "user" }: QuestionProps) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(data.likeId !== null ? true : false);
  const [isHighlighted, setIsHighlighted] = useState(data.isHighlighted);
  const [isAnswered, setIsAnswered] = useState(data.isAnswered);
  const { live_roomID } = useRouter().query;

  const questionRef = ref(
    db,
    `rooms/live-rooms/${live_roomID}/questions/${data.id}`
  );

  async function handleLike() {
    if (!user) {
      toast.error("You must be logged in to like a question");
      return;
    }

    try {
      if (isLiked && data.likeId !== null) {
        const likeIdRef = ref(
          db,
          `rooms/live-rooms/${live_roomID}/questions/${data.id}/likes/${data.likeId}`
        );

        await remove(likeIdRef);
        setIsLiked(false);
        return;
      }

      const likeRef = ref(
        db,
        `rooms/live-rooms/${live_roomID}/questions/${data.id}/likes`
      );

      await push(likeRef, {
        authorId: user.id,
      });
      setIsLiked(true);
    } catch (error) {
      const err = error as FirebaseError;
      toast.error(err.message);
    }
  }

  async function handleHighlight() {
    try {
      await update(questionRef, {
        isHighlighted: !isHighlighted,
      });

      setIsHighlighted(!isHighlighted);
      return;
    } catch (error) {
      const err = error as FirebaseError;
      toast.error(err.message);
    }
  }

  async function handleAnswer() {
    try {
      await update(questionRef, {
        isAnswered: !isAnswered,
        isHighlighted: false,
      });

      setIsAnswered(!isAnswered);
      setIsHighlighted(false);
    } catch (error) {
      const err = error as FirebaseError;
      toast.error(err.message);
    }
  }

  async function handleDelete() {
    try {
      await remove(questionRef);
    } catch (error) {
      const err = error as FirebaseError;
      toast.error(err.message);
    }
  }

  return (
    <div
      className={`card card-compact sm:min-h-[8rem] my-2 ${
        isHighlighted ? "bg-accent text-accent-content" : "bg-base-200"
      } ${isAnswered ? "bg-base-200 opacity-70" : "bg-base-200"}`}
    >
      <div className="card-body">
        <p className="sm:text-lg">{data.content}</p>

        <div className="flex justify-between items-center">
          <UserInfo />

          {variant === "user" ? (
            <>
              <button type="button" className="ml-auto" onClick={handleLike}>
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
            </>
          ) : (
            variant === "admin" && (
              <div className="flex gap-2">
                {!isHighlighted && !isAnswered && (
                  <Tooltip tooltipContent="Hightlight question">
                    <button type="button" onClick={handleHighlight}>
                      <Chat
                        size={24}
                        className="w-4 sm:w-6 hover:text-secondary transition-colors"
                      />
                    </button>
                  </Tooltip>
                )}

                {!isAnswered && (
                  <Tooltip tooltipContent="Mark as answered">
                    <button type="button" onClick={handleAnswer}>
                      <Check
                        size={24}
                        className="w-4 sm:w-6 hover:text-success transition-colors"
                      />
                    </button>
                  </Tooltip>
                )}

                <AlertDialog
                  title="Are you sure?"
                  description="This action is irreversible, take it as the last resort."
                  cancelButtonText="Not really"
                  confirmButtonText="Yes, I want to delete it"
                  confirmButtonColor="error"
                  onConfirm={handleDelete}
                >
                  <button type="button">
                    <Trash
                      size={24}
                      className="w-4 sm:w-6 hover:text-error transition-colors"
                    />
                  </button>
                </AlertDialog>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
