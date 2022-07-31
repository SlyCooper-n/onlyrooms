import { RoomInfoProps } from "@core/types";

export const RoomInfo = ({ title, questionsLength }: RoomInfoProps) => {
  return (
    <div className="mb-12 flex flex-col justify-center items-center gap-4 sm:flex-row sm:justify-start">
      <h2 className="text-2xl sm:text-3xl text-center font-title">
        Room {title}
      </h2>

      {questionsLength > 0 && (
        <span className="badge sm:badge-lg badge-secondary">
          {questionsLength} {questionsLength === 1 ? "question" : "questions"}
        </span>
      )}
    </div>
  );
};
